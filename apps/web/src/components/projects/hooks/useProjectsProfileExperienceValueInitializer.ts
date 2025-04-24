import type { z } from 'zod';

import { yoeReplacementSchema } from '~/components/projects/misc';

type YoeReplacement =
  | Readonly<{
      option: Exclude<z.infer<typeof yoeReplacementSchema>, 'others'>;
      otherText?: string;
    }>
  | Readonly<{ option: 'others'; otherText: string }>;

type BaseInitializer = Readonly<{
  company?: string;
  yoeReplacement?: YoeReplacement;
}>;

type NotStartedWork = Readonly<
  BaseInitializer & {
    hasStartedWork: false;
    jobTitle?: string;
    monthYearExperience?: string;
    title: string;
    yoeReplacement: YoeReplacement;
  }
>;

type StartedWork = Readonly<
  BaseInitializer & {
    hasStartedWork: true;
    jobTitle: string;
    monthYearExperience: string;
    title?: string;
  }
>;

type InitializerValue = NotStartedWork | StartedWork;

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

  if (hasStartedWork) {
    return {
      company: initialValues?.company ?? undefined,
      hasStartedWork: true,
      jobTitle: initialValues?.title ?? '',
      monthYearExperience: initialValues?.startWorkDate
        ? `${initialValues.startWorkDate.toLocaleDateString(undefined, {
            month: '2-digit',
          })}/${initialValues.startWorkDate.getFullYear()}`
        : '',
    };
  }

  return {
    hasStartedWork: false as const,
    jobTitle: '',
    title: initialValues?.title ?? '',
    yoeReplacement: yoeReplacementSchema
      .exclude(['others'])
      .safeParse(initialValues?.currentStatus).success
      ? {
          option: yoeReplacementSchema
            .exclude(['others'])
            .parse(initialValues?.currentStatus),
        }
      : {
          option: 'others',
          otherText: initialValues?.currentStatus ?? '',
        },
  };
}
