'use client';

import useSWR from 'swr';

import type { DayData, EmailSignupData, SignupData } from './ConversionsTable';
import ConversionsTable from './ConversionsTable';

type ConversionsData = Readonly<{
  conversions: ReadonlyArray<DayData>;
  emailSignUps: ReadonlyArray<EmailSignupData>;
  signUps: ReadonlyArray<SignupData>;
}>;

export default function ConversionsPage() {
  const { data, error, isLoading } = useSWR<ConversionsData>(
    '/api/conversions',
    {
      fetcher: (url: string) => fetch(url).then((res) => res.json()),
    },
  );

  return (
    <div className="flex flex-col gap-2 p-4">
      <h1 className="text-2xl font-bold">Critical data</h1>
      {isLoading && <div className="text-sm">Loading...</div>}
      {error && <div>Error: {error.toString()}</div>}
      {data && (
        <ConversionsTable
          conversions={data.conversions}
          emailSignUps={data.emailSignUps}
          signUps={data.signUps}
        />
      )}
    </div>
  );
}
