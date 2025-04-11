import AuthOneClickSignup from '~/components/auth/AuthOneClickSignUp';
import AuthSignupDialogProvider from '~/components/auth/AuthSignupDialogContext';

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
    <AuthSignupDialogProvider>
      <AuthOneClickSignup />
      {children}
    </AuthSignupDialogProvider>
  );
}
