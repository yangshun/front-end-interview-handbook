# Mga Katanungan sa CSS

Mga kasagutan sa [Mga Kasagutan sa Pakikipanayam sa Front-end na Trabaho - Mga Katanungan sa CSS](https://github.com/h5bp/Front-end-Developer-Interview-Questions/blob/master/questions/css-questions.md). Malugod na tatanggapin ang mga Pull request para sa mga suhestyon at mga koreksyon!

* [Ano ang pagsisigurado ng CSS selector at kung paano ito gumagana?](#ano-ang-pagsisigurado-ng-css-selector-at-kung-paano-ito-gumagana)
* [Ano ang pagkakaiba sa pagitan ng "pag-reset" at "pag-normalize" ng CSS? saan sa dalawa ang iyong pipiliin, at bakit?](#ano-ang-pagkakaiba-sa-pagitan-ng-pag-reset-at-pag-normalize-ng-css-saan-sa-dalawa-ang-iyong-pipiliin-at-bakit)
* [Ilarawan ang mga `float` at kung paano sila gumagana.](#ilarawan-ang-mga-float-at-kung-paano-sila-gumagana)
* [Ilarawan ang z-index at kung papaano nabuo ang konteksto.](iIlarawan-ang-z-index-at-kung-papaano-nabuo-ang-konteksto)
* [Ilarawan ang BFK (Block Formatting na Konteksto) at papaaano ito gumagana.](#ilarawan-ang-bfk-block-formatting-na-konteksto-at-papaaano-ito-gumagana)
* [Ano ang iba't ibang teknik ng paglilinis at kung ano ang nararapat sa kung ano ang konteksto?](#ano-ang-ibat-ibang-teknik-ng-paglilinis-at-kung-ano-ang-nararapat-sa-kung-ano-ang-konteksto)
* [Ipaliwanag ang mga CSS na sprite, at papaano mo ipapatupad ang mga ito sa isang pahina o site.](#ipaliwanag-ang-mga-css-na-sprite-at-papaano-mo-ipapatupad-ang-mga-ito-sa-isang-pahina-o-site)
* [Papaano mo didiskartehan ang pag-aayos ng mga ispisipik sa browser na pag-eestilo na isyu?](#papaano-mo-didiskartehan-ang-pag-aayos-ng-mga-ispisipik-sa-browser-na-pag-eestilo-na-isyu)
* [Papaano mo inahahanda ang iyong mga pahina para sa mga browser na kulang sa tampok? Ano-ano ang mga teknik or proseso ang iyong ginagamit?](#papaano-mo-inahahanda-ang-iyong-mga-pahina-para-sa-mga-browser-na-kulang-sa-tampok-ano-ano-ang-mga-teknik-or-proseso-ang-iyong-ginagamit)
* [Ano-ano ang mga iba't ibang pamamaraan upang matago ang nakatagong nilalaman (at gawan ng paraan na ito ay magagamit lamang ng mga mambabasa ng iskrin)?](#ano-ano-ang-mga-ibat-ibang-pamamaraan-upang-matago-ang-nakatagong-nilalaman-at-gawan-ng-paraan-na-ito-ay-magagamit-lamang-ng-mga-mambabasa-ng-iskrin)
* [Ikaw ba ay nakagamit kailanman ng sistemang grid?, at kung gayon, Ano ang iyong mas pipiliin?](#ikaw-ba-ay-nakagamit-kailanman-ng-sistemang-grid-at-kung-gayon-ano-ang-iyong-mas-pipiliin)
* [Ikaw ba ay nakagamit oh nakapagpatupad na ng mga query sa mobile o mga layout na espisipik sa mobile/CSS?](#ikaw-ba-ay-nakagamit-oh-nakapagpatupad-na-ng-mga-query-sa-mobile-o-mga-layout-na-espisipik-sa-mobilecss)
* [Ikaw ba ay pamilyar sa estilong SVG?](#ikaw-ba-ay-pamilyar-sa-estilong-svg)
* [Makapagbibigay kaba ng halimbawa ng klase ng @media maliban sa iskrin?](#makapagbibigay-kaba-ng-halimbawa-ng-klase-ng-media-maliban-sa-iskrin)
* [Ano-ano ang ilan sa mga "pasabog" para sa epektibong pagsusulat ng CSS?](#ano-ano-ang-ilan-sa-mga-pasabog-para-sa-epektibong-pagsusulat-ng-css)
* [Ano ang mga pakinabang o di-pakinabang ng paggamit ng mga preprocessors ng CSS?](#ano-ang-mga-pakinabang-o-di-pakinabang-ng-paggamit-ng-mga-preprocessors-ng-css)
* [Ilarawan kung ano ang iyong gusto at di gusto tungkol sa CSS na mga preprocessor na iyong nagamit.](#ilarawan-kung-ano-ang-iyong-gusto-at-di-gusto-tungkol-sa-css-na-mga-preprocessor-na-iyong-nagamit)
* [Papaano mo ipapatupad ang isang web design comp na gumagamit ng mga di pangkaraniwang font?](#papaano-mo-ipapatupad-ang-isang-web-design-comp-na-gumagamit-ng-mga-di-pangkaraniwang-font)
* [Ipaliwanag kung paano tinutukoy ng isang browser kung anu-anong mga elemento ang tumutugma sa tagapili ng CSS.](#ipaliwanag-kung-paano-tinutukoy-ng-isang-browser-kung-anu-anong-mga-elemento-ang-tumutugma-sa-tagapili-ng-css)
* [Ilarawan ang mga elementong pseudo at talakayin kung para saan ito gagamitin.](#ilarawan-ang-mga-elementong-pseudo-at-talakayin-kung-para-saan-ito-gagamitin)
* [Ipaliwanag ang iyong pagkakaintindi sa modelong kahon at papaano mo pagsasabihan ang browser sa CSS na mag-render ng iyong layout sa iba't ibang modelo ng kahon.](#ipaliwanag-ang-iyong-pagkakaintindi-sa-modelong-kahon-at-papaano-mo-pagsasabihan-ang-browser-sa-css-na-mag-render-ng-iyong-layout-sa-ibat-ibang-modelo-ng-kahon)
* [Ano ang ginagawa ng `* { box-sizing: border-box; }`? Anu-ano ang mga pakinabang nito?](#ano-ang-ginagawa-ng---box-sizing-border-box--anu-ano-ang-mga-pakinabang-nito)
* [Ano ang katangian ng CSS na `display` at pwede ka bang magbigay ng ilang mga halimbawa ng paggamit nito?](#ano-ang-katangian-ng-css-na-display-at-pwede-ka-bang-magbigay-ng-ilang-mga-halimbawa-ng-paggamit-nito)
* [Ano ang pagkakaiba sa pagitan ng `inline` at `inline-block`?](#ano-ang-pagkakaiba-sa-pagitan-ng-inline-at-inline-block)
* [Ano ang pagkakaiba sa pagitan ng `relative`, `fixed`, `absolute` at elementong nakaposisyong panig sa `static`?](#ano-ang-pagkakaiba-sa-pagitan-ng-relative-fixed-absolute-at-elementong-nakaposisyong-panig-sa-static)
* [Ano ang mga umiiral na framework ng CSS na ginamit mo ng lokal, o kaya naman ay sa produksyon? Papaano mo babaguhin o mapapabuti ang mga ito?](#ano-ang-mga-umiiral-na-framework-ng-css-na-ginamit-mo-ng-lokal-o-kaya-naman-ay-sa-produksyon-papaano-mo-babaguhin-o-mapapabuti-ang-mga-ito)
* [Ikaw ba ay nakapaglaro na sa paligid ng bagong CSS Flexbox o Grid specs?](#ikaw-ba-ay-nakapaglaro-na-sa-paligid-ng-bagong-css-flexbox-o-grid-specs)
* [Maipapaliwanag mo ba ang kaibahan sa pagitan ng pag-code ng isang web site na tumutugon kumpara sa paggamit ng diskarteng mobile ang una?](#maipapaliwanag-mo-ba-ang-kaibahan-sa-pagitan-ng-pag-code-ng-isang-web-site-na-tumutugon-kumpara-sa-paggamit-ng-diskarteng-mobile-ang-una)
* [Sa anong paraan naiiba ang disenyo ng tumutugon mula sa disenyo ng umaangkop?](#sa-anong-paraan-naiiba-ang-disenyo-ng-tumutugon-mula-sa-disenyo-ng-umaangkop)
* [Ikaw ba ay nakagamit na ng mga grapikong retina? kung gayon, kelan at anu-anong mga teknik ang iyong ginamit?](#ikaw-ba-ay-nakagamit-na-ng-mga-grapikong-retina-kung-gayon-kelan-at-anu-anong-mga-teknik-ang-iyong-ginamit)
* [May kadahilanan ba na nais mong gamitin ang `translate()` kesa sa `absolute` na pag-poposisyon, o kabaliktaran? at bakit?](#may-kadahilanan-ba-na-nais-mong-gamitin-ang-translate-kesa-sa-absolute-na-pag-poposisyon-o-kabaliktaran-at-bakit)

### Ano ang pagsisigurado ng CSS selector at kung paano ito gumagana?

Tinutukoy ng browser kung anong mga estilo ang ipapakita sa isang elemento na nakadepende sa antsa ng pagka-episipik nga mga panuntunan ng CSS. Ipagpalagay natin na ang browser ay nakapagtukoy na ng mga panuntunan na tumutugma sa isang partikular na elemento. Kabilang sa panuntunan sa pagtutugma, Ang pagtitiyak, apat na kuwit ng hiwalay na mga halaga, `a, b, c, d` ay kalkulado sa bawat isang panuntunan na batay sa mga sumusunod:


1. `a` is whether inline styles are being used. If the property declaration is an inline style on the element, `a` is 1, else 0.
2. `b` is the number of ID selectors.
3. `c` is the number of classes, attributes and pseudo-classes selectors.
4. `d` is the number of tags and pseudo-elements selectors.

The resulting specificity is not a score, but a matrix of values that can be compared column by column. When comparing selectors to determine which has the highest specificity, look from left to right, and compare the highest value in each column. So a value in column `b` will override values in columns `c` and `d`, no matter what they might be. As such, specificity of `0,1,0,0` would be greater than one of `0,0,10,10`.

In the cases of equal specificity: the latest rule is the one that counts. If you have written the same rule into your style sheet (regardless of internal or external) twice, then the lower rule in your style sheet is closer to the element to be styled, it is deemed to be more specific and therefore will be applied.

I would write CSS rules with low specificity so that they can be easily overridden if necessary. When writing CSS UI component library code, it is important that they have low specificities so that users of the library can override them without using too complicated CSS rules just for the sake of increasing specificity or resorting to `!important`.

###### References

* https://www.smashingmagazine.com/2007/07/css-specificity-things-you-should-know/
* https://www.sitepoint.com/web-foundations/specificity/

[[↑] Back to top](#css-questions)

### Ano ang pagkakaiba sa pagitan ng "pag-reset" at "pag-normalize" ng CSS? saan sa dalawa ang iyong pipiliin, at bakit?

* **Resetting** - Resetting is meant to strip all default browser styling on elements. For e.g. `margin`s, `padding`s, `font-size`s of all elements are reset to be the same. You will have to redeclare styling for common typographic elements.
* **Normalizing** - Normalizing preserves useful default styles rather than "unstyling" everything. It also corrects bugs for common browser dependencies.

I would choose resetting when I have a very customized or unconventional site design such that I need to do a lot of my own styling and do not need any default styling to be preserved.

###### References

* https://stackoverflow.com/questions/6887336/what-is-the-difference-between-normalize-css-and-reset-css

[[↑] Back to top](#css-questions)

### Ilarawan ang mga `float` at kung paano sila gumagana.

Float is a CSS positioning property. Floated elements remain a part of the flow of the page, and will affect the positioning of other elements (e.g. text will flow around floated elements), unlike `position: absolute` elements, which are removed from the flow of the page.

The CSS `clear` property can be used to be positioned below `left`/`right`/`both` floated elements.

If a parent element contains nothing but floated elements, its height will be collapsed to nothing. It can be fixed by clearing the float after the floated elements in the container but before the close of the container.

The `.clearfix` hack uses a clever CSS pseudo selector (`:after`) to clear floats. Rather than setting the overflow on the parent, you apply an additional class `clearfix` to it. Then apply this CSS:

```css
.clearfix:after {
  content: ' ';
  visibility: hidden;
  display: block;
  height: 0;
  clear: both;
}
```

Alternatively, give `overflow: auto` or `overflow: hidden` property to the parent element which will establish a new block formatting context inside the children and it will expand to contain its children.

###### References

* https://css-tricks.com/all-about-floats/

[[↑] Back to top](#css-questions)

### Ilarawan ang z-index at kung papaano nabuo ang konteksto.

The `z-index` property in CSS controls the vertical stacking order of elements that overlap. `z-index` only affects elements that have a `position` value which is not `static`.

Without any `z-index` value, elements stack in the order that they appear in the DOM (the lowest one down at the same hierarchy level appears on top). Elements with non-static positioning (and their children) will always appear on top of elements with default static positioning, regardless of HTML hierarchy.

A stacking context is an element that contains a set of layers. Within a local stacking context, the `z-index` values of its children are set relative to that element rather than to the document root. Layers outside of that context — i.e. sibling elements of a local stacking context — can't sit between layers within it. If an element B sits on top of element A, a child element of element A, element C, can never be higher than element B even if element C has a higher `z-index` than element B.

Each stacking context is self-contained - after the element's contents are stacked, the whole element is considered in the stacking order of the parent stacking context. A handful of CSS properties trigger a new stacking context, such as `opacity` less than 1, `filter` that is not `none`, and `transform` that is not`none`.

###### References

* https://css-tricks.com/almanac/properties/z/z-index/
* https://philipwalton.com/articles/what-no-one-told-you-about-z-index/
* https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Positioning/Understanding_z_index/The_stacking_context

[[↑] Back to top](#css-questions)

### Ilarawan ang BFK (Block Formatting na Konteksto) at papaaano ito gumagana.

A Block Formatting Context (BFC) is part of the visual CSS rendering of a web page in which block boxes are laid out. Floats, absolutely positioned elements, `inline-blocks`, `table-cells`, `table-caption`s, and elements with `overflow` other than `visible` (except when that value has been propagated to the viewport) establish new block formatting contexts.

A BFC is an HTML box that satisfies at least one of the following conditions:

* The value of `float` is not `none`.
* The value of `position` is neither `static` nor `relative`.
* The value of `display` is `table-cell`, `table-caption`, `inline-block`, `flex`, or `inline-flex`.
* The value of `overflow` is not `visible`.

In a BFC, each box's left outer edge touches the left edge of the containing block (for right-to-left formatting, right edges touch).

Vertical margins between adjacent block-level boxes in a BFC collapse. Read more on [collapsing margins](https://www.sitepoint.com/web-foundations/collapsing-margins/).

###### References

* https://developer.mozilla.org/en-US/docs/Web/Guide/CSS/Block_formatting_context
* https://www.sitepoint.com/understanding-block-formatting-contexts-in-css/

[[↑] Back to top](#css-questions)

### Ano ang iba't ibang teknik ng paglilinis at kung ano ang nararapat sa kung ano ang konteksto?

* Empty `div` method - `<div style="clear:both;"></div>`.
* Clearfix method - Refer to the `.clearfix` class above.
* `overflow: auto` or `overflow: hidden` method - Parent will establish a new block formatting context and expand to contains its floated children.

In large projects, I would write a utility `.clearfix` class and use them in places where I need it. `overflow: hidden` might clip children if the children is taller than the parent and is not very ideal.

[[↑] Back to top](#css-questions)

### Ipaliwanag ang mga CSS na sprite, at papaano mo ipapatupad ang mga ito sa isang pahina o site.

CSS sprites combine multiple images into one single larger image. It is commonly used technique for icons (Gmail uses it). How to implement it:

1. Use a sprite generator that packs multiple images into one and generate the appropriate CSS for it.
1. Each image would have a corresponding CSS class with `background-image`, `background-position` and `background-size` properties defined.
1. To use that image, add the corresponding class to your element.

**Advantages:**

* Reduce the number of HTTP requests for multiple images (only one single request is required per spritesheet). But with HTTP2, loading multiple images is no longer much of an issue.
* Advance downloading of assets that won't be downloaded until needed, such as images that only appear upon `:hover` pseudo-states. Blinking wouldn't be seen.

###### References

* https://css-tricks.com/css-sprites/

[[↑] Back to top](#css-questions)

### Papaano mo didiskartehan ang pag-aayos ng mga ispisipik sa browser na pag-eestilo na isyu?

* After identifying the issue and the offending browser, use a separate style sheet that only loads when that specific browser is being used. This technique requires server-side rendering though.
* Use libraries like Bootstrap that already handles these styling issues for you.
* Use `autoprefixer` to automatically add vendor prefixes to your code.
* Use Reset CSS or Normalize.css.

[[↑] Back to top](#css-questions)

### Papaano mo inahahanda ang iyong mga pahina para sa mga browser na kulang sa tampok? Ano-ano ang mga teknik or proseso ang iyong ginagamit?

* Graceful degradation - The practice of building an application for modern browsers while ensuring it remains functional in older browsers.
* Progressive enhancement - The practice of building an application for a base level of user experience, but adding functional enhancements when a browser supports it.
* Use [caniuse.com](https://caniuse.com/) to check for feature support.
* Autoprefixer for automatic vendor prefix insertion.
* Feature detection using [Modernizr](https://modernizr.com/).

[[↑] Back to top](#css-questions)

### Ano-ano ang mga iba't ibang pamamaraan upang matago ang nakatagong nilalaman (at gawan ng paraan na ito ay magagamit lamang ng mga mambabasa ng iskrin)?

These techniques are related to accessibility (a11y).

* `visibility: hidden`. However the element is still in the flow of the page, and still takes up space.
* `width: 0; height: 0`. Make the element not take up any space on the screen at all, resulting in not showing it.
* `position: absolute; left: -99999px`. Position it outside of the screen.
* `text-indent: -9999px`. This only works on text within the `block` elements.
* Metadata. For example by using Schema.org, RDF and JSON-LD.
* WAI-ARIA. A W3C technical specification that specifies how to increase the accessibility of web pages.

Even if WAI-ARIA is the ideal solution, I would go with the `absolute` positioning approach, as it has the least caveats, works for most elements and it's an easy technique.

###### References

* https://www.w3.org/TR/wai-aria-1.1/
* https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA
* http://a11yproject.com/

[[↑] Back to top](#css-questions)

### Ikaw ba ay nakagamit kailanman ng sistemang grid?, at kung gayon, Ano ang iyong mas pipiliin?

I like the `float`-based grid system because it still has the most browser support among the alternative existing systems (flex, grid). It has been used in Bootstrap for years and has been proven to work.

[[↑] Back to top](#css-questions)

### Ikaw ba ay nakagamit oh nakapagpatupad na ng mga query sa mobile o mga layout na espisipik sa mobile/CSS?

Yes. An example would be transforming a stacked pill navigation into a fixed-bottom tab navigation beyond a certain breakpoint.

[[↑] Back to top](#css-questions)

### Ikaw ba ay pamilyar sa estilong SVG?

No... Sadly.

[[↑] Back to top](#css-questions)

### Makapagbibigay kaba ng halimbawa ng klase ng @media maliban sa iskrin?

TODO

[[↑] Back to top](#css-questions)

### Ano-ano ang ilan sa mga "pasabog" para sa epektibong pagsusulat ng CSS?

Firstly, understand that browsers match selectors from rightmost (key selector) to left. Browsers filter out elements in the DOM according to the key selector, and traverse up its parent elements to determine matches. The shorter the length of the selector chain, the faster the browser can determine if that element matches the selector. Hence avoid key selectors that are tag and universal selectors. They match a large numbers of elements and browsers will have to do more work in determining if the parents do match.

[BEM (Block Element Modifier)](https://bem.info/) methodology recommends that everything has a single class, and, where you need hierarchy, that gets baked into the name of the class as well, this naturally makes the selector efficient and easy to override.

Be aware of which CSS properties trigger reflow, repaint and compositing. Avoid writing styles that change the layout (trigger reflow) where possible.

###### References

* https://developers.google.com/web/fundamentals/performance/rendering/
* https://csstriggers.com/

[[↑] Back to top](#css-questions)

### Ano ang mga pakinabang o di-pakinabang ng paggamit ng mga preprocessors ng CSS?

**Advantages:**

* CSS is made more maintainable.
* Easy to write nested selectors.
* Variables for consistent theming. Can share theme files across different projects.
* Mixins to generate repeated CSS.
* Splitting your code into multiple files. CSS files can be split up too but doing so will require a HTTP request to download each CSS file.

**Disadvantages:**

* Requires tools for preprocessing. Re-compilation time can be slow.

[[↑] Back to top](#css-questions)

### Ilarawan kung ano ang iyong gusto at di gusto tungkol sa CSS na mga preprocessor na iyong nagamit.

**Likes:**

* Mostly the advantages mentioned above.
* Less is written in JavaScript, which plays well with Node.

**Dislikes:**

* I use Sass via `node-sass`, which is a binding for LibSass written in C++. I have to frequently recompile it when switching between node versions.
* In Less, variable names are prefixed with `@`, which can be confused with native CSS keywords like `@media`, `@import` and `@font-face` rule.

[[↑] Back to top](#css-questions)

### Papaano mo ipapatupad ang isang web design comp na gumagamit ng mga di pangkaraniwang font?

Use `@font-face` and define `font-family` for different `font-weight`s.

[[↑] Back to top](#css-questions)

### Ipaliwanag kung paano tinutukoy ng isang browser kung anu-anong mga elemento ang tumutugma sa tagapili ng CSS.

This part is related to the above about writing efficient CSS. Browsers match selectors from rightmost (key selector) to left. Browsers filter out elements in the DOM according to the key selector, and traverse up its parent elements to determine matches. The shorter the length of the selector chain, the faster the browser can determine if that element matches the selector.

For example with this selector `p span`, browsers firstly find all the `<span>` elements, and traverse up its parent all the way up to the root to find the `<p>` element. For a particular `<span>`, as soon as it finds a `<p>`, it knows that the `<span>` matches and can stop its matching.

###### References

* https://stackoverflow.com/questions/5797014/why-do-browsers-match-css-selectors-from-right-to-left

[[↑] Back to top](#css-questions)

### Ilarawan ang mga elementong pseudo at talakayin kung para saan ito gagamitin.

A CSS pseudo-element is a keyword added to a selector that lets you style a specific part of the selected element(s). They can be used for decoration (`:first-line`, `:first-letter`) or adding elements to the markup (combined with `content: ...`) without having to modify the markup (`:before`, `:after`).

* `:first-line` and `:first-letter` can be used to decorate text.
* Used in the `.clearfix` hack as shown above to add a zero-space element with `clear: both`.
* Triangular arrows in tooltips use `:before` and `:after`. Encourages separation of concerns because the triangle is considered part of styling and not really the DOM. It's not really possible to draw a triangle with just CSS styles without using an additional HTML element.

###### References

* https://css-tricks.com/almanac/selectors/a/after-and-before/

[[↑] Back to top](#css-questions)

### Ipaliwanag ang iyong pagkakaintindi sa modelong kahon at papaano mo pagsasabihan ang browser sa CSS na mag-render ng iyong layout sa iba't ibang modelo ng kahon.

The CSS box model describes the rectangular boxes that are generated for elements in the document tree and laid out according to the visual formatting model. Each box has a content area (e.g. text, an image, etc.) and optional surrounding `padding`, `border`, and `margin` areas.

The CSS box model is responsible for calculating:

* How much space a block element takes up.
* Whether or not borders and/or margins overlap, or collapse.
* A box's dimensions.

The box model has the following rules:

* The dimensions of a block element are calculated by `width`, `height`, `padding`, `border`s, and `margin`s.
* If no `height` is specified, a block element will be as high as the content it contains, plus `padding` (unless there are floats, for which see below).
* If no `width` is specified, a non-floated block element will expand to fit the width of its parent minus `padding`.
* The `height` of an element is calculated by the content's `height`.
* The `width` of an element is calculated by the content's `width`.
* By default, `padding`s and `border`s are not part of the `width` and `height` of an element.

###### References

* https://www.smashingmagazine.com/2010/06/the-principles-of-cross-browser-css-coding/#understand-the-css-box-model

[[↑] Back to top](#css-questions)

### Ano ang ginagawa ng `* { box-sizing: border-box; }`? Anu-ano ang mga pakinabang nito?

* By default, elements have `box-sizing: content-box` applied, and only the content size is being accounted for.
* `box-sizing: border-box` changes how the `width` and `height` of elements are being calculated, `border` and `padding` are also being included in the calculation.
* The `height` of an element is now calculated by the content's `height` + vertical `padding` + vertical `border` width.
* The `width` of an element is now calculated by the content's `width` + horizontal `padding` + horizontal `border` width.

[[↑] Back to top](#css-questions)

### Ano ang katangian ng CSS na `display` at pwede ka bang magbigay ng ilang mga halimbawa ng paggamit nito?

* `none`, `block`, `inline`, `inline-block`, `table`, `table-row`, `table-cell`, `list-item`.

TODO

[[↑] Back to top](#css-questions)

### Ano ang pagkakaiba sa pagitan ng `inline` at `inline-block`?

I shall throw in a comparison with `block` for good measure.

|                                      | `block`                                                                                     | `inline-block`                                                   | `inline`                                                                                                                                                                                                             |
| ------------------------------------ | ------------------------------------------------------------------------------------------- | ---------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Size                                 | Fills up the width of its parent container.                                                 | Depends on content.                                              | Depends on content.                                                                                                                                                                                                  |
| Positioning                          | Start on a new line and tolerates no HTML elements next to it (except when you add `float`) | Flows along with other content and allows other elements beside. | Flows along with other content and allows other elements beside.                                                                                                                                                     |
| Can specify `width` and `height`     | Yes                                                                                         | Yes                                                              | No. Will ignore if being set.                                                                                                                                                                                        |
| Can be aligned with `vertical-align` | No                                                                                          | Yes                                                              | Yes                                                                                                                                                                                                                  |
| Margins and paddings                 | All sides respected.                                                                        | All sides respected.                                             | Only horizontal sides respected. Vertical sides, if specified, do not affect layout. Vertical space it takes up depends on `line-height`, even though the `border` and `padding` appear visually around the content. |
| Float                                | -                                                                                           | -                                                                | Becomes like a `block` element where you can set vertical margins and paddings.                                                                                                                                      |

[[↑] Back to top](#css-questions)

### Ano ang pagkakaiba sa pagitan ng `relative`, `fixed`, `absolute` at elementong nakaposisyong panig sa `static`?

A positioned element is an element whose computed `position` property is either `relative`, `absolute`, `fixed` or `sticky`.

* `static` - The default position; the element will flow into the page as it normally would. The `top`, `right`, `bottom`, `left` and `z-index` properties do not apply.
* `relative` - The element's position is adjusted relative to itself, without changing layout (and thus leaving a gap for the element where it would have been had it not been positioned).
* `absolute` - The element is removed from the flow of the page and positioned at a specified position relative to its closest positioned ancestor if any, or otherwise relative to the initial containing block. Absolutely positioned boxes can have margins, and they do not collapse with any other margins. These elements do not affect the position of other elements.
* `fixed` - The element is removed from the flow of the page and positioned at a specified position relative to the viewport and doesn't move when scrolled.
* `sticky` - Sticky positioning is a hybrid of relative and fixed positioning. The element is treated as `relative` positioned until it crosses a specified threshold, at which point it is treated as `fixed` positioned.

###### References

* https://developer.mozilla.org/en/docs/Web/CSS/position

[[↑] Back to top](#css-questions)

### Ano ang mga umiiral na framework ng CSS na ginamit mo ng lokal, o kaya naman ay sa produksyon? Papaano mo babaguhin o mapapabuti ang mga ito?

* **Bootstrap** - Slow release cycle. Bootstrap 4 has been in alpha for almost 2 years. Add a spinner button component, as it is widely-used.
* **Semantic UI** - Source code structure makes theme customization extremely hard to understand. Painful to customize with unconventional theming system. Hardcoded config path within the vendor library. Not well-designed for overriding variables unlike in Bootstrap.
* **Bulma** - A lot of non-semantic and superfluous classes and markup required. Not backward compatible. Upgrading versions breaks the app in subtle manners.

[[↑] Back to top](#css-questions)

### Ikaw ba ay nakapaglaro na sa paligid ng bagong CSS Flexbox o Grid specs?

Yes. Flexbox is mainly meant for 1-dimensional layouts while Grid is meant for 2-dimensional layouts.

Flexbox solves many common problems in CSS, such as vertical centering of elements within a container, sticky footer, etc. Bootstrap and Bulma are based on Flexbox, and it is probably the recommended way to create layouts these days. Have tried Flexbox before but ran into some browser incompatibility issues (Safari) in using `flex-grow`, and I had to rewrite my code using `inline-blocks` and math to calculate the widths in percentages, it wasn't a nice experience.

Grid is by far the most intuitive approach for creating grid-based layouts (it better be!) but browser support is not wide at the moment.

###### References

* https://philipwalton.github.io/solved-by-flexbox/

[[↑] Back to top](#css-questions)

### Maipapaliwanag mo ba ang kaibahan sa pagitan ng Pag-code ng isang web site na tumutugon kumpara sa paggamit ng diskarteng mobile ang una?

TODO

[[↑] Back to top](#css-questions)

### Sa anong paraan naiiba ang disenyo ng tumutugon mula sa disenyo ng umaangkop?

Both responsive and adaptive design attempt to optimize the user experience across different devices, adjusting for different viewport sizes, resolutions, usage contexts, control mechanisms, and so on.

Responsive design works on the principle of flexibility - a single fluid website that can look good on any device. Responsive websites use media queries, flexible grids, and responsive images to create a user experience that flexes and changes based on a multitude of factors. Like a single ball growing or shrinking to fit through several different hoops.

Adaptive design is more like the modern definition of progressive enhancement. Instead of one flexible design, adaptive design detects the device and other features, and then provides the appropriate feature and layout based on a predefined set of viewport sizes and other characteristics. The site detects the type of device used, and delivers the pre-set layout for that device. Instead of a single ball going through several different-sized hoops, you'd have several different balls to use depending on the hoop size.

###### References

* https://developer.mozilla.org/en-US/docs/Archive/Apps/Design/UI_layout_basics/Responsive_design_versus_adaptive_design
* http://mediumwell.com/responsive-adaptive-mobile/
* https://css-tricks.com/the-difference-between-responsive-and-adaptive-design/

[[↑] Back to top](#css-questions)

### Ikaw ba ay nakagamit na ng mga grapikong retina? kung gayon, kelan at anu-anong mga teknik ang iyong ginamit?

I tend to use higher resolution graphics (twice the display size) to handle retina display. The better way would be to use a media query like `@media only screen and (min-device-pixel-ratio: 2) { ... }` and change the `background-image`.

For icons, I would also opt to use svgs and icon fonts where possible, as they render very crisply regardless of resolution.

Another method would be to use JavaScript to replace the `<img>` `src` attribute with higher resolution versions after checking the `window.devicePixelRatio` value.

###### References

* https://www.sitepoint.com/css-techniques-for-retina-displays/

[[↑] Back to top](#css-questions)

### May kadahilanan ba na nais mong gamitin ang `translate()` kesa sa `absolute` na pag-poposisyon, o kabaliktaran? at bakit?

`translate()` is a value of CSS `transform`. Changing `transform` or `opacity` does not trigger browser reflow or repaint, only compositions, whereas changing the absolute positioning triggers `reflow`. `transform` causes the browser to create a GPU layer for the element but changing absolute positioning properties uses the CPU. Hence `translate()` is more efficient and will result in shorter paint times for smoother animations.

When using `translate()`, the element still takes up its original space (sort of like `position: relative`), unlike in changing the absolute positioning.

###### References

* https://www.paulirish.com/2012/why-moving-elements-with-translate-is-better-than-posabs-topleft/

[[↑] Back to top](#css-questions)

### Other Answers

* https://neal.codes/blog/front-end-interview-css-questions
* https://quizlet.com/28293152/front-end-interview-questions-css-flash-cards/
* http://peterdoes.it/2015/12/03/a-personal-exercise-front-end-job-interview-questions-and-my-answers-all/
