import clsx from 'clsx';
import { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { FormattedMessage, useIntl } from 'react-intl';

import useProjectsMotivationReasonOptions from '~/components/projects/hooks/useProjectsMotivationReasonOptions';
import ProjectsProfileMotivationReasonList from '~/components/projects/profile/edit/ProjectsProfileMotivationReasonList';
import type { ProjectsMotivationReasonType } from '~/components/projects/types';
import type { ProjectsProfileEditFormValues } from '~/components/projects/types';
import Button from '~/components/ui/Button';
import Heading from '~/components/ui/Heading';
import Text from '~/components/ui/Text';

export default function ProjectsProfileMotivationSection() {
  const intl = useIntl();
  const {
    watch,
    setValue,
    formState: { errors },
  } = useFormContext<ProjectsProfileEditFormValues>();
  const { reasonOptions } = useProjectsMotivationReasonOptions((chunks) => (
    <Text display="inline" size="inherit" weight="bold">
      {chunks}
    </Text>
  ));
  const [reasonType, setReasonType] =
    useState<ProjectsMotivationReasonType>('primary');

  const primaryType = watch('motivationReasons.primary.type');
  const secondaryType = watch('motivationReasons.secondary.type');

  useEffect(() => {
    if (
      (primaryType === secondaryType && primaryType !== 'other') ||
      (primaryType === null && secondaryType)
    ) {
      setValue(
        'motivationReasons.secondary',
        {
          otherValue: '',
          type: null,
        },
        {
          shouldDirty: true,
        },
      );
    }
  }, [primaryType, setValue, secondaryType]);

  useEffect(() => {
    if (errors.motivationReasons?.primary) {
      setReasonType('primary');
    }
  }, [errors.motivationReasons?.primary]);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-6 justify-between flex-wrap">
        <Heading level="heading6">
          <FormattedMessage
            defaultMessage="Motivation for joining"
            description="Title of motivation for joining section of projects profile edit page"
            id="k+36tk"
          />
        </Heading>
        <div className="flex md:ml-0 -ml-4">
          <Button
            className={clsx(reasonType === 'primary' && '!text-brand')}
            label={intl.formatMessage({
              defaultMessage: 'Primary reason',
              description:
                'Label for "Primary reason" button on Sign Up Reason section of Projects onboarding page',
              id: 'LxlUHa',
            })}
            size="md"
            variant="tertiary"
            onClick={() => {
              setReasonType('primary');
            }}
          />
          <Button
            className={clsx(reasonType === 'secondary' && '!text-brand')}
            isDisabled={primaryType === null}
            label={intl.formatMessage({
              defaultMessage: 'Secondary reason',
              description:
                'Label for "Secondary reason" button on Sign Up Reason section of Projects onboarding page',
              id: 'hdlJES',
            })}
            size="md"
            variant="tertiary"
            onClick={() => {
              setReasonType('secondary');
            }}
          />
        </div>
      </div>
      <ProjectsProfileMotivationReasonList
        key={reasonType}
        name={reasonType}
        previousValue={reasonType === 'secondary' ? primaryType : undefined}
        reasonOptions={reasonOptions}
        onChange={(value) => {
          if (reasonType === 'primary' && value !== 'other' && value) {
            setReasonType('secondary');
          }
        }}
      />
    </div>
  );
}
