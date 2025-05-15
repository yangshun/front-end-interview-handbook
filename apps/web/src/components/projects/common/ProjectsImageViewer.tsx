'use client';

import { useWheel } from '@use-gesture/react';
import clsx from 'clsx';
import { clamp } from 'lodash-es';
import { useEffect, useRef, useState } from 'react';
import { RiLayoutGridLine, RiZoomInLine, RiZoomOutLine } from 'react-icons/ri';
import { useToggle, useWindowSize } from 'usehooks-ts';

import { useIntl } from '~/components/intl';
import Button from '~/components/ui/Button';
import Img from '~/components/ui/Img';

type Props = Readonly<{
  alt: string;
  aspectRatioClass: string;
  grid: {
    columnGap: number;
    columns: number;
    containerWidth: number;
    sidePadding: number;
  };
  specShowGridLayoutButton: boolean;
  src: string;
  width: number;
}>;

const MIN_ZOOM_LEVEL = 20;
const MAX_ZOOM_LEVEL = 200;

export default function ProjectsImageViewer({
  alt,
  aspectRatioClass,
  specShowGridLayoutButton,
  src,
  width,
  grid,
}: Props) {
  const intl = useIntl();
  const wrapperRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const [zoomLevel, setZoomLevel] = useState(50);
  const [showGrid, toggleGrid] = useToggle(false);
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
        setZoomLevelWithClamp(zoomLevel - data.event.deltaY / 50);
      }
    },
    { eventOptions: { passive: false }, target: wrapperRef },
  );

  const { columnGap, sidePadding, columns, containerWidth } = grid;

  return (
    <div className="relative isolate max-h-full">
      <div className="absolute bottom-6 right-6 z-[1] flex flex-col gap-1">
        {specShowGridLayoutButton && (
          <Button
            icon={RiLayoutGridLine}
            isLabelHidden={true}
            label={intl.formatMessage({
              defaultMessage: 'Toggle grid',
              description: 'Image viewer toggle grid button label',
              id: 'FGbXVo',
            })}
            variant="secondary"
            onClick={() => toggleGrid()}
          />
        )}
        <Button
          icon={RiZoomInLine}
          isLabelHidden={true}
          label={intl.formatMessage({
            defaultMessage: 'Zoom in',
            description: 'Image viewer zoom in button label',
            id: 'S7OvQG',
          })}
          variant="secondary"
          onClick={() => setZoomLevelWithClamp(zoomLevel + 10)}
        />
        <Button
          icon={RiZoomOutLine}
          isLabelHidden={true}
          label={intl.formatMessage({
            defaultMessage: 'Zoom out',
            description: 'Image viewer zoom out button label',
            id: 'C19ZkT',
          })}
          variant="secondary"
          onClick={() => setZoomLevelWithClamp(zoomLevel - 10)}
        />
      </div>
      <div
        key={src}
        ref={wrapperRef}
        className={clsx(
          'w-full overflow-auto',
          aspectRatioClass,
          (imageSmallerThanWrapper.height || imageSmallerThanWrapper.width) &&
            'flex',
          imageSmallerThanWrapper.height ? 'items-center' : 'items-baseline',
          imageSmallerThanWrapper.width ? 'justify-center' : 'justify-baseline',
          'touch-none',
        )}>
        <div className="relative" style={{ width: (width * zoomLevel) / 100 }}>
          {showGrid && (
            <div className="absolute inset-0">
              <div className="h-full">
                <div
                  className="relative mx-auto flex h-full"
                  style={{ width: `${(containerWidth / width) * 100}%` }}>
                  <div
                    className="bg-red/20 h-full"
                    style={{ width: `${(sidePadding / width) * 100}%` }}
                  />
                  <div
                    className="grid h-full grow"
                    style={{
                      gap: `${(columnGap / width) * 100}%`,
                      gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
                    }}>
                    {Array.from({ length: columns }, (_, index) => (
                      <div key={index} className="bg-red/10 h-full" />
                    ))}
                  </div>
                  <div
                    className="bg-red/20 h-full"
                    style={{ width: `${(sidePadding / width) * 100}%` }}
                  />
                </div>
              </div>
            </div>
          )}
          <Img
            ref={imageRef}
            alt={alt}
            className="pointer-events-none max-w-none touch-none select-none"
            decoding="async"
            loading="lazy"
            src={src}
            style={{
              width: (width * zoomLevel) / 100,
            }}
            onLoad={recalculate}
          />
        </div>
      </div>
    </div>
  );
}
