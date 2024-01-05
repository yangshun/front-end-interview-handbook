// @ts-check

import { makeSource } from 'contentlayer/source-files';
import remarkFrontmatter from 'remark-frontmatter';
import remarkGfm from 'remark-gfm';
import remarkMdxFrontmatter from 'remark-mdx-frontmatter';

import { BlogAuthorDocument } from './src/contentlayer/document/BlogAuthorDocument';
import { BlogCategoryDocument } from './src/contentlayer/document/BlogCategoryDocument';
import { BlogPostDocument } from './src/contentlayer/document/BlogPostDocument';
import { BlogSeriesDocument } from './src/contentlayer/document/BlogSeriesDocument';
import { BlogSubseriesDocument } from './src/contentlayer/document/BlogSubseriesDocument';
import { ProjectsProjectMetadataDocument } from './src/components/projects/contentlayer/ProjectsProjectMetadataDocument';
import { ProjectsProjectStyleGuideDocument } from './src/components/projects/contentlayer/ProjectsProjectStyleGuideDocument';
import { ProjectsProjectAPIWriteupDocument } from './src/components/projects/contentlayer/ProjectsProjectAPIWriteupDocument';

export default makeSource({
  contentDirPath: 'src/content',
  documentTypes: [
    BlogAuthorDocument,
    BlogCategoryDocument,
    BlogPostDocument,
    BlogSeriesDocument,
    BlogSubseriesDocument,
    ProjectsProjectMetadataDocument,
    ProjectsProjectStyleGuideDocument,
    ProjectsProjectAPIWriteupDocument,
  ],
  mdx: {
    remarkPlugins: [remarkGfm, remarkFrontmatter, remarkMdxFrontmatter],
  },
});
