---
title: Google Front End Interview Questions
sidebar_label: Google interview questions
---

:::info Page migrated to GreatFrontEnd

Find the latest version of this page on [GreatFrontEnd](https://www.greatfrontend.com/interviews/company/google/questions-guides?utm_source=frontendinterviewhandbook&utm_medium=referral&gnrs=frontendinterviewhandbook).

:::

Since it's Google, candidates can expect to be tested on fundamental Computer Science concepts as well as their front end knowledge/skills.

> Web Front End: ​You should be ready to cover topics like front end latency and implementation of standard CS algorithms using idiomatic JavaScript. You should be able to articulate Javascript strengths and shortcomings and ready to cover any of the following: Web security issues (XSS, XSRF), Prototypal inheritance, DOM API & manipulation, CSS manipulation, Browser / DOM events & event handling, XHR requests & HTTP headers, JavaScript closures

Refer to Google's official interview preparation guides for:

- [Front End or Mobile Software Engineers](/guides/google-front-end-guide.pdf)
- [Front End/Mobile Software Engineers (Old)](/guides/google-front-end-guide-old.pdf)
- [Non-technical interviews](/guides/google-non-technical-guide.pdf)

## JavaScript

- How do you make a function that takes a callback function `fn` and returns a function that calls `fn` on a timeout?
  - [Practice question](https://www.greatfrontend.com/questions/javascript/debounce?utm_source=frontendinterviewhandbook&utm_medium=referral&gnrs=frontendinterviewhandbook) (Free)
- Implement the outline view for a Google doc.
  - [Practice question](https://www.greatfrontend.com/questions/javascript/table-of-contents?utm_source=frontendinterviewhandbook&utm_medium=referral&gnrs=frontendinterviewhandbook) (Paid)
- DFS on HTML nodes.
  - [Practice question](https://www.greatfrontend.com/questions/javascript/get-elements-by-tag-name?utm_source=frontendinterviewhandbook&utm_medium=referral&gnrs=frontendinterviewhandbook) (Paid)
- Implement `throttle`.
  - [Practice question](https://www.greatfrontend.com/questions/javascript/throttle?utm_source=frontendinterviewhandbook&utm_medium=referral&gnrs=frontendinterviewhandbook) (Paid)
- How do you make a function that only calls input function f every 50 milliseconds?
  - [Practice question](https://www.greatfrontend.com/questions/javascript/throttle?utm_source=frontendinterviewhandbook&utm_medium=referral&gnrs=frontendinterviewhandbook) (Paid)
- Given a timeline write the JavaScript to select all nodes within selection of timeline.

## User interface coding

- Design a slider component.
- Design a Tic-Tac-Toe game/design an algorithm for Tic-Tac-Toe game.
  - [Practice question](https://www.greatfrontend.com/questions/user-interface/tic-tac-toe?utm_source=frontendinterviewhandbook&utm_medium=referral&gnrs=frontendinterviewhandbook) (Paid)
- Implement nested checkboxes (when the parent is checked, children are checked and vice versa. Use `<input type="checkbox">`). Similar to [Indeterminate checkboxes](https://css-tricks.com/indeterminate-checkboxes/).
- Design a webpage which can auto load new posts when you reach the bottom of the page by using JavaScript. You may use AJAX and JavaScript event listeners.
- Write a UI using HTML, CSS, JavaScript that allows uses to enter the number of rows and columns in text input fields within a form and renders a table.
  - [Practice question](https://www.greatfrontend.com/questions/user-interface/generate-table?utm_source=frontendinterviewhandbook&utm_medium=referral&gnrs=frontendinterviewhandbook) (Paid)
  - Example: Number of rows: 4, Number of columns: 5, "Submit" button. Clicking on the "Submit" button will show the following table (ignore the styling):

| 1   | 8   | 9   | 16  | 17  |
| --- | --- | --- | --- | --- |
| 2   | 7   | 10  | 15  | 18  |
| 3   | 6   | 11  | 14  | 19  |
| 4   | 5   | 12  | 13  | 20  |

## Trivia

- Explain the CSS Box Model.
  - [Read answer](https://www.greatfrontend.com/questions/quiz/explain-your-understanding-of-the-box-model-and-how-you-would-tell-the-browser-in-css-to-render-your-layout-in-different-box-models?utm_source=frontendinterviewhandbook&utm_medium=referral&gnrs=frontendinterviewhandbook) (Free)
- What happens when you type a URL into the browser and hits enter?
- Given some text on a web page, how many ways can you make the text disappear?
- How do you send data from a web page to a server without a page refresh?
  - [Read answer](https://www.greatfrontend.com/questions/quiz/what-are-the-advantages-and-disadvantages-of-using-ajax?utm_source=frontendinterviewhandbook&utm_medium=referral&gnrs=frontendinterviewhandbook) (Free)

## System design

- Design emoji autocomplete.
  - [Read answer](https://www.greatfrontend.com/questions/system-design/autocomplete?utm_source=frontendinterviewhandbook&utm_medium=referral&gnrs=frontendinterviewhandbook) (Free)
- Design JS Bin.
- How would you create a Google Analytics SDK used by webpages?

## Algorithm

- Minesweeper problem. Write a function `reveal()` that outputs the number of tiles shown when a user clicks on a tile. Each tile shows the number of bombs as its neighbor. If the user click on a tile that is a bomb, the game is over. If that tile is 0, reveal all its neighbors.
- You are given four numbers (type int), and have four basic math operators at your disposal (+, -, x, /). Given arbitrary ways to group the numbers and using any of the operators, determine if you can make the number 24 from the four numbers. The numbers must be processed in the order they appear.
- Find k-nearest points.

_Source: [Glassdoor Google Front End Software Engineer Interview Questions](https://www.glassdoor.sg/Interview/Google-Front-End-Software-Engineer-Interview-Questions-EI_IE9079.0,6_KO7,34.htm), [Google | Front End engineer](https://leetcode.com/discuss/interview-question/271736/google-front-end-engineer-onsite-interview)_
