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
- If a component uses a value which can be derived from another piece of state, then that value should most likely not be part of the state. For example if your component is rendering a list of items and you want to display a message when there are no items to render, there shouldn't be an additional `isEmpty` state because it can be derived from the length of the `items`

### API design

The key idea behind components is for reusing. Good components are designed well such that they can be reused in multiple scenarios.

- Configuration options for the component (`props` in React)
- Follow Open-closed principle - the component should be open for extension but closed for modification. In React,
- If your component is meant to be a UI library that doesn't bother about the appearance and leaves the styling to the user, extra care has to go into the design of the props and to allow users to customize the look and feel of the components. There are a few ways to go about this in React:
  - [Composition](https://reactjs.org/docs/composition-vs-inheritance.html) - Props which accept React components which also promotes code reuse
  - [Render props](https://reactjs.org/docs/render-props.html) are function props that a component uses to know what to render. It also helps in reusing behavior without bothering about the appearance
  - `className` or `style` props - Allows users to inject class namaes and/or styling attributes to inner DOM elements

### Extra stuff

With the basics of the component covered, we can dive into specific areas which the component might need special attention to. Note that there almost definitely won't be enough time to cover every area, and not every area will be very relevant to the component at hand.

#### User experience

#### Performance

In front end, performance typically refers to a few things - loading speed, how fast the UI responds to user interactions, memory space (heap) required by the component

- Reducing loading speed - The less JavaScript the component contains, the less JavaScript the browser has to download to load the component and the lower the network request time. It's also important to modularize components and allow users to download only the necessary JavaScript modules needed for their use case.
- User interactions - TODO
- Memory space - TODO

#### Accessibility (a11y)

TODO

#### Internationalization (i18n)

Internationalization (i18n) is the design and development of a product, application or document content that enables easy localization for target audiences that vary in culture, region, or language. Typically components shouldn't have to worry about i18n unless under few specific circumstances:

- Component uses strings - Strings used in the component shouldn't be hardcoded to a specific language (e.g. "Prev"/"Next" in the controls of a photo gallery component). The strings can be specified as a prop with the English version as default
- Order of content matters - Does your component support RTL (right to left) languages like Arabic and Hebrew?

#### Multi-device support

Is the component expected to be used on mobile web? Mobile devices have unique constraints - they have less powerful hardware and viewport size is smaller. Hence things could be done differently to allow the component to work better on mobile devices - making a conscious effort not to use too much memory and increasing the hit box of interactive elements.

#### Security

- Is your component vulnerable to cross-site scripting (XSS)? E.g. do you render user input via `.innerHTML` or `dangerouslySetInnerHTML` (React-specific)?

## Helpful articles

- [Buillding an accessible autocomplete control](https://adamsilver.io/blog/building-an-accessible-autocomplete-control/)
