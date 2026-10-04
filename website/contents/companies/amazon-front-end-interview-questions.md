---
title: Amazon Front End Interview Questions
sidebar_label: Amazon interview questions
description: Complete Amazon front end developer interview guide with coding questions, system design, Leadership Principles, and insider tips from candidates.
---

:::info Latest version on GreatFrontEnd

Find the latest version of this page on [GreatFrontEnd's Amazon Front End Interview Guide](https://www.greatfrontend.com/interviews/company/amazon/questions-guides?utm_source=frontendinterviewhandbook&utm_medium=referral&gnrs=frontendinterviewhandbook).

:::

Amazon's Front End interviews are known for their focus on technical depth and alignment with the company's Leadership Principles.

## Understanding the Amazon Front End Interview Process

The interview process typically involves several stages:

1.  **Online assessment (OA):** This is a timed assessment that typically includes:
    - **Technical questions:** Often coding challenges (e.g., LeetCode-style problems, UI component building). **You are likely required to use Vanilla JavaScript**.
    - **Systems design scenarios:** Questions about design considerations, potentially multiple-choice or short written answers.
    - **Work style survey:** Questions related to Amazon's Leadership Principles.
    - Common questions: [Accordion](https://www.greatfrontend.com/questions/user-interface/accordion?utm_source=frontendinterviewhandbook&utm_medium=referral&gnrs=frontendinterviewhandbook), [Signup Form](https://www.greatfrontend.com/questions/user-interface/signup-form?utm_source=frontendinterviewhandbook&utm_medium=referral&gnrs=frontendinterviewhandbook), [Data Table](https://www.greatfrontend.com/questions/user-interface/data-table?utm_source=frontendinterviewhandbook&utm_medium=referral&gnrs=frontendinterviewhandbook), [Todo List](https://www.greatfrontend.com/questions/user-interface/todo-list?utm_source=frontendinterviewhandbook&utm_medium=referral&gnrs=frontendinterviewhandbook)
2.  **Technical phone screen:** A 45-60 minute interview, usually with a hiring manager or a senior engineer. It's often split between:
    - **Behavioral questions:** Based on Amazon's Leadership Principles.
    - **Front end coding problems:** Whiteboard-style coding focusing on JavaScript, HTML, CSS, and DOM manipulation.
3.  **Onsite interview (Loop):** This is the main interview day, consisting of 4-5 rounds, each lasting about 55-60 minutes. The interview loop typically assesses both technical and non-technical competencies based on Amazon's Leadership Principles. Rounds often cover:
    - **Coding rounds:** More complex Data Structures & Algorithms (DSA) problems (medium to hard difficulty), often with a front end focus.
    - **Front end fundamentals round:** Deep dive into JavaScript, HTML, CSS, DOM, browser APIs, event loop, accessibility, and performance. You might be asked to build a small UI component or debug code.
    - **System design round (Front End Focused):** Designing scalable and performant front end systems (e.g., a photo gallery, a type-ahead search). This is crucial for mid-to-senior level roles.
    - **Behavioral rounds / Leadership Principles:** Several rounds dedicated to assessing your past experiences against Amazon's 16 Leadership Principles. One interviewer will likely be a "Bar Raiser."

## Key areas to focus on

### Front end fundamentals

Strong front end engineering fundamentals are essential. Be prepared for:

- **HTML:** Semantic HTML, accessibility (ARIA attributes), HTML5 features.
- **CSS:** Layout (Flexbox, Grid), Box Model, specificity, inheritance, responsive design, animations, performance optimization.
- **JavaScript:**
  - **Core concepts:** `this`, closures, prototypes, event loop, hoisting, `var`, `let`, `const`, scope.
  - **ES6+ features:** Promises, async/await, arrow functions, destructuring, spread/rest operators, Maps, Sets.
  - **DOM manipulation:** Efficiently interacting with the DOM, event handling, event delegation.
  - **Browser APIs:** Local Storage, Session Storage, Web Workers, Geolocation, etc.
  - **Performance:** Debouncing, throttling, virtual DOM (if discussing frameworks), critical rendering path.
  - **Data structures & algorithms:** Be comfortable with common data structures (arrays, strings, linked lists, trees, graphs) and algorithms (sorting, searching) and be able to implement them efficiently in JavaScript.
- **Web performance:** How to optimize page load times, rendering, and responsiveness.
- **Accessibility (a11y):** Understanding WAI-ARIA, semantic HTML, keyboard navigation, and how to build inclusive web experiences.
- **Security:** XSS, CSRF, CORS, secure coding practices for the front end.
- **Front end frameworks (e.g., React, Angular, Vue.js):** While the focus is often on vanilla JavaScript for coding, be prepared to discuss component lifecycle, state management, and performance optimizations within your chosen framework.

### System design

This round assesses your ability to design scalable and performant front end applications. Be prepared to discuss:

- **Scalability**: How your design handles increasing user load, data, and features.
- **Modularity**: Breaking down a large application into smaller, manageable components.
- **Performance**: Optimizing initial load, subsequent interactions, and data fetching.
- **Reliability/Resilience**: Handling errors, network issues, and ensuring a stable user experience.
- **Maintainability**: Writing clean, testable, and understandable code.
- **Accessibility**: Integrating accessibility best practices into the design.
- **Trade-offs**: Justifying your design choices and understanding the implications of different approaches (e.g., client-side vs. server-side rendering, specific data structures, caching strategies).

### Behavioral Questions & Leadership Principles (LPs)

Amazon heavily emphasizes its [16 Leadership Principles](https://www.amazon.jobs/content/en/our-workplace/leadership-principles). A significant portion of the interview will focus on how you've demonstrated these principles in past roles, as "past behavior is the best predictor of future success."

**The STAR Method is crucial.** For every behavioral question, structure your answer using the STAR method:

- **Situation**: Describe the context of the situation.
- **Task**: Explain the task or challenge you faced.
- **Action**: Detail the specific actions _you_ took to address the task.
- **Result**: Describe the positive outcome of your actions, ideally with quantifiable metrics.

**Key Leadership Principles to focus on (and have 2-3 strong STAR examples for each):**

- Customer Obsession
- Ownership
- Invent and Simplify
- Are Right, A Lot
- Learn and Be Curious
- Hire and Develop the Best
- Insist on the Highest Standards
- Think Big
- Bias for Action
- Frugality
- Earn Trust
- Dive Deep
- Have Backbone; Disagree and Commit
- Deliver Results
- Strive to be Earth's Best Employer
- Success and Scale Bring Broad Responsibility

## Official guides

For more detailed information directly from Amazon, refer to Amazon's official interview preparation guides for:

- [Front End Engineers](/guides/amazon-front-end-guide.pdf)
- [Front End Engineer Interview Prep](https://amazon.jobs/content/en/how-we-hire/fee-interview-prep)
- [SDE Interview Prep](https://amazon.jobs/content/en/how-we-hire/sde-ii-interview-prep)

_Source: [Glassdoor Amazon Front End Engineer Interview Questions](https://www.glassdoor.sg/Interview/Amazon-Front-End-Engineer-Interview-Questions-EI_IE6036.0,6_KO7,25.htm)_

## Questions

Questions sourced from the web and the [GreatFrontEnd](https://www.greatfrontend.com/?utm_source=frontendinterviewhandbook&utm_medium=referral&gnrs=frontendinterviewhandbook) community.

### Quiz questions

- What is the CSS box model?
  - [Read answer](https://www.greatfrontend.com/questions/quiz/explain-your-understanding-of-the-box-model-and-how-you-would-tell-the-browser-in-css-to-render-your-layout-in-different-box-models?utm_source=frontendinterviewhandbook&utm_medium=referral&gnrs=frontendinterviewhandbook) (Free)
- What is a JavaScript closure?
  - [Read answer](https://www.greatfrontend.com/questions/quiz/what-is-a-closure-and-how-why-would-you-use-one?utm_source=frontendinterviewhandbook&utm_medium=referral&gnrs=frontendinterviewhandbook) (Free)
- What happens when you type URL into a browser and hit enter?

### JavaScript coding questions

- Implement `Array.prototype` functions like `map`, `reduce`, `filter`, `sort`.
  - [Practice questions](https://www.greatfrontend.com/questions/js/coding/utilities?utm_source=frontendinterviewhandbook&utm_medium=referral&gnrs=frontendinterviewhandbook)
- Given an object and a filter function, write a function that recursively filters the object, returning only values which return `true` when called with the filter function (like `Array.prototype.filter` but for objects).
- Implement a function `getElementsByStyle(property, value)` that returns all elements in the DOM that match that style.
  - E.g. `getElementsByStyle("color", "#fff")` will return all elements in the DOM with white text.
  - [Practice question](https://www.greatfrontend.com/questions/javascript/get-elements-by-style?utm_source=frontendinterviewhandbook&utm_medium=referral&gnrs=frontendinterviewhandbook) (Free)
- Promisify a function.
  - [Practice question](https://www.greatfrontend.com/questions/javascript/promisify?utm_source=frontendinterviewhandbook&utm_medium=referral&gnrs=frontendinterviewhandbook) (Free)
- Implement `JSON.stringify` (OOP-style flavor of the question has come up recently).
  - [Practice question](https://www.greatfrontend.com/questions/javascript/json-stringify?utm_source=frontendinterviewhandbook&utm_medium=referral&gnrs=frontendinterviewhandbook) (Free)
- Build a relative-time / date component: given a date, display "just now", "less than a minute ago", "n days ago", "n weeks ago", "n months ago", "n years ago". Comparing `Date.now()` with the passed date is the expected approach.
- Implement a method to sanitize input data from a nested Form UI.

### User interface coding questions

- Implement a data table from an array of objects using HTML/CSS and JavaScript with searching and sorting
  - [Practice question](https://www.greatfrontend.com/questions/javascript/data-selection?utm_source=frontendinterviewhandbook&utm_medium=referral&gnrs=frontendinterviewhandbook) (Paid)
- Implement Material UI Chips with auto-suggest. When sending an e-mail, auto-suggest people and convert them into a chip with their avatar on the right
- Implement a Like button ([Source](https://leetcode.com/discuss/post/1719943/amazon-phone-screen-fee-l5-like-button-b-0z2l/))
  - [Practice question](https://www.greatfrontend.com/questions/user-interface/like-button?utm_source=frontendinterviewhandbook&utm_medium=referral&gnrs=frontendinterviewhandbook) (Paid)
- Given a JSON object generate a file directory UI
  - [Practice question](https://www.greatfrontend.com/questions/user-interface/file-explorer?utm_source=frontendinterviewhandbook&utm_medium=referral&gnrs=frontendinterviewhandbook) (Free)
- Code a paginated widget of addresses. Imagine you are a seller with a list of address you ship to an need to view them 5 address per page, with the possibility to go previous and next. [Source](https://leetcode.com/discuss/post/1984996/amazon-virtual-onsite-april-2022-fronten-qiku/)
- Implement a search bar using HTML, CSS and JavaScript
  - [Read answer](https://www.greatfrontend.com/questions/system-design/autocomplete?utm_source=frontendinterviewhandbook&utm_medium=referral&gnrs=frontendinterviewhandbook) (Free)
- Implement a star rating widget
  - [Practice question](https://www.greatfrontend.com/questions/user-interface/star-rating?utm_source=frontendinterviewhandbook&utm_medium=referral&gnrs=frontendinterviewhandbook) (Free)
- Implement tic-tac-toe
  - [Practice question](https://www.greatfrontend.com/questions/user-interface/tic-tac-toe?utm_source=frontendinterviewhandbook&utm_medium=referral&gnrs=frontendinterviewhandbook) (Paid)
- Recreate an adaptive layout with flexbox. Ensure accessibility
- Implement a chess board with movable pieces
- How do you render text on a banner image?
- Render a directory tree given a nested JSON object
- Implement an image carousel in vanilla JS.
  - [Practice question](https://www.greatfrontend.com/questions/user-interface/image-carousel?utm_source=frontendinterviewhandbook&utm_medium=referral&gnrs=frontendinterviewhandbook) (Free)
- Implement infinite scroll on a list of addresses, with follow-ups on pagination, different devices, slow networks, and error handling.
- Build an accordion where by default only one section is open at a time; a checkbox switches behavior to allow multiple sections to be expanded.
  - [Practice question](https://www.greatfrontend.com/questions/user-interface/accordion?utm_source=frontendinterviewhandbook&utm_medium=referral&gnrs=frontendinterviewhandbook) (Free)
- Address book form: validate name, email, and phone number, append valid entries to a table, plus an input that filters the table by phone number.
- Build a to-do app (Add / Remove / Edit todos).
  - [Practice question](https://www.greatfrontend.com/questions/user-interface/todo-list?utm_source=frontendinterviewhandbook&utm_medium=referral&gnrs=frontendinterviewhandbook) (Free)
- FAQ-page accordion with 1000 questions, like counts per question, and pagination over the list. Discuss API endpoints needed.
- Chess grid: an n × n grid of cells where clicking highlights the cell (unhighlighting any previously selected one). Focus on reusability, extensibility, and optimisation.
- Auto-suggest dropdown with debounce — implement the HTML/CSS for an input plus a few search-result items, then add debounced fetching as a follow-up.

### System design questions

- Design a restaurant listing application where user can make orders and customize their orders by adding additional stuffs like toppings, salads etc. [Source](https://leetcode.com/discuss/post/1984996/amazon-virtual-onsite-april-2022-fronten-qiku/)
- Design an accordion component.
  - [Practice question](https://www.greatfrontend.com/questions/user-interface/accordion?utm_source=frontendinterviewhandbook&utm_medium=referral&gnrs=frontendinterviewhandbook) (Paid)
- Design a news website like Times of India. Focus on schema and API design, backend interaction, video rendering, and showing ads.
  - [Read answer](https://www.greatfrontend.com/questions/system-design/news-feed-facebook?utm_source=frontendinterviewhandbook&utm_medium=referral&gnrs=frontendinterviewhandbook) (Free)
- Design a mobile playlist page (music streaming).
  - [Read answer](https://www.greatfrontend.com/questions/system-design/music-streaming-spotify?utm_source=frontendinterviewhandbook&utm_medium=referral&gnrs=frontendinterviewhandbook) (Paid)
- Design a bike-sharing system (e.g. Citi Bike).
- Design an SDK in JavaScript implementing throttling and retry strategies. Focus on defining contracts that consumers will adhere to — feels like a mix of system design and coding.
- Design a check-in app for a clinic given a mock-up. Focus on endpoints needed to integrate frontend and backend, pagination, load balancing.

## Insider tips from the GreatFrontEnd community

These tips were shared by [GreatFrontEnd](https://www.greatfrontend.com/?utm_source=frontendinterviewhandbook&utm_medium=referral&gnrs=frontendinterviewhandbook) users who have completed interviews with Amazon.

**November 2025**:

> Sharing my Amazon FE onsite loop (online):
>
> - DSA round: a really hard problem I couldn't find online (felt similar to LeetCode 772 "Basic Calculator III"). Totally bombed this.
> - Auto search question: input box and a few search result items in a dropdown. They asked me to write only the HTML and CSS, but I mentioned "debounce" a few times and the interviewer asked me to implement it too.
> - Date component: relative time display — I compared `Date.now()` against the passed date.
> - System design: didn't handle the part about speeding up rendering well. I mentioned lazy loading, server-side rendering, static pages, loading properly sized images — but list virtualization didn't come to mind and the interviewer kept hinting.
>
> Yes, Amazon onsite does include a DSA round for frontend — either I had bad luck or it's standard now.

**May 2025**:

> The code editor for Amazon is like a plain editor (developed internally), where you just write your code (can’t execute code) and explain your completed code solution with some test cases. They will paste a single line of comment or if your interviewer is generous enough they will give more context to the problem. Mostly for FEE interviews they expect you to (that means they want you to) write Vanilla JS because internally Amazon uses multiple frameworks/libraries so to test the basics they mandate candidates to write in Vanilla JS and also, yes it cannot be executed. So you just write it as your interviewer likes it. Focus on the most common FEE Amazon questions from GreatFrontEnd, that list is enough, understand the problem, practice and then try to write it on a plain editor since there is no autocomplete or syntax highlighting. Also, once you’re confident in your practice, sit in front of your camera and explain the problem as if you’re in front of an interviewer.

**May 2025**:

> I wrapped up my 2 tech rounds with amazon for FE-2.
>
> Tech 1: Implement Infinite scroll with lots of followups. Like pagination, different device , network slowness. Error handling.
>
> Before implementing i discussed few things but not edge cases. In between there were many follow ups. I think i did okay okay in this rounds. Since I didn’t discussed much on edge cases. Then 1 simple array based DSA question.
>
> Tech 2: LLD
>
> Implement a component similar to autocomplete. This was easy as i just showed it using diagram and wrote code for the same.

**May 2025**:

> Amazon FEE II Interview
>
> OA: Vanilla,js
>
> - #1: Accordion by default allows one section to be open at a time. Theres a checkbox to switch behavior enabling multiple sections to expanded
> - #2: Address book form validation (name, email, phone number) that appends valid entries to table below. Along with an input field that filters the table based on phone number.

**April 2025**:

> Well I bombed the front end code challenge with amazon and what makes it worse, it wasn't even hard. I got nervous and forgot how to write a json object, something I've done a million times in the last 15 years. It was simple, write a json object and parse through it recursively, having it mirror a file system. I think there's a file system traversal program in GreatFrontEnd which I've already solved.

**March 2025**:

> Went through 4 rounds excluding Screening. got ghosted after the 4th round.
>
> Screening:
>
> - `getElementsByStyle`
> - Create a Chess Grid component of n x n cells, highlight a cell on click ( Unhighlight previously selected cells), focus on reusability, extensibility, optimisations
>
> Onsite:
>
> - R1 UI Coding: An image carousel component in vanilla js
> - R2 DSA: Given a two caption strings and a similar words dict, find if the captions are same or not
> - R3 HLD FE: Design a News website like Times of India, more focus on schema & api design and BE interation, Video rendering, showing Ads
> - R4 HM: mostly LP questions

For more insider tips, visit [GreatFrontEnd](https://www.greatfrontend.com/?utm_source=frontendinterviewhandbook&utm_medium=referral&gnrs=frontendinterviewhandbook)!
