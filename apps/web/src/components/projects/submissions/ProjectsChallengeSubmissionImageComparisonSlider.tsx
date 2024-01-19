import ReactCompareImage from 'react-compare-image';
import { RiArrowDropLeftFill, RiArrowDropRightFill } from 'react-icons/ri';

import Spinner from '~/components/ui/Spinner';

type Props = Readonly<{
  image: Readonly<{
    deployed: string;
    label: string;
    original: string;
  }>;
}>;

export default function ProjectsChallengeSubmissionImageComparisonSlider({
  image,
}: Props) {
  return (
    <div className="md:max-h-[610px] md:min-h-[610px]  max-h-[272pxpx] min-h-[272px]  overflow-y-auto">
      <ReactCompareImage
        handle={
          <div className="bg-brand-dark dark:bg-brand justify-center items-center w-[42px] h-[42px] rounded-full flex">
            <div className="flex">
              <RiArrowDropLeftFill className="h-7 w-7 -mr-2" />
              <RiArrowDropRightFill className="h-7 w-7 -ml-2" />
            </div>
          </div>
        }
        leftImage={image.deployed}
        leftImageCss={{ objectFit: 'contain', objectPosition: 'top' }}
        rightImage={image.original}
        rightImageCss={{ objectFit: 'contain', objectPosition: 'top' }}
        skeleton={
          <div className="w-full h-full flex items-center justify-center">
            <Spinner size="md" />
          </div>
        }
        sliderLineColor="#948CF9"
        sliderLineWidth={3}
      />
    </div>
  );
}
