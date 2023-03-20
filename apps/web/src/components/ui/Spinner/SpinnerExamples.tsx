import type { SpinnerSize } from './Spinner';
import Spinner from './Spinner';
import UIExamplesGroup from '../misc/UIExamplesGroup';

const sizes: ReadonlyArray<SpinnerSize> = ['xs', 'sm', 'md', 'lg'];

export default function SpinnerExamples() {
  return (
    <UIExamplesGroup title="Spinners">
      <div className="space-x-4">
        {sizes.map((size) => (
          <Spinner key={size} label="Loading..." size={size} />
        ))}
      </div>
    </UIExamplesGroup>
  );
}
