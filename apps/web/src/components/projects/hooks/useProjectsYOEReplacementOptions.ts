import { useIntl } from '~/components/intl';
import type { ProjectsYoeReplacement } from '~/components/projects/types';
import type { RadioGroupItemProps } from '~/components/ui/RadioGroup/RadioGroupItem';

export default function useProjectsYOEReplacementOptions() {
  const intl = useIntl();

  const yoeOptionMap: Record<ProjectsYoeReplacement, { label: string }> = {
    'bootcamp-grad': {
      label: intl.formatMessage({
        defaultMessage: 'Bootcamp Grad',
        description: 'Label for "Bootcamp Grad" option in YOE replacement',
        id: 'SpM0k8',
      }),
    },
    bootcamper: {
      label: intl.formatMessage({
        defaultMessage: 'Bootcamper',
        description: 'Label for "Bootcamper" option in YOE replacement',
        id: 'WBESe1',
      }),
    },
    'career-switcher': {
      label: intl.formatMessage({
        defaultMessage: 'Career Switcher',
        description: 'Label for "Career Switcher" option in YOE replacement',
        id: 'DjHA82',
      }),
    },
    'fresh-grad': {
      label: intl.formatMessage({
        defaultMessage: 'Fresh Grad',
        description: 'Label for "Fresh Grad" option in YOE replacement',
        id: 'oxD4TD',
      }),
    },
    intern: {
      label: intl.formatMessage({
        defaultMessage: 'Intern',
        description: 'Label for "Intern" option in YOE replacement',
        id: 'HdBv6k',
      }),
    },
    'masters-cs': {
      label: intl.formatMessage({
        defaultMessage: 'Masters CS',
        description: 'Label for "Masters CS" option in YOE replacement',
        id: 'pkWsMA',
      }),
    },
    others: {
      label: intl.formatMessage({
        defaultMessage: 'Others',
        description: 'Label for "Others" option in YOE replacement',
        id: '9nq03w',
      }),
    },
    'self-learning': {
      label: intl.formatMessage({
        defaultMessage: 'Self-Learning',
        description: 'Label for "Self-Learning" option in YOE replacement',
        id: '+ahYqd',
      }),
    },
    'undergrad-cs': {
      label: intl.formatMessage({
        defaultMessage: 'Undergrad CS',
        description: 'Label for "Undergrad CS" option in YOE replacement',
        id: 'E5x8uP',
      }),
    },
  };

  const yoeReplacementOptions = [
    {
      label: yoeOptionMap['undergrad-cs'].label,
      value: 'undergrad-cs',
    },
    {
      label: yoeOptionMap['masters-cs'].label,
      value: 'masters-cs',
    },
    {
      label: yoeOptionMap.intern.label,
      value: 'intern',
    },
    {
      label: yoeOptionMap['fresh-grad'].label,
      value: 'fresh-grad',
    },
    {
      label: yoeOptionMap['career-switcher'].label,
      value: 'career-switcher',
    },
    {
      label: yoeOptionMap['bootcamp-grad'].label,
      value: 'bootcamp-grad',
    },
    {
      label: yoeOptionMap.bootcamper.label,
      value: 'bootcamper',
    },
    {
      label: yoeOptionMap['self-learning'].label,
      value: 'self-learning',
    },
    {
      label: yoeOptionMap.others.label,
      value: 'others',
    },
  ] as const satisfies ReadonlyArray<
    RadioGroupItemProps<ProjectsYoeReplacement>
  >;

  return { yoeOptionMap, yoeReplacementOptions };
}
