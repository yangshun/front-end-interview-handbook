import { keyBy, sumBy } from 'lodash-es';

import { BehavioralInterviewPlaybookPaths } from '~/components/guides/books/BehavioralInterviewPlaybookNavigation';
import { FrontEndInterviewPlaybookPaths } from '~/components/guides/books/FrontEndInterviewPlaybookNavigation';
import { FrontEndSystemDesignPlaybookPaths } from '~/components/guides/books/FrontEndSystemDesignPlaybookNavigation';
import type {
  GuideCardMetadata,
  GuideMetadata,
  GuideNavigation,
} from '~/components/guides/types';

import type { GuidebookItem, GuideProgress } from '@prisma/client';

export function hashGuide(book: GuidebookItem, slug: string) {
  return book + ':' + slug;
}

export function unhashGuide(key: string): [book: GuidebookItem, slug: string] {
  const parts = key.split(':');

  return [parts[0] as GuidebookItem, parts[1]];
}

export function hasCompletedGuide(
  completedGuides: Set<string>,
  guide: GuideMetadata,
): boolean {
  return completedGuides.has(hashGuide(guide.book, guide.id));
}

export function processForGuidesCover<
  GuideSlug extends string,
  Q extends GuideCardMetadata,
>(guidesNavigation: GuideNavigation<GuideSlug>, guides: ReadonlyArray<Q>) {
  const guidesMap = keyBy(guides, 'id');

  return guidesNavigation.navigation.items.map((navItem) => {
    if (navItem.type === 'list') {
      const articles = navItem.items.map((item) => guidesMap[item.id]);

      return {
        articles,
        title: navItem.label,
        totalReadingTime: sumBy(articles, 'readingTime'),
      };
    }

    return {
      articles: [guidesMap[navItem.id]],
      title: navItem.label,
      totalReadingTime: guidesMap[navItem.id].readingTime,
    };
  });
}

export type GuidesProgressCount = Record<
  'behavioralPlaybook' | 'frontendInterviewPlaybook' | 'systemDesignPlaybook',
  {
    completed: number;
    total: number;
    updatedAt: Date | null;
  }
>;

export function getGuideCompletionCount(
  guidesProgress?: ReadonlyArray<GuideProgress>,
): GuidesProgressCount {
  if (!guidesProgress) {
    return {
      behavioralPlaybook: {
        completed: 0,
        total: BehavioralInterviewPlaybookPaths.length,
        updatedAt: null,
      },
      frontendInterviewPlaybook: {
        completed: 0,
        total: FrontEndInterviewPlaybookPaths.length,
        updatedAt: null,
      },
      systemDesignPlaybook: {
        completed: 0,
        total: FrontEndSystemDesignPlaybookPaths.length,
        updatedAt: null,
      },
    };
  }

  const completedGuides = new Set(
    guidesProgress.map(({ book, slug }) => hashGuide(book, slug)),
  );

  const {
    frontendInterviewPlaybookCompletionCount,
    frontendInterviewPlaybookLatestDate,
    systemDesignPlaybookCompletionCount,
    systemDesignPlaybookLatestDate,
    behavioralPlaybookCompletionCount,
    behavioralPlaybookLatestDate,
  } = Array.from(completedGuides).reduce(
    (counts, item) => {
      const [book, slug] = unhashGuide(item);
      const guide = guidesProgress.find(
        (g) => g.book === book && g.slug === slug,
      );

      if (book === 'FRONT_END_INTERVIEW_PLAYBOOK') {
        counts.frontendInterviewPlaybookCompletionCount++;
        counts.frontendInterviewPlaybookLatestDate = getLatestDate(
          counts.frontendInterviewPlaybookLatestDate,
          guide?.createdAt,
        );
      }

      if (book === 'FRONT_END_SYSTEM_DESIGN_PLAYBOOK') {
        counts.systemDesignPlaybookCompletionCount++;
        counts.systemDesignPlaybookLatestDate = getLatestDate(
          counts.systemDesignPlaybookLatestDate,
          guide?.createdAt,
        );
      }

      if (book === 'BEHAVIORAL_INTERVIEW_PLAYBOOK') {
        counts.behavioralPlaybookCompletionCount++;
        counts.behavioralPlaybookLatestDate = getLatestDate(
          counts.behavioralPlaybookLatestDate,
          guide?.createdAt,
        );
      }

      return counts;
    },
    {
      behavioralPlaybookCompletionCount: 0,
      behavioralPlaybookLatestDate: null as Date | null,
      frontendInterviewPlaybookCompletionCount: 0,
      frontendInterviewPlaybookLatestDate: null as Date | null,
      systemDesignPlaybookCompletionCount: 0,
      systemDesignPlaybookLatestDate: null as Date | null,
    },
  );

  return {
    behavioralPlaybook: {
      completed: behavioralPlaybookCompletionCount,
      total: BehavioralInterviewPlaybookPaths.length,
      updatedAt: behavioralPlaybookLatestDate,
    },
    frontendInterviewPlaybook: {
      completed: frontendInterviewPlaybookCompletionCount,
      total: FrontEndInterviewPlaybookPaths.length,
      updatedAt: frontendInterviewPlaybookLatestDate,
    },
    systemDesignPlaybook: {
      completed: systemDesignPlaybookCompletionCount,
      total: FrontEndSystemDesignPlaybookPaths.length,
      updatedAt: systemDesignPlaybookLatestDate,
    },
  };
}

// Helper function to get the latest date
export function getLatestDate(
  currentDate: Date | null,
  newDate: Date | undefined,
) {
  if (!newDate) {
    return currentDate;
  }
  if (!currentDate) {
    return newDate;
  }

  return new Date(newDate) > new Date(currentDate) ? newDate : currentDate;
}
