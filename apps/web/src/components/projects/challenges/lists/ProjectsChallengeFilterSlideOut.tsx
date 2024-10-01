import { Fragment, useEffect, useMemo, useState } from 'react';
import { RiFilterLine } from 'react-icons/ri';

import FilterButton from '~/components/common/FilterButton';
import { useIntl } from '~/components/intl';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '~/components/ui/Accordion';
import Button from '~/components/ui/Button';
import CheckboxInput from '~/components/ui/CheckboxInput';
import Divider from '~/components/ui/Divider';
import SlideOut from '~/components/ui/SlideOut';
import Text from '~/components/ui/Text';

import type {
  ProjectsChallengeFilterKey,
  ProjectsChallengeFilterOption,
} from './ProjectsChallengeFilterContext';
import {
  ProjectsChallengeFilterContext,
  useProjectsChallengeFilterContext,
  useProjectsChallengeFilterState,
} from './ProjectsChallengeFilterContext';
import { getProjectsRoadmapSkillsInputAttributes } from '../../skills/form/ProjectsSkillListInputSchema';
import ProjectsSkillRoadmapSelectionInput from '../../skills/form/ProjectsSkillRoadmapSelectionInput';

function FilterSection({
  longLabel,
  label,
  id,
  options,
  type,
}: ProjectsChallengeFilterOption) {
  const [selectedOptions, setSelectedOptions] =
    useProjectsChallengeFilterState(id);
  const intl = useIntl();
  const roadmapSkillsAttrs = getProjectsRoadmapSkillsInputAttributes(
    intl,
    false,
  );

  return (
    <AccordionItem value={id}>
      <AccordionTrigger>
        <Text size="body2" weight="medium">
          {longLabel || label}
        </Text>
      </AccordionTrigger>
      <AccordionContent>
        {type === 'checkbox' && (
          <div className="flex flex-wrap gap-x-6 gap-y-4">
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
            description={roadmapSkillsAttrs.description}
            isLabelHidden={true}
            label={label}
            placeholder={roadmapSkillsAttrs.placeholder}
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
  isViewerPremium: boolean;
  selected: boolean;
}>;

export default function ProjectsChallengeFilterSlideOut({
  isViewerPremium,
  selected,
}: Props) {
  const intl = useIntl();

  const {
    filterItems: initialFilters,
    value: initialSelectedFilters,
    getArrayTypeSearchParams,
    getStringTypeSearchParams,
    updateSearchParams,
    setSelectedFilters: setInitialSelectedFilters,
  } = useProjectsChallengeFilterContext();
  const [selectedFilters, setSelectedFilters] = useState<
    Record<ProjectsChallengeFilterKey, Array<string>>
  >(initialSelectedFilters);
  const [isFiltersShown, setIsFiltersShown] = useState(false);

  const value = useMemo(
    () => ({
      clearAll: () => {
        setSelectedFilters({
          'component-track': [],
          difficulty: [],
          skills: [],
          status: [],
        });
      },
      filterItems: initialFilters,
      getArrayTypeSearchParams,
      getStringTypeSearchParams,
      setFilterValue: (
        key: ProjectsChallengeFilterKey,
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

  const onApplyFilter = () => {
    setInitialSelectedFilters(selectedFilters);
    setIsFiltersShown(false);
  };

  const clearAll = () => {
    setSelectedFilters({
      'component-track': [],
      difficulty: [],
      skills: [],
      status: [],
    });
  };

  const onClearAllFilter = () => {
    clearAll();
  };

  useEffect(() => {
    setSelectedFilters(initialSelectedFilters);
  }, [initialSelectedFilters]);

  return (
    <ProjectsChallengeFilterContext.Provider value={value}>
      <SlideOut
        enterFrom="end"
        isShown={isFiltersShown}
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
            onClick={() => {
              setIsFiltersShown(true);
            }}
          />
        }
        onClose={() => {
          setIsFiltersShown(false);
        }}>
        <div className="flex flex-col">
          <Divider color="emphasized" />
          <Accordion
            className="flex flex-col"
            defaultValue={initialFilters.map(({ id }) => id)}
            type="multiple">
            {initialFilters
              .filter((filter) => (isViewerPremium ? true : !filter.premium))
              .map((filter) => (
                <Fragment key={filter.id}>
                  <FilterSection key={filter.id} {...filter} />
                </Fragment>
              ))}
          </Accordion>
          <Divider />
        </div>
        <Divider />
        <div className="my-5 flex justify-end gap-3">
          <Button
            label={intl.formatMessage({
              defaultMessage: 'Clear all',
              description: 'Label for clear all button',
              id: 'LEh5WZ',
            })}
            size="md"
            variant="secondary"
            onClick={onClearAllFilter}
          />
          <Button
            label={intl.formatMessage({
              defaultMessage: 'Apply',
              description: 'Label for apply button',
              id: 'aJWJvF',
            })}
            size="md"
            variant="primary"
            onClick={onApplyFilter}
          />
        </div>
      </SlideOut>
    </ProjectsChallengeFilterContext.Provider>
  );
}
