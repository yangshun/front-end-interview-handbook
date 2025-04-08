import { useState } from 'react';

export default function FileExplorer({ data }) {
  const [message, setMessage] = useState('Hello world');

  return (
    <div>
      <h1>{message}</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}
