export const PERPETUAL_PROMO_CODE = 'FALL23';
export const PERPETUAL_PROMO_CODE_DISCOUNT_PERCENTAGE = 20;

export const SEASONAL_PROMO_CODE = 'CYBERMONDAY23';
export const SEASONAL_PROMO_CODE_DISCOUNT_PERCENTAGE = 30;

export const STUDENT_DISCOUNT_PERCENTAGE = 40;

export function hasProjectsBetaAccess(date: number) {
  if (process.env.NODE_ENV === 'development') {
    return true;
  }

  return (
    date > new Date('2023-11-24').getTime() &&
    date < new Date('2023-11-28').getTime()
  );
}
