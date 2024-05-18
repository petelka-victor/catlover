import { Label, Select } from 'flowbite-react';
import React from 'react';
import { useBreedData } from '../api/use-breed-data.hook';
import { Button } from '../components/button.component';
import { useSearchParams } from 'react-router-dom';

export const BreedPage: React.FC = () => {
  const { data, isLoading } = useBreedData();
  const [searchParams, setSearchParams] = useSearchParams();

  const handleBreedButton = (breedId: string) => {
    setSearchParams((prev) => ({
      ...prev,
      breed: breedId,
    }));
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!data) {
    return <div>NO Breeds :(</div>;
  }

  return (
    <div className="p-8">
      <div className="flex flex-wrap gap-4">
        {data.map((breed) => (
          <Button key={breed.id} onClick={() => handleBreedButton(breed.id)}>
            {breed.name}
          </Button>
        ))}
      </div>
    </div>
  );
};
