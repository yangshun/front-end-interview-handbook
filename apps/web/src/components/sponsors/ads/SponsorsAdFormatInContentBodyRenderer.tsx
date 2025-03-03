import RichText from '~/components/ui/RichTextEditor/RichText';
import customLinkRichTextEditorConfig from '~/components/ui/RichTextEditor/RichTextEditorConfig';

import { sponsorsAdTrackingHref } from './SponsorsAdHref';

type Props = Omit<React.ComponentProps<typeof RichText>, 'editorConfig'> &
  Readonly<{ adId: string }>;

export default function SponsorsAdFormatInContentBodyRenderer({
  adId,
  ...props
}: Props) {
  return <RichText {...props} editorConfig={getRichTextEditorConfig(adId)} />;
}

function getRichTextEditorConfig(adId: string) {
  return customLinkRichTextEditorConfig((url) =>
    sponsorsAdTrackingHref({ id: adId, url }),
  );
}
