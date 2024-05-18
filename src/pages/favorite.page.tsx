import React from 'react';
import { useFavoriteData } from '../api/use-favorite-data.hook';
import { CatCard } from '../components/cat-card.component';
import { Button } from '../components/button.component';

export const FavoritePage: React.FC = () => {
  const { data, isLoading, isFetchingNextPage, fetchNextPage } = useFavoriteData();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!data) {
    return <div>No favorite cats:(</div>;
  }

  return (
    <div className="p-8 ">
      <div className="flex flex-wrap gap-8 justify-center mb-8">
        {data.pages.map((page) => {
          return page.map((item) => (
            <CatCard
              catId={item.image.id}
              key={item.id}
              image={item.image.url}
              name={'Cute cats'}
            />
          ));
        })}
      </div>
      <div className="flex justify-center">
        {data.pages[data.pages.length - 1].length === 10 && (
          <Button isLoading={isFetchingNextPage} onClick={() => fetchNextPage()}>
            Load more
          </Button>
        )}
      </div>
    </div>
  );
};
