import ProjectsChallengeHowItWorksCard from '~/components/projects/challenges/header/works/ProjectsChallengeHowItWorksCard';
import Text from '~/components/ui/Text';

export default function ProjectsChallengeHowItWorksBriefCard() {
  return (
    <ProjectsChallengeHowItWorksCard>
      <div className="flex flex-col gap-4">
        <Text size="body2">Project Brief</Text>
        <Text size="body3">Objective</Text>
        <Text className="!text-2xs" color="secondary">
          The Newsletter Signup Section aims to seamlessly capture user interest
          and encourage them to subscribe to our newsletters. This section
          serves as the initial point of interaction, requiring an intuitive and
          engaging design to maximize conversions.
        </Text>
        <Text size="body3">Key Features</Text>
      </div>
    </ProjectsChallengeHowItWorksCard>
  );
}
