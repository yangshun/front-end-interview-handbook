import ProjectsChallengeHowItWorksCard from '~/components/projects/challenges/header/works/ProjectsChallengeHowItWorksCard';
import Text from '~/components/ui/Text';

export default function ProjectsChallengeHowItWorksBriefCard() {
  return (
    <ProjectsChallengeHowItWorksCard>
      <div className="flex flex-col">
        <Text size="body2">Project Brief</Text>
        <Text className="mt-3 block" size="body3">
          Objective
        </Text>
        <Text className="text-2xs mt-2 block" color="secondary" size="inherit">
          The Newsletter Section aims to seamlessly capture user interest and
          encourage them to subscribe to our newsletters. This section serves as
          the initial point of interaction, requiring an intuitive and engaging
          design to maximize conversions.
        </Text>
        <Text className="mt-3 block" size="body3">
          Key Features
        </Text>
      </div>
    </ProjectsChallengeHowItWorksCard>
  );
}
