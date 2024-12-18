import { type NextRequest, NextResponse } from 'next/server';

import {
  sendInitiateCheckoutFirstTimeEmail,
  sendInitiateCheckoutMultipleTimesEmail,
} from '~/emails/checkoutEmail/initiateCheckoutEmail';
import { sendCompletedSomeQuestionsEmail } from '~/emails/completedSomeQuestionsEmail';
import {
  sendWelcomeEmailAfter24Hours,
  sendWelcomeEmailImmediate,
} from '~/emails/welcomeSeriesEmail';
import { MAILJET_TEMPLATE } from '~/mailjet/mailjet';

export async function POST(
  req: NextRequest,
  { params }: { params: { purpose: string } },
) {
  try {
    const result = await req.json();
    const { email, name, userId } = result;
    const { purpose } = params;

    const finalName = name || 'there';

    switch (purpose) {
      case MAILJET_TEMPLATE.welcomeEmailImmediate.name:
        await sendWelcomeEmailImmediate({
          email,
          name: finalName,
          signupViaInterviews: result.signupViaInterviews,
          userId,
        });
        break;

      case MAILJET_TEMPLATE.welcomeEmailAfter24Hours.name:
        await sendWelcomeEmailAfter24Hours({
          email,
          name: finalName,
          userId,
        });
        break;
      case MAILJET_TEMPLATE.initiateCheckoutFirstTime.name:
        await sendInitiateCheckoutFirstTimeEmail({
          email,
          name: finalName,
          userId,
        });
        break;
      case MAILJET_TEMPLATE.initiateCheckoutMultipleTimes.name:
        await sendInitiateCheckoutMultipleTimesEmail({
          email,
          name: finalName,
          userId,
        });
        break;
      case MAILJET_TEMPLATE.completedSomeQuestionsEmail.name:
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
