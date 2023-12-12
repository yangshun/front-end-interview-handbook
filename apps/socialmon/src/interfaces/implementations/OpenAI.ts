import type { Post } from '~/models/Post';

import type { AIProvider } from '../AIProvider';

class OpenAI implements AIProvider {
  generateResponseTo(post: Post): Promise<string> {
    throw new Error('Method not implemented.');
  }
}

export default OpenAI;
