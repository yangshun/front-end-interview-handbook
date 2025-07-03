import clsx from 'clsx';
import { useState } from 'react';

import { trpc } from '~/hooks/trpc';

import { useToast } from '~/components/global/toasts/useToast';
import { FormattedMessage, useIntl } from '~/components/intl';
import Anchor from '~/components/ui/Anchor';
import Button from '~/components/ui/Button';
import Dialog from '~/components/ui/Dialog';
import Text from '~/components/ui/Text';
import TextInput from '~/components/ui/TextInput';

type Props = Readonly<{
  isShown: boolean;
  onClose: () => void;
}>;

export default function SponsorsBookDemoDialog({ isShown, onClose }: Props) {
  const intl = useIntl();
  const { showToast } = useToast();
  const [formData, setFormData] = useState({
    company: '',
    designation: '',
    email: '',
    name: '',
  });
  const {
    failureReason: submitFailureReason,
    isLoading: isSubmitLoading,
    mutate: submitFeedback,
  } = trpc.feedback.submitFeedback.useMutation({
    onError: () => {
      showToast({
        description: (
          <FormattedMessage
            defaultMessage="Please contact support at <link>support@greatfrontend.com</link>. Including logs and screenshots will help us resolve the issue."
            description="Error toast description for message sent"
            id="H6ueSi"
            values={{
              link: (chunk) => (
                <Anchor href="mailto:support@greatfrontend.com">{chunk}</Anchor>
              ),
            }}
          />
        ),
        title: (
          <FormattedMessage
            defaultMessage="Something went wrong"
            description="Error toast title for message sent"
            id="btKr6n"
          />
        ),
        variant: 'danger',
      });
    },
    onSuccess: () => {
      showToast({
        description: intl.formatMessage({
          defaultMessage: 'We will get back to you within 1-2 working days',
          description: 'Text indicating response time after booking a demo',
          id: 'Zf0jlB',
        }),
        title: intl.formatMessage({
          defaultMessage: 'Demo booked successfully',
          description: 'Success toast title for booking a demo',
          id: 'cuiv3H',
        }),
        variant: 'success',
      });
      handleClose();
    },
  });

  function handleClose() {
    onClose();
    setFormData({ company: '', designation: '', email: '', name: '' });
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    submitFeedback({
      category: 'SPONSORSHIP',
      email: formData.email,
      message: `Company: ${formData.company}; Designation: ${formData.designation}; Name: ${formData.name}`,
    });
  }

  return (
    <Dialog
      isShown={isShown}
      title={intl.formatMessage({
        defaultMessage: 'Book a demo',
        description: 'Book a demo dialog title',
        id: '474wi7',
      })}
      width="custom"
      widthClass="sm:max-w-[380px] sm:mx-auto"
      onClose={handleClose}>
      <form className="mt-2.5" onSubmit={handleSubmit}>
        <div className="space-y-4">
          <TextInput
            autoFocus={true}
            label={intl.formatMessage({
              defaultMessage: 'Name',
              description: 'Label for name field',
              id: 'n25pZ5',
            })}
            name="name"
            placeholder="E.g. John"
            required={true}
            value={formData.name}
            onChange={(value) => setFormData({ ...formData, name: value })}
          />
          <TextInput
            label={intl.formatMessage({
              defaultMessage: 'Company name',
              description: 'Label for compnay name field',
              id: 'LUoa1w',
            })}
            name="company"
            placeholder="E.g. GreatFrontEnd"
            required={true}
            value={formData.company}
            onChange={(value) => setFormData({ ...formData, company: value })}
          />
          <TextInput
            label={intl.formatMessage({
              defaultMessage: 'Designation',
              description: 'Label for designation field',
              id: 'rsoyvp',
            })}
            name="designation"
            placeholder="E.g. CEO or Cofounder"
            required={true}
            value={formData.designation}
            onChange={(value) =>
              setFormData({ ...formData, designation: value })
            }
          />
          <TextInput
            label={intl.formatMessage({
              defaultMessage: 'Contact email',
              description: 'Label for contact email field',
              id: 'z/51Y2',
            })}
            name="designation"
            placeholder="E.g. john@company.com"
            required={true}
            type="email"
            value={formData.email}
            onChange={(value) => setFormData({ ...formData, email: value })}
          />
        </div>
        {submitFailureReason?.message && (
          <Text className="mt-2.5 block" color="error" size="body3">
            {submitFailureReason.message}
          </Text>
        )}
        <div className={clsx('flex justify-end gap-2', 'mb-4 mt-8')}>
          <Button
            isDisabled={isSubmitLoading}
            label={intl.formatMessage({
              defaultMessage: 'Cancel',
              description: 'Cancel button label',
              id: '0GT0SI',
            })}
            size="md"
            variant="secondary"
            onClick={handleClose}
          />
          <Button
            isDisabled={isSubmitLoading}
            isLoading={isSubmitLoading}
            label={intl.formatMessage({
              defaultMessage: 'Send',
              description: 'Send button label',
              id: 'dp5/GE',
            })}
            size="md"
            type="submit"
            variant="primary"
          />
        </div>
        <Text
          className="block w-full text-center"
          color="secondary"
          size="body3">
          {intl.formatMessage({
            defaultMessage: 'We will get back to you within 1-2 working days',
            description: 'Text indicating response time after booking a demo',
            id: 'Zf0jlB',
          })}
        </Text>
      </form>
    </Dialog>
  );
}
