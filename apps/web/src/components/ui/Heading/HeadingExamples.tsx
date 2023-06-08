import { capitalize } from 'lodash-es';

import type { HeadingLevel } from './Heading';
import Heading from './Heading';
import UIExamplesGroup from '../misc/UIExamplesGroup';

const levels: ReadonlyArray<HeadingLevel> = [
  'heading1',
  'heading2',
  'heading3',
  'heading4',
  'heading5',
  'heading6',
  'custom',
];

export default function HeadingExamples() {
  return (
    <UIExamplesGroup title="Heading">
      {levels.map((level) => (
        <Heading key={level} level={level}>
          {capitalize(level)}
        </Heading>
      ))}
    </UIExamplesGroup>
  );
}
