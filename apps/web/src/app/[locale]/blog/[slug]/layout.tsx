import clsx from 'clsx';

type Props = Readonly<{
  children: React.ReactNode;
}>;

export default function BlogArticleLayout({ children }: Props) {
  return (
    <div
      style={{
        marginTop: 'calc(var(--global-sticky-height) * -1)',
        paddingTop: 'var(--global-sticky-height)',
      }}>
      <div className={clsx('flex w-full')}>{children}</div>
    </div>
  );
}
