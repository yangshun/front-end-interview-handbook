import { useState } from 'react';

import { useIntl } from '~/components/intl';
import Avatar from '~/components/ui/Avatar';
import Text from '~/components/ui/Text';

import ProjectsProfileEditPhoto from './ProjectsProfileEditPhoto';

type Props = Readonly<{
  onChange: (value: string) => void;
  src: string;
}>;

export default function ProjectsProfileEditAvatar({ onChange, src }: Props) {
  const intl = useIntl();
  const [imageSizeExceeded, setImageSizeExceeded] = useState(false);

  return (
    <div className="relative w-full md:w-auto">
      <div className="flex w-full flex-col gap-6">
        <Avatar
          alt="avatar"
          className="h-[120px] w-[120px]"
          size="custom"
          src={src}
        />
        <ProjectsProfileEditPhoto
          hasProfilePhoto={!!src}
          setImageSizeExceeded={setImageSizeExceeded}
          onChange={(imageUrl) => {
            onChange(imageUrl);
          }}
        />
      </div>
      <div className="absolute -bottom-5 left-0 md:-bottom-14">
        {imageSizeExceeded && (
          <Text className="block" color="error" size="body3">
            {intl.formatMessage({
              defaultMessage: 'Please upload a photo smaller than 1 MB',
              description: 'Profile photo size exceed error message',
              id: 'Z4BPbp',
            })}
          </Text>
        )}
      </div>
    </div>
  );
}
