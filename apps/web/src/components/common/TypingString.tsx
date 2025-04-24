import { useInView } from 'motion/react';
import { useEffect, useRef } from 'react';

import useTypingString from '~/hooks/useTypingString';

export default function TypingString({
  characters,
  interval,
}: Readonly<{
  characters: string;
  interval?: number;
}>) {
  const ref = useRef(null);
  const startTyping = useInView(ref, {
    amount: 'all',
    once: true,
  });
  const { value, start } = useTypingString(characters, interval);

  useEffect(() => {
    if (startTyping) {
      start();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [startTyping]);

  return <span ref={ref}>{value}</span>;
}
