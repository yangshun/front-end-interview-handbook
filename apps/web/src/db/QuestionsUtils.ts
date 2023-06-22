import type { PreparationPlan } from '~/data/PreparationPlans';

import type {
  QuestionFormat,
  QuestionFramework,
  QuestionMetadata,
  QuestionSlug,
} from '~/components/questions/common/QuestionsTypes';

import type { QuestionProgressList } from './QuestionsProgressTypes';

function createQuestionHref(
  format: QuestionFormat,
  slug: string,
  framework?: QuestionFramework,
): string {
  const basePath = `/questions/${format}/${slug}`;

  return framework == null ? basePath : basePath + `/${framework}`;
}

export function normalizeQuestionFrontMatter(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  frontmatter: Record<string, any>,
  format: QuestionFormat,
): QuestionMetadata {
  const { slug } = frontmatter;

  const frameworks: ReadonlyArray<QuestionFramework> =
    frontmatter.frameworks ?? [];

  return {
    author: frontmatter.author ?? null,
    companies: frontmatter.companies ?? [],
    created: new Date(frontmatter.created ?? '2021-09-05').getTime() / 1000,
    difficulty: frontmatter.difficulty,
    duration: frontmatter.duration,
    // Have to be null to be serialize-able.
    excerpt: frontmatter.excerpt ?? null,
    featured: Boolean(frontmatter.featured),
    format,
    frameworkDefault:
      frontmatter.framework_default ??
      (frameworks.length > 0 ? frameworks[0] : null),
    frameworks: frameworks.map((frameworkType) => ({
      framework: frameworkType,
      href: createQuestionHref(format, slug, frameworkType),
    })),
    href: createQuestionHref(format, slug),
    // Have to be null to be serialize-able.
    importance: frontmatter.importance ?? null,
    languages: frontmatter.languages ?? [],
    nextQuestions: frontmatter.next_questions ?? [],
    premium: frontmatter.premium,
    published: frontmatter.published,
    ranking: frontmatter.ranking ?? 100, // 1-100 where 1 is the top.
    similarQuestions: frontmatter.similar_questions ?? [],
    slug,
    title: frontmatter.title,
  };
}

export function hashQuestion(format: string, slug: QuestionSlug) {
  return format + ':' + slug;
}

export function hasCompletedQuestion(
  completedQuestions: Set<QuestionSlug>,
  question: QuestionMetadata,
): boolean {
  return completedQuestions.has(hashQuestion(question.format, question.slug));
}

export type QuestionsCategorizedProgress = Record<QuestionFormat, Set<string>>;

export function categorizeQuestionsProgress(
  questionProgress?: QuestionProgressList | null,
): QuestionsCategorizedProgress {
  return {
    javascript: new Set(
      (
        questionProgress?.filter(({ format }) => format === 'javascript') ?? []
      ).map(({ slug }) => slug),
    ),
    quiz: new Set(
      (questionProgress?.filter(({ format }) => format === 'quiz') ?? []).map(
        ({ slug }) => slug,
      ),
    ),
    'system-design': new Set(
      (
        questionProgress?.filter(({ format }) => format === 'system-design') ??
        []
      ).map(({ slug }) => slug),
    ),
    'user-interface': new Set(
      (
        questionProgress?.filter(({ format }) => format === 'user-interface') ??
        []
      ).map(({ slug }) => slug),
    ),
  };
}

export function filterQuestionsProgressByPlan(
  questionProgress: QuestionsCategorizedProgress,
  preparationPlan: PreparationPlan,
): QuestionsCategorizedProgress {
  return {
    javascript: new Set(
      Array.from(questionProgress.javascript).filter(
        (slug) => preparationPlan?.questions.javascript.includes(slug) ?? true,
      ),
    ),
    quiz: new Set(
      Array.from(questionProgress.quiz).filter(
        (slug) => preparationPlan?.questions.quiz.includes(slug) ?? true,
      ),
    ),
    'system-design': new Set(
      Array.from(questionProgress['system-design']).filter(
        (slug) =>
          preparationPlan?.questions['system-design'].includes(slug) ?? true,
      ),
    ),
    'user-interface': new Set(
      Array.from(questionProgress['user-interface']).filter(
        (slug) =>
          preparationPlan?.questions['user-interface'].includes(slug) ?? true,
      ),
    ),
  };
}

export function roundQuestionCountToNearestTen(count: number) {
  return Math.floor(count / 10) * 10;
}
