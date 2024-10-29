import type { InterviewsStudyList } from 'contentlayer/generated';
import {
  RiEye2Line,
  RiFireLine,
  RiFlashlightLine,
  RiRocketLine,
  RiStarLine,
} from 'react-icons/ri';

export const StudyPlanIcons: Record<
  string,
  (props: React.ComponentProps<'svg'>) => JSX.Element
> = {
  blind75: RiEye2Line,
  greatfrontend75: RiRocketLine,
  'one-month': RiFireLine,
  'one-week': RiFlashlightLine,
  'three-months': RiStarLine,
};

export function mapStudyPlansBySlug(
  focusAreas: ReadonlyArray<InterviewsStudyList>,
) {
  return focusAreas.reduce((acc: Record<string, InterviewsStudyList>, item) => {
    acc[item.slug] = item;

    return acc;
  }, {});
}
