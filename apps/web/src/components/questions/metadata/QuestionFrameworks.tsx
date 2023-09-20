import type { CSSProperties } from 'react';
import { useId } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';

import { useQuestionTechnologyLists } from '~/data/QuestionFormats';

import AngularLogo from '~/components/icons/AngularLogo';
import HTML5Logo from '~/components/icons/HTML5Logo';
import ReactLogo from '~/components/icons/ReactLogo';
import VueLogoMonochrome from '~/components/icons/VueLogoMonochrome';
import Anchor from '~/components/ui/Anchor';
import Tooltip from '~/components/ui/Tooltip';

import type { QuestionFramework } from '../common/QuestionsTypes';

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
  angular: { icon: AngularLogo, style: { transform: 'scale(1.1)' } },
  react: { icon: ReactLogo, style: { fill: 'rgb(20, 158, 202)' } },
  vanilla: { icon: HTML5Logo },
  vue: { icon: VueLogoMonochrome },
};

export default function QuestionFrameworks({ frameworks }: Props) {
  const id = useId();
  const questionTechnologyLists = useQuestionTechnologyLists();
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
                  frameworkLabel: questionTechnologyLists[framework].name,
                },
              )}
              position="above">
              <Anchor
                aria-label={questionTechnologyLists[framework].name}
                href={href}
                variant="unstyled"
                onClick={(event) => {
                  event.stopPropagation();
                }}>
                <Icon className="h-5 w-5" style={iconStyle} />
              </Anchor>
            </Tooltip>
          );
        })}
      </div>
    </div>
  );
}
