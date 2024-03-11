import Button from '~/components/ui/Button';
import EmptyState from '~/components/ui/EmptyState';

export default function ProjectsTrackPaywall() {
  return (
    <EmptyState
      action={
        <Button
          href="/projects/pricing"
          label="View subscription plans"
          variant="primary"
        />
      }
      subtitle="Purchase premium to get access to all component tracks as well as exclusive skills, official how-to guides and production-ready Figma files."
      title="Premium component track"
      variant="not_subscribed"
    />
  );
}
