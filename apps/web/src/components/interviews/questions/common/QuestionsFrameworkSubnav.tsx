'use client';

import { useQuestionTechnologyLists } from '~/data/QuestionFormats';

import QuestionsSubnav from '~/components/interviews/questions/common/QuestionsSubnav';

export default function QuestionsFormatSubnav() {
  const technology = useQuestionTechnologyLists();

  return (
    <QuestionsSubnav
      items={[
        technology.react,
        technology.angular,
        technology.svelte,
        technology.vue,
        technology.vanilla,
      ]}
    />
  );
}
