---
title: DoorDash Front End Interview Questions
sidebar_label: DoorDash interview questions
description: DoorDash frontend engineer interview guide. Image slider with API, system design with BFF, hiring manager and domain knowledge rounds.
---

:::info Latest version on GreatFrontEnd

Find more company guides on [GreatFrontEnd](https://www.greatfrontend.com/interviews/company?utm_source=frontendinterviewhandbook&utm_medium=referral&gnrs=frontendinterviewhandbook).

:::

DoorDash's front end loop is fairly consistent across teams. The phone screen is almost always a small fetch + render UI task, the onsite expands that into adding features, and the system design round leans on backend/architecture knowledge as much as frontend.

## Interview process

1. Recruiter call.
2. Technical screen (~1 hour). Build a small UI that fetches from an endpoint and displays results. Two reported variants are:
   - Dog API / Reddit puppies endpoint.
   - Product card list.
3. Virtual onsite (4 rounds):
   - Hiring Manager chat — behavioral.
   - System design.
   - Onsite feature round — add a feature to existing code.
   - Domain knowledge — project deep dive with FE / JS / testing / optimization trivia.

Take-home projects are no longer reported in recent loops.

## JavaScript coding questions

- Fix a buggy `fetch` helper: the provided function may look right but doesn't `return` the promise from `fetch(...)`. You're expected to spot it.

## User interface coding questions

- Implement an image slider that fetches images from a given endpoint and displays them. Onsite follow-up: add like / dislike functionality and persistence.
  - [Practice question](https://www.greatfrontend.com/questions/user-interface/image-carousel?utm_source=frontendinterviewhandbook&utm_medium=referral&gnrs=frontendinterviewhandbook) (Free)
- Variant: render a list of product cards from an API.

## System design questions

The onsite system design round commonly asks you to design a Slack-like or messaging-style product. The interviewer hands you a partial architecture diagram on Excalidraw (client-side boxes are filled in, an arrow points off to nothing) and you fill in the backend, choosing between REST vs GraphQL, deciding whether a Backend-For-Frontend (BFF) layer makes sense, and justifying caching and data flow.

- Design a chat / messaging application.
  - [Read answer](https://www.greatfrontend.com/questions/system-design/chat-application-messenger?utm_source=frontendinterviewhandbook&utm_medium=referral&gnrs=frontendinterviewhandbook) (Paid)

## Insider tips from the GreatFrontEnd community

These tips were shared by [GreatFrontEnd](https://www.greatfrontend.com/?utm_source=frontendinterviewhandbook&utm_medium=referral&gnrs=frontendinterviewhandbook) users who have completed interviews with DoorDash.

**November 2025**:

> Heads-up on the DoorDash Senior FE (E5) system design round: they give you the client part of the architecture diagram on Excalidraw (frontend boxes plus an arrow pointing to nothing) and you fill in the rest. There's a small library of icons (servers, DBs, etc.) you can drag in. Be ready to justify REST vs GraphQL and whether a Backend-For-Frontend (BFF) layer makes sense. The round leans heavily on backend knowledge — they essentially expect FE engineers to also be full-stack.

**October 2025**:

> Current DoorDash process: recruiter → technical screen → virtual onsite. The virtual onsite is 4 rounds: hiring manager chat (behavioral), system design, an "onsite feature" round (add a feature to existing code), and a domain knowledge round (project deep dive plus some trivia).

**October 2025**:

> Just passed the DoorDash phone screen. The trick on the fetch part: the provided `dogsApi` function looked correct but didn't actually `return` the result of `fetch(...)` — you have to spot that and add `return` so the promise propagates. Spent 5 minutes debugging it thinking I was calling it wrong.
>
> On the React side you don't need any data manipulation, just `.map` over the JSON result to access the fields you need. The GFE Image Slider question covers what they want — also brush up on responsive CSS.

**March 2024**:

> DoorDash doesn't have a question pool for FE — it's almost always the same:
>
> 1. Phone screen: implement image slider with a given endpoint.
> 2. Onsite:
>    - Update the slider and add like / dislike functionality.
>    - System design — try to come up with 2+ alternative architectures.
>    - Domain knowledge — brush up on general FE: JavaScript, testing, optimization, etc.
>    - HM round — STAR-format behavioral and a bit more domain knowledge.

For more insider tips, visit [GreatFrontEnd](https://www.greatfrontend.com/?utm_source=frontendinterviewhandbook&utm_medium=referral&gnrs=frontendinterviewhandbook)!
