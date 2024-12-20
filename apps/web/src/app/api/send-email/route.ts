import { type NextRequest, NextResponse } from 'next/server';

import { sendCompletedSomeQuestionsEmail } from '~/emails/completedSomeQuestionsEmail';

export async function POST(req: NextRequest) {
  try {
    const result = await req.json();
    const { email, name, emailTemplate, userId } = result;

    const finalName = name || 'User';

    if (emailTemplate === 'completed_some_questions') {
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
