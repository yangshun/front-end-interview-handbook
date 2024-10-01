import clsx from 'clsx';
import React, { useEffect, useRef, useState } from 'react';
import { RiArrowLeftSLine, RiArrowRightSLine } from 'react-icons/ri';

import { FormattedMessage, useIntl } from '~/components/intl';
import Text from '~/components/ui/Text';
import {
  themeBackgroundBrandColor,
  themeTextLightColor,
} from '~/components/ui/theme';

function NavigationButton({
  direction,
  onClick,
}: Readonly<{
  direction: 'left' | 'right';
  onClick: () => void;
}>) {
  const intl = useIntl();

  const Icon = direction === 'left' ? RiArrowLeftSLine : RiArrowRightSLine;
  const label =
    direction === 'left'
      ? intl.formatMessage({
          defaultMessage: 'Previous image',
          description: 'Label for previous image',
          id: '+vnNEk',
        })
      : intl.formatMessage({
          defaultMessage: 'Next image',
          description: 'Label for next image',
          id: 'sV/OUK',
        });

  return (
    <button
      aria-label={label}
      className={clsx(
        'flex items-center justify-center',
        'group absolute bottom-0 top-0 w-12',
        direction === 'left' ? 'left-0' : 'right-0',
        'bg-neutral-800/20',
        'opacity-0 transition-opacity duration-1000 hover:opacity-100',
      )}
      type="button"
      onClick={onClick}>
      <Icon
        aria-hidden={true}
        className={clsx('size-8 shrink-0', themeTextLightColor)}
      />
    </button>
  );
}

type Props = Readonly<{
  images: Array<string>;
}>;

export default function ProjectsChallengeBriefImageCarousel({ images }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const imageListRef = useRef<HTMLDivElement>(null);
  const [current, setCurrent] = useState(0);
  const [imageWidth, setImageWidth] = useState(0);
  const GAP_BETWEEN_IMAGE = 8;
  const showInformationText = !!imageWidth;

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
    <div className="flex flex-col items-center gap-y-4">
      <div ref={ref} className="relative w-full overflow-clip rounded-lg">
        <div
          ref={imageListRef}
          className="no-scrollbar grid snap-x snap-mandatory overflow-x-auto"
          style={{
            gap: `${GAP_BETWEEN_IMAGE}px`,
            gridTemplateColumns: `repeat(${images.length}, 1fr)`,
          }}>
          {images.map((image) => (
            <img
              key={image}
              alt=""
              className="aspect-[1500/1116] w-full snap-center rounded-lg object-cover"
              decoding="async"
              loading="lazy"
              src={image}
              style={{
                maxWidth: `${imageWidth}px`,
                minWidth: `${imageWidth}px`,
              }}
            />
          ))}
        </div>
        {images.length > 1 && (
          <>
            <NavigationButton
              direction="left"
              onClick={() => scrollImage('left')}
            />
            <NavigationButton
              direction="right"
              onClick={() => scrollImage('right')}
            />
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
                    'h-0.5 w-6 flex-1 rounded-lg',
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
      {showInformationText && (
        <Text color="secondary" size="body3" weight="normal">
          <FormattedMessage
            defaultMessage="Images just for illustration. Actual page(s) could be longer"
            description="Info for carousel images in project brief"
            id="Ae22GD"
          />
        </Text>
      )}
    </div>
  );
}
