import { RiCodeSSlashLine } from 'react-icons/ri';
import { FormattedMessage, useIntl } from 'react-intl';

import Button from '~/components/ui/Button';
import Text from '~/components/ui/Text';

type Props = Readonly<{
  starterFilesHref: string;
}>;

export default function DownloadStarterFiles({ starterFilesHref }: Props) {
  const intl = useIntl();

  return (
    <div className="flex flex-col gap-4 items-start">
      <Text color="secondary" size="body2">
        <FormattedMessage
          defaultMessage="Includes assets, JPG images of the design files, and a basic style guide. There's also a README to help you get started."
          description="Description for Download Starter Files content section on Before You Get Started dialog"
          id="ynLgE+"
        />
      </Text>
      <Button
        addonPosition="start"
        href={starterFilesHref}
        icon={RiCodeSSlashLine}
        label={intl.formatMessage({
          defaultMessage: 'Download starter code + image assets',
          description:
            'Label for "Download starter code + image assets" button on Projects project page',
          id: 'VElW3O',
        })}
        size="md"
        variant="primary"
      />
    </div>
  );
}
