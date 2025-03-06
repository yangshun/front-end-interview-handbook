import { z } from 'zod';

export const URL_REGEX = /^(https?:\/\/)?([\w-]+(\.[\w-]+)+)(\/[^\s]*)?$/;

const LOCALHOST_REGEX = /^(https?:\/\/)?localhost(:\d+)?/;
const IP_ADDRESS_REGEX =
  /^(https?:\/\/)?\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}(:\d+)?/;

export function urlSchema(options?: {
  urlMessage: string;
  urlMessageLocalhost: string;
}) {
  const { urlMessage, urlMessageLocalhost } = options ?? {};

  return (
    z
      .string()
      .regex(URL_REGEX, urlMessage)
      .refine(
        (val) => !val.match(LOCALHOST_REGEX) && !val.match(IP_ADDRESS_REGEX),
        urlMessageLocalhost,
      )
      // TODO: Make error msg more specific / guide user to reason of why IPs/localhost are not allowed
      .transform((url) => {
        const match = url.match(URL_REGEX);

        // If no https present in the url, add https in the url
        if (match && !match[1]) {
          return `https://${url}`;
        }

        return url;
      })
  );
}
