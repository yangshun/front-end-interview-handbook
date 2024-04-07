type Props = Readonly<{
  children: React.ReactNode;
}>;

export default function BlogSeriesLayout({ children }: Props) {
  return (
    <div
      className="theme-bg-radial-glow before:opacity-30"
      style={{
        marginTop: 'calc(var(--global-sticky-height) * -1)',
        paddingTop: 'var(--global-sticky-height)',
      }}>
      <div className="flex w-full">{children}</div>
    </div>
  );
}
