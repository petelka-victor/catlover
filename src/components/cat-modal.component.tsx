import React from 'react';
import { Button } from './button.component';
import { Modal } from 'flowbite-react';
import { useSearchParams } from 'react-router-dom';
import { useSingleCatData } from '../api/use-single-cat-data-hook';
import { HeartIcon as HeartIconSolid } from '@heroicons/react/24/solid';
import { HeartIcon as HeartIconOutline } from '@heroicons/react/24/outline';
import { useLikeApi } from '../api/use-like-api.hooks';

import { filterSearchParams } from '../utils/search-params';

export const CatModal: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [openModal, setOpenModal] = React.useState(false);
  const cat = searchParams.get('cat');
  const { data, isLoading } = useSingleCatData({ id: cat });
  const { like, dislike, isLiked, isPending } = useLikeApi({ catId: cat });

  React.useEffect(() => {
    setOpenModal(!!cat);
  }, [cat]);

  const closeModal = () => {
    const paramsObject = filterSearchParams(searchParams, 'cat');
    setSearchParams(paramsObject);
  };

  const handleLikeButton = () => {
    if (isLiked) {
      dislike();
    } else {
      like();
    }
  };

  const handleLearnMore = (breedId: string) => {
    setSearchParams({
      breed: breedId,
    });
  };

  return (
    <>
      <Modal show={openModal} onClose={closeModal}>
        <Modal.Header>
          {isLoading ? 'Loading...' : data?.breeds?.map((b) => b.name).join(',') || 'Cute kitty'}
        </Modal.Header>
        <Modal.Body>
          <div className=" flex flex-col gap-6">
            {data?.url && (
              <div className="relative">
                <div className="absolute top-4 right-4">
                  <Button size="sm" onClick={handleLikeButton} isLoading={isPending}>
                    {isLiked ? (
                      <HeartIconSolid className="h-4 w-4 text-white" />
                    ) : (
                      <HeartIconOutline className="h-4 w-4 text-white" />
                    )}
                  </Button>
                </div>
                <img src={data?.url} alt="" />
              </div>
            )}

            {data?.breeds && (
              <>
                <p>{data.breeds[0].description}</p>
                <Button onClick={() => handleLearnMore(data.breeds ? data.breeds[0].id : '')}>
                  Learn more
                </Button>
              </>
            )}
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};
