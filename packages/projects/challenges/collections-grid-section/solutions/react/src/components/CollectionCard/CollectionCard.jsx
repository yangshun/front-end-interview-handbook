import clsx from 'clsx';
import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import Link from 'src/components/ui/Link';

const variantClasses = {
  primary: clsx('max-w-[594px] h-[580px]'),
  secondary: clsx('max-w-[594px] h-[337px] md:h-[276px]'),
};

const CollectionCard = ({
  imageUrl,
  name,
  description,
  id,
  variant = 'primary',
}) => {
  const navigate = useNavigate();

  const redirectUrl = `/products?collectionId=${id}`;

  const handleKeyDown = useCallback(
    (event) => {
      if (event.key === 'Enter') {
        navigate(redirectUrl);
      }
    },
    [navigate, redirectUrl],
  );

  return (
    <div
      className={clsx(
        'relative',
        'group',
        'overflow-hidden rounded-lg',
        'focus:outline-none focus-visible:ring-4 focus-visible:ring-indigo-600/[.12]',
      )}
      onKeyDown={handleKeyDown}
      tabIndex={0}>
      <img
        loading="lazy"
        src={imageUrl}
        alt={`${name}'s banner`}
        className={clsx('w-full object-cover', variantClasses[variant])}
      />
      <Link
        tabIndex={-1}
        to={redirectUrl}
        variant="unstyled"
        className="bg-collection hover:bg-collection-hover absolute inset-0 transition-all duration-300">
        <div
          className={clsx(
            'absolute inset-x-4 bottom-4',
            'flex flex-col',
            'text-white',
          )}>
          <span className="text-sm">{name}</span>
          <span className="text-lg font-medium">{description}</span>
        </div>
      </Link>
    </div>
  );
};

export default CollectionCard;
