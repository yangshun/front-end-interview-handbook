import clsx from 'clsx';
import { useEffect, useRef, useState } from 'react';
import type { CropperRef } from 'react-advanced-cropper';
import { CircleStencil, Cropper } from 'react-advanced-cropper';

import { trpc } from '~/hooks/trpc';

import { useIntl } from '~/components/intl';
import { blobToBase64 } from '~/components/projects/utils/profilePhotoUtils';
import Button from '~/components/ui/Button';
import Dialog from '~/components/ui/Dialog';
import Spinner from '~/components/ui/Spinner';
import { themeBackgroundLayerColor } from '~/components/ui/theme';

import 'react-advanced-cropper/dist/style.css';

type Props = Readonly<{
  image: string;
  isShown: boolean;
  onChange: (imageUrl: string) => void;
  onClose: () => void;
}>;

export default function ProjectsProfilePhotoUploadDialog({
  isShown,
  onClose,
  image,
  onChange,
}: Props) {
  const intl = useIntl();
  const cropperRef = useRef<CropperRef>(null);
  const [isImageLoading, setIsImageLoading] = useState<boolean>(true);
  const uploadPhoto = trpc.projects.profile.uploadProfilePhoto.useMutation();

  // To determine the custom visible area in the image cropper
  useEffect(() => {
    const img = new Image();

    img.onload = () => {
      setIsImageLoading(false);
    };

    img.src = image;
  }, [image]);

  const onUpload = () => {
    const canvas = cropperRef.current?.getCanvas({
      height: 250,
      width: 250,
    });

    if (canvas) {
      canvas.toBlob(async (blob) => {
        if (blob) {
          const base64 = await blobToBase64(blob);

          const data = await uploadPhoto.mutateAsync({ imageFile: base64 });

          onChange(`${data}?unique=${new Date().getTime()}`);

          onClose();
        }
      }, 'image/jpg');
    }
  };

  return (
    <Dialog
      isShown={isShown}
      primaryButton={
        <Button
          isDisabled={uploadPhoto.isLoading}
          isLoading={uploadPhoto.isLoading}
          label={intl.formatMessage({
            defaultMessage: 'Set new profile photo',
            description: 'Label for new profile photo button',
            id: '9dQ21j',
          })}
          size="md"
          variant="primary"
          onClick={onUpload}
        />
      }
      title={intl.formatMessage({
        defaultMessage: 'Crop your new profile photo',
        description: 'Dialog title for crop profile photo',
        id: 'bYY9Mh',
      })}
      width="screen-sm"
      onClose={onClose}>
      <div
        className={clsx(
          'flex h-[400px] items-center justify-center',
          themeBackgroundLayerColor,
        )}>
        {isImageLoading ? (
          <Spinner display="block" />
        ) : (
          <Cropper
            ref={cropperRef}
            className="cropper"
            src={image}
            stencilComponent={CircleStencil}
            stencilProps={{
              aspectRatio: 1,
              handlers: {
                east: false,
                eastNorth: true,
                eastSouth: true,
                north: false,
                south: false,
                west: false,
                westNorth: true,
                westSouth: true,
              },
              lines: false,
              movable: true,
              resizable: true,
            }}
          />
        )}
      </div>
    </Dialog>
  );
}
