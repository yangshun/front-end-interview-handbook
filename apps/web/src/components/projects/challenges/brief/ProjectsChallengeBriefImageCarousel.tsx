import clsx from 'clsx';
import { AnimatePresence, motion, wrap } from 'framer-motion';
import React, { useState } from 'react';
import { RiArrowLeftSLine, RiArrowRightSLine } from 'react-icons/ri';

import { FormattedMessage, useIntl } from '~/components/intl';
import Text from '~/components/ui/Text';
import {
  themeBackgroundBrandColor,
  themeTextLightColor,
} from '~/components/ui/theme';

const variants = {
  center: {
    opacity: 1,
    x: 0,
    zIndex: 1,
  },
  enter: (direction: number) => {
    return {
      opacity: 0,
      x: direction > 0 ? 1000 : -1000,
    };
  },
  exit: (direction: number) => {
    return {
      opacity: 0,
      x: direction < 0 ? 1000 : -1000,
      zIndex: 0,
    };
  },
};

const swipeConfidenceThreshold = 10000;
const swipePower = (offset: number, velocity: number) => {
  return Math.abs(offset) * velocity;
};

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
        'group absolute bottom-0 top-0 z-10 w-12',
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
  const intl = useIntl();

  const [page, setPage] = useState(0);
  const [direction, setDirection] = useState(0);
  const imageIndex = wrap(0, images.length, page);

  const paginate = (newDirection: number) => {
    setPage((prevPage) => prevPage + newDirection);
    setDirection(newDirection);
  };

  return (
    <div className="flex flex-col items-center gap-y-4">
      <div className="relative aspect-[1500/1116] w-full overflow-hidden rounded-lg">
        <div className="relative flex h-full w-full items-center justify-center">
          <AnimatePresence custom={direction} initial={false}>
            <motion.img
              key={page}
              animate="center"
              className="absolute inset-0 h-full w-full rounded-lg object-cover"
              custom={direction}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={1}
              exit="exit"
              initial="enter"
              src={images[imageIndex]}
              transition={{
                opacity: { duration: 0.2 },
                x: { damping: 30, stiffness: 300, type: 'spring' },
              }}
              variants={variants}
              onDragEnd={(_, { offset, velocity }) => {
                const swipe = swipePower(offset.x, velocity.x);

                if (swipe < -swipeConfidenceThreshold) {
                  paginate(1);
                } else if (swipe > swipeConfidenceThreshold) {
                  paginate(-1);
                }
              }}
            />
          </AnimatePresence>
        </div>
        {images.length > 1 && (
          <>
            <NavigationButton direction="left" onClick={() => paginate(-1)} />
            <NavigationButton direction="right" onClick={() => paginate(1)} />
            <div className="absolute bottom-0 right-0 z-10 mb-3 me-3 flex rounded-full bg-neutral-300 px-2 py-0.5">
              <Text color="dark" size="body3" weight="medium">
                {imageIndex + 1}/{images.length}
              </Text>
            </div>
            <div className="absolute bottom-0 left-1/2 z-10 mb-3 flex -translate-x-1/2 gap-2">
              {images.map((image, index) => (
                <button
                  key={image}
                  aria-label={intl.formatMessage(
                    {
                      defaultMessage: 'Go to image {imgIndex}',
                      description:
                        'Label for button to navigate carousel image',
                      id: 'Q3mZ0W',
                    },
                    { imgIndex: index + 1 },
                  )}
                  className={clsx(
                    'h-0.5 w-6 flex-1 rounded-lg',
                    index === imageIndex
                      ? themeBackgroundBrandColor
                      : 'bg-neutral-800/40',
                  )}
                  type="button"
                  onClick={() => {
                    const newDirection = index - imageIndex > 0 ? 1 : -1;

                    setPage(index);
                    setDirection(newDirection);
                  }}></button>
              ))}
            </div>
          </>
        )}
      </div>
      <Text color="secondary" size="body3" weight="normal">
        <FormattedMessage
          defaultMessage="Images just for illustration. Actual page(s) could be longer"
          description="Info for carousel images in project brief"
          id="Ae22GD"
        />
      </Text>
    </div>
  );
}
