import { useInfiniteQuery } from '@tanstack/react-query';
import { api } from '../core/api';
import { GetFavoriteDto } from './dto/get-favorite.dto';

interface getFavoriteParams {
  page: number;
}

const getFavorite = async ({ page }: getFavoriteParams) => {
  const { data } = await api.get<GetFavoriteDto>(`https://api.thecatapi.com/v1/favourites`, {
    params: {
      sub_id: 'headofs_notes',
      limit: 10,
      page,
    },
  });

  return data;
};

export const useFavoriteData = () => {
  const { data, isLoading, isError, fetchNextPage, isFetchingNextPage } = useInfiniteQuery({
    queryKey: ['getFavorite'],
    queryFn: ({ pageParam }) => getFavorite({ page: pageParam }),
    initialPageParam: 0,
    getNextPageParam: (lastPage, pages) => pages.length,
  });

  return { data, isLoading, isError, fetchNextPage, isFetchingNextPage };
};
