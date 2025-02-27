import clsx from 'clsx';
import { useId } from 'react';
import { useDropzone } from 'react-dropzone';

import { FormattedMessage, useIntl } from '~/components/intl';
import Label from '~/components/ui/Label';
import Text from '~/components/ui/Text';
import {
  themeBackgroundInputColor,
  themeBorderEmphasizeColor,
} from '~/components/ui/theme';

type Props = Readonly<{
  errorMessage?: string;
  heightConstraint: number;
  setError: (message: string) => void;
  setImageUrl: (url: string) => void;
  widthConstraint: number;
}>;

const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2MB

export default function SponsorsAdvertiseRequestFormAdsImageUpload({
  widthConstraint,
  heightConstraint,
  setImageUrl,
  errorMessage,
  setError,
}: Props) {
  const intl = useIntl();
  const messageId = useId();

  function onDrop(acceptedFiles: Array<File>) {
    if (acceptedFiles.length > 0) {
      const file = acceptedFiles[0];

      if (file.size > MAX_FILE_SIZE) {
        setImageUrl('');
        setError(
          intl.formatMessage(
            {
              defaultMessage: 'File size must be less than {size}',
              description: 'Error message for image size exceeded',
              id: '9MjKe9',
            },
            { size: '2MB' },
          ),
        );

        return;
      }
      setImageUrl(URL.createObjectURL(file));
    }
  }

  const { getRootProps, getInputProps } = useDropzone({
    accept: { 'image/*': [] },
    multiple: false,
    onDrop,
  });

  return (
    <div className="flex flex-col gap-2">
      <Label
        description={intl.formatMessage({
          defaultMessage: 'Follow the image dimensions guidelines',
          description: 'Description for ad asset',
          id: 'Y8acmz',
        })}
        label={intl.formatMessage({
          defaultMessage: 'Ad asset',
          description: 'Label for ad image',
          id: 'vWBErz',
        })}
        required={true}
      />
      <div
        {...getRootProps()}
        className={clsx(
          'flex w-full flex-col items-center justify-center',
          'py-10',
          ['border', themeBorderEmphasizeColor, 'border-dashed'],
          'rounded-md',
          themeBackgroundInputColor,
        )}>
        <input
          {...getInputProps()}
          aria-describedby={errorMessage ? messageId : undefined}
        />
        <Text className="block" color="subtitle" size="body2">
          <FormattedMessage
            defaultMessage="Select or drop an image here"
            description="Ad image upload description"
            id="EfUaYk"
          />
        </Text>
        <Text className="mt-1 block" color="secondary" size="body3">
          {widthConstraint}px x {heightConstraint}px (
          {widthConstraint / heightConstraint}:1 ratio)
        </Text>
      </div>
      {errorMessage && (
        <Text className="block" color="error" id={messageId} size="body3">
          {errorMessage}
        </Text>
      )}
    </div>
  );
}
