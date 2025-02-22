import MDXComponents from '~/components/mdx/MDXComponents';
import SponsorsAdFormatInContentContainer from '~/components/sponsors/ads/SponsorsAdFormatInContentContainer';

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
            <SponsorsAdFormatInContentContainer size="md" />
          </div>
        ),
      }}
    />
  );
}
