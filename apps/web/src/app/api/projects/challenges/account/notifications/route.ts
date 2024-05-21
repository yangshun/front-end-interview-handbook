import { cloneDeep, merge } from 'lodash-es';
import { type NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

export const dynamic = 'force-dynamic';

const NotificationCategories = z.enum([
  'comments',
  'features',
  'friend_requests',
  'friend_updates',
  'marketing',
]);
const NotificationChannels = z.enum(['email', 'push', 'sms']);
const PreferencesRecord = z.record(
  NotificationCategories,
  z.record(NotificationChannels, z.boolean()),
);

type NotificationPreferences = z.infer<typeof PreferencesRecord>;

export async function OPTIONS() {
  return NextResponse.json({});
}

const INITIAL_DATA: NotificationPreferences = {
  comments: {
    email: true,
    push: false,
    sms: false,
  },
  features: {
    email: true,
    push: false,
    sms: false,
  },
  friend_requests: {
    email: true,
    push: false,
    sms: false,
  },
  friend_updates: {
    email: true,
    push: false,
    sms: false,
  },
  marketing: {
    email: true,
    push: false,
    sms: false,
  },
};

export async function GET() {
  return NextResponse.json({ preferences: INITIAL_DATA });
}

type FormBody = Readonly<{
  preferences?: NotificationPreferences;
}>;

export async function PUT(req: NextRequest) {
  const { preferences }: FormBody = await req.json();

  const result = PreferencesRecord.safeParse(preferences);

  if (!result.success) {
    return NextResponse.json({ error: 'Invalid notifications preferences.' });
  }

  return NextResponse.json({
    preferences: merge(cloneDeep(INITIAL_DATA), result.data),
  });
}
