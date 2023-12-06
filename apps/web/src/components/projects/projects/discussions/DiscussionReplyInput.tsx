import clsx from 'clsx';
import { FormattedMessage, useIntl } from 'react-intl';

import Button from '~/components/ui/Button';
import Text from '~/components/ui/Text';
import TextInput from '~/components/ui/TextInput';
import { themeElementBorderColor } from '~/components/ui/theme';

import { useProjectsDiscussionContext } from './ProjectsDiscussionContext';
import ProjectsReputationCountIncreaseTag from '../../stats/ProjectsReputationCountIncreaseTag';
import UserAvatarWithLevel from '../../users/UserAvatarWithLevel';

type Props = Readonly<{
  hasNext: boolean;
  onCancel: () => void;
}>;

export default function DiscussionPostReplyInput({ hasNext, onCancel }: Props) {
  const intl = useIntl();
  const { user } = useProjectsDiscussionContext();

  return (
    <div className="relative flex">
      <div className="relative flex w-14 flex-shrink-0 flex-col items-center">
        {hasNext && (
          <div
            className={clsx(
              'absolute h-full w-px border-l',
              themeElementBorderColor,
            )}
          />
        )}
        <div
          className={clsx(
            'absolute end-0 top-0 h-7 w-[calc(50%_+_0.5px)] rounded-es-2xl border-b border-s',
            themeElementBorderColor,
          )}
        />
      </div>
      <div className={clsx('flex flex-1 items-start gap-4', hasNext && 'pb-6')}>
        <UserAvatarWithLevel level={30} progress={50} size="xl" user={user} />
        <div className="flex flex-1 flex-col">
          <Text size="body2" weight="medium">
            <FormattedMessage
              defaultMessage="You are replying"
              description="Label for replying to discussion post on project discussions page"
              id="IBaiFq"
            />
          </Text>
          <TextInput
            autoComplete="off"
            className="mt-2"
            isLabelHidden={true}
            label={intl.formatMessage({
              defaultMessage: 'Reply content',
              description: 'Label for discussion post reply input',
              id: 'KKasxQ',
            })}
            placeholder={intl.formatMessage({
              defaultMessage: 'Text here',
              description: 'Placeholder for discussion post reply input',
              id: 'IEA3DS',
            })}
          />
          <div className="mt-4 flex items-center gap-4">
            <Button
              label={intl.formatMessage({
                defaultMessage: 'Cancel',
                description:
                  'Label for cancel reply button on project discussions page',
                id: 'WPoLv8',
              })}
              variant="secondary"
              onClick={onCancel}
            />
            <Button
              label={intl.formatMessage({
                defaultMessage: 'Post',
                description:
                  'Label for post reply button on project discussions page',
                id: '+dUPPi',
              })}
              variant="primary"
            />
            <ProjectsReputationCountIncreaseTag
              repCount={25}
              variant="filled"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
