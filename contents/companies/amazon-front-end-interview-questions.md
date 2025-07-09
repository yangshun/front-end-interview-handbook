---
title: Amazon Front End Interview Questions
sidebar_label: Amazon interview questions
---

:::info Latest version on GreatFrontEnd

Find the latest version of this page on [GreatFrontEnd's Amazon Front End Interview Guide](https://www.greatfrontend.com/interviews/company/amazon/questions-guides?utm_source=frontendinterviewhandbook&utm_medium=referral&gnrs=frontendinterviewhandbook).

:::

Amazon's Front End interviews are known for their focus on technical depth and alignment with the company's Leadership Principles.

## Understanding the Amazon Front End Interview Process

The interview process typically involves several stages

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
  - [Practice question](https://www.greatfrontend.com/questions/javascript/get-elements-by-class-name?utm_source=frontendinterviewhandbook&utm_medium=referral&gnrs=frontendinterviewhandbook) (Paid)
- Promisify a function.

### User interface coding questions

- Implement a data table from an array of objects using HTML/CSS and JavaScript with searching and sorting
  - [Practice question](https://www.greatfrontend.com/questions/javascript/data-selection?utm_source=frontendinterviewhandbook&utm_medium=referral&gnrs=frontendinterviewhandbook) (Paid)
- Implement Material UI Chips with auto-suggest. When sending an e-mail, auto-suggest people and convert them into a chip with their avatar on the right
- Implement a Like button ([Source](https://leetcode.com/discuss/post/1719943/amazon-phone-screen-fee-l5-like-button-b-0z2l/))
  - [Practice question](https://www.greatfrontend.com/questions/user-interface/like-button?utm_source=frontendinterviewhandbook&utm_medium=referral&gnrs=frontendinterviewhandbook) (Paid)
- Given a JSON object generate a file directory UI
  - [Practice question](https://www.greatfrontend.com/questions/user-interface/file-explorer?utm_source=frontendinterviewhandbook&utm_medium=referral&gnrs=frontendinterviewhandbook) (Free)
- Code a paginated widget of addresses. Imagine you are a seller with a list of address you ship to an need to view them 5 address per page, with the possibility to go previous and next. [Source](<https://leetcode.com/discuss/post/1984996/amazon-virtual-onsite-april-2022-fronten-qiku/>)
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

### System design questions

- Design a restaurant listing application where user can make orders and customize their orders by adding additional stuffs like toppings, salads etc. [Source](<https://leetcode.com/discuss/post/1984996/amazon-virtual-onsite-april-2022-fronten-qiku/>)
- Design an accordion component.
  - [Practice question](https://www.greatfrontend.com/questions/user-interface/accordion?utm_source=frontendinterviewhandbook&utm_medium=referral&gnrs=frontendinterviewhandbook) (Paid)

## Insider tips from the GreatFrontEnd community

These tips were shared by [GreatFrontEnd](https://www.greatfrontend.com/?utm_source=frontendinterviewhandbook&utm_medium=referral&gnrs=frontendinterviewhandbook) users who have completed interviews with Amazon.

**20th May 2025**:

> The code editor for Amazon is like a plain editor (developed internally), where you just write your code (can’t execute code) and explain your completed code solution with some test cases. They will paste a single line of comment or if your interviewer is generous enough they will give more context to the problem. Mostly for FEE interviews they expect you to (that means they want you to) write Vanilla JS because internally Amazon uses multiple frameworks/libraries so to test the basics they mandate candidates to write in Vanilla JS and also, yes it cannot be executed. So you just write it as your interviewer likes it. Focus on the most common FEE Amazon questions from GreatFrontEnd, that list is enough, understand the problem, practice and then try to write it on a plain editor since there is no autocomplete or syntax highlighting. Also, once you’re confident in your practice, sit in front of your camera and explain the problem as if you’re in front of an interviewer.

**5th May 2025**:

> I wrapped up my 2 tech rounds with amazon for FE-2.
>
> Tech 1: Implement Infinite scroll with lots of followups. Like pagination, different device , network slowness. Error handling.
>
> Before implementing i discussed few things but not edge cases. In between there were many follow ups. I think i did okay okay in this rounds. Since I didn’t discussed much on edge cases. Then 1 simple array based DSA question.
>
> Tech 2: LLD
>
> Implement a component similar to autocomplete. This was easy as i just showed it using diagram and wrote code for the same.

**30th May 2025**:

> Amazon FEE II Interview
>
> OA: Vanilla,js
>
> - #1: Accordion by default allows one section to be open at a time. Theres a checkbox to switch behavior enabling multiple sections to expanded
> - #2: Address book form validation (name, email, phone number) that appends valid entries to table below. Along with an input field that filters the table based on phone number.

**13th Apr 2025**:

> Well I bombed the front end code challenge with amazon and what makes it worse, it wasn't even hard. I got nervous and forgot how to write a json object, something I've done a million times in the last 15 years. It was simple, write a json object and parse through it recursively, having it mirror a file system. I think there's a file system traversal program in GreatFrontEnd which I've already solved.

**17th Mar 2025**:

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

**15th Mar 2025**:

> hey all, I recently did an interview loop for Amazon (AWS) FEE L5! didn't get the job but sharing my experience here:
>
> 1. asteroid collision (leetcode)
> 2. bike sharing system design (like citibike in nyc)
> 3. find most common 3-page user sequence from traffic logs
> 4. bar raiser
> 5. tabs component (GreatFrontEnd)
>
> Each technical round had 2BQ in the beginning, and then the bar raiser round had like 8BQ?
>
> One thing to note was that recruiter explicitly told me I could code in react, but then during the interview they restricted it to only html/css/vanilla js... not a huge issue but did differ from what my recruiter told me 😵

**5th Mar 2025**:

> Hello everyone, I’m grateful for all the help from this group! I recently received an offer for a Frontend Engineer-1 position at Amazon and wanted to share my experience. I completed my MS in Dec 2024 and had been applying for general SDE and frontend roles without much success. I applied for a Frontend position in Amazon’s Early Grad Program on Jan 31, and here’s how it went:
>
> - Feb 3 – Received an online assessment with two JavaScript questions (an accordion and another DOM-based component) and a work-style test.
> - Feb 7 – Completed the OA and was invited to schedule my phone screen.
> - Feb 14 (Phone Screen) – First 30 mins: Behavioral questions (no follow-ups; use the STAR method with explicit metrics). Next 30 mins: Implement an image carousel (explain logic, write basic code, no need to run it). Passed and moved to the loop.
> - Feb 21 (Loop Rounds) – I was lucky in a way because only two rounds were scheduled with a 1-hour gap in between, as they couldn't find an interviewer for the middle slo.
>   - Round 1: Rotting Oranges DSA question + extensive behavioral follow-ups. My behavioral round didn’t go well, and I was a bit nervous afterward.
>   - Round 2: Three behavioral questions + build a To-Do app with two easy follow-ups.
> - Feb 26 (Final Round) – The interviewer was pretty chill and asked four behavioral questions. Since I had time between my initial two interviews and this one, I was able to prepare my behavioral responses well. For the technical part, I was given a verbose array-based DSA question, where I provided both the brute force and optimized solutions.
> - Feb 28 – Received my offer! Hope this helps, and good luck to everyone interviewing.

**17th Feb 2025**:

> My experience for L5 FEE onsite:
>
> 1. Implement autocomplete component
> 2. System design - mobile designing for playlist page
> 3. Implement json.stringify (more weight on OOP angle here)
> 4. Implement method to sanitize input data from nested Form UI.
>
> All questions were on plain text editor, no need to compile and run
>
> Behavior questions before every round to cover 2 LP, and a 5th interview just for LPs

**25th Jan 2025**:

> okay so i just did my phone screen with amazon: 1 LP about anticipating customer needs. Some JS trivia questions, looking at css to determine specificity. that was the first 30 min. coding was just a blank text editor: to implement an infinite scroller on addresses but i didnt really recognize it was a system design question until i was already in it.

**2nd Nov 2024**:

> Amazon FEE II Phone interview:
>
> LP: There were five questions, though I don’t remember all of them precisely. The questions is like ... going above and beyond for a customer, managing tight timelines, handling conflicts with a manager, and describing a project I’m most proud of.
>
> The interviewer mentioned that they asked several questions because I hadn’t initially provided enough detail in my responses 😦 .
>
> Coding Challenge: implementing a table similar to the Data Table in GreatFrontEnd, with three follow-ups:
>
> - Enable sorting functionality to activate when clicking on a column header.
> - Add a search bar to filter by name.

**30th Oct 2024**:

> Completed my Amazon FEE-I loop a while ago. Waiting for a decision but here's how it went.
>
> LP questions - difficult customer, time when you were not satisfied with result. Didn't repeat any story but had very few of them because I'm a new grad. Make sure you have good amount of stories, try not to repeat.
>
> Technical questions - 2 implementations questions and 1 general/JS question, very similar to what others went through actually.
>
> My phone interview had an array question which was pretty simple but it took me sometime to get it.
>
> Like Button, File Explorer and print this object of objects in the form of a HTML tree. They all started with the most basic part, very barebones implementation required. If time remains, they ask you to add more stuff to it. If you go through GreatFrontEnd's questions you should be more than ready for it imo.

**21st Sep 2024**:

> Finished my Amazon FEE I/new grad/entry level interviews. Waiting to hear back right now, but this is what I experienced:
>
> (Caveat: my interview was for a specific team, unlike a lot of general SDE/SWE new grad interviews I've asked about where it wasn't team-specific. I'm not too sure if this equally extends to FEE normally, but that's just what ended up happening.)
>
> **Behavioral**: Topics mostly concentrated around the LPs of Customer Obsession, Learn and Be Curious, Ownership, and Earn Trust.
>
> - Got a repeat question in one of my rounds, so I repeated one of the stories I used earlier because I don't have enough experience to have another story for that specific question 🥲.
>
> **Technical**: Received 2 implementation questions: Like Button and File Explorer, and 1 general-ish JS question (given a form, create a function that has parses the values in the form inputs and returns the form data as an object with nested properties). The implementation questions were basically the same/easier than GreatFrontEnd's version. The JS question is a tad reminiscent of GreatFrontEnd's "get" question + knowing how to get form values. IMO I flubbed this from getting caught off-guard from how it was described, followed by my brain suddenly forgetting how to program because of the embarrassment/panic 🫠 Still, it was a very simple question overall that is probably fairly easy to solve.
>
> Additional Notes:
>
> - Coding was in plain text editor/coderpad-style
> - Allowed to choose any framework for the implementation q'ns
> - Roughly 20-25min for behavioral, 30min for coding
> - No bar raiser round. Amazon just recently announced in early August that they re-implemented this for entry-level/new grad after removing it sometime in 2022/2023, but apparently this change didn't get reflected in my specific process
>
> Result: Received the offer! 🥳

**20th Sep 2024**:

> hey everyone, I wanted to share my Amazon FE II onsite interviewing experience, thank you to everyone on this server and the GreatFrontEnd team
>
> Amazon FE II onsite:
>
> - Behavioural: im sorry, i cant remember the questions i kinda went into autopilot during the interview but im going to go through my notes and update this if i do remember System Design: given a mock up (it was a check in app for a clinic) walk through how to create this but interviewer focused on endpoints needed to integrate frontend and backend, pagination, load balancing
> - Coding: React frontend component 1: relative time widget, given a date create a component that displays just now, less than a minute ago, n days, n weeks, n months, n years
> - Coding: React frontend component 2: FAQ page accordion -> additional requirements: 1000 questions, show likes of a question, what API endpoints needed, pagination
> - Coding: React frontend component 3: Tic tac toe game, algorithm for finding winner
>
> Additional Notes:
>
> - All coding rounds were done on a plain text editor
> - I was able to choose which language/framework to use
> - It was 30 mins behavioural, 30 mins for coding/system design
> - Dont just wing behavioural questions, they are a big deal and factor

For more insider tips, visit [GreatFrontEnd](https://www.greatfrontend.com/?utm_source=frontendinterviewhandbook&utm_medium=referral&gnrs=frontendinterviewhandbook)!
