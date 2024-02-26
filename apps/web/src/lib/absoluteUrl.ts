import type { NextApiRequest } from 'next';

// Forked from next-absolute-url, which doesn't correctly give the host
// and protocol now and seems unmaintained.
function absoluteUrl(
  req?: NextApiRequest,
  localhostAddress = 'localhost:3000',
) {
  let host = req?.headers.origin?.includes('localhost')
    ? req?.headers.origin.split('//')[1]
    : (req?.headers ? req.headers.host : window.location.host) ||
      localhostAddress;
  let protocol = /^localhost(:\d+)?$/.test(host) ? 'http:' : 'https:';

  if (
    req?.headers['x-forwarded-host'] &&
    typeof req.headers['x-forwarded-host'] === 'string'
  ) {
    host = req.headers['x-forwarded-host'];
  }

  if (
    req?.headers['x-forwarded-proto'] &&
    typeof req.headers['x-forwarded-proto'] === 'string'
  ) {
    protocol = `${req.headers['x-forwarded-proto']}:`;
  }

  return {
    host,
    origin: protocol + '//' + host,
    protocol,
  };
}

export default absoluteUrl;
