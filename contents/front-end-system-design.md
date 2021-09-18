---
title: Front End System Design
sidebar_label: System Design
---

"System" here typically refers to front end systems, which are different from the typical distributed system design questions for Software Engineering interviews. This format of question is quite similar to the ["Build User Interface" format](./build-user-interfaces.md) and there's a significant amount of overlap between that and this - you will likely need to do some design in that and also do some coding here to illustrate your ideas/app state format.

The difference between this section and the ["Build User Interface" format](./build-user-interfaces.md) is that the questions here are usually larger. If the session is only half an hour, candidates are expected to talk about the design tradeoffs, possible implementations, instead of coding it out. Because this format of questions involve multiple components and knowledge across the web stack, candidates usually do not have to go very deep into the lower-level details and can keep the discussion at a higher level.

Many of the topics mentioned in the ["Build User Interface" format](./build-user-interfaces.md) are also relevant for front end system design - API design, scalability, performance, user experience, i18n, accessibility, security. Candidates should take the initiative and bring these topics up and lead the discussion with the interviewer. The more advanced topics such as performance, accessibility and i18n are what differentiates senior candidates from the more junior ones.

If you possess a laptop and are asked to code them out, you usually can use a JavaScript framework/library and in that case you are recommended to use tools that help you scaffold a fresh app where you can start coding immediately (e.g. `create-react-app`, `vue-cli`). You don't want to be spending time during the interview doing unnecessary plumbing that doesn't give your interviewers additional useful signals.

## Basic Examples

- Tic-tac-toe Game
- Whack-a-mole Game
- Sortable Data Table (with extensions for filtering)

## Advanced Examples

If you have to implement these, usually you are given more than half an hour

- WYSIWYG Editor
- Tetris Game
- Snake Game

## Helpful Articles

Many companies blog about their technical challenges in the front end domain and these are great content to learn more about designing front end systems.

- [Building the Google Photos Web UI](https://medium.com/google-design/google-photos-45b714dfbed1)
- [Twitter Lite and High Performance React Progressive Web Apps at Scale](https://medium.com/@paularmstrong/twitter-lite-and-high-performance-react-progressive-web-apps-at-scale-d28a00e780a3)
- [A Netflix Web Performance Case Study](https://medium.com/dev-channel/a-netflix-web-performance-case-study-c0bcde26a9d9)
- [A Tinder Progressive Web App Performance Case Study](https://medium.com/@addyosmani/a-tinder-progressive-web-app-performance-case-study-78919d98ece0)
- [A Pinterest Progressive Web App Performance Case Study](https://medium.com/dev-channel/a-pinterest-progressive-web-app-performance-case-study-3bd6ed2e6154)
- [A React And Preact Progressive Web App Performance Case Study: Treebo](https://medium.com/dev-channel/treebo-a-react-and-preact-progressive-web-app-performance-case-study-5e4f450d5299)
- [Rebuilding our tech stack for the new Facebook.com](https://engineering.fb.com/2020/05/08/web/facebook-redesign/)
