import { useMutation, useQueryClient } from '@tanstack/react-query';

import React from 'react';
import { api } from '../core/api';
import { LikeCatDto } from './dto/like-cat.dto';
import { GetFavoriteDto } from './dto/get-favorite.dto';

interface CreateFavoriteParams {
  imageId: string;
}

const createFavorite = async ({ imageId }: CreateFavoriteParams) => {
  const { data } = await api.post<LikeCatDto>('https://api.thecatapi.com/v1/favourites', {
    image_id: imageId,
    sub_id: 'headofs_notes',
  });

  return data;
};

interface DeleteFavoriteParams {
  favoriteId: number;
}

const deleteFavorite = async ({ favoriteId }: DeleteFavoriteParams) => {
  const { data } = await api.delete(`https://api.thecatapi.com/v1/favourites/${favoriteId}`);
  return data;
};

interface GetSingleFavoriteParams {
  imageId: string;
}

const getSingleFavorite = async ({ imageId }: GetSingleFavoriteParams) => {
  const { data } = await api.get<GetFavoriteDto>(`https://api.thecatapi.com/v1/favourites`, {
    params: {
      image_id: imageId,
      sub_id: 'headofs_notes',
    },
  });
  return data;
};

interface UseLikeApiParams {
  catId: string | null;
}

export const useLikeApi = ({ catId }: UseLikeApiParams) => {
  const [favoriteId, setFavoriteId] = React.useState<number | null>(null);
  const client = useQueryClient();
  const [isSingleFavoriteLoading, setIsFavoriteLoading] = React.useState(false);

  React.useEffect(() => {
    setFavoriteId(null);

    const fetchSingleFavorite = async () => {
      if (!catId) {
        return;
      }

      setIsFavoriteLoading(true);

      try {
        const data = await client.fetchQuery({
          queryKey: [`single-fav-${catId}`],
          queryFn: () => getSingleFavorite({ imageId: catId }),
        });

        setFavoriteId(data[0].id);
      } catch (error) {
        ///
      } finally {
        setIsFavoriteLoading(false);
      }
    };

    fetchSingleFavorite();
  }, [catId]);

  const likeMutation = useMutation({
    mutationFn: createFavorite,
  });

  const like = async () => {
    if (!catId) {
      return;
    }
    const { id } = await likeMutation.mutateAsync({ imageId: catId });
    setFavoriteId(id);
  };

  const deleteMutation = useMutation({
    mutationFn: deleteFavorite,
  });

  const dislike = async () => {
    if (!catId || favoriteId === null) {
      return;
    }
    await deleteMutation.mutateAsync({ favoriteId });
    setFavoriteId(null);
  };

  const isLiked = favoriteId !== null;

  const isPending = likeMutation.isPending || deleteMutation.isPending || isSingleFavoriteLoading;

  return { like, dislike, isLiked, isPending };
};
