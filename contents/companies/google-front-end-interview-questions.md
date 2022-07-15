---
title: Google front end interview questions
sidebar_label: Google interview questions
---

Since it's Google, candidates can expect to be tested on fundamental Computer Science concepts as well as their front end knowledge/skills.

## JavaScript

- Implement the outline view for a Google doc.
- DFS on HTML nodes.
- Implement `throttle`.
- How do you make a function that only calls input function f every 50 milliseconds?
- How do you make a function that takes f and returns a function that calls f on a timeout?
- Given a timeline write the JavaScript to select all nodes within selection of timeline.

## User interface coding

- Design a slider component.
- Design a Tic-Tac-Toe game/design an algorithm for Tic-Tac-Toe game.
- Implement nested checkboxes (when the parent is checked, children are checked and vice versa. Use `<input type="checkbox">`). Similar to [Indeterminate checkboxes](https://css-tricks.com/indeterminate-checkboxes/).
- Design a webpage which can auto load new posts when you reach the bottom of the page by using JavaScript. You may use AJAX and JavaScript event listeners.
- Write a UI using HTML, CSS, JavaScript that allows uses to enter the number of rows and columns in text input fields within a form and renders a table.

Example: Number of rows: 4, Number of rows: 5, "Submit" button. Clicking on the "Submit" button will show the following:

| 1   | 8   | 9   | 16  | 17  |
| --- | --- | --- | --- | --- |
| 2   | 7   | 10  | 15  | 18  |
| 3   | 6   | 11  | 14  | 19  |
| 4   | 5   | 12  | 13  | 20  |

## Trivia

- Explain the CSS Box Model.
- What happens when you type a URL into the browser and hits enter?
- Given some text on a web page, how many ways can you make the text disappear?
- How do you send data from a web page to a server without a page refresh?

## System design

- Design JS Bin.
- How would you create a Google Analytics SDK used by webpages?
- Design emoji autocomplete.

## Algorithm

- Minesweeper problem. Write a function `reveal()` that outputs the number of tiles shown when a user clicks on a tile. Each tile shows the number of bombs as its neighbor. If the user click on a tile that is a bomb, the game is over. If that tile is 0, reveal all its neighbors.
- You are given four numbers (type int), and have four basic math operators at your disposal (+, -, x, /). Given arbitrary ways to group the numbers and using any of the operators, determine if you can make the number 24 from the four numbers. The numbers must be processed in the order they appear.
- Find k-nearest points.

_Source: [Glassdoor Google Front End Software Engineer Interview Questions](https://www.glassdoor.sg/Interview/Google-Front-End-Software-Engineer-Interview-Questions-EI_IE9079.0,6_KO7,34.htm), [Google | Front End engineer](https://leetcode.com/discuss/interview-question/271736/google-front-end-engineer-onsite-interview)_
