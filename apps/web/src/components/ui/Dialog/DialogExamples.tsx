import { useState } from 'react';

import Dialog from './Dialog';
import Button from '../Button';
import UIExamplesGroup from '../misc/UIExamplesGroup';

export default function DialogExamples() {
  const [isShown, setIsShown] = useState(false);

  return (
    <UIExamplesGroup title="Dialog">
      <Button label="Open" variant="primary" onClick={() => setIsShown(true)} />
      <Dialog
        isShown={isShown}
        primaryButton={
          <Button
            display="block"
            label="OK"
            variant="primary"
            onClick={() => setIsShown(false)}
          />
        }
        secondaryButton={
          <Button
            display="block"
            label="Cancel"
            variant="secondary"
            onClick={() => setIsShown(false)}
          />
        }
        title="Hey you gotta pay attention to this"
        onClose={() => setIsShown(false)}>
        <div>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eius aliquam
          laudantium explicabo pariatur iste dolorem animi vitae error totam. At
          sapiente aliquam accusamus facere veritatis.
        </div>
      </Dialog>
    </UIExamplesGroup>
  );
}
