import type { QuestionUserInterface } from '~/components/questions/common/QuestionsTypes';
import type { QuestionUserInterfaceMode } from '~/components/questions/common/QuestionUserInterfacePath';
import { sortQuestionsMultiple } from '~/components/questions/listings/filters/QuestionsProcessor';
import CodingWorkspacePaywallPage from '~/components/workspace/common/CodingWorkspacePaywallPage';
import UserInterfaceCodingWorkspaceSavesPage from '~/components/workspace/user-interface/UserInterfaceCodingWorkspaceSavesPage';

import { readQuestionUserInterface } from '~/db/QuestionsContentsReader';
import { fetchQuestionsListCoding } from '~/db/QuestionsListReader';
import {
  createSupabaseAdminClientGFE,
  fetchUser,
} from '~/supabase/SupabaseServerGFE';
import { staticLowerCase } from '~/utils/typescript/stringTransform';

import { PrismaClient } from '@prisma/client';

type Props = Readonly<{
  params: Readonly<{
    locale: string;
    saveId: string;
    slug: string;
  }>;
}>;

const prisma = new PrismaClient();

export default async function Page({ params }: Props) {
  const { slug, saveId } = params;

  const user = await fetchUser();
  const save = await prisma.questionUserInterfaceSave.findFirst({
    orderBy: {
      createdAt: 'desc',
    },
    where: {
      id: saveId,
      userId: user?.id,
    },
  });

  if (save == null) {
    // TODO(submission): show error page for not found save.
    return <div>No such save or not allowed to view.</div>;
  }

  const question = await readQuestionUserInterface(
    slug,
    staticLowerCase(save!.framework),
  );

  let canViewPremiumContent = false;
  const supabaseAdmin = createSupabaseAdminClientGFE();

  if (user != null) {
    canViewPremiumContent = await Promise.resolve(
      (async () => {
        const { data: profile } = await supabaseAdmin
          .from('Profile')
          .select('*')
          .eq('id', user.id)
          .single();

        return profile?.premium ?? false;
      })(),
    );
  }

  const isQuestionLockedForUser =
    question.metadata.premium && !canViewPremiumContent;

  if (isQuestionLockedForUser) {
    return <CodingWorkspacePaywallPage metadata={question.metadata} />;
  }

  const { questions: codingQuestions } = await fetchQuestionsListCoding();
  const nextQuestions = sortQuestionsMultiple(
    codingQuestions.filter((questionItem) =>
      question.metadata.nextQuestions.includes(questionItem.slug),
    ),
    [
      {
        field: 'difficulty',
        isAscendingOrder: true,
      },
      {
        field: 'premium',
        isAscendingOrder: true,
      },
    ],
  );
  const similarQuestions = sortQuestionsMultiple(
    codingQuestions.filter((questionItem) =>
      question.metadata.similarQuestions.includes(questionItem.slug),
    ),
    [
      {
        field: 'difficulty',
        isAscendingOrder: true,
      },
      {
        field: 'premium',
        isAscendingOrder: true,
      },
    ],
  );

  return (
    <UserInterfaceCodingWorkspaceSavesPage
      canViewPremiumContent={canViewPremiumContent}
      nextQuestions={nextQuestions}
      question={question}
      save={save!}
      similarQuestions={similarQuestions}
    />
  );
}
