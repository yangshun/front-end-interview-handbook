import type { GuidebookItem, GuideProgress } from '@prisma/client';
import { keyBy, sumBy } from 'lodash-es';

import { BehavioralInterviewPlaybookPaths } from '~/components/guides/books/behavioral-interview-playbook/BehavioralInterviewPlaybookNavigation';
import { FrontEndInterviewPlaybookPaths } from '~/components/guides/books/front-end-interview-playbook/FrontEndInterviewPlaybookNavigation';
import { FrontEndSystemDesignPlaybookPaths } from '~/components/guides/books/front-end-system-design/FrontEndSystemDesignPlaybookNavigation';
import { ReactInterviewPlaybookPaths } from '~/components/guides/books/react-interview-playbook/ReactInterviewPlaybookNavigation';
import type {
  GuideCardMetadata,
  GuideMetadata,
  GuideNavigation,
} from '~/components/guides/types';

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
  | 'behavioralPlaybook'
  | 'frontEndInterviewPlaybook'
  | 'reactInterviewPlaybook'
  | 'systemDesignPlaybook',
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
      frontEndInterviewPlaybook: {
        completed: 0,
        total: FrontEndInterviewPlaybookPaths.length,
        updatedAt: null,
      },
      reactInterviewPlaybook: {
        completed: 0,
        total: ReactInterviewPlaybookPaths.length,
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
    behavioralPlaybookCompletionCount,
    behavioralPlaybookLatestDate,
    frontEndInterviewPlaybookCompletionCount,
    frontEndInterviewPlaybookLatestDate,
    reactInterviewPlaybookCompletionCount,
    reactInterviewPlaybookLatestDate,
    systemDesignPlaybookCompletionCount,
    systemDesignPlaybookLatestDate,
  } = Array.from(completedGuides).reduce(
    (counts, item) => {
      const [book, slug] = unhashGuide(item);
      const guide = guidesProgress.find(
        (g) => g.book === book && g.slug === slug,
      );

      if (book === 'FRONT_END_INTERVIEW_PLAYBOOK') {
        counts.frontEndInterviewPlaybookCompletionCount++;
        counts.frontEndInterviewPlaybookLatestDate = getLatestDate(
          counts.frontEndInterviewPlaybookLatestDate,
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

      if (book === 'REACT_INTERVIEW_PLAYBOOK') {
        counts.reactInterviewPlaybookCompletionCount++;
        counts.reactInterviewPlaybookLatestDate = getLatestDate(
          counts.reactInterviewPlaybookLatestDate,
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
      frontEndInterviewPlaybookCompletionCount: 0,
      frontEndInterviewPlaybookLatestDate: null as Date | null,
      reactInterviewPlaybookCompletionCount: 0,
      reactInterviewPlaybookLatestDate: null as Date | null,
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
    frontEndInterviewPlaybook: {
      completed: frontEndInterviewPlaybookCompletionCount,
      total: FrontEndInterviewPlaybookPaths.length,
      updatedAt: frontEndInterviewPlaybookLatestDate,
    },
    reactInterviewPlaybook: {
      completed: reactInterviewPlaybookCompletionCount,
      total: ReactInterviewPlaybookPaths.length,
      updatedAt: reactInterviewPlaybookLatestDate,
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
