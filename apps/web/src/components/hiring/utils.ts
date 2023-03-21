const hiringCountryCodes = new Set([
  'BE',
  'CZ',
  'DE',
  'DK',
  'ES',
  'FR',
  'GB',
  'IT',
  'NL',
  'PL',
  'PT',
  'RU',
  'SE',
  'CH',
  'UA',
]);

export function isHiringCountry(countryCode: string): boolean {
  return hiringCountryCodes.has(countryCode);
}
