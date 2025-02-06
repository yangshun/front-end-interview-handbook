import type { ReactNode } from 'react';

import type { GuidebookItem } from '@prisma/client';

export type BaseGuideNavigationLink<T = Record<string, unknown>> = Readonly<
  T & {
    addOnElement?: ReactNode | null;
    description?: string;
    href: string;
    icon?: (props: React.ComponentProps<'svg'>) => JSX.Element;
    id: string;
    items?: GuideNavigationLinks<BaseGuideNavigationLink<T>>;
    label: string;
    type: 'link';
  }
>;

export type GuideNavigationLink = BaseGuideNavigationLink<{
  cardTitle?: string; // Shown in card titles primarily on dashboard
}>;

export type GuideNavigationLinks<
  Link extends BaseGuideNavigationLink = BaseGuideNavigationLink,
> = ReadonlyArray<Link>;

export type GuideNavigationItems<
  Link extends BaseGuideNavigationLink = BaseGuideNavigationLink,
> = ReadonlyArray<
  | Link
  | Readonly<{
      id: string;
      items: GuideNavigationLinks<Link>;
      label: string;
      type: 'list';
    }>
>;

export type GuideNavigation<
  Link extends BaseGuideNavigationLink = BaseGuideNavigationLink,
> = Readonly<{
  initialOpenSections: ReadonlyArray<string>;
  navigation: Readonly<{
    items: GuideNavigationItems<Link>;
    title: string;
  }>;
}>;

export type GuideMetadata = Readonly<{
  book: GuidebookItem;
  id: string;
}>;

export type GuideCardMetadata = GuideMetadata &
  Readonly<{
    description: string;
    href: string;
    readingTime: number;
    title: string;
  }>;

export type GuideCardMetadataWithCompletedStatus = GuideCardMetadata &
  Readonly<{
    isCompleted: boolean;
  }>;
