'use client';

import { useParams, useRouter } from 'next/navigation';
import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

import { trpc } from '~/hooks/trpc';

import type { PostRelevancy } from '~/prisma/client';
import type { PostListTab, QueriedRedditPost } from '~/types';

type ManualReplyStatus = 'NOT_REPLIED' | 'REPLIED_MANUALLY';

type PostsContextType = {
  // Tab state
  activeTab: PostListTab;
  // Navigation
  adjacentPosts: {
    next: QueriedRedditPost | null;
    prev: QueriedRedditPost | null;
  };
  // Actions
  fetchNextPage: () => void;
  handleNextPost: () => void;
  handlePostClick: (postId: string) => void;
  handlePrevPost: () => void;
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
  isLoading: boolean;
  // Mutations for toggling relevant/replied status
  markPostRelevancy: (postId: string, relevancy: PostRelevancy) => void;
  markPostReplyStatus: (postId: string, replyStatus: ManualReplyStatus) => void;
  // Data
  posts: Array<QueriedRedditPost>;
  // Selection state
  selectedPostId: string | null;
  setActiveTab: (tab: PostListTab) => void;
  setSelectedPostId: (id: string | null) => void;
};

const PostsContext = createContext<PostsContextType | undefined>(undefined);

export function PostsProvider({
  children,
  projectSlug,
}: {
  children: React.ReactNode;
  projectSlug: string;
}) {
  const [activeTab, setActiveTab] = useState<PostListTab>('ALL');
  const [selectedPostId, setSelectedPostId] = useState<string | null>(null);
  const router = useRouter();
  const params = useParams();
  const utils = trpc.useUtils();

  // Store navigation context before mutations to handle auto-navigation
  const navigationContextRef = useRef<{
    currentIndex: number;
    postsSnapshot: Array<QueriedRedditPost>;
  } | null>(null);

  // Helper function to find the next logical post after a state change
  const findNextLogicalPost = (
    currentPostId: string,
    postsSnapshot: Array<QueriedRedditPost>,
  ): string | null => {
    const currentIndex = postsSnapshot.findIndex(
      (post) => post.id === currentPostId,
    );

    if (currentIndex === -1) return null;

    // Try next post first
    if (currentIndex < postsSnapshot.length - 1) {
      return postsSnapshot[currentIndex + 1]!.id;
    }

    // If no next post, try previous post
    if (currentIndex > 0) {
      return postsSnapshot[currentIndex - 1]!.id;
    }

    // No adjacent posts available
    return null;
  };

  // Helper function to determine if auto-navigation should happen based on current tab
  const shouldAutoNavigateForTab = (
    currentTab: PostListTab,
    actionType: 'relevancy' | 'reply',
  ): boolean => {
    switch (currentTab) {
      case 'ALL':
        // Posts always stay visible in ALL tab, no navigation needed
        return false;

      case 'PENDING':
        // Navigate when marking as replied or irrelevant (removes from pending)
        return actionType === 'reply' || actionType === 'relevancy';

      case 'REPLIED':
        // Navigate when marking as not replied (removes from replied tab)
        return actionType === 'reply';

      case 'IRRELEVANT':
        // Navigate when marking as relevant (removes from irrelevant tab)
        return actionType === 'relevancy';

      default:
        // Conservative default: navigate for unknown tabs
        return true;
    }
  };

  // Helper function to handle auto-navigation after successful mutation
  const handleAutoNavigation = (
    postId: string,
    actionType: 'relevancy' | 'reply',
  ): void => {
    // Only navigate if current post was selected and we have navigation context
    if (selectedPostId === postId && navigationContextRef.current) {
      const shouldNavigate = shouldAutoNavigateForTab(activeTab, actionType);

      if (shouldNavigate) {
        const nextPostId = findNextLogicalPost(
          postId,
          navigationContextRef.current.postsSnapshot,
        );

        if (nextPostId) {
          // Navigate to next post immediately
          setSelectedPostId(nextPostId);
          router.push(`/projects/${projectSlug}/posts/${nextPostId}`);
        }
      }
    }
  };

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    trpc.socialPosts.getPosts.useInfiniteQuery(
      {
        filter: { tab: activeTab },
        pagination: { limit: 20 },
        projectSlug,
      },
      {
        getNextPageParam(lastPage) {
          return lastPage?.nextCursor;
        },
      },
    );

  const posts = useMemo(() => {
    return data?.pages.flatMap((page) => page.posts) ?? [];
  }, [data?.pages]);

  // URL sync logic
  useEffect(() => {
    if (params?.id && typeof params.id === 'string') {
      setSelectedPostId(params.id);
    } else {
      setSelectedPostId(null);
    }
  }, [params?.id]);

  // Auto-load next page when user reaches the last post
  useEffect(() => {
    if (
      selectedPostId &&
      posts.length > 0 &&
      hasNextPage &&
      !isFetchingNextPage
    ) {
      const currentPostIndex = posts.findIndex(
        (post) => post.id === selectedPostId,
      );

      // If user is on the last post in the current list, auto-load more
      if (currentPostIndex === posts.length - 1) {
        fetchNextPage();
      }
    }
  }, [selectedPostId, hasNextPage, isFetchingNextPage, fetchNextPage, posts]);

  // Calculate adjacent posts
  const adjacentPosts = useMemo(() => {
    if (!selectedPostId || !posts.length) {
      return { next: null, prev: null };
    }

    const currentIndex = posts.findIndex((post) => post.id === selectedPostId);

    if (currentIndex === -1) {
      return { next: null, prev: null };
    }

    return {
      next: currentIndex < posts.length - 1 ? posts[currentIndex + 1]! : null,
      prev: currentIndex > 0 ? posts[currentIndex - 1]! : null,
    };
  }, [posts, selectedPostId]);

  // Navigation handlers
  function handlePostClick(postId: string) {
    setSelectedPostId(postId);
    router.push(`/projects/${projectSlug}/posts/${postId}`);
  }

  function handlePrevPost() {
    if (adjacentPosts.prev) {
      handlePostClick(adjacentPosts.prev.id);
    } else if (posts.length > 0) {
      // Fallback: if no prev post but we have posts, go to the first post
      handlePostClick(posts[0]!.id);
    }
  }

  function handleNextPost() {
    if (adjacentPosts.next) {
      handlePostClick(adjacentPosts.next.id);
    } else if (posts.length > 0) {
      // Fallback: if no next post but we have posts, go to the last post
      handlePostClick(posts[posts.length - 1]!.id);
    }
  }

  // Mutations for toggling relevant/replied status
  const projectSlugForMutation = projectSlug;
  const markPostRelevancyMutation =
    trpc.socialPosts.markPostRelevancy.useMutation();
  const markPostReplyStatusMutation =
    trpc.socialPosts.markPostReplyStatus.useMutation();

  function markPostRelevancy(postId: string, relevancy: PostRelevancy) {
    // Capture navigation context before mutation
    const currentIndex = posts.findIndex((post) => post.id === postId);

    navigationContextRef.current = {
      currentIndex,
      postsSnapshot: [...posts], // Create a snapshot
    };

    markPostRelevancyMutation.mutate(
      {
        postId,
        projectSlug: projectSlugForMutation,
        relevancy,
      },
      {
        onError() {
          // Clear navigation context on error
          navigationContextRef.current = null;
        },
        onSuccess() {
          // First, invalidate and refresh the data
          utils.socialPosts.getPosts.invalidate();

          // Handle auto-navigation if needed
          handleAutoNavigation(postId, 'relevancy');

          router.refresh();

          // Clear navigation context
          navigationContextRef.current = null;
        },
      },
    );
  }

  function markPostReplyStatus(postId: string, replyStatus: ManualReplyStatus) {
    // Capture navigation context before mutation
    const currentIndex = posts.findIndex((post) => post.id === postId);

    navigationContextRef.current = {
      currentIndex,
      postsSnapshot: [...posts], // Create a snapshot
    };

    markPostReplyStatusMutation.mutate(
      {
        postId,
        projectSlug: projectSlugForMutation,
        replyStatus,
      },
      {
        onError() {
          // Clear navigation context on error
          navigationContextRef.current = null;
        },
        onSuccess() {
          // First, invalidate and refresh the data
          utils.socialPosts.getPosts.invalidate();

          // Handle auto-navigation if needed
          handleAutoNavigation(postId, 'reply');

          router.refresh();

          // Clear navigation context
          navigationContextRef.current = null;
        },
      },
    );
  }

  const contextValue: PostsContextType = {
    activeTab,
    adjacentPosts,
    fetchNextPage,
    handleNextPost,
    handlePostClick,
    handlePrevPost,
    hasNextPage: hasNextPage ?? false,
    isFetchingNextPage,
    isLoading,
    markPostRelevancy,
    markPostReplyStatus,
    posts,
    selectedPostId,
    setActiveTab,
    setSelectedPostId,
  };

  return (
    <PostsContext.Provider value={contextValue}>
      {children}
    </PostsContext.Provider>
  );
}

export function usePostsContext() {
  const context = useContext(PostsContext);

  if (context === undefined) {
    throw new Error('usePostsContext must be used within a PostsProvider');
  }

  return context;
}

export function useOptionalPostsContext() {
  const context = useContext(PostsContext);

  return context; // Returns undefined if no provider, doesn't throw
}
