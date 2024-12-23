import { type NextRequest, NextResponse } from 'next/server';

import {
  sendInitiateCheckoutFirstTimeEmail,
  sendInitiateCheckoutMultipleTimesEmail,
} from '~/emails/items/checkout/EmailsSenderCheckoutInitiate';
import sendCompletedSomeQuestionsEmail from '~/emails/items/questions-completion/EmailsSenderCompletedSomeQuestions';
import {
  sendWelcomeEmailAfter24Hours,
  sendWelcomeEmailImmediate,
} from '~/emails/items/welcome/EmailsSenderWelcomeSeries';

export async function POST(req: NextRequest) {
  try {
    const request = await req.json();
    const { email, emailKey, name, signedUpViaInterviews, userId } = request;

    switch (emailKey) {
      case 'INTERVIEWS_WELCOME_EMAIL_IMMEDIATE':
        await sendWelcomeEmailImmediate({
          email,
          name,
          signedUpViaInterviews,
          userId,
        });
        break;
      case 'INTERVIEWS_WELCOME_EMAIL_24_HOURS':
        await sendWelcomeEmailAfter24Hours({
          email,
          name,
          userId,
        });
        break;
      case 'CHECKOUT_FIRST_TIME':
        await sendInitiateCheckoutFirstTimeEmail({
          email,
          name,
          userId,
        });
        break;
      case 'CHECKOUT_MULTIPLE_TIMES':
        await sendInitiateCheckoutMultipleTimesEmail({
          email,
          name,
          userId,
        });
        break;
      case 'INTERVIEWS_COMPLETED_SOME_QUESTIONS':
        await sendCompletedSomeQuestionsEmail({
          email,
          name,
          userId,
        });
        break;
      default:
        return NextResponse.json(
          { error: `Invalid email key '${emailKey}'` },
          { status: 400 },
        );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
