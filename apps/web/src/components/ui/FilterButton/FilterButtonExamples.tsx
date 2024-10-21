import { Fragment } from 'react';

import FilterButton from './FilterButton';
import type { ButtonSize } from '../Button';
import UIExamplesGroup from '../misc/UIExamplesGroup';

const sizes: ReadonlyArray<ButtonSize> = ['xs', 'sm', 'md', 'lg'];

export default function ButtonExamples() {
  return (
    <UIExamplesGroup title="Filter Button">
      <div className="space-x-4">
        {sizes.map((size) => (
          <Fragment key={size}>
            <FilterButton label="Default" size={size} />
            <FilterButton label="Selected" selected={true} size={size} />
          </Fragment>
        ))}
      </div>
    </UIExamplesGroup>
  );
}
