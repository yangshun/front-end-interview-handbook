---
title: Uber Front End Interview Questions
sidebar_label: Uber interview questions
description: Uber frontend interview experiences with async queues, batching, React components, and system design.
---

:::info Full guide on GreatFrontEnd

Explore round details, preparation advice, and related practice in [GreatFrontEnd's Uber Front End Interview Guide](https://www.greatfrontend.com/interviews/company/uber/questions-guides?utm_source=frontendinterviewhandbook&utm_medium=referral&gnrs=frontendinterviewhandbook).

:::

Uber candidates have encountered JavaScript async utilities, React implementation, and general algorithms. Practice controlling work over time and explaining failure behavior, then confirm whether your own coding round also includes UI or DSA.

## JavaScript coding questions

- Implement a rate limiter attribute/decoration/annotation on top of an API endpoint. Caps to N requests per minute with a rolling window. [Source A](https://leetcode.com/discuss/post/2409192/uber-phone-screen-senior-front-end-engin-xp4p/) and [Source B](https://leetcode.com/discuss/post/124880/rate-limiter-by-bhosdike-0euv/)
- Implement an async process queue with concurrency control. Follow-up: handle async-task failures by accepting an error callback handler.
  - Related practice: [Map Async Limit](https://www.greatfrontend.com/questions/javascript/map-async-limit?utm_source=frontendinterviewhandbook&utm_medium=referral&gnrs=frontendinterviewhandbook) limits concurrency and rejects on a mapping failure. An error callback or retries would extend the base exercise. (Free)
- Build a utility in JS that sends data in batches with a timeout: as soon as the batch size is reached, send immediately and restart the timer; if the timer fires before the batch is filled, send what's there and restart.
- Extend an async batcher with retry behavior and operations such as `push`, `flush`, and `clear`.

## User interface coding questions

- Create a button that when clicked, adds a progress bar onto the page. The progress bar would then fill up in a given amount of time (think 3 to 5 seconds). If you get past the first part, you will be asked to do throttling how many progress bars can be running at once. For example, if the limit is 3 progress bars, and the user clicks on the button 4 times, the fourth progress bar only starts after the very first one finishes. [Source](https://leetcode.com/discuss/post/1064199/uber-front-end-phone-screen-reject-by-an-16nz/)
  - The base [Progress Bars](https://www.greatfrontend.com/questions/user-interface/progress-bars?utm_source=frontendinterviewhandbook&utm_medium=referral&gnrs=frontendinterviewhandbook) exercise starts each bar immediately. A cap on simultaneous bars is an extension. (Free)
- Overlapping circles app. [Source](https://leetcode.com/discuss/post/1784074/uber-phone-overlapping-circles-app-rejec-ql4p/)
- Build a React component; one applicant encountered this after preparing mainly for algorithms and JavaScript utilities.

## System design questions

- Design Google Calendar, an example shared for an SDE-2 loop.
- Open frontend system design — generally not tightly scoped to product domain.

## Insider tips from the GreatFrontEnd community

These tips were shared by [GreatFrontEnd](https://www.greatfrontend.com/?utm_source=frontendinterviewhandbook&utm_medium=referral&gnrs=frontendinterviewhandbook) users who have completed interviews with Uber.

**April 2026**:

> Just had my first tech screen round for Uber SDE-2 Frontend. It was purely JavaScript. I was asked a fairly common and popular question: async process queue with concurrency. I managed to code it entirely with follow-ups too — handle if an async task fails, attach an error callback handler. I had around 45 minutes and managed to complete all parts within time.

**June 2025**:

> I was asked a reactjs based question although I majorly prepared for dsa and JS type questions based on the questions asked previously. What I've learned and observed about Uber's FE process is that they can ask pretty random questions. I guess recruiters are not in sync with the interviewers. Or it feels like it is more up to the interviewers on what they ask. I watched some YT videos of people on their uber interview experience and literally to each one of them dsa was asked.

**May 2025**:

> Just gave BPS round of Uber and gotta say, Uber has quality problems! I thought it would be DSA as the recruiter had mentioned. But I guess you can’t trust recruiters nowadays. Question was “create a utility in JS to send data in batches with a timeout. So, as soon as a batch size is reached, send the data right away and start the timeout. If timeout happens before batch is filled, send the batch as it is and start the timer again.” Also, I asked the interviewer for what to prepare for DSA round and he said array, trees, graphs, traversals, but he also mentioned that Uber is trying to get away from DSA for frontend roles and keep it frontend focused and slowly they are doing it.

**May 2025**:

> Ik someone who gave Uber's SDE II web interview, in short prepare everything, there were 5 rounds -
>
> 1. DSA - leetcode styled and js based
> 2. Web Fundamentals - HTML, CSS, JS, APIs, Internet
> 3. Frontend System Design
> 4. Culture Fit
> 5. Hiring Manager

**January 2025**:

> For Uber FE SDE2 check mapAsyncLimit question. ... prepare behavioral well and do google calender system design

For more insider tips, visit [GreatFrontEnd](https://www.greatfrontend.com/?utm_source=frontendinterviewhandbook&utm_medium=referral&gnrs=frontendinterviewhandbook)!
