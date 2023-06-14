import clsx from 'clsx';
import { FormattedMessage, useIntl } from 'react-intl';

import Button from '~/components/ui/Button';
import Heading from '~/components/ui/Heading';
import ProgressBar from '~/components/ui/ProgressBar';
import Text from '~/components/ui/Text';
import {
  themeBackgroundEmphasized,
  themeLineColor,
  themeTextSecondaryColor,
} from '~/components/ui/theme';

type Props = Readonly<{
  completedQuestions: number;
  hideCount?: boolean;
  href: string;
  icon: (props: React.ComponentProps<'svg'>) => JSX.Element;
  title: string;
  totalQuestions: number;
}>;

export default function QuestionsProgressPanel({
  hideCount,
  title,
  icon: Icon,
  completedQuestions,
  totalQuestions,
  href,
}: Props) {
  const intl = useIntl();

  return (
    <div
      className={clsx(
        'flex items-center overflow-hidden rounded-lg border p-4',
        themeLineColor,
      )}>
      <div
        className={clsx(
          '-m-1 flex-shrink-0 rounded-md p-2',
          themeBackgroundEmphasized,
          themeTextSecondaryColor,
        )}>
        <Icon aria-hidden="true" className="h-5 w-5" />
      </div>
      <div className="ml-4 w-0 flex-1">
        <div className="flex items-center justify-between space-x-4">
          <div>
            <Heading
              className="truncate text-sm font-medium lg:text-base"
              level="custom">
              {title}
            </Heading>
            {!hideCount && totalQuestions > 0 && (
              <Text color="secondary" size="body3">
                <FormattedMessage
                  defaultMessage="{completedQuestions} of {totalQuestions} completed"
                  description="Line describing the number of questions completed by user over the total number of questions"
                  id="Cw8cK4"
                  values={{
                    completedQuestions,
                    totalQuestions,
                  }}
                />
              </Text>
            )}
          </div>
          <div>
            <Button
              href={href}
              label={intl.formatMessage({
                defaultMessage: 'See all',
                description:
                  'Label for see all button that brings user to the full question list for that question format',
                id: 'Z9Wr7g',
              })}
              size="xs"
              variant="secondary"
            />
          </div>
        </div>
        <div className="mt-2">
          {completedQuestions > 0 && (
            <ProgressBar
              completed={completedQuestions}
              total={totalQuestions}
            />
          )}
        </div>
      </div>
    </div>
  );
}
