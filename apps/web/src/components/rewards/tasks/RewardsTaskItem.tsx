import clsx from 'clsx';
import { FaCheck } from 'react-icons/fa6';
import { RiArrowRightLine } from 'react-icons/ri';

import { FormattedMessage, useIntl } from '~/components/intl';
import Button from '~/components/ui/Button';
import Text from '~/components/ui/Text';
import { themeIconColor } from '~/components/ui/theme';

export type RewardsTasksItemStatus =
  | 'completed'
  | 'error'
  | 'none'
  | 'pending'
  | 'verifying';
export const GITHUB_STAR_JS_INTERVIEWS = 'GITHUB_STAR.JS_INTERVIEWS';
export const GITHUB_STAR_REACT_INTERVIEWS = 'GITHUB_STAR.REACT_INTERVIEWS';
export const GITHUB_STAR_SYSTEM_DESIGN = 'GITHUB_STAR.SYSTEM_DESIGN';
export type RewardsTasksActionName =
  | typeof GITHUB_STAR_JS_INTERVIEWS
  | typeof GITHUB_STAR_REACT_INTERVIEWS
  | typeof GITHUB_STAR_SYSTEM_DESIGN
  | 'GITHUB_FOLLOW'
  | 'LINKEDIN_FOLLOW'
  | 'TWITTER_FOLLOW';

export type Props = Readonly<{
  actionName: RewardsTasksActionName;
  icon: (props: React.ComponentProps<'svg'>) => JSX.Element;
  isDisabled?: boolean;
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
  isDisabled,
}: Props) {
  const intl = useIntl();

  return (
    <div>
      <div
        className={clsx(
          'flex items-center justify-between',
          status === 'none' ? 'h-11' : 'h-14',
        )}>
        <div className="flex items-center gap-x-4">
          <Icon className={clsx('size-5 shrink-0', themeIconColor)} />
          <Text className="block" size="body2">
            {label}
          </Text>
        </div>
        <div>
          {status === 'completed' && (
            <Text
              className="flex gap-x-2"
              color="success"
              size="body3"
              weight="medium">
              <FaCheck className="size-4 shrink-0" />
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
              isDisabled={isDisabled}
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
              defaultMessage="Task has not been completed! Please try again. Ensure that your profile activity is accessible to public"
              description="Error task label"
              id="pA6Utl"
            />
          </Text>
        </div>
      )}
    </div>
  );
}
