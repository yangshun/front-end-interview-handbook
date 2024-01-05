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

import { useProjectsProjectSessionContext } from '../ProjectsProjectSessionContext';
import type { ProjectsProjectItem } from '../types';
import ProjectsOtherTechStackInput from '../../skills/ProjectsOtherTechStackInput';
import ProjectsSkillsSelect from '../../skills/ProjectsSkillsSelect';

import type { ProjectsProjectSession } from '@prisma/client';

type Props = Readonly<{
  project: ProjectsProjectItem;
  session: ProjectsProjectSession;
}>;

export default function ProjectsProjectCurrentProjectSessionCard({
  project,
  session,
}: Props) {
  const intl = useIntl();
  const [showEndSessionDialog, setShowEndSessionDialog] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [otherTechStacks, setOtherTechStacks] = useState<Array<string>>([]);

  const { endSession } = useProjectsProjectSessionContext();

  const { submitHref, skills, slug } = project;
  const { createdAt } = session;

  const handleEndSession = async () => {
    await endSession(slug);
  };

  return (
    <>
      <Dialog
        isShown={showEndSessionDialog}
        primaryButton={
          <Button
            label={intl.formatMessage({
              defaultMessage: 'End session',
              description:
                'Label for end session button on end project session dialog',
              id: 'xRx/Iq',
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
          defaultMessage: 'End project session?',
          description: 'Title for end project session dialog',
          id: 'IIyxmO',
        })}
        onClose={() => {
          setShowEndSessionDialog(false);
        }}>
        <Text>
          <FormattedMessage
            defaultMessage="Are you sure you want to end this project session? You can always start a new one later."
            description="Content for end project session dialog"
            id="amvNxY"
          />
        </Text>
      </Dialog>
      <Card
        className="p-6"
        disableSpotlight={true}
        padding={false}
        pattern={false}>
        <div className="flex justify-between">
          <div className="flex flex-col gap-1.5">
            <Text weight="bold">
              <FormattedMessage
                defaultMessage="Current project session"
                description="Title for current project session card"
                id="AfXYpF"
              />
            </Text>
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
          <div className="flex gap-2">
            <Button
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
              label={intl.formatMessage({
                defaultMessage:
                  'You can choose to end a project session if you choose not to work on it anymore. We will stop prompting you to continue the project in the dashboard',
                description:
                  'Tooltip for "End session" button on current project session card',
                id: 'L4W5rT',
              })}
              position="below">
              <Button
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
            <Button
              className={clsx(
                'transition-transform',
                isExpanded && 'rotate-180',
              )}
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
          </div>
        </div>
        {isExpanded && (
          <>
            <ProjectsSkillsSelect className="mt-6" skills={skills} />
            <ProjectsOtherTechStackInput
              value={otherTechStacks}
              onChange={setOtherTechStacks}
            />
          </>
        )}
      </Card>
    </>
  );
}
