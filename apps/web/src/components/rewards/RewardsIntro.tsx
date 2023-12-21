import RewardsFooter from '~/components/rewards/RewardsFooter';
import RewardsHeader from '~/components/rewards/RewardsHeader';
import RewardsTaskList from '~/components/rewards/RewardsTaskList';

type Props = Readonly<{
  isSignedIn: boolean;
}>;

export default function RewardsIntro({ isSignedIn }: Props) {
  return (
    <div className="relative isolate lg:mx-8">
      <RewardsHeader isSignedIn={isSignedIn} />
      <RewardsTaskList hasEntered={false} />
      <RewardsFooter isSignedIn={isSignedIn} />
    </div>
  );
}
