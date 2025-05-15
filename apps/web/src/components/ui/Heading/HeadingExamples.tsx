import { capitalize } from 'lodash-es';

import UIExamplesGroup from '../misc/UIExamplesGroup';
import Heading from './Heading';

const levels = [
  'heading1',
  'heading2',
  'heading3',
  'heading4',
  'heading5',
  'heading6',
  'custom',
] as const;

export default function HeadingExamples() {
  return (
    <UIExamplesGroup darkMode="horizontal" title="Heading">
      <div className="flex gap-12">
        {(['default', 'medium'] as const).map((weight) => (
          <div key={weight} className="flex flex-col gap-4">
            {levels.map((level) => (
              <Heading key={level} level={level} weight={weight}>
                {capitalize(level)}
              </Heading>
            ))}
          </div>
        ))}
      </div>
    </UIExamplesGroup>
  );
}
