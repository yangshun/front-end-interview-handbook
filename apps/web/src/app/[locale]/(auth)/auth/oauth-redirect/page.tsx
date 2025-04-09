import { redirect } from 'next/navigation';
import url from 'url';

export default function OAuthRedirect({
  searchParams,
}: {
  searchParams: Record<string, string>;
}) {
  const { next = '/' } = searchParams;

  const redirectUrl = new URL(next, 'https://greatfrontend.com'); // The domain is not used

  const supabaseParams = ['error', 'error_code', 'error_description'];

  // Move top-level error params into the redirect target
  supabaseParams.forEach((key) => {
    if (searchParams[key]) {
      redirectUrl.searchParams.set(key, searchParams[key]);
    }
  });

  redirect(
    url.format({
      pathname: redirectUrl.pathname,
      search: redirectUrl.search,
    }),
  );
}
