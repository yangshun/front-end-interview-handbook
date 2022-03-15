---
title: Introduction
---

## What is this?

Unlike typical software engineer job interviews, front end interviews have less emphasis on algorithms and have more questions on intricate knowledge and expertise about the front end domain — HTML, CSS, JavaScript, just to name a few.

Many front end interviews are highly-focused on domain knowledge and applying them to real-world scenarios. You might find that grinding LeetCode is not all you need when it comes to interviewing for a front end position, but that's a good thing! Front end interviews tend to test concepts that are more practical and relevant to real world front end development. But that doesn't mean that you don't have to be familiar with basic data structure and algorithmic concepts - there's just less emphasis on them and probably you get easier algorithmic questions.

While there are some existing resources to help front end developers in preparing for interviews, they aren't as abundant as materials for a software engineer interview. Among the existing resources, probably the most helpful question bank would be [Front-end Developer Interview Questions](https://github.com/h5bp/Front-end-Developer-Interview-Questions). Unfortunately, there aren't many complete and satisfactory answers to these questions readily available online. This handbook answers these pop quiz-style questions along with information and guidance for other front end interview formats.

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

Unlike Software Engineering interviews, the formats for front end interviews are less known and not standardized across the industry. However, there are a few common formats:

### Pop quiz

Short questions which test your knowledge and have clear non-subjective answers. These are usually asked by recruiters because the answers can be verified by non-technical people E.g. Explain the `this` keyword in JavaScript.

[Read more about front end pop quizzes](./pop-quiz.md)

### Coding

- **Algorithms** - LeetCode-style algorithmic coding questions, but solve them using JavaScript
- **Write a small utility function/library** - Implement a common function in JavaScript. This is the front end version of LeetCode-style algorithm questions. E.g. Implement the `debounce` function found in Underscore/Lodash
- **Build user interfaces (component/app/game)** - Write HTML, CSS and JavaScript to implement a UI component or a small app/game. E.g. Build a tabs component, Tic-tac-toe Game, Tetris Game

[Read more about front end coding questions](./algorithms.md)

### System Design

Describe and discuss how you would build a UI component/app/game and its architecture. This is the front end version of system design questions. E.g. Describe how you would build Emoji autocomplete feature in a chat app, what APIs it would have, what components there are to the feature, how to ensure it has good performance, UX, etc.

[Read more about front end system design](./front-end-system-design.md)
