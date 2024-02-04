import clsx from 'clsx';
import { Fragment } from 'react';
import { RiArrowDownSLine } from 'react-icons/ri';
import { useIntl } from 'react-intl';

import CheckboxInput from '~/components/ui/CheckboxInput';
import Divider from '~/components/ui/Divider';
import SlideOut from '~/components/ui/SlideOut';
import Text from '~/components/ui/Text';
import { themeTextSecondaryColor } from '~/components/ui/theme';

import type { ProjectsChallengeFilter } from './ProjectsChallengeFilterContext';
import {
  useProjectsChallengeFilterContext,
  useProjectsChallengeFilterState,
} from './ProjectsChallengeFilterContext';
import ProjectsSkillRoadmapSelectionInput from '../../skills/form/ProjectsSkillRoadmapSelectionInput';

import * as Accordion from '@radix-ui/react-accordion';

function FilterSection({
  longLabel,
  label,
  id,
  options,
  type,
}: ProjectsChallengeFilter) {
  const [selectedOptions, setSelectedOptions] =
    useProjectsChallengeFilterState(id);

  return (
    <Accordion.Item value={id}>
      <Accordion.Trigger className="flex w-full group justify-between">
        <Text size="body2" weight="medium">
          {longLabel || label}
        </Text>
        <RiArrowDownSLine
          className={clsx(
            'h-5 w-5 transition-transform group-data-[state=open]:rotate-180',
            themeTextSecondaryColor,
          )}
        />
      </Accordion.Trigger>
      <Accordion.Content>
        {type === 'checkbox' && (
          <div className="flex flex-wrap gap-x-6 gap-y-4 mt-4">
            {options.map((option) => (
              <CheckboxInput
                key={option.value}
                label={option.label}
                value={selectedOptions.includes(option.value)}
                onChange={(newValue) => {
                  if (newValue) {
                    setSelectedOptions([...selectedOptions, option.value]);
                  } else {
                    setSelectedOptions(
                      selectedOptions.filter(
                        (selectedOption) => selectedOption !== option.value,
                      ),
                    );
                  }
                }}
              />
            ))}
          </div>
        )}
        {type === 'skill-selection' && (
          <ProjectsSkillRoadmapSelectionInput
            className="mt-2"
            isLabelHidden={true}
            label={label}
          />
        )}
      </Accordion.Content>
    </Accordion.Item>
  );
}

type Props = Readonly<{
  isShown: boolean;
  onClose: () => void;
}>;

export default function ProjectsChallengeFilterSlideOut({
  isShown,
  onClose,
}: Props) {
  const intl = useIntl();
  const { filters: initialFilters } = useProjectsChallengeFilterContext();

  return (
    <SlideOut
      enterFrom="end"
      isShown={isShown}
      size="md"
      title={intl.formatMessage({
        defaultMessage: 'Filters',
        description: 'Title of Projects project filter slide-out',
        id: 'DdRaW3',
      })}
      onClose={onClose}>
      <div className="flex flex-col">
        <Accordion.Root
          className="flex flex-col"
          defaultValue={initialFilters.map(({ id }) => id)}
          type="multiple">
          {initialFilters.map((filter, index) => (
            <Fragment key={filter.id}>
              <Divider className={clsx('mb-5', index > 0 && 'mt-5')} />
              <FilterSection key={filter.id} {...filter} />
            </Fragment>
          ))}
        </Accordion.Root>
        <Divider className="my-5" />
      </div>
    </SlideOut>
  );
}
