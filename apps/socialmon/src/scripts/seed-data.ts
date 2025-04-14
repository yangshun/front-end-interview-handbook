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
        postFilteringPrompt: `Act as a content analyzer specializing in identifying frontend development and frontend interview preparation content.

          Your task is to carefully analyze the title and content of the given post to determine if its context revolves around any of the following topics or related subtopics:

          1. Frontend interview preparation: Posts discussing strategies, tips, or advice for acing frontend interviews, including common interview questions and how to prepare for them.
          2. Javascript interview preparation: Content focused on preparing for interviews that test JavaScript skills, including syntax, frameworks, and best practices.
          3. Frontend technology/library interview preparation: Posts centered on preparing for interviews that focus on React, Angular, Vue, Svelte, etc, including its ecosystem, components, state management, and Hooks.
          4. Frontend system design: Posts content centered around on preparation or asking for help around frontend system design.
          4. Frontend interview help: Queries or discussions seeking assistance with frontend system  design and frontend interview questions, including coding challenges, behavioral questions, or general advice.
          5. Frontend interview study plan help: Content related to creating or following a study plan for frontend interviews, including resource recommendations.
          6. Career switch to frontend: Posts about transitioning to a frontend development career, including advice for beginners, necessary skills, and personal anecdotes.`,
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
