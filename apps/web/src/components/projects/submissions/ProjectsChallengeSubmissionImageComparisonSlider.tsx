import clsx from 'clsx';
import { useEffect, useRef } from 'react';
import ReactCompareImage from 'react-compare-image';
import { RiArrowDropLeftFill, RiArrowDropRightFill } from 'react-icons/ri';

import Spinner from '~/components/ui/Spinner';
import { themeBackgroundBrandColor } from '~/components/ui/theme';

type Props = Readonly<{
  aspectRatio: '5/3' | '7/3';
  image: string | null | undefined;
  maxWidth?: number;
  originalImage: string;
}>;

export default function ProjectsChallengeSubmissionImageComparisonSlider({
  image,
  originalImage,
  aspectRatio,
  maxWidth,
}: Props) {
  const parentRef = useRef<HTMLDivElement>(null);
  const handleRef = useRef<HTMLDivElement>(null);

  // To keep the slider knob always vertically center on the scrollable visible area
  useEffect(() => {
    const parentRefElement = parentRef.current;
    const handleScroll = () => {
      const visibleHeight =
        parentRef.current?.getBoundingClientRect()?.height ?? 0;
      const position = visibleHeight / 2 + (parentRefElement?.scrollTop ?? 0);

      if (handleRef.current) {
        handleRef.current.style.top = `${position}px`;
      }
    };

    handleScroll();

    parentRefElement?.addEventListener('scroll', handleScroll);

    return () => {
      parentRefElement?.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div
      ref={parentRef}
      className={clsx(
        'w-full overflow-auto',
        aspectRatio === '5/3' && 'aspect-[5/3]',
        aspectRatio === '7/3' && 'aspect-[7/3]',
      )}>
      <div
        className="mx-auto"
        style={{
          maxWidth: maxWidth ? `${maxWidth}px` : '100%',
        }}>
        <ReactCompareImage
          handle={
            <div
              ref={handleRef}
              className={clsx(
                'flex items-center justify-center',
                'size-10 rounded-full',
                'absolute left-1/2 top-1/2 -translate-x-1/2 transform',
                themeBackgroundBrandColor,
              )}>
              <div className="flex">
                <RiArrowDropLeftFill className="size-7 -mr-2" />
                <RiArrowDropRightFill className="size-7 -ml-2" />
              </div>
            </div>
          }
          leftImage={image ?? ''}
          leftImageCss={{ objectFit: 'contain', objectPosition: 'top' }}
          rightImage={originalImage}
          rightImageCss={{ objectFit: 'contain', objectPosition: 'top' }}
          skeleton={
            <div
              className={clsx('flex items-center justify-center', 'size-full')}>
              <Spinner display="block" />
            </div>
          }
          sliderLineColor="hsl(var(--brand-default))"
          sliderLineWidth={3}
        />
      </div>
    </div>
  );
}
