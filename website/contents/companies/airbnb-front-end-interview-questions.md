---
title: Airbnb Front End Interview Questions
sidebar_label: Airbnb interview questions
description: Airbnb frontend interview questions covering JavaScript coding, UI development, system design, and LeetCode problems with real candidate experiences.
---

:::info Full guide on GreatFrontEnd

Explore round details, preparation advice, and related practice in [GreatFrontEnd's Airbnb Front End Interview Guide](https://www.greatfrontend.com/interviews/company/airbnb/questions-guides?utm_source=frontendinterviewhandbook&utm_medium=referral&gnrs=frontendinterviewhandbook).

:::

Airbnb interviews have included JavaScript utilities, UI builds with successive follow-ups, and architecture discussions. The examples below come from different candidates; prepare to extend a working solution while explaining your decisions.

## JavaScript coding questions

- Write a simple promise.
- Implement a Backbone-style `StoreData` class with key/value pairs and change listeners. One variation included a global `change` listener and required `unset` to remove data while retaining subscriptions. Setting the attribute again should notify those listeners. [Source](https://leetcode.com/discuss/post/348436/airbnb-phone-screen-implement-storedata-p3ypb/)
  - [Practice question](https://www.greatfrontend.com/questions/javascript/backbone-model?utm_source=frontendinterviewhandbook&utm_medium=referral&gnrs=frontendinterviewhandbook) (Paid)

## User interface coding questions

- Build autocomplete from an input and an endpoint returning a JSON list. Update results as the input changes and support keyboard navigation.
  - Related architecture discussion: [Autocomplete system design](https://www.greatfrontend.com/questions/system-design/autocomplete?utm_source=frontendinterviewhandbook&utm_medium=referral&gnrs=frontendinterviewhandbook) (Free). This is a design question, not a UI implementation exercise.
- Given a star widget embedded in a form write the code to select the stars and submit the correct value through a normal form action. Make reusable for multiple star widgets.
  - The [Star Rating](https://www.greatfrontend.com/questions/user-interface/star-rating?utm_source=frontendinterviewhandbook&utm_medium=referral&gnrs=frontendinterviewhandbook) exercise covers reusable rating selection. Add form submission separately. (Free)
- Implement a Tabs component.
  - [Practice question](https://www.greatfrontend.com/questions/user-interface/tabs?utm_source=frontendinterviewhandbook&utm_medium=referral&gnrs=frontendinterviewhandbook) (Free)
- Build an image carousel where each slide has a different duration and the carousel stops on the last image. Follow-up: show a countdown on each slide, auto-advance to the next image at 0, and stop at the end. Keep timer state and cleanup explicit as you add the countdown.
  - The [Image Carousel](https://www.greatfrontend.com/questions/user-interface/image-carousel?utm_source=frontendinterviewhandbook&utm_medium=referral&gnrs=frontendinterviewhandbook) exercise provides the basic navigation. Per-slide durations, a countdown, and stopping on the final slide are extensions. (Free)
- Shuffle and deal a set of 5 cards. The tricky part is the animation: reveal cards one by one.

## System design questions

- Design a chat application.
  - [Read answer](https://www.greatfrontend.com/questions/system-design/chat-application-messenger?utm_source=frontendinterviewhandbook&utm_medium=referral&gnrs=frontendinterviewhandbook) (Paid)
- Design Airbnb (travel booking platform).
  - [Read answer](https://www.greatfrontend.com/questions/system-design/travel-booking-airbnb?utm_source=frontendinterviewhandbook&utm_medium=referral&gnrs=frontendinterviewhandbook) (Paid)

_Source: [Glassdoor Airbnb Front End Engineer Interview Questions](https://www.glassdoor.sg/Interview/Airbnb-Front-End-Engineer-Interview-Questions-EI_IE391850.0,6_KO7,25.htm)_

## Algorithm

Some candidates have encountered LeetCode-style algorithm rounds. Include general problem solving alongside the practical UI exercises, with the balance guided by your scheduled rounds.

## Insider tips from the GreatFrontEnd community

These tips were shared by [GreatFrontEnd](https://www.greatfrontend.com/?utm_source=frontendinterviewhandbook&utm_medium=referral&gnrs=frontendinterviewhandbook) users who have completed interviews with Airbnb.

**January 2026**:

> I was asked to build an image carousel where each slide has a different duration, and the carousel should stop on the last image — they give you the image dataset. The follow-up was to show a countdown on each slide.
>
> - Speak out loud while thinking or writing code.
> - Discuss your approach beforehand. They will give you hints if you go in the wrong direction.
> - Make no mistakes — they kept asking why I did each thing.
>
> The countdown is the hard part — brush up on `setInterval` inside `useEffect`. Setup was a React project.

**October 2025**:

> The interviewer kept adding features until time ran out. Definitely brush up on the `useEffect` hook if you're prepping.

**March 2025**:

> "Our frontend technical screens tend to be more practical than algorithmic".... proceeds to drop a LC hard question during the screen FML

**July 2024**:

> It was add on listener, but the event names are change:foo, change:bar, (which is fine).
>
> There was additional on change which should be a global change listener that fires when any change is made
>
> And the kicker was that when you call unset, you need to keep the listeners (soft delete the data), so that when you set the attribute again, all the global listeners and the attribute listeners before unset are fired

**April 2024**:

> Question was to design a chat, nothing fancy.

For more insider tips, visit [GreatFrontEnd](https://www.greatfrontend.com/?utm_source=frontendinterviewhandbook&utm_medium=referral&gnrs=frontendinterviewhandbook)!
