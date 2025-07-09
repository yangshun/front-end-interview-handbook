'use client';

import { useEffect, useState } from 'react';

import type { DayData, EmailSignupData, SignupData } from './ConversionsTable';
import ConversionsTable from './ConversionsTable';

export default function ConversionsPage() {
  const [data, setData] = useState<{
    conversions: ReadonlyArray<DayData>;
    emailSignUps: ReadonlyArray<EmailSignupData>;
    signUps: ReadonlyArray<SignupData>;
  } | null>(null);

  useEffect(() => {
    // This is where you would fetch conversion data or any other necessary data
    // For example, you could use fetch or axios to get data from an API endpoint
    fetch('/api/conversions')
      .then((response) => response.json())
      .then((data_) => {
        setData(data_);
      })
      .catch((error) => {
        console.error('Error fetching conversion data:', error);
      });
  }, []);

  return (
    <div className="flex flex-col gap-2 p-4">
      <h1 className="text-2xl font-bold">Critical data</h1>
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
