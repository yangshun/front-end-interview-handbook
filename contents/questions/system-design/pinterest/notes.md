Pinterest layout consists of images of varying aspect ratios being rendered into multiple fixed-width columns. Discuss solutions and challenges to render the Pinterest layout given only the image URLs and a specified number of columns.

The order of the images must be preserved from top to bottom. For example, if the image URLs are provided in a chronological order from newest to oldest, the newest images should be at the top of the layout.

## Problem Space

A strong candidate should explore most of the following issues in depth. A good candidate can explore most with hints, and you should be convinced of their understanding of them. A mediocre candidate spends significant amounts of time on some of them. Finally, a weak candidate makes progress on very few issues with hints.

### Layout

- Round Robin: Naive solution that doesn't consider column height balance.
- Shortest Column: Maintains balanced columns. This should be obvious even without introducing the chronological order constraint.
- Shortest Column with Same Height Optimization: With the chronological order constraint, recognize that images can render preemptively if loaded out-of-order when multiple columns have the same height.

### Markup

- Absolute Positioning: Allows preserving structure for screen readers and could potentially reduce the cost of reflow, but the container height must be constantly updated to allow scrolling of the viewport. Will work in typical browsers (aka you can still scroll), but parent element bounding box will not update (e.g. background will not extend).
- X Columns: Simple DOM insertion model. Also, the heights of each column can be measured, which may be preferable to caching image heights if separation of concerns is desired (e.g. arbitrary collapsing margins can be applied to images via CSS).

### Image Scheduling

- Asynchronous loading: Images do not load synchronously.
- Out-of-order loading: One approach is to insert images into the shortest column as soon as they load. This works without the chronological ordering, but it becomes important as soon as this constraint is introduced.
- Decouple loading from rendering: Recognize that loading an image can be entirely independent from how to schedule its rendering.
- Load/Render Dependency: With the chronological order constraint, recognize that the rendering of one image depends on the loading of the image and rendering of the preceding image.

### Loading Strategy

- Serial (one by one): Naive solution that is slow and provides a poor user experience.
- Batching: Non-optimal because the loading of N+1 can block a loaded N in the same batch from rendering. Also determining the size of a batch is non-trivial without the use of historical or aggregate data.
- Incremental: Render an image as soon as it loads and the previous image was rendered.
- Infinite scrolling: Recognize that images only need to be rendered if they are near the viewport. This can save network bandwidth, memory, and CPU.

### Network

- Browser Simultaneous Connection Limit: Browsers have varying limits on the maximum simultaneous connections, both in total and per domain.
- Domain bucketing: Allows working around the domain limitation. Potential discussions include how to determine the number of domains and how to bucket images into each domain.

### Error Handling

- Ignore Failed Images: Simplest way to handle errors.
- Render Error Message: Depending on the user experience, it could be better than ignoring failed images. If container dimension depends on text, this can complicate layout.
- Retries: Intelligent retrying of transient errors. Recognize the difference between hard failures and transient errors.

### DOM Thrashing

- Fast Network Connections: Recognize that many DOM operations occurring in close but separate execution loops can cause DOM thrash and lag browsers. An example of this happens is if many images are loaded from cache consecutively.
- Render Throttling/Batching: Throttle the scheduling of rendering images so that multiple images loading within a short period of time incurs only one reflow and repaint.
- Render Throttling Optimization: Recognize that if all images have loaded, the throttle timeout can be ignored and the images are immediately rendered.

## Evaluation Dimensions

### Problem Exploration

Candidates should ask clarifying questions and understand the implications of possible answers.

- How do the columns adapt to wide displays or mobile devices?
  - Use of media queries makes sense with an HTML/CSS-based solution (but as the candidate will discover, this is not possible in order to preserve the layout and ideal ordering constraints).
  - Changing the number of columns will require recomputing, relayout, and repaint.
- How are the images ordered and displayed?
- What kind of support for pagination is expected?
  - Infinite loading has implications for column layout and the need for virtualization.
  - Pagination should be seamless and not include breakpoints in the design?

### Completeness of Solution

Candidate should design a system that addresses requirements. Make sure you feel like there's a robust understanding of the end-to-end solution. More experienced candidates should recognize the implications of new or changed constraints.

- Does the candidate describe the endpoint request and response formats?
- What does the markup look like and how are the columns populated?
- How is the size and position of each image determined?
- How is the quantity of images fetched determined?
- What optimizations must exist to support infinite scrolling?

### API / Component Responsibility

- Is the endpoint request and response format reasonable?
  - Is the endpoint reasonably parameterized for pagination?
  - Is the response sufficiently simple but extensible?
- Is the internal representation of the contents of each column made explicit?
- Is there a clear articulation of how image loading is ordered and sequenced?

### Tradeoffs

- Using markup that is easier to implement or better for a11y (e.g. absolute positioning).
- Showing images as soon as possible versus delaying them to reduce repaints versus showing images out-of-order.
- Preserving "outlier" image aspect ratios (e.g. 100px x 1 px) versus weighted cropping.
- Sending down image URLs with the initial request versus showing a loading state more quickly.

### UI/UX

- Considers a11y (ordering of images).
- Considers when to start fetching the next page of images to reduce waiting on spinners.
- Considers the experience when waiting for image data to be fetched or decoded.
