import {
  ComponentProps,
  RefObject,
  useEffect,
  useId,
  useRef,
} from 'react';
import { createPortal } from 'react-dom';

export default function ModalDialog({
  open = false,
  ...props
}: Readonly<{
  open?: boolean;
}> &
  ComponentProps<typeof ModalDialogImpl>) {
  if (!open) {
    return null;
  }

  return <ModalDialogImpl {...props} />;
}

/**
 * Invokes a function when a key is pressed.
 */
function useOnKeyDown(key: string, fn: () => void) {
  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === key) {
        fn();
      }
    }

    document.addEventListener('keydown', onKeyDown);

    return () => {
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [fn]);
}

/**
 * Invokes a function when clicking outside an element.
 */
function useOnClickOutside(
  elRef: RefObject<HTMLDivElement>,
  fn: () => void,
) {
  // Add event handling for close when clicking outside.
  useEffect(() => {
    function onClickOutside(
      event: MouseEvent | TouchEvent,
    ) {
      // No-op if clicked element is a descendant of element's contents.
      if (
        event.target instanceof Node &&
        elRef.current != null &&
        !elRef.current?.contains(event.target)
      ) {
        fn();
      }
    }

    document.addEventListener('mousedown', onClickOutside);
    document.addEventListener('touchstart', onClickOutside);

    return () => {
      document.removeEventListener(
        'mousedown',
        onClickOutside,
      );
      document.removeEventListener(
        'touchstart',
        onClickOutside,
      );
    };
  }, [fn]);
}

function ModalDialogImpl({
  children,
  title,
  onClose,
}: Readonly<{
  children: React.ReactNode;
  title: string;
  onClose: () => void;
}>) {
  const titleId = useId();
  const contentId = useId();
  const dialogRef = useRef<HTMLDivElement>(null);

  useOnKeyDown('Escape', onClose);
  useOnClickOutside(dialogRef, onClose);

  return createPortal(
    <div className="modal-overlay">
      <div
        aria-describedby={contentId}
        aria-labelledby={titleId}
        className="modal"
        role="dialog"
        ref={dialogRef}>
        <h1 className="modal-title" id={titleId}>
          {title}
        </h1>
        <div id={contentId}>{children}</div>
        <button onClick={onClose}>Close</button>
      </div>
    </div>,
    document.body,
  );
}
