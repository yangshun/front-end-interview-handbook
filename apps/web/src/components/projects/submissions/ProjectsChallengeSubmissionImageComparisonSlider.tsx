import clsx from 'clsx';
import ReactCompareImage from 'react-compare-image';
import { RiArrowDropLeftFill, RiArrowDropRightFill } from 'react-icons/ri';

import Spinner from '~/components/ui/Spinner';

type Props = Readonly<{
  image: Readonly<{
    label: string;
    original: string;
    screenshot: string | null | undefined;
  }>;
  maxWidth?: number;
}>;

export default function ProjectsChallengeSubmissionImageComparisonSlider({
  image,
  maxWidth,
}: Props) {
  return (
    <div className="w-full overflow-y-auto">
      <div
        className="mx-auto max-h-[272px] min-h-[272px] md:max-h-[610px] md:min-h-[610px]"
        style={{
          maxWidth: maxWidth ? `${maxWidth}px` : '100%',
        }}>
        <ReactCompareImage
          handle={
            <div className="bg-brand-dark dark:bg-brand flex h-[42px] w-[42px] items-center justify-center rounded-full">
              <div className="flex">
                <RiArrowDropLeftFill className="size-7 -mr-2" />
                <RiArrowDropRightFill className="size-7 -ml-2" />
              </div>
            </div>
          }
          leftImage={image.screenshot ?? ''}
          leftImageCss={{ objectFit: 'contain', objectPosition: 'top' }}
          rightImage={image.original}
          rightImageCss={{ objectFit: 'contain', objectPosition: 'top' }}
          skeleton={
            <div
              className={clsx('flex items-center justify-center', 'size-full')}>
              <Spinner size="md" />
            </div>
          }
          sliderLineColor="#948CF9"
          sliderLineWidth={3}
        />
      </div>
    </div>
  );
}
