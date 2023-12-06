import { redirect } from 'next/navigation';

type Props = Readonly<{
  params: Readonly<{ slug: string }>;
}>;

export default async function Page({ params }: Props) {
  const { slug } = params;

  redirect(`${slug}/project-brief`);
}
