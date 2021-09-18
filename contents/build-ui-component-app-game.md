---
title: Build a UI Component/App/Game
---

Many Front End engineers spend a lot of time building UI, and building a UI component is a good way to assess someone's familiarity in the three biggest aspects of front end - HTML, JS, CSS.

## Examples

- Tabs
- Media Gallery
- Accordion
- Other possible components - https://getbootstrap.com/docs/4.0/components/

Companies that ask UI components questions usually ask candidates to code in one of these three styles:

- Codepen.io (or some other online editor with preview) - You get to visualize the output and iterate on the solution.
- BYOE (bring your own environment) - Candidates bring their own development environment/laptop and free to choose whether they want to do local development using their own editors or use online environments like codepen.io or codesandbox.io. This is the most ideal scenario that benefits candidates, but is usually only done during on-sites.
- Write on the whiteboard - Candidates have to write all the required HTML, JS, CSS on the whiteboard. There's no preview, no autocomplete, no online documentation to help you; you're totally on your own. So far Facebook and Google are the only companies that are known to do whiteboard-style for front end interviewws.

## Considerations

After you complete (or even before you start on) the question, think about these potential issues (where relevant). You may or may not have to handle them, so you can always clarify with the interviewer before starting on it so that you don't write too much/little code:

### Software Engineering Best Practices

- Writing global variables. Wrap your code within an IIFE and leave the global scope clean.
- What if I need to have multiple instances of this components on the page? Did I use any global variables that will make it hard for me to do so? Will having my components on the same page affect each other? They should be independent!
- Do I have a convenient API to instantiate independent components with configurable options? Old school jQuery UI components are a good examples of this.

### Performance and Scalability

Can my component scale (network request duration, performance, UI, UX, etc)?

- What if the network takes too long to return something? How do I test slow network speed? Hint: Chrome Devtools Network tab.
- What if a string is too long? Hint: CSS `word-break` property.
- What if a picture is too large?
- Can the component contain any amount of child items? Example: Support flexible amount of thumbnails in a photo gallery component.
- Will the layout be messed up if I have too few or too many of these items? What if there are no items, what empty state do I show?
- How will performance be affected if I have too many elements on the page? How do I solve it? Hint: [Virtual list](https://medium.com/outsystems-engineering/virtualizing-the-virtual-dom-pushing-react-further-d76a16e5f209)
- Did I hard code any values that will make it hard to extend to changing requirements in future? Did I design for extensibility?

### Network Requests

- Does the component deal with race conditions in network/async requests? E.g. a new network request is fired before the response for the previous request is returned.
- What if the request timeout or errored? How can I recover from it gracefully?
- How can I improve the performance of the component? Can I make use of caching, lazy loading, prefetching/preloading?
- What if I need to load a lot of data/images? Can I lazily load them? Can I fetch the data in batches to reduce spamming the API endpoint?

### User Experience

- Is my component mobile-friendly? Can my component fit on different screen widths? How do I make it mobile-friendly?
- Is my component easily i18n-able? How can I change the design to cater for i18n? Does my component support RTL languages?
- Are there any potential UX/accessibility issues with my components?
- What are some common accessibility techniques and gotchas?
  - https://medium.com/@addyosmani/accessible-ui-components-for-the-web-39e727101a67
- What tools can I use to check for accessibility?
- There's probably isn't much time for you to be an expert in accessibility but this is what differentiates a junior vs a senior engineer.

### Security:

- XSS vulnerability. Interviewers are especially looking out for this whenever there is user input involved. You almost never need to use `.innerHTML` or `$.html()` function. If you do, make sure you escape the contents first.
- User input that is being displayed in the URL has to be encoded first as well, or else there's also a potential for mischief.

### Future

Lastly, mention how you would do things differently if you had more time and were writing production code that you need to maintain. Perhaps use Sass instead of CSS, use React instead of jQuery for better maintainability, make the component mobile-friendly and test on different screen widths, add keyboard shortcuts, etc.
