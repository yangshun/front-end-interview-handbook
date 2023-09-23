import clsx from 'clsx';
import type { MDXProps } from 'mdx/types';

import Anchor from '~/components/ui/Anchor';
import Button from '~/components/ui/Button';
import Container from '~/components/ui/Container';
import Heading from '~/components/ui/Heading';
import Section from '~/components/ui/Heading/HeadingContext';
import Prose from '~/components/ui/Prose';
import Text from '~/components/ui/Text';
import {
  themeBackgroundEmphasized,
  themeDivideColor,
  themeLineColor,
} from '~/components/ui/theme';

type Props = Readonly<{
  content: (props: MDXProps) => JSX.Element;
  href: string;
  jobType: string;
  payRange: string;
  title: string;
}>;

export default function JobPage({
  content: Content,
  href,
  jobType,
  payRange,
  title,
}: Props) {
  return (
    <Container
      className="my-10 grid gap-y-8 md:my-20 md:gap-y-16"
      variant="narrow">
      <div className="flex flex-col gap-y-6">
        <div>
          <Anchor href="/jobs">← Back to jobs</Anchor>
        </div>
        <Heading level="heading3">{title}</Heading>
      </div>
      <Section>
        <div className="grid gap-8 md:grid-cols-4">
          <div className="md:order-last">
            <div
              className={clsx(
                'divide-y rounded border',
                themeLineColor,
                themeDivideColor,
                themeBackgroundEmphasized,
              )}>
              <div className="grid gap-y-2 p-4">
                <Text display="block" size="body2" weight="medium">
                  Job Type
                </Text>
                <Text
                  color="secondary"
                  display="block"
                  size="body2"
                  weight="medium">
                  {jobType}
                </Text>
              </div>
              <div className="grid gap-y-2 p-4">
                <Text display="block" size="body2" weight="medium">
                  Pay Range
                </Text>
                <Text
                  color="secondary"
                  display="block"
                  size="body2"
                  weight="medium">
                  {payRange}
                </Text>
              </div>
              <div className="p-5">
                <Button
                  display="block"
                  href={href}
                  label="Apply Now"
                  variant="primary"
                />
              </div>
            </div>
          </div>
          <div className="md:col-span-3">
            <Prose>
              <Content />
            </Prose>
          </div>
        </div>
      </Section>
    </Container>
  );
}
