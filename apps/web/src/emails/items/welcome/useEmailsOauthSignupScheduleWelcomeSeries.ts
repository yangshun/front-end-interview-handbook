import { useEffect } from 'react';

import { useUserProfile } from '~/components/global/UserProfileProvider';

import scheduleWelcomeSeriesEmail from '~/emails/items/welcome/EmailsSchedulerWelcomeSeries';

import { useUser } from '@supabase/auth-helpers-react';

type Props = Readonly<{
  isFromProjects: boolean;
  shouldSendWelcomeSeriesEmail: boolean;
}>;

export default function useEmailsOauthSignUpScheduleWelcomeSeries({
  isFromProjects,
  shouldSendWelcomeSeriesEmail,
}: Props) {
  const { userProfile } = useUserProfile();
  const user = useUser();

  useEffect(() => {
    // If welcome series email already sent, don't send again
    if (!shouldSendWelcomeSeriesEmail) {
      return;
    }
    // Hacky way to check for OAuth signup because there is no way to find out in oauth if the flow is signup or login flow and if signup if is from interviews or projects
    if (userProfile && user) {
      // Get today's date and year
      const today = new Date();
      const currentYear = today.getFullYear();
      const currentDate = today.getDate();
      const currentMonth = today.getMonth();

      const createdAt = new Date(userProfile.createdAt);
      // Get the date, month, and year of the timestamp
      const createdAtYear = createdAt.getFullYear();
      const createdAtDate = createdAt.getDate();
      const createdAtMonth = createdAt.getMonth();

      // If the profile is today, we will consider it is as Oauth signup
      if (
        createdAtYear === currentYear &&
        createdAtMonth === currentMonth &&
        createdAtDate === currentDate &&
        user?.email
      ) {
        scheduleWelcomeSeriesEmail({
          email: user.email,
          name: '',
          signedUpViaInterviews: !isFromProjects,
          userId: user.id,
        });
      }
    }
  }, [userProfile, user, shouldSendWelcomeSeriesEmail, isFromProjects]);
}
