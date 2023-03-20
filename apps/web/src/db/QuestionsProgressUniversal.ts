import type {
  QuestionFormat,
  QuestionMetadata,
} from '~/components/questions/common/QuestionsTypes';

import type {
  QuestionProgress,
  QuestionProgressList,
  QuestionProgressStatus,
} from './QuestionsProgressTypes';
import type { SupabaseClientGFE } from '../supabase/SupabaseServerGFE';

import type { User } from '@supabase/supabase-js';

export async function genQuestionProgress(
  client: SupabaseClientGFE,
  user: User,
  question: QuestionMetadata,
): Promise<QuestionProgress | null> {
  const { data: questionProgress, error } = await client
    .from('QuestionProgress')
    .select('id, format, slug, status, createdAt')
    .eq('userId', user.id)
    .eq('format', question.format)
    .eq('slug', question.slug)
    .order('createdAt', { ascending: false })
    // User can have multiple progress for one question, we just take the latest one.
    .limit(1)
    .maybeSingle();

  if (error) {
    throw new Error(error.message);
  }

  if (questionProgress == null) {
    return null;
  }

  return {
    ...questionProgress,
    format: questionProgress.format as QuestionFormat,
    status: questionProgress.status as QuestionProgressStatus,
  };
}

export async function genQuestionProgressAdd(
  client: SupabaseClientGFE,
  user: User,
  question: QuestionMetadata,
  status: QuestionProgressStatus,
): Promise<QuestionProgress | null> {
  const { data: questionProgress, error } = await client
    .from('QuestionProgress')
    .upsert([
      {
        format: question.format,
        slug: question.slug,
        status,
        userId: user.id,
      },
    ])
    .select()
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return {
    createdAt: questionProgress.createdAt,
    format: questionProgress.format as QuestionFormat,
    id: questionProgress.id,
    slug: questionProgress.slug,
    status: questionProgress.status as QuestionProgressStatus,
  };
}

export async function genQuestionProgressDelete(
  client: SupabaseClientGFE,
  user: User,
  question: QuestionMetadata,
) {
  // TODO: Handle error.
  return await client
    .from('QuestionProgress')
    .delete()
    .eq('userId', user.id)
    .eq('format', question.format)
    .eq('slug', question.slug);
}

export async function genQuestionProgressAll(
  client: SupabaseClientGFE,
  user: User,
): Promise<QuestionProgressList | null> {
  const { data: questionProgressList, error } = await client
    .from('QuestionProgress')
    .select('id, format, slug, status, createdAt')
    .eq('userId', user.id)
    .order('createdAt', { ascending: false });

  if (error) {
    throw new Error(error.message);
  }

  return questionProgressList.map((questionProgress) => ({
    ...questionProgress,
    format: questionProgress.format as QuestionFormat,
    status: questionProgress.status as QuestionProgressStatus,
  }));
}
