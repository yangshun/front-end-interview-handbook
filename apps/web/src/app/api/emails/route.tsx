import { type NextRequest, NextResponse } from 'next/server';

import { EmailsItemSponsorsConfig } from '~/emails/items/EmailItemConfigs';
import { sendReactEmail } from '~/emails/mailjet/EmailsMailjetUtils';
import { getErrorMessage } from '~/utils/getErrorMessage';

/**
 * This route is for triggering email directly from trpc call
 * and not expose to public
 */
export async function POST(req: NextRequest) {
  const { searchParams } = req.nextUrl;

  if (searchParams.get('api_route_secret') !== process.env.API_ROUTE_SECRET) {
    return NextResponse.json(
      { error: 'You are not authorized to call this API' },
      { status: 401 },
    );
  }

  try {
    const request = await req.json();
    const { emailKey, email, name, props } = request;

    const emailItemConfig = EmailsItemSponsorsConfig.find(
      (itemConfig) => itemConfig.id === emailKey,
    );

    if (emailItemConfig == null) {
      return NextResponse.json(
        { error: `No email config found for emailKey '${emailKey}'` },
        { status: 500 },
      );
    }

    const recipient = {
      email,
      name,
    };

    const Component = emailItemConfig.component;
    const emailElement = <Component {...props} />;

    const result = await sendReactEmail({
      emailElement,
      from: emailItemConfig.from,
      subject: emailItemConfig.subject(props),
      to: recipient,
    });

    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json(
      { error: getErrorMessage(error) },
      { status: 500 },
    );
  }
}
