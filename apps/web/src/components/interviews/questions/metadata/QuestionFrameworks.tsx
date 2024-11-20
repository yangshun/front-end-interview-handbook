import { useId } from 'react';

import { useQuestionFrameworksData } from '~/data/QuestionCategories';

import { FormattedMessage, useIntl } from '~/components/intl';
import Anchor from '~/components/ui/Anchor';
import Tooltip from '~/components/ui/Tooltip';

import QuestionFrameworkIcon from './QuestionFrameworkIcon';
import type { QuestionFramework } from '../common/QuestionsTypes';

type Props = Readonly<{
  frameworks: ReadonlyArray<
    Readonly<{
      framework: QuestionFramework;
      href: string;
    }>
  >;
}>;

export default function QuestionFrameworks({ frameworks }: Props) {
  const id = useId();
  const frameworksData = useQuestionFrameworksData();
  const intl = useIntl();

  return (
    <div className="flex items-center">
      <span className="sr-only" id={id}>
        <FormattedMessage
          defaultMessage="Available frameworks"
          description="Screenreader text to indicate the presence of available frameworks, displayed on question cards in question lists"
          id="bNW00Y"
        />
      </span>
      <div aria-labelledby={id} className="flex items-center gap-x-2">
        {frameworks.map(({ framework, href }) => (
          <Tooltip
            key={framework}
            label={intl.formatMessage(
              {
                defaultMessage: 'Available in {frameworkLabel}',
                description:
                  'Label indicating what JavaScript frameworks this question is available in',
                id: '72GwzV',
              },
              {
                frameworkLabel: frameworksData[framework].label,
              },
            )}>
            <Anchor
              aria-label={frameworksData[framework].label}
              href={href}
              variant="unstyled"
              onClick={(event) => {
                event.stopPropagation();
              }}>
              <QuestionFrameworkIcon framework={framework} />
            </Anchor>
          </Tooltip>
        ))}
      </div>
    </div>
  );
}
