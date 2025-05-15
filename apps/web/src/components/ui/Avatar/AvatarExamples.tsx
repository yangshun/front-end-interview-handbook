import UIExamplesGroup from '../misc/UIExamplesGroup';
import Avatar from './Avatar';

const sizes = ['xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl'] as const;

const avatarSrc =
  'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80';

export default function AvatarExamples() {
  return (
    <UIExamplesGroup darkMode="horizontal" title="Avatar">
      <div className="flex flex-wrap gap-4">
        {sizes.map((size) => (
          <div key={size} className="flex flex-col gap-2">
            {size}
            <Avatar alt="John Doe" size={size} src={avatarSrc} />
            <Avatar alt="John Doe" size={size} />
          </div>
        ))}
      </div>
    </UIExamplesGroup>
  );
}
