import { useEffect, useRef, useState } from 'react';

function clsx(...classnames: Array<any>) {
  return classnames.filter(Boolean).join(' ');
}

export default function ImageCarousel({
  images,
}: Readonly<{
  images: ReadonlyArray<{ src: string; alt: string }>;
}>) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [currIndex, setCurrIndex] = useState(0);
  const [imageWidth, setImageWidth] = useState<
    number | null
  >(null);
  const [isTransitioning, setIsTransitioning] =
    useState(false);

  function updateImageWidth() {
    setImageWidth(
      ref.current?.getBoundingClientRect()?.width ?? 0,
    );
  }

  function changeCurrIndex(newIndex: number) {
    const nextIndex =
      (newIndex + images.length) % images.length;
    setIsTransitioning(true);
    setCurrIndex(nextIndex);
  }

  useEffect(() => {
    updateImageWidth();

    window.addEventListener('resize', updateImageWidth);

    return () => {
      window.removeEventListener(
        'resize',
        updateImageWidth,
      );
    };
  }, [updateImageWidth]);

  return (
    <div className="image-carousel" ref={ref}>
      <div
        className={clsx(
          'image-carousel__row',
          // Only add transition class when there is a need to
          // animate the transition, otherwise the translation update
          // is also transitioned when resizing the screen.
          isTransitioning &&
            'image-carousel__row--transitioning',
        )}
        style={{
          transform: imageWidth
            ? `translateX(-${currIndex * imageWidth}px)`
            : undefined,
        }}
        onTransitionEnd={() => {
          setIsTransitioning(false);
        }}>
        {images.map(({ alt, src }) => (
          <img
            alt={alt}
            src={src}
            key={src}
            className={clsx('image-carousel__image')}
          />
        ))}
      </div>
      <button
        aria-label="Previous image"
        disabled={isTransitioning}
        className="image-carousel__button image-carousel__button--prev"
        onClick={() => {
          changeCurrIndex(currIndex - 1);
        }}>
        &#10094;
      </button>
      <div className="image-carousel__pages">
        {images.map(({ alt, src }, index) => (
          <button
            aria-label={`Navigate to ${alt}`}
            className={clsx(
              'image-carousel__pages__button',
              index === currIndex &&
                'image-carousel__pages__button--active',
            )}
            disabled={isTransitioning}
            key={src}
            onClick={() => {
              changeCurrIndex(index);
            }}
          />
        ))}
      </div>
      <button
        aria-label="Next image"
        className="image-carousel__button image-carousel__button--next"
        disabled={isTransitioning}
        onClick={() => {
          changeCurrIndex(currIndex + 1);
        }}>
        &#10095;
      </button>
    </div>
  );
}
