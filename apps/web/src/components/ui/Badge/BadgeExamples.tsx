import { RiStarLine } from 'react-icons/ri';

import UIExamplesGroup from '../misc/UIExamplesGroup';
import Badge from './Badge';

export default function BadgeExamples() {
  return (
    <UIExamplesGroup darkMode="horizontal" title="Badge">
      <div className="flex flex-col gap-8">
        <div className="flex flex-wrap gap-4">
          <Badge label="Brand" variant="primary" />
          <Badge label="Success" variant="success" />
          <Badge label="Information" variant="info" />
          <Badge label="Warning" variant="warning" />
          <Badge label="Danger" variant="danger" />
          <Badge label="Neutral" variant="neutral" />
          <Badge label="Neutral active" variant="neutral-active" />
          <Badge label="Special" variant="special" />
        </div>
        <div className="flex flex-wrap gap-4">
          <Badge label="Brand" size="sm" variant="primary" />
          <Badge label="Success" size="sm" variant="success" />
          <Badge label="Information" size="sm" variant="info" />
          <Badge label="Warning" size="sm" variant="warning" />
          <Badge label="Danger" size="sm" variant="danger" />
          <Badge label="Neutral" size="sm" variant="neutral" />
          <Badge label="Neutral active" variant="neutral-active" />
          <Badge label="Special" size="sm" variant="special" />
        </div>
        <div className="flex flex-wrap gap-4">
          <Badge label="Brand" size="xs" variant="primary" />
          <Badge label="Success" size="xs" variant="success" />
          <Badge label="Information" size="xs" variant="info" />
          <Badge label="Warning" size="xs" variant="warning" />
          <Badge label="Danger" size="xs" variant="danger" />
          <Badge label="Neutral" size="xs" variant="neutral" />
          <Badge label="Neutral active" variant="neutral-active" />
          <Badge label="Special" size="xs" variant="special" />
        </div>
        <div className="flex flex-wrap gap-4">
          <Badge
            icon={RiStarLine}
            label="Xs with icon"
            size="xs"
            variant="primary"
          />
          <Badge
            icon={RiStarLine}
            label="Small with icon"
            size="sm"
            variant="primary"
          />
          <Badge
            icon={RiStarLine}
            label="Medium with icon"
            size="md"
            variant="primary"
          />
        </div>
      </div>
    </UIExamplesGroup>
  );
}
