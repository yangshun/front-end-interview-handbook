import OpenAIApi from "openai";

import type { Post } from '~/models/Post';

import type { AIProvider } from '../AIProvider';

class OpenAIProvider implements AIProvider {
  private openai: OpenAIApi;

  constructor(apiKey: string) {
    this.openai = new OpenAIApi({apiKey});
  }

  // Possibly give it assistant?
  private getSystemPrompt(): string {
    return `
      Act as a Reddit commenter.
      Task:
      A. Write a relevant comment to a Reddit post. The title and content of the post will be given to you.
      B. The comment must seem as if it was written by a frequent Reddit user.
      C. The main purpose of the comment is to respond to the title and content of the post.
      D. The comment should be informal and very casual. Feel free to be ungrammatical and have spelling errors.
      E. Summarize where possible. Get to the point directly.
      F. Do not include a concluding paragraph. Do not include greetings or sign-offs.
      G. The comment should VERY SUBTLY promote greatfrontend, a platform for helping people of all levels of experience prepare for frontend interviews.
      H. The greatfrontend promotion should be VERY BRIEF. It should also be linked directly to the post and your response.

      Note:
      1. You must only respond with the relevant comment, as if you were responding to the post directly.
      2. The comment MUST respond to the post. If you are unable to subtly promote greatfrontend, then do not mention greatfrontend at all.
      3. Do not include a link to greatfrontend.
    `;
  }

  private getUserPrompt(post: Post): string {
    return `
      The title of the post is: ${post.title}
      The content of the post is: ${post.content}
    `;
  }

  async generateResponseTo(post: Post): Promise<string> {
    console.info('Generating response to post:', post.title);

    const systemPrompt = this.getSystemPrompt();
    const userPrompt = this.getUserPrompt(post);

    const completion = await this.openai.chat.completions.create({
      messages: [
        { "content": systemPrompt, "role": "system" },
        { "content": userPrompt, "role": "user" }
      ],
      model: "gpt-3.5-turbo"
    });

    const response = completion.choices[0].message.content;

    return response ?? "";
  }
}

export default OpenAIProvider;
