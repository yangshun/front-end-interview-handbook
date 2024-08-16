import { useState } from 'react';

export default function Checkboxes({
  defaultCheckboxData,
}) {
  const [message, setMessage] = useState('Hello world');

  return (
    <div>
      <h1>{message}</h1>
      <pre>
        {JSON.stringify(defaultCheckboxData, null, 2)}
      </pre>
    </div>
  );
}
