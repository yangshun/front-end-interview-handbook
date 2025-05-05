import { useState } from 'react';
import ModalDialog from './ModalDialog';

export default function App() {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <button onClick={() => setOpen(true)}>
        Show modal
      </button>
      <ModalDialog
        open={open}
        title="Feedback"
        onClose={() => {
          setOpen(false);
        }}>
        <div className="contents">
          <div>
            Provide your feedback, we will get back in 3-5
            business days.
          </div>
          <input placeholder="john@gmail.com" />
          <textarea
            placeholder="Your message here"
            rows={5}></textarea>
          <button type="button">Submit</button>
        </div>
      </ModalDialog>
    </div>
  );
}
