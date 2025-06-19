import { useState } from 'react';

function clsx(...classnames: Array<any>) {
  return classnames.filter(Boolean).join(' ');
}

export default function ImageCarousel({
  images,
}: Readonly<{
  images: ReadonlyArray<{ src: string; alt: string }>;
}>) {
  const [currIndex, setCurrIndex] = useState(0);
  const currImage = images[currIndex];

  return (
    <div className="image-carousel">
      <img
        alt={currImage.alt}
        src={currImage.src}
        key={currImage.src}
        className="image-carousel__image"
      />
      <button
        aria-label="Previous image"
        className="image-carousel__button image-carousel__button--prev"
        onClick={() => {
          const nextIndex =
            (currIndex - 1 + images.length) % images.length;
          setCurrIndex(nextIndex);
        }}>
        &#10094;
      </button>
      <div className="image-carousel__pages">
        {images.map(({ alt, src }, index) => (
          <button
            className={clsx(
              'image-carousel__pages__button',
              index === currIndex &&
                'image-carousel__pages__button--active',
            )}
            aria-label={`Navigate to ${alt}`}
            key={src}
            onClick={() => {
              setCurrIndex(index);
            }}
          />
        ))}
      </div>
      <button
        aria-label="Next image"
        className="image-carousel__button image-carousel__button--next"
        onClick={() => {
          const nextIndex = (currIndex + 1) % images.length;
          setCurrIndex(nextIndex);
        }}>
        &#10095;
      </button>
    </div>
  );
}
