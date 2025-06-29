// This file is imported by Next config and i18n middleware.
// Keep it in JS + lean since next.config.js might not transpile it.
export const redirects = [
  {
    destination: '/interviews/pricing',
    permanent: false,
    source: '/pricing',
  },
  {
    destination: '/interviews/payment/success',
    permanent: false,
    source: '/payment/success',
  },
  {
    destination: '/interviews/get-started',
    permanent: false,
    source: '/get-started',
  },
  {
    destination: '/interviews/dashboard',
    permanent: false,
    source: '/prepare',
  },
  {
    destination: '/questions',
    permanent: false,
    source: '/prepare/coding',
  },
  {
    destination: '/questions/quiz',
    permanent: false,
    source: '/prepare/quiz',
  },
  {
    destination: '/questions/system-design',
    permanent: false,
    source: '/prepare/system-design',
  },
  {
    destination: '/behavioral-interview-playbook',
    permanent: false,
    source: '/prepare/behavioral',
  },
  {
    destination: '/questions/quiz/:path*',
    permanent: false,
    source: '/questions/quiz/css/:path*',
  },
  {
    destination: '/questions/quiz/:path*',
    permanent: false,
    source: '/questions/quiz/html/:path*',
  },
  {
    destination: '/questions/quiz/:path*',
    permanent: false,
    source: '/questions/quiz/javascript/:path*',
  },
  // Formats
  {
    destination: '/questions',
    permanent: false,
    source: '/questions/coding',
  },
  {
    destination: '/questions/formats/javascript-functions',
    permanent: false,
    source: '/questions/js',
  },
  {
    destination: '/questions/formats/javascript-functions',
    permanent: false,
    source: '/questions/javascript',
  },
  {
    destination: '/questions/formats/javascript-functions',
    permanent: false,
    source: '/questions/javascript-functions',
  },
  {
    destination: '/questions/formats/ui-coding',
    permanent: false,
    source: '/questions/user-interface',
  },
  {
    destination: '/questions/formats/ui-coding',
    permanent: false,
    source: '/questions/ui-coding',
  },
  {
    destination: '/questions/formats/algo-coding',
    permanent: false,
    source: '/questions/algo',
  },
  {
    destination: '/questions/formats/algo-coding',
    permanent: false,
    source: '/questions/algo-coding',
  },
  {
    destination: '/questions/javascript-interview-questions',
    permanent: false,
    source: '/questions/js',
  },
  {
    destination: '/questions/javascript-interview-questions',
    permanent: false,
    source: '/questions/js/coding',
  },
  {
    destination: '/questions/javascript-interview-questions/quiz',
    permanent: false,
    source: '/questions/js/quiz',
  },
  {
    destination: '/questions/javascript-interview-questions',
    permanent: false,
    source: '/questions/js/coding/data-structures-algorithms',
  },
  {
    destination: '/questions/javascript-interview-questions',
    permanent: false,
    source: '/questions/js/coding/user-interface',
  },
  {
    destination: '/questions/javascript-interview-questions/',
    permanent: false,
    source: '/questions/js/coding/utilities',
  },
  {
    destination: '/questions/html-interview-questions',
    permanent: false,
    source: '/questions/html',
  },
  {
    destination: '/questions/html-interview-questions',
    permanent: false,
    source: '/questions/html/coding',
  },
  {
    destination: '/questions/html-interview-questions/quiz',
    permanent: false,
    source: '/questions/html/quiz',
  },
  {
    destination: '/questions/css-interview-questions',
    permanent: false,
    source: '/questions/css',
  },
  {
    destination: '/questions/css-interview-questions',
    permanent: false,
    source: '/questions/css/coding',
  },
  {
    destination: '/questions/css-interview-questions/quiz',
    permanent: false,
    source: '/questions/css/quiz',
  },
  {
    destination: '/questions/typescript-interview-questions',
    permanent: false,
    source: '/questions/ts',
  },
  {
    destination: '/questions/javascript-interview-questions',
    permanent: false,
    source: '/questions/frameworks',
  },
  {
    destination: '/questions/react-interview-questions',
    permanent: false,
    source: '/questions/react',
  },
  {
    destination: '/questions/react-interview-questions',
    permanent: false,
    source: '/questions/formats/react',
  },
  {
    destination: '/questions/vanilla-javascript-interview-questions',
    permanent: false,
    source: '/questions/vanilla',
  },
  {
    destination: '/questions/svelte-interview-questions',
    permanent: false,
    source: '/questions/svelte',
  },
  {
    destination: '/questions/angular-interview-questions',
    permanent: false,
    source: '/questions/angular',
  },
  {
    destination: '/questions/vue-interview-questions',
    permanent: false,
    source: '/questions/vue',
  },
  {
    destination: '/questions/vue-interview-questions',
    permanent: false,
    source: '/questions/vue-interview-questions/quiz',
  },
  {
    destination: '/interviews/study-plans',
    permanent: false,
    source: '/study-plans',
  },
  {
    destination: '/interviews/study-plans/one-week',
    permanent: false,
    source: '/prepare/one-week',
  },
  {
    destination: '/interviews/study-plans/one-month',
    permanent: false,
    source: '/prepare/one-month',
  },
  {
    destination: '/interviews/study-plans/three-months',
    permanent: false,
    source: '/prepare/three-months',
  },
  {
    destination: '/interviews/focus-areas',
    permanent: false,
    source: '/focus-areas',
  },
  {
    destination: '/interviews/focus-areas/:path*',
    permanent: false,
    source: '/focus-areas/:path*',
  },
  {
    destination: '/front-end-system-design-playbook',
    permanent: false,
    source: '/system-design',
  },
  {
    destination: '/front-end-system-design-playbook/:path*',
    permanent: false,
    source: '/system-design/:path*',
  },
  {
    destination: '/front-end-interview-playbook',
    permanent: false,
    source: '/front-end-interview-guidebook',
  },
  {
    destination: '/front-end-interview-playbook/:path*',
    permanent: false,
    source: '/front-end-interview-guidebook/:path*',
  },
  {
    destination: '/behavioral-interview-playbook',
    permanent: false,
    source: '/behavioral-interview-guidebook',
  },
  {
    destination: '/behavioral-interview-playbook/:path*',
    permanent: false,
    source: '/behavioral-interview-guidebook/:path*',
  },
  {
    destination: '/',
    permanent: false,
    source: '/home',
  },
  {
    destination: '/interviews/get-started',
    permanent: false,
    source: '/interviews',
  },
  {
    destination: '/questions/css-interview-questions',
    permanent: false,
    source: '/questions/css-interview-questions/javascript-functions',
  },
  {
    destination: '/questions/css-interview-questions',
    permanent: false,
    source: '/questions/css/coding/javascript',
  },
  {
    destination: '/questions/html-interview-questions',
    permanent: false,
    source: '/questions/html-interview-questions/javascript-functions',
  },
  {
    destination: '/questions/html-interview-questions',
    permanent: false,
    source: '/questions/html/coding/utilities',
  },
  {
    destination: '/questions/javascript-interview-questions',
    permanent: false,
    source: '/questions/javascript-interview-questions/javascript-functions',
  },
  {
    destination: '/questions/javascript-interview-questions',
    permanent: false,
    source: '/questions/javascript-interview-questions/ui-coding',
  },
  {
    destination: '/questions/javascript-interview-questions',
    permanent: false,
    source: '/questions/js/coding/algo',
  },
  {
    destination: '/questions/javascript-interview-questions',
    permanent: false,
    source: '/questions/js/coding/data-structures-algorithms',
  },
  {
    destination: '/questions/javascript-interview-questions',
    permanent: false,
    source: '/questions/js/coding/javascript',
  },
  {
    destination: '/questions/javascript-interview-questions',
    permanent: false,
    source: '/questions/js/coding/user-interface',
  },
  {
    destination: '/questions/javascript-interview-questions',
    permanent: false,
    source: '/questions/js/coding/utilities',
  },
  {
    destination: '/questions/algo/binary-search',
    permanent: false,
    source: '/questions/javascript/binary-search',
  },
  {
    destination: '/questions/algo/breadth-first-search',
    permanent: false,
    source: '/questions/javascript/breadth-first-search',
  },
  {
    destination: '/questions/algo/depth-first-search',
    permanent: false,
    source: '/questions/javascript/depth-first-search',
  },
  {
    destination: '/questions/algo/merge-sort',
    permanent: false,
    source: '/questions/javascript/merge-sort',
  },
  {
    destination: '/questions/algo/queue',
    permanent: false,
    source: '/questions/javascript/queue',
  },
  {
    destination: '/questions/algo/stack',
    permanent: false,
    source: '/questions/javascript/stack',
  },
  {
    destination: '/questions/algo/topological-sort',
    permanent: false,
    source: '/questions/javascript/topological-sort',
  },
  {
    destination: '/questions/algo/quick-sort',
    permanent: false,
    source: '/questions/javascript/quick-sort',
  },
  {
    destination: '/questions/algo/heap-sort',
    permanent: false,
    source: '/questions/javascript/heap-sort',
  },
  {
    destination: '/questions/algo/insertion-sort',
    permanent: false,
    source: '/questions/javascript/insertion-sort',
  },
  {
    destination: '/questions/algo/selection-sort',
    permanent: false,
    source: '/questions/javascript/selection-sort',
  },
];
