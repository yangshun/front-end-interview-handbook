import type { VariantProps } from 'class-variance-authority';
import { cva } from 'class-variance-authority';

type AvatarSize = '2xl' | '3xl' | 'custom' | 'lg' | 'md' | 'sm' | 'xl' | 'xs';

const avatarSizeClasses: Record<AvatarSize, string> = {
  '2xl': 'size-16',
  '3xl': 'size-20',
  custom: '',
  lg: 'size-10',
  md: 'size-8',
  sm: 'size-7',
  xl: 'size-12',
  xs: 'size-6',
};

export type AvatarVariantProps = VariantProps<typeof avatarVariants>;
export const avatarVariants = cva('', {
  defaultVariants: {
    size: 'md',
  },
  variants: {
    size: avatarSizeClasses,
  },
});
