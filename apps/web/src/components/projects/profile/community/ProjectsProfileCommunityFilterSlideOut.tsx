import { Fragment } from 'react';
import { RiFilterLine } from 'react-icons/ri';

import FilterButton from '~/components/common/FilterButton';
import { useIntl } from '~/components/intl';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '~/components/ui/Accordion';
import CheckboxInput from '~/components/ui/CheckboxInput';
import Divider from '~/components/ui/Divider';
import SlideOut from '~/components/ui/SlideOut';
import Text from '~/components/ui/Text';

import type { ProjectsProfileCommunityFilter } from './ProjectsProfileCommunityFilterContext';
import {
  useProjectsProfileCommunityFilterContext,
  useProjectsProfileCommunityFilterState,
} from './ProjectsProfileCommunityFilterContext';

function FilterSection({
  longLabel,
  label,
  id,
  options,
}: ProjectsProfileCommunityFilter) {
  const [selectedOptions, setSelectedOptions] =
    useProjectsProfileCommunityFilterState(id);

  return (
    <AccordionItem value={id}>
      <AccordionTrigger>
        <Text size="body2" weight="medium">
          {longLabel || label}
        </Text>
      </AccordionTrigger>
      <AccordionContent>
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
      </AccordionContent>
    </AccordionItem>
  );
}

type Props = Readonly<{
  selected: boolean;
}>;

export default function ProjectProfileCommunityFilterSlideOut({
  selected,
}: Props) {
  const intl = useIntl();
  const { filters: initialFilters } =
    useProjectsProfileCommunityFilterContext();

  return (
    <SlideOut
      enterFrom="end"
      size="md"
      title={intl.formatMessage({
        defaultMessage: 'Filters',
        description: 'Title of Projects contribution filter slide-out',
        id: '3OlyG+',
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
    </SlideOut>
  );
}
