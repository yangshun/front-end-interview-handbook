import { FormattedNumberParts } from '~/components/intl';

export default function PurchasePriceLabel({
  amount,
  children,
  currency,
  symbol,
}: Readonly<{
  amount: number;
  children?: (val: Array<Intl.NumberFormatPart>) => React.ReactElement | null;
  currency: string;
  symbol: string;
}>) {
  return (
    <FormattedNumberParts
      currency={currency.toUpperCase()}
      currencyDisplay={symbol !== '$' ? 'narrowSymbol' : undefined}
      maximumFractionDigits={0}
      style="currency"
      value={amount}>
      {(parts) =>
        children == null ? (
          <>{parts.map((part) => part.value).join('')}</>
        ) : (
          children(parts)
        )
      }
    </FormattedNumberParts>
  );
}
