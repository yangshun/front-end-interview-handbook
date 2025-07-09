import clsx from 'clsx';
import { addDays } from 'date-fns';

/* eslint-disable react/no-array-index-key */

const thClassname =
  'sticky top-0 z-10 px-2 py-2 text-left text-sm font-semibold text-gray-100 bg-gray-900 align-top';
const tdClassname = 'px-2 py-2 text-sm text-gray-900';

export type SignupData = Readonly<{
  date: string;
  signUps: string;
}>;

export type EmailSignupData = Readonly<{
  confirmedEmailSignUps: string;
  date: string;
  emailSignUps: string;
}>;

export type DayData = Readonly<{
  _rowId: string;
  _time: string;
  data: Readonly<{
    CheckoutInitiate: number;
    CheckoutInitiateRate: string;
    CheckoutInitiateSameDay: number;
    CheckoutInitiateSameDayRate: string;
    CheckoutSuccess: number;
    CheckoutSuccessRate: string;
    CheckoutSuccessSameDay: number;
    CheckoutSuccessSameDayRate: string;
    NumFirstVisits: number;
    NumVisits: number;
    time: string;
  }>;
}>;

const startOfWeekDay = 1; // Monday

const dateFormat = {
  day: '2-digit',
  month: 'short',
} as const;

// A helper to parse percent values safely
function parsePercent(value: string) {
  const num = parseFloat(value);

  return isNaN(num) ? 0 : num;
}

