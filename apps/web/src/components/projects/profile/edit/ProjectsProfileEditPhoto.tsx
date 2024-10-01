import type { ChangeEvent } from 'react';
import { useRef, useState } from 'react';

import { useIntl } from '~/components/intl';
import Button from '~/components/ui/Button';
import DropdownMenu from '~/components/ui/DropdownMenu';

import ProjectsProfilePhotoUploadDialog from './ProjectsProfilePhotoUploadDialog';

type Props = Readonly<{
  hasProfilePhoto?: boolean;
  onChange: (imageUrl: string) => void;
  setImageSizeExceeded?: (value: boolean) => void;
}>;

const MAX_SIZE = 1024;

export default function ProjectsProfileEditPhoto({
  hasProfilePhoto,
  setImageSizeExceeded,
  onChange,
}: Props) {
  const intl = useIntl();
  const photoInputRef = useRef<HTMLInputElement>(null);
  const [showPhotoUploadDialog, setShowPhotoUploadDialog] = useState(false);
  const [imageFile, setImageFile] = useState('');
  const menuItems = [
    {
      label: intl.formatMessage({
        defaultMessage: 'Upload a photo',
        description: 'Label for upload photo',
        id: '+98gxd',
      }),
      onClick: () => photoInputRef?.current?.click(),
      show: true,
      value: 'upload',
    },
    {
      label: intl.formatMessage({
        defaultMessage: 'Remove photo',
        description: 'Label for remove photo',
        id: 'jZfj55',
      }),
      onClick: () => onChange(''),
      show: hasProfilePhoto,
      value: 'remove',
    },
  ];

  const onSelectPhoto = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      if (e.target.files[0].size / 1024 > MAX_SIZE) {
        setImageSizeExceeded?.(true);
        e.target.value = '';

        return;
      }
      setImageFile(URL.createObjectURL(e.target.files[0]));
    }
    setShowPhotoUploadDialog(true);
    setImageSizeExceeded?.(false);
    e.target.value = '';
  };

  return (
    <>
      <input
        ref={photoInputRef}
        accept="image/*"
        style={{ display: 'none' }}
        type="file"
        onChange={(e) => onSelectPhoto(e)}
      />
      <div>
        {hasProfilePhoto ? (
          <DropdownMenu
            label={intl.formatMessage({
              defaultMessage: 'Edit profile photo',
              description:
                'Label for edit profile photo button on projects profile',
              id: '4AetUb',
            })}>
            {menuItems
              .filter((item) => item.show)
              .map(({ label, value, onClick }) => (
                <DropdownMenu.Item
                  key={value}
                  label={label}
                  onClick={onClick}
                />
              ))}
          </DropdownMenu>
        ) : (
          <Button
            label={intl.formatMessage({
              defaultMessage: 'Add profile photo',
              description:
                'Label for add profile photo button on projects profile',
              id: 'AJuXmH',
            })}
            variant="secondary"
            onClick={() => photoInputRef?.current?.click()}
          />
        )}
      </div>
      {showPhotoUploadDialog && (
        <ProjectsProfilePhotoUploadDialog
          image={imageFile}
          isShown={showPhotoUploadDialog}
          onChange={onChange}
          onClose={() => {
            setShowPhotoUploadDialog(false);
            setImageFile('');
          }}
        />
      )}
    </>
  );
}
