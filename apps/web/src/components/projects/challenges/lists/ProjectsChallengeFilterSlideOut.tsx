import { Fragment } from 'react';
import { RiFilterLine } from 'react-icons/ri';
import { useIntl } from 'react-intl';

import FilterButton from '~/components/common/FilterButton';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '~/components/ui/Accordion';
import CheckboxInput from '~/components/ui/CheckboxInput';
import Divider from '~/components/ui/Divider';
import SlideOutOld from '~/components/ui/SlideOutOld';
import Text from '~/components/ui/Text';

import type { ProjectsChallengeFilter } from './ProjectsChallengeFilterContext';
import {
  useProjectsChallengeFilterContext,
  useProjectsChallengeFilterState,
} from './ProjectsChallengeFilterContext';
import ProjectsSkillRoadmapSelectionInput from '../../skills/form/ProjectsSkillRoadmapSelectionInput';

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
    <AccordionItem value={id}>
      <AccordionTrigger>
        <Text size="body2" weight="medium">
          {longLabel || label}
        </Text>
      </AccordionTrigger>
      <AccordionContent>
        {type === 'checkbox' && (
          <div className="mt-4 flex flex-wrap gap-x-6 gap-y-4">
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
            value={selectedOptions}
            onChange={(newSkills) =>
              setSelectedOptions(newSkills as Array<string>)
            }
          />
        )}
      </AccordionContent>
    </AccordionItem>
  );
}

type Props = Readonly<{
  selected: boolean;
}>;

export default function ProjectsChallengeFilterSlideOut({ selected }: Props) {
  const intl = useIntl();

  const { filters: initialFilters } = useProjectsChallengeFilterContext();

  return (
    <SlideOutOld
      enterFrom="end"
      size="md"
      title={intl.formatMessage({
        defaultMessage: 'Filters',
        description: 'Title of Projects project filter slide-out',
        id: 'DdRaW3',
      })}
      trigger={
        <FilterButton
          icon={RiFilterLine}
          isLabelHidden={true}
          label={intl.formatMessage({
            defaultMessage: 'All filters',
            description: 'Label for All Filters button for projects list',
            id: 'i9ojv3',
          })}
          purpose="button"
          selected={selected}
          size="md"
          tooltip={intl.formatMessage({
            defaultMessage: 'View all filters',
            description: 'Tooltip for All Filters button for projects list',
            id: 'vHNURr',
          })}
        />
      }>
      <div className="flex flex-col">
        <Divider />
        <Accordion
          className="flex flex-col"
          defaultValue={initialFilters.map(({ id }) => id)}
          type="multiple">
          {initialFilters.map((filter) => (
            <Fragment key={filter.id}>
              <FilterSection key={filter.id} {...filter} />
            </Fragment>
          ))}
        </Accordion>
        <Divider />
      </div>
    </SlideOutOld>
  );
}
