import { useState } from 'react';

import SlideOut from './SlideOut';
import Button from '../Button';
import UIExamplesGroup from '../misc/UIExamplesGroup';

export default function SlideOutExamples() {
  const [isShownStart, setIsShownStart] = useState(false);
  const [isShownEnd, setIsShownEnd] = useState(false);

  return (
    <UIExamplesGroup title="Slide Out">
      <div className="space-x-4">
        <Button
          label="Enter From Left"
          variant="primary"
          onClick={() => setIsShownStart(true)}
        />
        <Button
          label="Enter From Right"
          variant="primary"
          onClick={() => setIsShownEnd(true)}
        />
      </div>
      <SlideOut
        enterFrom="start"
        isShown={isShownStart}
        size="md"
        title="Navigation"
        onClose={() => setIsShownStart(false)}>
        <div className="p-4">Hello World</div>
      </SlideOut>
      <SlideOut
        isShown={isShownEnd}
        size="md"
        title="Navigation"
        onClose={() => setIsShownEnd(false)}>
        <div className="p-4">Hello World</div>
      </SlideOut>
    </UIExamplesGroup>
  );
}
