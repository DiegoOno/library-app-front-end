import { api } from '@/config/api';
import { IBook } from '@/interface/book';

export const findAllBooks = async () => {
  try {
    const response = await api.get('/book');
    return response.data
  } catch(error) {
    console.log(error);
    throw error
  }
}

export const findBookById = async (id: number) => {
  try {
    const response = await api.get(`/book/${id}`);
    return response.data
  } catch(error) {
    console.log(error);
    throw error
  }
}

export const findAllAvailableBooks = async () => {
  try {
    const response = await api.get('/book/available');
    return response.data
  } catch(error) {
    console.log(error);
    throw error
  }
}

export const createBook = async (book: IBook) => {
  try {
    const response = await api.post('/book', book);
    return response.data
  } catch(error) {
    console.log(error);
    throw error
  }
}

export const updateBook = async (book: IBook) => {
  try {
    const response = await api.put('/book', book);
    return response.data
  } catch(error) {
    console.log(error);
    throw error
  }
}

export const deleteBook = async (id: number) => {
  try {
    const response = await api.delete(`/book/${id}`);
    return response.data
  } catch(error) {
    console.log(error);
    throw error
  }
}
