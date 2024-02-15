import { Fragment } from 'react';
import { useIntl } from 'react-intl';

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

import type { ProjectsContributionFilter } from './ProjectsContributionFilterContext';
import {
  useProjectsContributionFilterContext,
  useProjectsContributionFilterState,
} from './ProjectsContributionFilterContext';

function FilterSection({
  longLabel,
  label,
  id,
  options,
}: ProjectsContributionFilter) {
  const [selectedOptions, setSelectedOptions] =
    useProjectsContributionFilterState(id);

  return (
    <AccordionItem value={id}>
      <AccordionTrigger>
        <Text size="body2" weight="medium">
          {longLabel || label}
        </Text>
      </AccordionTrigger>
      <AccordionContent>
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
      </AccordionContent>
    </AccordionItem>
  );
}

type Props = Readonly<{
  isShown: boolean;
  onClose: () => void;
}>;

export default function ProjectsContributionFilterSlideOut({
  isShown,
  onClose,
}: Props) {
  const intl = useIntl();
  const { filters: initialFilters } = useProjectsContributionFilterContext();

  return (
    <SlideOut
      enterFrom="end"
      isShown={isShown}
      size="md"
      title={intl.formatMessage({
        defaultMessage: 'Filters',
        description: 'Title of Projects contribution filter slide-out',
        id: '3OlyG+',
      })}
      onClose={onClose}>
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
