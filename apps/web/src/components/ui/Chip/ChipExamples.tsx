import { FaCheck } from 'react-icons/fa6';
import {
  RiCursorFill,
  RiLoader2Line,
  RiLockLine,
  RiStarFill,
} from 'react-icons/ri';

import UIExamplesGroup from '../misc/UIExamplesGroup';
import Chip from './Chip';

export default function ChipExamples() {
  return (
    <UIExamplesGroup darkMode="horizontal" title="Chip">
      <div className="flex flex-wrap gap-4">
        <Chip label="1" variant="neutral" />
        <Chip label="1" variant="active" />
        <Chip
          icon={FaCheck}
          isLabelHidden={true}
          label="Completed"
          variant="success"
        />
        <Chip
          icon={RiStarFill}
          isLabelHidden={true}
          label="Loading"
          variant="primary"
        />
        <Chip
          icon={RiLoader2Line}
          isLabelHidden={true}
          label="In-progress"
          variant="warning"
        />
        <Chip
          icon={RiLockLine}
          isLabelHidden={true}
          label="Locked"
          variant="special"
        />
        <Chip
          icon={FaCheck}
          isLabelHidden={true}
          label="Loading"
          variant="secondary"
        />
        <Chip
          icon={RiCursorFill}
          isLabelHidden={true}
          label="Cursor"
          variant="primary"
        />
      </div>
    </UIExamplesGroup>
  );
}
