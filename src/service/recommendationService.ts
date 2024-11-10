import { api } from '@/config/api'

export const findRecommendationsByLibraryUserId = async (libraryUserId: number) => {
  try {
    const response = await api.get(`/recommendations/${libraryUserId}`);
    return response.data
  } catch(error) {
    console.log(error);
    throw error
  }
}