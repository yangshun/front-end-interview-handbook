import Button from '../Button';
import UIExamplesGroup from '../misc/UIExamplesGroup';
import EmptyState from './EmptyState';

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
          action={<Button href="#" label="See perks" variant="primary" />}
          subtitle="You have leveled up"
          title="Congratulations"
          variant="success"
        />
      </div>
    </UIExamplesGroup>
  );
}
