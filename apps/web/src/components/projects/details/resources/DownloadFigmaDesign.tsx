import { RiLock2Line, RiSparklingLine } from 'react-icons/ri';
import { FormattedMessage, useIntl } from 'react-intl';

import Anchor from '~/components/ui/Anchor';
import Button from '~/components/ui/Button';
import Text from '~/components/ui/Text';

type Props = Readonly<{
  isUserPremium: boolean;
  onDownloadClick: () => void;
}>;

export default function DownloadFigmaDesign({
  isUserPremium,
  onDownloadClick,
}: Props) {
  const intl = useIntl();

  return (
    <div className="flex flex-col items-start gap-4 mt-6">
      <Text color="secondary" size="body2">
        <FormattedMessage
          defaultMessage="Includes a hi-fidelity design and interaction specifications for this project."
          description="Description for Download Figma Design content section on Before You Get Started dialog"
          id="+SiVOr"
        />
      </Text>
      <Button
        addonPosition="start"
        icon={isUserPremium ? RiSparklingLine : RiLock2Line}
        label={intl.formatMessage({
          defaultMessage: 'Download Figma design',
          description:
            'Label for "Download Figma design" button on Projects project page',
          id: '7jhWHe',
        })}
        size="md"
        variant={isUserPremium ? 'primary' : 'special'}
        onClick={onDownloadClick}
      />
      {!isUserPremium && (
        <div className="flex flex-col">
          <Text color="secondary" size="body3">
            <FormattedMessage
              defaultMessage="Premium is required to unlock both figma files and how-to guides for a project. Learn how to built accurately and work with production-level specifications."
              description="Premium required label for Download Figma Design content section on Before You Get Started dialog"
              id="NONBB3"
            />
          </Text>
          <Anchor href="#">
            <Text color="inherit" size="body3">
              <FormattedMessage
                defaultMessage="View plans"
                description="View plans link for Download Figma Design content section on Before You Get Started dialog"
                id="avFFbN"
              />
            </Text>
          </Anchor>
        </div>
      )}
    </div>
  );
}