export default function ConversionsTable({
  conversions,
  emailSignUps,
  signUps,
}: {
  conversions: ReadonlyArray<DayData>;
  emailSignUps: ReadonlyArray<EmailSignupData>;
  signUps: ReadonlyArray<SignupData>;
}) {
  const conversionsRows = conversions
    .slice()
    .sort(
      (a, b) =>
        new Date(a.data.time).getTime() - new Date(b.data.time).getTime(),
    );

  const signUpByDate = signUps.reduce((acc, signup, index) => {
    const date = new Date(signup.date).toLocaleDateString('en-SG');
    const emailSignUpDay = emailSignUps[index];

    return {
      ...acc,
      [date]: {
        confirmedEmailSignUps: Number(emailSignUpDay.confirmedEmailSignUps),
        emailSignUps: Number(emailSignUpDay.emailSignUps),
        signUps: Number(signup.signUps),
      },
    };
  }, {}) as Record<
    string,
    { confirmedEmailSignUps: number; emailSignUps: number; signUps: number }
  >;

  const firstStartOfWeekIndex = conversionsRows.findIndex((row) => {
    const date = new Date(row.data.time);

    return date.getDay() === startOfWeekDay;
  });

  // Precompute numeric values per column for percentile calculation
  const numericColumnValues: Record<string, Array<number>> = {
    CheckoutInitiate: conversionsRows.map((r) => r.data.CheckoutInitiate),
    CheckoutInitiateRate: conversionsRows.map((r) =>
      parsePercent(r.data.CheckoutInitiateRate),
    ),
    CheckoutInitiateSameDayRate: conversionsRows.map((r) =>
      parsePercent(r.data.CheckoutInitiateSameDayRate),
    ),
    CheckoutSuccess: conversionsRows.map((r) => r.data.CheckoutSuccess),
    CheckoutSuccessRate: conversionsRows.map((r) =>
      parsePercent(r.data.CheckoutSuccessRate),
    ),
    CheckoutSuccessSameDay: conversionsRows.map(
      (r) => r.data.CheckoutSuccessSameDay,
    ),
    CheckoutSuccessSameDayRate: conversionsRows.map((r) =>
      parsePercent(r.data.CheckoutSuccessSameDayRate),
    ),
    NumFirstVisits: conversionsRows.map((r) => r.data.NumFirstVisits),
    NumVisits: conversionsRows.map((r) => r.data.NumVisits),
  };

  const columns: Array<{
    getValue: (
      row: DayData,
      signUp:
        | {
            confirmedEmailSignUps: number;
            emailSignUps: number;
            signUps: number;
          }
        | undefined,
    ) => React.ReactNode;
    header: React.ReactNode;
    key: string | null; // Null for non-numeric columns
  }> = [
    {
      getValue: (row) =>
        new Date(row.data.time).toLocaleDateString('en-US', dateFormat),
      header: 'Date',
      key: null,
    },
    {
      getValue: (row) => row.data.NumVisits,
      header: 'Non-purchasers',
      key: 'NumVisits',
    },
    {
      getValue: (row) => row.data.NumFirstVisits,
      header: 'First visits',
      key: 'NumFirstVisits',
    },
    {
      getValue: (row) => row.data.CheckoutInitiate,
      header: 'Checkout initiates',
      key: 'CheckoutInitiate',
    },
    {
      getValue: (row) => `${row.data.CheckoutInitiateRate}%`,
      header: <>Checkout initiate rate</>,
      key: 'CheckoutInitiateRate',
    },
    {
      getValue: (row) => `${row.data.CheckoutInitiateSameDayRate}%`,
      header: (
        <>
          Checkout initiate rate
          <br />
          (same day)
        </>
      ),
      key: 'CheckoutInitiateSameDayRate',
    },
    {
      getValue: (row) => row.data.CheckoutSuccess,
      header: 'New payments',
      key: 'CheckoutSuccess',
    },
    {
      getValue: (row) => `${row.data.CheckoutSuccessRate}%`,
      header: 'Conversion rate',
      key: 'CheckoutSuccessRate',
    },
    {
      getValue: (row) => row.data.CheckoutSuccessSameDay,
      header: (
        <>
          New payments
          <br />
          (same day)
        </>
      ),
      key: 'CheckoutSuccessSameDay',
    },
    {
      getValue: (row) => `${row.data.CheckoutSuccessSameDayRate}%`,
      header: (
        <>
          Conversion rate
          <br />
          (same day)
        </>
      ),
      key: 'CheckoutSuccessSameDayRate',
    },
    {
      getValue: (_row, signUp) => signUp?.signUps ?? 0,
      header: 'Signups',
      key: null,
    },
    {
      getValue: (_row, signUp) =>
        signUp && signUp.signUps > 0
          ? `${((signUp.confirmedEmailSignUps / signUp.emailSignUps) * 100).toFixed(2)}%`
          : '-',
      header: 'Email verification rate',
      key: null,
    },
  ];

  // Helper to compute percentile rank
  function getPercentile(value: number, allValues: Array<number>): number {
    const sorted = [...allValues].sort((a, b) => a - b);
    const index = sorted.findIndex((v) => v >= value);
    const rank = index === -1 ? sorted.length : index + 1;

    return (rank / sorted.length) * 100;
  }

  // Helper to get background color
  function getBackground(percentile: number): string {
    const bucket = Math.floor(percentile / 10) * 10;

    if (bucket <= 5) return 'bg-red-500/50';
    if (bucket <= 15) return 'bg-red-400/50';
    if (bucket <= 25) return 'bg-red-300/50';
    if (bucket <= 35) return 'bg-red-200/50';
    if (bucket <= 45) return 'bg-red-100/50';
    if (bucket <= 55) return 'bg-white';
    if (bucket <= 65) return 'bg-green-100/50';
    if (bucket <= 75) return 'bg-green-200/50';
    if (bucket <= 85) return 'bg-green-300/50';
    if (bucket <= 95) return 'bg-green-400/50';

    return 'bg-green-500/50';
  }

  return (
    <table className="min-w-full border border-gray-200">
      <thead>
        <tr className="bg-gray-800">
          <th className={thClassname} scope="col">
            Week
          </th>
          {columns.map((col, i) => (
            <th key={i} className={thClassname} scope="col">
              {col.header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-200 bg-white">
        {conversionsRows.map((row, index) => {
          const date = new Date(row.data.time);
          const isStartOfWeek = date.getDay() === startOfWeekDay;
          const signUp = signUpByDate[date.toLocaleDateString('en-SG')];

          return (
            <tr key={row._rowId}>
              {index === 0 && !isStartOfWeek && (
                <td
                  className={clsx(tdClassname, 'border-r border-gray-200')}
                  rowSpan={firstStartOfWeekIndex}
                />
              )}
              {isStartOfWeek && (
                <td
                  className={clsx(tdClassname, 'border-r border-gray-200')}
                  rowSpan={7}>
                  {date.toLocaleDateString('en-US', dateFormat)} to{' '}
                  {addDays(date, 7).toLocaleDateString('en-US', dateFormat)}
                </td>
              )}
              {columns.map((col, index_) => {
                let bgClass = '';

                if (col.key && numericColumnValues[col.key]) {
                  const rawValue = col.key.endsWith('Rate')
                    ? // @ts-expect-error: vibe coded
                      parsePercent(row.data[col.key])
                    : // @ts-expect-error: vibe coded
                      row.data[col.key];
                  const percentile = getPercentile(
                    rawValue,
                    numericColumnValues[col.key],
                  );

                  bgClass = getBackground(percentile);
                }

                return (
                  <td key={index_} className={clsx(tdClassname, bgClass)}>
                    {col.getValue(row, signUp)}
                  </td>
                );
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
