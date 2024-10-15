import clsx from 'clsx';
import { Fragment } from 'react';

export default function FadeInSentence({
  isVisible,
  sentence,
}: Readonly<{ isVisible: boolean; sentence: string }>) {
  const words = sentence.split(/\s+/);

  return (
    <>
      {words.map((word, index) => (
        <Fragment
          // eslint-disable-next-line react/no-array-index-key
          key={index}>
          {index > 0 && ' '}
          <span
            className={clsx(
              'inline-block',
              'transition-all',
              'duration-1000',
              'will-change-[transform,filter,opacity]',
              !isVisible && '-translate-x-5 opacity-0 blur-lg',
            )}
            style={{
              animationDelay: `${0 + index * 100}ms`,
              transitionDelay: `${0 + index * 100}ms`,
            }}>
            {word}
          </span>
        </Fragment>
      ))}
    </>
  );
}
