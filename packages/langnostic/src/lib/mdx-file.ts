import matter from 'gray-matter';
import { omit } from 'lodash-es';
import murmur from 'murmurhash';
import remarkMdx from 'remark-mdx';
import remarkParse from 'remark-parse';
import remarkStringify from 'remark-stringify';
import { unified } from 'unified';

export function generateHash(content: string): string {
  return murmur.v3(content).toString(16);
}

export function generateMDXContentSegments(content: string) {
  const processor = unified().use(remarkParse).use(remarkMdx);

  const tree = processor.parse(content);

  // Get top-level nodes (blocks)
  const blocks = tree.children;

  // Convert each node back to string (MDX block)
  const stringifiedBlocks = blocks.map((node) =>
    unified()
      .use(remarkStringify)
      .use(remarkMdx)
      .stringify({ type: 'root', children: [node] }),
  );
  return stringifiedBlocks;
}

/**
 * Generates a map of hash values for each content segment
 */
export function generateSourceMDXContentHashMap(content: string) {
  const segments = generateMDXContentSegments(content);
  return segments.reduce(
    (acc, segment) => {
      const hashValue = generateHash(segment);
      acc[hashValue] = segment;
      return acc;
    },
    {} as Record<string, string>,
  );
}

/**
 * Generates a list of hash values for each content segment
 */
export function generateMDXContentHashList(content: string) {
  const segments = generateMDXContentSegments(content);
  return segments.map((segment) => generateHash(segment));
}

export function generateTargetMDXContentHashMap(
  content: string,
  registryHashList: Array<string>,
) {
  const segments = generateMDXContentSegments(content);
  return segments.reduce(
    (acc, segment, index) => {
      acc[registryHashList[index]] = segment;
      return acc;
    },
    {} as Record<string, string>,
  );
}

export function buildTargetMDXFrontmatter(
  sourceFrontmatter: Record<string, string>,
  targetFrontmatter: Record<string, string>,
  translatedContent?: Record<string, string>,
  excludedKeys?: ReadonlyArray<string>,
) {
  const updatedFrontmatter: Record<string, string> = {};
  Object.keys(sourceFrontmatter).forEach((key) => {
    updatedFrontmatter[key] = translatedContent?.[key]
      ? translatedContent[key]
      : !excludedKeys?.includes(key) && targetFrontmatter[key]
        ? targetFrontmatter[key]
        : sourceFrontmatter[key];
  });

  return updatedFrontmatter;
}

export function buildTargetMDXContent(
  sourceMDXContent: string,
  targetMDXContent: string,
  registryTargetHashList: Array<string>,
  translatedContent?: Record<string, string>,
) {
  const sourceHashList = generateMDXContentHashList(sourceMDXContent);
  const targetHashList = generateMDXContentHashList(targetMDXContent);

  const targetHashMap =
    registryTargetHashList.length !== targetHashList.length
      ? {}
      : generateTargetMDXContentHashMap(
          targetMDXContent,
          registryTargetHashList,
        );

  const newContent = sourceHashList.map((hash) => {
    if (targetHashMap[hash]) {
      return targetHashMap[hash];
    }
    return translatedContent?.[hash] || '';
  });

  const adjustedJoin = (arr: string[]) => {
    return arr.reduce((acc, curr, index) => {
      if (index === 0) return curr;
      const prev = arr[index - 1];
      const separator = prev.endsWith('\n') ? '\n' : '\n\n';
      return acc + separator + curr;
    }, '');
  };
  return '\n' + adjustedJoin(newContent);
}

export function buildTargetMDX(
  sourceContent: string,
  targetContent: string,
  registryTargetHashList: Array<string>,
  translatedContent?: Record<string, string>,
) {
  const { data: sourceFrontmatter, content: sourceMDXContent } =
    matter(sourceContent);
  const { data: targetFrontmatter, content: targetMDXContent } =
    matter(targetContent);

  const updatedFrontmatter = buildTargetMDXFrontmatter(
    sourceFrontmatter,
    targetFrontmatter,
    translatedContent,
  );
  const updatedMDXContent = buildTargetMDXContent(
    sourceMDXContent,
    targetMDXContent,
    registryTargetHashList,
    translatedContent,
  );

  return matter.stringify(updatedMDXContent, updatedFrontmatter);
}

export function getFrontmatterWithoutExcludedKeys(
  frontmatter: Record<string, string>,
  excludedKeys: Array<string>,
): Record<string, string> {
  return omit(frontmatter, excludedKeys);
}
