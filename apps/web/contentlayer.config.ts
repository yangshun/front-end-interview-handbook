// @ts-check

import { makeSource } from 'contentlayer/source-files';
import remarkFrontmatter from 'remark-frontmatter';
import remarkGfm from 'remark-gfm';
import remarkMdxFrontmatter from 'remark-mdx-frontmatter';

import { BlogAuthorDocument } from './src/components/blog/contentlayer/BlogAuthorDocument';
import { BlogCategoryDocument } from './src/components/blog/contentlayer/BlogCategoryDocument';
import { BlogPostDocument } from './src/components/blog/contentlayer/BlogPostDocument';
import { BlogSeriesDocument } from './src/components/blog/contentlayer/BlogSeriesDocument';
import { BlogSubseriesDocument } from './src/components/blog/contentlayer/BlogSubseriesDocument';
import { ProjectsChallengeBriefDocument } from './src/components/projects/contentlayer/ProjectsChallengeBriefDocument';
import { ProjectsChallengeInfoDocument } from './src/components/projects/contentlayer/ProjectsChallengeInfoDocument';
import { ProjectsChallengeMetadataDocument } from './src/components/projects/contentlayer/ProjectsChallengeMetadataDocument';
import { ProjectsChallengeStyleGuideDocument } from './src/components/projects/contentlayer/ProjectsChallengeStyleGuideDocument';
import { ProjectsChallengeAPIWriteupDocument } from './src/components/projects/contentlayer/ProjectsChallengeAPIWriteupDocument';
import { ProjectsChallengeGuideDocument } from './src/components/projects/contentlayer/ProjectsChallengeGuideDocument';
import { ProjectsTrackMetadataDocument } from './src/components/projects/contentlayer/ProjectsTrackMetadataDocument';
import { ProjectsTrackInfoDocument } from './src/components/projects/contentlayer/ProjectsTrackInfoDocument';
import { JobsPostingDocument } from './src/contentlayer/document/JobsPostingDocument';
import { ProjectsSkillMetadataDocument } from './src/components/projects/contentlayer/ProjectsSkillMetadataDocument';
import { ProjectsSkillInfoDocument } from './src/components/projects/contentlayer/ProjectsSkillInfoDocument';

export default makeSource({
  contentDirPath: 'src/content',
  documentTypes: [
    BlogAuthorDocument,
    BlogCategoryDocument,
    BlogPostDocument,
    BlogSeriesDocument,
    BlogSubseriesDocument,
    ProjectsChallengeBriefDocument,
    ProjectsChallengeInfoDocument,
    ProjectsChallengeMetadataDocument,
    ProjectsChallengeStyleGuideDocument,
    ProjectsChallengeAPIWriteupDocument,
    ProjectsChallengeGuideDocument,
    ProjectsSkillMetadataDocument,
    ProjectsSkillInfoDocument,
    ProjectsTrackMetadataDocument,
    ProjectsTrackInfoDocument,
    JobsPostingDocument,
  ],
  mdx: {
    remarkPlugins: [remarkGfm, remarkFrontmatter, remarkMdxFrontmatter],
  },
});
