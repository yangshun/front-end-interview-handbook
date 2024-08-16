import { useState } from 'react';

function clsx(...classnames: Array<any>) {
  return classnames.filter(Boolean).join(' ');
}

function shouldTransitionToLeftDirection(
  currIndex: number,
  nextIndex: number,
  totalImages: number,
) {
  // Last going to first.
  if (currIndex === totalImages - 1 && nextIndex === 0) {
    return true;
  }

  // First going to last.
  if (currIndex === 0 && nextIndex === totalImages - 1) {
    return false;
  }

  return currIndex < nextIndex;
}

export default function ImageCarousel({
  images,
}: Readonly<{
  images: ReadonlyArray<{ src: string; alt: string }>;
}>) {
  const [currIndex, setCurrIndex] = useState(0);
  const [nextIndex, setNextIndex] = useState<number | null>(
    null,
  );
  const [isTransitioning, setIsTransitioning] =
    useState(false);
  const currImage = images[currIndex];
  const nextImage =
    nextIndex != null ? images[nextIndex] : null;

  function changeImageIndex(index: number) {
    setNextIndex(index);
    // Allow the next image to be rendered to the DOM first
    // so that the next image can be transitioned in.
    requestAnimationFrame(() => {
      setIsTransitioning(true);
    });
  }

  const { exitClassname, enterClassname } =
    nextIndex != null &&
    shouldTransitionToLeftDirection(
      currIndex,
      nextIndex,
      images.length,
    )
      ? {
          exitClassname:
            'image-carousel__image--displaced-left',
          enterClassname:
            'image-carousel__image--displaced-right',
        }
      : {
          exitClassname:
            'image-carousel__image--displaced-right',
          enterClassname:
            'image-carousel__image--displaced-left',
        };

  return (
    <div className="image-carousel">
      <img
        alt={currImage.alt}
        src={currImage.src}
        key={currImage.src}
        className={clsx(
          'image-carousel__image',
          isTransitioning && exitClassname,
        )}
      />
      {nextImage != null && (
        <img
          alt={nextImage.alt}
          src={nextImage.src}
          key={nextImage.src}
          onTransitionEnd={() => {
            setCurrIndex(nextIndex!);
            setNextIndex(null);
            setIsTransitioning(false);
          }}
          className={clsx(
            'image-carousel__image',
            !isTransitioning && enterClassname,
          )}
        />
      )}
      <button
        aria-label="Previous image"
        disabled={isTransitioning}
        className="image-carousel__button image-carousel__button--prev"
        onClick={() => {
          const nextIndex =
            (currIndex - 1 + images.length) % images.length;
          changeImageIndex(nextIndex);
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
              changeImageIndex(index);
            }}
          />
        ))}
      </div>
      <button
        aria-label="Next image"
        className="image-carousel__button image-carousel__button--next"
        disabled={isTransitioning}
        onClick={() => {
          const nextIndex = (currIndex + 1) % images.length;
          changeImageIndex(nextIndex);
        }}>
        &#10095;
      </button>
    </div>
  );
}
