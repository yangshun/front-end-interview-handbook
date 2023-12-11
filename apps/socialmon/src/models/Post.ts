export type Post = {
  content: string;
  foundAt: Date | null;
  id: string;
  postedAt: Date;
  replied: boolean;
  repliedAt: Date | null;
  response: string | null;
  title: string;
  url: string;
};
