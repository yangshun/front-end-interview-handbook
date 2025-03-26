import matter from 'gray-matter';
import murmur from 'murmurhash';

export function generateHash(content: string): string {
  return murmur.v3(content).toString(16);
}

export function generateMDXContentSegments(content: String) {
  return content
    .split(/\n\s*\n/)
    .map((para) => para.trim())
    .filter(Boolean);
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
  translatedContentMap?: Record<string, string>,
) {
  const updatedFrontmatter: Record<string, string> = {};
  Object.keys(sourceFrontmatter).forEach((key) => {
    updatedFrontmatter[key] = translatedContentMap?.[key]
      ? translatedContentMap[key]
      : targetFrontmatter[key]
        ? targetFrontmatter[key]
        : sourceFrontmatter[key];
  });

  return updatedFrontmatter;
}

export function buildTargetMDXContent(
  sourceMDXContent: string,
  targetMDXContent: string,
  registryTargetHashList: Array<string>,
  translatedContentMap?: Record<string, string>,
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
    return translatedContentMap?.[hash] || '';
  });

  return '\n' + newContent.join('\n\n');
}

export function buildTargetMDX(
  sourceContent: string,
  targetContent: string,
  registryTargetHashList: Array<string>,
  translatedContentMap?: Record<string, string>,
) {
  const { data: sourceFrontmatter, content: sourceMDXContent } =
    matter(sourceContent);
  const { data: targetFrontmatter, content: targetMDXContent } =
    matter(targetContent);

  const updatedFrontmatter = buildTargetMDXFrontmatter(
    sourceFrontmatter,
    targetFrontmatter,
    translatedContentMap,
  );
  const updatedMDXContent = buildTargetMDXContent(
    sourceMDXContent,
    targetMDXContent,
    registryTargetHashList,
    translatedContentMap,
  );

  return matter.stringify(updatedMDXContent, updatedFrontmatter);
}
