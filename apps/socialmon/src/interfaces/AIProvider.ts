import { type Post } from "~/models/Post";

export type AIProvider = {
  generateResponseTo(post: Post): Promise<string>;
}
