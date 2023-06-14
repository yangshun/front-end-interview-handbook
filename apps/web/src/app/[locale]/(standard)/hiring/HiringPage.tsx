'use client';

import clsx from 'clsx';

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

/* eslint-disable @typescript-eslint/ban-ts-comment */
import Hiring, {
  // @ts-expect-error
  href,
  // @ts-expect-error
  job_type as jobType,
  // @ts-expect-error
  pay_range as payRange,
  // @ts-expect-error
  title,
} from './hiring.mdx';
/* eslint-enable @typescript-eslint/ban-ts-comment */

export default function HiringPage() {
  return (
    <Container
      className="my-10 grid gap-y-8 md:my-20 md:gap-y-16"
      variant="narrow">
      <Heading level="heading2">{title}</Heading>
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
              <Hiring />
            </Prose>
          </div>
        </div>
      </Section>
    </Container>
  );
}
