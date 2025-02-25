import clsx from 'clsx';
import { useState } from 'react';
import { RiArrowRightLine } from 'react-icons/ri';
import { useSet } from 'react-use';

import InterviewsMarketingHeroBrowserWindowFrame from '~/components/interviews/marketing/embed/InterviewsMarketingHeroBrowserWindowFrame';
import { SponsorAdFormatConfigs } from '~/components/sponsors/SponsorsAdFormatConfigs';
import Button from '~/components/ui/Button';
import Label from '~/components/ui/Label';
import TextInput from '~/components/ui/TextInput';

import SponsorsAdvertiseRequestFormAdsSectionAvailability from '../SponsorsAdvertiseRequestFormAdsSectionAvailability';
import SponsorsAdFormatGlobalBanner from '../../ads/SponsorsAdFormatGlobalBanner';

type Props = Readonly<{
  onCancel?: () => void;
  onSubmit: ({
    text,
    url,
    weeks,
  }: Readonly<{
    text: string;
    url: string;
    weeks: Set<string>;
  }>) => void;
}>;

export default function SponsorsAdvertiseRequestFormAdsSectionGlobalBanner({
  onCancel,
  onSubmit,
}: Props) {
  const [selectedWeeks, selectedWeeksActions] = useSet<string>();
  const [text, setText] = useState('');
  const [url, setURL] = useState('');

  return (
    <div className="flex flex-col gap-12">
      <SponsorsAdvertiseRequestFormAdsSectionAvailability
        adFormat="GLOBAL_BANNER"
        selectedWeeks={selectedWeeks}
        selectedWeeksActions={selectedWeeksActions}
      />
      <div>
        <Label
          description="Configure your global banner and upload the required assets"
          label="Global banner configuration"
        />
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          <TextInput
            description={`Maximum of ${SponsorAdFormatConfigs.GLOBAL_BANNER.placementConstraints.text} characters`}
            label="Title"
            maxLength={
              SponsorAdFormatConfigs.GLOBAL_BANNER.placementConstraints.text
            }
            required={true}
            value={text}
            onChange={(value) => setText(value)}
          />
          <TextInput
            description="Destination for banner clicks"
            label="URL"
            placeholder="https://www.example.com"
            required={true}
            type="url"
            value={url}
            onChange={(value) => setURL(value)}
          />
        </div>
      </div>
      <div>
        <Label
          description="See how your ad looks like when it goes live"
          label="Preview"
        />
        <div className="mt-4">
          <InterviewsMarketingHeroBrowserWindowFrame>
            <SponsorsAdFormatGlobalBanner
              isLoading={false}
              text={text || 'Your ad text here'}
              url="#"
            />
            <div className="flex h-[300px] w-full items-stretch justify-stretch p-3">
              <div
                className={clsx(
                  'size-full rounded-md',
                  'border-2 border-dashed border-neutral-500',
                  'bg-neutral-200/25 dark:bg-neutral-700/25',
                )}
              />
            </div>
          </InterviewsMarketingHeroBrowserWindowFrame>
        </div>
      </div>
      <div className="flex justify-end gap-2">
        {onCancel && (
          <Button
            label="Cancel"
            size="md"
            variant="secondary"
            onClick={() => {
              onCancel();
            }}
          />
        )}
        <Button
          icon={RiArrowRightLine}
          label="Next"
          size="md"
          variant="primary"
          onClick={() => {
            onSubmit({
              text,
              url,
              weeks: selectedWeeks,
            });
          }}
        />
      </div>
    </div>
  );
}
