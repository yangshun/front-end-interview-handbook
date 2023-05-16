---
title: Coding user interfaces in front end interviews
slug: coding/build-front-end-user-interfaces
sidebar_label: User interface coding
---

:::info We are now part of GreatFrontEnd!

Front End Interview Handbook is now part of [GreatFrontEnd](https://www.greatfrontend.com)! We are working to migrate the content over and you may find the latest version of this page on [GreatFrontEnd](https://www.greatfrontend.com/front-end-interview-guidebook/user-interface).

:::

Many Front End Engineers spend a lot of time building UI, and building a UI component is a good way to assess someone's familiarity in the three biggest aspects of front end — HTML, JavaScript, CSS.

Companies that ask such questions usually ask candidates to code in one of these three ways:

- Online editor with preview: You get to write HTML, CSS, JavaScript within the browser and see an instant preview of the page. Common platforms used include [CodePen](https://codepen.io) and [CodeSandbox](https://codesandbox.io/dashboard).
- Online editor without preview: Similar to the above, but you don't get to see any visual output of the page. A common platform for this is [CoderPad](https://coderpad.io/). In the past, Google used Google Docs 😱.
- BYOE (Bring Your Own Environment): Candidates bring their own development environment/laptop and free to choose whether they want to do local development using their own editors or use online environments like CodePen or CodeSandbox. This is the most ideal scenario that benefits candidates, but is usually only done during on-sites. You can usually use a JavaScript framework/library and in that case you are recommended to use tools that help you scaffold a fresh app where you can start coding immediately (e.g. `create-react-app`, `vue-cli`). You don't want to be spending time during the interview doing unnecessary plumbing that doesn't give your interviewers additional useful signals.
- Whiteboard: Candidates have to write all the required HTML, JS, CSS on the whiteboard. There's no preview, no autocomplete, no online documentation to help you; you're totally on your own. So far Facebook and Google are the only companies that are known to make candidates write on a whiteboard during front end interviews.

## Examples

- Components
  - Tabs — [Practice on GreatFrontEnd](https://www.greatfrontend.com/questions/user-interface/tabs) (Paid)
  - Accordion — [Practice on GreatFrontEnd](https://www.greatfrontend.com/questions/user-interface/accordion) (Paid)
  - Photo Gallery
  - Other possible components - [Refer to Bootstrap's list](https://getbootstrap.com/docs/5.3/components/)
- Apps
  - TODO list — [Practice on GreatFrontEnd](https://www.greatfrontend.com/questions/user-interface/todo-list)
  - Sortable Data Table (with extensions for filtering)
  - Kanban Board
- Games
  - Tic-tac-toe — [Practice on GreatFrontEnd](https://www.greatfrontend.com/questions/user-interface/tic-tac-toe) (Paid)
  - Whac-a-mole — [Practice on GreatFrontEnd](https://www.greatfrontend.com/questions/user-interface/whac-a-mole) (Paid)
  - Wordle — [Practice on GreatFrontEnd](https://www.greatfrontend.com/questions/user-interface/wordle) (Paid)
  - Tetris (advanced)
  - Snake (advanced)

:::info Practice UI coding questions on GreatFrontEnd

Not sure how to start? [GreatFrontEnd](https://www.greatfrontend.com) has front end interview [study plans](https://www.greatfrontend.com/get-started) and a [huge question bank of coding questions](https://www.greatfrontend.com/questions/js/coding/user-interface). Start practicing today!

:::

## Considerations

After you complete (or even before you start on) the question, think about these potential issues (where relevant). You may or may not have to handle them, so you can always clarify with the interviewer before starting on it so that you don't write too much/little code.

### Front end best practices

- Avoid writing global variables. Wrap your code within an [IIFE](https://developer.mozilla.org/en-US/docs/Glossary/IIFE) and don't pollute the global scope.
- What if you need to have multiple instances of this components on the page?
  - Does your code enable you to do this?
  - Did you use any global variables that will make it hard for you to do so?
  - Will having multiple components on the same page affect each other? They should be independent!
- Do you have a convenient API to instantiate independent components with configurable options? Old school jQuery UI components are good examples of doing this in a pre-React era.

### Performance and scalability

Does your component scale (latency, performance, UI, UX, etc)?

- What if the network takes too long to return something? How do you test slow network speed? Hint: Chrome Devtools Network tab.
- What if a string is too long? Hint: CSS `word-break` property.
- What if an image is too large?
- Can the component contain any amount of child items? Example: Support flexible amount of thumbnails in a photo gallery component or items in a tab navigation component.
- Will the layout be messed up if you have too few or too many of these items?
  - What if there are too many items? Hint: set max height or paginate.
  - What if there are no items, what do you show? Hint: show an empty state to indicate absence of contents. Do not show nothing.
- How will performance be affected if you have too many elements on the page? How do you solve it? Hint: [Virtual list](https://medium.com/outsystems-engineering/virtualizing-the-virtual-dom-pushing-react-further-d76a16e5f209)
- Did you hard code any values that will make it hard to extend to changing requirements in future? Did you design for extensibility?

### Network requests

- Does the component deal with race conditions in network/async requests? E.g. a new network request is fired before the response for the previous request is returned.
- What if the request timeout or errored out? How can you recover from it gracefully?
- How can you improve the performance of the component? Can you make use of caching, lazy loading, prefetching/preloading?
- What if you need to load a lot of data/images? Can you lazily load them? Can you fetch the data in batches to reduce spamming the API endpoint?

### User experience

- Is the component mobile-friendly? Can the component fit on different screen widths? How do you make it mobile-friendly?
- Is the component easily i18n-able? How can you change the design to cater for i18n? Does your component support RTL languages?
- Are there any potential UX/accessibility (a11y) issues with your components?
- What are some common accessibility techniques and gotchas?
  - https://medium.com/@addyosmani/accessible-ui-components-for-the-web-39e727101a67
- What tools can you use to check for accessibility?
- If you are unfamiliar with a11y, there's probably isn't much time for you to be an expert in a11y. The very least you can do is to acknowledge a knowledge gap in a11y and try to factor a11y into your answers. You should be at least aware of basic a11y practices like text size, color contrast, focusable elements, tab focus order, `aria-label`s. Knowledge of a11y is one of the differentiating factors between junior vs senior engineers.

### Security

- XSS vulnerability. Interviewers are especially looking out for this whenever you need to render user input. You almost never need to use `.innerHTML` or jQuery's `$.html()`. There's `.textContent` and `$.text()`. If you do have to render raw HTML, make sure you escape the contents first.
- User input that is being displayed in the URL has to be encoded first as well, or else there's also a potential for mischief where users can add additional query parameters.

### Future

Lastly, mention how you would do things differently if you had more time and were writing production code that you need to maintain. Perhaps use Sass instead of CSS, use React instead of jQuery for better maintainability, use Babel to compile your code for older browsers, make the component mobile-friendly and test on different screen widths, add keyboard shortcuts, etc.

:::info Practice UI coding questions on GreatFrontEnd

Not sure how to start? [GreatFrontEnd](https://www.greatfrontend.com) has front end interview [study plans](https://www.greatfrontend.com/get-started) and a [huge question bank of coding questions](https://www.greatfrontend.com/questions/js/coding/user-interface). Start practicing today!

:::
