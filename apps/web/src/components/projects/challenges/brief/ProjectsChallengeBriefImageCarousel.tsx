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
  const [current, setCurrent] = useState(0);
  const [imageWidth, setImageWidth] = useState(0);
  const GAP_BETWEEN_IMAGE = 8;

  const previousImage = () =>
    setCurrent((current + images.length - 1) % images.length);

  const nextImage = () => setCurrent((current + 1) % images.length);

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
    <div ref={ref} className="relative overflow-hidden rounded-lg w-full">
      <div
        className="flex transition ease-out duration-1000 md:h-[372px] h-[266px]"
        style={{
          gap: `${GAP_BETWEEN_IMAGE}px`,
          transform: `translateX(calc(-${
            current * imageWidth + current * GAP_BETWEEN_IMAGE
          }px ))`,
          width: `${images.length * imageWidth}px`,
        }}>
        {images.map((image, index) => {
          return (
            <img
              key={Math.random()}
              alt={`Project challenge image ${index + 1}`}
              className="snap-center object-cover rounded-lg h-full w-full"
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
          <div className="absolute top-0 h-full w-full justify-between items-center flex px-2">
            <Button
              icon={RiArrowLeftSLine}
              isLabelHidden={true}
              label={intl.formatMessage({
                defaultMessage: 'Previous image',
                description: 'Label for previous image',
                id: '+vnNEk',
              })}
              variant="secondary"
              onClick={previousImage}
            />
            <Button
              icon={RiArrowRightSLine}
              isLabelHidden={true}
              label={intl.formatMessage({
                defaultMessage: 'Next image',
                description: 'Label for next image',
                id: 'sV/OUK',
              })}
              variant="secondary"
              onClick={nextImage}
            />
          </div>
          <div className="absolute bottom-2 right-2 bg-neutral-300 dark:bg-neutral-300 rounded-full px-2 py-0.5">
            <Text color="dark" size="body3" weight="medium">
              {current + 1}/{images.length}
            </Text>
          </div>
        </>
      )}
    </div>
  );
}
