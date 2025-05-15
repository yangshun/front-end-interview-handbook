import { type NextRequest, NextResponse } from 'next/server';

type FormBody = Readonly<{
  email?: string;
  message?: string;
  name?: string;
}>;

export async function OPTIONS() {
  return NextResponse.json({});
}

export async function POST(req: NextRequest) {
  const { email, message, name }: FormBody = await req.json();

  // Perform simple field validations, as long as they are not empty.
  if (!name) {
    return NextResponse.json(
      { error: 'Name cannot be empty' },
      { status: 422 },
    );
  }

  if (!email) {
    return NextResponse.json(
      { error: 'Email cannot be empty' },
      { status: 422 },
    );
  }

  if (!message) {
    return NextResponse.json(
      { error: 'Message cannot be empty' },
      { status: 422 },
    );
  }

  return NextResponse.json({
    message:
      'Submission successful! We will get back to you in 3-5 days via email.',
  });
}
