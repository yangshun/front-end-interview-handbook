import Alert, { type AlertVariant } from '../ui/Alert';

import type { RemarkAlertVariants } from '@gfe/remark-alerts';

const variantMap: Record<RemarkAlertVariants, AlertVariant> = {
  caution: 'danger',
  important: 'primary',
  note: 'info',
  tip: 'success',
  warning: 'warning',
};

type Props = {
  children: React.ReactNode;
  title: string;
  variant: RemarkAlertVariants;
};

export default function MDXAlert({ title, variant, children }: Props) {
  return (
    <Alert title={title} variant={variantMap[variant]}>
      {children}
    </Alert>
  );
}
