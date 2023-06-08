import { useState } from 'react';

import Banner from './Banner';
import UIExamplesGroup from '../misc/UIExamplesGroup';

export default function BannerExamples() {
  const [isShown, setIsShown] = useState(true);
  const [isShown2, setIsShown2] = useState(true);
  const [isShown3, setIsShown3] = useState(true);
  const [isShown4, setIsShown4] = useState(true);

  return (
    <UIExamplesGroup title="Banner">
      <div className="space-y-4">
        <Banner>This notice is going to change your life.</Banner>
        <Banner size="xs">
          This smaller notice is going to change your life.
        </Banner>
        <Banner size="xs">
          This even smaller notice is going to change your life.
        </Banner>
        {isShown && (
          <Banner onHide={() => setIsShown(false)}>
            This notice is going to change your life unless you close it.
          </Banner>
        )}
        {isShown2 && (
          <Banner size="xs" onHide={() => setIsShown2(false)}>
            This smaller notice is going to change your life unless you close
            it.
          </Banner>
        )}
        {isShown3 && (
          <Banner size="xs" onHide={() => setIsShown3(false)}>
            This even smaller notice is going to change your life unless you
            close it.
          </Banner>
        )}
        {isShown4 && (
          <Banner variant="special" onHide={() => setIsShown4(false)}>
            This notice is going to change your life.
          </Banner>
        )}
      </div>
    </UIExamplesGroup>
  );
}
