import 'dotenv/config';

import {
  HeadObjectCommand,
  PutObjectCommand,
  S3Client,
} from '@aws-sdk/client-s3';
import { createHash } from 'crypto';
import { readdir, readFile, stat } from 'fs/promises';
import { lookup } from 'mime-types';
import path from 'path';

const R2_ACCESS_KEY_ID = process.env.R2_ACCESS_KEY_ID!;
const R2_SECRET_ACCESS_KEY = process.env.R2_SECRET_ACCESS_KEY!;
const R2_ACCOUNT_ID = process.env.R2_ACCOUNT_ID!;
const R2_BUCKET = process.env.R2_BUCKET!;

const LOCAL_FOLDER = './public/'; // Adjust path as needed
const MAX_CONCURRENT_UPLOADS = 50;

const client = new S3Client({
  credentials: {
    accessKeyId: R2_ACCESS_KEY_ID,
    secretAccessKey: R2_SECRET_ACCESS_KEY,
  },
  endpoint: `https://${R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  region: 'auto',
});

type FileInfo = Readonly<{ fullPath: string; key: string }>;

async function walkFolder(
  folderPath: string,
  prefix = '',
): Promise<ReadonlyArray<FileInfo>> {
  const files = [];
  const entries = await readdir(folderPath, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(folderPath, entry.name);
    const key = path.posix.join(prefix, entry.name);

    if (entry.isDirectory()) {
      const nestedFiles = await walkFolder(fullPath, key);

      files.push(...nestedFiles);
    } else {
      files.push({ fullPath, key });
    }
  }

  return files;
}

async function shouldUploadFile(
  key: string,
  { eTag, contentType }: Readonly<{ contentType: string; eTag: string }>,
) {
  try {
    const headOutput = await client.send(
      new HeadObjectCommand({
        Bucket: R2_BUCKET,
        Key: key,
      }),
    );

    if (contentType !== headOutput.ContentType || eTag !== headOutput.ETag) {
      return true;
    }

    return false;
  } catch (err: unknown) {
    // Ignore, just upload
  }

  return true;
}

async function uploadFile({ fullPath, key }: FileInfo) {
  const [fileBuffer, fileStat] = await Promise.all([
    readFile(fullPath),
    stat(fullPath),
  ]);

  const hash = createHash('md5')
    .update(new Uint8Array(fileBuffer))
    .digest('hex');
  const eTag = `"${hash}"`;
  const contentType = lookup(fullPath) || 'application/octet-stream';

  // Upload the file if it doesn't exist
  const shouldUpload = await shouldUploadFile(key, { contentType, eTag });

  if (!shouldUpload) {
    return;
  }

  await client.send(
    new PutObjectCommand({
      Body: fileBuffer,
      Bucket: R2_BUCKET,
      ContentLength: fileStat.size,
      ContentType: contentType,
      Key: key,
    }),
  );

  console.info('Uploaded', key);
}

async function main() {
  console.info(`Scanning folder: ${LOCAL_FOLDER}`);

  const files = await walkFolder(LOCAL_FOLDER);

  console.info(`Found ${files.length} files`);

  await mapAsync(files, (file) => uploadFile(file), MAX_CONCURRENT_UPLOADS);

  console.info('All done!');
}

main().catch((err) => {
  console.error('Fatal error', err);
  process.exit(1);
});

function mapAsync<T, U>(
  iterable: ReadonlyArray<T>,
  callbackFn: (value: T) => Promise<U>,
  size = Infinity,
): Promise<Array<U>> {
  return new Promise((resolve, reject) => {
    const results: Array<U> = [];
    let nextIndex = 0;
    let resolved = 0;

    if (iterable.length === 0) {
      resolve(results);

      return;
    }

    async function processItem(index: number) {
      nextIndex++;
      try {
        const result = await callbackFn(iterable[index]);

        results[index] = result;
        resolved++;

        if (resolved === iterable.length) {
          resolve(results);

          return;
        }

        if (nextIndex < iterable.length) {
          processItem(nextIndex);
        }
      } catch (err) {
        reject(err);
      }
    }

    for (let i = 0; i < Math.min(iterable.length, size); i++) {
      processItem(i);
    }
  });
}
