import { type NextRequest, NextResponse } from 'next/server';

import type { EmailKey } from '~/emails/EmailsTypes';
import {
  sendInitiateCheckoutFirstTimeEmail,
  sendInitiateCheckoutMultipleTimesEmail,
} from '~/emails/items/checkout/EmailsSenderCheckoutInitiate';
import { sendCompletedSomeQuestionsEmail } from '~/emails/items/questions-completion/EmailsSenderCompletedSomeQuestions';
import {
  sendWelcomeEmailAfter24Hours,
  sendWelcomeEmailImmediate,
} from '~/emails/items/welcome/EmailsSenderWelcomeSeries';

export async function POST(
  req: NextRequest,
  { params }: { params: { purpose: EmailKey } },
) {
  try {
    const result = await req.json();
    const { email, name, userId } = result;
    const { purpose } = params;

    const finalName = name || 'there';

    switch (purpose) {
      case 'welcome_email_immediate':
        await sendWelcomeEmailImmediate({
          email,
          name: finalName,
          signupViaInterviews: result.signupViaInterviews,
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
        return NextResponse.json({ error: 'Invalid purpose' }, { status: 400 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
