import { FormattedMessage } from 'react-intl';

import Text from '~/components/ui/Text';

import ProjectsChallengeDownloadStarterFilesButton from '../assets/ProjectsChallengeDownloadStarterFilesButton';

type Props = Readonly<{
  slug: string;
}>;

export default function ProjectsChallengeGetStartedDownloadStarterFiles({
  slug,
}: Props) {
  return (
    <div className="flex flex-col items-start gap-4">
      <Text color="secondary" size="body2">
        <FormattedMessage
          defaultMessage="Includes assets, JPG images of the design files, and a basic style guide. There's also a README to help you get started."
          description="Description for Download Starter Files content section on Before You Get Started dialog"
          id="ynLgE+"
        />
      </Text>
      <ProjectsChallengeDownloadStarterFilesButton size="md" slug={slug} />
    </div>
  );
}
