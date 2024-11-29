'use client';

import clsx from 'clsx';
import type { BlogPost } from 'contentlayer/generated';
import { useState } from 'react';
import {
  RiArrowDownSLine,
  RiArrowUpSLine,
  RiExternalLinkFill,
} from 'react-icons/ri';

import BlogArticle from '~/components/blog/articles/BlogArticle';
import BlogMdx from '~/components/blog/articles/BlogMdx';
import type { BlogMetadata } from '~/components/blog/BlogTypes';
import { useIntl } from '~/components/intl';
import Button from '~/components/ui/Button';
import {
  themeBackgroundCardWhiteOnLightColor,
  themeGlassyBorder,
  themeTextBrandColor,
} from '~/components/ui/theme';

type Props = Readonly<{
  metadata: BlogMetadata;
}>;

export default function ArticleViewCard({ metadata }: Props) {
  const intl = useIntl();
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div
      className={clsx(
        'flex h-full flex-col gap-y-4 overflow-hidden rounded-lg px-8 py-5',
        themeBackgroundCardWhiteOnLightColor,
        themeGlassyBorder,
      )}>
      <div
        className={clsx('overflow-y-clip', {
          'max-h-[700px]': !isExpanded,
          'max-h-full': isExpanded,
        })}>
        <BlogArticle metadata={metadata} view="card">
          <BlogMdx code={(metadata as BlogPost)?.body.code || ''} />
        </BlogArticle>
      </div>
      <div className="flex items-center justify-between">
        <Button
          className={clsx(
            '-ml-4 w-fit border-transparent',
            themeTextBrandColor,
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
          href={metadata.href}
          icon={RiExternalLinkFill}
          label={intl.formatMessage({
            defaultMessage: 'Open in new tab',
            description: 'Indication that text has been copied',
            id: 'cCQIST',
          })}
          size="sm"
          target="_blank"
          type="button"
          variant="secondary"
        />
      </div>
    </div>
  );
}
