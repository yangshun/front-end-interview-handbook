/* eslint-disable no-restricted-imports */
'use client';

import {
  createIntl,
  createIntlCache,
  FormattedMessage,
  FormattedNumberParts,
  IntlProvider,
  useIntl,
} from 'react-intl';
import type { IntlShape, ResolvedIntlConfig } from 'react-intl';

// This module exists to create `use client`-wrappers for react-intl components.
// Not using `export *` because not sure how tree shaking will work if we do that.
// Add more modules where necessary.
export {
  createIntl,
  createIntlCache,
  FormattedMessage,
  FormattedNumberParts,
  IntlProvider,
  useIntl,
};
export type { IntlShape, ResolvedIntlConfig };
