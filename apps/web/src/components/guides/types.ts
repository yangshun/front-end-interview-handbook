import type { GuidebookItem } from '@prisma/client';
import type { ReactNode } from 'react';

export type BaseGuideNavigationLink<
  GuideSlug extends string = string,
  T = Record<string, unknown>,
> = Readonly<
  T & {
    addOnElement?: ReactNode | null;
    description?: string;
    href: string;
    icon?: (props: React.ComponentProps<'svg'>) => JSX.Element;
    id: GuideSlug;
    label: string;
    type: 'link';
  }
>;

export type GuideNavigationLink<GuideSlug extends string> =
  BaseGuideNavigationLink<
    GuideSlug,
    {
      cardTitle?: string; // Shown in card titles primarily on dashboard
    }
  >;

export type GuideNavigationLinks<
  Link extends BaseGuideNavigationLink = BaseGuideNavigationLink,
> = ReadonlyArray<Link>;

export type GuideNavigationItems<
  GuideSlug extends string,
  Link extends BaseGuideNavigationLink = BaseGuideNavigationLink<GuideSlug>,
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
  GuideSlug extends string,
  Link extends BaseGuideNavigationLink = BaseGuideNavigationLink<GuideSlug>,
> = Readonly<{
  initialOpenSections: ReadonlyArray<string>;
  navigation: Readonly<{
    items: GuideNavigationItems<GuideSlug, Link>;
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
