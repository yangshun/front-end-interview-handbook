**[CSS 질문](#css-질문)**

-   [CSS 선택자 특이성은 무엇이며 어떻게 작동합니까?](#css-선택자-특이성은-무엇이며-어떻게-작동합니까)
-   ["Resetting"과 "Normalizing" CSS의 차이점은 무엇입니까? 당신은 무엇을 선택할 것이며, 그 이유는 무엇입니까?](#resetting과-normalizing-css의-차이점은-무엇입니까-당신은-무엇을-선택할-것이며-그-이유는-무엇입니까)
-   [`float`이 어떻게 작동하는지 설명하세요.](#float이-어떻게-작동하는지-설명하세요)
-   [`z-index`와 쌓임 맥락(stacking context)이 어떻게 형성되는지 설명하세요.](#z-index와-쌓임-맥락stacking-context이-어떻게-형성되는지-설명하세요)
-   [블록 서식 문맥(BFC)과 작동 방식을 설명하세요.](#블록-서식-문맥bfc과-작동-방식을-설명하세요)
-   [clear하는 방법에는 어떤 것이 있으며, 각각 어떤상황에 적합합니까?](#clear하는-방법에는-어떤-것이-있으며-각각-어떤상황에-적합합니까)
-   [Explain CSS sprites, and how you would implement them on a page or site.](#explain-css-sprites-and-how-you-would-implement-them-on-a-page-or-site)
-   [How would you approach fixing browser-specific styling issues?](#how-would-you-approach-fixing-browser-specific-styling-issues)
-   [How do you serve your pages for feature-constrained browsers? What techniques/processes do you use?](#how-do-you-serve-your-pages-for-feature-constrained-browsers-what-techniquesprocesses-do-you-use)
-   [What are the different ways to visually hide content (and make it available only for screen readers)?](#what-are-the-different-ways-to-visually-hide-content-and-make-it-available-only-for-screen-readers)
-   [Have you ever used a grid system, and if so, what do you prefer?](#have-you-ever-used-a-grid-system-and-if-so-what-do-you-prefer)
-   [Have you used or implemented media queries or mobile specific layouts/CSS?](#have-you-used-or-implemented-media-queries-or-mobile-specific-layoutscss)
-   [Are you familiar with styling SVG?](#are-you-familiar-with-styling-svg)
-   [Can you give an example of an @media property other than screen?](#can-you-give-an-example-of-an-media-property-other-than-screen)
-   [What are some of the "gotchas" for writing efficient CSS?](#what-are-some-of-the-gotchas-for-writing-efficient-css)
-   [What are the advantages/disadvantages of using CSS preprocessors?](#what-are-the-advantagesdisadvantages-of-using-css-preprocessors)
-   [Describe what you like and dislike about the CSS preprocessors you have used.](#describe-what-you-like-and-dislike-about-the-css-preprocessors-you-have-used)
-   [How would you implement a web design comp that uses non-standard fonts?](#how-would-you-implement-a-web-design-comp-that-uses-non-standard-fonts)
-   [Explain how a browser determines what elements match a CSS selector.](#explain-how-a-browser-determines-what-elements-match-a-css-selector)
-   [Describe pseudo-elements and discuss what they are used for.](#describe-pseudo-elements-and-discuss-what-they-are-used-for)
-   [Explain your understanding of the box model and how you would tell the browser in CSS to render your layout in different box models.](#explain-your-understanding-of-the-box-model-and-how-you-would-tell-the-browser-in-css-to-render-your-layout-in-different-box-models)
-   [What does `* { box-sizing: border-box; }` do? What are its advantages?](#what-does---box-sizing-border-box--do-what-are-its-advantages)
-   [What is the CSS `display` property and can you give a few examples of its use?](#what-is-the-css-display-property-and-can-you-give-a-few-examples-of-its-use)
-   [What's the difference between `inline` and `inline-block`?](#whats-the-difference-between-inline-and-inline-block)
-   [What's the difference between a `relative`, `fixed`, `absolute` and `static`ally positioned element?](#whats-the-difference-between-a-relative-fixed-absolute-and-static-ally-positioned-element)
-   [What existing CSS frameworks have you used locally, or in production? How would you change/improve them?](#what-existing-css-frameworks-have-you-used-locally-or-in-production-how-would-you-changeimprove-them)
-   [Have you played around with the new CSS Flexbox or Grid specs?](#have-you-played-around-with-the-new-css-flexbox-or-grid-specs)
-   [Can you explain the difference between coding a web site to be responsive versus using a mobile-first strategy?](#can-you-explain-the-difference-between-coding-a-web-site-to-be-responsive-versus-using-a-mobile-first-strategy)
-   [Have you ever worked with retina graphics? If so, when and what techniques did you use?](#have-you-ever-worked-with-retina-graphics-if-so-when-and-what-techniques-did-you-use)
-   [Is there any reason you'd want to use `translate()` instead of `absolute` positioning, or vice-versa? And why?](#is-there-any-reason-youd-want-to-use-translate-instead-of-absolute-positioning-or-vice-versa-and-why)

* * *

## CSS 질문

[프론트엔드 면접 질문 - CSS 질문](https://github.com/h5bp/Front-end-Developer-Interview-Questions#css-questions)에 대한 해설입니다. 
Pull Request를 통한 제안 및 수정 요청을 환영합니다.

### CSS 선택자 특이성은 무엇이며 어떻게 작동합니까?

브라우저는 CSS 규칙의 특수성에 따라 요소에 표시할 스타일을 결정합니다. 브라우저는 이미 특정 요소와 일치하는 규칙을 결정했다고 가정합니다. 일치하는 규칙들 가운데, 다음에 기초하여 각 규칙에 대해 특수성, 네개의 쉼표로 구분된 값,`a, b, c, d`가 계산됩니다.

1. `a`는 인라인 스타일이 사용되고 있는지 여부입니다. 속성 선언이 요소에서 인라인 스타일이면 'a'는 1이고, 그렇지 않으면 0입니다.
2. `b`는 ID 셀렉터의 수입니다.
3. `c`는 클래스, 속성 및 가상 클래스 선택자의 수입니다.
4. `d`는 태그 및 유사 요소 선택자의 수입니다.

결과적인 특정성은 점수가 아니라, 컬럼마다 비교할 수 있는 가치들의 행렬입니다. 선택자를 비교하여 가장 높은 특이성을 갖는 항목을 결정할 때 왼쪽에서 오른쪽으로 보고 각 열의 가장 높은 값을 비교하세요. 따라서 `b`열의 값은 `c`와 `d`열에 있는 값을 무시합니다. 따라서 `0,1,0,0`의 특이성은 `0,0,10,10`중 하나보다 큽니다.

동등한 특이성의 경우: 최신 규칙은 중요한 규칙입니다. 스타일 시트에 동일한 규칙을 두 번 작성한 경우(내부나 외부에 관계 없이) 스타일 시트의 하위 규칙이 스타일 될 요소에 더 가까우므로 더 구체적으로 적용됩니다.

필자는 필요하다면 쉽게 재정의할 수 있도록 낮은 특정성 규칙들을 작성할 것입니다. CSS UI 컴포넌트 라이브러리 코드를 작성할 때 특이성을 높이거나 `!important`를 사용하기 위해 라이브러리 사용자가 지나치게 복잡한 CSS 규칙을 사용하지 않고도 이를 무시할 수 있도록 특이성이 낮은 것이 중요합니다.

###### 참고자료

-   <https://www.smashingmagazine.com/2007/07/css-specificity-things-you-should-know/>
-   <https://www.sitepoint.com/web-foundations/specificity/>

### "Resetting"과 "Normalizing" CSS의 차이점은 무엇입니까? 당신은 무엇을 선택할 것이며, 그 이유는 무엇입니까?

-   **Resetting** - Resetting은 요소의 모든 기본 브라우저 스타일을 제거하기 위한 것입니다. 예 : `margin`, `padding`s,`font-size`는 같은 값으로 재설정됩니다. 일반적인 타이포그래피 요소에 대한 스타일을 재 선언해야합니다.

-   **Normalizing** - Normalizing는 모든 것을 "정리"하는 것이 아니라 유용한 기본 스타일을 보존합니다. 또한 일반적인 브라우저 종속성에 대한 버그를 수정합니다.

필자는 나만의 스타일링을 많이 해야 하고 보존할 기본 스타일링이 필요하지 않도록 매우 맞춤화되었거나 자유로운 사이트 디자인을 가지고 있을 때 리셋을 선택합니다.

###### 참고자료

-   <https://stackoverflow.com/questions/6887336/what-is-the-difference-between-normalize-css-and-reset-css>

### `float`이 어떻게 작동하는지 설명하세요.

Float은 CSS 위치 지정 속성입니다. Float 된 요소는 페이지의 흐름의 일부로 남아 있으며 페이지의 흐름에서 제거되는 'position : absolute'요소와 달리 다른 요소 (예 : 플로팅 요소 주위로 텍스트가 흐르게 됨)의 위치 지정에 영향을 줍니다.

CSS `clear` 속성은`left`/`right`/`both` float 엘리먼트 아래에 위치하도록 사용될 수 있습니다.

부모 요소에 float된 요소만 있으면 그 높이가 무효로 됩니다. 컨테이너의 플로팅 된 요소 다음에 있지만 컨테이너가 닫히기 전에 float를 clear 하면 해결할 수 있습니다.

`.clearfix` 핵은 영리한 CSS 의사 선택자 (`: after`)를 사용하여 실수를 제거합니다. 상위 클래스에 overflow를 설정하는 대신 추가 클래스 `clearfix`를 적용합니다. 그런 다음이 CSS를 적용하십시오:

```css
.clearfix:after {
  content: ' ';
  visibility: hidden;
  display: block;
  height: 0;
  clear: both;
}
```
양자택일로, 부모 요소에 `overflow : auto` 또는 `overflow : hidden` 속성을 주면 자식 요소 내부에 새로운 블록 형식화 문맥을 설정하고 자식을 포함하도록 확장합니다.

###### 참고자료

-   <https://css-tricks.com/all-about-floats/>

### `z-index`와 쌓임 맥락(stacking context)이 어떻게 형성되는지 설명하세요.

CSS의 `z-index`속성은 요소의 겹치는 요소의 순서를 제어합니다. `z-index`는 `static`이 아닌 `position` 값을 갖는 요소에만 영향을 줍니다.

`z-index` 값이 없으면 DOM에 나타나는 순서대로 요소가 쌓이게 됩니다 (동일한 레이어에서 가장 낮은 레이어의 맨 위에 나타납니다). 정적이지 않은(non-static) 위치 지정 요소 (및 해당 하위 요소)는 HTML 레이어 구조와 상관없이 기본 정적 위치 지정을 사용하여 항상 요소 위에 나타납니다.

쌓임 맥락(stacking context)은 레이어 집합을 포함하는 요소입니다. 쌓임 맥락(stacking context) 지역 내에서 자식의 `z-index` 값은 문서 루트가 아닌 해당 요소를 기준으로 설정됩니다. 해당 컨텍스트 외부의 레이어 — 즉 로컬 쌓임 맥락의 형제 요소 — 그 사이의 레이어에 어울릴 수 없습니다. 요소 B가 요소 A의 상단에 위치하는 경우, 요소 A의 하위 요소 C는 요소 C가 요소 B보다 `z-index`가 더 높은 경우에도 요소 B보다 높을 수 없습니다.

각각의 쌓임 맥락은 자체적으로 포함되어 있습니다 - 요소의 내용이 쌓인 후에는 전체 요소를 쌓임 맥락의 쌓인 순서로 고려합니다. 소수의 CSS 속성이 `opacity`가 1보다 작고 `filter`가 `none`이 아니며 `transform`이 `none`이 아닌 새롭게 쌓임 맥락(stacking context)을 트리거합니다.

###### 참고 자료

-   <https://css-tricks.com/almanac/properties/z/z-index/>
-   <https://philipwalton.com/articles/what-no-one-told-you-about-z-index/>
-   <https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Positioning/Understanding_z_index/The_stacking_context>

### 블록 서식 문맥(BFC)과 작동 방식을 설명하세요.

BFC(블록 서식 문맥)는 블록 박스가 배치된 웹 페이지의 시각적 CSS 렌더링의 일부입니다.  Floats, absolutely positioned elements, `inline-blocks`, `table-cells`, `table-caption`s, and elements with `overflow` other than `visible` (그 값이 viewport에 전파되었을 때는 제외) establish new block formatting contexts.

BFC는 다음 조건 중 하나 이상을 충족시키는 HTML박스입니다:

-   `float`의 값은 `none`이 아닙니다.
-   `position`의 값은 `static`도 아니고 `relative`도 아닙니다.
-   `display`의 값은 `table-cell`, `table-caption`, `inline-block`, `flex` 또는 `inline-flex`입니다.
-   `overflow`의 값은 `visible`이 아닙니다.

BFC에서 각 박스의 왼쪽 바깥 가장자리는 포함하는 블록의 왼쪽 가장자리에 닿습니다 (오른쪽에서 왼쪽으로 포맷팅, 오른쪽 가장자리에서 터치).

BFC 상쇄(collapse)시 인접한 블록 레벨 박스 사이의 Vertical 마진. [마진 collapsing](https://www.sitepoint.com/web-foundations/collapsing-margins/)에 대해 자세히 읽어보세요.

###### 참고 자료

-   <https://developer.mozilla.org/en-US/docs/Web/Guide/CSS/Block_formatting_context>
-   <https://www.sitepoint.com/understanding-block-formatting-contexts-in-css/>

### clear하는 방법에는 어떤 것이 있으며, 각각 어떤상황에 적합합니까?

-   빈어있는 `div` 방법 - `<div style="clear:both;"></div>`.
-   Clearfix 방법 - 이와 같은 `.clearfix` 클래스를 참조하세요.
-   `overflow: auto` 또는 `overflow: hidden` 방법 - 부모는 새로운 블록 서식 지정 컨텍스트를 설정하고, 확장 된 자식을 포함하도록합니다.

대규모의 프로젝트에서는 유용하게 `.clearfix` 클래스를 만들어 필요한 곳에서 사용합니다. 자식이 부모보다 크기가 경우 `overflow: hidden`은 자식의 모두 보여줄 수 없습니다.

### Explain CSS sprites, and how you would implement them on a page or site.

CSS sprites combine multiple images into one single larger image. It is commonly used technique for icons (Gmail uses it). How to implement it:

1.  Use a sprite generator that packs multiple images into one and generate the appropriate CSS for it.
2.  Each image would have a corresponding CSS class with `background-image`, `background-position` and `background-size` properties defined.
3.  To use that image, add the corresponding class to your element.

**Advantages:**

-   Reduce the number of HTTP requests for multiple images (only one single request is required per spritesheet). But with HTTP2, loading multiple images is no longer much of an issue.
-   Advance downloading of assets that won't be downloaded until needed, such as images that only appear upon `:hover` pseudo-states. Blinking wouldn't be seen.

###### References

-   <https://css-tricks.com/css-sprites/>

### How would you approach fixing browser-specific styling issues?

-   After identifying the issue and the offending browser, use a separate style sheet that only loads when that specific browser is being used. This technique requires server-side rendering though.
-   Use libraries like Bootstrap that already handles these styling issues for you.
-   Use `autoprefixer` to automatically add vendor prefixes to your code.
-   Use Reset CSS or Normalize.css.

### How do you serve your pages for feature-constrained browsers? What techniques/processes do you use?

-   Graceful degradation - The practice of building an application for modern browsers while ensuring it remains functional in older browsers.
-   Progressive enhancement - The practice of building an application for a base level of user experience, but adding functional enhancements when a browser supports it.
-   Use [caniuse.com](https://caniuse.com/) to check for feature support.
-   Autoprefixer for automatic vendor prefix insertion.
-   Feature detection using [Modernizr](https://modernizr.com/).

### What are the different ways to visually hide content (and make it available only for screen readers)?

These techniques are related to accessibility (a11y).

-   `visibility: hidden`. However the element is still in the flow of the page, and still takes up space.
-   `width: 0; height: 0`. Make the element not take up any space on the screen at all, resulting in not showing it.
-   `position: absolute; left: -99999px`. Position it outside of the screen.
-   `text-indent: -9999px`. This only works on text within the `block` elements.
-   Metadata. For example by using Schema.org, RDF and JSON-LD.
-   WAI-ARIA. A W3C technical specification that specifies how to increase the accessibility of web pages.

Even if WAI-ARIA is the ideal solution, I would go with the `absolute` positioning approach, as it has the least caveats, works for most elements and it's an easy technique.

###### References

-   <https://www.w3.org/TR/wai-aria-1.1/>
-   <https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA>
-   <http://a11yproject.com/>

### Have you ever used a grid system, and if so, what do you prefer?

I like the `float`-based grid system because it still has the most browser support among the alternative existing systems (flex, grid). It has been used in Bootstrap for years and has been proven to work.

### Have you used or implemented media queries or mobile-specific layouts/CSS?

Yes. An example would be transforming a stacked pill navigation into a fixed-bottom tab navigation beyond a certain breakpoint.

### Are you familiar with styling SVG?

No... Sadly.

### Can you give an example of an @media property other than screen?

TODO

### What are some of the "gotchas" for writing efficient CSS?

Firstly, understand that browsers match selectors from rightmost (key selector) to left. Browsers filter out elements in the DOM according to the key selector, and traverse up its parent elements to determine matches. The shorter the length of the selector chain, the faster the browser can determine if that element matches the selector. Hence avoid key selectors that are tag and universal selectors. They match a large numbers of elements and browsers will have to do more work in determining if the parents do match.

[BEM (Block Element Modifier)](https://bem.info/) methodology recommends that everything has a single class, and, where you need hierarchy, that gets baked into the name of the class as well, this naturally makes the selector efficient and easy to override.

Be aware of which CSS properties trigger reflow, repaint and compositing. Avoid writing styles that change the layout (trigger reflow) where possible.

###### References

-   <https://developers.google.com/web/fundamentals/performance/rendering/>
-   <https://csstriggers.com/>

### What are the advantages/disadvantages of using CSS preprocessors?

**Advantages:**

-   CSS is made more maintainable.
-   Easy to write nested selectors.
-   Variables for consistent theming. Can share theme files across different projects.
-   Mixins to generate repeated CSS.
-   Splitting your code into multiple files. CSS files can be split up too but doing so will require a HTTP request to download each CSS file.

**Disadvantages:**

-   Requires tools for preprocessing. Re-compilation time can be slow.

### Describe what you like and dislike about the CSS preprocessors you have used.

**Likes:**

-   Mostly the advantages mentioned above.
-   Less is written in JavaScript, which plays well with Node.

**Dislikes:**

-   I use Sass via `node-sass`, which is a binding for LibSass written in C++. I have to frequently recompile it when switching between node versions.
-   In Less, variable names are prefixed with `@`, which can be confused with native CSS keywords like `@media`, `@import` and `@font-face` rule.

### How would you implement a web design comp that uses non-standard fonts?

Use `@font-face` and define `font-family` for different `font-weight`s.

### Explain how a browser determines what elements match a CSS selector.

This part is related to the above about writing efficient CSS. Browsers match selectors from rightmost (key selector) to left. Browsers filter out elements in the DOM according to the key selector, and traverse up its parent elements to determine matches. The shorter the length of the selector chain, the faster the browser can determine if that element matches the selector.

For example with this selector `p span`, browsers firstly find all the `<span>` elements, and traverse up its parent all the way up to the root to find the `<p>` element. For a particular `<span>`, as soon as it finds a `<p>`, it knows that the `<span>` matches and can stop its matching.

###### References

-   <https://stackoverflow.com/questions/5797014/why-do-browsers-match-css-selectors-from-right-to-left>

### Describe pseudo-elements and discuss what they are used for.

A CSS pseudo-element is a keyword added to a selector that lets you style a specific part of the selected element(s). They can be used for decoration (`:first-line`, `:first-letter`) or adding elements to the markup (combined with `content: ...`) without having to modify the markup (`:before`, `:after`).

-   `:first-line` and `:first-letter` can be used to decorate text.
-   Used in the `.clearfix` hack as shown above to add a zero-space element with `clear: both`.
-   Triangular arrows in tooltips use `:before` and `:after`. Encourages separation of concerns because the triangle is considered part of styling and not really the DOM. It's not really possible to draw a triangle with just CSS styles without using an additional HTML element.

###### References

-   <https://css-tricks.com/almanac/selectors/a/after-and-before/>

### Explain your understanding of the box model and how you would tell the browser in CSS to render your layout in different box models.

The CSS box model describes the rectangular boxes that are generated for elements in the document tree and laid out according to the visual formatting model. Each box has a content area (e.g. text, an image, etc.) and optional surrounding `padding`, `border`, and `margin` areas.

The CSS box model is responsible for calculating:

-   How much space a block element takes up.
-   Whether or not borders and/or margins overlap, or collapse.
-   A box's dimensions.

The box model has the following rules:

-   The dimensions of a block element are calculated by `width`, `height`, `padding`, `border`s, and `margin`s.
-   If no `height` is specified, a block element will be as high as the content it contains, plus `padding` (unless there are floats, for which see below).
-   If no `width` is specified, a non-floated block element will expand to fit the width of its parent minus `padding`.
-   The `height` of an element is calculated by the content's `height`.
-   The `width` of an element is calculated by the content's `width`.
-   By default, `padding`s and `border`s are not part of the `width` and `height` of an element.

###### References

-   <https://www.smashingmagazine.com/2010/06/the-principles-of-cross-browser-css-coding/#understand-the-css-box-model>

### What does `* { box-sizing: border-box; }` do? What are its advantages?

-   By default, elements have `box-sizing: content-box` applied, and only the content size is being accounted for.
-   `box-sizing: border-box` changes how the `width` and `height` of elements are being calculated, `border` and `padding` are also being included in the calculation.
-   The `height` of an element is now calculated by the content's `height` + vertical `padding` + vertical `border` width.
-   The `width` of an element is now calculated by the content's `width` + horizontal `padding` + horizontal `border` width.

### What is the CSS `display` property and can you give a few examples of its use?

-   `none`, `block`, `inline`, `inline-block`, `table`, `table-row`, `table-cell`, `list-item`.

TODO

### What's the difference between `inline` and `inline-block`?

I shall throw in a comparison with `block` for good measure.

|                                      | `block`                                                                                     | `inline-block`                                                   | `inline`                                                                                                                                                                                                             |
| ------------------------------------ | ------------------------------------------------------------------------------------------- | ---------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Size                                 | Fills up the width of its parent container.                                                 | Depends on content.                                              | Depends on content.                                                                                                                                                                                                  |
| Positioning                          | Start on a new line and tolerates no HTML elements next to it (except when you add `float`) | Flows along with other content and allows other elements beside. | Flows along with other content and allows other elements beside.                                                                                                                                                     |
| Can specify `width` and `height`     | Yes                                                                                         | Yes                                                              | No. Will ignore if being set.                                                                                                                                                                                        |
| Can be aligned with `vertical-align` | No                                                                                          | Yes                                                              | Yes                                                                                                                                                                                                                  |
| Margins and paddings                 | All sides respected.                                                                        | All sides respected.                                             | Only horizontal sides respected. Vertical sides, if specified, do not affect layout. Vertical space it takes up depends on `line-height`, even though the `border` and `padding` appear visually around the content. |
| Float                                | -                                                                                           | -                                                                | Becomes like a `block` element where you can set vertical margins and paddings.                                                                                                                                      |

### What's the difference between a `relative`, `fixed`, `absolute` and `static`ally positioned element?

A positioned element is an element whose computed `position` property is either `relative`, `absolute`, `fixed` or `sticky`.

-   `static` - The default position; the element will flow into the page as it normally would. The `top`, `right`, `bottom`, `left` and `z-index` properties do not apply.
-   `relative` - The element's position is adjusted relative to itself, without changing layout (and thus leaving a gap for the element where it would have been had it not been positioned).
-   `absolute` - The element is removed from the flow of the page and positioned at a specified position relative to its closest positioned ancestor if any, or otherwise relative to the initial containing block. Absolutely positioned boxes can have margins, and they do not collapse with any other margins. These elements do not affect the position of other elements.
-   `fixed` - The element is removed from the flow of the page and positioned at a specified position relative to the viewport and doesn't move when scrolled.
-   `sticky` - Sticky positioning is a hybrid of relative and fixed positioning. The element is treated as `relative` positioned until it crosses a specified threshold, at which point it is treated as `fixed` positioned.

###### References

-   <https://developer.mozilla.org/en/docs/Web/CSS/position>

### What existing CSS frameworks have you used locally, or in production? How would you change/improve them?

-   **Bootstrap** - Slow release cycle. Bootstrap 4 has been in alpha for almost 2 years. Add a spinner button component, as it is widely-used.
-   **Semantic UI** - Source code structure makes theme customization extremely hard to understand. Painful to customize with unconventional theming system. Hardcoded config path within the vendor library. Not well-designed for overriding variables unlike in Bootstrap.
-   **Bulma** - A lot of non-semantic and superfluous classes and markup required. Not backward compatible. Upgrading versions breaks the app in subtle manners.

### Have you played around with the new CSS Flexbox or Grid specs?

Yes. Flexbox is mainly meant for 1-dimensional layouts while Grid is meant for 2-dimensional layouts.

Flexbox solves many common problems in CSS, such as vertical centering of elements within a container, sticky footer, etc. Bootstrap and Bulma are based on Flexbox, and it is probably the recommended way to create layouts these days. Have tried Flexbox before but ran into some browser incompatibility issues (Safari) in using `flex-grow`, and I had to rewrite my code using `inline-blocks` and math to calculate the widths in percentages, it wasn't a nice experience.

Grid is by far the most intuitive approach for creating grid-based layouts (it better be!) but browser support is not wide at the moment.

###### References

-   <https://philipwalton.github.io/solved-by-flexbox/>

### Can you explain the difference between coding a web site to be responsive versus using a mobile-first strategy?

TODO

### How is responsive design different from adaptive design?

Both responsive and adaptive design attempt to optimize the user experience across different devices, adjusting for different viewport sizes, resolutions, usage contexts, control mechanisms, and so on.

Responsive design works on the principle of flexibility - a single fluid website that can look good on any device. Responsive websites use media queries, flexible grids, and responsive images to create a user experience that flexes and changes based on a multitude of factors. Like a single ball growing or shrinking to fit through several different hoops.

Adaptive design is more like the modern definition of progressive enhancement. Instead of one flexible design, adaptive design detects the device and other features, and then provides the appropriate feature and layout based on a predefined set of viewport sizes and other characteristics. The site detects the type of device used, and delivers the pre-set layout for that device. Instead of a single ball going through several different-sized hoops, you'd have several different balls to use depending on the hoop size.

###### References

-   <https://developer.mozilla.org/en-US/docs/Archive/Apps/Design/UI_layout_basics/Responsive_design_versus_adaptive_design>
-   <http://mediumwell.com/responsive-adaptive-mobile/>
-   <https://css-tricks.com/the-difference-between-responsive-and-adaptive-design/>

### Have you ever worked with retina graphics? If so, when and what techniques did you use?

I tend to use higher resolution graphics (twice the display size) to handle retina display. The better way would be to use a media query like `@media only screen and (min-device-pixel-ratio: 2) { ... }` and change the `background-image`.

For icons, I would also opt to use svgs and icon fonts where possible, as they render very crisply regardless of resolution.

Another method would be to use JavaScript to replace the `<img>` `src` attribute with higher resolution versions after checking the `window.devicePixelRatio` value.

###### References

-   <https://www.sitepoint.com/css-techniques-for-retina-displays/>

### Is there any reason you'd want to use `translate()` instead of `absolute` positioning, or vice-versa? And why?

`translate()` is a value of CSS `transform`. Changing `transform` or `opacity` does not trigger browser reflow or repaint, only compositions, whereas changing the absolute positioning triggers `reflow`. `transform` causes the browser to create a GPU layer for the element but changing absolute positioning properties uses the CPU. Hence `translate()` is more efficient and will result in shorter paint times for smoother animations.

When using `translate()`, the element still takes up its original space (sort of like `position: relative`), unlike in changing the absolute positioning.

###### References

-   <https://www.paulirish.com/2012/why-moving-elements-with-translate-is-better-than-posabs-topleft/>

### Other Answers

-   <https://neal.codes/blog/front-end-interview-css-questions>
-   <https://quizlet.com/28293152/front-end-interview-questions-css-flash-cards/>
-   <http://peterdoes.it/2015/12/03/a-personal-exercise-front-end-job-interview-questions-and-my-answers-all/>
