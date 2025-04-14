import { useState } from 'react';

const WORDS = Object.freeze([
  'APPLE',
  'BEAST',
  'FAINT',
  'FEAST',
  'FRUIT',
  'GAMES',
  'PAINT',
  'PASTE',
  'TOWER',
  'REACT',
]);

export default function App() {
  const [message, setMessage] = useState('Hello World!');

  return <div>{message}</div>;
}
