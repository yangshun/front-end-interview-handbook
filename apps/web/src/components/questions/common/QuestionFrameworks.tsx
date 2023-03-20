import type { CSSProperties } from 'react';
import { useId } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';

import HTML5Logo from '~/components/icons/HTML5Logo';
import ReactLogo from '~/components/icons/ReactLogo';
import Anchor from '~/components/ui/Anchor';
import Tooltip from '~/components/ui/Tooltip';

import type { QuestionFramework } from './QuestionsTypes';
import useQuestionFrameworkLabels from './useQuestionFrameworkLabels';

type Props = Readonly<{
  frameworks: ReadonlyArray<
    Readonly<{
      framework: QuestionFramework;
      href: string;
    }>
  >;
}>;

const frameworkIcons: Record<
  QuestionFramework,
  Readonly<{
    icon: (props: React.ComponentProps<'svg'>) => JSX.Element;
    style?: CSSProperties;
  }>
> = {
  react: { icon: ReactLogo, style: { fill: 'rgb(20, 158, 202)' } },
  vanilla: { icon: HTML5Logo },
};

export default function QuestionFrameworks({ frameworks }: Props) {
  const id = useId();
  const frameworkLabel = useQuestionFrameworkLabels();
  const intl = useIntl();

  return (
    <div className="flex items-center">
      <span className="sr-only" id={id}>
        <FormattedMessage
          defaultMessage="Available Frameworks"
          description="Screenreader text to indicate the presence of available frameworks, displayed on question cards in question lists"
          id="aqK/Gm"
        />
      </span>
      <div aria-labelledby={id} className="flex items-center space-x-2">
        {frameworks.map(({ framework, href }) => {
          const { icon: Icon, style: iconStyle } = frameworkIcons[framework];

          return (
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
                  frameworkLabel: frameworkLabel[framework],
                },
              )}
              position="above">
              <Anchor
                aria-label={frameworkLabel[framework]}
                href={href}
                variant="unstyled"
                onClick={(event) => {
                  event.stopPropagation();
                }}>
                <Icon className="h-6 w-6" style={iconStyle} />
              </Anchor>
            </Tooltip>
          );
        })}
      </div>
    </div>
  );
}
