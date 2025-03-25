import { useCallback, useState } from 'react';

import { objectUrlToFile } from '~/lib/imageUtils';
import { trpc } from '~/hooks/trpc';

import { useIntl } from '~/components/intl';

import { getErrorMessage } from '~/utils/getErrorMessage';

import type { SponsorsAdFormat } from '@prisma/client';

export default function useSponsorsAdvertiseRequestAdsImageUploader({
  format,
  sessionId,
}: Readonly<{
  format: SponsorsAdFormat;
  sessionId: string;
}>): Readonly<{
  loading: boolean;
  uploadAdAsset: (imageUrl: string) => Promise<{
    error: string | null;
    imageUrl: string | null;
  }>;
}> {
  const intl = useIntl();
  const uploadAssetUrl = trpc.sponsors.adAssetUploadUrl.useMutation();
  const [loading, setLoading] = useState(false);
  const [imageError, setImageError] = useState<string | null>(null);

  const uploadAdAsset = useCallback(
    async (url: string) => {
      setLoading(true);
      setImageError(null);

      try {
        const blob = await objectUrlToFile(url);

        const {
          url: signedUrl,
          path: imagePath,
          success,
        } = await uploadAssetUrl.mutateAsync(
          { format, sessionId },
          {
            onError: (error) => {
              setImageError(error.message);
            },
          },
        );

        if (!success && imageError) {
          throw new Error(imageError);
        }

        const uploadResponse = await fetch(signedUrl, {
          body: blob,
          headers: { 'Content-Type': blob.type },
          method: 'PUT',
        });

        if (!uploadResponse.ok) {
          throw new Error(
            intl.formatMessage({
              defaultMessage: 'Failed to upload image',
              description: 'Error message for image upload',
              id: '9xAfBQ',
            }),
          );
        }
        setLoading(false);

        return {
          error: null,
          imageUrl: imagePath,
        };
      } catch (error) {
        setLoading(false);

        return {
          error: getErrorMessage(error),
          imageUrl: null,
        };
      }
    },
    [uploadAssetUrl, intl, format, sessionId, imageError],
  );

  return { loading, uploadAdAsset };
}
