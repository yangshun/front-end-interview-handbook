---
title: Front End System Design Overview
sidebar_label: Overview
---

There are shockingly few front end system design resources out there, probably because there's a lower demand and supply for front end engineer candidates.

"System" here typically refers to front end systems, which are quite different from the typical distributed system design questions for Software Engineering interviews. The question topic asked is quite similar to the ["Build User Interface" format](./build-user-interfaces.md) but with more focus on architecture and design. There's a significant amount of overlap between that and this - you will likely need to do some design in that and also do some coding here to illustrate your ideas/app state format.

The difference between this section and the ["Build User Interface" format](./build-user-interfaces.md) is that the questions here are usually larger. If the session is only half an hour, candidates are expected to talk about the design tradeoffs, possible implementations, instead of coding it out. Because this format of questions involve multiple components and knowledge across the web stack, candidates usually do not have to go very deep into the lower-level details and can keep the discussion at a higher level.

Many of the topics mentioned in the ["Build User Interface" format](./build-user-interfaces.md) are also relevant for front end system design - API design, scalability, performance, user experience, i18n, accessibility, security. Candidates should take the initiative and bring these topics up and lead the discussion with the interviewer. The more advanced topics such as performance, accessibility and i18n are what differentiates senior candidates from the junior ones.

The two main kinds of front end system design interviews are UI components and applications.

## Examples

- UI Components
  - Photo gallery
  - Selector
- Applications
  - News feed
  - Video watching website
  - Chat application

## Structure

System design interview questions tend to be open ended and vague, leaving you with lots of room to explore. If the interviewer tells you which specific areas to focus on, that's great! Otherwise, here's a framework you can consider for front end interviews, which is also helpful when working on new front end projects at work.

1. Requirements clarifications/alignment
1. Architecture
1. Data Model Design
1. API Design
1. Extra Stuff
   - Multi-device support
   - User Experience
   - Performance
   - Accessibility
   - i18n
   - Security

How to approach system design questions for applications and UI components can differ significantly, and we'll go through them in more detail in subsequent pages.
