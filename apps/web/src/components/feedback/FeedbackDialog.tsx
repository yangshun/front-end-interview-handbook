import { useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';

import gtag from '~/lib/gtag';

import Anchor from '~/components/ui/Anchor';
import Button from '~/components/ui/Button';
import Dialog from '~/components/ui/Dialog';
import Text from '~/components/ui/Text';
import TextArea from '~/components/ui/TextArea';
import TextInput from '~/components/ui/TextInput';

import logMessage from '~/logging/logMessage';

import useMarketingContactPlatformsConfig from '../marketing/contact/MarketingContactPlatformsConfig';

import { useUser } from '@supabase/auth-helpers-react';
type FeedbackState = 'email' | 'message' | 'success';

function SocialPlatform() {
  const marketingContactPlatformsConfig = useMarketingContactPlatformsConfig();

  return (
    <div className="flex flex-col gap-3">
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-slate-300" />
        </div>
        <div className="relative flex justify-center text-xs">
          <span className="bg-white px-2 text-slate-500">
            <FormattedMessage
              defaultMessage="Or reach us via these channels"
              description="Text to introduce users to alternative feedback channels"
              id="YJmwAv"
            />
          </span>
        </div>
      </div>
      <div className="flex items-center justify-center gap-2">
        {marketingContactPlatformsConfig.map((platform) => (
          <Anchor
            key={platform.key}
            className="focus:ring-brand-500 flex items-center justify-center gap-2 rounded-full bg-slate-100 p-2 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-200 hover:text-slate-900 focus:outline-none focus:ring-2 focus:ring-offset-2"
            href={platform.href}
            variant="unstyled"
            onClick={() => {
              gtag.event({
                action: `feedback.channel.${platform.key}.click`,
                category: 'engagement',
                label: platform.name,
              });
            }}>
            <platform.icon className="h-5 w-5" />
          </Anchor>
        ))}
      </div>
    </div>
  );
}

type Props = Readonly<{
  isShown?: boolean;
  onClose: () => void;
  onHideWidgetForSession?: () => void;
  preBodyContents?: React.ReactNode;
  showHideWidgetForSessionButton?: boolean;
  title?: string;
}>;

export default function FeedbackDialog({
  preBodyContents,
  showHideWidgetForSessionButton,
  title: titleParam,
  isShown,
  onClose,
  onHideWidgetForSession,
}: Props) {
  const [feedbackState, setFeedbackState] = useState<FeedbackState>('message');
  const [feedbackId, setFeedbackId] = useState<string | null>(null);
  const user = useUser();
  const [messageFormErrorMessage, setMessageFormErrorMessage] = useState('');
  const [emailFormErrorMessage, setEmailFormErrorMessage] = useState('');
  const intl = useIntl();
  const title =
    titleParam ??
    intl.formatMessage({
      defaultMessage: 'Send us a Message',
      description: 'Title for send us a feedback modal',
      id: 'L/BHun',
    });

  return (
    <Dialog isShown={isShown} title={title} onClose={onClose}>
      <div className="grid gap-y-4 overflow-y-auto bg-white pt-4">
        {preBodyContents}
        {feedbackState === 'message' && (
          <form
            className="flex flex-col gap-4"
            onSubmit={async (event) => {
              event.preventDefault();
              event.stopPropagation();

              const data = new FormData(event.target as HTMLFormElement);

              logMessage({
                level: 'info',
                message: `User feedback: ${data.get('message')}`,
              });

              const response = await fetch('/api/marketing/feedback', {
                body: JSON.stringify({
                  message: data.get('message') as string,
                }),
                headers: {
                  'Content-Type': 'application/json',
                },
                method: 'POST',
              });
              const result = await response.json();

              if (!response.ok) {
                setMessageFormErrorMessage(result.message);

                return;
              }
              setMessageFormErrorMessage('');
              setFeedbackId(result.feedbackId);
              setFeedbackState('email');
            }}>
            <TextArea
              autoFocus={true}
              description={intl.formatMessage({
                defaultMessage:
                  'Give us your feedback/suggestions and stand a chance to receive a discount/cashback!',
                description: 'Feedback widget textarea description',
                id: '8MHkPL',
              })}
              errorMessage={messageFormErrorMessage}
              fontSize="xs"
              label={intl.formatMessage({
                defaultMessage: 'Your Message',
                description: 'Feedback widget textarea title',
                id: 'wdlzwm',
              })}
              name="message"
              rows={5}
            />
            <Button
              display="block"
              label={intl.formatMessage({
                defaultMessage: 'Submit',
                description: 'Feedback widget submit button label',
                id: 'c2hcfm',
              })}
              type="submit"
              variant="primary"
            />
          </form>
        )}
        {feedbackState === 'email' && (
          <form
            className="flex flex-col gap-4"
            onSubmit={async (event) => {
              event.preventDefault();
              event.stopPropagation();

              const data = new FormData(event.target as HTMLFormElement);
              const response = await fetch(
                `/api/marketing/feedback/${feedbackId}`,
                {
                  body: JSON.stringify({
                    email: data.get('email') as string,
                  }),
                  headers: {
                    'Content-Type': 'application/json',
                  },
                  method: 'PUT',
                },
              );
              const result = await response.json();

              if (!response.ok) {
                setEmailFormErrorMessage(result.message);

                return;
              }
              setEmailFormErrorMessage('');
              setFeedbackState('success');
            }}>
            <TextInput
              autoFocus={true}
              defaultValue={user?.email ?? ''}
              description={intl.formatMessage({
                defaultMessage:
                  'Tell us your email if you want us to follow up with you.',
                description:
                  'Feedback widget text to request for optional email input for following up',
                id: 'IBP/D0',
              })}
              errorMessage={emailFormErrorMessage}
              label={intl.formatMessage({
                defaultMessage: 'Your Email',
                description: 'Feedback widget email input field label',
                id: 'fXNw/d',
              })}
              name="email"
            />
            <Button
              display="block"
              label={intl.formatMessage({
                defaultMessage: 'Submit',
                description: 'Feedback widget submit button label',
                id: 'c2hcfm',
              })}
              type="submit"
              variant="primary"
            />
          </form>
        )}
        {feedbackState === 'success' && (
          <div className="flex h-full flex-col items-center justify-center gap-4">
            <Text color="success" variant="body2">
              <FormattedMessage
                defaultMessage="Feedback received successfully."
                description="Feedback widget success message."
                id="VQ9c4+"
              />
            </Text>
            <Button
              label={intl.formatMessage({
                defaultMessage: 'Leave more feedback',
                description:
                  'Feedback widget button label to leave more feedback before the session closes',
                id: '5A3y/o',
              })}
              variant="tertiary"
              onClick={() => {
                setFeedbackState('message');
              }}
            />
          </div>
        )}
        <SocialPlatform />
        {showHideWidgetForSessionButton && (
          <div className="flex justify-center">
            <Button
              label={intl.formatMessage({
                defaultMessage: 'Hide widget for this session',
                description:
                  'Feedback widget button label to hide the feedback widget for their current session',
                id: 'ozQHOy',
              })}
              size="sm"
              variant="flat"
              onClick={onHideWidgetForSession}
            />
          </div>
        )}
      </div>
    </Dialog>
  );
}
