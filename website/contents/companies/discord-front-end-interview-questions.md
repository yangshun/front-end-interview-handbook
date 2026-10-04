---
title: Discord Front End Interview Questions
sidebar_label: Discord interview questions
description: Discord front end interview guide. Build a chat app or Google Sheets clone in your own IDE, with formula logic and WebSocket considerations.
---

:::info Latest version on GreatFrontEnd

Find the latest version of this page on [GreatFrontEnd's Discord Front End Interview Guide](https://www.greatfrontend.com/interviews/company/discord/questions-guides?utm_source=frontendinterviewhandbook&utm_medium=referral&gnrs=frontendinterviewhandbook).

:::

Discord's tech screen and onsite coding rounds are unusual: you are typically expected to scaffold a full project from scratch in your own IDE, not in a shared online editor. The two most commonly reported questions are a chat web app (tech screen) and a Google Sheets-style spreadsheet (onsite coding).

## User interface coding questions

- Build a chat web app (Discord-style). Some candidates are asked the full-stack version (React + Node.js with WebSockets); front-end-only candidates have been asked a UI variant of the same.
- Design a React component that functions like an Excel cell.
- Implement a spreadsheet / Google Sheets clone:
  - **Part 1:** Implement the spreadsheet UI. User should be able to type into a given cell.
  - **Part 2:** Allow formulas in cells that reference other cells, just like Google Sheets. The formula-resolution logic is the hardest part — practice it.

## System design questions

- Design a chat application (Discord / Messenger style).
  - [Read answer](https://www.greatfrontend.com/questions/system-design/chat-application-messenger?utm_source=frontendinterviewhandbook&utm_medium=referral&gnrs=frontendinterviewhandbook) (Paid)
- Design Google Sheets (collaborative spreadsheet).
  - [Read answer](https://www.greatfrontend.com/questions/system-design/collaborative-spreadsheet-google-sheets?utm_source=frontendinterviewhandbook&utm_medium=referral&gnrs=frontendinterviewhandbook) (Paid)

## Insider tips from the GreatFrontEnd community

These tips were shared by [GreatFrontEnd](https://www.greatfrontend.com/?utm_source=frontendinterviewhandbook&utm_medium=referral&gnrs=frontendinterviewhandbook) users who have completed interviews with Discord.

**May 2026**:

> I talked to 2 people who got Discord offers. Both of them got a chat app in the tech screen and Google Sheets in the onsite coding round. For the chat app, the full-stack version is React + Node.js with WebSockets, but Discord also has a front-end-only variant — clarify which one you'll get. The formula logic in the Sheets question is the most important part to nail.

**May 2026**:

> Heads up for the Discord initial tech screen: I was told to scaffold a simple front-end project with whatever UI framework I wanted in my own IDE — no shared editor, no scaffolding from them, and AI was not allowed for my round (other candidates have reported it being allowed). Be ready to set up your dev environment fast.

**May 2026**:

> A common Discord tech-screen question is essentially "build a chat server like Discord" — yes, the actual product. There's a UI version of this question for FE candidates that doesn't require backend sockets. Search around for "design a React component that functions like an Excel cell" too, which has shown up in their loop.

For more insider tips, visit [GreatFrontEnd](https://www.greatfrontend.com/?utm_source=frontendinterviewhandbook&utm_medium=referral&gnrs=frontendinterviewhandbook)!
