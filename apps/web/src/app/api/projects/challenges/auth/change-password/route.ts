import { type NextRequest, NextResponse } from 'next/server';

import { usersById, validatePassword } from '../ProjectsFakeAPIAuthUtils';

export const dynamic = 'force-dynamic';

type FormBody = Readonly<{
  new_password?: string;
  password?: string;
  user_id?: number;
}>;

export async function OPTIONS() {
  return NextResponse.json({});
}

export async function POST(req: NextRequest) {
  const {
    new_password,
    password,
    user_id: userId,
  }: FormBody = await req.json();

  if (!userId) {
    return NextResponse.json(
      { error: 'User ID is required.' },
      { status: 422 },
    );
  }

  const user = usersById[userId];

  if (!user) {
    return NextResponse.json({ error: 'Non-existent user' }, { status: 401 });
  }

  if (!password) {
    return NextResponse.json(
      { error: 'Current password is required.' },
      { status: 422 },
    );
  }

  if (password !== user.password) {
    return NextResponse.json(
      { error: 'Current password is not correct.' },
      { status: 403 },
    );
  }

  if (!new_password) {
    return NextResponse.json(
      { error: 'New password is required.' },
      { status: 422 },
    );
  }

  const { error, valid } = validatePassword(new_password);

  if (!valid) {
    return NextResponse.json({ error }, { status: 401 });
  }

  return NextResponse.json({
    user: {
      email: user.email,
      id: user.id,
      name: user.name,
    },
  });
}
