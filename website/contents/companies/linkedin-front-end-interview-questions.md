---
title: LinkedIn Front End Interview Questions
sidebar_label: LinkedIn interview questions
description: 'LinkedIn front end interview questions: JavaScript coding, UI components, algorithms & quiz questions. Real candidate experiences & insider tips.'
---

:::info Full guide on GreatFrontEnd

Explore round details, preparation advice, and related practice in [GreatFrontEnd's LinkedIn Front End Interview Guide](https://www.greatfrontend.com/interviews/company/linkedin/questions-guides?utm_source=frontendinterviewhandbook&utm_medium=referral&gnrs=frontendinterviewhandbook).

:::

LinkedIn experiences span JavaScript fundamentals, UI implementation, algorithms, and full-stack design. A staff full-stack loop also included an AI-assisted session; confirm the permitted tools separately for each round.

## JavaScript coding questions

- Write a `getElementsByClassName` function.
  - [Practice question](https://www.greatfrontend.com/questions/javascript/get-elements-by-class-name?utm_source=frontendinterviewhandbook&utm_medium=referral&gnrs=frontendinterviewhandbook) (Free)
- Implement memoization, then extend the behavior as requirements change.
  - The single-argument [Memoize](https://www.greatfrontend.com/questions/javascript/memoize?utm_source=frontendinterviewhandbook&utm_medium=referral&gnrs=frontendinterviewhandbook) exercise is a starting point; additional arguments require an extension.

## User interface coding questions

- Build an accordion with expandable sections.
  - Related practice: [Accordion](https://www.greatfrontend.com/questions/user-interface/accordion?utm_source=frontendinterviewhandbook&utm_medium=referral&gnrs=frontendinterviewhandbook) (Free).
- Implement infinite scroll with API fetching and pagination in vanilla JavaScript.
- Create a tooltip component.
- Create a cross-browser LinkedIn top navigation bar.

## Quiz questions

- Difference between CSS `padding` and `margin`.
  - [Read answer](https://www.greatfrontend.com/questions/quiz/explain-your-understanding-of-the-box-model-and-how-you-would-tell-the-browser-in-css-to-render-your-layout-in-different-box-models?utm_source=frontendinterviewhandbook&utm_medium=referral&gnrs=frontendinterviewhandbook) (Free)
- Difference between promise and callback?
- Difference between event bubbling and capturing?
- Difference between callback and closure in JavaScript?
- What are the advantages of using preprocessors? e.g. Sass, Stylus, Less.
  - [Read answer](https://www.greatfrontend.com/questions/quiz/what-are-the-advantages-disadvantages-of-using-css-preprocessors?utm_source=frontendinterviewhandbook&utm_medium=referral&gnrs=frontendinterviewhandbook) (Free)
- What is event delegation?
  - [Read answer](https://www.greatfrontend.com/questions/quiz/explain-event-delegation?utm_source=frontendinterviewhandbook&utm_medium=referral&gnrs=frontendinterviewhandbook) (Free)

## System design questions

- Design a chat application across the frontend and backend.
  - The [Chat App](https://www.greatfrontend.com/questions/system-design/chat-application-messenger?utm_source=frontendinterviewhandbook&utm_medium=referral&gnrs=frontendinterviewhandbook) design covers one-to-one messaging and recovery; clarify which server responsibilities your interview expects you to discuss.

## Algorithm

- Reverse a doubly-linked list.

_Source: [Glassdoor LinkedIn Front End Software Engineer Interview Questions](https://www.glassdoor.sg/Interview/LinkedIn-Front-End-Software-Engineer-Interview-Questions-EI_IE34865.0,8_KO9,36.htm)_

## Insider tips from the GreatFrontEnd community

These tips were shared by [GreatFrontEnd](https://www.greatfrontend.com/?utm_source=frontendinterviewhandbook&utm_medium=referral&gnrs=frontendinterviewhandbook) users who have completed interviews with LinkedIn.

**May 2025**:

> Linkedin technical screen experience for Senior FE role - 1 hr interview, lots of parts to this one:
>
> FE quiz questions - event delegation, closures, etc Memoize I+II Implement infinite scroll with data fetching/pagination - implementation is in plain JS, can optimize with throttle
>
> General thoughts - They're primarily testing for JS fundamentals, you gotta know your stuff real well to pass. I'm guessing they conduct interviews this way bc their FE codebase is written in Ember which not many ppl have experience with

> (How did you implement infinite scrolling? Did you use IntersectionObserver?)
>
> I just used scroll events since they provided some boilerplate code for it, but IntersectionObserver would've been better to use had I been more familiar with the api. But I think the idea is generally the same where you check for a boundary being crossed, fetch more data and then take each item and append it to the parent container.

**January 2025**:

> LinkedIn ... asked JS/web/html trivia questions and a Leetcode easy question for the phone screen round. Not sure about the onsite

**January 2025**:

> Is it frontend or fullstack? They ask leetcode for fullstack. Merge intervals is one question Study for tic tac toe and autocomplete questions

For more insider tips, visit [GreatFrontEnd](https://www.greatfrontend.com/?utm_source=frontendinterviewhandbook&utm_medium=referral&gnrs=frontendinterviewhandbook)!
