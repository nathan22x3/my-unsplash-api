import PhotoModel, { Photo } from 'models/photo.model';

const getAll = async () => {
  try {
    return await PhotoModel.getAll();
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

export default { getAll, addNew, deleteById };
