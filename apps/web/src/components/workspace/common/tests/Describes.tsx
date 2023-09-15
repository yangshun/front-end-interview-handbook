import * as React from 'react';

import Tests from './Tests';
import type { Describe } from './types';
import { isEmpty } from './utils';

type Props = Readonly<{ describes: Array<Describe> }>;

export default function Describes({ describes }: Props) {
  return (
    <div className="flex flex-col gap-y-2">
      {describes.map((describe) => {
        if (isEmpty(describe)) {
          return null;
        }

        const tests = Object.values(describe.tests ?? {});
        const describesInner = Object.values(describe.describes ?? {});

        return (
          <div key={describe.name} className="flex flex-col gap-y-2">
            <div>{describe.name}</div>
            <Tests tests={tests} />
            <Describes describes={describesInner} />
          </div>
        );
      })}
    </div>
  );
}
