import { type NextRequest, NextResponse } from 'next/server';

import type { EmailKey } from '~/emails/EmailsTypes';
import {
  sendInitiateCheckoutFirstTimeEmail,
  sendInitiateCheckoutMultipleTimesEmail,
} from '~/emails/items/checkout/EmailsSenderCheckoutInitiate';
import sendCompletedSomeQuestionsEmail from '~/emails/items/questions-completion/EmailsSenderCompletedSomeQuestions';
import {
  sendWelcomeEmailAfter24Hours,
  sendWelcomeEmailImmediate,
} from '~/emails/items/welcome/EmailsSenderWelcomeSeries';

export async function POST(
  req: NextRequest,
  { params }: { params: { key: EmailKey } },
) {
  try {
    const { key } = params;
    const request = await req.json();
    const { email, name, userId } = request;

    const finalName = name || 'there';

    switch (key) {
      case 'welcome_email_immediate':
        await sendWelcomeEmailImmediate({
          email,
          name: finalName,
          signupViaInterviews: request.signupViaInterviews,
          userId,
        });
        break;
      case 'welcome_email_after_24_hours':
        await sendWelcomeEmailAfter24Hours({
          email,
          name: finalName,
          userId,
        });
        break;
      case 'checkout_first_time':
        await sendInitiateCheckoutFirstTimeEmail({
          email,
          name: finalName,
          userId,
        });
        break;
      case 'checkout_multiples_times':
        await sendInitiateCheckoutMultipleTimesEmail({
          email,
          name: finalName,
          userId,
        });
        break;
      case 'completed_some_questions':
        await sendCompletedSomeQuestionsEmail({
          email,
          name: finalName,
          userId,
        });
        break;
      default:
        return NextResponse.json(
          { error: `Invalid email key '${key}'` },
          { status: 400 },
        );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
