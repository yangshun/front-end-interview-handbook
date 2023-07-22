export function isValidStudentEmail(
  email: string,
): Readonly<{ reason?: string; valid: boolean }> {
  const parts = email.split('@');

  if (parts.length < 2 || !parts[1]) {
    return {
      reason: 'Invalid email',
      valid: false,
    };
  }

  if (email.includes('alumn')) {
    return {
      reason: 'Alumni emails are not eligible',
      valid: false,
    };
  }

  if (!parts[1].includes('.edu')) {
    return {
      reason:
        'Email does not contain a .edu, only accredited educational institutions are eligible',
      valid: false,
    };
  }

  return {
    valid: true,
  };
}
