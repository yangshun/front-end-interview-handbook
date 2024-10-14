import { useRef, useState } from 'react';

export default function useTypingString(characters: string, interval = 100) {
  const indexRef = useRef(0);
  const [index, setIndex] = useState(indexRef.current);

  function start() {
    const timer = setInterval(() => {
      indexRef.current++;

      const newIndex = indexRef.current;

      setIndex(newIndex);

      if (newIndex === characters.length) {
        clearInterval(timer);
      }
    }, interval);
  }

  return {
    start,
    value: characters.slice(0, index),
  };
}
