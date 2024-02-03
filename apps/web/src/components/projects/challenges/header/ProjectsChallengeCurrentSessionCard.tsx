import clsx from 'clsx';
import { useState } from 'react';
import {
  RiArrowDownSLine,
  RiStopCircleLine,
  RiTimerLine,
} from 'react-icons/ri';
import { RiArrowRightLine } from 'react-icons/ri';
import { FormattedMessage, useIntl } from 'react-intl';

import Button from '~/components/ui/Button';
import Card from '~/components/ui/Card';
import Dialog from '~/components/ui/Dialog';
import Text from '~/components/ui/Text';
import { themeTextSecondaryColor } from '~/components/ui/theme';
import Tooltip from '~/components/ui/Tooltip';

import { useProjectsChallengeSessionContext } from '../ProjectsChallengeSessionContext';
import type { ProjectsChallengeItem } from '../types';
import ProjectsSkillSelect from '../../skills/ProjectsSkillSelect';
import ProjectsSkillTechStackInput from '../../skills/ProjectsSkillTechStackInput';
import type { ProjectsSkillKey } from '../../skills/types';

import type { ProjectsChallengeSession } from '@prisma/client';

type Props = Readonly<{
  challenge: ProjectsChallengeItem;
  session: ProjectsChallengeSession;
}>;

export default function ProjectsChallengeCurrentProjectSessionCard({
  challenge,
  session,
}: Props) {
  const intl = useIntl();
  const [showEndSessionDialog, setShowEndSessionDialog] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [otherTechStacks, setOtherTechStacks] =
    useState<ReadonlyArray<ProjectsSkillKey> | null>([]);

  const { endSession, isEndSessionLoading } =
    useProjectsChallengeSessionContext();

  const { submitHref, skills, slug } = challenge.metadata;
  const { createdAt } = session;

  const handleEndSession = async () => {
    await endSession(slug);
  };

  const expandButton = (
    <Button
      className={clsx('transition-transform', isExpanded && 'rotate-180')}
      icon={RiArrowDownSLine}
      isLabelHidden={true}
      label={
        isExpanded
          ? intl.formatMessage({
              defaultMessage: 'Collapse',
              description:
                'Label for "Collapse" button on current project session card',
              id: 'n2UNgq',
            })
          : intl.formatMessage({
              defaultMessage: 'More',
              description:
                'Label for "More" button on current project session card',
              id: 'dgTN/f',
            })
      }
      size="xs"
      variant="tertiary"
      onClick={() => setIsExpanded((expanded) => !expanded)}
    />
  );

  return (
    <>
      <Dialog
        isShown={showEndSessionDialog}
        primaryButton={
          <Button
            isDisabled={isEndSessionLoading}
            isLoading={isEndSessionLoading}
            label={intl.formatMessage({
              defaultMessage: 'Confirm',
              description:
                'Label for confirm button on end project session dialog',
              id: 'hFD3sp',
            })}
            variant="danger"
            onClick={async () => {
              await handleEndSession();
              setShowEndSessionDialog(false);
            }}
          />
        }
        secondaryButton={
          <Button
            isDisabled={isEndSessionLoading}
            label={intl.formatMessage({
              defaultMessage: 'Cancel',
              description:
                'Label for cancel end session button on end project session dialog',
              id: '2MMkM0',
            })}
            variant="secondary"
            onClick={() => {
              setShowEndSessionDialog(false);
            }}
          />
        }
        title={intl.formatMessage({
          defaultMessage: 'Confirm End Project Session?',
          description: 'Title for end project session dialog',
          id: 'Y0v9Wp',
        })}
        onClose={() => {
          setShowEndSessionDialog(false);
        }}>
        <Text>
          <FormattedMessage
            defaultMessage="Are you sure you want to terminate this session? You will be able to restart the project anytime."
            description="Content for end project session dialog"
            id="H6Hg+y"
          />
        </Text>
      </Dialog>
      <Card
        className="py-6 pl-6 pr-4"
        classNameOuter="w-full md:w-auto"
        disableSpotlight={true}
        padding={false}
        pattern={false}>
        <div className="flex justify-between md:flex-row flex-col gap-3 w-full">
          <div className="flex flex-col gap-1.5">
            <div className="flex items-center justify-between">
              <Text weight="bold">
                <FormattedMessage
                  defaultMessage="Current project session"
                  description="Title for current project session card"
                  id="AfXYpF"
                />
              </Text>
              <div className="block md:hidden">{expandButton}</div>
            </div>
            <div className={clsx('flex gap-1', themeTextSecondaryColor)}>
              <RiTimerLine className="h-4 w-4" color="inherit" />
              <Text color="inherit" size="body3">
                <FormattedMessage
                  defaultMessage="Since {date}"
                  description="Since date for current project session card"
                  id="ZZIJ0i"
                  values={{
                    date: intl.formatDate(createdAt, {
                      day: 'numeric',
                      month: 'short',
                    }),
                  }}
                />
              </Text>
            </div>
          </div>
          <div className="flex md:gap-2 gap-4">
            <Button
              className="md:inline-flex flex flex-1"
              href={submitHref}
              icon={RiArrowRightLine}
              label={intl.formatMessage({
                defaultMessage: 'Submit',
                description:
                  'Label for "Submit project" button on current project session card',
                id: '8RXTKM',
              })}
              size="xs"
              variant="primary"
            />
            <Tooltip
              className="md:inline-flex flex flex-1"
              label={intl.formatMessage({
                defaultMessage:
                  'You can choose to end a project session if you choose not to work on it anymore. We will stop prompting you to continue the project in the dashboard',
                description:
                  'Tooltip for "End session" button on current project session card',
                id: 'L4W5rT',
              })}
              position="below">
              <Button
                className="md:inline-flex flex flex-1"
                icon={RiStopCircleLine}
                label={intl.formatMessage({
                  defaultMessage: 'End session',
                  description:
                    'Label for "End session" button on current project session card',
                  id: 'WNERnb',
                })}
                size="xs"
                variant="danger"
                onClick={() => {
                  setShowEndSessionDialog(true);
                }}
              />
            </Tooltip>
            <div className="md:block hidden">{expandButton}</div>
          </div>
        </div>
        {isExpanded && (
          <>
            <ProjectsSkillSelect className="mt-6" skills={skills} />
            {/* TODO(projects|skills): Save into session */}
            <ProjectsSkillTechStackInput
              label="Skills"
              value={otherTechStacks ?? []}
              onChange={setOtherTechStacks}
            />
          </>
        )}
      </Card>
    </>
  );
}
