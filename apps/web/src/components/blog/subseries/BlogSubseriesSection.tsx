import type { BlogSubseries } from '~/components/blog/BlogTypes';
import BlogSubseriesCard from '~/components/blog/subseries/BlogSubseriesCard';

type Props = Readonly<{
  subseriesData: ReadonlyArray<BlogSubseries>;
}>;

export default function BlogSubseriesSection({ subseriesData }: Props) {
  return (
    <div className="flex flex-col justify-start gap-y-12">
      {subseriesData.map((subseries) => (
        <BlogSubseriesCard key={subseries.title} subseries={subseries} />
      ))}
    </div>
  );
}
