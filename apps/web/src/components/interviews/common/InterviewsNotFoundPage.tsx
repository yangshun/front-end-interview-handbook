'use client';

import { RiStarSmileFill } from 'react-icons/ri';

import { useQuestionFormatsData } from '~/data/QuestionCategories';

import { useIntl } from '~/components/intl';

import NotFoundPage from '../../global/error/NotFoundPage';

export default function InterviewsNotFoundPage() {
  const intl = useIntl();
  const formats = useQuestionFormatsData();
  const links = [
    {
      description: formats.javascript.listingDescription,
      href: formats.javascript.href,
      icon: formats.javascript.icon,
      title: formats.javascript.label,
    },
    {
      description: formats['system-design'].listingDescription,
      href: formats['system-design'].href,
      icon: formats['system-design'].icon,
      title: formats['system-design'].label,
    },
    {
      description: formats.quiz.listingDescription,
      href: formats.quiz.href,
      icon: formats.quiz.icon,
      title: formats.quiz.label,
    },
    {
      description: intl.formatMessage({
        defaultMessage:
          'Join the Premium Interviews club and get access to all questions and solutions',
        description: 'Premium Interviews description',
        id: 'YxAmJ+',
      }),
      href: '/interviews/pricing',
      icon: RiStarSmileFill,
      title: intl.formatMessage({
        defaultMessage: 'Interviews Premium',
        description: 'Interviews premium',
        id: 'LSqaK2',
      }),
    },
  ];

  return <NotFoundPage links={links} returnHref="/interviews/dashboard" />;
}
