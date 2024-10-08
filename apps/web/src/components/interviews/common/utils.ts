import type {
  ThemeGradient2Colors,
  ThemeGradient3Colors,
  ThemeGradient4Colors,
} from '~/components/ui/theme';

export default function getProgressBarGradient({
  value,
  total,
}: Readonly<{
  total: number;
  value: number;
}>) {
  const progressPercentage = Math.min(value / Math.max(total, 1), 1) * 100;
  const firstGradient: ThemeGradient2Colors<'#E9FE7C', '#95F464'> = {
    className: 'bg-[linear-gradient(90deg,_#E9FE7C_0%,_#95F464_100%)]',
    endColor: '#95F464',
    startColor: '#E9FE7C',
  };
  const secondGradient: ThemeGradient3Colors<'#E9FE7C', '#60EE55', '#2CD53D'> =
    {
      className:
        'bg-[linear-gradient(90deg,_#E9FE7C_0%,_#60EE55_50%,_#2CD53D_100%)]',
      endColor: '#2CD53D',
      secondColor: '#60EE55',
      startColor: '#E9FE7C',
    };

  const thirdGradient: ThemeGradient4Colors<
    '#E9FE7C',
    '#60EE55',
    '#2CD53D',
    '#14AD22'
  > = {
    className:
      'bg-[linear-gradient(90deg,_#E9FE7C_0%,_#60EE55_30%,_#2CD53D_70%,_#14AD22_100%)]',
    endColor: '#14AD22',
    secondColor: '#60EE55',
    startColor: '#E9FE7C',
    thirdColor: '#2CD53D',
  };

  if (progressPercentage > 66.66) {
    return thirdGradient;
  }
  if (progressPercentage > 33.33) {
    return secondGradient;
  }

  return firstGradient;
}
