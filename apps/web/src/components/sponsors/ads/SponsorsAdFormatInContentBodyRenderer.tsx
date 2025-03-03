import RichText from '~/components/ui/RichTextEditor/RichText';
import customLinkRichTextEditorConfig from '~/components/ui/RichTextEditor/RichTextEditorConfig';

import { sponsorsAdTrackingHref } from './SponsorsAdHref';

type AdProps = Readonly<{ adId: string; tracking: boolean }>;
type Props = AdProps &
  Omit<React.ComponentProps<typeof RichText>, 'editorConfig'>;

export default function SponsorsAdFormatInContentBodyRenderer({
  adId,
  tracking = true,
  ...props
}: Props) {
  return (
    <RichText
      {...props}
      editorConfig={getRichTextEditorConfig({ adId, tracking })}
    />
  );
}

function getRichTextEditorConfig({ adId, tracking = true }: AdProps) {
  return customLinkRichTextEditorConfig((url) =>
    tracking ? sponsorsAdTrackingHref({ adId, url }) : url,
  );
}
