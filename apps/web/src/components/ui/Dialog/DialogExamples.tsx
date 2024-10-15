import { useState } from 'react';

import type { DialogWidth } from './Dialog';
import Dialog from './Dialog';
import Button from '../Button';
import UIExamplesGroup from '../misc/UIExamplesGroup';
import Text from '../Text';

function DialogSizeExample({ width }: Readonly<{ width: DialogWidth }>) {
  const [isShown, setIsShown] = useState(false);

  return (
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
      trigger={
        <Button
          label={`${width} width`}
          variant="primary"
          onClick={() => setIsShown(true)}
        />
      }
      width={width}
      onClose={() => setIsShown(false)}>
      <div>
        One morning, when Gregor Samsa woke from troubled dreams, he found
        himself transformed in his bed into a horrible vermin. He lay on his
        armour-like back, and if he lifted his head a little he could see his
        brown belly, slightly domed and divided by arches into stiff sections.
      </div>
    </Dialog>
  );
}

function DialogTallExample({ scrollable }: Readonly<{ scrollable: boolean }>) {
  const [isShown, setIsShown] = useState(false);

  return (
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
      scrollable={scrollable}
      secondaryButton={
        <Button
          label="Secondary action"
          size="md"
          variant="secondary"
          onClick={() => setIsShown(false)}
        />
      }
      title="Modal title"
      trigger={
        <Button
          label={'Tall dialog ' + (scrollable ? '(Scrollable)' : '')}
          variant="primary"
          onClick={() => setIsShown(true)}
        />
      }
      width="screen-md"
      onClose={() => setIsShown(false)}>
      <div className="flex flex-col gap-4">
        {Array.from({ length: 10 }).map((_, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <div key={index}>
            One morning, when Gregor Samsa woke from troubled dreams, he found
            himself transformed in his bed into a horrible vermin. He lay on his
            armour-like back, and if he lifted his head a little he could see
            his brown belly, slightly domed and divided by arches into stiff
            sections.
          </div>
        ))}
      </div>
    </Dialog>
  );
}

function DialogPreviousExample() {
  const [isShown, setIsShown] = useState(false);

  return (
    <Dialog
      isShown={isShown}
      previousButton={
        <Button
          label="Previous action"
          size="md"
          variant="secondary"
          onClick={() => setIsShown(false)}
        />
      }
      primaryButton={
        <Button
          label="Primary action"
          size="md"
          variant="primary"
          onClick={() => setIsShown(false)}
        />
      }
      title="Modal title"
      trigger={
        <Button
          label="Previous button"
          variant="primary"
          onClick={() => setIsShown(true)}
        />
      }
      width="screen-md"
      onClose={() => setIsShown(false)}>
      <div className="flex flex-col gap-4">
        One morning, when Gregor Samsa woke from troubled dreams, he found
        himself transformed in his bed into a horrible vermin. He lay on his
        armour-like back, and if he lifted his head a little he could see his
        brown belly, slightly domed and divided by arches into stiff sections.
      </div>
    </Dialog>
  );
}

function DialogNonCenteredExample() {
  const [isShown, setIsShown] = useState(false);

  return (
    <Dialog
      centered={false}
      isShown={isShown}
      primaryButton={
        <Button
          label="Primary action"
          size="md"
          variant="primary"
          onClick={() => setIsShown(false)}
        />
      }
      title="Modal title"
      trigger={
        <Button
          label="Top-positioned"
          variant="primary"
          onClick={() => setIsShown(true)}
        />
      }
      width="screen-md"
      onClose={() => setIsShown(false)}>
      <div className="flex flex-col gap-4">
        One morning, when Gregor Samsa woke from troubled dreams, he found
        himself transformed in his bed into a horrible vermin. He lay on his
        armour-like back, and if he lifted his head a little he could see his
        brown belly, slightly domed and divided by arches into stiff sections.
      </div>
    </Dialog>
  );
}

function DialogBottomContentsExample() {
  const [isShown, setIsShown] = useState(false);

  return (
    <Dialog
      bottomContents={
        <Text color="secondary" size="body3">
          Put any bottom content here but remember to add padding
        </Text>
      }
      isShown={isShown}
      primaryButton={
        <Button
          label="Primary action"
          size="md"
          variant="primary"
          onClick={() => setIsShown(false)}
        />
      }
      title="Modal title"
      trigger={
        <Button
          label="Bottom contents"
          variant="primary"
          onClick={() => setIsShown(true)}
        />
      }
      width="screen-md"
      onClose={() => setIsShown(false)}>
      <div className="flex flex-col gap-4">
        One morning, when Gregor Samsa woke from troubled dreams, he found
        himself transformed in his bed into a horrible vermin. He lay on his
        armour-like back, and if he lifted his head a little he could see his
        brown belly, slightly domed and divided by arches into stiff sections.
      </div>
    </Dialog>
  );
}

export default function DialogExamples() {
  const [isShown, setIsShown] = useState(false);
  const [isShown2, setIsShown2] = useState(false);

  return (
    <UIExamplesGroup darkMode="none" title="Dialog">
      <div className="flex gap-x-24">
        <Dialog
          title="Modal title"
          trigger={<Button label="Uncontrolled" variant="primary" />}>
          <div>
            One morning, when Gregor Samsa woke from troubled dreams, he found
            himself transformed in his bed into a horrible vermin. He lay on his
            armour-like back, and if he lifted his head a little he could see
            his brown belly, slightly domed and divided by arches into stiff
            sections.
          </div>
        </Dialog>
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
          trigger={
            <Button
              label="Controlled"
              variant="primary"
              onClick={() => setIsShown(true)}
            />
          }
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
          label="External trigger"
          variant="primary"
          onClick={() => setIsShown2(true)}
        />
        <Dialog
          isShown={isShown2}
          primaryButton={
            <Button
              label="Primary action"
              size="md"
              variant="primary"
              onClick={() => setIsShown2(false)}
            />
          }
          secondaryButton={
            <Button
              label="Secondary action"
              size="md"
              variant="secondary"
              onClick={() => setIsShown2(false)}
            />
          }
          title="Modal title"
          onClose={() => setIsShown2(false)}>
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
      <div className="flex gap-x-24">
        <DialogTallExample scrollable={false} />
        <DialogTallExample scrollable={true} />
      </div>
      <div className="flex gap-x-24">
        <DialogNonCenteredExample />
        <DialogPreviousExample />
        <DialogBottomContentsExample />
      </div>
    </UIExamplesGroup>
  );
}
