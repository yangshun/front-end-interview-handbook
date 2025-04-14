export function getNameInitials(name) {
  // Extract first and last name initials using regular expressions
  const initials = name.match(/\b\w/g) || [];

  // Return the initials
  return (
    (initials[0] ?? '') +
    (initials.length - 1 === 0 ? '' : initials[initials.length - 1] ?? '')
  ).toUpperCase();
}

export function formatDate(date) {
  return date.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
}
