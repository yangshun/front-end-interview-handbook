import clsx from 'clsx';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { RiZoomInLine, RiZoomOutLine } from 'react-icons/ri';
import { useWindowSize } from 'usehooks-ts';

import Button from '~/components/ui/Button';

type Props = Readonly<{
  alt: string;
  src: string;
  width: number;
}>;

export default function ProjectsImageViewer({ alt, src, width }: Props) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const [zoomLevel, setZoomLevel] = useState(50);
  const [imageSmallerThanWrapper, setImageSmallerThanWrapper] = useState({
    height: true,
    width: true,
  });
  const windowSize = useWindowSize();

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

  return (
    <div className="relative">
      <div className="absolute bottom-6 left-6 flex flex-col gap-1">
        <Button
          icon={RiZoomInLine}
          isLabelHidden={true}
          label="Zoom in"
          variant="secondary"
          onClick={() => setZoomLevel(zoomLevel + 10)}
        />
        <Button
          icon={RiZoomOutLine}
          isLabelHidden={true}
          label="Zoom out"
          variant="secondary"
          onClick={() => setZoomLevel(zoomLevel - 10)}
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
        )}>
        <img
          ref={imageRef}
          alt={alt}
          className="pointer-events-auto max-w-none touch-none select-none"
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
