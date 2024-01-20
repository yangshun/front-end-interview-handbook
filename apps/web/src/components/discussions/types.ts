export type DiscussionsCommentItem = Readonly<{
  _count: {
    votes: number;
  };
  category: string | null;
  content: string;
  createdAt: Date;
  entityId: string;
  id: string;
  replies?: ReadonlyArray<DiscussionsCommentItem>;
  updatedAt: Date;
  user: Readonly<{
    avatarUrl: string | null;
    id: string;
    name: string | null;
    title: string | null;
    username: string;
  }>;
}>;
