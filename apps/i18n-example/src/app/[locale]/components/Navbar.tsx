'use client';

import { I18nLink } from 'next-i18nostic';
import { FormattedMessage } from 'react-intl';

export default function Navbar() {
  return (
    <nav style={{ display: 'flex' }}>
      <ul
        style={{
          columnGap: 10,
          display: 'flex',
          listStyleType: 'none',
          paddingLeft: 0,
        }}>
        <li>
          <I18nLink href="/">
            <FormattedMessage
              defaultMessage="Home"
              description="Link to home page"
              id="OmkkJd"
            />
          </I18nLink>
        </li>
        <li>
          <I18nLink href="/profile">
            <FormattedMessage
              defaultMessage="Profile"
              description="Profile page title"
              id="81i+95"
            />
          </I18nLink>
        </li>
        <li>
          <I18nLink href="/docs">
            <FormattedMessage
              defaultMessage="Docs"
              description="Docs page"
              id="/x1uyJ"
            />
          </I18nLink>
        </li>
      </ul>
    </nav>
  );
}
