import { useState } from 'react';

type CheckboxItem = {
  id: number;
  name: string;
  checked: boolean | 'indeterminate';
  children?: CheckboxItem[];
};

export default function Checkboxes({
  defaultCheckboxData,
}: Readonly<{
  defaultCheckboxData: ReadonlyArray<CheckboxItem>;
}>) {
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
