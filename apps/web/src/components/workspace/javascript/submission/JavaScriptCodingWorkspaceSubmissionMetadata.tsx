import type { QuestionWorkingLanguage } from '@prisma/client';
import clsx from 'clsx';
import {
  RiCheckboxCircleLine,
  RiJavascriptLine,
  RiTimeLine,
} from 'react-icons/ri';
import { TbBrandTypescript } from 'react-icons/tb';

import RelativeTimestamp from '~/components/common/datetime/RelativeTimestamp';
import { useIntl } from '~/components/intl';
import Badge from '~/components/ui/Badge';
import Text from '~/components/ui/Text';
import { themeTextSubtleColor } from '~/components/ui/theme';

type Props = Readonly<{
  createdAt: Date;
  isActive: boolean;
  isCorrect: boolean;
  language: QuestionWorkingLanguage;
  name: string;
}>;

export default function JavaScriptCodingWorkspaceSubmissionMetadata({
  createdAt,
  isActive,
  isCorrect,
  language,
  name,
}: Props) {
  const intl = useIntl();

  const languages: Record<
    QuestionWorkingLanguage,
    {
      icon: (iconProps: React.ComponentProps<'svg'>) => JSX.Element;
      name: string;
    }
  > = {
    JS: {
      icon: RiJavascriptLine,
      name: 'JavaScript',
    },
    TS: {
      icon: TbBrandTypescript,
      name: 'TypeScript',
    },
  };

  const { icon: LanguageIcon, name: languageName } = languages[language];

  return (
    <div className="space-y-1.5">
      <div className="flex items-center gap-2">
        <Text size="body1" weight="bold">
          {name}
        </Text>
        {isActive && (
          <Badge
            label={intl.formatMessage({
              defaultMessage: 'Current',
              description: 'Current active submission label',
              id: 'R56YnA',
            })}
            size="xs"
            variant="neutral"
          />
        )}
      </div>
      <div className="flex flex-wrap gap-x-4 gap-y-2">
        {isCorrect && (
          <InfoItem icon={RiCheckboxCircleLine}>
            {intl.formatMessage({
              defaultMessage: 'Correct answer',
              description: 'Correct submission in coding workspace',
              id: '1wvFld',
            })}
          </InfoItem>
        )}
        <InfoItem icon={LanguageIcon}>{languageName}</InfoItem>
        <InfoItem className="relative" icon={RiTimeLine}>
          <RelativeTimestamp timestamp={createdAt} />
        </InfoItem>
      </div>
    </div>
  );
}

function InfoItem({
  children,
  className,
  icon: Icon,
}: {
  children: React.ReactNode;
  className?: string;
  icon: (iconProps: React.ComponentProps<'svg'>) => JSX.Element;
}) {
  return (
    <div className={clsx('flex items-center gap-1.5', className)}>
      <Icon
        aria-hidden="true"
        className={clsx('size-4 shrink-0', themeTextSubtleColor)}
      />
      <Text color="secondary" size="body3">
        {children}
      </Text>
    </div>
  );
}
