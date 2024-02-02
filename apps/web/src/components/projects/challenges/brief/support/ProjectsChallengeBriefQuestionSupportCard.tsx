import clsx from 'clsx';
import { RiAddCircleLine, RiPencilFill, RiReplyFill } from 'react-icons/ri';
import { useIntl } from 'react-intl';

import DiscussionsCommentRepliesThreadLines from '~/components/discussions/DiscussionsCommentRepliesThreadLines';
import UserProfileInformationRow from '~/components/profile/info/UserProfileInformationRow';
import ProjectsChallengeBriefSupportCard from '~/components/projects/challenges/brief/support/ProjectsChallengeBriefSupportCard';
import RelativeTimestamp from '~/components/projects/common/RelativeTimestamp';
import ProjectsVoteCountTag from '~/components/projects/stats/ProjectsVoteCountTag';
import ProjectsProfileAvatar from '~/components/projects/users/ProjectsProfileAvatar';
import Button from '~/components/ui/Button';
import Text from '~/components/ui/Text';
import { themeBorderElementColor } from '~/components/ui/theme';

function Placeholder({ className }: { className?: string }) {
  return (
    <div
      className={clsx(
        ' dark:bg-neutral-700 bg-neutral-200 rounded w-full',
        className,
      )}
      style={{ height: '10px' }}
    />
  );
}

export default function ProjectsChallengeBriefQuestionSupportCard() {
  const intl = useIntl();

  return (
    <ProjectsChallengeBriefSupportCard className="!pr-0">
      <div className={clsx('flex flex-col grow min-w-[330px]')}>
        <div className="flex items-start gap-4">
          <div className="relative flex flex-col items-center self-stretch">
            <ProjectsProfileAvatar
              profile={{
                // TODO(projects): Use appropriate avatar image
                avatarUrl:
                  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                id: '123',
                name: 'Anna',
                points: 42,
                username: 'Anna Gilbert',
              }}
              size="2xl"
            />
            <div
              className={clsx(
                'h-full w-px flex-1 border-l',
                themeBorderElementColor,
              )}
            />
            <div
              className={clsx(
                'h-full w-px flex-1 border-l',
                themeBorderElementColor,
              )}
            />
          </div>
          <div className={clsx('flex flex-1 flex-col items-start gap-3 pb-1')}>
            <div className="flex flex-col gap-1">
              <div className="flex gap-3">
                <Text color="secondary" size="body2">
                  <Text color="default" size="inherit">
                    Anna Gilbert
                  </Text>
                  {' · '}
                  <RelativeTimestamp
                    timestamp={new Date('2019-12-31T18:30:00.000Z')}
                  />
                </Text>
              </div>
              <UserProfileInformationRow
                profile={{
                  currentStatus: null,
                  startWorkDate: new Date('2020-12-31T18:30:00.000Z'),
                  title: 'Software Engineer at Stripe',
                }}
                size="xs"
              />
            </div>
            <div className="flex flex-col w-[240px] gap-3">
              <Placeholder />
              <div className="flex max-w-[90%] gap-3">
                <Placeholder className="w-[20%]" />
                <Placeholder className="w-[30%]" />
                <Placeholder className="w-[50%]" />
              </div>
              <div className="flex gap-3">
                <Placeholder />
                <Placeholder />
              </div>
            </div>
            <div className={clsx('flex -mt-1')}>
              <ProjectsVoteCountTag count={32} />
              <Button
                addonPosition="start"
                icon={RiReplyFill}
                label={intl.formatMessage({
                  defaultMessage: 'Reply',
                  description:
                    'Label for reply button on project discussions page',
                  id: 'buggxJ',
                })}
                variant="tertiary"
              />
              <Button
                addonPosition="start"
                icon={RiPencilFill}
                label={intl.formatMessage({
                  defaultMessage: 'Edit',
                  description:
                    'Label for edit button on project discussions page',
                  id: 'g2Nt5j',
                })}
                variant="tertiary"
              />
            </div>
          </div>
        </div>
        <div className="flex">
          <DiscussionsCommentRepliesThreadLines branchHeightClass="h-5 -translate-y-1" />
          <Button
            addonPosition="start"
            className="-ms-3.5"
            icon={RiAddCircleLine}
            label={intl.formatMessage(
              {
                defaultMessage:
                  '{replyCount, plural, one {Show # reply} other {Show # replies}}',
                description:
                  'Label for more replies button on project discussions page',
                id: 'g9OX0J',
              },
              { replyCount: 3 },
            )}
            variant="tertiary"
          />
        </div>
      </div>
    </ProjectsChallengeBriefSupportCard>
  );
}
