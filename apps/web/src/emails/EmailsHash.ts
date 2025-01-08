import crypto from 'crypto';

const SECRET_KEY = process.env.EMAIL_HASH_SECRET!;

export function emailsGenerateHash(email: string) {
  return crypto.createHmac('sha256', SECRET_KEY).update(email).digest('hex');
}

export function emailsVerifyHash(email: string, providedHash: string) {
  const computedHash = emailsGenerateHash(email);

  return crypto.timingSafeEqual(
    new Uint8Array(Buffer.from(providedHash)),
    new Uint8Array(Buffer.from(computedHash)),
  );
}
