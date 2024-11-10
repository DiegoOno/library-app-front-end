import { api } from '@/config/api';
import { ILibraryUser } from '@/interface/libraryUser';

export const findAllLibraryUsers = async () => {
  try {
    const response = await api.get('/library-user');
    return response.data
  } catch(error) {
    console.error(error);
    throw error
  }
}

export const findLibraryUserById = async (id: number) => {
  try {
    const response = await api.get(`/library-user/${id}`);
    return response.data
  } catch(error) {
    console.error(error);
    throw error
  }
}

export const createLibraryUser = async (libraryUser: ILibraryUser) => {
  try {
    const response = await api.post('/library-user', libraryUser);
    return response.data
  } catch(error) {
    console.error(error);
    throw error
  }
}

export const updateLibraryUser = async (libraryUser: ILibraryUser) => {
  try {
    const response = await api.put(`/library-user`, libraryUser);
    return response.data
  } catch(error) {
    console.error(error);
    throw error
  }
}

export const deleteLibraryUser = async (id: number) => {
  try {
    const response = await api.delete(`/library-user/${id}`);
    return response.data
  } catch(error) {
    console.error(error);
    throw error
  }
}