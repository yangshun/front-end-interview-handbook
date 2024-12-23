import EmailsSendStatus from '~/emails/EmailsSendStatus';
import { sendReactEmail } from '~/emails/mailjet/EmailsMailjetSender';

import EmailsTemplateCompletedSomeQuestions from './EmailsTemplateCompletedSomeQuestions';

export default async function sendCompletedSomeQuestionsEmail({
  name,
  email,
  userId,
}: Readonly<{
  email: string;
  name: string | null;
  userId: string;
}>) {
  const sendStatus = new EmailsSendStatus(
    'INTERVIEWS_COMPLETED_SOME_QUESTIONS',
    userId,
  );

  if (await sendStatus.isSent()) {
    return;
  }

  try {
    await sendReactEmail({
      component: <EmailsTemplateCompletedSomeQuestions />,
      from: {
        email: 'hello@greatfrontend.com',
        name: 'GreatFrontEnd',
      },
      subject: "Don't Miss Out: Up to 100% off premium",
      to: {
        email,
        name,
      },
    });
    await sendStatus.markAsSent();
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
}
