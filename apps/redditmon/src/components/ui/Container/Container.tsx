import clsx from 'clsx';

type Props = React.ComponentProps<'div'> &
  Readonly<{
    children: React.ReactNode;
    className?: string;
  }>;

export default function Container({ children, className, ...props }: Props) {
  return (
    <div
      className={clsx('mx-auto w-full', 'max-w-screen-xl', className)}
      {...props}>
      {children}
    </div>
  );
}
