'use server';

import crypto from 'crypto';

export function encryptPassword(password: string, username: string): string {
  const algorithm = 'aes-256-cbc';
  const combinedKey = crypto
    .createHash('sha256')
    .update(process.env.PASSWORD_KEY + username)
    .digest('base64')
    .substring(0, 32);
  const iv = crypto.randomBytes(16);

  const cipher = crypto.createCipheriv(algorithm, combinedKey, iv);
  let encrypted = cipher.update(password, 'utf8', 'hex');

  encrypted += cipher.final('hex');

  return `${iv.toString('hex')}:${encrypted}`;
}

export function decryptPassword(
  encryptedPassword: string,
  username: string,
): string {
  const algorithm = 'aes-256-cbc';
  const combinedKey = crypto
    .createHash('sha256')
    .update(process.env.PASSWORD_KEY + username)
    .digest('base64')
    .substring(0, 32);

  const [ivHex, encrypted] = encryptedPassword.split(':');
  const iv = Buffer.from(ivHex, 'hex');

  const decipher = crypto.createDecipheriv(algorithm, combinedKey, iv);
  let decrypted = decipher.update(encrypted, 'hex', 'utf8');

  decrypted += decipher.final('utf8');

  return decrypted;
}
