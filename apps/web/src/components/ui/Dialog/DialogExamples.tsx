import { useState } from 'react';

import type { DialogWidth } from './Dialog';
import Dialog from './Dialog';
import Button from '../Button';
import UIExamplesGroup from '../misc/UIExamplesGroup';

function DialogSizeExample({ width }: Readonly<{ width: DialogWidth }>) {
  const [isShown, setIsShown] = useState(false);

  return (
    <>
      <Dialog
        isShown={isShown}
        primaryButton={
          <Button
            label="Primary action"
            size="md"
            variant="primary"
            onClick={() => setIsShown(false)}
          />
        }
        secondaryButton={
          <Button
            label="Secondary action"
            size="md"
            variant="secondary"
            onClick={() => setIsShown(false)}
          />
        }
        title="Modal title"
        width={width}
        onClose={() => setIsShown(false)}>
        <div>
          One morning, when Gregor Samsa woke from troubled dreams, he found
          himself transformed in his bed into a horrible vermin. He lay on his
          armour-like back, and if he lifted his head a little he could see his
          brown belly, slightly domed and divided by arches into stiff sections.
        </div>
      </Dialog>
      <Button
        label={`${width} width`}
        variant="primary"
        onClick={() => setIsShown(true)}
      />
    </>
  );
}

export default function DialogExamples() {
  const [isShown, setIsShown] = useState(false);
  const [isShownDark, setIsShownDark] = useState(false);

  return (
    <UIExamplesGroup darkMode="none" title="Dialog">
      <div className="flex gap-x-24">
        <Button
          label="Open"
          variant="primary"
          onClick={() => setIsShown(true)}
        />
        <Dialog
          isShown={isShown}
          primaryButton={
            <Button
              label="Primary action"
              size="md"
              variant="primary"
              onClick={() => setIsShown(false)}
            />
          }
          secondaryButton={
            <Button
              label="Secondary action"
              size="md"
              variant="secondary"
              onClick={() => setIsShown(false)}
            />
          }
          title="Modal title"
          onClose={() => setIsShown(false)}>
          <div>
            One morning, when Gregor Samsa woke from troubled dreams, he found
            himself transformed in his bed into a horrible vermin. He lay on his
            armour-like back, and if he lifted his head a little he could see
            his brown belly, slightly domed and divided by arches into stiff
            sections.
          </div>
        </Dialog>
        <Button
          label="Open Dark Mode"
          variant="primary"
          onClick={() => setIsShownDark(true)}
        />
        <Dialog
          dark={true}
          isShown={isShownDark}
          primaryButton={
            <Button
              label="Primary action"
              size="md"
              variant="primary"
              onClick={() => setIsShownDark(false)}
            />
          }
          secondaryButton={
            <Button
              label="Secondary action"
              size="md"
              variant="secondary"
              onClick={() => setIsShownDark(false)}
            />
          }
          title="Modal title"
          onClose={() => setIsShownDark(false)}>
          <div>
            One morning, when Gregor Samsa woke from troubled dreams, he found
            himself transformed in his bed into a horrible vermin. He lay on his
            armour-like back, and if he lifted his head a little he could see
            his brown belly, slightly domed and divided by arches into stiff
            sections.
          </div>
        </Dialog>
      </div>
      <div className="flex gap-x-24">
        {(
          ['sm', 'screen-sm', 'screen-md', 'screen-lg', 'screen-xl'] as const
        ).map((width) => (
          <DialogSizeExample key={width} width={width} />
        ))}
      </div>
    </UIExamplesGroup>
  );
}
