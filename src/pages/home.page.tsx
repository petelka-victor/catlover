import React from 'react';
import { useRandomCatData } from '../api/use-random-cat-data.hook';
import { CatCard } from '../components/cat-card.component';
import { Button } from '../components/button.component';

export const HomePage: React.FC = () => {
  const { data, isLoading, isError, fetchNextPage, isFetchingNextPage } = useRandomCatData();

  if (isError) {
    return <div>Ooops, something wrong happened</div>;
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!data) {
    return <div>No cats :(</div>;
  }

  return (
    <div className="p-8">
      <div className="flex flex-wrap gap-8 justify-center mb-8">
        {data.pages.map((page) => {
          return page.map((item) => (
            <CatCard
              catId={item.id}
              key={item.id}
              image={item.url}
              name={item.breeds.map((b) => b.name).join(',') || 'Cute cats'}
            />
          ));
        })}
      </div>
      <div className="flex justify-center">
        <Button isLoading={isFetchingNextPage} onClick={() => fetchNextPage()}>
          Load more
        </Button>
      </div>
    </div>
  );
};
