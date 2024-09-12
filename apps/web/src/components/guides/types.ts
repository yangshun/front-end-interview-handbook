import type {
  frontendInterviewSlugs,
  frontendSystemDesignSlugs,
} from '~/db/guides/GuidesUtils';

export type BaseGuideNavigationLink<T = Record<string, unknown>> = Readonly<
  T & {
    description?: string;
    href: string;
    icon?: (props: React.ComponentProps<'svg'>) => JSX.Element;
    items?: GuideNavigationLinks<BaseGuideNavigationLink<T>>;
    slug: string;
    title: string;
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
      links: GuideNavigationLinks<Link>;
      title: string;
      type: 'list';
    }>
>;

export type GuideNavigation<
  Link extends BaseGuideNavigationLink = BaseGuideNavigationLink,
> = Readonly<{
  items: GuideNavigationItems<Link>;
  title: string;
}>;

export type GuideCategory =
  | 'behavioral-interview-guide'
  | 'front-end-interview-guide'
  | 'system-design-guide';

export type GuideMetadata = Readonly<{
  category: GuideCategory;
  slug: string;
}>;

export type FrontEndInterviewSlugType = (typeof frontendInterviewSlugs)[number];

// For the introduction article, the slug is introduction, but the route is ''
export type FrontEndInterviewRouteType =
  | Exclude<FrontEndInterviewSlugType, 'introduction'>
  | '';

export type FrontEndSystemDesignSlugType =
  (typeof frontendSystemDesignSlugs)[number];

// For the introduction article, the slug is introduction, but the route is ''
export type FrontEndSystemDesignRouteType =
  | Exclude<FrontEndSystemDesignSlugType, 'introduction'>
  | '';

export type GuideCardMetadata = GuideMetadata &
  Readonly<{
    description: string;
    href: string;
    readingTime: number;
    title: string;
  }>;

export type GuideCardMetadataWithCompletedStatus = GuideCardMetadata & {
  readonly isCompleted: boolean;
};
