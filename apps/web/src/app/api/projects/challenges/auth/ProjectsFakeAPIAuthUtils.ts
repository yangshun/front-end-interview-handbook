export const EMAIL_REGEX =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

type FakeUser = Readonly<{
  email: string;
  id: number;
  name: string;
  password: string;
}>;

const janeDoe: FakeUser = {
  email: 'jane.doe@gmail.com',
  id: 1234,
  name: 'Jane Doe',
  password: '$uPah4ckr',
};
const johnDoe: FakeUser = {
  email: 'john.doe@gmail.com',
  id: 1235,
  name: 'John Doe',
  password: 'P@s$w0rd',
};

export const usersByEmail: Record<string, FakeUser> = {
  [janeDoe.email]: janeDoe,
  [johnDoe.email]: johnDoe,
};
export const usersById: Record<string, FakeUser> = {
  [janeDoe.id]: janeDoe,
  [johnDoe.id]: johnDoe,
};

export function validatePassword(password: string) {
  if (password.length < 8 || password.length > 64) {
    return { error: 'Invalid password length.', valid: false };
  }

  if (!/[A-Z]/.test(password)) {
    return {
      error: 'Password must contain one uppercase letter.',
      valid: false,
    };
  }

  if (!/[a-z]/.test(password)) {
    return {
      error: 'Password must contain one lowercase letter.',
      valid: false,
    };
  }

  if (!/\d/.test(password)) {
    return { error: 'Password must contain one number.', valid: false };
  }

  if (!/[!@$%^&*]/.test(password)) {
    return {
      error: 'Password must contain one special character.',
      valid: false,
    };
  }

  return { error: null, valid: true };
}
