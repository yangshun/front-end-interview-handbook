import EmptyState from './EmptyState';
import Button from '../Button';
import UIExamplesGroup from '../misc/UIExamplesGroup';

export default function EmptyStateExamples() {
  return (
    <UIExamplesGroup title="Empty State">
      <div className="grid gap-8 lg:grid-cols-3">
        <EmptyState
          subtitle="Try changing the filters"
          title="No Results"
          variant="empty"
        />
        <EmptyState
          subtitle="Try again later, or just find an alternative"
          title="Oops something went wrong"
          variant="error"
        />
        <EmptyState
          action={
            <Button
              href="#"
              label="View Subscription Plans"
              variant="primary"
            />
          }
          subtitle="Get premium to unlock full access to all questions and solutions"
          title="Not Subscribed"
          variant="not_subscribed"
        />
      </div>
    </UIExamplesGroup>
  );
}
