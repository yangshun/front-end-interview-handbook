import AuthOneClickSignup from '~/components/auth/AuthOneClickSignUp';

type Props = Readonly<{
  children: React.ReactNode;
}>;

export const metadata = {
  title: {
    template: '%s',
  },
};

export default function InterviewsLayout({ children }: Props) {
  return (
    <>
      <AuthOneClickSignup />
      {children}
    </>
  );
}
