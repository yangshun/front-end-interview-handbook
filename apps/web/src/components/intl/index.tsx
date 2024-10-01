'use client';

import type { ComponentProps } from 'react';
import {
  FormattedMessage as FormattedMessageRaw,
  useIntl as useIntlRaw,
} from 'react-intl';

// This module exists to create `use client`-wrappers for react-intl components.
export function FormattedMessage(
  props: ComponentProps<typeof FormattedMessageRaw>,
) {
  return <FormattedMessageRaw {...props} />;
}

export function useIntl() {
  return useIntlRaw();
}
