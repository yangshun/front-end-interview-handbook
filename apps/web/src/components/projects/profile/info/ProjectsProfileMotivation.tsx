import clsx from 'clsx';

import { useIntl } from '~/components/intl';
import useProjectsMotivationReasonOptions from '~/components/projects/hooks/useProjectsMotivationReasonOptions';
import ProjectsProfileInfoSectionLayout from '~/components/projects/profile/info/ProjectsProfileInfoSectionLayout';
import Text from '~/components/ui/Text';
import { themeBackgroundElementEmphasizedStateColor } from '~/components/ui/theme';

function Motivation({ value }: Readonly<{ value: string }>) {
  const reasons = useProjectsMotivationReasonOptions((chunks) => (
    <span>{chunks}</span>
  ));

  const reason = reasons.find(({ id }) => id === value);

  return (
    <Text color="secondary" size="body3">
      {/* Defaults to manual value. */}
      {reason?.label ?? value}
    </Text>
  );
}

export default function ProjectsProfileMotivation({
  motivations,
}: {
  motivations: ReadonlyArray<string>;
}) {
  const intl = useIntl();

  return (
    <ProjectsProfileInfoSectionLayout
      heading={intl.formatMessage({
        defaultMessage: 'Motivations for joining',
        description: 'Projects profile motivation for joining section title',
        id: 'wUCEFX',
      })}>
      <div className="flex flex-wrap gap-2">
        {motivations.map((motivation, index) => (
          <div
            key={motivation}
            className={clsx(
              'inline-flex justify-center gap-1',
              'rounded-full px-3 py-0.5',
              themeBackgroundElementEmphasizedStateColor,
            )}>
            <Text color="active" size="body3">
              {index + 1}.
            </Text>
            <Motivation value={motivation} />
          </div>
        ))}
      </div>
    </ProjectsProfileInfoSectionLayout>
  );
}
