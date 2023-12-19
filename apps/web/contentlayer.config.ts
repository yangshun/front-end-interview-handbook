import { makeSource } from 'contentlayer/source-files';
import { ProjectsProjectDocument } from './src/components/projects/projects/ProjectsContentLayer';

export default makeSource({
  contentDirPath: 'src/content',
  documentTypes: [ProjectsProjectDocument],
});
