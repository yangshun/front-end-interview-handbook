import prisma from '../server/prisma';

async function seedData() {
  // Create some projects
  await prisma.project.createMany({
    data: [
      {
        keywords: [
          'frontend',
          'front-end',
          'front end',
          'webdev',
          'web dev',
          'wed development',
          'html',
          'css',
          'javascript',
          'js',
          'react',
          'angular',
          'vue',
          'nextjs',
          'interview',
        ],
        name: 'GFE Interviews',
        productsToAdvertise: [
          {
            description:
              'List of frontend coding questions for helping people of all levels of experience prepare for frontend interviews',
            url: 'https://www.greatfrontend.com/prepare/coding',
          },
          {
            description:
              'List of curated HTML, CSS, Javascript, Accessibility, Internationalization, Performance, Security, Testing topic quiz type questions',
            url: 'https://greatfrontend.com/prepare/quiz',
          },
        ],
        subreddits: [
          'frontend',
          'webdev',
          'javascript',
          'developersIndia',
          'reactjs',
          'vuejs',
          'angular',
          'angularjs',
          'css',
        ],
      },
    ],
  });
}

seedData();
