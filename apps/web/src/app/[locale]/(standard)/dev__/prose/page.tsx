import Prose from '~/components/ui/Prose';

import ProseExample from './prose.mdx';

export default function Page() {
  return (
    <div className="mx-auto max-w-4xl space-y-16 py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
      <Prose>
        <ProseExample />
      </Prose>
    </div>
  );
}
