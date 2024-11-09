'use client';

import { RiStarSmileFill } from 'react-icons/ri';

import { useQuestionFormatsData } from '~/data/QuestionFormats';

import NotFoundPage from '../../global/error/NotFoundPage';

export default function InterviewsNotFoundPage() {
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
      description:
        'Join the Premium Interviews club and get access to all questions and solutions',
      href: '/interviews/pricing',
      icon: RiStarSmileFill,
      title: 'Interviews Premium',
    },
  ];

  return <NotFoundPage links={links} returnHref="/questions" />;
}
