import type { QuestionFormat } from '~/components/interviews/questions/common/QuestionsTypes';

import prisma from '~/server/prisma';

export type QuestionCompletionCount = Partial<
  Record<QuestionFormat, Record<string, number>>
>;

export async function fetchQuestionsCompletionCount(
  formats: ReadonlyArray<QuestionFormat>,
) {
  const questionProgresses = await prisma.questionProgress.groupBy({
    _count: {
      _all: true,
    },
    by: ['slug', 'format'],
    where: {
      OR: formats.map((format) => ({ format })),
      status: 'complete',
    },
  });

  const counts: QuestionCompletionCount = {};

  questionProgresses.forEach(({ _count, format: formatParam, slug }) => {
    const format = formatParam as QuestionFormat;

    if (!counts[format]) {
      counts[format] = {};
    }

    counts[format]![slug] = _count._all;
  });

  return counts;
}
