'use client';

import clsx from 'clsx';
import { useState } from 'react';
import {
  RiAccountCircleFill,
  RiArrowRightLine,
  RiBuildingFill,
  RiFireFill,
  RiGroupFill,
} from 'react-icons/ri';

import { useColorSchemePreferences } from '~/components/global/color-scheme/ColorSchemePreferencesProvider';
import ColorSchemeSelect from '~/components/global/color-scheme/ColorSchemeSelect';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '~/components/ui/Accordion';
import Alert from '~/components/ui/Alert';
import Avatar from '~/components/ui/Avatar';
import Badge from '~/components/ui/Badge';
import Button from '~/components/ui/Button';
import CheckboxInput from '~/components/ui/CheckboxInput';
import Container from '~/components/ui/Container';
import Divider from '~/components/ui/Divider';
import Heading from '~/components/ui/Heading';
import Pagination from '~/components/ui/Pagination';
import RadioGroup from '~/components/ui/RadioGroup';
import RadioGroupItem from '~/components/ui/RadioGroup/RadioGroupItem';
import RichTextEditor from '~/components/ui/RichTextEditor';
import Select from '~/components/ui/Select';
import TabsUnderline from '~/components/ui/Tabs/TabsUnderline';
import TextArea from '~/components/ui/TextArea';
import TextInput from '~/components/ui/TextInput';
import { ToastImpl } from '~/components/ui/Toast/Toast';
import Typeahead from '~/components/ui/Typeahead';

import ProductThemeSelect from './ProductThemeSelect';

const tabs = [
  { icon: RiAccountCircleFill, label: 'Account', value: 'account' },
  { icon: RiBuildingFill, label: 'Company', value: 'company' },
  { icon: RiGroupFill, label: 'Team Members', value: 'team' },
];

export default function UILibraryPage() {
  const [selectedTab, setSelectedTab] = useState(tabs[0].value);
  const { colorSchemePreference, setColorSchemePreference } =
    useColorSchemePreferences();
  const [value, setValue] = useState('');

  return (
    <div className="grid gap-y-24 py-12">
      <div
        className={clsx(
          'flex flex-col gap-2',
          'z-fixed fixed bottom-4 right-4',
        )}>
        <ProductThemeSelect />
        <ColorSchemeSelect
          colorScheme={colorSchemePreference}
          display="block"
          onChange={setColorSchemePreference}
        />
      </div>
      <Container className="flex flex-col gap-4">
        <Heading level="heading3">Design System</Heading>
        <Divider />
        <div className="flex flex-col gap-8">
          <div className="grid grid-cols-2 gap-8">
            <div className="flex gap-4">
              <Button label="Primary" size="md" variant="primary" />
              <Button label="Secondary" size="md" variant="secondary" />
              <Button label="Tertiary" size="md" variant="tertiary" />
              <Button label="Success" size="md" variant="success" />
              <Button label="Danger" size="md" variant="danger" />
            </div>
            <div className="flex flex-wrap gap-4">
              {(['xs', 'sm', 'md', 'lg', 'xl'] as const).map((size) => (
                <div key={size} className="flex flex-col gap-2">
                  <Avatar
                    alt="John Doe"
                    size={size}
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                  />
                </div>
              ))}
            </div>
            <div className="grid grid-cols-2 gap-8">
              <div className="flex gap-4">
                <Button label="Small" size="sm" variant="secondary" />
                <Button label="Medium" size="md" variant="secondary" />
                <Button label="Large" size="lg" variant="secondary" />
              </div>
              <div className="flex gap-4">
                {(['xs', 'sm', 'md'] as const).map((size) => (
                  <Button
                    key={size}
                    icon={RiArrowRightLine}
                    isLabelHidden={true}
                    label="Button text"
                    size={size}
                    variant="secondary"
                  />
                ))}
              </div>
            </div>
            <div className="flex flex-wrap items-start gap-4">
              <Badge label="Brand" variant="primary" />
              <Badge label="Success" variant="success" />
              <Badge label="Information" variant="info" />
              <Badge label="Warning" variant="warning" />
              <Badge label="Danger" variant="danger" />
            </div>
            <div className="flex flex-col gap-8">
              <TextInput label="Name" placeholder="John Doe" type="text" />
              <TextArea label="Description" placeholder="Describe yourself" />
              <CheckboxInput label="I agree to the Terms and Conditions" />
              <div className="grid grid-cols-3 gap-8">
                <Select
                  label="Framework"
                  options={[
                    {
                      label: 'JavaScript',
                      value: 'javascript',
                    },
                    {
                      label: 'React',
                      value: 'react',
                    },
                    {
                      label: 'Vue',
                      value: 'vue',
                    },
                    {
                      label: 'Angular',
                      value: 'angular',
                    },
                  ]}
                  value="react"
                  onChange={() => {}}
                />
                <div className="col-span-2">
                  <RadioGroup
                    label="Framework"
                    value="react"
                    onChange={() => {}}>
                    {[
                      {
                        label: 'JavaScript',
                        value: 'javascript',
                      },
                      {
                        label: 'React',
                        value: 'react',
                      },
                      {
                        label: 'Vue',
                        value: 'vue',
                      },
                    ].map((option) => (
                      <RadioGroupItem key={option.value} {...option} />
                    ))}
                  </RadioGroup>
                </div>
              </div>
              <Typeahead
                label="Colors"
                options={[
                  {
                    label: 'Red',
                    value: 'red',
                  },
                  {
                    label: 'Blue',
                    value: 'blue',
                  },
                  {
                    label: 'Orange',
                    value: 'orange',
                  },
                  {
                    label: 'Green',
                    value: 'green',
                  },
                  {
                    label: 'Yellow',
                    value: 'yellow',
                  },
                  {
                    label: 'Purple',
                    value: 'purple',
                  },
                  {
                    label: 'Black',
                    value: 'black',
                  },
                ]}
                placeholder="Select colors"
              />
              <Accordion collapsible={true} type="single">
                <AccordionItem value="item-1">
                  <AccordionTrigger>Is it accessible?</AccordionTrigger>
                  <AccordionContent>
                    Yes. It adheres to the WAI-ARIA design pattern.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                  <AccordionTrigger>Is it styled?</AccordionTrigger>
                  <AccordionContent>
                    Yes. It comes with default styles that matches the other
                    components&apos; aesthetic.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                  <AccordionTrigger>Is it animated?</AccordionTrigger>
                  <AccordionContent>
                    Yes. It&apos;s animated by default, but you can disable it
                    if you prefer.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
            <div className="flex flex-col gap-8">
              <div>
                <TabsUnderline
                  label="Select navigation item"
                  size="sm"
                  tabs={tabs}
                  value={selectedTab}
                  onSelect={setSelectedTab}
                />
              </div>
              <Pagination count={10} page={1} />
              <Alert title="Hey hey look here" variant="primary">
                Just wanted to get your attention. Nothing important actually.
              </Alert>
              <ToastImpl
                addOnIcon={RiFireFill}
                addOnLabel="+50"
                description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore."
                title="Info Title"
                variant="special"
              />
              <RichTextEditor
                isLabelHidden={true}
                label="Summary"
                minHeight="300px"
                placeholder="Enter something"
                value={value}
                onChange={setValue}
              />
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
