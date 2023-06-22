import {
  RiFireFill,
  RiFireLine,
  RiFlashlightFill,
  RiFlashlightLine,
  RiStarFill,
  RiStarLine,
} from 'react-icons/ri';
import { useIntl } from 'react-intl';

import type {
  QuestionFormat,
  QuestionSlug,
} from '~/components/questions/common/QuestionsTypes';
import { QuestionCount } from '~/components/questions/listings/stats/QuestionCount';
import {
  themeGradient1,
  themeGradient2,
  themeGradient3,
} from '~/components/ui/theme';

export type PreparationPlanType = 'one-month' | 'one-week' | 'three-months';
export type PreparationPlan = Readonly<{
  description: string;
  href: string;
  longName: string;
  name: string;
  questions: Record<QuestionFormat, ReadonlyArray<QuestionSlug>>;
  shortDescription: string;
  theme: {
    backgroundClass: string;
    iconBorderClass: string;
    iconClass: string;
    iconOutline: (props: React.ComponentProps<'svg'>) => JSX.Element;
    iconSolid: (props: React.ComponentProps<'svg'>) => JSX.Element;
  };
  type: PreparationPlanType;
}>;

type PreparationPlans = Record<PreparationPlanType, PreparationPlan>;

export function usePreparationPlans() {
  const intl = useIntl();
  const preparationPlans: PreparationPlans = {
    'one-month': {
      description: intl.formatMessage({
        defaultMessage:
          'Prepare for your front end interviews in one month. All rounded coverage that is sure to bring your front end interview skills to the next level.',
        description: 'Description for one month study plan',
        id: 'CyhMLj',
      }),
      href: '/prepare/one-month',
      longName: intl.formatMessage({
        defaultMessage: '1 Month Plan',
        description: 'Long label for one month study plan',
        id: 'lyjVwD',
      }),
      name: intl.formatMessage({
        defaultMessage: '1 Month',
        description: 'Short label for one month study plan',
        id: 'EJRNjL',
      }),
      questions: {
        javascript: [
          'array-filter',
          'array-reduce',
          'get',
          'promise-any',
          'promise-all',
          'function-bind',
          'debounce',
          'throttle',
          'flatten',
          'curry',
          'get-elements-by-tag-name',
          'get-elements-by-class-name',
          'jquery-css',
          'jquery-class-manipulation',
          'deep-clone',
          'deep-equal',
          'classnames',
          'list-format',
          'text-search',
          'data-selection',
          'table-of-contents',
          'identical-dom-trees',
        ],
        // Use question importance for now.
        quiz: [],
        'system-design': [
          'news-feed-facebook',
          'autocomplete',
          'e-commerce-amazon',
          'image-carousel',
        ],
        'user-interface': [
          'counter',
          'contact-form',
          'signup-form',
          'holy-grail',
          'temperature-converter',
          'star-rating',
          'todo-list',
        ],
      },
      shortDescription: intl.formatMessage({
        defaultMessage: 'All rounded coverage to bring you to the next level.',
        description: 'Short description for one month study plan',
        id: 'SId1Gq',
      }),
      theme: {
        backgroundClass: themeGradient1.className,
        iconBorderClass: 'border-violet-600',
        iconClass: 'text-violet-600',
        iconOutline: RiFireLine,
        iconSolid: RiFireFill,
      },
      type: 'one-month',
    },
    'one-week': {
      description: intl.formatMessage({
        defaultMessage:
          'Prepare for your front end interviews in one week. Efficiently focus on the most important concepts through a good mix of coding and quiz questions.',
        description: 'Description for one week study plan',
        id: 'npvgQq',
      }),
      href: '/prepare/one-week',
      longName: intl.formatMessage({
        defaultMessage: '1 Week Plan',
        description: 'Long label for one week study plan',
        id: 'jN6xqZ',
      }),
      name: intl.formatMessage({
        defaultMessage: '1 Week',
        description: 'Short label for one week study plan',
        id: 'vfVwh2',
      }),
      questions: {
        javascript: [
          'array-filter',
          'promise-all',
          'debounce',
          'flatten',
          'curry',
          'get-elements-by-tag-name',
          'jquery-css',
          'deep-equal',
          'classnames',
          'list-format',
        ],
        // Use question importance for now.
        quiz: [],
        'system-design': ['news-feed-facebook', 'autocomplete'],
        'user-interface': [
          'counter',
          'contact-form',
          'holy-grail',
          'star-rating',
          'todo-list',
        ],
      },
      shortDescription: intl.formatMessage({
        defaultMessage: 'Efficiently focus on the most important concepts',
        description: 'Short description for one week study plan',
        id: '4WUroS',
      }),
      theme: {
        backgroundClass: themeGradient2.className,
        iconBorderClass: 'border-purple-600',
        iconClass: 'text-purple-600',
        iconOutline: RiFlashlightLine,
        iconSolid: RiFlashlightFill,
      },
      type: 'one-week',
    },
    'three-months': {
      description: intl.formatMessage(
        {
          defaultMessage:
            'With over {numberOfQuestions} questions, this is the most complete all-in-one front end interview preparation you can ever dream of.',
          description: 'Long description for three months study plan',
          id: 'JrmA6j',
        },
        {
          numberOfQuestions: QuestionCount,
        },
      ),
      href: '/prepare/three-months',
      longName: intl.formatMessage({
        defaultMessage: '3 Months Plan',
        description: 'Short label for 3 months study plan',
        id: 'g65B9h',
      }),
      name: intl.formatMessage({
        defaultMessage: '3 Months',
        description: 'Short label for 3 months study plan',
        id: 'ojtNa2',
      }),
      questions: {
        javascript: [
          'array-filter',
          'array-map',
          'array-reduce',
          'camel-case-keys',
          'classnames',
          'curry',
          'curry-ii',
          'data-selection',
          'debounce',
          'deep-clone',
          'deep-equal',
          'flatten',
          'function-bind',
          'get',
          'get-elements-by-class-name',
          'get-elements-by-tag-name',
          'identical-dom-trees',
          'jquery-class-manipulation',
          'jquery-css',
          'json-stringify',
          'list-format',
          'promise-all',
          'promise-all-settled',
          'promise-any',
          'squash-object',
          'sum',
          'table-of-contents',
          'text-search',
          'text-search-ii',
          'throttle',
          'unique-array',
        ],
        // Use question importance for now.
        quiz: [],
        'system-design': [
          'news-feed-facebook',
          'autocomplete',
          'e-commerce-amazon',
          'image-carousel',
          'photo-sharing-instagram',
          'poll-widget',
        ],
        'user-interface': [
          'contact-form',
          'counter',
          'digital-clock',
          'holy-grail',
          'progress-bar',
          'signup-form',
          'star-rating',
          'temperature-converter',
          'star-rating',
          'todo-list',
          'tweet',
        ],
      },
      shortDescription: intl.formatMessage({
        defaultMessage:
          'Most complete all-in-one front end interview preparation.',
        description: 'Short description for 3 months study plan',
        id: '1PHE0Y',
      }),
      theme: {
        backgroundClass: themeGradient3.className,
        iconBorderClass: 'border-indigo-600',
        iconClass: 'text-indigo-600',
        iconOutline: RiStarLine,
        iconSolid: RiStarFill,
      },
      type: 'three-months',
    },
  };

  return preparationPlans;
}
