'use client';

import { useParams, useRouter } from 'next/navigation';
import { createContext, useContext, useEffect, useMemo, useState } from 'react';

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
  const [activeTab, setActiveTab] = useState<PostListTab>('PENDING');
  const [selectedPostId, setSelectedPostId] = useState<string | null>(null);
  const router = useRouter();
  const params = useParams();
  const utils = trpc.useUtils();

  // Single TRPC query - this replaces PostList's query
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
  const handlePostClick = (postId: string) => {
    setSelectedPostId(postId);
    router.push(`/projects/${projectSlug}/posts/${postId}`);
  };

  const handlePrevPost = () => {
    if (adjacentPosts.prev) {
      handlePostClick(adjacentPosts.prev.id);
    }
  };

  const handleNextPost = () => {
    if (adjacentPosts.next) {
      handlePostClick(adjacentPosts.next.id);
    }
  };

  // Mutations for toggling relevant/replied status
  const projectSlugForMutation = projectSlug;
  const markPostRelevancyMutation =
    trpc.socialPosts.markPostRelevancy.useMutation();
  const markPostReplyStatusMutation =
    trpc.socialPosts.markPostReplyStatus.useMutation();

  const markPostRelevancy = (postId: string, relevancy: PostRelevancy) => {
    markPostRelevancyMutation.mutate(
      {
        postId,
        projectSlug: projectSlugForMutation,
        relevancy,
      },
      {
        onSuccess() {
          utils.socialPosts.getPosts.invalidate();
          router.refresh();
        },
      },
    );
  };

  const markPostReplyStatus = (
    postId: string,
    replyStatus: ManualReplyStatus,
  ) => {
    markPostReplyStatusMutation.mutate(
      {
        postId,
        projectSlug: projectSlugForMutation,
        replyStatus,
      },
      {
        onSuccess() {
          utils.socialPosts.getPosts.invalidate();
          router.refresh();
        },
      },
    );
  };

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
