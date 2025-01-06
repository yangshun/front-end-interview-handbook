import { useEffect, useRef } from 'react';

import { trpc } from '~/hooks/trpc';

import { useUser } from '@supabase/auth-helpers-react';

type Props = Readonly<{
  isFromProjects: boolean;
  // TODO(emails): move check into tRPC mutation
  shouldSendWelcomeSeriesEmail: boolean;
}>;

export default function useEmailsOauthSignUpScheduleWelcomeSeries({
  isFromProjects,
  shouldSendWelcomeSeriesEmail,
}: Props) {
  const user = useUser();

  const scheduleWelcomeSeriesEmailMutation =
    trpc.emails.scheduleWelcomeSeries.useMutation();
  const scheduleWelcomeSeriesEmailMutationRef = useRef(
    scheduleWelcomeSeriesEmailMutation,
  );

  useEffect(() => {
    // If welcome series email already sent, don't send again
    if (!shouldSendWelcomeSeriesEmail || isFromProjects) {
      return;
    }

    // Hacky way to check for OAuth signup because there is no way to find out in oauth if the flow is signup or login flow and if signup if is from interviews or projects
    if (user?.created_at) {
      const today = new Date();
      const currentYear = today.getFullYear();
      const currentDate = today.getDate();
      const currentMonth = today.getMonth();

      const createdAt = new Date(user?.created_at);
      const createdAtYear = createdAt.getFullYear();
      const createdAtDate = createdAt.getDate();
      const createdAtMonth = createdAt.getMonth();

      // If the user was created today, send welcome email
      if (
        createdAtYear === currentYear &&
        createdAtMonth === currentMonth &&
        createdAtDate === currentDate
      ) {
        scheduleWelcomeSeriesEmailMutationRef.current.mutateAsync({
          userId: user.id,
        });
      }
    }
  }, [
    user?.created_at,
    user?.id,
    shouldSendWelcomeSeriesEmail,
    isFromProjects,
  ]);
}
