import clsx from 'clsx';
import { useId } from 'react';
import { useDropzone } from 'react-dropzone';
import { RiCloseFill, RiImageLine } from 'react-icons/ri';

import { FormattedMessage, useIntl } from '~/components/intl';
import Button from '~/components/ui/Button';
import Label from '~/components/ui/Label';
import Text from '~/components/ui/Text';
import {
  themeBackgroundInputColor,
  themeBorderBrandColor,
  themeBorderBrandColor_Hover,
  themeBorderColor,
  themeBorderEmphasizeColor,
  themeBorderErrorColor,
  themeBorderSuccessColor,
  themeTextPlaceholderColor,
} from '~/components/ui/theme';

type Props = Readonly<{
  className?: string;
  errorMessage?: string;
  heightConstraint: number;
  imageUrl: string;
  mode?: 'create' | 'edit' | 'readonly';
  setError: (message: string | undefined) => void;
  setImageUrl: (url: string) => void;
  widthConstraint: number;
}>;

const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2MB

export default function SponsorsAdvertiseRequestFormAdsImageUpload({
  className,
  widthConstraint,
  heightConstraint,
  setImageUrl,
  imageUrl,
  errorMessage,
  setError,
  mode = 'create',
}: Props) {
  const intl = useIntl();
  const messageId = useId();
  const isReadonly = mode === 'readonly';

  function onDrop(acceptedFiles: Array<File>) {
    setError(undefined);

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

  const { getRootProps, getInputProps, isFocused, isDragAccept, isDragReject } =
    useDropzone({
      accept: { 'image/*': [] },
      multiple: false,
      onDrop,
    });

  const dropzoneBorderClassName = (() => {
    if (isDragAccept) {
      return themeBorderSuccessColor;
    }
    if (isDragReject) {
      return themeBorderErrorColor;
    }
    if (isFocused) {
      return themeBorderBrandColor;
    }

    return themeBorderEmphasizeColor;
  })();

  return (
    <div className={clsx('flex flex-col gap-2', className)}>
      <Label
        description={intl.formatMessage(
          {
            defaultMessage:
              'Image dimensions: {width}px x {height}px ({ratio}:1 ratio)',
            description: 'Description for ad asset',
            id: '1Ry887',
          },
          {
            height: heightConstraint,
            ratio: widthConstraint / heightConstraint,
            width: widthConstraint,
          },
        )}
        label={intl.formatMessage({
          defaultMessage: 'Ad image',
          description: 'Label for ad image',
          id: 'MFgHcw',
        })}
        required={true}
      />
      {imageUrl ? (
        <div className="relative">
          {!isReadonly && (
            <Button
              className="absolute -right-3 -top-3"
              icon={RiCloseFill}
              isLabelHidden={true}
              label="Remove image"
              tooltip="Remove image"
              variant="secondary"
              onClick={() => setImageUrl('')}
            />
          )}
          <img
            alt="Uploaded image"
            className={clsx('aspect-[2/1] w-full object-cover', 'rounded-lg', [
              'border',
              themeBorderColor,
            ])}
            src={imageUrl}
          />
        </div>
      ) : (
        <>
          <div
            {...getRootProps()}
            className={clsx(
              'flex w-full flex-col items-center justify-center',
              'cursor-pointer',
              'aspect-[2/1]',
              [
                'transition-colors',
                'border border-dashed',
                dropzoneBorderClassName,
                themeBorderBrandColor_Hover,
              ],
              'rounded-md',
              themeBackgroundInputColor,
            )}>
            <input
              {...getInputProps()}
              aria-describedby={errorMessage ? messageId : undefined}
            />
            <RiImageLine
              aria-hidden="true"
              className={clsx(
                'size-10 mx-auto mb-2 shrink-0',
                themeTextPlaceholderColor,
              )}
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
        </>
      )}
    </div>
  );
}
