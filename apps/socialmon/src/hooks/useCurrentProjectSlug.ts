import { useParams } from 'next/navigation';

export default function useCurrentProjectSlug() {
  const params = useParams();

  return params?.projectSlug as string;
}
