import clsx from 'clsx';
import jsCookie from 'js-cookie';
import { RiArrowLeftLine, RiArrowRightLine } from 'react-icons/ri';

import countryCodesToNames from '~/data/countryCodesToNames.json';

import Button from '~/components/ui/Button';
import Heading from '~/components/ui/Heading';
import Section from '~/components/ui/Heading/HeadingContext';
import Label from '~/components/ui/Label';
import Select from '~/components/ui/Select';
import Text from '~/components/ui/Text';
import TextInput from '~/components/ui/TextInput';

type Props = Readonly<{
  onPrevious: () => void;
  onSubmit: () => void;
}>;

const countryOptions = Object.entries(countryCodesToNames).map(
  ([value, label]) => ({ label, value }),
);
const countryOptionsSorted = countryOptions.sort((a, b) =>
  a.label.localeCompare(b.label),
);

export default function SponsorsAdvertiseRequestFormCompanyDetailsSection({
  onSubmit,
  onPrevious,
}: Props) {
  return (
    <div className="mx-auto w-full max-w-xl">
      <Heading level="heading6">Company details</Heading>
      <Section>
        <Text className="block" color="secondary">
          Provide the company details for invoicing and agreement purposes
        </Text>
        <div className={clsx('mt-8 flex flex-col gap-6')}>
          <TextInput
            autoFocus={true}
            description="This will be displayed on the ad"
            label="Sponsor name"
            placeholder="E.g. ACME Inc"
            required={true}
          />
          <div className="flex gap-2">
            <div className="flex-1">
              <TextInput
                label="Company full legal name"
                placeholder="E.g. ACME Inc"
                required={true}
              />
            </div>
            <div className="flex-1">
              <TextInput label="VAT / Tax number" />
            </div>
          </div>
          <fieldset className="flex flex-col gap-2">
            <div>
              <legend className="block">
                <Label
                  description="The address is used in the agreement"
                  label="Address"
                  required={true}
                />
              </legend>
            </div>
            <Select
              display="block"
              isLabelHidden={true}
              label="Country"
              options={countryOptionsSorted}
              rounded="normal"
              value={jsCookie.get('country') ?? 'US'}
              onChange={() => {}}
            />
            <TextInput
              autoComplete="billing address-line1"
              autoCorrect="off"
              isLabelHidden={true}
              label="Street address"
              placeholder="Street address"
              required={true}
              spellCheck={false}
            />
            <TextInput
              autoComplete="billing address-line2"
              autoCorrect="off"
              isLabelHidden={true}
              label="Apartment, unit, or other"
              placeholder="Apartment, unit, or other"
              required={true}
              spellCheck={false}
            />
            <TextInput
              autoComplete="billing address-level2"
              autoCorrect="off"
              isLabelHidden={true}
              label="City / Town"
              placeholder="City / Town"
              spellCheck={false}
            />
            <div className="flex gap-2">
              <div className="flex-1">
                <TextInput
                  autoComplete="billing address-level1"
                  autoCorrect="off"
                  isLabelHidden={true}
                  label="State / Province / Region"
                  placeholder="State / Province / Region"
                  required={true}
                  spellCheck={false}
                />
              </div>
              <div className="flex-1">
                <TextInput
                  autoComplete="billing postal-code"
                  autoCorrect="off"
                  isLabelHidden={true}
                  label="ZIP / Postal code"
                  placeholder="ZIP / Postal code"
                  required={true}
                  spellCheck={false}
                />
              </div>
            </div>
          </fieldset>
          <div className="flex gap-2">
            <div className="flex-1">
              <TextInput
                label="Name of authorized signatory"
                placeholder="John Doe"
                required={true}
              />
            </div>
            <div className="flex-1">
              <TextInput
                label="Title of authorized signatory"
                placeholder="CEO, Co-founder"
                required={true}
              />
            </div>
          </div>
        </div>
        <div className="mt-8 flex justify-between">
          <Button
            addonPosition="start"
            icon={RiArrowLeftLine}
            label="Previous"
            size="md"
            variant="secondary"
            onClick={() => {
              onPrevious();
            }}
          />
          <Button
            icon={RiArrowRightLine}
            label="Next"
            size="md"
            variant="primary"
            onClick={() => {
              onSubmit();
            }}
          />
        </div>
      </Section>
    </div>
  );
}
