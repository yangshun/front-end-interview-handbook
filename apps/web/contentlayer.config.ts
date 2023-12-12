import { defineDocumentType, makeSource } from 'contentlayer/source-files';

const ProjectsProject = defineDocumentType(() => ({
  name: 'Project',
  filePathPattern: 'projects/**/*.mdx',
  contentType: 'mdx',
  fields: {
    slug: {
      type: 'string',
      description: 'Unique identifier of the project',
      required: true,
    },
    title: {
      type: 'string',
      description: 'Title of the project',
      required: true,
    },
  },
  computedFields: {
    href: {
      type: 'string',
      resolve: (doc) => `/projects/p/${doc.slug}`,
    },
  },
}));

export default makeSource({
  contentDirPath: 'src/content',
  documentTypes: [ProjectsProject],
});
