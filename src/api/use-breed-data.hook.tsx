import { useQuery } from '@tanstack/react-query';
import { api } from '../core/api';
import { GetBreedsDto } from './dto/get-breeds.dto';

const getBreeds = async () => {
  const { data } = await api.get<GetBreedsDto>('https://api.thecatapi.com/v1/breeds');

  return data;
};

export const useBreedData = () => {
  const { data, isLoading, isError } = useQuery({ queryKey: ['getBreeds'], queryFn: getBreeds });
  return { data, isLoading, isError };
};
