import clsx from 'clsx';

export default function KeyboardChar({ char }: { char: string }) {
  return (
    <kbd
      className={clsx(
        'inline-flex items-center justify-center',
        'size-5',
        'rounded border border-gray-500',
      )}>
      {char}
    </kbd>
  );
}
