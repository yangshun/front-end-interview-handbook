import clsx from 'clsx';
import { useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';

import authors from '~/data/authors';

import GitHubIcon from '~/components/icons/GitHubIcon';
import LinkedInIcon from '~/components/icons/LinkedInIcon';
import TwitterIcon from '~/components/icons/TwitterIcon';
import Anchor from '~/components/ui/Anchor';
import Button from '~/components/ui/Button';
import Text from '~/components/ui/Text';

export default function AuthorsCardSection() {
  const intl = useIntl();
  const [author, setAuthor] = useState(authors.yangshun);

  return (
    <div className="flex max-w-lg flex-col gap-1">
      <div className="flex items-center gap-x-4">
        <Text className="whitespace-nowrap" color="secondary" variant="body3">
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
          {[authors.yangshun, authors['sunny-dhillon'], authors.zhenghao].map(
            (author_) => (
              <Button
                key={author_.name}
                className={clsx(
                  'p-1',
                  author_.name !== author.name && 'text-slate-500',
                )}
                label={author_.name}
                size="sm"
                variant="tertiary"
                onClick={() => {
                  setAuthor(author_);
                }}
              />
            ),
          )}
        </nav>
      </div>
      <div key={author.name} className="min-h-[140px]">
        <div className="flex gap-3 rounded border border-slate-200 p-3 text-xs text-slate-500">
          <div className="flex shrink-0 flex-col items-center gap-3">
            <img
              alt={author.name}
              className="h-14 w-14 rounded-full"
              src={author.imageUrl}
            />
            <div className="flex h-6 w-6 -translate-y-5 items-center justify-center rounded-full bg-white shadow">
              <img alt="" className="h-4 w-4" src={author.companyIconUrl} />
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <Text color="secondary" display="block" variant="body3">
              {author.bio}
            </Text>
            <div className="flex gap-x-3">
              {author.gitHubUrl && (
                <Anchor
                  aria-label={intl.formatMessage({
                    defaultMessage: 'GitHub profile link',
                    description: 'Link to GitHub profile',
                    id: 'D6iXh1',
                  })}
                  href={author.gitHubUrl}
                  variant="flat">
                  <GitHubIcon className="h-4 w-4" />
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
                  variant="flat">
                  <LinkedInIcon className="h-4 w-4" />
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
                  variant="flat">
                  <TwitterIcon className="h-4 w-4" />
                </Anchor>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
