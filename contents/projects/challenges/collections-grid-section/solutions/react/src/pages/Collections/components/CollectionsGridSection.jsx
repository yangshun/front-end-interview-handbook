import clsx from 'clsx';
import { useEffect, useState } from 'react';

import CollectionCard from 'src/components/CollectionCard';

const CollectionsGridSection = () => {
  const [collections, setCollections] = useState([]);
  const [isFetching, setIsFetching] = useState(true);

  const getLatestArrivalProducts = async () => {
    setIsFetching(true);

    const data = await fetch(
      `https://www.greatfrontend.com/api/projects/challenges/e-commerce/collections`,
    );
    const result = await data.json();

    if (!result.error) {
      setCollections(result.data);
    }
    setIsFetching(false);
  };

  useEffect(() => {
    getLatestArrivalProducts();
  }, []);

  return (
    <div
      className={clsx(
        'px-4 py-12 md:py-[172px] lg:px-24 lg:py-[104px]',
        'flex flex-col gap-8',
      )}>
      <div className="text-3xl font-semibold">Our Collections</div>
      {isFetching ? (
        <div>Loading...</div>
      ) : (
        <div className={clsx('flex flex-col gap-7 md:flex-row')}>
          <div className={clsx('flex-1')}>
            <CollectionCard
              imageUrl={collections[0].image_url}
              name={collections[0].name}
              description={collections[0].description}
              id={collections[0].collection_id}
            />
          </div>
          <div className={clsx('flex-1', 'flex flex-col gap-7')}>
            <div className={clsx('flex-1')}>
              <CollectionCard
                imageUrl={collections[1].image_url}
                name={collections[1].name}
                description={collections[1].description}
                id={collections[1].collection_id}
                variant="secondary"
              />
            </div>
            <div className={clsx('flex-1')}>
              <CollectionCard
                imageUrl={collections[2].image_url}
                name={collections[2].name}
                description={collections[2].description}
                id={collections[2].collection_id}
                variant="secondary"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CollectionsGridSection;
