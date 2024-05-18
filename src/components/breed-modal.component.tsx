import React from 'react';
import { Button } from './button.component';
import { Carousel, Modal } from 'flowbite-react';
import { useSearchParams } from 'react-router-dom';

import { Link } from 'react-router-dom';
import { filterSearchParams } from '../utils/search-params';
import { useRandomCatData } from '../api/use-random-cat-data.hook';

export const BreedModal: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [openModal, setOpenModal] = React.useState(false);
  const breed = searchParams.get('breed');
  const { data, isLoading } = useRandomCatData({ breedId: breed });

  React.useEffect(() => {
    setOpenModal(!!breed);
  }, [breed]);

  const closeModal = () => {
    const paramsObject = filterSearchParams(searchParams, 'breed');
    setSearchParams(paramsObject);
  };

  const handleImageClick = (catId: string) => {
    setSearchParams((prev) => ({
      ...prev,
      cat: catId,
    }));
  };

  return (
    <>
      <Modal show={openModal} onClose={closeModal}>
        <Modal.Header>
          {isLoading
            ? 'Loading...'
            : data?.pages[0][0].breeds.map((b) => b.name).join(',') || 'Cute kitty'}
        </Modal.Header>
        <Modal.Body>
          <div className="h-56 sm:h-64 xl:h-80 2xl:h-96">
            <Carousel>
              {data?.pages.map((page) => {
                return page.map((cat) => (
                  <img
                    src={cat.url}
                    alt={cat.id}
                    key={cat.id}
                    onClick={() => handleImageClick(cat.id)}
                  />
                ));
              })}
            </Carousel>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};
