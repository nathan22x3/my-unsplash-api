import PhotoModel, { Photo } from '@app/models/photo.model';

const getWithLimit = async (limit: number, next_cursor: string) => {
  try {
    return await PhotoModel.getWithLimit(limit, next_cursor);
  } catch (error) {
    throw new Error(error).message;
  }
};

const addNew = async (data: Photo) => {
  try {
    const insertPhoto: Photo = { ...data, createdAt: Date.now() };
    return await PhotoModel.addNew(insertPhoto);
  } catch (error) {
    throw new Error(error).message;
  }
};

const deleteById = async (id: string) => {
  try {
    return await PhotoModel.deleteById(id);
  } catch (error) {
    throw new Error(error).message;
  }
};

export default { getWithLimit, addNew, deleteById };
