import Badge from './Badge';
import UIExamplesGroup from '../misc/UIExamplesGroup';

export default function BadgeExamples() {
  return (
    <UIExamplesGroup title="Badge">
      <div className="space-y-4">
        <div className="space-x-4">
          <Badge label="Primary" variant="primary" />
          <Badge label="Success" variant="success" />
          <Badge label="Information" variant="info" />
          <Badge label="Warning" variant="warning" />
          <Badge label="Danger" variant="danger" />
          <Badge label="Special" variant="special" />
        </div>
        <div className="space-x-4">
          <Badge label="Primary" size="sm" variant="primary" />
          <Badge label="Success" size="sm" variant="success" />
          <Badge label="Information" size="sm" variant="info" />
          <Badge label="Warning" size="sm" variant="warning" />
          <Badge label="Danger" size="sm" variant="danger" />
          <Badge label="Special" size="sm" variant="special" />
        </div>
      </div>
    </UIExamplesGroup>
  );
}
