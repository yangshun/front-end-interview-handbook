import clsx from 'clsx';
import { RiArrowRightLine } from 'react-icons/ri';

import type { BlogMetadata } from '~/components/blog/BlogTypes';
import Anchor from '~/components/ui/Anchor';
import Text from '~/components/ui/Text';
import { themeTextFaintColor } from '~/components/ui/theme';

type Props = Readonly<{
  data: BlogMetadata;
  showArrow?: boolean;
}>;

export default function BlogSubseriesItemCard({
  data,
  showArrow = true,
}: Props) {
  return (
    <div
      className={clsx(
        'group relative flex h-full items-center justify-between gap-x-3 lg:gap-x-6 ',
      )}>
      <div className="flex flex-1 flex-col gap-y-4">
        <div className="flex w-full flex-col gap-y-2 lg:gap-y-1">
          <Anchor href={data.href} variant="unstyled">
            <span aria-hidden={true} className="absolute inset-0" />
            <Text
              className="!line-clamp-2 "
              display="block"
              size="body1"
              weight="bold">
              {data.title}
            </Text>
          </Anchor>
          {data.description && (
            <Text
              className="!lg:line-clamp-2 !line-clamp-5"
              color="secondary"
              size="body2">
              {data.description}
            </Text>
          )}
        </div>
      </div>
      {showArrow && (
        <RiArrowRightLine
          aria-hidden={true}
          className={clsx(
            'h-5 w-5 shrink-0',
            themeTextFaintColor,
            'group-hover:text-brand dark:group-hover:text-brand',
          )}
        />
      )}
    </div>
  );
}
