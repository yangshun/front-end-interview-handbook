'use client';

import { useQuestionFormatsData } from '~/data/QuestionFormats';

import QuestionsSubnav from '~/components/interviews/questions/common/QuestionsSubnav';

type Props = Readonly<{
  params: Readonly<{
    format: string;
    locale: string;
  }>;
}>;

export default function QuestionsFormatSubnav({ params }: Props) {
  const { format } = params;
  const formats = useQuestionFormatsData();

  if (!format) {
    return null;
  }

  return (
    <QuestionsSubnav
      items={[
        formats.javascript,
        formats['user-interface'],
        formats.algo,
        formats.quiz,
        formats['system-design'],
      ]}
    />
  );
}
