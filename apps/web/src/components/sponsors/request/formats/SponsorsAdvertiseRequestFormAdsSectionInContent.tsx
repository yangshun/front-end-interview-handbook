import clsx from 'clsx';
import { useState } from 'react';
import { RiArrowRightLine } from 'react-icons/ri';
import { useSet } from 'react-use';

import NavColorSchemeDropdown from '~/components/global/navbar/NavColorSchemeDropdown';
import SponsorsAdFormatInContent from '~/components/sponsors/ads/SponsorsAdFormatInContent';
import { SponsorAdFormatConfigs } from '~/components/sponsors/SponsorsAdFormatConfigs';
import Button from '~/components/ui/Button';
import Label from '~/components/ui/Label';
import RichTextEditor from '~/components/ui/RichTextEditor';
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

export default function SponsorsAdvertiseRequestFormAdsSectionInContent({
  onCancel,
  onSubmit,
}: Props) {
  const [selectedWeeks, selectedWeeksActions] = useSet<string>();
  const [text, setText] = useState('');
  const [url, setURL] = useState('');

  return (
    <div className="flex flex-col gap-12">
      <SponsorsAdvertiseRequestFormAdsSectionAvailability
        adFormat="IN_CONTENT"
        selectedWeeks={selectedWeeks}
        selectedWeeksActions={selectedWeeksActions}
      />
      <div>
        <Label
          description="Configure your ad and upload the required assets"
          label="In-content ad configuration"
        />
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          <div>
            <TextArea
              description={`Maximum of ${SponsorAdFormatConfigs.IN_CONTENT.placementConstraints.text} characters`}
              label="Title"
              maxLength={
                SponsorAdFormatConfigs.IN_CONTENT.placementConstraints.text
              }
              required={true}
              value={text}
              onChange={(value) => setText(value)}
            />
            <RichTextEditor
              description={`Maximum of ${SponsorAdFormatConfigs.IN_CONTENT.placementConstraints.body?.links} links allowed`}
              label="Body"
              maxLength={
                SponsorAdFormatConfigs.IN_CONTENT.placementConstraints.body
                  ?.length
              }
              minHeight="200px"
              placeholder="Enter something"
              required={true}
            />
            <SponsorsAdvertiseRequestFormAdsImageUpload
              heightConstraint={
                SponsorAdFormatConfigs.IN_CONTENT.placementConstraints.image
                  ?.height ?? 1
              }
              widthConstraint={
                SponsorAdFormatConfigs.IN_CONTENT.placementConstraints.image
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
            <div className="flex items-end justify-between gap-4">
              <Label
                description="See how your ad looks like when it goes live"
                label="Preview"
              />
              <NavColorSchemeDropdown includeSystem={false} size="xs" />
            </div>
            <div
              className={clsx(
                'mt-2 flex w-full items-center justify-center',
                'px-4 py-4',
                ['border-2', 'border-dashed', themeBorderEmphasizeColor],
                'rounded-md',
                themeBackgroundColor,
              )}>
              <div className="max-w-xl">
                <SponsorsAdFormatInContent
                  body="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
                  external={true}
                  id="short-form"
                  imageUrl=""
                  size="md"
                  sponsorName="Your product / company name"
                  title={text || 'The quick brown fox jumped over the lazy fox'}
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
