import { type NextRequest, NextResponse } from 'next/server';

import { EmailsItemConfigs } from '~/emails/items/EmailItemConfigs';
import { sendReactEmail } from '~/emails/mailjet/EmailsMailjetClient';
import { getErrorMessage } from '~/utils/getErrorMessage';

/**
 * This route is only meant for development purposes
 */
export async function POST(req: NextRequest) {
  if (process.env.NEXT_PUBLIC_VERCEL_ENV === 'production') {
    return NextResponse.json(
      { error: 'Not allowed to be called in production' },
      { status: 401 },
    );
  }

  try {
    const request = await req.json();
    const { emailKey, email, name, props } = request;

    const emailItemConfig = EmailsItemConfigs.find(
      (itemConfig) => itemConfig.id === emailKey,
    );

    if (emailItemConfig == null) {
      return NextResponse.json(
        { error: `No email config found for emailKey '${emailKey}'` },
        { status: 500 },
      );
    }

    const Component = emailItemConfig.component;
    const emailElement = <Component {...props} />;

    const result = await sendReactEmail({
      emailElement,
      from: emailItemConfig.from,
      subject: emailItemConfig.subject(props),
      to: {
        email,
        name,
      },
    });

    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json(
      { error: getErrorMessage(error) },
      { status: 500 },
    );
  }
}
