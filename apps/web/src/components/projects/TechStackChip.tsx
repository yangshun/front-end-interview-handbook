import clsx from 'clsx';

import Text from '~/components/ui/Text';

const styles = [
  {
    bgColor: 'bg-[#00ABDF] dark:bg-[#00ABDF]',
    textColor: 'text-white dark:text-white',
  },
  {
    bgColor: 'bg-[#FACC15] dark:bg-[#FACC15]',
    textColor: 'text-neutral-950 dark:text-neutral-950',
  },
  {
    bgColor: 'bg-[#6AD2CC] dark:bg-[#6AD2CC]',
    textColor: 'text-neutral-950 dark:text-neutral-950',
  },
  {
    bgColor: 'bg-neutral-300 dark:bg-neutral-300',
    textColor: 'text-neutral-950 dark:text-neutral-950',
  },
];

export default function TechStackChip({ value }: { value: string }) {
  // TODO(projects): Might have to update the logic to how to apply specific styles for each tech
  const randomStylesIndex = Math.floor(Math.random() * styles.length);
  const { bgColor, textColor } = styles[randomStylesIndex];

  return (
    <div
      className={clsx(
        'rounded py-[2px] px-[7px] w-fit flex items-center justify-center',
        bgColor,
      )}>
      <Text
        className={clsx('whitespace-nowrap', textColor)}
        size="body3"
        weight="medium">
        {value}
      </Text>
    </div>
  );
}
