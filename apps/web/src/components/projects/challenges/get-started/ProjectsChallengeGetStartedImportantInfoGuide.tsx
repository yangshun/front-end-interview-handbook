import { FormattedMessage } from '~/components/intl';
import ProjectsChallengeGetStartedImportantInfoGuideBanner from '~/components/projects/challenges/get-started/ProjectsChallengeGetStartedImportantInfoGuideBanner';
import Text from '~/components/ui/Text';

export default function ProjectsChallengeGetStartedImportantInfoGuide() {
  return (
    <div className="flex flex-col gap-4">
      <Text color="secondary" size="body2">
        <FormattedMessage
          defaultMessage="Find official guides, reference code from top submissions, and use our discussion forum to ask questions."
          description="Description for Important Info Guide section on Before You Get Started dialog"
          id="iHLvVo"
        />
      </Text>
      <ProjectsChallengeGetStartedImportantInfoGuideBanner />
    </div>
  );
}
