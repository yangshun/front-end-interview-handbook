---
title: Front End System Design - UI Components
slug: front-end-system-design/ui-components
sidebar_label: UI Components
---

## Examples

- Photo gallery
- Selector

## Framework

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

### Requirements clarification

Every system design interview should start with clarifying requirements about the question, which is usually left vague intentionally. Components have well-defined scope and not try to do too many things.

Some considerations:

- What devices should the system support? Desktop web, mobile web, etc
- What's the primary device that users will access the system on?
- Which browsers should we support?
- Do we need to support internationalization?
- How much styling customization do we want to allow?

### Architecture

Architecture for front end interviews are typically focused on the client-side architecture, and not on large scale distributed systems where databases, load balancers and servers are involved.

For components, list down the various sub-components that will exist within it, what data is being passed among each component (e.g. in a Photo Gallery, there are the Image, Thumbnail, Paginator, etc sub-components). If you have a whiteboard/online drawing tool, it would also be helpful to draw diagrams to illustrate the entities and their relationships.

### Data model

Data model for components will refer to the component state. The concept of state should be familiar to most front end developers who have used front end UI libraries/frameworks such as React, Angular, Vue, Svelte, etc. In every of these libraries/frameworks, state is a common concept.

Deciding what data to put in state is essential to doing well for this portion. Few factors to consider when deciding what goes into component state:

- State is allowed to change over time during the lifecycle of the component, typically as a result of user interactions
- Each component has its own state which allows _multiple instances_ of the component to coexist on a single page. The state of a component instance should not affect the state of another instance

### API design

- Configuration options for the component (props in React)

### Extra stuff

<!-- #### User experience

#### Performance

#### Accessibility (a11y)

#### Internationalization (i18n)

#### Security

#### Multi-device support -->

## Helpful articles

- [Buillding an accessible autocomplete control](https://adamsilver.io/blog/building-an-accessible-autocomplete-control/)
