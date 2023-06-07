import Heading from '../Heading';
import Section from '../Heading/HeadingContext';

export default function UIExamplesGroup({
  title,
  children,
}: Readonly<{ children: React.ReactNode; title: string }>) {
  return (
    <div className="space-y-4">
      <Heading className="sm:truncate" level="heading4">
        {title}
      </Heading>
      <Section>
        <div className="space-y-4">{children}</div>
      </Section>
    </div>
  );
}
