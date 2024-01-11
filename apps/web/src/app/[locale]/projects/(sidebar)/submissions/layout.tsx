import ProjectsChallengeSubmissionListLayout from '~/components/projects/submissions/ProjectsChallengeSubmissionListLayout';

type Props = Readonly<{
  children: React.ReactNode;
}>;

export default async function Layout({ children }: Props) {
  return (
    <ProjectsChallengeSubmissionListLayout>
      {children}
    </ProjectsChallengeSubmissionListLayout>
  );
}
