const validDomains = Object.freeze({
  substring: ['.edu.', '.ac.'],
  suffixes: ['.edu', '.ac'],
});

export function isValidStudentEmail(
  email: string,
): Readonly<{ reason?: string; valid: boolean }> {
  const parts = email.split('@');
  const domain = parts[1];

  if (parts.length < 2 || !domain) {
    return {
      reason: 'Invalid email address.',
      valid: false,
    };
  }

  if (email.includes('alumn')) {
    return {
      reason: 'Alumni email addresses are not eligible.',
      valid: false,
    };
  }

  const containsSubstring = validDomains.substring.some((substring) =>
    email.includes(substring),
  );
  const containsSuffix = validDomains.suffixes.some((suffix) =>
    email.toLowerCase().endsWith(suffix),
  );

  if (!containsSuffix && !containsSubstring) {
    return {
      reason:
        'Email address does not seem to belong to an accredited educational institution. Send us an email if you believe your school should qualify.',
      valid: false,
    };
  }

  return {
    valid: true,
  };
}
