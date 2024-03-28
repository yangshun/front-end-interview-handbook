import type { VariantProps } from 'class-variance-authority';
import { cva } from 'class-variance-authority';

type AvatarSize = '3xl' | 'custom' | 'lg' | 'sm' | 'xs';

const avatarSizeClasses: Record<AvatarSize, string> = {
  '3xl': 'size-20',
  custom: '',
  lg: 'size-10',
  sm: 'size-8',
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
