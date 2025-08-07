type Props = Readonly<{
  children: React.ReactNode;
}>;

export const metadata = {
  title: {
    template: '%s',
  },
};

export default function InterviewsLayout({ children }: Props) {
  return children;
}
