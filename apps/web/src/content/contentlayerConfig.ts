// @ts-check

import { makeSource } from 'contentlayer2/source-files';
import remarkFrontmatter from 'remark-frontmatter';
import remarkGfm from 'remark-gfm';
import remarkMdxFrontmatter from 'remark-mdx-frontmatter';

import { BlogAuthorDocument } from '../components/blog/contentlayer/BlogAuthorDocument';
import { BlogCategoryDocument } from '../components/blog/contentlayer/BlogCategoryDocument';
import { BlogPostDocument } from '../components/blog/contentlayer/BlogPostDocument';
import { BlogSeriesDocument } from '../components/blog/contentlayer/BlogSeriesDocument';
import { BlogSubseriesDocument } from '../components/blog/contentlayer/BlogSubseriesDocument';
import { JobsPostingDocument } from '../components/hiring/contentlayer/JobsPostingDocument';
import { InterviewsQuestionQuizScrollableContentDocument } from '../components/interviews/questions/content/quiz/InterviewsQuestionQuizScrollableContentDocument';
import { InterviewsListingBottomContentDocument } from '../components/interviews/questions/listings/InterviewsListingBottomContentDocument';
import { InterviewsStudyListDocument } from '../components/interviews/questions/listings/study-list/InterviewsStudyListDocument';
import { ProjectsChallengeAPIWriteupDocument } from '../components/projects/contentlayer/ProjectsChallengeAPIWriteupDocument';
import { ProjectsChallengeAppendixDocument } from '../components/projects/contentlayer/ProjectsChallengeAppendixDocument';
import { ProjectsChallengeBriefDocument } from '../components/projects/contentlayer/ProjectsChallengeBriefDocument';
import { ProjectsChallengeGuideDocument } from '../components/projects/contentlayer/ProjectsChallengeGuideDocument';
import { ProjectsChallengeInfoDocument } from '../components/projects/contentlayer/ProjectsChallengeInfoDocument';
import { ProjectsChallengeMetadataDocument } from '../components/projects/contentlayer/ProjectsChallengeMetadataDocument';
import { ProjectsChallengeStyleGuideDocument } from '../components/projects/contentlayer/ProjectsChallengeStyleGuideDocument';
import { ProjectsCommonGuideDocument } from '../components/projects/contentlayer/ProjectsCommonGuideDocument';
import { ProjectsSkillInfoDocument } from '../components/projects/contentlayer/ProjectsSkillInfoDocument';
import { ProjectsSkillMetadataDocument } from '../components/projects/contentlayer/ProjectsSkillMetadataDocument';
import { ProjectsTrackInfoDocument } from '../components/projects/contentlayer/ProjectsTrackInfoDocument';
import { ProjectsTrackMetadataDocument } from '../components/projects/contentlayer/ProjectsTrackMetadataDocument';

export default makeSource({
  contentDirPath: 'src/content',
  documentTypes: [
    BlogAuthorDocument,
    BlogCategoryDocument,
    BlogPostDocument,
    BlogSeriesDocument,
    BlogSubseriesDocument,
    InterviewsStudyListDocument,
    InterviewsListingBottomContentDocument,
    InterviewsQuestionQuizScrollableContentDocument,
    ProjectsCommonGuideDocument,
    ProjectsChallengeAppendixDocument,
    ProjectsChallengeBriefDocument,
    ProjectsChallengeGuideDocument,
    ProjectsChallengeInfoDocument,
    ProjectsChallengeMetadataDocument,
    ProjectsChallengeStyleGuideDocument,
    ProjectsChallengeAPIWriteupDocument,
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
