export type DiscussionsCommentUserProfile = Readonly<{
  avatarUrl: string | null;
  id: string;
  name: string | null;
  title: string | null;
  username: string;
}>;

export type DiscussionsCommentItem = Readonly<{
  _count: {
    votes: number;
  };
  author: DiscussionsCommentUserProfile;
  category: string | null;
  content: string;
  createdAt: Date;
  domain: string;
  entityId: string;
  id: string;
  replies?: ReadonlyArray<DiscussionsCommentItem>;
  updatedAt: Date;
}>;

export type DiscussionsCommentSortField = 'createdAt' | 'votes';
