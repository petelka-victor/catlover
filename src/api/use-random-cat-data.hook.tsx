import { useInfiniteQuery } from '@tanstack/react-query';
import { api } from '../core/api';
import { GetRandomCatsDto } from './dto/get-random-cats.dto';
import React from 'react';

interface GetRandomCatsParams {
  pageParam: number;
  breedId?: string | null;
}

const getRandomCats = async ({ pageParam = 0, breedId }: GetRandomCatsParams) => {
  const { data } = await api.get<GetRandomCatsDto>('https://api.thecatapi.com/v1/images/search', {
    params: {
      limit: 10,
      pageParam,
      breed_ids: breedId,
    },
  });

  return data;
};

interface UseRandomCatDataParams {
  breedId?: string | null;
}

export const useRandomCatData = ({ breedId }: UseRandomCatDataParams = {}) => {
  const { data, isLoading, isError, fetchNextPage, isFetchingNextPage } = useInfiniteQuery({
    queryKey: [`getRandomCats-${breedId || 'random'}`],
    queryFn: ({ pageParam }) => getRandomCats({ pageParam, breedId }),
    initialPageParam: 0,
    getNextPageParam: () => Date.now(),
  });

  return {
    data,
    isLoading,
    isError,
    fetchNextPage,
    isFetchingNextPage,
  };
};
