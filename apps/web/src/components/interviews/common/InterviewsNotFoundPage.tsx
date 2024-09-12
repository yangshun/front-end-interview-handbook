'use client';

import { RiStarSmileFill } from 'react-icons/ri';

import { useQuestionUserFacingFormatData } from '~/data/QuestionFormats';

import NotFoundPage from '../../global/error/NotFoundPage';

export default function InterviewsNotFoundPage() {
  const questionFormatLists = useQuestionUserFacingFormatData();
  const links = [
    {
      description: questionFormatLists.coding.description,
      href: questionFormatLists.coding.href,
      icon: questionFormatLists.coding.icon,
      title: `Prepare for ${questionFormatLists.coding.name} questions`,
    },
    {
      description: questionFormatLists['system-design'].description,
      href: questionFormatLists['system-design'].href,
      icon: questionFormatLists['system-design'].icon,
      title: `Prepare for ${questionFormatLists['system-design'].name} questions`,
    },
    {
      description: questionFormatLists.quiz.description,
      href: questionFormatLists.quiz.href,
      icon: questionFormatLists.quiz.icon,
      title: `Prepare for ${questionFormatLists.quiz.name} questions`,
    },
    {
      description:
        'Join the Premium Interviews club and get access to all questions and solutions',
      href: '/interviews/pricing',
      icon: RiStarSmileFill,
      title: 'Interviews Premium',
    },
  ];

  return <NotFoundPage links={links} returnHref="/prepare" />;
}
