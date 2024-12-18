import { type NextRequest, NextResponse } from 'next/server';

import { sendCompletedSomeQuestionsEmail } from '~/emails/completedSomeQuestionsEmail';
import { MAILJET_TEMPLATE } from '~/mailjet/mailjet';

export async function POST(req: NextRequest) {
  try {
    const result = await req.json();
    const { email, name, emailTemplate, userId } = result;

    const finalName = name || 'User';

    if (emailTemplate === MAILJET_TEMPLATE.completedSomeQuestionsEmail.name) {
      await sendCompletedSomeQuestionsEmail({
        email,
        name: finalName,
        userId,
      });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
