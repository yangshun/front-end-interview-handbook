import clsx from 'clsx';
import { useState } from 'react';
import { RiArrowRightLine } from 'react-icons/ri';
import { useSet } from 'react-use';

import SponsorsAdFormatSpotlight from '~/components/sponsors/ads/SponsorsAdFormatSpotlight';
import { SponsorAdFormatConfigs } from '~/components/sponsors/SponsorsAdFormatConfigs';
import Button from '~/components/ui/Button';
import Label from '~/components/ui/Label';
import TextArea from '~/components/ui/TextArea';
import TextInput from '~/components/ui/TextInput';
import {
  themeBackgroundColor,
  themeBorderEmphasizeColor,
} from '~/components/ui/theme';

import SponsorsAdvertiseRequestFormAdsImageUpload from '../SponsorsAdvertiseRequestFormAdsImageUpload';
import SponsorsAdvertiseRequestFormAdsSectionAvailability from '../SponsorsAdvertiseRequestFormAdsSectionAvailability';

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

export default function SponsorsAdvertiseRequestFormAdsSectionSpotlight({
  onCancel,
  onSubmit,
}: Props) {
  const [selectedWeeks, selectedWeeksActions] = useSet<string>();
  const [text, setText] = useState('');
  const [url, setURL] = useState('');

  return (
    <div className="flex flex-col gap-12">
      <SponsorsAdvertiseRequestFormAdsSectionAvailability
        adFormat="SPOTLIGHT"
        selectedWeeks={selectedWeeks}
        selectedWeeksActions={selectedWeeksActions}
      />
      <div>
        <Label
          description="Configure your spotlight ad and upload the required assets"
          label="Spotlight ad configuration"
        />
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          <div>
            <TextArea
              description={`Maximum of ${SponsorAdFormatConfigs.SPOTLIGHT.placementConstraints.text} characters`}
              label="Title"
              maxLength={
                SponsorAdFormatConfigs.SPOTLIGHT.placementConstraints.text
              }
              required={true}
              value={text}
              onChange={(value) => setText(value)}
            />
            <SponsorsAdvertiseRequestFormAdsImageUpload
              heightConstraint={
                SponsorAdFormatConfigs.SPOTLIGHT.placementConstraints.image
                  ?.height ?? 1
              }
              widthConstraint={
                SponsorAdFormatConfigs.SPOTLIGHT.placementConstraints.image
                  ?.width ?? 1
              }
            />
            <TextInput
              classNameOuter="mt-4"
              description="Destination for ad clicks"
              label="URL"
              placeholder="https://www.example.com"
              required={true}
              type="url"
              value={url}
              onChange={(value) => setURL(value)}
            />
          </div>
          <div>
            <Label
              description="See how your ad looks like when it goes live"
              label="Preview"
            />
            <div
              className={clsx(
                'mt-2 h-[200px] w-full',
                'flex items-center justify-center',
                'py-10',
                ['border-2', 'border-dashed', themeBorderEmphasizeColor],
                'rounded-md',
                themeBackgroundColor,
              )}>
              <div className="max-w-[260px]">
                <SponsorsAdFormatSpotlight
                  external={true}
                  id="short-form"
                  imageUrl=""
                  sponsorName="Your product / company name"
                  text={text || 'Your short form ad text here'}
                  url="#"
                />
              </div>
            </div>
          </div>
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
