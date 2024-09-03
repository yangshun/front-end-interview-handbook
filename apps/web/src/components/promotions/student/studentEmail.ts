const validDomains = Object.freeze({
  allowlisted: [
    // .ru
    'mephi.ru',
  ],
  prefixes: ['edu.'],
  substring: ['.edu.', '.ac.'],
  suffixes: ['.edu', '.ac', '.ca', '.in'],
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

  const containsPrefix = validDomains.prefixes.some((prefix) =>
    domain.toLowerCase().startsWith(prefix),
  );
  const containsSubstring = validDomains.substring.some((substring) =>
    domain.includes(substring),
  );
  const containsSuffix = validDomains.suffixes.some((suffix) =>
    domain.toLowerCase().endsWith(suffix),
  );
  const allowedDomain = validDomains.allowlisted.some((validDomain) =>
    domain.toLowerCase().includes(validDomain),
  );

  if (
    !containsPrefix &&
    !containsSubstring &&
    !containsSuffix &&
    !allowedDomain
  ) {
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
