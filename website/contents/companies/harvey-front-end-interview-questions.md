---
title: Harvey Front End Interview Questions
sidebar_label: Harvey interview questions
description: Harvey interview experiences covering spreadsheet UI coding, product code review, document chat, offline-first design, and project discussions.
---

:::info Full guide on GreatFrontEnd

Explore round details, preparation advice, and related practice in [GreatFrontEnd's Harvey Front End Interview Guide](https://www.greatfrontend.com/interviews/company/harvey/questions-guides?utm_source=frontendinterviewhandbook&utm_medium=referral&gnrs=frontendinterviewhandbook).

:::

Harvey interviews have included spreadsheet implementation, product code review, and applications that work with documents. One full-stack experience also included two separate system design rounds. Another candidate encountered a file-explorer task, so do not assume every technical screen uses the same exercise.

## User interface and JavaScript coding questions

- Build a working Google Sheets-style UI, then extend its multiple-cell behavior and formulas.
- Review existing product code for loading and error states, problematic effects, opportunities to simplify, and lazy loading of editor code.
- Navigate a file tree with breadcrumbs and folder creation or removal, as a separate interview variation.

Formula evaluation is the core of [Spreadsheet](https://www.greatfrontend.com/questions/javascript/spreadsheet?utm_source=frontendinterviewhandbook&utm_medium=referral&gnrs=frontendinterviewhandbook), which supports numeric cells and addition formulas with acyclic references. Building an editable grid is additional work. The drag interaction in [Selectable Cells](https://www.greatfrontend.com/questions/user-interface/selectable-cells?utm_source=frontendinterviewhandbook&utm_medium=referral&gnrs=frontendinterviewhandbook) helps with selection, but includes neither editing nor formulas.

For tree navigation, start from the expandable directories in [File Explorer](https://www.greatfrontend.com/questions/user-interface/file-explorer?utm_source=frontendinterviewhandbook&utm_medium=referral&gnrs=frontendinterviewhandbook). Breadcrumbs and folder editing extend that base exercise.

## System design questions

- Design a ChatGPT-style interface with document uploads and connected external data sources.
- Design an offline-first application, covering persistent data, synchronization, conflicts, and recovery UX.

Conversation state, offline queuing, and reconnect catch-up are covered in [Chat App](https://www.greatfrontend.com/questions/system-design/chat-application-messenger?utm_source=frontendinterviewhandbook&utm_medium=referral&gnrs=frontendinterviewhandbook). AI responses, files, and connectors are extensions to its one-to-one text-messaging scope.

Large uploads need progress, cancellation, and a way to resume interrupted transfers. For a batch, discuss bounded concurrency, retry behavior, per-file outcomes, and processing status after transfer completes. The scheduling in [Map Async Limit](https://www.greatfrontend.com/questions/javascript/map-async-limit?utm_source=frontendinterviewhandbook&utm_medium=referral&gnrs=frontendinterviewhandbook) is useful practice; it rejects on a mapping failure, so retries and resumability require additional work.

Keep application data and queued changes in persistent storage such as IndexedDB, separate from the assets a service worker caches. Explain how pending changes are replayed after reopening or reconnecting, without depending on a service worker running continuously.

## Insider tips from the GreatFrontEnd community

These tips were shared by [GreatFrontEnd](https://www.greatfrontend.com/?utm_source=frontendinterviewhandbook&utm_medium=referral&gnrs=frontendinterviewhandbook) users who have completed interviews with Harvey.

**Full-stack role**:

> Screening Round: How would you design and implement UI for Google sheet ? Implement basic UI followed up additional complexity in handling mutli cell and formulas. Output is expected to clear this round.
>
> Round 1: Code review in one of their product codebase. Identified and suggested proper error & loading states, useffect code smells and ideas to.simplify it and other ideas like lazy loading for editor based chunks.
>
> Round 2: System design for ChatGPT kind of interface with a blend of additional features like upload documents and consult external connected data sources. Explained about UI component structures, state management, API design.
>
> Round 3: Explain past projects and go deep dive into it with lots of follow-up questions.
>
> Round 4: Bar raiser - System Design for offline first app. Explained about indexdb, conflict handling, data sync layer and other UX. Also was asked about Service workers and their usage.
>
> Round 5: Manager round - Motivation, Past projects and expectations discussion. Some basic questions like how do you manage and run a project with x-team challenges.
