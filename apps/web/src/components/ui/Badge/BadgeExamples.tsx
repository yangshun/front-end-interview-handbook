import Badge from './Badge';
import UIExamplesGroup from '../misc/UIExamplesGroup';

export default function BadgeExamples() {
  return (
    <UIExamplesGroup darkMode="horizontal" title="Badge">
      <div className="flex flex-col gap-4">
        <div className="flex flex-wrap gap-4">
          <Badge label="Brand" variant="primary" />
          <Badge label="Success" variant="success" />
          <Badge label="Information" variant="info" />
          <Badge label="Warning" variant="warning" />
          <Badge label="Danger" variant="danger" />
          <Badge label="Neutral" variant="neutral" />
          <Badge label="Special" variant="special" />
        </div>
        <div className="flex flex-wrap gap-4">
          <Badge label="Brand" size="sm" variant="primary" />
          <Badge label="Success" size="sm" variant="success" />
          <Badge label="Information" size="sm" variant="info" />
          <Badge label="Warning" size="sm" variant="warning" />
          <Badge label="Danger" size="sm" variant="danger" />
          <Badge label="Neutral" size="sm" variant="neutral" />
          <Badge label="Special" variant="special" />
        </div>
      </div>
    </UIExamplesGroup>
  );
}
