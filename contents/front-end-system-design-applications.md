---
title: Front end system design interview - applications
slug: front-end-system-design/applications
sidebar_label: Applications
---

:::info We are now part of GreatFrontEnd!

Front End Interview Handbook is now part of [GreatFrontEnd](https://www.greatfrontend.com)! We are working to migrate the content over and you may find the latest version of this page on [GreatFrontEnd](https://www.greatfrontend.com/system-design/types-of-questions).

:::


## Examples

- News feed (e.g. Facebook) — [Read example solution on GreatFrontEnd](https://www.greatfrontend.com/questions/system-design/news-feed-facebook)
- E-commerce marketplace (e.g. Amazon) — [Read example solution on GreatFrontEnd](https://www.greatfrontend.com/questions/system-design/e-commerce-amazon) (Paid)
- Chat application (e.g. Messenger) — [Read example solution on GreatFrontEnd](https://www.greatfrontend.com/questions/system-design/chat-application-messenger) (Paid)
- Photo sharing application (e.g. Instagram) — [Read example solution on GreatFrontEnd](https://www.greatfrontend.com/questions/system-design/photo-sharing-instagram) (Paid)
- Video watching website
- Mail application

## Framework

1. Requirements exploration
1. Architecture
1. Data model
1. Interface definition (API)
1. Optimizations and deep dive
   - User experience (UX)
   - Performance
   - Accessibility (a11y)
   - Internationalization (i18n)
   - Multi-device support
   - Security

### Requirements exploration

Every system design interview should start with clarifying requirements about the question, which is usually left vague intentionally. Some considerations:

- What devices should the system support? Desktop web, mobile web, etc
- What's the primary device that users will access the system on?
- Which browsers should we support?
- Do we need to support internationalization?
- Does the app need to work offline?

### Architecture / High-level design

Architecture for front end interviews are typically focused on the client-side architecture, and not on large scale distributed systems where databases, load balancers and servers are involved.

For applications, common architectures include Model-View-Controller, Model-View-ViewModel, Flux, N-tier (where data tier is on the client) etc.

:::info Read front end system design case studies

[GreatFrontEnd](https://www.greatfrontend.com/system-design) shows you how to approach front end system design interviews with their [front end system design guide](https://www.greatfrontend.com/system-design) and case studies. Start reading today!

:::

### Data model

Client app state, which is a combination of server state (database) and true client state (non-persisted to the server).

### Interface definition (API)

API design for applications will refer to the HTTP/network API parameters and the shape of the responses.

### Optimization and deep dives

With the architectural basics of the application covered, we can dive into specific areas which the application might need special attention to. Note that there almost definitely won't be enough time to cover every area, and not every area will be very relevant to the component at hand.

Showing knowledge about these areas and being able to dive deep into them are traits of senior developers.

- User experience (UX)
- Performance
- Accessibility (a11y)
- Internationalization (i18n)
- Multi-device support
- Security

## Helpful articles

Many companies blog about their technical challenges in the front end domain and these are great content to learn more about designing front end systems.

- [Building the Google Photos Web UI](https://medium.com/google-design/google-photos-45b714dfbed1)
- [Twitter Lite and High Performance React Progressive Web Apps at Scale](https://medium.com/@paularmstrong/twitter-lite-and-high-performance-react-progressive-web-apps-at-scale-d28a00e780a3)
- [A Netflix Web Performance Case Study](https://medium.com/dev-channel/a-netflix-web-performance-case-study-c0bcde26a9d9)
- [A Tinder Progressive Web App Performance Case Study](https://medium.com/@addyosmani/a-tinder-progressive-web-app-performance-case-study-78919d98ece0)
- [A Pinterest Progressive Web App Performance Case Study](https://medium.com/dev-channel/a-pinterest-progressive-web-app-performance-case-study-3bd6ed2e6154)
- [A React And Preact Progressive Web App Performance Case Study: Treebo](https://medium.com/dev-channel/treebo-a-react-and-preact-progressive-web-app-performance-case-study-5e4f450d5299)
- [Rebuilding our tech stack for the new Facebook.com](https://engineering.fb.com/2020/05/08/web/facebook-redesign/)

:::info Read front end system design case studies

[GreatFrontEnd](https://www.greatfrontend.com/system-design) shows you how to approach front end system design interviews with their [front end system design guide](https://www.greatfrontend.com/system-design) and case studies. Start reading today!

:::
