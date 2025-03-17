import { MDXHandler } from '../handlers/MDXHandler';
import matter from 'gray-matter';
import { IChangeDetector, IFileRegistryManager } from '../interfaces';

const sampleMDX = `---
title: "Hello World"
author:
  name: "John Doe"
  email: "john@example.com"
---

# Welcome to MDX!`;

const translatedContent = {
  title: 'Hola Mundo',
  mdxBody: '# ¡Bienvenido a MDX!',
};

describe('MDXHandler', () => {
  let mdxHandler: MDXHandler;
  let mockChangeDetector: IChangeDetector;
  let mockFileRegistryManager: IFileRegistryManager;

  // Mock dependencies
  mockChangeDetector = {
    generateHash: vi.fn(),
    getChangedKeys: vi.fn(),
    isHashEqual: vi.fn(),
    getUpdatedHashes: vi.fn(),
    generateKeyHashes: vi.fn(),
  };

  mockFileRegistryManager = {
    load: vi.fn(),
    save: vi.fn(),
  };

  beforeEach(() => {
    mdxHandler = new MDXHandler(mockChangeDetector, mockFileRegistryManager);
  });

  test('should extract translatable content correctly', async () => {
    const result = await mdxHandler.extractTranslatableContent(sampleMDX);
    expect(result).toEqual({
      title: 'Hello World',
      'author.name': 'John Doe',
      'author.email': 'john@example.com',
      mdxBody: '\n# Welcome to MDX!',
    });
  });

  test('should rebuild content correctly with translations', async () => {
    const result = await mdxHandler.rebuildContent(
      sampleMDX,
      '',
      translatedContent,
      [],
    );
    const parsed = matter(result);
    expect(parsed.data).toEqual({
      title: 'Hola Mundo',
      author: {
        name: 'John Doe',
        email: 'john@example.com',
      },
    });
    expect(parsed.content.trim()).toBe('# ¡Bienvenido a MDX!');
  });

  test('should handle removed keys correctly', async () => {
    const result = await mdxHandler.rebuildContent(
      sampleMDX,
      '',
      translatedContent,
      ['author'],
    );
    const parsed = matter(result);
    expect(parsed.data).toEqual({
      title: 'Hola Mundo',
    });
    expect(parsed.content.trim()).toBe('# ¡Bienvenido a MDX!');
  });

  test('should rebuild content correctly when original content is empty', async () => {
    const translatedContentOnly = {
      title: 'Salut Monde',
      mdxBody: '# Bonjour à MDX!',
    };
    const result = await mdxHandler.rebuildContent(
      '',
      '',
      translatedContentOnly,
      [],
    );
    const parsed = matter(result);
    expect(parsed.data).toEqual({ title: 'Salut Monde' });
    expect(parsed.content.trim()).toBe('# Bonjour à MDX!');
  });
});
