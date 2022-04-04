---
title: Front end system design - UI components
slug: front-end-system-design/ui-components
sidebar_label: UI components
---

## Examples

- Image carousel
- Selector which loads options over the network

## Framework

In system design interviews, candidates are supposed to lead the conversation. Here's a framework you can use to give an outline to the interviewer as to what you are going to cover. This framework is called **RADAD** and it is made up of the first character of each step. You can write this structure down on the whiteboard/online editor so that you don't forget.

1. **<u>R</u>equirements clarifications/alignment** - Ask about the requirements of the system.
1. **<u>A</u>rchitecture** - Outline the architecture of the subcomponents in the component, where relevant.
1. **<u>D</u>ata model** - How would the component store any data passed into it? What data structures are used?
1. **<u>A</u>PI design** - What's the API for using this component? What options will be allowed on the component?
1. **<u>D</u>eep dive** - User Experience (UX), Performance, Accessibility (a11y), Internationalization (i18n), Multi-device support, Security

### Requirements clarification

Every system design interview (even for non-front end as well) should start with requirements gathering/clarifying requirements about the question, which is usually left underspecified on purpose. You are recommended to spend at least a few minutes clarifying the requirements. Do not start drawing the architecture before you are clear about the requirements!

Thankfully, components have well-defined scope and not try to do too many things. You likely have used such a component yourself and possibly know what you need from such a component.

Some considerations:

- What devices should the system support? Desktop web, mobile web, etc
- What's the primary device that users will access the system on?
- Which browsers should we support?
- Do we need to support internationalization?
- How much styling customization do we want to allow?

### Architecture

Architecture for front end interviews are typically focused on the client-side architecture, and not on large scale distributed systems where databases, load balancers and servers are involved.

For components, list down the various subcomponents that will exist within it and what data is being passed among each component.

Let's take an image carousel example. Subcomponents within an image carousel would be:

- Main image - An image that displays the photo in focus
- Thumbnail - Smaller images below the (Will there be thumbnails? You will only know if you clarified requirements earlier)
- Image store - A client side cache of the list of photos to display

If you have a whiteboard/online drawing tool, it would also be helpful to draw diagrams to illustrate the entities and their relationships. Which subcomponent communicates with which when a user interaction occurs.

### Data model

Data model for components will refer to the component state. The concept of state should be familiar to most front end developers who have used front end UI libraries/frameworks such as React, Angular, Vue, Svelte, etc. In every of these libraries/frameworks, state is a common concept.

Deciding what data to put in state is essential to doing well for this portion. Few factors to consider when deciding what goes into component state:

- State is allowed to change over time during the lifecycle of the component, typically as a result of user interactions.
- Each component should maintain its own independent state which allows **multiple instances** of the component to coexist on a single page. The state of a component instance should not affect the state of another instance.
- Components are easier to reason about (read/understand) the fewer the fields there are in the state. We should strive to reduce the amount of state needed. If a component uses a value which can be derived from another piece of state, then that value should most likely not be part of the state. For example if your component is rendering a list of items and you want to display a message when there are no items to render, there shouldn't be an additional `isEmpty` state because it can be derived from the length of the `items`.
- If a component has multiple subcomponents, it'll be best if it's possible to consolidate the state within the top level and the rest of the components are pure and stateless.

### API design

The key idea behind components is for them to be reused and abstract complexities. Good components are designed well such that they can be reused in multiple scenarios and users do not have to know how they work internally before using them. For components, API refers to configuration options which would the component developer would expose to other developers to specify.

