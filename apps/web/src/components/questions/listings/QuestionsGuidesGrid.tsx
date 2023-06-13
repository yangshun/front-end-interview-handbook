import clsx from 'clsx';

import Anchor from '~/components/ui/Anchor';
import Heading from '~/components/ui/Heading';
import Section from '~/components/ui/Heading/HeadingContext';
import Text from '~/components/ui/Text';
import {
  themeBackgroundEmphasizedHover,
  themeLineColor,
} from '~/components/ui/theme';

type Props = Readonly<{
  columns?: number;
  items: ReadonlyArray<{
    cardTitle?: string;
    description?: string;
    href: string;
    slug: string;
    title: string;
  }>;
  title: string;
}>;

export default function QuestionsGuidesGrid({
  columns = 5,
  title,
  items,
}: Props) {
  return (
    <div className="grid gap-4">
      <Heading className="text-lg font-semibold" level="custom">
        {title}
      </Heading>
      <Section>
        <div
          className={clsx(
            'isolate grid overflow-hidden border-l',
            themeLineColor,
            items.length >= columns ? 'md:border-t' : 'border-t md:border-t-0',
            columns <= 4 && 'md:grid-cols-3',
            columns === 4 && 'md:grid-cols-4',
            columns === 5 && 'md:grid-cols-4',
            columns === 6 && 'sm:grid-cols-3 lg:grid-cols-6',
            columns >= 7 && 'md:grid-cols-4',
          )}>
          {items.map((guide, index) => (
            <Anchor
              key={guide.slug}
              className={clsx(
                'relative flex items-center gap-4 border-b border-r p-3 md:flex-col md:items-start md:gap-2 md:p-6',
                themeLineColor,
                themeBackgroundEmphasizedHover,
                items.length < columns && index < columns - 1 && 'md:border-t',
              )}
              href={guide.href}
              variant="unstyled">
              <div className="flex justify-center md:w-full">
                <Text
                  className={clsx(
                    'z-10 h-6 w-6 items-center justify-center rounded-full border-2',
                    themeLineColor,
                  )}
                  display="flex"
                  variant="body2"
                  weight="bold">
                  {index + 1}
                </Text>
              </div>
              <div className="flex w-full flex-col gap-1">
                <Heading
                  className="text-xs font-medium md:w-full md:text-center md:text-sm"
                  level="custom">
                  {guide.cardTitle ?? guide.title}
                </Heading>
                {guide.description && (
                  <Section>
                    <Text
                      className="line-clamp-3 pt-1 md:text-center"
                      color="secondary"
                      display="block"
                      variant="body2">
                      {guide.description}
                    </Text>
                  </Section>
                )}
              </div>
            </Anchor>
          ))}
        </div>
      </Section>
    </div>
  );
}
