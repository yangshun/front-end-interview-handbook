export type BaseGuideNavigationLink<T = Record<string, unknown>> = Readonly<
  T & {
    description?: string;
    href: string;
    icon?: (props: React.ComponentProps<'svg'>) => JSX.Element;
    items?: GuideNavigationLinks<BaseGuideNavigationLink<T>>;
    slug: string;
    title: string;
  }
>;

export type GuideNavigationLink = BaseGuideNavigationLink<{
  cardTitle?: string;
}>;

export type GuideNavigationLinks<
  Link extends BaseGuideNavigationLink = BaseGuideNavigationLink,
> = ReadonlyArray<Link>;

export type GuideNavigationItems<
  Link extends BaseGuideNavigationLink = BaseGuideNavigationLink,
> = ReadonlyArray<
  Readonly<{
    links: GuideNavigationLinks<Link>;
    title: string;
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
