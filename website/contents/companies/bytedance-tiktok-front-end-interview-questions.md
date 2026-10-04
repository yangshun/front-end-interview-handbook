---
title: ByteDance/TikTok Front End Interview Questions
sidebar_label: ByteDance/TikTok interview questions
description: ByteDance and TikTok frontend interview experiences with JavaScript utilities, UI coding, algorithms, and project discussions.
---

:::info Full guides on GreatFrontEnd

For preparation advice and related questions, see GreatFrontEnd's [ByteDance guide](https://www.greatfrontend.com/interviews/company/bytedance/questions-guides?utm_source=frontendinterviewhandbook&utm_medium=referral&gnrs=frontendinterviewhandbook) and [TikTok guide](https://www.greatfrontend.com/interviews/company/tiktok/questions-guides?utm_source=frontendinterviewhandbook&utm_medium=referral&gnrs=frontendinterviewhandbook).

:::

ByteDance and TikTok candidates have encountered algorithms, JavaScript utilities, UI implementation, and project discussions. Some assessments extend the same application over several stages. Check the target team's format and coding environment rather than assuming the two companies share one loop.

## JavaScript coding questions

- Implement `Promise.all`.
  - [Practice question](https://www.greatfrontend.com/questions/javascript/promise-all?utm_source=frontendinterviewhandbook&utm_medium=referral&gnrs=frontendinterviewhandbook) (Free)
- Implement a function which extends `Array.prototype`.
  - [Practice questions](https://www.greatfrontend.com/questions?utm_source=frontendinterviewhandbook&utm_medium=referral&gnrs=frontendinterviewhandbook)
- Implement a polyfill of `Function.prototype.bind` — handle the `new` keyword correctly.
  - [Practice question](https://www.greatfrontend.com/questions/javascript/function-bind?utm_source=frontendinterviewhandbook&utm_medium=referral&gnrs=frontendinterviewhandbook) (Paid)
- Implement concurrency-limited async mapping. One earlier interview required a particular approach, so clarify scheduling constraints before coding.
  - [Practice question](https://www.greatfrontend.com/questions/javascript/map-async-limit?utm_source=frontendinterviewhandbook&utm_medium=referral&gnrs=frontendinterviewhandbook) (Free)
- Implement a `compose` middleware function so that async middlewares like Koa-style `f1`, `f2`, `f3` (each calling `next()`) execute in the correct nested order.
  - [Practice question](https://www.greatfrontend.com/questions/javascript/middlewares?utm_source=frontendinterviewhandbook&utm_medium=referral&gnrs=frontendinterviewhandbook) (Paid)
- React-like VDOM but instead of creating DOM nodes, output an HTML string given an input object with `type` and `attributes`.
- JavaScript quiz: given a list of Promises with console statements, determine the order they will print.

## User interface coding questions

- Implement a dropdown component.
  - Related architecture practice: [Dropdown Menu system design](https://www.greatfrontend.com/questions/system-design/dropdown-menu?utm_source=frontendinterviewhandbook&utm_medium=referral&gnrs=frontendinterviewhandbook) (Paid). UI implementation is a separate exercise.
- Implement a transfer list component that moves selected items between two lists. Some interview environments have limited React support; confirm the setup rather than assuming a browser preview is available.
  - [Practice question](https://www.greatfrontend.com/questions/user-interface/transfer-list?utm_source=frontendinterviewhandbook&utm_medium=referral&gnrs=frontendinterviewhandbook) (Free)
- Fetch images and render them in an interface. Add loading and failure states as practice follow-ups.
- Rotate an image 180 degrees over one second when the pointer moves over it, using CSS and JavaScript.

## System design questions

- Walk through a past project, draw its workflow, and discuss improvements. An earlier candidate spent about 50 minutes on this conversation.
- Discuss how real-time comments reach and update a TikTok LIVE-style interface; one experience covered this conversationally rather than in a separate formal design round.

## Quiz questions

- Difference between `localStorage` and cookies.
  - [Read answer](https://www.greatfrontend.com/questions/quiz/describe-the-difference-between-a-cookie-sessionstorage-and-localstorage?utm_source=frontendinterviewhandbook&utm_medium=referral&gnrs=frontendinterviewhandbook) (Free)

## Algorithm

- Merge two sorted integer arrays, remove duplicates.
- Given a list of points, find out if any four of them form a square. Return 'true' if possible, else 'false'.
  - Examples: `[[0, 0], [2, 0], [1, 1], [0, -1], [-1, -1], [0, 2], [0, 1], [1,0]]` -> `true`
- Check for balanced brackets in a string.
- Given two nodes, return the section of the tree between these two nodes.
- Find the islands in a grid of land and sea.

_Source: [Glassdoor ByteDance Front End Developer Interview Questions](https://www.glassdoor.sg/Interview/ByteDance-Front-End-Developer-Interview-Questions-EI_IE1624196.0,9_KO10,29.htm)_

## Insider tips from the GreatFrontEnd community

These tips were shared by [GreatFrontEnd](https://www.greatfrontend.com/?utm_source=frontendinterviewhandbook&utm_medium=referral&gnrs=frontendinterviewhandbook) users who have completed interviews with ByteDance/TikTok.

**May 2026**:

> more projects/resume grilling, heavy on trivia, UI coding, slightly behavioral but more so testing your engineering thinking than collaboration. The TM's general advice was that for new grads, big project experience isn't strictly expected — they're evaluating thought process. Basically know every tech you put on your resume inside and out, and be able to talk about coding with AI.

**April 2026**:

> Projects/resume grill, basic system design + trivia, and an algorithms question. No behavioral round in the early loop. They're pushing AI in almost every aspect of the product, so expect questions around it.

**November 2024**:

> this is how it went for TikTok entry level FE
>
> 1. leetcodes, javascript fundamentals (covered in GFE 1 month study plan)
> 2. UI component + follow up
> 3. system design based on past project + javascript coding and now awaiting 4th round w recruiter

**November 2024**:

> after experience & quiz questions, the interviewer directly give me 3 questions (all for ~30 mins), and i can choose the order.
>
> 1. similar to Map Async Limit but has to be solution 4
> 2. some compose middleware question (can't find anything similar)
> 3. implement bind, but i can't handle the new keyword

**October 2024**:

> ... it's a design round with 50 mins deep dive on my pervious project and potential improvement. have to draw a flowchart to demo the workflow. overall it's really conversation heavy. and also asked why you want to join TikTok.

**August 2024**:

> First 20 minutes was talking about past projects/experiences/challenges, then a React coding question, then a JS quiz question, and then an untagged TikTok LC med...

For more insider tips, visit [GreatFrontEnd](https://www.greatfrontend.com/?utm_source=frontendinterviewhandbook&utm_medium=referral&gnrs=frontendinterviewhandbook)!
