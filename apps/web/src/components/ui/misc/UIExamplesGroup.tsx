import Heading from '../Heading';
import Section from '../Heading/HeadingContext';

export default function UIExamplesGroup({
  title,
  children,
}: Readonly<{ children: React.ReactNode; title: string }>) {
  return (
    <div className="space-y-4">
      <Heading className="text-2xl font-bold leading-7 text-slate-900 sm:truncate sm:text-3xl">
        {title}
      </Heading>
      <Section>
        <div className="space-y-4">{children}</div>
      </Section>
    </div>
  );
}
