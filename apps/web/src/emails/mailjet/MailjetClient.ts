import { Client } from 'node-mailjet';

export default function MailjetClient() {
  return new Client({
    apiKey: process.env.MAILJET_API_KEY,
    apiSecret: process.env.MAILJET_SECRET_KEY,
  });
}
