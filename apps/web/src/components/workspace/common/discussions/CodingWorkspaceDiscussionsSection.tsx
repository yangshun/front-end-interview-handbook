import type { InterviewsDiscussionCommentDomain } from '@prisma/client';
import { useUser } from '@supabase/auth-helpers-react';
import clsx from 'clsx';
import { useCallback, useState } from 'react';
import { RiAddLine } from 'react-icons/ri';

import { useEnterViewport } from '~/hooks/useEnterViewport';
import { useAuthSignInUp } from '~/hooks/user/useAuthFns';

import { useIntl } from '~/components/intl';
import Button from '~/components/ui/Button';
import Text from '~/components/ui/Text';

import CodingWorkspaceDiscussionsCommentList from './CodingWorkspaceDiscussionsCommentList';
import CodingWorkspaceDiscussionsCommentSort from './CodingWorkspaceDiscussionsCommentSort';
import CodingWorkspaceDiscussionsNewComment from './CodingWorkspaceDiscussionsNewComment';
import type { CodingWorkspaceDiscussionsCommentSortField } from './types';

type Props = Readonly<{
  className?: string;
  domain: InterviewsDiscussionCommentDomain;
  entityId: string;
}>;

export default function CodingWorkspaceDiscussionsSection({
  className,
  domain,
  entityId,
}: Props) {
  const intl = useIntl();
  const user = useUser();
  const [isAscendingOrder, setIsAscendingOrder] = useState(false);
  const [sortField, setSortField] =
    useState<CodingWorkspaceDiscussionsCommentSortField>('createdAt');
  const [commentsCount, setCommentsCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  const handleVisibilityChange = useCallback((inView: boolean) => {
    if (inView) {
      setIsVisible(true);
    }
  }, []);

  const ref = useEnterViewport(handleVisibilityChange);

  return (
    <div ref={ref} className={clsx('space-y-3', className)}>
      <div className="flex items-center justify-between">
        <Text size="body1" weight="bold">
          {intl.formatMessage({
            defaultMessage: 'Discussions',
            description: 'Discussions section title',
            id: '6RewiX',
          })}
          {commentsCount > 0 && ` (${commentsCount})`}
        </Text>
        <CodingWorkspaceDiscussionsCommentSort
          isAscendingOrder={isAscendingOrder}
          setIsAscendingOrder={setIsAscendingOrder}
          setSortField={setSortField}
          sortField={sortField}
        />
      </div>
      <div className="space-y-6">
        {user ? (
          <CodingWorkspaceDiscussionsNewComment
            domain={domain}
            entityId={entityId}
          />
        ) : (
          <AddCommentButton />
        )}
        {isVisible && (
          <CodingWorkspaceDiscussionsCommentList
            domain={domain}
            entityId={entityId}
            sort={{
              field: sortField,
              isAscendingOrder,
            }}
            onUpdateCommentsCount={setCommentsCount}
          />
        )}
      </div>
    </div>
  );
}

function AddCommentButton() {
  const intl = useIntl();
  const { signInUpHref } = useAuthSignInUp();

  return (
    <Button
      addonPosition="start"
      href={signInUpHref()}
      icon={RiAddLine}
      label={intl.formatMessage({
        defaultMessage: 'Add a comment',
        description: 'Button label for adding a comment',
        id: 'AzTlm9',
      })}
      variant="primary"
    />
  );
}
