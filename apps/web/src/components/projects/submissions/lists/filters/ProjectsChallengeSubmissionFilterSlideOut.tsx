import clsx from 'clsx';
import { Fragment, useEffect, useMemo, useState } from 'react';
import { RiFilterLine, RiInformationLine } from 'react-icons/ri';

import { useIntl } from '~/components/intl';
import {
  getProjectsRoadmapSkillsInputAttributes,
  getProjectsTechStackInputAttributes,
} from '~/components/projects/skills/form/ProjectsSkillListInputSchema';
import ProjectsSkillRoadmapSelectionInput from '~/components/projects/skills/form/ProjectsSkillRoadmapSelectionInput';
import ProjectsSkillTechStackInput from '~/components/projects/skills/form/ProjectsSkillTechStackInput';
import type {
  ProjectsChallengeSubmissionFilterKey,
  ProjectsChallengeSubmissionFilterOption,
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
import Button from '~/components/ui/Button';
import CheckboxInput from '~/components/ui/CheckboxInput';
import Divider from '~/components/ui/Divider';
import FilterButton from '~/components/ui/FilterButton/FilterButton';
import SlideOut from '~/components/ui/SlideOut';
import Text from '~/components/ui/Text';
import { themeTextFaintColor } from '~/components/ui/theme';
import Tooltip from '~/components/ui/Tooltip';

function FilterSection({
  id,
  label,
  longLabel,
  options,
  tooltip,
  type,
}: ProjectsChallengeSubmissionFilterOption) {
  const [selectedOptions, setSelectedOptions] =
    useProjectsChallengeSubmissionFilterState(id);
  const intl = useIntl();
  const roadmapSkillsAttrs = getProjectsRoadmapSkillsInputAttributes(
    intl,
    false,
  );
  const techStackSkillsAttrs = getProjectsTechStackInputAttributes(intl, false);

  const filterLabel = (
    <div className="flex items-center gap-2">
      <Text size="body2" weight="medium">
        {longLabel || label}
      </Text>
      {tooltip && (
        <Tooltip label={tooltip}>
          <RiInformationLine className={clsx('size-4', themeTextFaintColor)} />
        </Tooltip>
      )}
    </div>
  );

  return (
    <AccordionItem value={id}>
      <AccordionTrigger>{filterLabel}</AccordionTrigger>
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
            onChange={(value) => {
              const newValue = [...(value ?? [])];

              setSelectedOptions(newValue);
            }}
          />
        )}
        {type === 'tech-stack-selection' && (
          <ProjectsSkillTechStackInput
            description={techStackSkillsAttrs.description}
            isLabelHidden={true}
            label={label}
            placeholder={techStackSkillsAttrs.placeholder}
            required={false}
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
  isViewerPremium: boolean;
  selected: boolean;
}>;

export default function ProjectsChallengeSubmissionFilterSlideOut({
  isViewerPremium,
  selected,
}: Props) {
  const intl = useIntl();
  const [isFiltersShown, setIsFiltersShown] = useState(false);

  const {
    filters: initialFilters,
    getArrayTypeSearchParams,
    getStringTypeSearchParams,
    setSelectedFilters: setInitialSelectedFilters,
    updateSearchParams,
    value: initialSelectedFilters,
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
          'roadmap-skills': [],
          status: [],
          'tech-stack-skills': [],
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

  const clearAll = () => {
    setSelectedFilters({
      'component-track': [],
      difficulty: [],
      experience: [],
      'roadmap-skills': [],
      status: [],
      'tech-stack-skills': [],
    });
  };

  const onApplyFilter = () => {
    setInitialSelectedFilters(selectedFilters);
    setIsFiltersShown(false);
  };

  const onClearAllFilter = () => {
    clearAll();
  };

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
                  <FilterSection {...filter} />
                </Fragment>
              ))}
          </Accordion>
          <Divider />
          <div
            className={clsx(
              'flex flex-col justify-end gap-5 md:flex-row md:gap-3',
              'my-5',
            )}>
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
        </div>
      </SlideOut>
    </ProjectsChallengeSubmissionFilterContext.Provider>
  );
}
