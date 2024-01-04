import { useIntl } from 'react-intl';

import type { YOEReplacement } from '~/components/projects/types';
import type { RadioGroupItemProps } from '~/components/ui/RadioGroup/RadioGroupItem';

export default function useYOEReplacementOptions() {
  const intl = useIntl();

  const yoeReplacementOptions = [
    {
      label: intl.formatMessage({
        defaultMessage: 'Undergrad CS',
        description: 'Label for "Undergrad CS" option in YOE replacement',
        id: 'E5x8uP',
      }),
      value: 'undergrad-cs',
    },
    {
      label: intl.formatMessage({
        defaultMessage: 'Masters CS',
        description: 'Label for "Masters CS" option in YOE replacement',
        id: 'pkWsMA',
      }),
      value: 'masters-cs',
    },
    {
      label: intl.formatMessage({
        defaultMessage: 'Intern',
        description: 'Label for "Intern" option in YOE replacement',
        id: 'HdBv6k',
      }),
      value: 'intern',
    },
    {
      label: intl.formatMessage({
        defaultMessage: 'Fresh Grad',
        description: 'Label for "Fresh Grad" option in YOE replacement',
        id: 'oxD4TD',
      }),
      value: 'fresh-grad',
    },
    {
      label: intl.formatMessage({
        defaultMessage: 'Career Switcher',
        description: 'Label for "Career Switcher" option in YOE replacement',
        id: 'DjHA82',
      }),
      value: 'career-switcher',
    },
    {
      label: intl.formatMessage({
        defaultMessage: 'Bootcamp Grad',
        description: 'Label for "Bootcamp Grad" option in YOE replacement',
        id: 'SpM0k8',
      }),
      value: 'bootcamp-grad',
    },
    {
      label: intl.formatMessage({
        defaultMessage: 'Bootcamper',
        description: 'Label for "Bootcamper" option in YOE replacement',
        id: 'WBESe1',
      }),
      value: 'bootcamper',
    },
    {
      label: intl.formatMessage({
        defaultMessage: 'Self-Learning',
        description: 'Label for "Self-Learning" option in YOE replacement',
        id: '+ahYqd',
      }),
      value: 'self-learning',
    },
    {
      label: intl.formatMessage({
        defaultMessage: 'Others',
        description: 'Label for "Others" option in YOE replacement',
        id: '9nq03w',
      }),
      value: 'others',
    },
  ] as const satisfies ReadonlyArray<RadioGroupItemProps<YOEReplacement>>;

  return yoeReplacementOptions;
}
