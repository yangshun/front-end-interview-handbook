import { yoeReplacementSchema } from '~/components/projects/misc';

type InitializerValue = Readonly<{
  company: string;
  hasStartedWork: boolean;
  jobTitle: string;
  monthYearExperience: string | undefined;
  title: string;
  yoeReplacement: {
    option: string | undefined;
    otherText: string | undefined;
  };
}>;

type Props = Readonly<{
  company?: string | null;
  currentStatus?: string | null;
  startWorkDate?: Date | null;
  title?: string | null;
}>;

export default function useProjectsProfileExperienceValueInitializer(
  initialValues: Props,
): InitializerValue {
  const hasStartedWork = initialValues?.currentStatus === null;

  return {
    company: initialValues?.company ?? '',
    hasStartedWork,
    jobTitle: hasStartedWork ? initialValues?.title ?? '' : '',
    monthYearExperience: initialValues?.startWorkDate
      ? `${initialValues.startWorkDate.toLocaleDateString(undefined, {
          month: '2-digit',
        })}/${initialValues.startWorkDate.getFullYear()}`
      : '',
    title: hasStartedWork ? '' : initialValues?.title ?? '',
    yoeReplacement: {
      option: yoeReplacementSchema
        .catch(() => 'others' as const)
        .parse(initialValues?.currentStatus),
      otherText: !yoeReplacementSchema.safeParse(initialValues?.currentStatus)
        .success
        ? initialValues?.currentStatus ?? undefined
        : undefined,
    },
  };
}
