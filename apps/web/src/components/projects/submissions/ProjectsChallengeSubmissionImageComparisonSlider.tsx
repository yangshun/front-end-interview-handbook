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
}>;

export default function ProjectsChallengeSubmissionImageComparisonSlider({
  image,
}: Props) {
  return (
    <div className="max-h-[272px] min-h-[272px] overflow-y-auto md:max-h-[610px] md:min-h-[610px]">
      <ReactCompareImage
        handle={
          <div className="bg-brand-dark dark:bg-brand flex h-[42px] w-[42px] items-center justify-center rounded-full">
            <div className="flex">
              <RiArrowDropLeftFill className="-mr-2 size-7" />
              <RiArrowDropRightFill className="-ml-2 size-7" />
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
  );
}
