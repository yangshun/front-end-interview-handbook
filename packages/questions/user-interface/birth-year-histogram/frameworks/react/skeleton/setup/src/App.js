import { useState } from 'react';

export default function App() {
  const [message] = useState('Hello World!');

  return <div>{message}</div>;
}
