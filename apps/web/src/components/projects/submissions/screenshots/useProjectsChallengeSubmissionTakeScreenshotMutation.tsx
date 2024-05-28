import type { ReactNode } from 'react';
import { RiArrowRightLine } from 'react-icons/ri';
import { FormattedMessage, useIntl } from 'react-intl';

import { trpc } from '~/hooks/trpc';

import { useToast } from '~/components/global/toasts/useToast';
import Button from '~/components/ui/Button';
import Text from '~/components/ui/Text';

import { useI18nRouter } from '~/next-i18nostic/src';

import { SUBMISSION_TARGETS } from '../constants';

function isOnSubmissionPage(href: string) {
  const { pathname } = window.location;

  return pathname === href;
}

function ViewButton({ href }: { href: string }) {
  const intl = useIntl();

  return (
    <Button
      addonPosition="end"
      href={`${href}?target=${SUBMISSION_TARGETS.imageComparison}`}
      icon={RiArrowRightLine}
      label={intl.formatMessage({
        defaultMessage: 'View',
        description: 'View link inside toast of screenshot',
        id: 'zQCyNh',
      })}
      variant="unstyled"
    />
  );
}

export default function useProjectsChallengeSubmissionTakeScreenshotMutation(
  source: 'comparison' | 'form',
) {
  const router = useI18nRouter();
  const { showToast } = useToast();
  const intl = useIntl();

  const renderBold = (chunks: Array<ReactNode>) => (
    <Text color="inherit" size="inherit" weight="bold">
      {chunks}
    </Text>
  );

  return trpc.projects.submission.retakeScreenshot.useMutation({
    onError: (error) => {
      const message = JSON.parse(error.message);
      let showViewLink = false;
      let href = '';

      if (message.data) {
        href = message.data.hrefs.detail;
        showViewLink = !isOnSubmissionPage(href);
      }

      showToast({
        description: (
          <div className="flex flex-col gap-3 pt-1">
            <Text className="block" color="inherit" size="inherit">
              <FormattedMessage
                defaultMessage="There were some issues with taking a screenshot for your site."
                description="Error message for screenshot generation"
                id="Va2o/g"
              />
            </Text>

            {showViewLink && (
              <div>
                <ViewButton href={href} />
              </div>
            )}
          </div>
        ),
        title: intl.formatMessage({
          defaultMessage: 'Screenshot failure',
          description: 'Screen failure error title',
          id: 'AeJ6Oz',
        }),
        variant: 'danger',
      });
      // Refetch submission page data to fetch latest status of screenshot
      router.refresh();
    },
    onMutate: () => {
      showToast({
        title:
          source === 'form'
            ? intl.formatMessage({
                defaultMessage:
                  'Generating screenshots for the submission, it might take a while',
                description:
                  'Message for project submission screenshot generation',
                id: 'WEj+Ko',
              })
            : intl.formatMessage({
                defaultMessage:
                  'Retaking screenshots for the submission, it might take a while',
                description:
                  'Message for project submission screenshot generation',
                id: 'AhoxQ8',
              }),
        variant: 'info',
      });
    },
    onSuccess: (data) => {
      const showViewLink = !isOnSubmissionPage(data.hrefs.detail);

      showToast({
        description: (
          <div className="flex flex-col gap-3 pt-1">
            <Text className="block" color="inherit" size="inherit">
              <FormattedMessage
                defaultMessage={`Screenshots for your submission <bold>"{title}"</bold> have been generated.`}
                description="Success message for screenshot generation"
                id="l6Y1+i"
                values={{
                  bold: renderBold,
                  title: data.title,
                }}
              />
            </Text>

            {showViewLink && (
              <div>
                <ViewButton href={data.hrefs.detail} />
              </div>
            )}
          </div>
        ),
        title: intl.formatMessage({
          defaultMessage: 'Screenshot-taking success!',
          description: 'Success message for screenshot generation',
          id: 'VmzkpS',
        }),
        variant: 'success',
      });
    },
  });
}
