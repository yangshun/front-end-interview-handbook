import UIExamplesGroup from '../misc/UIExamplesGroup';
import type { SpinnerSize } from './Spinner';
import Spinner from './Spinner';

const sizes: ReadonlyArray<SpinnerSize> = ['xs', 'sm', 'md', 'lg'];

export default function SpinnerExamples() {
  return (
    <UIExamplesGroup darkMode="horizontal" title="Spinners">
      <div className="space-x-4">
        {sizes.map((size) => (
          <Spinner key={size} label="Loading..." size={size} />
        ))}
      </div>
    </UIExamplesGroup>
  );
}
