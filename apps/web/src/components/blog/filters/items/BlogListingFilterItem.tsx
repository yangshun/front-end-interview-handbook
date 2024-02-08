import clsx from 'clsx';
import { RiArrowDownSLine } from 'react-icons/ri';

import type { BlogMetadata } from '~/components/blog/BlogTypes';
import type { BlogFilter } from '~/components/blog/filters/BlogFilterType';
import CheckboxInput from '~/components/ui/CheckboxInput';
import Text from '~/components/ui/Text';
import {
  themeOutlineElement_FocusVisible,
  themeOutlineElementBrandColor_FocusVisible,
  themeTextSecondaryColor,
} from '~/components/ui/theme';

import { Disclosure } from '@headlessui/react';

export type FilterItemGap = 'compact' | 'spacious';

const itemGapClasses: Record<FilterItemGap, string> = {
  compact: 'gap-x-4 gap-y-3',
  spacious: 'gap-6',
};

export default function BlogListingFilterItem<
  T extends string,
  Q extends BlogMetadata,
>({
  defaultOpen,
  itemGap,
  section,
  values,
}: Readonly<{
  defaultOpen?: boolean;
  itemGap: FilterItemGap;
  section: BlogFilter<T, Q>;
  values: Set<T>;
}>) {
  return (
    <Disclosure
      key={section.name}
      as="div"
      className={clsx('py-5')}
      defaultOpen={defaultOpen ?? values.size > 0}>
      {({ open }) => (
        <fieldset>
          <legend className="w-full">
            <Disclosure.Button
              className={clsx('flex w-full items-center justify-between', [
                themeOutlineElement_FocusVisible,
                themeOutlineElementBrandColor_FocusVisible,
              ])}>
              <Text size="body2" weight="medium">
                {section.name}
              </Text>
              <span className="ml-6 flex h-7 items-center pr-2">
                <RiArrowDownSLine
                  aria-hidden="true"
                  className={clsx(
                    'size-5 transform transition-transform',
                    open && '-rotate-180',
                    themeTextSecondaryColor,
                  )}
                />
              </span>
            </Disclosure.Button>
          </legend>
          <Disclosure.Panel className="pb-2 pt-4">
            <div className={clsx('flex flex-wrap', itemGapClasses[itemGap])}>
              {section.options.map((option) => (
                <div key={option.value} className="flex items-center">
                  <CheckboxInput
                    label={option.label}
                    value={values.has(option.value)}
                    onChange={() => section.onChange(option.value)}
                  />
                </div>
              ))}
            </div>
          </Disclosure.Panel>
        </fieldset>
      )}
    </Disclosure>
  );
}
