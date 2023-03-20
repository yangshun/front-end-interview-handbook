import type { ComponentProps } from 'react';

export default function MDXTable(props: ComponentProps<'table'>) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full" {...props} />
    </div>
  );
}
