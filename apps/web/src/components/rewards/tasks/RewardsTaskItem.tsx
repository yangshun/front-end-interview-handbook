import clsx from 'clsx';
import { RiArrowRightLine, RiCheckFill } from 'react-icons/ri';
import { FormattedMessage, useIntl } from 'react-intl';

import Button from '~/components/ui/Button';
import Text from '~/components/ui/Text';

export type RewardsTasksItemStatus =
  | 'completed'
  | 'error'
  | 'none'
  | 'pending'
  | 'verifying';
export type RewardsTasksActionName =
  | 'GITHUB_FOLLOW'
  | 'GITHUB_STAR'
  | 'LINKEDIN_FOLLOW'
  | 'TWITTER_FOLLOW';

export type Props = Readonly<{
  actionName: RewardsTasksActionName;
  icon: (props: React.ComponentProps<'svg'>) => JSX.Element;
  label: string;
  status: RewardsTasksItemStatus;
  taskHref: string;
}>;

// https://stackoverflow.com/a/48438211
function openPopup(url: string, title: string, w: number, h: number) {
  const { userAgent } = navigator;
  const mobile =
    /\b(iPhone|iP[ao]d)/.test(userAgent) ||
    /\b(iP[ao]d)/.test(userAgent) ||
    /Android/i.test(userAgent) ||
    /Mobile/i.test(userAgent);
  const screenX =
    typeof window.screenX != 'undefined' ? window.screenX : window.screenLeft;
  const screenY =
    typeof window.screenY != 'undefined' ? window.screenY : window.screenTop;
  const outerWidth =
    typeof window.outerWidth != 'undefined'
      ? window.outerWidth
      : document.documentElement.clientWidth;
  const outerHeight =
    typeof window.outerHeight != 'undefined'
      ? window.outerHeight
      : document.documentElement.clientHeight - 22;
  const targetWidth = mobile ? 400 : w;
  const targetHeight = mobile ? 600 : h;
  const V = screenX < 0 ? window.screen.width + screenX : screenX;
  const left = V + (outerWidth - targetWidth) / 2;
  const right = screenY + (outerHeight - targetHeight) / 2.5;
  const features = [];

  if (targetWidth !== null) {
    features.push(`width=${targetWidth}`);
  }

  if (targetHeight !== null) {
    features.push(`height=${targetHeight}`);
  }

  features.push(`top=100`);
  features.push(`left=${left}`);
  features.push(`right=${right}`);
  features.push('scrollbars=1');

  const newWindow = window.open(url, title, features.join(','));

  newWindow?.focus();

  return newWindow;
}

export default function RewardsTaskItem({
  icon: Icon,
  label,
  taskHref,
  status,
}: Props) {
  const intl = useIntl();

  return (
    <div>
      <div
        className={clsx(
          'flex justify-between items-center',
          status === 'none' ? 'h-11' : 'h-14',
        )}>
        <div className="flex items-center gap-x-4">
          <Icon
            className={clsx(
              'h-6 w-6 shrink-0',
              'text-neutral-400 dark:text-neutral-500',
            )}
          />
          <Text display="block" size="body2">
            {label}
          </Text>
        </div>
        <div>
          {status === 'completed' && (
            <Text
              className="gap-x-2"
              color="success"
              display="flex"
              size="body3"
              weight="medium">
              <RiCheckFill className="h-4 w-4 shrink-0" />
              <FormattedMessage
                defaultMessage="Completed"
                description="Completed task label"
                id="Jkhbjw"
              />
            </Text>
          )}
          {(status === 'pending' || status === 'error') && (
            <Button
              addonPosition="end"
              icon={RiArrowRightLine}
              label={
                status === 'pending'
                  ? intl.formatMessage({
                      defaultMessage: 'Start task',
                      description: 'Label for button to start task',
                      id: 'Aarfzt',
                    })
                  : intl.formatMessage({
                      defaultMessage: 'Retry task',
                      description: 'Label for button to start task',
                      id: 'LREMMc',
                    })
              }
              size="sm"
              type="button"
              variant="secondary"
              onClick={() => openPopup(taskHref, label, 1200, 600)}
            />
          )}
          {status === 'verifying' && (
            <Button
              addonPosition="end"
              isDisabled={true}
              isLoading={true}
              label={intl.formatMessage({
                defaultMessage: 'Verifying',
                description: 'Label for button',
                id: 'BDGx19',
              })}
              variant="secondary"
            />
          )}
        </div>
      </div>
      {status === 'error' && (
        <div className="flex justify-end pb-3">
          <Text color="error" size="body3">
            <FormattedMessage
              defaultMessage="Task has not been completed! Please try again."
              description="Error task label"
              id="7hlP1A"
            />
          </Text>
        </div>
      )}
    </div>
  );
}
