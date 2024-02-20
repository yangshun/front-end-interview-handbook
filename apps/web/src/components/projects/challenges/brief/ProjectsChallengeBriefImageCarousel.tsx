import clsx from 'clsx';
import React, { useEffect, useRef, useState } from 'react';
import { RiArrowLeftSLine, RiArrowRightSLine } from 'react-icons/ri';
import { useIntl } from 'react-intl';

import Button from '~/components/ui/Button';
import Text from '~/components/ui/Text';
import { themeBackgroundBrandColor } from '~/components/ui/theme';

type Props = Readonly<{
  images: Array<string>;
}>;

export default function ProjectsChallengeBriefImageCarousel({ images }: Props) {
  const intl = useIntl();
  const ref = useRef<HTMLDivElement>(null);
  const imageListRef = useRef<HTMLDivElement>(null);
  const [current, setCurrent] = useState(0);
  const [imageWidth, setImageWidth] = useState(0);
  const GAP_BETWEEN_IMAGE = 8;

  const scrollImage = (direction: 'left' | 'right') => {
    const maxScrollLeft =
      (imageListRef?.current?.scrollWidth ?? 0) -
      (imageListRef?.current?.clientWidth ?? 0);

    const directionValue = direction === 'left' ? -1 : 1;
    const scrollAmount =
      (imageListRef.current?.clientWidth ?? 0) * directionValue;

    imageListRef.current?.scrollBy({
      behavior: 'smooth',
      left:
        direction === 'right'
          ? imageListRef?.current.scrollLeft + 4 >= maxScrollLeft
            ? -imageListRef?.current.scrollLeft
            : scrollAmount ?? 0
          : imageListRef?.current.scrollLeft - 4 <= 0
            ? maxScrollLeft
            : scrollAmount ?? 0,
    });
  };

  useEffect(() => {
    const element = imageListRef.current;
    const handleScroll = () => {
      if (imageListRef.current) {
        const { scrollLeft } = imageListRef.current;
        const currentIndex = Math.round(
          scrollLeft / (imageWidth + GAP_BETWEEN_IMAGE),
        );

        setCurrent(currentIndex);
      }
    };

    if (element) {
      element.addEventListener('scroll', handleScroll);
    }

    return () => {
      if (element) {
        element.removeEventListener('scroll', handleScroll);
      }
    };
  }, [imageWidth]);

  useEffect(() => {
    setImageWidth(ref.current?.offsetWidth ?? 0);
  }, []);

  useEffect(() => {
    const moveOnWindowResize = () => {
      setImageWidth(ref.current?.offsetWidth ?? 0);
    };

    window.addEventListener('resize', moveOnWindowResize);

    return () => window.removeEventListener('resize', moveOnWindowResize);
  });

  return (
    <div ref={ref} className="relative w-full rounded-lg">
      <div
        ref={imageListRef}
        className="no-scrollbar grid snap-x snap-mandatory overflow-x-auto"
        style={{
          gap: `${GAP_BETWEEN_IMAGE}px`,
          gridTemplateColumns: `repeat(${images.length}, 1fr)`,
        }}>
        {images.map((image, index) => {
          return (
            <img
              key={image}
              alt={`Project challenge image ${index + 1}`}
              className="h-[266px] w-full snap-center rounded-lg object-cover md:h-[372px]"
              src={image}
              style={{
                maxWidth: `${imageWidth}px`,
                minWidth: `${imageWidth}px`,
              }}
            />
          );
        })}
      </div>
      {images.length > 1 && (
        <>
          <div className="absolute left-2 top-1/2 -translate-y-1/2 transform">
            <Button
              icon={RiArrowLeftSLine}
              isLabelHidden={true}
              label={intl.formatMessage({
                defaultMessage: 'Previous image',
                description: 'Label for previous image',
                id: '+vnNEk',
              })}
              variant="secondary"
              onClick={() => scrollImage('left')}
            />
          </div>
          <div className="absolute right-2 top-1/2 -translate-y-1/2 transform">
            <Button
              icon={RiArrowRightSLine}
              isLabelHidden={true}
              label={intl.formatMessage({
                defaultMessage: 'Next image',
                description: 'Label for next image',
                id: 'sV/OUK',
              })}
              variant="secondary"
              onClick={() => scrollImage('right')}
            />
          </div>
          <div className="absolute bottom-0 right-0 mb-3 me-3 flex rounded-full bg-neutral-300 px-2 py-0.5">
            <Text color="dark" size="body3" weight="medium">
              {current + 1}/{images.length}
            </Text>
          </div>
          <div className="absolute bottom-0 left-1/2 mb-3 flex -translate-x-1/2 gap-2">
            {images.map((image, index) => (
              <div
                key={image}
                className={clsx(
                  'h-1.5 w-5 flex-1 rounded-lg',
                  index === current
                    ? themeBackgroundBrandColor
                    : 'bg-neutral-800/40',
                )}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
