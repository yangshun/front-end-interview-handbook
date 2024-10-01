'use client';

import { FormattedMessage, FormattedNumberParts, useIntl } from 'react-intl';

// This module exists to create `use client`-wrappers for react-intl components.
// Not using `export *` because not sure how tree shaking will work if we do that.
// Add more modules where necessary.
export { FormattedMessage, FormattedNumberParts, useIntl };
