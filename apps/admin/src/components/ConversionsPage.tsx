'use client';

import clsx from 'clsx';
import { useState } from 'react';
import useSWR from 'swr';

import type { DayData, EmailSignupData, SignupData } from './ConversionsTable';
import ConversionsTable from './ConversionsTable';

type ConversionsData = Readonly<{
  conversions: ReadonlyArray<DayData>;
  emailSignUps: ReadonlyArray<EmailSignupData>;
  signUps: ReadonlyArray<SignupData>;
}>;

type CountryFilter = 'exclude' | 'include' | 'none';

export default function ConversionsPage() {
  const [country, setCountry] = useState<string | null>(null);
  const [countryFilter, setCountryFilter] = useState<CountryFilter>('none');

  const queryParams = (() => {
    if (countryFilter === 'include') {
      return { country_include: country };
    }

    if (countryFilter === 'exclude') {
      return { country_exclude: country };
    }

    return {};
  })();

  const { data, error, isLoading } = useSWR<ConversionsData>(
    { query: queryParams, url: '/api/conversions' },
    {
      fetcher: ({
        query,
        url,
      }: Readonly<{ query: Record<string, string>; url: string }>) =>
        fetch(`${url}?${new URLSearchParams(query)}`, {
          headers: { 'Content-Type': 'application/json' },
          method: 'GET',
        }).then((res) => res.json()),
    },
  );

  return (
    <div className="flex flex-col gap-2 p-4">
      <h1 className="text-2xl font-bold">Critical data</h1>
      <FilterForm
        onSubmit={({
          country: countryParam,
          countryFilter: countryFilterParam,
        }) => {
          setCountryFilter(countryFilterParam);
          setCountry(countryParam);
        }}
      />
      {isLoading && <div className="text-sm">Loading...</div>}
      {error && (
        <div className="text-sm text-red-600">Error: {error.toString()}</div>
      )}
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

function FilterForm({
  onSubmit,
}: {
  onSubmit: ({
    country,
    countryFilter,
  }: Readonly<{ country: string; countryFilter: CountryFilter }>) => void;
}) {
  const [countryFilter, setCountryFilter] = useState<CountryFilter>('none');

  return (
    <form
      className={clsx(
        'flex items-center gap-4 p-3',
        'rounded-lg border border-gray-300',
      )}
      onSubmit={(e) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);

        onSubmit({
          country: formData.get('country') as string,
          countryFilter: formData.get('countryFilter') as CountryFilter,
        });
      }}>
      <fieldset>
        <legend className="text-sm/6 font-semibold text-gray-900">
          Country
        </legend>
        <div className="flex items-end gap-4">
          {(
            [
              {
                label: 'None',
                value: 'none',
              },
              {
                label: 'Include only',
                value: 'include',
              },
              {
                label: 'Exclude',
                value: 'exclude',
              },
            ] as const
          ).map((option) => (
            <label
              key={option.value}
              className="flex items-center gap-1 text-sm">
              <input
                checked={countryFilter === option.value}
                name="countryFilter"
                type="radio"
                value="include"
                onChange={() => setCountryFilter(option.value)}
              />
              {option.label}
            </label>
          ))}
        </div>
      </fieldset>
      {countryFilter !== 'none' && (
        <label className="flex items-center gap-2">
          <input
            className="rounded border border-neutral-300 p-1 text-sm"
            name="country"
            placeholder="Country (e.g. US)"
            type="text"
          />
        </label>
      )}
      <button
        className="mt-2 rounded-full bg-blue-500 px-4 py-2 text-sm text-white"
        type="submit">
        Search
      </button>
    </form>
  );
}
