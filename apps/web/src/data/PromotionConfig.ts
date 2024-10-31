export const PERPETUAL_PROMO_CODE = 'FALL23';
export const PERPETUAL_PROMO_CODE_DISCOUNT_PERCENTAGE = 10;

export const STUDENT_DISCOUNT_PERCENTAGE = 40;
export const REVIEW_CASHBACK_DISCOUNT_PERCENTAGE = 100;

export const MAX_PPP_ELIGIBLE_FOR_FAANG_TECH_LEADS_PROMO = 0.75;

export function hasProjectsBetaAccess(date: number) {
  if (
    process.env.NODE_ENV === 'development' ||
    process.env.NEXT_PUBLIC_VERCEL_ENV !== 'production'
  ) {
    return true;
  }

  return (
    date > new Date('2023-11-24').getTime() &&
    date < new Date('2023-11-28').getTime()
  );
}
