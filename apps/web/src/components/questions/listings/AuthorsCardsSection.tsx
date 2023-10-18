import clsx from 'clsx';
import { useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';

import gtag from '~/lib/gtag';

import authors from '~/data/authors';

import GitHubIcon from '~/components/icons/GitHubIcon';
import LinkedInIcon from '~/components/icons/LinkedInIcon';
import TwitterIcon from '~/components/icons/TwitterIcon';
import Anchor from '~/components/ui/Anchor';
import Button from '~/components/ui/Button';
import Text from '~/components/ui/Text';
import { themeBackgroundColor } from '~/components/ui/theme';

export default function AuthorsCardSection() {
  const intl = useIntl();
  const [author, setAuthor] = useState(authors.yangshun);

  return (
    <div className="flex max-w-lg flex-col gap-3">
      <div className="flex items-center gap-x-4">
        <Text className="whitespace-nowrap" color="secondary" size="body3">
          <FormattedMessage
            defaultMessage="Meet our top authors:"
            description="Authors section title"
            id="tR0TIm"
          />
        </Text>
        <nav
          aria-label={intl.formatMessage({
            defaultMessage: 'Authors',
            description: 'description',
            id: 'JCFm+V',
          })}
          className="flex gap-x-1">
          {[authors.yangshun, authors.dhillon, authors.zhenghao].map(
            (authorItem) => (
              <Button
                key={authorItem.name}
                className={clsx(
                  'p-1',
                  authorItem.name !== author.name && 'text-neutral-500',
                )}
                label={authorItem.name}
                size="xs"
                variant={
                  authorItem.name === author.name ? 'primary' : 'tertiary'
                }
                onClick={() => {
                  setAuthor(authorItem);
                  gtag.event({
                    action: `homepage.solutions.click`,
                    category: 'engagement',
                    label: authorItem.name,
                  });
                }}
              />
            ),
          )}
        </nav>
      </div>
      <div key={author.name} className="min-h-[140px]">
        <div
          className={clsx(
            'flex items-center gap-6 rounded-md p-5',
            themeBackgroundColor,
          )}>
          <div className="relative h-24 w-24 shrink-0">
            <img
              alt={author.name}
              className="h-24 w-24 rounded-full"
              src={author.imageUrl}
            />
            <div className="absolute bottom-0 right-0 flex h-8 w-8 items-center justify-center rounded-full bg-white shadow">
              <img alt="" className="h-6 w-6" src={author.companyIconUrl} />
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <Text display="block" size="body2">
              {author.bio}
            </Text>
            <div className="flex gap-x-4">
              {author.gitHubUrl && (
                <Anchor
                  aria-label={intl.formatMessage({
                    defaultMessage: 'GitHub profile link',
                    description: 'Link to GitHub profile',
                    id: 'D6iXh1',
                  })}
                  href={author.gitHubUrl}
                  variant="blend">
                  <GitHubIcon className="h-5 w-5" />
                </Anchor>
              )}
              {author.linkedInUrl && (
                <Anchor
                  aria-label={intl.formatMessage({
                    defaultMessage: 'LinkedIn profile link',
                    description: 'Link to LinkedIn profile',
                    id: 'l9vVXY',
                  })}
                  href={author.linkedInUrl}
                  variant="blend">
                  <LinkedInIcon className="h-5 w-5" />
                </Anchor>
              )}
              {author.twitterUrl && (
                <Anchor
                  aria-label={intl.formatMessage({
                    defaultMessage: 'Twitter profile link',
                    description: 'Link to Twitter profile',
                    id: 'OPwgMT',
                  })}
                  href={author.twitterUrl}
                  variant="blend">
                  <TwitterIcon className="h-5 w-5" />
                </Anchor>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
