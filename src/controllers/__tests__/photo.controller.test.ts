import env from '@app/configs/environment.config';
import { Photo } from '@app/models/photo.model';
import app from '@app/server';
import { MongoClient } from 'mongodb';
import request from 'supertest';

describe('Photo APIs', () => {
  let testPhotoId: string;
  const client = new MongoClient(env.mongo.atlasUri);

  beforeAll(async () => {
    await client.connect();
  });

  afterAll(async () => {
    await client.close();
  });

  describe('GET /api/photos', () => {
    it('should respond with a list of up to 10 photos, or just an empty array if there are no photos.', async () => {
      const res = await request(app)
        .get('/api/photos')
        .expect('Content-Type', /json/)
        .expect(200);

      if (Array.isArray(res.body.data) && res.body.data.length) {
        expect(res.body.data).toStrictEqual(
          expect.arrayContaining([
            expect.objectContaining<Photo>({
              _id: expect.any(String),
              label: expect.any(String),
              url: expect.any(String),
              createdAt: expect.any(Number),
            }),
          ])
        );
      }
    });

    it('should return 404 if next_cursor is set as non exists document id', async () => {
      await request(app)
        .get('/api/photos?next_cursor=non_exists_id')
        .expect('Content-Type', /json/)
        .expect(404);
    });
  });

  describe('POST /api/photos/add', () => {
    it('should add a new photo to the database and return it', async () => {
      const newPhoto: Photo = {
        label: 'New photo label',
        url: 'https://i.picsum.photos/id/842/200/300.jpg?hmac=VSk5Mm2EuqIzLkckPneqxJrjhkmVquU3o-pEYmuGiTk',
        createdAt: Date.now(),
      };

      const res = await request(app)
        .post('/api/photos/add')
        .set('Accept', 'application/json')
        .send(newPhoto)
        .expect(201);

      testPhotoId = res.body._id;

      expect(res.body).toEqual(
        expect.objectContaining<Photo>({
          ...newPhoto,
          _id: expect.any(String),
          createdAt: expect.any(Number),
        })
      );
    });

    it('should return 400 if body is not match the schema', async () => {
      const newPhoto: Photo = {
        label: '',
        url: 'not a valid image url',
        createdAt: Date.now(),
      };

      await request(app)
        .post('/api/photos/add')
        .set('Accept', 'application/json')
        .send(newPhoto)
        .expect(400);
    });
  });

  describe('DELETE /api/photos/delete/:id', () => {
    it('should delete a document with specific id from the database and return it', async () => {
      const res = await request(app)
        .delete(`/api/photos/delete/${testPhotoId}`)
        .expect(200);

      expect(res.body).toStrictEqual(
        expect.objectContaining<Photo>({
          _id: expect.stringMatching(testPhotoId),
          label: expect.any(String),
          url: expect.any(String),
          createdAt: expect.any(Number),
        })
      );
    });

    it('should return 404 if the document id is not exists', async () => {
      await request(app)
        .delete(`/api/photos/delete/${testPhotoId}`)
        .expect(404);
    });

    it('should return 400 if the document id is not valid', async () => {
      await request(app)
        .delete('/api/photos/delete/is_not_valid_id')
        .expect(400);
    });
  });
});
