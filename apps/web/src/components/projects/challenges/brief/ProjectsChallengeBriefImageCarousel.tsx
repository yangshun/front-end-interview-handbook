import clsx from 'clsx';
import React, { useEffect, useRef, useState } from 'react';
import { RiArrowLeftSLine, RiArrowRightSLine } from 'react-icons/ri';
import { useIntl } from 'react-intl';

import Button from '~/components/ui/Button';
import Text from '~/components/ui/Text';

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
      // Had to disable smooth scroll because it causing issue to find the current image with scroll listener
      // Behavior: 'smooth',
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
    <div ref={ref} className="relative rounded-lg w-full">
      <div
        ref={imageListRef}
        className="grid overflow-x-auto snap-x snap-mandatory"
        style={{
          gap: `${GAP_BETWEEN_IMAGE}px`,
          gridTemplateColumns: `repeat(${images.length}, 1fr)`,
        }}>
        {images.map((image, index) => {
          return (
            <img
              key={image}
              alt={`Project challenge image ${index + 1}`}
              className="object-cover rounded-lg w-full snap-center md:h-[372px] h-[266px]"
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
          <div className="absolute left-2 top-1/2 transform -translate-y-1/2">
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
          <div className="absolute right-2 top-1/2 transform -translate-y-1/2">
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
          <div className="flex absolute right-0 bottom-0 me-3 mb-6 bg-neutral-300 rounded-full px-2 py-0.5">
            <Text color="dark" size="body3" weight="medium">
              {current + 1}/{images.length}
            </Text>
          </div>
          <div className="absolute mb-8 bottom-0 left-1/2 -translate-x-1/2 flex gap-2">
            {images.map((image, index) => (
              <div
                key={image}
                className={clsx(
                  'flex-1 h-[5px] w-[20px] rounded-lg',
                  'bg-neutral-800/40',
                  index === current && '!bg-brand dark:!bg-brand-dark',
                )}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
