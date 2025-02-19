import MDXComponents from '~/components/mdx/MDXComponents';
import SponsorsAdPlacementInContentContainer from '~/components/sponsors/ads/SponsorsAdPlacementInContentContainer';

type Props = Readonly<{
  markdown: ({
    components,
  }: {
    components?: Record<string, unknown>;
  }) => JSX.Element;
}>;

export default function GuidesMarkdown({ markdown: Markdown }: Props) {
  return (
    <Markdown
      components={{
        ...MDXComponents,
        Ad: () => (
          <div className="not-prose">
            <SponsorsAdPlacementInContentContainer size="md" />
          </div>
        ),
      }}
    />
  );
}
