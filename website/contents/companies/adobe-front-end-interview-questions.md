---
title: Adobe Front End Interview Questions
sidebar_label: Adobe interview questions
description: Adobe Front End Interview Questions guide with real interview experiences, coding challenges, and insider tips for 2025.
---

:::info Latest version on GreatFrontEnd

Find the latest version of this page on [GreatFrontEnd's Adobe Front End Interview Guide](https://www.greatfrontend.com/interviews/company/adobe/questions-guides?utm_source=frontendinterviewhandbook&utm_medium=referral&gnrs=frontendinterviewhandbook).

:::

## JavaScript coding questions

- Given an API `getAllLinks(url)` that returns all the links on a page, write a function that returns all descendant links (child URLs of child URLs, etc.). Handle edge cases: circular dependencies, `getAllLinks` returning a promise, async efficiency, and time complexity.
- Implement a polyfill of `Array.prototype.reduce`.
  - [Practice question](https://www.greatfrontend.com/questions/javascript/array-reduce?utm_source=frontendinterviewhandbook&utm_medium=referral&gnrs=frontendinterviewhandbook) (Free)
- Find the leaders in an array (every element greater than all elements to its right).
- Implement a custom React hook that uses `setInterval`. Common gotcha: the interval double-fires unless you keep the callback in a `useRef` instead of `useState`.

## User interface coding questions

- Build an accordion using vanilla JS or React.
  - [Practice question](https://www.greatfrontend.com/questions/user-interface/accordion?utm_source=frontendinterviewhandbook&utm_medium=referral&gnrs=frontendinterviewhandbook) (Free)
- Given a top-header design of a document, implement it as a React component.
- Flood fill algorithm on an m × n grid that has outlines of shapes. Clicking inside a shape fills only that shape; clicking outside fills the whole grid except the shapes. Pseudocode is acceptable.

## System design questions

- Design an LRU cache (the round is non-frontend system design).
- Design the classes and interfaces for a chess game (OOD).

## Insider tips from the GreatFrontEnd community

These tips were shared by [GreatFrontEnd](https://www.greatfrontend.com/?utm_source=frontendinterviewhandbook&utm_medium=referral&gnrs=frontendinterviewhandbook) users who have completed interviews with Adobe.

**September 2025**:

> ... 5 rounds total:
>
> 1. Pre-onsite — rapid fire questions across different tech stacks they find important, plus debugging an app and discussing performance improvements.
> 2. Architecture round. In the last 10 minutes the interviewer asked a gotcha question to code a recursive API call.
> 3. Behavioral / tech discussion — no coding.
> 4. Chat plus a custom React hook that required setInterval.
> 5. Manager chat.

**June 2025**:

> Attended Adobe system design, it was non frontend system design. I was asked to design LRU cache and design the classes and interfaces for a chess game. Also had the hiring manager round, was asked to implement the flood fill algorithm. i.e. there is a m\*n grid which has outlines of some shapes. If clicked inside any shape, then the shape should be flood filled. If clicked outside the shape, then the whole grid should be flood filled except the shapes.
>
> Had to implement the pseudo code only though.

**June 2025**:

> Attended Adobe interview. In the language and web fundamentals round, a question similar to https://www.geeksforgeeks.org/problems/leaders-in-an-array-1587115620/1 was asked.
>
> Another question that was asked was the following: You are given an API getAllLinks(url) which returns all the links on the page. You have to write a function to return all the descendant links (i.e. child urls of child urls and so on) of the url. Edge cases were built on top of this: what if there are circular dependencies between pages? What if getAllLinks returns a promise? How can the async code be more efficient? Time complexity?
>
> One thing to note was that I had to handrun the code as the test cases were not setup and the interviewer actually typed out the test cases instead of copy pasting.

**October 2023**:

> ... Adobe onsite ... FE mid-level role. It was following a HackerRank + quick QnA with HM
>
> It was five rounds each consisting of 30min tech and 10min behavior 5min QnA These were some technical questions asked
>
> LC medium - find total number of islands in a nested arr of 0 and 1 LC easy - covert Oct 1 23 to 10-01-23 UI - build an accordion using JS or react create polyfill of .reduce
>
> It was on the easier side.

For more insider tips, visit [GreatFrontEnd](https://www.greatfrontend.com/?utm_source=frontendinterviewhandbook&utm_medium=referral&gnrs=frontendinterviewhandbook)!
