import type { VariantProps } from 'class-variance-authority';
import { cva } from 'class-variance-authority';

type AvatarSize = '2xl' | '3xl' | 'custom' | 'lg' | 'sm' | 'xl' | 'xs';

const avatarSizeClasses: Record<AvatarSize, string> = {
  '2xl': 'size-16',
  '3xl': 'size-20',
  custom: '',
  lg: 'size-10',
  sm: 'size-8',
  xl: 'size-12',
  xs: 'size-6',
};

export type AvatarVariantProps = VariantProps<typeof avatarVariants>;
export const avatarVariants = cva('', {
  defaultVariants: {
    size: 'sm',
  },
  variants: {
    size: avatarSizeClasses,
  },
});
