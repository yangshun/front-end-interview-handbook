import { notFound } from 'next/navigation';
import type { Metadata } from 'next/types';

import InterviewsPurchaseQuestionPaywallPage from '~/components/interviews/purchase/InterviewsPurchaseQuestionPaywallPage';
import { sortQuestionsMultiple } from '~/components/interviews/questions/listings/filters/QuestionsProcessor';
import UserInterfaceCodingWorkspaceSavesPage from '~/components/workspace/user-interface/UserInterfaceCodingWorkspaceSavesPage';

import { readQuestionUserInterface } from '~/db/QuestionsContentsReader';
import { fetchQuestionsList } from '~/db/QuestionsListReader';
import { getIntlServerOnly } from '~/i18n';
import defaultMetadata from '~/seo/defaultMetadata';
import prisma from '~/server/prisma';
import {
  createSupabaseAdminClientGFE_SERVER_ONLY,
  readViewerFromToken,
} from '~/supabase/SupabaseServerGFE';
import { staticLowerCase } from '~/utils/typescript/stringTransform';

type Props = Readonly<{
  params: Readonly<{
    locale: string;
    saveId: string;
    slug: string;
  }>;
}>;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, saveId, slug } = params;

  try {
    const [question, save] = await Promise.all([
      readQuestionUserInterface(slug, false),
      prisma.questionUserInterfaceSave.findFirst({
        where: {
          id: saveId,
        },
      }),
    ]);

    if (save == null) {
      throw new Error('Save should not be null');
    }

    return defaultMetadata({
      locale,
      pathname: question.metadata.href + `/v/${saveId}`,
      title:
        save == null
          ? question.metadata.title
          : `${save?.name} | ${question.metadata.title}`,
    });
  } catch {
    notFound();
  }
}

export default async function Page({ params }: Props) {
  const { locale, saveId, slug } = params;

  const [intl, viewer, save] = await Promise.all([
    getIntlServerOnly(locale),
    readViewerFromToken(),
    prisma.questionUserInterfaceSave.findFirst({
      where: {
        id: saveId,
      },
    }),
  ]);

  if (save == null) {
    // TODO(interviews): show error page for not found save.
    return (
      <div className="p-4 text-center">
        {intl.formatMessage({
          defaultMessage: 'No such save.',
          description: 'Saved solution not found',
          id: 'kyUg36',
        })}
      </div>
    );
  }

  const isViewerPremium: boolean = await (async () => {
    if (viewer == null) {
      return false;
    }

    const supabaseClient = createSupabaseAdminClientGFE_SERVER_ONLY();

    const { data: profile } = await supabaseClient
      .from('Profile')
      .select('*')
      .eq('id', viewer.id)
      .single();

    return profile?.premium ?? false;
  })();

  const question = await readQuestionUserInterface(
    slug,
    isViewerPremium,
    staticLowerCase(save!.framework),
  );

  const isQuestionLockedForViewer =
    question.metadata.access === 'premium' && !isViewerPremium;

  if (isQuestionLockedForViewer) {
    return (
      <InterviewsPurchaseQuestionPaywallPage
        metadata={question.metadata}
        mode="practice"
      />
    );
  }

  const { questions } = await fetchQuestionsList(
    { type: 'format', value: 'user-interface' },
    locale,
  );
  const nextQuestions = sortQuestionsMultiple(
    questions.filter((questionItem) =>
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
    questions.filter((questionItem) =>
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
      canViewPremiumContent={isViewerPremium}
      nextQuestions={nextQuestions}
      question={question}
      save={save!}
      similarQuestions={similarQuestions}
    />
  );
}
