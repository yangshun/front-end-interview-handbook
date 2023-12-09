import clsx from 'clsx';
import { useMemo, useState } from 'react';
import { RiArrowDownSLine } from 'react-icons/ri';
import { useIntl } from 'react-intl';

import Button from '~/components/ui/Button';
import CheckboxInput from '~/components/ui/CheckboxInput';
import Divider from '~/components/ui/Divider';
import SlideOut from '~/components/ui/SlideOut';
import Text from '~/components/ui/Text';
import { themeTextSecondaryColor } from '~/components/ui/theme';

import type {
  ProjectsProjectFilter,
  ProjectsProjectFilterKey,
} from './ProjectsProjectFilterContext';
import { ProjectsProjectFilterContext } from './ProjectsProjectFilterContext';
import {
  useProjectsProjectFilterContext,
  useProjectsProjectFilterState,
} from './ProjectsProjectFilterContext';
import ProjectsSkillInput from '../skills/ProjectsSkillInput';

import * as Accordion from '@radix-ui/react-accordion';

function FilterSection({ label, id, options, type }: ProjectsProjectFilter) {
  const [selectedOptions, setSelectedOptions] =
    useProjectsProjectFilterState(id);

  return (
    <Accordion.Item value={id}>
      <Accordion.Trigger className="flex w-full group justify-between">
        <Text size="body2" weight="medium">
          {label}
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
          <ProjectsSkillInput
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

export default function ProjectsProjectFilterSlideOut({
  isShown,
  onClose,
}: Props) {
  const intl = useIntl();
  const {
    filters: initialFilters,
    value: initialSelectedFilters,
    setSelectedFilters: setInitialSelectedFilters,
  } = useProjectsProjectFilterContext();

  const [selectedFilters, setSelectedFilters] = useState<
    Record<ProjectsProjectFilterKey, Array<string>>
  >(initialSelectedFilters);

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
      filters: initialFilters,
      setFilterValue: (
        key: ProjectsProjectFilterKey,
        newValue: Array<string>,
      ) => {
        setSelectedFilters((prev) => ({
          ...prev,
          [key]: newValue,
        }));
      },
      setSelectedFilters,
      value: selectedFilters,
    }),
    [initialFilters, selectedFilters],
  );

  const handleClearAll = () => {
    setSelectedFilters({
      'component-track': [],
      difficulty: [],
      skills: [],
      status: [],
    });
  };

  const handleApply = () => {
    setInitialSelectedFilters(selectedFilters);
    onClose();
  };

  return (
    <ProjectsProjectFilterContext.Provider value={value}>
      <SlideOut
        enterFrom="end"
        isShown={isShown}
        primaryButton={
          <Button
            label={intl.formatMessage({
              defaultMessage: 'Apply',
              description: 'Label for "Apply" button for projects filter',
              id: 'KRHAyD',
            })}
            size="md"
            variant="primary"
            onClick={handleApply}
          />
        }
        secondaryButton={
          <Button
            label={intl.formatMessage({
              defaultMessage: 'Clear all',
              description: 'Label for "Clear all" button for projects filter',
              id: 'Xb4kCD',
            })}
            size="md"
            variant="secondary"
            onClick={handleClearAll}
          />
        }
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
              <>
                <Divider className={clsx('mb-5', index > 0 && 'mt-5')} />
                <FilterSection key={filter.id} {...filter} />
              </>
            ))}
          </Accordion.Root>
          <Divider className="my-5" />
        </div>
      </SlideOut>
    </ProjectsProjectFilterContext.Provider>
  );
}
