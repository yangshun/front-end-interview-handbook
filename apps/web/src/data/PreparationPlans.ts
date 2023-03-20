import type {
  PreparationPlan,
  PreparationPlanType,
} from '~/components/questions/common/PreparationPlanTypes';
import { QuestionCount } from '~/components/questions/listings/QuestionCount';

type PreparationPlans = Record<PreparationPlanType, PreparationPlan>;

export default function usePreparationPlans() {
  const preparationPlans: PreparationPlans = {
    'one-month': {
      description:
        'Prepare for your front end interviews in one month. All rounded coverage that is sure to bring your front end interview skills to the next level.',
      href: '/prepare/one-month',
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
      shortDescription: 'All rounded coverage to bring you to the next level.',
      title: '1 Month',
      type: 'one-month',
    },
    'one-week': {
      description:
        'Prepare for your front end interviews in one week. Efficiently focus on the most important concepts through a good mix of coding and quiz questions.',
      href: '/prepare/one-week',
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
      shortDescription: 'Efficiently focus on the most important concepts',
      title: '1 Week',
      type: 'one-week',
    },
    'three-months': {
      description: `With over ${QuestionCount} questions, this is the most complete all-in-one front end interview preparation you can ever dream of.`,
      href: '/prepare/three-months',
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
      shortDescription:
        'Most complete all-in-one front end interview preparation.',
      title: '3 Months',
      type: 'three-months',
    },
  };

  return preparationPlans;
}
