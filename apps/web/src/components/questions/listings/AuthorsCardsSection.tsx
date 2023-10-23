import clsx from 'clsx';
import { useState } from 'react';
import { RiYoutubeFill } from 'react-icons/ri';
import { FormattedMessage, useIntl } from 'react-intl';

import gtag from '~/lib/gtag';

import authors from '~/data/authors';

import GitHubIcon from '~/components/icons/GitHubIcon';
import LinkedInIcon from '~/components/icons/LinkedInIcon';
import TwitterIcon from '~/components/icons/TwitterIcon';
import Anchor from '~/components/ui/Anchor';
import Text from '~/components/ui/Text';
import {
  themeBackgroundColor,
  themeBackgroundLayerColor,
} from '~/components/ui/theme';

export default function AuthorsCardSection() {
  const intl = useIntl();
  const [author, setAuthor] = useState(authors.yangshun);

  return (
    <div className="flex max-w-lg flex-col gap-3">
      <div className="flex w-full flex-col items-center gap-4">
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
          className="flex flex-wrap gap-x-4 gap-y-2">
          {[
            authors.yangshun,
            authors.dhillon,
            authors.zhenghao,
            authors.tanhauhau,
            authors['michalgrzegorczyk-dev'],
          ].map((authorItem) => (
            <button
              key={authorItem.name}
              className={clsx(
                'inline-flex items-center gap-2 rounded-full px-2 py-2',
                authorItem.name === author.name && themeBackgroundLayerColor,
              )}
              type="button"
              onClick={() => {
                setAuthor(authorItem);
                gtag.event({
                  action: `homepage.solutions.click`,
                  category: 'engagement',
                  label: authorItem.name,
                });
              }}>
              <img
                alt={authorItem.name}
                className="h-6 w-6 rounded-full"
                src={authorItem.imageUrl}
              />
              <Text size="body3" weight="medium">
                {authorItem.name}
              </Text>
            </button>
          ))}
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
            {author.companyIconUrl && (
              <div className="absolute bottom-0 right-0 flex h-8 w-8 items-center justify-center rounded-full bg-white shadow">
                <img alt="" className="h-6 w-6" src={author.companyIconUrl} />
              </div>
            )}
          </div>
          <div className="flex flex-col gap-3">
            <Text className="h-28" display="block" size="body2">
              {author.bio}
            </Text>
            <div className="flex gap-x-4">
              {author.links.github && (
                <Anchor
                  aria-label={intl.formatMessage({
                    defaultMessage: 'GitHub profile link',
                    description: 'Link to GitHub profile',
                    id: 'D6iXh1',
                  })}
                  href={author.links.github}
                  variant="blend">
                  <GitHubIcon className="h-5 w-5" />
                </Anchor>
              )}
              {author.links.linkedin && (
                <Anchor
                  aria-label={intl.formatMessage({
                    defaultMessage: 'LinkedIn profile link',
                    description: 'Link to LinkedIn profile',
                    id: 'l9vVXY',
                  })}
                  href={author.links.linkedin}
                  variant="blend">
                  <LinkedInIcon className="h-5 w-5" />
                </Anchor>
              )}
              {author.links.twitter && (
                <Anchor
                  aria-label={intl.formatMessage({
                    defaultMessage: 'Twitter profile link',
                    description: 'Link to Twitter profile',
                    id: 'OPwgMT',
                  })}
                  href={author.links.twitter}
                  variant="blend">
                  <TwitterIcon className="h-5 w-5" />
                </Anchor>
              )}
              {author.links.youtube && (
                <Anchor
                  aria-label={intl.formatMessage({
                    defaultMessage: 'YouTube profile link',
                    description: 'Link to YouTube profile',
                    id: 'njNtN8',
                  })}
                  href={author.links.youtube}
                  variant="blend">
                  <RiYoutubeFill className="h-5 w-5" />
                </Anchor>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
