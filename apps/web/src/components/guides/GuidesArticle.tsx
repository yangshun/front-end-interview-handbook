import clsx from 'clsx';
import type { PropsWithChildren } from 'react';
import { forwardRef } from 'react';

import QuestionReportIssueButton from '~/components/interviews/questions/common/QuestionReportIssueButton';
import QuestionAuthor from '~/components/interviews/questions/metadata/QuestionAuthor';
import Heading from '~/components/ui/Heading';
import { themeTextSubtitleColor } from '~/components/ui/theme';

import type { GuideMetadata } from './types';
import Prose from '../ui/Prose';
import { themeBorderColor } from '../ui/theme';

type Props = PropsWithChildren<
  Readonly<{
    description: string;
    metadata: GuideMetadata;
    title: string;
  }>
>;

const GuidesArticle = forwardRef<HTMLDivElement, Props>(
  ({ title, description, children, metadata }: Props, ref) => {
    return (
      <article className="flex flex-col gap-y-6">
        <div className="flex flex-col">
          <Heading className="text-3xl font-semibold" level="custom" tag="h1">
            {title}
          </Heading>
          <p className={clsx('mt-2', themeTextSubtitleColor)}>{description}</p>
          <div className="mt-6 flex justify-between gap-4">
            <QuestionAuthor author="yangshun" />
            <QuestionReportIssueButton
              book={metadata.book}
              entity="article"
              isLabelHidden={false}
              slug={metadata.id}
            />
          </div>
        </div>
        <hr className={themeBorderColor} />
        <Prose ref={ref}>{children}</Prose>
      </article>
    );
  },
);

export default GuidesArticle;
