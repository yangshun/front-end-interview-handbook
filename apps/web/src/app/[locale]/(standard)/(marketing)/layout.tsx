import MarketingRecentPurchasesToasts from '~/components/marketing/MarketingRecentPurchasesToasts';

type Props = Readonly<{
  children: React.ReactNode;
}>;

export default function MarketingLayout({ children }: Props) {
  return (
    <>
      {children}
      <MarketingRecentPurchasesToasts />
    </>
  );
}