- What are the configuration options you would allow for the component? (`props` in React). What would be reasonable defaults?
- Follow the [Open-closed principle](https://en.wikipedia.org/wiki/Open%E2%80%93closed_principle) - the component should be open for extension but closed for modification.
- If your component is meant to be part of a UI library that doesn't bother about the appearance and leaves the styling to the user, extra care has to go into the design of the props and to allow users to customize the look and feel of the components. There are a few ways to go about this in React:
  - [Composition](https://reactjs.org/docs/composition-vs-inheritance.html) - Props which accept React components which also promotes code reuse.
  - [Render props](https://reactjs.org/docs/render-props.html) are function props that a component uses to know what to render. It also helps in reusing behavior without bothering about the appearance.
  - `className` or `style` props - Allows users to inject class names and/or styling attributes to inner DOM elements. This could have negative consequences but is still a common way of allowing user to customize component appearance.
- Possible configuration options:
  - Lifecycle/event hooks - `onClick`, `onChange`, `onBlur`, `onFocus`, etc.

### Deep dives

With the basics of the component covered, we can dive into specific areas where the component might need special attention to. Note that there almost definitely won't be enough time to cover every area, and not every area will be very relevant to the component at hand.

Showing knowledge about these areas and being able to dive deep into them are traits of senior front end engineers.

#### User experience (UX)

UX might not fall squarely under engineering but good front end engineers have good understanding of UX and building UI with great UX. There are too many UX practices to be aware of, but the most common ones/low hanging fruits are:

- Reflect state of the component to the user - If there's a pending background request, show a spinner. If there's an error, make sure to display it instead of silently failing.
- Display an empty state if there are no items in a list, instead of not rendering anything.
- Destructive actions should have a confirmation step, especially irreversible ones.
- Disable interactive elements if they trigger an async request! Prevents double firing of events in the case of accidental double clicking (possible for people with motor disabilities).
- If there are search inputs involved, each keystroke should not fire a network request.
- Handle extreme cases
  - Strings can be really long/short and your UI should not look weird in either case. For long strings, they can have their contents truncated and hidden behind a "View more" button.
  - If there are many items to display within a component, they shouldn't all be displayed on the screen at once and making the page extremely long/wide. Paginate the items or contain them within a container with a maximum width/height.
- Keyboard friendliness - This involves making sure the component is keyboard-friendly
  - Add shortcuts to make the component more usable by keyboard-only users
  - Ensure that elements can be focused and tab order within the component is correct
- Accessibility is part of UX but will be covered in a later section

#### Performance

In front end, performance typically refers to a few things - loading speed, how fast the UI responds to user interactions, memory space (heap) required by the component.

- Loading speed - The less JavaScript the component contains, the less JavaScript the browser has to download to load the component and the lower the network request time. It's also important to modularize components and allow users to download only the necessary JavaScript modules needed for their use case.
- Responsiveness to user interactions
  - If a user interaction results in displaying of data that has to be loaded over the network, there will be a delay between the user interaction and updating of the UI. Minimizing that delay or removing it entirely is the key to improving responsiveness.
  - JavaScript in a browser is single-threaded. The browser can only do execute one line of code at any one time. The less work (JavaScript executed, DOM updates) the component has to do when a user does something on the page, the faster the component can update the UI to respond to the changes.
- Memory space - The more memory your component takes up on the page, the slower the browser performs and the experience will feel sluggish/janky. If your component has to render hundreds/thousands of items (e.g. number of images in a carousel, number of items in a selector), memory space might become significant.

**Optimization tips**

- Render only what is displayed on the screen - For example, in a selector, only a few items are displayed to the user even if the list can contain hundreds of elements. Rendering all of them into the browser would be a waste of processing power and memory space. We can leverage a technique called windowing/virtualization to emulate a list with many elements while only rendering a few as possible to make the final result look as if there was no optimization done (especially preserving scroll height). Read more about virtualization [here](https://web.dev/virtualize-long-lists-react-window/).
- Lazy loading/load only necessary data - For example, in a photo gallery component, a user can have hundreds and thousands of photos, but it won't be feasible to load all of them eagerly. Most likely the user won't be browsing all of them in that session too. An optimization could be to load only the ones that the user is likely to view, or those that are within the viewport (which we call "above the fold"). The rest of the photos can be loaded on demand, which introduces responsiveness delay, but the next tip will help you to handle that.
- Preloading/prefetching data ahead of time - For example, in an image carousel where there are too many images to load beforehand, an optimization could be to load the next image ahead of time while the user is still on the current image, such that when the user clicks the "Next" button, there's no network delay needed because the next image has already been loaded. This technique can also be modified to load the next N images to handle the case where users click "Next" in rapid succession.

#### Accessibility (a11y)

Accessibility (a11y) is the practice of making your websites usable by as many people as possible.

- Color contrasts (e.g. color blindness)
- Keyboard friendliness (e.g. people with limited fine motor control)
- Visual Impairment (e.g. blind)
- Transcripts for audio (e.g. deaf)

Not everyone surfs the web the same way; some people use screenreaders and keyboards exclusively (no mouse)! Here are some basic tips for achieving a11y in UI components:

- Foreground colors should have sufficient contrast from the background colors
- Use the right HTML tags for semanticness, or the right `aria-role` attributes
- Clickable items should have `tabindex` attribute (so that they are focusable) and also "cursor: pointer" styling to indicate that they can be clicked on
- Images should have `alt` text, which will be read out by screen readers and act as a fallback description if the image fails to load
- `aria-label`s help to provide context to elements which are non-obvious to non-visual users. E.g. an icon button without any text label within it should have an `aria-label` attribute so that the intention is clear for users who can't see the icon

a11y is one of the most commonly neglected areas as most of the time they're invisible to the developer. Showing knowledge of a11y and possessing the skills to create accessible components will definitely reflect well on you. More reading on [Web Accessibility](https://www.w3.org/WAI/fundamentals/accessibility-intro/).

#### Internationalization (i18n)

Internationalization (i18n) is the design and development of a product, application or document content that enables easy localization for target audiences that vary in culture, region, or language. Typically components shouldn't have to worry about i18n unless under few specific circumstances:

- Component uses strings - Strings used in the component shouldn't be hardcoded to a specific language (e.g. "Prev"/"Next" in the controls of a photo gallery component). The strings can be specified as a prop with the English version as default
- Order of content matters - Does your component support RTL (right to left) languages like Arabic and Hebrew?

#### Multi-device support

Is the component expected to be used on mobile web? Mobile devices have unique constraints - they have less powerful hardware and viewport size is smaller. Hence things could be done differently to allow the component to work better on mobile devices - making a conscious effort to:

- Not use too much memory - using too much memory makes the device perform slower
- Increasing the hit box of interactive elements - fingers have an easier time tapping on the right element

#### Security

Most of the time, components aren't exposed to security vulnerabilities, but it can still happen. Here are the more common security vulnerabilities you should be aware of:

- XSS - Is your component vulnerable to cross-site scripting (XSS)? E.g. Do you render user input via `.innerHTML` or `dangerouslySetInnerHTML` (React-specific)?
- CSRF (Cross-Site Request Forgery)
- Clickjacking
- [`rel=noopener`](https://mathiasbynens.github.io/rel-noopener/)

## Helpful articles

- [Building an accessible autocomplete control](https://adamsilver.io/blog/building-an-accessible-autocomplete-control/)
