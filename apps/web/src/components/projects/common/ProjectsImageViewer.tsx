import clsx from 'clsx';
import { clamp } from 'lodash-es';
import { useEffect, useRef, useState } from 'react';
import { RiZoomInLine, RiZoomOutLine } from 'react-icons/ri';
import { useWindowSize } from 'usehooks-ts';

import Button from '~/components/ui/Button';

import { useWheel } from '@use-gesture/react';

type Props = Readonly<{
  alt: string;
  src: string;
  width: number;
}>;

const MIN_ZOOM_LEVEL = 20;
const MAX_ZOOM_LEVEL = 200;

export default function ProjectsImageViewer({ alt, src, width }: Props) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const [zoomLevel, setZoomLevel] = useState(50);
  const [imageSmallerThanWrapper, setImageSmallerThanWrapper] = useState({
    height: true,
    width: true,
  });
  const windowSize = useWindowSize();

  function setZoomLevelWithClamp(value: number) {
    setZoomLevel(clamp(value, MIN_ZOOM_LEVEL, MAX_ZOOM_LEVEL));
  }

  useEffect(() => {
    setZoomLevel(50);
  }, [src]);

  function recalculate() {
    if (!imageRef.current || !wrapperRef.current) {
      return;
    }

    // The result can be inaccurate depending on whether the image has loaded.
    // Hence we also trigger this function in <img>' onLoad.
    setImageSmallerThanWrapper({
      height: imageRef.current.clientHeight < wrapperRef.current.clientHeight,
      width: imageRef.current.clientWidth < wrapperRef.current.clientWidth,
    });
  }

  useEffect(recalculate, [
    zoomLevel,
    windowSize.width,
    windowSize.height,
    imageRef.current?.clientHeight,
    imageRef.current?.clientWidth,
  ]);

  useWheel(
    (data) => {
      if (data.ctrlKey) {
        data.event.preventDefault();
        setZoomLevelWithClamp(zoomLevel + data.event.wheelDeltaY / 50);
      }
    },
    { eventOptions: { passive: false }, target: wrapperRef },
  );

  return (
    <div className="relative max-h-full">
      <div className="absolute bottom-6 right-6 flex flex-col gap-1">
        <Button
          icon={RiZoomInLine}
          isLabelHidden={true}
          label="Zoom in"
          variant="secondary"
          onClick={() => setZoomLevelWithClamp(zoomLevel + 10)}
        />
        <Button
          icon={RiZoomOutLine}
          isLabelHidden={true}
          label="Zoom out"
          variant="secondary"
          onClick={() => setZoomLevelWithClamp(zoomLevel - 10)}
        />
      </div>
      <div
        key={src}
        ref={wrapperRef}
        className={clsx(
          'aspect-[5/3] w-full overflow-auto',
          (imageSmallerThanWrapper.height || imageSmallerThanWrapper.width) &&
            'flex',
          imageSmallerThanWrapper.height ? 'items-center' : 'items-baseline',
          imageSmallerThanWrapper.width ? 'justify-center' : 'justify-baseline',
          'touch-none',
        )}>
        <img
          ref={imageRef}
          alt={alt}
          className="pointer-events-none max-w-none touch-none select-none"
          src={src}
          style={{
            width: (width * zoomLevel) / 100,
          }}
          onLoad={recalculate}
        />
      </div>
    </div>
  );
}
