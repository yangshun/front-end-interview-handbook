const hiringCountryCodes = new Set([
  'BE', // Belgium
  'CH', // Switzerland
  'CZ', // Czech Republic
  'DE', // Germany
  'DK', // Denmark
  'ES', // Spain
  'FR', // France
  'GB', // United Kingdom
  'IN', // India
  'IT', // Italy
  'NL', // Netherlands
  'PL', // Poland
  'PT', // Portugal
  'RU', // Russia
  'SE', // Sweden
  'UA', // Ukraine
]);

export function isHiringCountry(countryCode: string): boolean {
  return hiringCountryCodes.has(countryCode);
}
