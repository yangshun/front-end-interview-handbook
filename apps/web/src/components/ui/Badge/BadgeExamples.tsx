import {
  RiCheckLine,
  RiCircleFill,
  RiCircleLine,
  RiCloseLine,
  RiErrorWarningLine,
  RiInformationLine,
  RiStarFill,
  RiStarLine,
} from 'react-icons/ri';

import Badge from './Badge';
import UIExamplesGroup from '../misc/UIExamplesGroup';

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
          <Badge label="Special" variant="special" />
        </div>
        <div className="flex flex-wrap gap-4">
          <Badge label="Brand" size="sm" variant="primary" />
          <Badge label="Success" size="sm" variant="success" />
          <Badge label="Information" size="sm" variant="info" />
          <Badge label="Warning" size="sm" variant="warning" />
          <Badge label="Danger" size="sm" variant="danger" />
          <Badge label="Neutral" size="sm" variant="neutral" />
          <Badge label="Special" size="sm" variant="special" />
        </div>
        <div className="flex flex-wrap gap-4">
          <Badge icon={RiStarLine} label="Brand" size="sm" variant="primary" />
          <Badge
            icon={RiCheckLine}
            label="Success"
            size="sm"
            variant="success"
          />
          <Badge
            icon={RiInformationLine}
            label="Information"
            size="sm"
            variant="info"
          />
          <Badge
            icon={RiErrorWarningLine}
            label="Warning"
            size="sm"
            variant="warning"
          />
          <Badge icon={RiCloseLine} label="Danger" size="sm" variant="danger" />
          <Badge
            icon={RiCircleFill}
            label="Neutral"
            size="sm"
            variant="neutral"
          />
          <Badge
            icon={RiStarFill}
            label="Special"
            size="sm"
            variant="special"
          />
        </div>
      </div>
    </UIExamplesGroup>
  );
}
