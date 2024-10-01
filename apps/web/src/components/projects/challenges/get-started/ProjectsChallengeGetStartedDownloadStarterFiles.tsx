import { FormattedMessage } from '~/components/intl';
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
          defaultMessage="Includes starter code, image assets, images of the designs, along with a README to help you get started."
          description="Help text for Download starter files button for projects"
          id="JLYqCO"
        />
      </Text>
      <ProjectsChallengeDownloadStarterFilesButton size="md" slug={slug} />
    </div>
  );
}
