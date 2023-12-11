'use client';

import PostList from '~/components/posts/PostList/PostList';

import '@mantine/core/styles.css';

import { MantineProvider } from '@mantine/core';

export default function Page() {
  // List of platforms, for each we have a PostList?

  /*
  const platformManager = new PlatformManager(["Reddit"]);

  const [platform, setPlatform] = useState<Platform>(); // For testing

  useEffect(() => {
      platformManager.getPlatform("Reddit").then((thePlatform) => {
        setPlatform(thePlatform);
      });
  }, [platformManager]);
  */

  return (
    <MantineProvider>
      <PostList />
    </MantineProvider>
  );
}
