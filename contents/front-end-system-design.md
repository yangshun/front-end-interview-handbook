---
title: Front End System Design Interview Overview
sidebar_label: Overview
---

:::info Page migrated to GreatFrontEnd

Front End Interview Handbook is part of [GreatFrontEnd](https://www.greatfrontend.com?utm_source=frontendinterviewhandbook&utm_medium=referral&gnrs=frontendinterviewhandbook)! Find the latest version of this page on [GreatFrontEnd](https://www.greatfrontend.com/system-design?utm_source=frontendinterviewhandbook&utm_medium=referral&gnrs=frontendinterviewhandbook).

:::

There are shockingly few front end system design resources out there, probably because there's a lower demand and supply for front end engineer candidates.

"System" here typically refers to front end systems, which are quite different from the typical distributed system design questions for Software Engineering interviews. The questions asked can be quite similar to the possible questions in ["Build user interfaces" format](./build-front-end-user-interfaces.md) but with more focus on architecture and design. There's a significant amount of overlap between them - you will likely need to do some design (data model, API) when you build UI, and also do some coding here to illustrate your ideas/app state format.

The difference between this section and the ["Build user interfaces" format](./build-front-end-user-interfaces.md) is that the questions here are usually larger. If the session is only half an hour, candidates are expected to talk about the design tradeoffs, possible implementations, instead of coding it out. Because system design questions usually involve multiple components and knowledge across the web stack, candidates usually do not have to go very deep into the lower-level details of each component and can keep the discussion at a higher level, about API design between the client and server, and API between the components.

Many of the topics mentioned in the ["Build user interfaces" format](./build-front-end-user-interfaces.md) are also relevant for front end system design - API design, scalability, performance, user experience, i18n, accessibility, security, etc. Candidates should take the initiative and bring these topics up and lead the discussion with the interviewer. The more advanced topics such as performance, accessibility and i18n are what differentiates senior candidates from junior candidates.

The two main kinds of front end system design interviews are UI components and applications.

## Front end system design examples

- User interface components
  - Autocomplete: [Read example solution](https://www.greatfrontend.com/questions/system-design/autocomplete?utm_source=frontendinterviewhandbook&utm_medium=referral&gnrs=frontendinterviewhandbook) (Free)
  - Image carousel: [Read example solution](https://www.greatfrontend.com/questions/system-design/image-carousel?utm_source=frontendinterviewhandbook&utm_medium=referral&gnrs=frontendinterviewhandbook) (Paid)
  - Dropdown menu: [Read example solution](https://www.greatfrontend.com/questions/system-design/dropdown-menu?utm_source=frontendinterviewhandbook&utm_medium=referral&gnrs=frontendinterviewhandbook) (Paid)
  - Modal dialog: [Read example solution](https://www.greatfrontend.com/questions/system-design/modal-dialog?utm_source=frontendinterviewhandbook&utm_medium=referral&gnrs=frontendinterviewhandbook) (Paid)
- Applications
  - News feed (e.g. Facebook): [Read example solution](https://www.greatfrontend.com/questions/system-design/news-feed-facebook?utm_source=frontendinterviewhandbook&utm_medium=referral&gnrs=frontendinterviewhandbook) (Free)
  - E-commerce marketplace (e.g. Amazon): [Read example solution](https://www.greatfrontend.com/questions/system-design/e-commerce-amazon?utm_source=frontendinterviewhandbook&utm_medium=referral&gnrs=frontendinterviewhandbook) (Paid)
  - Chat application (e.g. Messenger): [Read example solution](https://www.greatfrontend.com/questions/system-design/chat-application-messenger?utm_source=frontendinterviewhandbook&utm_medium=referral&gnrs=frontendinterviewhandbook) (Paid)
  - Photo sharing application (e.g. Instagram): [Read example solution](https://www.greatfrontend.com/questions/system-design/photo-sharing-instagram?utm_source=frontendinterviewhandbook&utm_medium=referral&gnrs=frontendinterviewhandbook) (Paid)
  - Pinterest: [Read example solution](https://www.greatfrontend.com/questions/system-design/pinterest?utm_source=frontendinterviewhandbook&utm_medium=referral&gnrs=frontendinterviewhandbook) (Paid)
  - Travel booking website (e.g. Airbnb): [Read example solution](https://www.greatfrontend.com/questions/system-design/travel-booking-airbnb?utm_source=frontendinterviewhandbook&utm_medium=referral&gnrs=frontendinterviewhandbook) (Paid)
  - Video watching website

If you are interested to find out more, [GreatFrontEnd](https://www.greatfrontend.com?utm_source=frontendinterviewhandbook&utm_medium=referral&gnrs=frontendinterviewhandbook) shows you how to approach front end system design interviews with their [front end system design guide](https://www.greatfrontend.com/system-design?utm_source=frontendinterviewhandbook&utm_medium=referral&gnrs=frontendinterviewhandbook) and case studies.

## RADIO Framework

System design interview questions tend to be open ended and vague, leaving you with lots of room to explore. If the interviewer tells you which specific areas to focus on, that's great!

We have invented a simple-to-remember framework – the **RADIO framework**, that you can use to give an outline to the interviewer as to what you are going to cover.

This framework is called **RADIO** because it is made up of the first character of each area. You can write this structure down on the whiteboard/online editor so that you don't forget.

1. **<u>R</u>equirements exploration**: Understand the problem thoroughly and determine the scope by asking a number of clarifying questions.
2. **<u>A</u>rchitecture / High-level design**: Identify the key components of the product and how they are related to each other.
3. **<u>D</u>ata model**: Describe the various data entities, the fields they contain and which component(s) they belong to.
4. **<u>I</u>nterface definition (API)**: Define the interface (API) between components in the product, functionality of each API, their parameters and responses.
5. **<u>O</u>ptimizations and deep dive**: Discuss about possible optimization opportunities and specific areas of interest when building the product.

The RADIO framework is also helpful when working on new front end projects at work, especially when writing design documentation. It's a good framework to learn.

How to approach system design questions for applications and UI components can differ significantly, and we'll go through them in more detail in subsequent sections.

## Things you would not have to do (probably)

Because front end system design interviews focus on front end, you probably do not have to:

- Design a database schema
- Know about which kind of database to use (SQL vs NoSQL)
- Scaling your servers and database (sharding, vertical/horizontal scaling)
- Talk about availability, fault tolerance, latency, etc

Read more about the differences between [Front End vs Back End System Design interviews](/blog/front-end-vs-back-end-system-design-interviews/#differences).
