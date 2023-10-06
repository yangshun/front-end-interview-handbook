import Divider from '~/components/ui/Divider';
import Prose from '~/components/ui/Prose';

import ProseExample from './prose.mdx';

export default function Page() {
  return (
    <div className="mx-auto max-w-4xl space-y-16 px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
      <Prose>
        <ProseExample />
      </Prose>
      <Divider />
      <Prose textSize="sm">
        <ProseExample />
      </Prose>
    </div>
  );
}
