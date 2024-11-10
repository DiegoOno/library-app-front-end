import { api } from '@/config/api'
import { ILoan } from '@/interface/loan';

export const findAllLoans = async () => {
  try {
    const response = await api.get('/loan');
    return response.data
  } catch(error) {
    console.log(error);
    throw error
  }
}

export const findLoanById = async (id: number) => {
  try {
    const response = await api.get(`/loan/${id}`);
    return response.data
  } catch(error) {
    console.log(error);
    throw error
  }
}

export const createLoan = async (loan: ILoan) => {
  try {
    const response = await api.post('/loan', loan);
    return response.data
  } catch(error) {
    console.log(error);
    throw error
  }
}

export const updateLoan = async (loan: ILoan) => {
  try {
    const response = await api.put('/loan', loan);
    return response.data
  } catch(error) {
    console.log(error);
    throw error
  }
}
