import { useState } from 'react';

export default function App() {
  const [message, setMessage] = useState('Hello World!');

  return <div>{message}</div>;
}
