import { RiStarSmileFill } from 'react-icons/ri';

import Badge from '~/components/ui/Badge';

type Props = Readonly<{
  premium: boolean;
  username: string;
}>;

export default function ProjectsProfileUsernameBadge({
  premium,
  username,
}: Props) {
  return (
    <Badge
      label={`@${username}`}
      size="md"
      {...(premium
        ? { icon: RiStarSmileFill, variant: 'special' }
        : { variant: 'neutral' })}
    />
  );
}
