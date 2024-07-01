type Props = Readonly<{
  children: React.ReactNode;
}>;

export default function Layout({ children }: Props) {
  return <div className="flex min-h-screen p-4">{children}</div>;
}
