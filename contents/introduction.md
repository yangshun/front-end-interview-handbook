---
title: Introduction
---

:::info We are now part of GreatFrontEnd!

Front End Interview Handbook is now part of [GreatFrontEnd](https://www.greatfrontend.com)! We are working to migrate the content over and you may find the latest version of this page on [GreatFrontEnd](https://www.greatfrontend.com/front-end-interview-guidebook).

:::

## What is this?

Unlike typical software engineer job interviews, front end interviews have less emphasis on algorithms and have more questions on intricate knowledge and expertise about the front end domain — HTML, CSS, JavaScript, just to name a few.

Many front end interviews are highly-focused on domain knowledge and applying them to real-world scenarios. You might find that grinding LeetCode is not all you need when it comes to interviewing for a front end position, but that's a good thing! Front end interviews tend to test concepts that are more practical and relevant to real world front end development. But that doesn't mean that you don't have to be familiar with basic data structures and algorithmic concepts - there's just less emphasis on them and you are probably going to get easier algorithmic questions.

While there are some existing resources to help front end developers in preparing for interviews, they aren't as abundant as materials for a general software engineer interview. Among the existing resources, the most helpful question bank would probably be [Front-end Developer Interview Questions](https://github.com/h5bp/Front-end-Developer-Interview-Questions). Unfortunately, there aren't many complete and satisfactory answers to these questions readily available online. This handbook answers these trivia-style questions along with information and guidance for other front end interview formats.

To solve this problem, [GreatFrontEnd](https://www.greatfrontend.com?utm_source=frontendinterviewhandbook&utm_medium=referral&utm_content=introduction&fpr=frontendinterviewhandbook), an interview preparation platform for Front End interviews, was created. It contains Front End interview questions and answers written by ex-FAANG Senior Engineers (such as myself!) and have both questions and answers for various formats: JavaScript, TypeScript, User Interface Component questions, quiz-style front end questions.

## General tips for front end interviews

Regardless of which type of format you are given, one thing stays true - you need to be extremely strong in your front end fundamentals and constantly display mastery of them to your interviewer.

Be _extremely_ familiar with the following concepts:

- CSS: Specificity, Box model, Layout, Positioning
- JavaScript: `this` keyword, Prototypes, closures, Async-style code, Promises, Timers (`setTimeout`, `setInterval`)
- JavaScript design patterns: Observer pattern, Module pattern
- HTML: Event delegation (it was useful in almost every interview), DOM traversal, DOM manipulation, Form validation and submission
- Vanilla JS, or jQuery at the very least. Not all interviews allow you to use React as they want to see mastery of the fundamentals

Look out for interview questions by companies on Glassdoor. Front end questions are not as abundant but some still can be found. Many companies use similar questions.

## Front end interview formats

Unlike Software Engineering interviews, the formats for front end interviews are less known and not standardized across the industry. We have made the effort to search the Internet for front end interview questions asked by the popular companies and there are some questions which appear very often. In general, you should be familiar with the following questions and formats:

### Trivia questions

Short questions which test your knowledge and have clear non-subjective answers. These are usually asked by recruiters because the accuracy of the answers can be verified even by non-technical people. Here are some examples:

- JavaScript
  - What is a closure?
  - What is the difference between a promise and a callback?
  - Explain the `this` keyword in JavaScript.
- CSS
  - What is the CSS box model?
  - Various CSS `position` properties and its differences.

[**Read more about front end trivia questions →**](./trivia.md)

### JavaScript coding

This is the front end version of LeetCode-style algorithm questions. Implement a function in JavaScript, which can be a utility function found in Lodash/Underscore (e.g. `throttle`), or a polyfill for the JavaScript language/DOM APIs (e.g. `Array.prototype.filter()`, `Promise.all()`, `document.getElementsByClassName()`).

- Implement `Array.prototype` functions: `map`, `reduce`, `filter`, `sort`.
- Implement DOM APIs: `document.getElementsByClassName`, `document.getElementsByTagName`.
- `debounce`/`throttle`.
- Implement Promise/Promise-related APIs: `Promise`, `Promise.all`, `Promise.any`.

### User interface coding

Build user interfaces (can be a UI component, an app, or a game) using HTML, CSS, and JavaScript.

- Components
  - Autocomplete (**very popular**)
  - Photo gallery
  - Image carousel
  - Tooltip component
  - Star rating widget
- Apps
  - Build tic-tac-toe
  - Build a chess board with movable pieces

[**Read more about front end coding questions →**](./algorithms.md)

### Algorithmic coding

LeetCode-style algorithmic coding questions which evaluate your core data structures and algorithms skills. You can be asked any question on LeetCode and might be asked to complete them using JavaScript.

### System design

Describe and discuss how you would build a UI component/app/game and its architecture. This is the front end version of system design questions. E.g. Describe how you would build the Emoji autocomplete feature in a chat app, what APIs it would have, what components there are to the feature, how to ensure it has good performance, UX, etc.

- Design an image carousel component.
- Design an email client application.

[**Read more about front end system design →**](./front-end-system-design.md)

:::info Be interview-ready with GreatFrontEnd

[GreatFrontEnd](https://www.greatfrontend.com) has questions and answers for all kind of front end interview questions, [study plans](https://www.greatfrontend.com/get-started), and a [huge question bank](https://www.greatfrontend.com/prepare/coding)!

:::

## Company interview formats

Through extensive research, here are the different type of formats companies ask during the technical rounds of front end interviews. If you're interviewing for front end engineering roles at certain companies, prepare accordingly!

_Legend: ✅: Asked, ❌: Not asked, ⚠️: No data_

| Company | Trivia | Algorithms | JavaScript coding | UI coding | System design |
| :-- | :-: | :-: | :-: | :-: | :-: |
| [**Airbnb**](./companies/airbnb-front-end-interview-questions.md) | ❌ | ✅ | ✅ | ✅ | ❌ |
| [**Amazon**](./companies/amazon-front-end-interview-questions.md) | ✅ | ✅ | ✅ | ✅ | ✅ |
| [**Apple**](./companies/apple-front-end-interview-questions.md) | ⚠️ | ⚠️ | ✅ | ✅ | ⚠️ |
| [**ByteDance/TikTok**](./companies/bytedance-tiktok-front-end-interview-questions.md) | ✅ | ✅ | ✅ | ✅ | ❌ |
| [**Dropbox**](./companies/dropbox-front-end-interview-questions.md) | ❌ | ⚠️ | ✅ | ✅ | ✅ |
| Facebook/Meta | ✅ | ❌ | ✅ | ❌ | ✅ |
| Flipkart | ⚠️ | ✅ | ⚠️ | ⚠️ | ⚠️ |
| [**Google**](./companies/google-front-end-interview-questions.md) | ✅ | ✅ | ✅ | ✅ | ✅ |
| [**LinkedIn**](./companies/linkedin-front-end-interview-questions.md) | ✅ | ⚠️ | ✅ | ✅ | ⚠️ |
| [**Lyft**](./companies/lyft-front-end-interview-questions.md) | ❌ | ❌ | ✅ | ✅ | ✅ |
| [**Microsoft**](./companies/microsoft-front-end-interview-questions.md) | ✅ | ✅ | ✅ | ✅ | ⚠️ |
| [**Salesforce**](./companies/salesforce-front-end-interview-questions.md) | ✅ | ⚠️ | ⚠️ | ⚠️ | ⚠️ |
| [**Twitter**](./companies/twitter-front-end-interview-questions.md) | ✅ | ⚠️ | ✅ | ✅ | ⚠️ |
| [**Uber**](./companies/uber-front-end-interview-questions.md) | ⚠️ | ⚠️ | ✅ | ✅ | ⚠️ |
