import { Fragment, useEffect, useMemo, useState } from 'react';
import { RiFilterLine } from 'react-icons/ri';
import { useIntl } from 'react-intl';

import FilterButton from '~/components/common/FilterButton';
import ProjectsSkillRoadmapSelectionInput from '~/components/projects/skills/form/ProjectsSkillRoadmapSelectionInput';
import ProjectsSkillTechStackInput from '~/components/projects/skills/form/ProjectsSkillTechStackInput';
import type {
  ProjectsChallengeSubmissionFilter,
  ProjectsChallengeSubmissionFilterKey,
} from '~/components/projects/submissions/lists/filters/ProjectsChallengeSubmissionFilterContext';
import {
  ProjectsChallengeSubmissionFilterContext,
  useProjectsChallengeSubmissionFilterContext,
  useProjectsChallengeSubmissionFilterState,
} from '~/components/projects/submissions/lists/filters/ProjectsChallengeSubmissionFilterContext';
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

function FilterSection({
  longLabel,
  label,
  id,
  options,
  type,
}: ProjectsChallengeSubmissionFilter) {
  const [selectedOptions, setSelectedOptions] =
    useProjectsChallengeSubmissionFilterState(id);

  return type === 'tech-stack-selection' ? (
    <div className="flex flex-col gap-8 py-5">
      <Text size="body2" weight="medium">
        {longLabel || label}
      </Text>
      <ProjectsSkillTechStackInput
        isLabelHidden={true}
        label={label}
        required={false}
        value={selectedOptions}
        onChange={(value) => {
          const newValue = [...(value ?? [])];

          setSelectedOptions(newValue);
        }}
      />
    </div>
  ) : (
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
            onChange={(value) => {
              const newValue = [...(value ?? [])];

              setSelectedOptions(newValue);
            }}
          />
        )}
      </AccordionContent>
    </AccordionItem>
  );
}

type Props = Readonly<{
  selected: boolean;
}>;

export default function ProjectsChallengeSubmissionFilterSlideOut({
  selected,
}: Props) {
  const intl = useIntl();
  const [isFiltersShown, setIsFiltersShown] = useState(false);

  const {
    filters: initialFilters,
    value: initialSelectedFilters,
    getArrayTypeSearchParams,
    getStringTypeSearchParams,
    updateSearchParams,
    setSelectedFilters: setInitialSelectedFilters,
  } = useProjectsChallengeSubmissionFilterContext();
  const [selectedFilters, setSelectedFilters] = useState<
    Record<ProjectsChallengeSubmissionFilterKey, Array<string>>
  >(initialSelectedFilters);

  useEffect(() => {
    setSelectedFilters(initialSelectedFilters);
  }, [initialSelectedFilters]);

  const value = useMemo(
    () => ({
      clearAll: () => {
        setSelectedFilters({
          'component-track': [],
          difficulty: [],
          experience: [],
          roadmapSkills: [],
          status: [],
          techStackSkills: [],
        });
      },
      filters: initialFilters,
      getArrayTypeSearchParams,
      getStringTypeSearchParams,
      setFilterValue: (
        key: ProjectsChallengeSubmissionFilterKey,
        newValue: Array<string>,
      ) => {
        setSelectedFilters((prev) => ({
          ...prev,
          [key]: newValue,
        }));
      },
      setSelectedFilters,
      updateSearchParams,
      value: selectedFilters,
    }),
    [
      initialFilters,
      selectedFilters,
      getArrayTypeSearchParams,
      getStringTypeSearchParams,
      updateSearchParams,
    ],
  );

  // Set the filters to context only when the SlideOut is closed
  useEffect(() => {
    if (!isFiltersShown) {
      setInitialSelectedFilters(selectedFilters);
    }
  }, [isFiltersShown, selectedFilters, setInitialSelectedFilters]);

  return (
    <ProjectsChallengeSubmissionFilterContext.Provider value={value}>
      <SlideOut
        enterFrom="end"
        isShown={isFiltersShown}
        size="md"
        title={intl.formatMessage({
          defaultMessage: 'Filters',
          description:
            'Title of Projects challenge submission filter slide-out',
          id: 'aSyD6u',
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
            onClick={() => {
              setIsFiltersShown(true);
            }}
          />
        }
        onClose={() => {
          setIsFiltersShown(false);
        }}>
        <div className="flex flex-col">
          <Divider />
          <Accordion
            className="flex flex-col"
            defaultValue={initialFilters.map(({ id }) => id)}
            type="multiple">
            {initialFilters.map((filter) => (
              <Fragment key={filter.id}>
                <FilterSection {...filter} />
              </Fragment>
            ))}
          </Accordion>
        </div>
      </SlideOut>
    </ProjectsChallengeSubmissionFilterContext.Provider>
  );
}
