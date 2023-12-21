'use client';

import clsx from 'clsx';
import type { Post } from 'contentlayer/generated';
import { useState } from 'react';
import {
  RiArrowDownSLine,
  RiArrowUpSLine,
  RiExternalLinkFill,
} from 'react-icons/ri';
import { useIntl } from 'react-intl';

import BlogArticle from '~/components/blog/articles/BlogArticle';
import BlogMdx from '~/components/blog/BlogMdx';
import type { BlogMetadata } from '~/components/blog/BlogTypes';
import Button from '~/components/ui/Button';
import {
  themeCardBackgroundWhiteOnLightColor,
  themeGlassyBorder,
} from '~/components/ui/theme';

type Props = Readonly<{
  blog: BlogMetadata;
}>;

export default function ArticleViewCard({ blog }: Props) {
  const intl = useIntl();
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div
      className={clsx(
        'flex h-full flex-col gap-y-4 overflow-hidden rounded-lg px-8 py-5',
        themeCardBackgroundWhiteOnLightColor,
        themeGlassyBorder,
      )}>
      <div
        className={clsx('overflow-y-clip', {
          'max-h-[700px]': !isExpanded,
          'max-h-full': isExpanded,
        })}>
        <BlogArticle metadata={blog} view="card">
          <BlogMdx code={(blog as Post)?.body.code || ''} />
        </BlogArticle>
      </div>
      <div className="flex items-center justify-between">
        <Button
          className={clsx(
            'dark:text-brand text-brand-dark -ml-4 w-fit border-transparent',
          )}
          icon={isExpanded ? RiArrowUpSLine : RiArrowDownSLine}
          label={
            isExpanded
              ? intl.formatMessage({
                  defaultMessage: 'Read less',
                  description: 'Read less',
                  id: 'r8JR1/',
                })
              : intl.formatMessage({
                  defaultMessage: 'Read more',
                  description: 'Read more',
                  id: 'A0i9qA',
                })
          }
          size="md"
          variant="unstyled"
          onClick={() => setIsExpanded(!isExpanded)}
        />
        <Button
          addonPosition="start"
          display="inline"
          href={blog.href}
          icon={RiExternalLinkFill}
          label={intl.formatMessage({
            defaultMessage: 'Open page',
            description: 'Indication that text has been copied',
            id: 'R8Jahp',
          })}
          size="sm"
          type="button"
          variant="secondary"
        />
      </div>
    </div>
  );
}
