'use client';

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
      <form
        className="flex items-center gap-4"
        onSubmit={(e) => {
          e.preventDefault();

          const formData = new FormData(e.currentTarget);

          setCountry(formData.get('country') as string);
          setCountryFilter(formData.get('countryFilter') as CountryFilter);
        }}>
        <label className="flex items-center gap-2">
          <input
            className="rounded border border-neutral-300 p-1 text-sm"
            defaultValue={country ?? ''}
            name="country"
            placeholder="Country (e.g. US)"
            type="text"
          />
        </label>
        <div className="flex items-center gap-2">
          <label className="flex items-center gap-2 text-sm">
            <input
              defaultChecked={countryFilter === 'none'}
              name="countryFilter"
              type="radio"
              value="none"
            />
            None
          </label>
          <label className="flex items-center gap-2 text-sm">
            <input
              defaultChecked={countryFilter === 'include'}
              name="countryFilter"
              type="radio"
              value="include"
            />
            Only include
          </label>
          <label className="flex items-center gap-2 text-sm">
            <input
              defaultChecked={countryFilter === 'exclude'}
              name="countryFilter"
              type="radio"
              value="exclude"
            />
            Exclude
          </label>
        </div>
        <button
          className="mt-2 rounded-full bg-blue-500 px-4 py-2 text-sm text-white"
          type="submit">
          Search
        </button>
      </form>
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
