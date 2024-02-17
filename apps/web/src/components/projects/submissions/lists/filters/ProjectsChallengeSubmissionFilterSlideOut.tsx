import { Fragment } from 'react';
import { useForm } from 'react-hook-form';
import { useIntl } from 'react-intl';

import ProjectsSkillRoadmapSelectionInput from '~/components/projects/skills/form/ProjectsSkillRoadmapSelectionInput';
import type { ProjectsChallengeSubmissionFilter } from '~/components/projects/submissions/lists/filters/ProjectsChallengeSubmissionFilterContext';
import type { ProjectsChallengeSubmissionFilterValues } from '~/components/projects/submissions/lists/filters/ProjectsChallengeSubmissionFilterContext';
import {
  useProjectsChallengeFilterSchema,
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

import ProjectsChallengeSubmissionFilterRoadmapField from './ProjectsChallengeSubmissionFilterRoadmapField';
import ProjectsChallengeSubmissionFilterTechStackField from './ProjectsChallengeSubmissionFilterTechStackField';
import type { ProjectsSkillKey } from '../../../skills/types';

import { zodResolver } from '@hookform/resolvers/zod';

function FilterSection({
  longLabel,
  label,
  id,
  options,
  type,
}: ProjectsChallengeSubmissionFilter) {
  const [selectedOptions, setSelectedOptions] =
    useProjectsChallengeSubmissionFilterState(id);

  return (
    <AccordionItem value={id}>
      <AccordionTrigger>
        <Text size="body2" weight="medium">
          {longLabel || label}
        </Text>
      </AccordionTrigger>
      <AccordionContent>
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
            // TODO(projects|skills): pass in values.
            value={[]}
            onChange={() => {}}
          />
        )}
      </AccordionContent>
    </AccordionItem>
  );
}

type Props = Readonly<{
  isShown: boolean;
  onChangeRoadmapSkills: (value: Array<ProjectsSkillKey>) => void;
  onChangeTechSkills: (value: Array<ProjectsSkillKey>) => void;
  onClose: () => void;
}>;

export default function ProjectsChallengeSubmissionFilterSlideOut({
  isShown,
  onClose,
  onChangeRoadmapSkills,
  onChangeTechSkills,
}: Props) {
  const intl = useIntl();
  const { filters: initialFilters } =
    useProjectsChallengeSubmissionFilterContext();

  const defaultValues = Object.freeze({
    deploymentUrls: [],
    implementation: '',
    repositoryUrl: '',
    roadmapSkills: [],
    summary: '',
    techStackSkills: [],
    title: '',
  });

  const projectsChallengeFilterSchema = useProjectsChallengeFilterSchema();

  const formMethods = useForm<ProjectsChallengeSubmissionFilterValues>({
    defaultValues,
    mode: 'all',
    resolver: zodResolver(projectsChallengeFilterSchema),
  });

  const { control } = formMethods;

  return (
    <SlideOut
      enterFrom="end"
      isShown={isShown}
      size="md"
      title={intl.formatMessage({
        defaultMessage: 'Filters',
        description: 'Title of Projects challenge submission filter slide-out',
        id: 'aSyD6u',
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
              <FilterSection {...filter} />
            </Fragment>
          ))}
        </Accordion>
        <Divider className="mb-5" />
        <Fragment key="roadmap-skills">
          <ProjectsChallengeSubmissionFilterTechStackField
            control={control}
            onChange={onChangeTechSkills}
          />
        </Fragment>
        <Divider className="my-5" />
        <Fragment key="roadmap-skills">
          <ProjectsChallengeSubmissionFilterRoadmapField
            control={control}
            onChange={onChangeRoadmapSkills}
          />
        </Fragment>
        <Divider className="my-5" />
      </div>
    </SlideOut>
  );
}
