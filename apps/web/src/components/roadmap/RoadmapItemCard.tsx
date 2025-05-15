'use client';

import clsx from 'clsx';
import { kebabCase } from 'lodash-es';
import { RiArrowRightLine, RiCheckboxCircleFill } from 'react-icons/ri';

import { useIntl } from '~/components/intl';
import Badge from '~/components/ui/Badge';
import Button from '~/components/ui/Button';
import Card from '~/components/ui/Card';
import Text from '~/components/ui/Text';
import Tooltip from '~/components/ui/Tooltip';

type Props = Readonly<{
  description: string;
  launched?: boolean;
  tags: ReadonlyArray<string>;
  title: string;
  url?: string | null;
}>;

function RoadmapItemCard({
  description,
  launched = false,
  tags,
  title,
  url = '',
}: Props) {
  const intl = useIntl();

  return (
    <Card
      className={clsx('flex flex-1 flex-col gap-y-4', 'px-8 py-5')}
      disableSpotlight={true}
      padding={false}
      pattern={false}>
      <div className="flex flex-col gap-y-2">
        <div className="flex items-start justify-between">
          <Text size="body0" weight="bold">
            {title}
          </Text>
          {launched && (
            <Tooltip
              invert={true}
              label={intl.formatMessage({
                defaultMessage: 'Launched',
                description: 'Tooltip for launched icon in roadmap',
                id: '/Vt+sJ',
              })}>
              <RiCheckboxCircleFill className="text-success size-7" />
            </Tooltip>
          )}
        </div>
        <Text color="secondary" size="body2" weight="normal">
          {description}
        </Text>
      </div>
      <div className="flex flex-col gap-4 lg:flex-row lg:justify-between">
        <div className="flex flex-1 flex-wrap items-center gap-x-2 gap-y-3">
          {tags.map((tag) => {
            const isInterviews = tag.toLowerCase() === 'interviews';
            const isProjects = tag.toLowerCase() === 'projects';

            if (isInterviews) {
              return (
                <span key={tag} data-theme="interviews">
                  <Badge label={`#${tag}`} variant="primary" />
                </span>
              );
            }

            if (isProjects) {
              return (
                <span key={tag} data-theme="projects">
                  <Badge label={`#${tag}`} variant="primary" />
                </span>
              );
            }

            return (
              <Badge
                key={tag}
                className={clsx(
                  '!bg-neutral-100 dark:!bg-neutral-900',
                  '!border !border-neutral-300 dark:!border-neutral-600',
                  '!text-neutral-500',
                )}
                label={`#${kebabCase(tag.toLocaleLowerCase())}`}
                variant="neutral"
              />
            );
          })}
        </div>
        {launched && !!url && (
          <Button
            href={url}
            icon={RiArrowRightLine}
            label={intl.formatMessage({
              defaultMessage: 'Check it out',
              description: 'Check it out button label',
              id: 'g7IcyE',
            })}
            variant="secondary"
          />
        )}
      </div>
    </Card>
  );
}

export default RoadmapItemCard;
