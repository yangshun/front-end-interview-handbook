export const EMAIL_REGEX =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
export const users: Record<
  string,
  { id: number; name: string; password: string }
> = {
  'jane.doe@gmail.com': {
    id: 1234,
    name: 'Jane Doe',
    password: '$uPah4ckr',
  },
  'john.doe@gmail.com': {
    id: 1235,
    name: 'John Doe',
    password: 'P@s$w0rd',
  },
};
