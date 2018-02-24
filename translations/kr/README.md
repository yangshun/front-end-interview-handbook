<h1 align="center">프론트엔드 인터뷰 핸드북</h1>

<div align="center">
  <a href="https://dribbble.com/shots/4263961-Front-End-Interview-Scroll">
    <img src="https://cdn.rawgit.com/yangshun/front-end-interview-handbook/23d89c8/assets/scroll.svg" alt="Front End Interview Handbook" width="400"/>
    </a>
  <br>
  <p>
    <em>Credits: <a href="https://dribbble.com/shots/4263961-Front-End-Interview-Scroll">Illustration</a> by <a href="https://dribbble.com/yangheng">@yangheng</a>
    </em>
  </p>
  <p>
    <em>번역: <a href="https://github.com/ysm0622">@양성민</a>, <a href="https://github.com/devjang">@장현석</a>, <a href="https://github.com/tuhbm">@김태균</a>
    </em>
  </p>
</div>

## 서론

일반적인 소프트웨어 엔지니어 면접과 달리 프론트엔드 취업 면접은 알고리즘에 대한 강조가 적으며 프론트엔드 도메인에 대한 복잡한 지식과 전문 지식 (HTML, CSS, JavaScript)에 대해 더 많은 질문을 받습니다.

프론트엔드 개발자가 인터뷰를 준비하는 데 도움이 되는 기존 리소스가 있지만 소프트웨어 엔지니어 인터뷰 자료만큼 풍부하지는 않습니다. 기존 리소스 중에서 가장 유용한 질문은 [프론트엔드 개발자 인터뷰 질문](https://github.com/h5bp/Front-end-Developer-Interview-Questions) 일 것입니다. 안타깝게도, 저는 온라인에서 이 질문에 대한 완전하고 만족스러운 대답을 찾을 수 없었습니다. 그래서 여기에 이 질문에 대답하고자 합니다. 오픈 소스 저장소이기 때문에 이 프로젝트는 커뮤니티의 지원을 받아 커질 수 있을 것입니다.

## 일반적인 면접 준비

[면접 치트시트](https://github.com/yangshun/tech-interview-handbook/blob/master/preparing/cheatsheet.md)나 알고리즘과 같은 일반적인 코딩 면접에 대한 내용은 [기술 면접 핸드북](https://github.com/yangshun/tech-interview-handbook)이 도움이 될 것입니다.

## 목차

**[HTML 질문](#html-질문)**

-   [`DOCTYPE`은 무엇을 합니까?](#doctype은-무엇을-합니까)
-   [여러 언어로 되어 있는 콘텐츠의 페이지를 어떻게 제공하나요?](#여러-언어로-되어-있는-콘텐츠의-페이지를-어떻게-제공하나요)
-   [다국어 사이트를 디자인하거나 개발할 때 주의해야 할 사항은 무엇입니까?](#다국어-사이트를-디자인하거나-개발할-때-주의해야-할-사항은-무엇입니까)
-   [`data-`속성은 무엇에 좋은가요?](#data--속성은-무엇에-좋은가요)
-   [HTML5를 개방형 웹 플랫폼으로 간주합니다. HTML5의 구성 요소는 무엇입니까?](#html5를-개방형-웹-플랫폼으로-간주합니다-html5의-구성-요소는-무엇입니까)
-   [`cookie`, `sessionStorage`, `localStorage` 사이의 차이점을 설명하세요.](#cookie-sessionstorage-localstorage-사이의-차이점을-설명하세요)
-   [`<script>`, `<script async>`, `<script defer>` 사이의 차이점을 설명하세요.](#script-script-async-script-defer-사이의-차이점을-설명하세요)
-   [왜 일반적으로 CSS `<link>` 태그를 `<head></head>` 태그 사이에 위치시키고, JS `<script>` 태그를 `</body>` 직전에 위치시키는 것이 좋은 방법입니까? 다른 예외적인 상황을 알고있습니까?](#왜-일반적으로-css-link-태그를-headhead-태그-사이에-위치시키고-js-script-태그를-body-직전에-위치시키는-것이-좋은-방법입니까-다른-예외적인-상황을-알고있습니까)
-   [프로그레시브 렌더링이 무엇입니까?](#프로그레시브-렌더링이-무엇입니까)
-   [이미지 태그에 `srcset` 속성을 사용하는 이유는 무엇입니까? 이 속성의 컨텐츠를 평가할 때 브라우저가 사용하는 프로세스를 설명하세요.](#이미지-태그에-srcset-속성을-사용하는-이유는-무엇입니까-이-속성의-컨텐츠를-평가할-때-브라우저가-사용하는-프로세스를-설명하세요)
- [다른 HTML 템플릿 언어를 사용해본 적이 있습니까?](#다른-html-템플릿-언어를-사용해본-적이-있습니까)

**[CSS 질문](#css-질문)**

-   [CSS 선택자 특이성은 무엇이며 어떻게 작동합니까?](#css-선택자-특이성은-무엇이며-어떻게-작동합니까)
-   ["Resetting"과 "Normalizing" CSS의 차이점은 무엇입니까? 당신은 무엇을 선택할 것이며, 그 이유는 무엇입니까?](#resetting과-normalizing-css의-차이점은-무엇입니까-당신은-무엇을-선택할-것이며-그-이유는-무엇입니까)
-   [`float`이 어떻게 작동하는지 설명하세요.](#float이-어떻게-작동하는지-설명하세요)
-   [`z-index`와 쌓임 맥락(stacking context)이 어떻게 형성되는지 설명하세요.](#z-index와-쌓임-맥락stacking-context이-어떻게-형성되는지-설명하세요)
-   [블록 서식 문맥(BFC)과 작동 방식을 설명하세요.](#블록-서식-문맥bfc과-작동-방식을-설명하세요)
-   [What are the various clearing techniques and which is appropriate for what context?](#what-are-the-various-clearing-techniques-and-which-is-appropriate-for-what-context)
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

**[JS 질문](#js-질문)**

-   [이벤트 위임에 대해 설명하세요.](#이벤트-위임에-대해-설명하세요)
-   [`this`가 JavaScript에서 어떻게 작동하는지 설명하세요.](#this가-javascript에서-어떻게-작동하는지-설명하세요)
-   [프로토타입 상속이 어떻게 작동하는지 설명하세요.](#프로토타입-상속이-어떻게-작동하는지-설명하세요)
-   [AMD 대 CommonJS에 대해 어떻게 생각하십니까?](#amd-대-commonjs에-대해-어떻게-생각하십니까)
-   [다음 내용이 IIFE로 작동하지 않는 이유를 설명하세요: `function foo(){ }();`를 IIFE로 만들기 위해서는 무엇이 바뀌어야 할까요?](#다음-내용이-iife로-작동하지-않는-이유를-설명하세요-function-foo-를-iife로-만들기-위해서는-무엇이-바뀌어야-할까요)
-   [What's the difference between a variable that is: `null`, `undefined` or undeclared? How would you go about checking for any of these states?](#whats-the-difference-between-a-variable-that-is-null-undefined-or-undeclared-how-would-you-go-about-checking-for-any-of-these-states)
-   [What is a closure, and how/why would you use one?](#what-is-a-closure-and-howwhy-would-you-use-one)
-   [Can you describe the main difference between a `.forEach` loop and a `.map()` loop and why you would pick one versus the other?](#can-you-describe-the-main-difference-between-a-foreach-loop-and-a-map-loop-and-why-you-would-pick-one-versus-the-other)
-   [What's a typical use case for anonymous functions?](#whats-a-typical-use-case-for-anonymous-functions)
-   [How do you organize your code? (module pattern, classical inheritance?)](#how-do-you-organize-your-code-module-pattern-classical-inheritance)
-   [What's the difference between host objects and native objects?](#whats-the-difference-between-host-objects-and-native-objects)
-   [Difference between: function `Person(){}`, `var person = Person()`, and `var person = new Person()`?](#difference-between-function-person-var-person--person-and-var-person--new-person)
-   [What's the difference between `.call` and `.apply`?](#whats-the-difference-between-call-and-apply)
-   [Explain `Function.prototype.bind`.](#explain-functionprototypebind)
-   [When would you use `document.write()`?](#when-would-you-use-documentwrite)
-   [What's the difference between feature detection, feature inference, and using the UA string?](#whats-the-difference-between-feature-detection-feature-inference-and-using-the-ua-string)
-   [Explain Ajax in as much detail as possible.](#explain-ajax-in-as-much-detail-as-possible)
-   [What are the advantages and disadvantages of using Ajax?](#what-are-the-advantages-and-disadvantages-of-using-ajax)
-   [Explain how JSONP works (and how it's not really Ajax).](#explain-how-jsonp-works-and-how-its-not-really-ajax)
-   [Have you ever used JavaScript templating? If so, what libraries have you used?](#have-you-ever-used-javascript-templating-if-so-what-libraries-have-you-used)
-   [Explain "hoisting".](#explain-hoisting)
-   [Describe event bubbling.](#describe-event-bubbling)
-   [What's the difference between an "attribute" and a "property"?](#whats-the-difference-between-an-attribute-and-a-property)
-   [Why is extending built-in JavaScript objects not a good idea?](#why-is-extending-built-in-javascript-objects-not-a-good-idea)
-   [Difference between document `load` event and document `DOMContentLoaded` event?](#difference-between-document-load-event-and-document-domcontentloaded-event)
-   [What is the difference between `==` and `===`?](#what-is-the-difference-between--and-)
-   [Explain the same-origin policy with regards to JavaScript.](#explain-the-same-origin-policy-with-regards-to-javascript)
-   [Make this work: `duplicate([1,2,3,4,5]); // [1,2,3,4,5,1,2,3,4,5]`](#make-this-work)
-   [Why is it called a Ternary expression, what does the word "Ternary" indicate?](#why-is-it-called-a-ternary-expression-what-does-the-word-ternary-indicate)
-   [What is "use strict";? what are the advantages and disadvantages to using it?](#what-is-use-strict-what-are-the-advantages-and-disadvantages-to-using-it)
-   [Create a for loop that iterates up to 100 while outputting "fizz" at multiples of 3, "buzz" at multiples of 5 and "fizzbuzz" at multiples of 3 and 5](#create-a-for-loop-that-iterates-up-to-100-while-outputting-fizz-at-multiples-of-3-buzz-at-multiples-of-5-and-fizzbuzz-at-multiples-of-3-and-5)
-   [Why is it, in general, a good idea to leave the global scope of a website as-is and never touch it?](#why-is-it-in-general-a-good-idea-to-leave-the-global-scope-of-a-website-as-is-and-never-touch-it)
-   [Why would you use something like the `load` event? Does this event have disadvantages? Do you know any alternatives, and why would you use those?](#why-would-you-use-something-like-the-load-event-does-this-event-have-disadvantages-do-you-know-any-alternatives-and-why-would-you-use-those)
-   [Explain what a single page app is and how to make one SEO-friendly.](#explain-what-a-single-page-app-is-and-how-to-make-one-seo-friendly)
-   [What is the extent of your experience with Promises and/or their polyfills?](#what-is-the-extent-of-your-experience-with-promises-andor-their-polyfills)
-   [What are the pros and cons of using Promises instead of callbacks?](#what-are-the-pros-and-cons-of-using-promises-instead-of-callbacks)
-   [What are some of the advantages/disadvantages of writing JavaScript code in a language that compiles to JavaScript?](#what-are-some-of-the-advantagesdisadvantages-of-writing-javascript-code-in-a-language-that-compiles-to-javascript)
-   [What tools and techniques do you use debugging JavaScript code?](#what-tools-and-techniques-do-you-use-for-debugging-javascript-code)
-   [What language constructions do you use for iterating over object properties and array items?](#what-language-constructions-do-you-use-for-iterating-over-object-properties-and-array-items)
-   [Explain the difference between mutable and immutable objects.](#explain-the-difference-between-mutable-and-immutable-objects)
-   [Explain the difference between synchronous and asynchronous functions.](#explain-the-difference-between-synchronous-and-asynchronous-functions)
-   [What is event loop? What is the difference between call stack and task queue?](#what-is-event-loop-what-is-the-difference-between-call-stack-and-task-queue)
-   [Explain the differences on the usage of `foo` between `function foo() {}` and `var foo = function() {}`](#explain-the-differences-on-the-usage-of-foo-between-function-foo--and-var-foo--function-)
-   [What are the differences between variables created using `let`, `var` or `const`?](#what-are-the-differences-between-variables-created-using-let-var-or-const)
-   [What are the differences between ES6 class and ES5 function constructors?](#what-are-the-differences-between-es6-class-and-es5-function-constructors)
-   [Can you offer a use case for the new arrow => function syntax? How does this new syntax differ from other functions?](#can-you-offer-a-use-case-for-the-new-arrow--function-syntax-how-does-this-new-syntax-differ-from-other-functions)
-   [What advantage is there for using the arrow syntax for a method in a constructor?](#what-advantage-is-there-for-using-the-arrow-syntax-for-a-method-in-a-constructor)
-   [What is the definition of a higher-order function?](#what-is-the-definition-of-a-higher-order-function)
-   [Can you give an example for destructuring an object or an array?](#can-you-give-an-example-for-destructuring-an-object-or-an-array)
-   [ES6 Template Literals offer a lot of flexibility in generating strings, can you give an example?](#es6-template-literals-offer-a-lot-of-flexibility-in-generating-strings-can-you-give-an-example)
-   [Can you give an example of a curry function and why this syntax offers an advantage?](#can-you-give-an-example-of-a-curry-function-and-why-this-syntax-offers-an-advantage)
-   [What are the benefits of using spread syntax and how is it different from rest syntax?](#what-are-the-benefits-of-using-spread-syntax-and-how-is-it-different-from-rest-syntax)
-   [How can you share code between files?](#how-can-you-share-code-between-files)
-   [Why you might want to create static class members?](#why-you-might-want-to-create-static-class-members)

* * *

## HTML 질문

[프론트엔드 면접 질문 - HTML 질문](https://github.com/h5bp/Front-end-Developer-Interview-Questions#html-questions)에 대한 해설입니다.
Pull Request를 통한 제안 및 수정 요청을 환영합니다.

### `DOCTYPE`은 무엇을 합니까?

`DOCTYPE`은 “document type”의 약어입니다. 이것은 HTML에서 표준모드와 [쿼크모드](https://quirks.spec.whatwg.org/#history)를 구별하기 위해  선언합니다. 이것이 존재함으로써 웹페이지에서 표준모드로 렌더링하도록 브라우저에 지시합니다.

이야기의 교훈 - 당신의 페이지를 시작 부분에 `<!DOCTYPE html>` 추가하세요.

###### 참고자료

-   <https://stackoverflow.com/questions/7695044/what-does-doctype-html-do>
-   <https://www.w3.org/QA/Tips/Doctype>
-   <https://quirks.spec.whatwg.org/#history>

### 여러 언어로 되어 있는 콘텐츠의 페이지를 어떻게 제공하나요?

이 질문은 다소 모호합니다. 여러 언어로 제공된 콘텐츠로 페이지를 게재하는 방법이 가장 일반적인 경우이지만 페이지의 콘텐츠는 하나의 일관된 언어로만 표시해야 한다고 가정합니다.

HTTP를 서버에 요청하면 대개 요청하는 사용자 에이전트가 `Accept-Language` 헤더와 같은 언어 기본 설정에 대한 정보를 보냅니다. 그런 다음 서버는 이 정보를 사용하여 해당 언어가 사용 가능한 경우 해당 언어로 된 문서 버전을 반환할 수 있습니다. 반환된 HTML 문서는 `<html lang = "en"> ... </ html>`과 같이`<html>` 태그에 `lang` 속성을 선언해야 합니다.

백엔드에서 HTML 마크업에는 XML 또는 JSON 형식으로 저장된 특정 언어에 대한 `i18n` placeholder(빠져 있는 다른 것을 대신하는 기호나 텍스트의 일부) 및 내용이 포함됩니다. 그런 다음 서버는 일반적으로 백엔드 프레임워크의 도움을 받아 특정 언어로 된 콘텐츠로 HTML 페이지를 동적으로 생성합니다.

###### 참고자료

-   <https://www.w3.org/International/getting-started/language>

### 다국어 사이트를 디자인하거나 개발할 때 주의해야 할 사항은 무엇입니까?

-   HTML에서 `lang` 속성을 사용하세요.
-   사용자를 모국어로 안내합니다 - 사용자가 번거롭지 않게 국가 / 언어를 쉽게 변경할 수 있도록 합니다.
-   텍스트를 포함한 이미지를 사용하는 것은 확장가능한 접근이 아닙니다 - 이미지에 텍스트를 배치하는 것은 여전히 컴퓨터에서 보기 좋은 폰트(시스템 이외의)를 표시하는 인기 있는 방법입니다. 그러나 이미지 텍스트를 번역하려면 각 텍스트 문자열에 각 언어에 대해 만들어진 별도의 이미지가 있어야 합니다. 이와 같은 대체 방식이 늘어나면 재빠르게 제어할 수 없습니다
-   제한적 단어 / 문장 길이 - 일부 언어는 다른 언어로 작성될 때 더 길어질 수도 있습니다. 디자인에 레이아웃이나 오버 플로우 문제 발생에 주의하세요. 디자인에 필요한 텍스트의 양을 정하거나 디자인을 깰 수 있는 디자인은 하지 않도록 하는 것이 가장 좋습니다. 문자 수는 헤드라인, 레이블 및 버튼과 같은 항목에서 사용됩니다. 그것들은 본문의 텍스트나 코멘트와 같이 자유롭게 흐르는 텍스트에 대한 문제가 적습니다.
-   색상을 이해하는 방법에 유의하세요 - 색상은 언어와 문화에 따라 다르게 인식됩니다. 적절한 색상을 사용하여 디자인해야 합니다.
-   날짜 및 통화 서식 - 날짜는 때때로 다른 방식으로 제시됩니다. 예) 미국의 "May 31, 2012" vs 유럽의 "31 May 2012".
-   번역된 문자열을 연결하지 않습니다 - `"오늘의 날짜는 " + date + "입니다"` 와 같은 작업은 하지 마세요. 단어의 순서가 다른 언어로 인해 깨지게 됩니다. 대신 템플릿 매개 변수를 사용하세요.
-   언어를 읽는 방향 - 영어는 왼쪽에서 오른쪽으로 그리고 위에서 아래로 읽지만 일본어는 오른쪽에서 왼쪽으로 읽습니다.

###### 참고자료

-   <https://www.quora.com/What-kind-of-things-one-should-be-wary-of-when-designing-or-developing-for-multilingual-sites>

### `data-` 속성은 무엇에 좋은가요?

JavaScript 프레임워크가 인기를 끌기 전에 전에 프런트엔드 개발자는 비표준 속성, DOM의 추가 프로퍼티 등의 조작없이 DOM 자체 내에 추가 데이터를 저장하기 위해 `data-`속성을 사용했습니다. 이는 더 이상 적절한 속성이나 요소가 없는 페이지나 애플리케이션에 사용자 정의 데이터를 비공개로 저장하기 위한 것입니다.

요즘에는 `data-`속성을 사용하는 것을 권장하지 않습니다. 그 이유 중 하나는 사용자가 브라우저의 검사 요소를 사용하여 데이터 속성을 쉽게 수정할 수 있다는 것입니다. 데이터 모델은 JavaScript 자체에 더 잘 저장되며 라이브러리 또는 프레임워크의 데이터 바인딩을 통한 DOM으로 업데이트된 상태를 유지합니다.

###### 참고자료

-   <http://html5doctor.com/html5-custom-data-attributes/>
-   <https://www.w3.org/TR/html5/dom.html#embedding-custom-non-visible-data-with-the-data-*-attributes>

### HTML5를 개방형 웹 플랫폼으로 간주합니다 HTML5의 구성 요소는 무엇입니까?

-   의미론 - 콘텐츠를 보다 더 정확하게 설명할 수 있습니다.
-   연결 - 새롭고 혁신적인 방법으로 서버와 통신할 수 있습니다.
-   오프라인과 저장소(storage) - 웹 페이지가 데이터를 클라이언트 측에 로컬로 저장하여 오프라인에서보다 효율적으로 작동하도록 허용합니다.
-   멀티미디어 - 개방형 웹에서 비디오와 오디오 분야를 최고급으로 만들기
-   2D/3D 그래픽 및 효과 - 훨씬 다양한 프레젠테이션 옵션을 허용합니다.
-   성능 및 통합 - 속도 최적화 및 컴퓨터 하드웨어 개선으로 더 나은 사용을 제공합니다.
-   장치 접근 - 다양한 입출력 장치의 사용을 허용합니다.
-   스타일링 - 더 정교한 테마를 사용하게 합니다.

###### 참고자료

-   <https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/HTML5>

### `cookie`, `sessionStorage`, `localStorage` 사이의 차이점을 설명하세요.

세 가지 기술은 모두 클라이언트 측에서 중요한 값을 저장하는 매커니즘입니다. 모두 문자열로만 값을 저장할 수 있습니다.

|                       | `cookie`                                   | `localStorage` | `sessionStorage` |
| --------------------- | ------------------------------------------ | -------------- | ---------------- |
| 생성자                   | 클라이언트나 서버. 서버는 `Set-Cookie` 헤더를 사용할 수 있습니다 | 클라이언트          | 클라이언트            |
| 만료                    | 수동으로 설정                                    | 영구적            | 탭을 닫을 때          |
| 브라우저 세션 전체에서 지속       | 만료 설정 여부에 따라 다름                            | O              | X                |
| 도메인과 연관성              | O                                          | X              | X                |
| 모든 HTTP 요청과 함께 서버로 보냄 | 쿠키는 `Cookie` 헤더를 통해 자동 전송됨                 | X              | X                |
| 용량 (도메인당)             | 4kb                                        | 5MB            | 5MB              |
| 접근성                   | 모든 윈도우                                     | 모든 윈도우         | 같은 탭             |

###### 참고자료

-   <https://developer.mozilla.org/en-US/docs/Web/HTTP/Cookies>
-   <http://tutorial.techaltum.com/local-and-session-storage.html>

### `<script>`, `<script async>`, `<script defer>` 사이의 차이점을 설명하세요.

-   `<script>` - HTML 파싱이 중단되고 스크립트가 즉시 실행되며 스크립트 실행 후 HTML 파싱이 다시 시작됩니다.
-   `<script async>` - 이 스크립트는 HTML 파싱과 병행되어 사용 가능한 즉시 (HTML 파싱이 완료되기 전에) 실행됩니다. 스크립트가 페이지의 다른 스크립트(예: 분석)와 독립적인 경우 `async`를 사용하세요.
-   `<script defer>` - 이 스크립트는 HTML 파싱과 병행되지만 페이지 파싱이 끝나면 실행됩니다. 이 것이 여러개 있는 경우 각 스크립트는 페이지에 등장한 순서대로 실행됩니다. 스크립트가 완전히 파싱된 DOM에 의존하는 경우 `defer` 속성은 실행하기 전에 HTML 전부 파싱되도록 하는데 유용합니다. `<body>`의 끝부분에 평범한 `<script>`를 두는 것과 별 차이가 없습니다. `defer` 스크립트는 `document.write`를 포함하면 안됩니다.

주의: `src` 속성이 없는 스크립트에서는 `async` 와 `defer` 속성이 무시됩니다.

###### 참고자료

-   <http://www.growingwiththeweb.com/2014/02/async-vs-defer-attributes.html>
-   <https://stackoverflow.com/questions/10808109/script-tag-async-defer>
-   <https://bitsofco.de/async-vs-defer/>

### 왜 일반적으로 CSS `<link>` 태그를 `<head></head>` 태그 사이에 위치시키고, JS `<script>` 태그를 `</body>` 직전에 위치시키는 것이 좋은 방법입니까? 다른 예외적인 상황을 알고있습니까?

**`<head>` 안에 `<link>`를 넣는 이유**

`<link>`를 `<head>` 안에 넣는 것은 명세의 일부입니다. 그 외에도 상단에 배치하면 페이지가 점진적으로 렌더링되기 때문에 UX가 향상됩니다. 문서 맨 아래에 CSS를 두는 것은 Internet Explorer를 비롯한 많은 브라우저에서 점진적 렌더링을 금지시키는 것입니다. 몇몇 브라우저는 스타일이 변경되면 페이지의 요소를 다시 그리지 않아도 되도록 렌더링을 차단합니다. 사용자는 빈 하얀 페이지에서 멈추게 됩니다. 또한 스타일이 없는 내용이 잠깐 보이는 것을 방지합니다.

**`</body>` 직전에 `<script>`를 넣는 이유**

`<script>`는 다운로드되고 실행되는 동안 HTML 파싱을 차단합니다. 스크립트를 맨 아래에서 다운로드하면 HTML을 먼저 파싱하여 사용자에게 표시할 수 있습니다.

스크립트가 `document.write()` 를 포함할 때에는 `<script>` 를 아래쪽에 두는 것이 예외적일 수 있습니다만, 요즘은 `document.write()` 를 사용하지 않는 것이 좋습니다. 또한, `<script>`를 맨 아래에 두면 브라우저가 전체 문서가 파싱될 때까지 스크립트 다운로드를 시작할 수 없다는 것을 의미합니다. 유일한 해결책은 `<head>` 에 `<script>`를 넣고 `defer` 속성을 사용하는 것입니다.

###### 참고자료

-   <https://developer.yahoo.com/performance/rules.html#css_top>

### 프로그레시브 렌더링이 무엇입니까?

프로그레시브 렌더링이란 콘텐츠를 가능한 한 빨리 표시하기 위해 웹 페이지의 성능을 향상시키는 데 사용되는 기술입니다. (특히 인식되는 로딩 시간을 향상시킵니다)

예전에는 광대역 인터넷을 사용하기도 했지만 불안정한 모바일 데이터 연결이 점점 인기를 끌면서 최근 개발에 있어서도 여전히 유용합니다.

관련 기술 예:

- 이미지 레이지 로딩 - 페이지의 이미지를 한꺼번에 로딩하지 않습니다. JavaScript를 사용하면 사용자가 이미지를 표시하는 페이지 부분으로 스크롤 할 때 이미지를 로드 할 수 있습니다.
- 보이는 콘텐츠의 우선순위 설정 (또는 스크롤 없이 볼 수 있는 렌더링) - 가능한 한 빨리 표시하기 위해 사용자 브라우저에서 렌더링 될 페이지의 양에 필요한 최소한의 CSS / 콘텐츠 / 스크립트 만 포함하면 `deferred` 스크립트를 사용하거나 `DOMContentLoaded` / `load` 이벤트를 수신하여 다른 리소스와 내용을 로드 할 수 있습니다.
- 비동기 HTML 프래그먼트 - 페이지의 백엔드에서 HTML 페이지의 일부를 브라우저로 가져옵니다. 이 기술에 대한 자세한 내용은 [여기](http://www.ebaytechblog.com/2014/12/08/async-fragments-rediscovering-progressive-html-rendering-with-marko/)에서 찾을 수 있습니다.

### 이미지 태그에 `srcset` 속성을 사용하는 이유는 무엇입니까? 이 속성의 컨텐츠를 평가할 때 브라우저가 사용하는 프로세스를 설명하세요.

TODO

###### 참고자료

-   <https://stackoverflow.com/questions/33651166/what-is-progressive-rendering>
-   <http://www.ebaytechblog.com/2014/12/08/async-fragments-rediscovering-progressive-html-rendering-with-marko/>

### 다른 HTML 템플릿 언어를 사용해본 적이 있습니까?

네, Pug (formerly Jade), ERB, Slim, Handlebars, Jinja, Liquid 등이 있습니다. 필자의 견해로 그것들은 어느 정도 동일하고, 보여 줄 데이터를 조작하는 데 유용한 필터와 컨텐츠를 유출하는 유사한 기능을 제공한다. 대부분의 템플릿 엔진을 사용하면 표시 전에 맞춤 처리가 필요한 이벤트에 자신의 필터를 삽입 할 수도 있습니다.

### 기타 답변

-   <https://neal.codes/blog/front-end-interview-questions-html/>
-   <http://peterdoes.it/2015/12/03/a-personal-exercise-front-end-job-interview-questions-and-my-answers-all/>

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

### What are the various clearing techniques and which is appropriate for what context?

-   Empty `div` method - `<div style="clear:both;"></div>`.
-   Clearfix method - Refer to the `.clearfix` class above.
-   `overflow: auto` or `overflow: hidden` method - Parent will establish a new block formatting context and expand to contains its floated children.

In large projects, I would write a utility `.clearfix` class and use them in places where I need it. `overflow: hidden` might clip children if the children is taller than the parent and is not very ideal.

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

* * *

## JS 질문

[프론트엔드 면접 질문 - JS 질문](https://github.com/h5bp/Front-end-Developer-Interview-Questions#html-questions)에 대한 해설입니다.
Pull Request를 통한 제안 및 수정 요청을 환영합니다.

### 이벤트 위임에 대해 설명하세요.

이벤트 위임은 이벤트 리스너를 하위 요소에 추가하는 대신 상위 요소에 추가하는 기법입니다. 리스너는 DOM의 버블링된 이벤트로 인해 하위 요소에서 이벤트가 발생될 때마다 실행됩니다. 이 기술의 이점은 다음과 같습니다.

- 각 하위 항목에 이벤트 핸들러를 연결하지 않고 상위 요소에 하나의 단일 핸들러만 필요하기 때문에 메모리 사용 공간이 줄어 듭니다.
- 제거된 요소에서 핸들러를 해제하고 새 요소에 대해 이벤트를 바인딩할 필요가 없습니다.

###### 참고자료

-   <https://davidwalsh.name/event-delegate>
-   <https://stackoverflow.com/questions/1687296/what-is-dom-event-delegation>

### `this`가 JavaScript에서 어떻게 작동하는지 설명하세요.

`this`는 간단하게 설명하기 어렵습니다. JavaScript에서 가장 혼란스러운 개념 중 하나입니다. 대략 설명하면 `this`의 값은 함수가 호출되는 방식에 따라 달라집니다.
온라인에 많은 설명이 있는데 [Arnav Aggrawal](https://medium.com/@arnav_aggarwal)의 설명이 가장 명확했습니다.
다음 규칙과 같습니다.

1. 함수를 호출할 때 `new` 키워드를 사용하는 경우 함수 내부에 있는 `this`는 완전히 새로운 객체입니다.
2. `apply`, `call`, `bind`가 함수의 호출 / 작성에 사용되는 경우 함수 내의 `this`는 인수로 전달된 객체입니다.
3. `obj.method()`와 같이 함수를 메서드로 호출하는 경우 `this`는 함수가 프로퍼티인 객체입니다.
4. 함수가 자유함수로 호출되는 경우 즉 위의 조건없이 호출되는 경우 `this`는 전역 객체입니다. 브라우저에서는 `window` 객체입니다. 엄격 모드(`'use strict'`) 일 경우 `this`는 전역 객체 대신 `undefined`가 됩니다.
5. 위의 규칙 중 다수가 적용되면 더 높은 규칙이 승리하고 `this`값을 설정합니다.
6. 함수가 ES2015 화살표 함수인 경우 위의 모든 규칙을 무시하고 생성된 시점에서 주변 스코프의 `this`값을 받습니다.

상세한 설명은 [Medium의 글](https://codeburst.io/the-simple-rules-to-this-in-javascript-35d97f31bde3)를 참조하세요.

###### 참고자료

-   <https://codeburst.io/the-simple-rules-to-this-in-javascript-35d97f31bde3>
-   <https://stackoverflow.com/a/3127440/1751946>

### 프로토타입 상속이 어떻게 작동하는지 설명하세요.

이것은 매우 일반적인 JavaScript 인터뷰 질문입니다. 모든 JavaScript 객체는 다른 객체에 대한 참조인 `prototype` 프로퍼티를 가지고 있습니다. 객체의 프로퍼티에 접근할 때 해당 객체에 해당 프로퍼티가 없으면 JavaScript 엔진은 객체의 `prototype`과 `prototype`의 `prototype`등을 보고 프로퍼티가 정의될 때까지 찾고 만약 객체의 프로퍼티에 접근할 때 해당 객체에 해당 프로퍼티가 없으면 프로토타입 체인 중 하나에 있거나 프로토타입 체인의 끝에 도달 할 때까지 찾습니다. 이 동작은 고전적인 상속을 흉내내지만 실제로 [상속보다 위임](https://davidwalsh.name/javascript-objects)에 더 가깝습니다.

###### 참고자료

-   <https://www.quora.com/What-is-prototypal-inheritance/answer/Kyle-Simpson>
-   <https://davidwalsh.name/javascript-objects>

### AMD 대 CommonJS에 대해 어떻게 생각하십니까?

두 가지 모두 ES2015가 등장할 때까지 JavaScript에 기본적으로 존재하지 않는 모듈 시스템을 구현하는 방법입니다. CommonJS는 동기식인 반면 AMD (Asynchronous Module Definition - 비동기식 모듈 정의)는 분명히 비동기식입니다. CommonJS는 서버-사이드 개발을 염두에 두고 설계되었으며 AMD는 모듈의 비동기 로딩을 지원하므로 브라우저용으로 더 많이 사용됩니다.

AMD은 구문이 매우 장황하고 CommonJS은 다른 언어로 된 import 문을 작성하는 스타일에 더 가깝습니다. 대부분의 경우 AMD를 필요로 하지 않습니다. 모든 JavaScript를 연결된 하나의 번들 파일로 제공하면 비동기 로딩 속성의 이점을 누릴 수 없기 때문입니다. 또한 CommonJS 구문은 모듈 작성의 노드 스타일에 가깝고 클라이언트-사이드과 서버-사이드 JavaScript 개발 사이를 전환할 때 문맥 전환 오버 헤드가 적습니다.

ES2015 모듈이 동기식 및 비동기식 로딩을 모두 지원하는 것이 반가운 것은 마침내 하나의 접근 방식만 고수할 수 있다는 점입니다. 브라우저와 노드에서 완전히 작동되지는 않았지만 언제나 트랜스파일러를 사용하여 코드를 변환할 수 있습니다.

###### 참고자료

-   <https://auth0.com/blog/javascript-module-systems-showdown/>
-   <https://stackoverflow.com/questions/16521471/relation-between-commonjs-amd-and-requirejs>

### 다음 내용이 IIFE로 작동하지 않는 이유를 설명하세요: `function foo(){ }();`를 IIFE로 만들기 위해서는 무엇이 바뀌어야 할까요?

IIFE는 즉시 함수 호출 표현식을 의미합니다. JavaScript 파서는 `function foo(){ }();`을 `function foo(){ }`와 `();` 같이 읽습니다. 전자는 함수 선언이며 후자 ( 한 쌍의 괄호 )는 함수를 호출하려고 시도했지만 이름이 지정되지 않았기 때문에 `Uncaught SyntaxError : Unexpected token `)을 던집니다.

추가로 괄호를 추가하는 두 가지 방법이 있습니다: `(function foo(){ })()` 그리고 `(function foo(){ }())`.

JavaScript 파서는 `function foo () {} ();`를`function foo () {}`와 `();`로 읽습니다. 이러한 함수는 전역 스코프에서 노출되지 않으며 본문 내에서 자체를 참조할 필요가 없는 경우 해당 함수의 이름을 생략할 수도 있습니다.

###### 참고자료

-   <http://lucybain.com/blog/2014/immediately-invoked-function-expression/>

### What's the difference between a variable that is: `null`, `undefined` or undeclared? How would you go about checking for any of these states?

**Undeclared** variables are created when you assign to a value to an identifier that is not previously created using `var`, `let` or `const`. Undeclared variables will be defined globally, outside of the current scope. In strict mode, a `ReferenceError` will be thrown when you try to assign to an undeclared variable. Undeclared variables are bad just like how global variables are bad. Avoid them at all cost! To check for them, wrap its usage in a `try`/`catch` block.

```js
function foo() {
  x = 1; // Throws a ReferenceError in strict mode
}

foo();
console.log(x); // 1
```

A variable that is `undefined` is a variable that has been declared, but not assigned a value. It is of type `undefined`. If a function does not return any value as the result of executing it is assigned to a variable, the variable also has the value of `undefined`. To check for it, compare using the strict equality (`===`) operator or `typeof` which will give the `'undefined'` string. Note that you should not be using the abstract equality operator to check, as it will also return `true` if the value is `null`.

```js
var foo;
console.log(foo); // undefined
console.log(foo === undefined); // true
console.log(typeof foo === 'undefined'); // true

console.log(foo == null); // true. Wrong, don't use this to check!

function bar() {}
var baz = bar();
console.log(baz); // undefined
```

A variable that is `null` will have been explicitly assigned to the `null` value. It represents no value and is different from `undefined` in the sense that it has been explicitly assigned. To check for `null,` simply compare using the strict equality operator. Note that like the above, you should not be using the abstract equality operator (`==`) to check, as it will also return `true` if the value is `undefined`.

```js
var foo = null;
console.log(foo === null); // true

console.log(foo == undefined); // true. Wrong, don't use this to check!
```

As a personal habit, I never leave my variables undeclared or unassigned. I will explicitly assign `null` to them after declaring, if I don't intend to use it yet.

###### References

-   <https://stackoverflow.com/questions/15985875/effect-of-declared-and-undeclared-variables>
-   <https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/undefined>

### What is a closure, and how/why would you use one?

A closure is the combination of a function and the lexical environment within which that function was declared. The word "lexical" refers to the fact that lexical scoping uses the location where a variable is declared within the source code to determine where that variable is available. Closures are functions that have access to the outer (enclosing) function's variables—scope chain even after the outer function has returned.

**Why would you use one?**

-   Data privacy / emulating private methods with closures. Commonly used in the [module pattern](https://addyosmani.com/resources/essentialjsdesignpatterns/book/#modulepatternjavascript).
-   [Partial applications or currying](https://medium.com/javascript-scene/curry-or-partial-application-8150044c78b8#.l4b6l1i3x).

###### References

-   <https://developer.mozilla.org/en-US/docs/Web/JavaScript/Closures>
-   <https://medium.com/javascript-scene/master-the-javascript-interview-what-is-a-closure-b2f0d2152b36>

### Can you describe the main difference between a `.forEach` loop and a `.map()` loop and why you would pick one versus the other?

To understand the differences between the two, let's look at what each function does.

**`forEach`**

-   Iterates through the elements in an array.
-   Executes a callback for each element.
-   Does not return a value.

```js
const a = [1, 2, 3];
const doubled = a.forEach((num, index) => {
  // Do something with num and/or index.
});

// doubled = undefined
```

**`map`**

-   Iterates through the elements in an array.
-   "Maps" each element to a new element by calling the function on each element, creating a new array as a result.

```js
const a = [1, 2, 3];
const doubled = a.map(num => {
  return num * 2;
});

// doubled = [2, 4, 6]
```

The main difference between `.forEach` and `.map()` is that `.map()` returns a new array. If you need the result, but do not wish to mutate the original array, `.map()` is the clear choice. If you simply need to iterate over an array, `forEach` is a fine choice.

###### References

-   <https://codeburst.io/javascript-map-vs-foreach-f38111822c0f>

### What's a typical use case for anonymous functions?

They can be used in IIFEs to encapsulate some code within a local scope so that variables declared in it do not leak to the global scope.

```js
(function() {
  // Some code here.
})();
```

As a callback that is used once and does not need to be used anywhere else. The code will seem more self-contained and readable when handlers are defined right inside the code calling them, rather than having to search elsewhere to find the function body.

```js
setTimeout(function() {
  console.log('Hello world!');
}, 1000);
```

Arguments to functional programming constructs or Lodash (similar to callbacks).

```js
const arr = [1, 2, 3];
const double = arr.map(function(el) {
  return el * 2;
});
console.log(double); // [2, 4, 6]
```

###### References

-   <https://www.quora.com/What-is-a-typical-usecase-for-anonymous-functions>
-   <https://stackoverflow.com/questions/10273185/what-are-the-benefits-to-using-anonymous-functions-instead-of-named-functions-fo>

### How do you organize your code? (module pattern, classical inheritance?)

In the past, I used Backbone for my models which encourages a more OOP approach, creating Backbone models and attaching methods to them.

The module pattern is still great, but these days, I use the Flux architecture based on React/Redux which encourages a single-directional functional programming approach instead. I would represent my app's models using plain objects and write utility pure functions to manipulate these objects. State is manipulated using actions and reducers like in any other Redux application.

I avoid using classical inheritance where possible. When and if I do, I stick to [these rules](https://medium.com/@dan_abramov/how-to-use-classes-and-sleep-at-night-9af8de78ccb4).

### What's the difference between host objects and native objects?

Native objects are objects that are part of the JavaScript language defined by the ECMAScript specification, such as `String`, `Math`, `RegExp`, `Object`, `Function`, etc.

Host objects are provided by the runtime environment (browser or Node), such as `window`, `XMLHTTPRequest`, etc.

###### References

-   <https://stackoverflow.com/questions/7614317/what-is-the-difference-between-native-objects-and-host-objects>

### Difference between: `function Person(){}`, `var person = Person()`, and `var person = new Person()`?

This question is pretty vague. My best guess at its intention is that it is asking about constructors in JavaScript. Technically speaking, `function Person(){}` is just a normal function declaration. The convention is use PascalCase for functions that are intended to be used as constructors.

`var person = Person()` invokes the `Person` as a function, and not as a constructor. Invoking as such is a common mistake if it the function is intended to be used as a constructor. Typically, the constructor does not return anything, hence invoking the constructor like a normal function will return `undefined` and that gets assigned to the variable intended as the instance.

`var person = new Person()` creates an instance of the `Person` object using the `new` operator, which inherits from `Person.prototype`. An alternative would be to use `Object.create`, such as: `Object.create(Person.prototype)`.

```js
function Person(name) {
  this.name = name;
}

var person = Person('John');
console.log(person); // undefined
console.log(person.name); // Uncaught TypeError: Cannot read property 'name' of undefined

var person = new Person('John');
console.log(person); // Person { name: "John" }
console.log(person.name); // "john"
```

###### References

-   <https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/new>

### What's the difference between `.call` and `.apply`?

Both `.call` and `.apply` are used to invoke functions and the first parameter will be used as the value of `this` within the function. However, `.call` takes in a comma-separated arguments as the next arguments while `.apply` takes in an array of arguments as the next argument. An easy way to remember this is C for `call` and comma-separated and A for `apply` and array of arguments.

```js
function add(a, b) {
  return a + b;
}

console.log(add.call(null, 1, 2)); // 3
console.log(add.apply(null, [1, 2])); // 3
```

### Explain `Function.prototype.bind`.

Taken word-for-word from [MDN](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_objects/Function/bind):

> The `bind()` method creates a new function that, when called, has its this keyword set to the provided value, with a given sequence of arguments preceding any provided when the new function is called.

In my experience, it is most useful for binding the value of `this` in methods of classes that you want to pass into other functions. This is frequently done in React components.

###### References

-   <https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_objects/Function/bind>

### When would you use `document.write()`?

`document.write()` writes a string of text to a document stream opened by `document.open()`. When `document.write()` is executed after the page has loaded, it will call `document.open` which clears the whole document (`<head>` and `<body>` removed!) and replaces the contents with the given parameter value in string. Hence it is usually considered dangerous and prone to misuse.

There are some answers online that explain `document.write()` is being used in analytics code or [when you want to include styles that should only work if JavaScript is enabled](https://www.quirksmode.org/blog/archives/2005/06/three_javascrip_1.html). It is even being used in HTML5 boilerplate to [load scripts in parallel and preserve execution order](https://github.com/paulirish/html5-boilerplate/wiki/Script-Loading-Techniques#documentwrite-script-tag)! However, I suspect those reasons might be outdated and in the modern day, they can be achieved without using `document.write()`. Please do correct me if I'm wrong about this.

###### References

-   <https://www.quirksmode.org/blog/archives/2005/06/three_javascrip_1.html>
-   <https://github.com/h5bp/html5-boilerplate/wiki/Script-Loading-Techniques#documentwrite-script-tag>

### What's the difference between feature detection, feature inference, and using the UA string?

**Feature Detection**

Feature detection involves working out whether a browser supports a certain block of code, and running different code dependent on whether it does (or doesn't), so that the browser can always provide a working experience rather crashing/erroring in some browsers. For example:

```js
if ('geolocation' in navigator) {
  // Can use navigator.geolocation
} else {
  // Handle lack of feature
}
```

[Modernizr](https://modernizr.com/) is a great library to handle feature detection.

**Feature Inference**

Feature inference checks for a feature just like feature detection, but uses another function because it assumes it will also exist, e.g.:

```js
if (document.getElementsByTagName) {
  element = document.getElementById(id);
}
```

This is not really recommended. Feature detection is more foolproof.

**UA String**

This is a browser-reported string that allows the network protocol peers to identify the application type, operating system, software vendor or software version of the requesting software user agent. It can be accessed via `navigator.userAgent`. However, the string is tricky to parse and can be spoofed. For example, Chrome reports both as Chrome and Safari. So to detect Safari you have to check for the Safari string and the absence of the Chrome string. Avoid this method.

###### References

-   <https://developer.mozilla.org/en-US/docs/Learn/Tools_and_testing/Cross_browser_testing/Feature_detection>
-   <https://stackoverflow.com/questions/20104930/whats-the-difference-between-feature-detection-feature-inference-and-using-th>
-   <https://developer.mozilla.org/en-US/docs/Web/HTTP/Browser_detection_using_the_user_agent>

### Explain Ajax in as much detail as possible.

Ajax (asynchronous JavaScript and XML) is a set of web development techniques using many web technologies on the client side to create asynchronous web applications. With Ajax, web applications can send data to and retrieve from a server asynchronously (in the background) without interfering with the display and behavior of the existing page. By decoupling the data interchange layer from the presentation layer, Ajax allows for web pages, and by extension web applications, to change content dynamically without the need to reload the entire page. In practice, modern implementations commonly substitute JSON for XML due to the advantages of being native to JavaScript.

The `XMLHttpRequest` API is frequently used for the asynchronous communication or these days, the `fetch` API.

###### References

-   <https://en.wikipedia.org/wiki/Ajax_(programming>)
-   <https://developer.mozilla.org/en-US/docs/AJAX>

### What are the advantages and disadvantages of using Ajax?

**Advantages**

-   Better interactivity. New content from the server can be changed dynamically without the need to reload the entire page.
-   Reduce connections to the server since scripts and stylesheets only have to be requested once.
-   State can be maintained on a page. JavaScript variables and DOM state will persist because the main container page was not reloaded.
-   Basically most of the advantages of an SPA.

**Disadvantages**

-   Dynamic webpages are harder to bookmark.
-   Does not work if JavaScript has been disabled in the browser.
-   Some webcrawlers do not execute JavaScript and would not see content that has been loaded by JavaScript.
-   Basically most of the disadvantages of an SPA.

### Explain how JSONP works (and how it's not really Ajax).

JSONP (JSON with Padding) is a method commonly used to bypass the cross-domain policies in web browsers because Ajax requests from the current page to a cross-origin domain is not allowed.

JSONP works by making a request to a cross-origin domain via a `<script>` tag and usually with a `callback` query parameter, for example: `https://example.com?callback=printData`. The server will then wrap the data within a function called `printData` and return it to the client.

```html
<!-- https://mydomain.com -->
<script>
function printData(data) {
  console.log(`My name is ${data.name}!`);
}
</script>

<script src="https://example.com?callback=printData"></script>
```

```js
// File loaded from https://example.com?callback=printData
printData({ name: 'Yang Shun' });
```

The client has to have the `printData` function in its global scope and the function will be executed by the client when the response from the cross-origin domain is received.

JSONP can be unsafe and has some security implications. As JSONP is really JavaScript, it can do everything else JavaScript can do, so you need to trust the provider of the JSONP data.

These days, [CORS](http://en.wikipedia.org/wiki/Cross-origin_resource_sharing) is the recommended approach and JSONP is seen as a hack.

###### References

-   <https://stackoverflow.com/a/2067584/1751946>

### Have you ever used JavaScript templating? If so, what libraries have you used?

Yes. Handlebars, Underscore, Lodash, AngularJS and JSX. I disliked templating in AngularJS because it made heavy use of strings in the directives and typos would go uncaught. JSX is my new favourite as it is closer to JavaScript and there is barely any syntax to learn. Nowadays, you can even use ES2015 template string literals as a quick way for creating templates without relying on third-party code.

```js
const template = `<div>My name is: ${name}</div>`;
```

However, do be aware of a potential XSS in the above approach as the contents are not escaped for you, unlike in templating libraries.

### Explain "hoisting".

Hoisting is a term used to explain the behavior of variable declarations in your code. Variables declared or initialized with the `var` keyword will have their declaration "hoisted" up to the top of the current scope. However, only the declaration is hoisted, the assignment (if there is one), will stay where it is. Let's explain with a few examples.

```js
// var declarations are hoisted.
console.log(foo); // undefined
var foo = 1;
console.log(foo); // 1

// let/const declarations are NOT hoisted.
console.log(bar); // ReferenceError: bar is not defined
let bar = 2;
console.log(bar); // 2
```

Function declarations have the body hoisted while the function expressions (written in the form of variable declarations) only has the variable declaration hoisted.

```js
// Function Declaration
console.log(foo); // [Function: foo]
foo(); // 'FOOOOO'
function foo() {
  console.log('FOOOOO');
}
console.log(foo); // [Function: foo]

// Function Expression
console.log(bar); // undefined
bar(); // Uncaught TypeError: bar is not a function
var bar = function() {
  console.log('BARRRR');
};
console.log(bar); // [Function: bar]
```

### Describe event bubbling.

When an event triggers on a DOM element, it will attempt to handle the event if there is a listener attached, then the event is bubbled up to its parent and the same thing happens. This bubbling occurs up the element's ancestors all the way to the `document`. Event bubbling is the mechanism behind event delegation.

### What's the difference between an "attribute" and a "property"?

Attributes are defined on the HTML markup but properties are defined on the DOM. To illustrate the difference, imagine we have this text field in our HTML: `<input type="text" value="Hello">`.

```js
const input = document.querySelector('input');
console.log(input.getAttribute('value')); // Hello
console.log(input.value); // Hello
```

But after you change the value of the text field by adding "World!" to it, this becomes:

```js
console.log(input.getAttribute('value')); // Hello
console.log(input.value); // Hello World!
```

###### References

-   <https://stackoverflow.com/questions/6003819/properties-and-attributes-in-html>

### Why is extending built-in JavaScript objects not a good idea?

Extending a built-in/native JavaScript object means adding properties/functions to its `prototype`. While this may seem like a good idea at first, it is dangerous in practice. Imagine your code uses a few libraries that both extend the `Array.prototype` by adding the same `contains` method, the implementations will overwrite each other and your code will break if the behavior of these two methods are not the same.

The only time you may want to extend a native object is when you want to create a polyfill, essentially providing your own implementation for a method that is part of the JavaScript specification but might not exist in the user's browser due to it being an older browser.

###### References

-   <http://lucybain.com/blog/2014/js-extending-built-in-objects/>

### Difference between document `load` event and document `DOMContentLoaded` event?

The `DOMContentLoaded` event is fired when the initial HTML document has been completely loaded and parsed, without waiting for stylesheets, images, and subframes to finish loading.

`window`'s `load` event is only fired after the DOM and all dependent resources and assets have loaded.

###### References

-   <https://developer.mozilla.org/en-US/docs/Web/Events/DOMContentLoaded>
-   <https://developer.mozilla.org/en-US/docs/Web/Events/load>

### What is the difference between `==` and `===`?

`==` is the abstract equality operator while `===` is the strict equality operator. The `==` operator will compare for equality after doing any necessary type conversions. The `===` operator will not do type conversion, so if two values are not the same type `===` will simply return `false`. When using `==`, funky things can happen, such as:

```js
1 == '1'; // true
1 == [1]; // true
1 == true; // true
0 == ''; // true
0 == '0'; // true
0 == false; // true
```

My advice is never to use the `==` operator, except for convenience when comparing against `null` or `undefined`, where `a == null` will return `true` if `a` is `null` or `undefined`.

```js
var a = null;
console.log(a == null); // true
console.log(a == undefined); // true
```

###### References

-   <https://stackoverflow.com/questions/359494/which-equals-operator-vs-should-be-used-in-javascript-comparisons>

### Explain the same-origin policy with regards to JavaScript.

The same-origin policy prevents JavaScript from making requests across domain boundaries. An origin is defined as a combination of URI scheme, hostname, and port number. This policy prevents a malicious script on one page from obtaining access to sensitive data on another web page through that page's Document Object Model.

###### References

-   <https://en.wikipedia.org/wiki/Same-origin_policy>

### Make this work:

```js
duplicate([1, 2, 3, 4, 5]); // [1,2,3,4,5,1,2,3,4,5]
```

```js
function duplicate(arr) {
  return arr.concat(arr);
}

duplicate([1, 2, 3, 4, 5]); // [1,2,3,4,5,1,2,3,4,5]
```

### Why is it called a Ternary expression, what does the word "Ternary" indicate?

"Ternary" indicates three, and a ternary expression accepts three operands, the test condition, the "then" expression and the "else" expression. Ternary expressions are not specific to JavaScript and I'm not sure why it is even in this list.

###### References

-   <https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Operators/Conditional_Operator>

### What is `"use strict";`? What are the advantages and disadvantages to using it?

'use strict' is a statement used to enable strict mode to entire scripts or individual functions. Strict mode is a way to opt in to a restricted variant of JavaScript.

Advantages:

-   Makes it impossible to accidentally create global variables.
-   Makes assignments which would otherwise silently fail to throw an exception.
-   Makes attempts to delete undeletable properties throw (where before the attempt would simply have no effect).
-   Requires that function parameter names be unique.
-   `this` is undefined in the global context.
-   It catches some common coding bloopers, throwing exceptions.
-   It disables features that are confusing or poorly thought out.

Disadvantages:

-   Many missing features that some developers might be used to.
-   No more access to `function.caller` and `function.arguments`.
-   Concatenation of scripts written in different strict modes might cause issues.

Overall, I think the benefits outweigh the disadvantages, and I never had to rely on the features that strict mode blocks. I would recommend using strict mode.

###### References

-   <http://2ality.com/2011/10/strict-mode-hatred.html>
-   <http://lucybain.com/blog/2014/js-use-strict/>

### Create a for loop that iterates up to `100` while outputting **"fizz"** at multiples of `3`, **"buzz"** at multiples of `5` and **"fizzbuzz"** at multiples of `3` and `5`.

Check out this version of FizzBuzz by [Paul Irish](https://gist.github.com/jaysonrowe/1592432#gistcomment-790724).

```js
for (let i = 1; i <= 100; i++) {
  let f = i % 3 == 0,
    b = i % 5 == 0;
  console.log(f ? (b ? 'FizzBuzz' : 'Fizz') : b ? 'Buzz' : i);
}
```

I would not advise you to write the above during interviews though. Just stick with the long but clear approach. For more wacky versions of FizzBuzz, check out the reference link below.

###### References

-   <https://gist.github.com/jaysonrowe/1592432>

### Why is it, in general, a good idea to leave the global scope of a website as-is and never touch it?

Every script has access to the global scope, and if everyone is using the global namespace to define their own variables, there will bound to be collisions. Use the module pattern (IIFEs) to encapsulate your variables within a local namespace.

### Why would you use something like the `load` event? Does this event have disadvantages? Do you know any alternatives, and why would you use those?

The `load` event fires at the end of the document loading process. At this point, all of the objects in the document are in the DOM, and all the images, scripts, links and sub-frames have finished loading.

The DOM event `DOMContentLoaded` will fire after the DOM for the page has been constructed, but do not wait for other resources to finish loading. This is preferred in certain cases when you do not need the full page to be loaded before initializing.

TODO.

###### References

-   <https://developer.mozilla.org/en-US/docs/Web/API/GlobalEventHandlers/onload>

### Explain what a single page app is and how to make one SEO-friendly.

The below is taken from the awesome [Grab Front End Guide](https://github.com/grab/front-end-guide), which coincidentally, is written by me!

Web developers these days refer to the products they build as web apps, rather than websites. While there is no strict difference between the two terms, web apps tend to be highly interactive and dynamic, allowing the user to perform actions and receive a response for their action. Traditionally, the browser receives HTML from the server and renders it. When the user navigates to another URL, a full-page refresh is required and the server sends fresh new HTML for the new page. This is called server-side rendering.

However in modern SPAs, client-side rendering is used instead. The browser loads the initial page from the server, along with the scripts (frameworks, libraries, app code) and stylesheets required for the whole app. When the user navigates to other pages, a page refresh is not triggered. The URL of the page is updated via the [HTML5 History API](https://developer.mozilla.org/en-US/docs/Web/API/History_API). New data required for the new page, usually in JSON format, is retrieved by the browser via [AJAX](https://developer.mozilla.org/en-US/docs/AJAX/Getting_Started) requests to the server. The SPA then dynamically updates the page with the data via JavaScript, which it has already downloaded in the initial page load. This model is similar to how native mobile apps work.

The benefits:

-   The app feels more responsive and users do not see the flash between page navigations due to full-page refreshes.
-   Fewer HTTP requests are made to the server, as the same assets do not have to be downloaded again for each page load.
-   Clear separation of the concerns between the client and the server; you can easily build new clients for different platforms (e.g. mobile, chatbots, smart watches) without having to modify the server code. You can also modify the technology stack on the client and server independently, as long as the API contract is not broken.

The downsides:

-   Heavier initial page load due to loading of framework, app code, and assets required for multiple pages.
-   There's an additional step to be done on your server which is to configure it to route all requests to a single entry point and allow client-side routing to take over from there.
-   SPAs are reliant on JavaScript to render content, but not all search engines execute JavaScript during crawling, and they may see empty content on your page. This inadvertently hurts the Search Engine Optimization (SEO) of your app. However, most of the time, when you are building apps, SEO is not the most important factor, as not all the content needs to be indexable by search engines. To overcome this, you can either server-side render your app or use services such as [Prerender](https://prerender.io/) to "render your javascript in a browser, save the static HTML, and return that to the crawlers".

###### References

-   <https://github.com/grab/front-end-guide#single-page-apps-spas>
-   <http://stackoverflow.com/questions/21862054/single-page-app-advantages-and-disadvantages>
-   <http://blog.isquaredsoftware.com/presentations/2016-10-revolution-of-web-dev/>
-   <https://medium.freecodecamp.com/heres-why-client-side-rendering-won-46a349fadb52>

### What is the extent of your experience with Promises and/or their polyfills?

Possess working knowledge of it. A promise is an object that may produce a single value some time in the future: either a resolved value, or a reason that it's not resolved (e.g., a network error occurred). A promise may be in one of 3 possible states: fulfilled, rejected, or pending. Promise users can attach callbacks to handle the fulfilled value or the reason for rejection.

Some common polyfills are `$.deferred`, Q and Bluebird but not all of them comply to the specification. ES2015 supports Promises out of the box and polyfills are typically not needed these days.

###### References

-   <https://medium.com/javascript-scene/master-the-javascript-interview-what-is-a-promise-27fc71e77261>

### What are the pros and cons of using Promises instead of callbacks?

**Pros**

-   Avoid callback hell which can be unreadable.
-   Makes it easy to write sequential asynchronous code that is readable with `.then()`.
-   Makes it easy to write parallel asynchronous code with `Promise.all()`.

**Cons**

-   Slightly more complex code (debatable).
-   In older browsers where ES2015 is not supported, you need to load a polyfill in order to use it.

### What are some of the advantages/disadvantages of writing JavaScript code in a language that compiles to JavaScript?

Some examples of languages that compile to JavaScript include CoffeeScript, Elm, ClojureScript, PureScript and TypeScript.

Advantages:

-   Fixes some of the longstanding problems in JavaScript and discourages JavaScript anti-patterns.
-   Enables you to write shorter code, by providing some syntactic sugar on top of JavaScript, which I think ES5 lacks, but ES2015 is awesome.
-   Static types are awesome (in the case of TypeScript) for large projects that need to be maintained over time.

Disadvantages:

-   Require a build/compile process as browsers only run JavaScript and your code will need to be compiled into JavaScript before being served to browsers.
-   Debugging can be a pain if your source maps do not map nicely to your pre-compiled source.
-   Most developers are not familiar with these languages and will need to learn it. There's a ramp up cost involved for your team if you use it for your projects.
-   Smaller community (depends on the language), which means resources, tutorials, libraries and tooling would be harder to find.
-   IDE/editor support might be lacking.
-   These languages will always be behind the latest JavaScript standard.
-   Developers should be cognizant of what their code is being compiled to — because that is what would actually be running, and that is what matters in the end.

Practically, ES2015 has vastly improved JavaScript and made it much nicer to write. I don't really see the need for CoffeeScript these days.

###### References

-   <https://softwareengineering.stackexchange.com/questions/72569/what-are-the-pros-and-cons-of-coffeescript>

### What tools and techniques do you use for debugging JavaScript code?

-   React and Redux
    -   [React Devtools](https://github.com/facebook/react-devtools)
    -   [Redux Devtools](https://github.com/gaearon/redux-devtools)
-   JavaScript
    -   [Chrome Devtools](https://hackernoon.com/twelve-fancy-chrome-devtools-tips-dc1e39d10d9d)
    -   `debugger` statement
    -   Good old `console.log` debugging

###### References

-   <https://hackernoon.com/twelve-fancy-chrome-devtools-tips-dc1e39d10d9d>
-   <https://raygun.com/blog/javascript-debugging/>

### What language constructions do you use for iterating over object properties and array items?

For objects:

-   `for` loops - `for (var property in obj) { console.log(property); }`. However, this will also iterate through its inherited properties, and you will add an `obj.hasOwnProperty(property)` check before using it.
-   `Object.keys()` - `Object.keys(obj).forEach(function (property) { ... })`. `Object.keys()` is a static method that will lists all enumerable properties of the object that you pass it.
-   `Object.getOwnPropertyNames()` - `Object.getOwnPropertyNames(obj).forEach(function (property) { ... })`. `Object.getOwnPropertyNames()` is a static method that will lists all enumerable and non-enumerable properties of the object that you pass it.

For arrays:

-   `for` loops - `for (var i = 0; i < arr.length; i++)`. The common pitfall here is that `var` is in the function scope and not the block scope and most of the time you would want block scoped iterator variable. ES2015 introduces `let` which has block scope and it is recommended to use that instead. So this becomes: `for (let i = 0; i < arr.length; i++)`.
-   `forEach` - `arr.forEach(function (el, index) { ... })`. This construct can be more convenient at times because you do not have to use the `index` if all you need is the array elements. There are also the `every` and `some` methods which will allow you to terminate the iteration early.

Most of the time, I would prefer the `.forEach` method, but it really depends on what you are trying to do. `for` loops allow more flexibility, such as prematurely terminate the loop using `break` or incrementing the iterator more than once per loop.

### Explain the difference between mutable and immutable objects.

-   What is an example of an immutable object in JavaScript?
-   What are the pros and cons of immutability?
-   How can you achieve immutability in your own code?

TODO

### Explain the difference between synchronous and asynchronous functions.

Synchronous functions are blocking while asynchronous functions are not. In synchronous functions, statements complete before the next statement is run. In this case the program is evaluated exactly in order of the statements and execution of the program is paused if one of the statements take a very long time.

Asynchronous functions usually accept a callback as a parameter and execution continues on the next line immediately after the asynchronous function is invoked. The callback is only invoked when the asynchronous operation is complete and the call stack is empty. Heavy duty operations such as loading data from a web server or querying a database should be done asynchronously so that the main thread can continue executing other operations instead of blocking until that long operation to complete (in the case of browsers, the UI will freeze).

### What is event loop? What is the difference between call stack and task queue?

The event loop is a single-threaded loop that monitors the call stack and checks if there is any work to be done in the task queue. If the call stack is empty and there are callback functions in the task queue, a function is dequeued and pushed onto the call stack to be executed.

If you haven't already checked out Philip Robert's [talk on the Event Loop](https://2014.jsconf.eu/speakers/philip-roberts-what-the-heck-is-the-event-loop-anyway.html), you should. It is one of the most viewed videos on JavaScript.

###### References

-   <https://2014.jsconf.eu/speakers/philip-roberts-what-the-heck-is-the-event-loop-anyway.html>
-   <http://theproactiveprogrammer.com/javascript/the-javascript-event-loop-a-stack-and-a-queue/>

### Explain the differences on the usage of `foo` between `function foo() {}` and `var foo = function() {}`

The former is a function declaration while the latter is a function expression. The key difference is that function declarations have its body hoisted but the bodies of function expressions are not (they have the same hoisting behaviour as variables). For more explanation on hoisting, refer to the question above on hoisting. If you try to invoke a function expression before it is defined, you will get an `Uncaught TypeError: XXX is not a function` error.

**Function Declaration**

```js
foo(); // 'FOOOOO'
function foo() {
  console.log('FOOOOO');
}
```

**Function Expression**

```js
foo(); // Uncaught TypeError: foo is not a function
var foo = function() {
  console.log('FOOOOO');
};
```

###### References

-   <https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function>

### What are the differences between variables created using `let`, `var` or `const`?

Variables declared using the `var` keyword are scoped to the function in which they are created, or if created outside of any function, to the global object. `let` and `const` are _block scoped_, meaning they are only accessible within the nearest set of curly braces (function, if-else block, or for-loop).

```js
function foo() {
  // All variables are accessible within functions
  var bar = 'bar';
  let baz = 'baz';
  const qux = 'qux';

  console.log(bar); // "bar"
  console.log(baz); // "baz"
  console.log(qux); // "qux"
}

console.log(bar); // ReferenceError: bar is not defined
console.log(baz); // ReferenceError: baz is not defined
console.log(qux); // ReferenceError: qux is not defined

if (true) {
  var bar = 'bar';
  let baz = 'baz';
  const qux = 'qux';
}
// var declared variables are accessible anywhere in the function scope
console.log(bar); // "bar"
// let and const defined variables are not accessible outside of the block they were defined in
console.log(baz); // ReferenceError: baz is not defined
console.log(qux); // ReferenceError: qux is not defined
```

`var` allows variables to be hoisted, meaning they can be referenced in code before they are declared. `let` and `const` will not allow this, instead throwing an error.

```js
console.log(foo); // undefined

var foo = 'foo';

console.log(baz); // ReferenceError: can't access lexical declaration `baz' before initialization

let baz = 'baz';

console.log(bar); // ReferenceError: can't access lexical declaration `bar' before initialization

const bar = 'bar';
```

Redeclaring a variable with `var` will not throw an error, but 'let' and 'const' will.

```js
var foo = 'foo';
var foo = 'bar';
console.log(foo); // "bar"

let baz = 'baz';
let baz = 'qux'; // SyntaxError: redeclaration of let baz
```

`let` and `const` differ in that `let` allows reassigning the variable's value while `const` does not.

```js
// this is fine
let foo = 'foo';
foo = 'bar';

// this causes an exception
const baz = 'baz';
baz = 'qux';
```

###### References

-   <https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/let>
-   <https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/var>
-   <https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/const>

### What are the differences between ES6 class and ES5 function constructors?

TODO

### Can you offer a use case for the new arrow => function syntax? How does this new syntax differ from other functions?

TODO

### What advantage is there for using the arrow syntax for a method in a constructor?

TODO

### What is the definition of a higher-order function?

A higher-order function is any function that takes another function as a parameter, which it uses to operate on some data, or returns a function as a result. Higher-order functions are meant to abstract some operation that is performed repeatedly. The classic example of this is `map`, which takes an array and a function as arguments. `map` then uses this function to transform each item in the array, returning a new array with the transformed data. Other popular examples in JavaScript are `forEach`, `filter`, and `reduce`. A higher-order function doesn't just need to be manipulating arrays as there are many use cases for returning a function from another function. `Array.prototype.bind` is one such example in JavaScript.

##### Map

Let say we have an array of names which we need to transform each element to uppercase string.

`const names = ['irish', 'daisy', 'anna']`;

The imperative way will be like:

```js
const transformNamesToUppercase = names => {
  const results = [];
  for (let i = 0; i < names.length; i++) {
    results.push(names[i].toUpperCase());
  }
  return results;
};
transformNamesToUppercase(names); // ['IRISH', 'DAISY', 'ANNA']
```

Use `.map(transformerFn)` to become more simplified, easy to reason about and declarative.

```js
const transformNamesToUppercase = names =>
  names.map(name => name.toUpperCase());
transformNamesToUppercase(names); // ['IRISH', 'DAISY', 'ANNA']
```

##### Filter

We want to filter all names which their initial character starts with **i**.

The imperative way will be like:

```js
const filterNames = names => {
  const results = [];
  for (let i = 0; i < names.length; i++) {
    const name = names[i];
    if (name.startsWith('i')) {
      results.push(name);
    }
  }
  return results;
};
filterNames(names); // ['IRISH']
```

Instead using `for loop`, use `.filter(predicateFn)` to look more declarative.

```js
const filterNames = names => names.filter(name => name.startsWith('i'));
filterNames(names); // ['IRISH']
```

##### Reduce

Sum all the values of an array

`const numbers = [1,2,3,4,5];`

Imperative way:

```js
const sumOfNumbers = numbers => {
  let sum = 0;
  for (let i = 0; i < numbers.length; i++) {
    sum += numbers[i];
  }
  return sum;
};
sumOfNumbers(numbers); // 15
```

More declarative using `.reduce(reducerFn)`:

```js
const sumOfNumbers = numbers =>
  numbers.reduce((total, number) => (total += number), 0);
sumOfNumbers(numbers); // 15
```

Use **higher-order function** to make your code easy to reason about and improve the quality of your code. This became your code more **declarative** instead imperative, say **what you want done** not **how to do it**.

###### References

-   <https://medium.com/javascript-scene/higher-order-functions-composing-software-5365cf2cbe99>
-   <https://hackernoon.com/effective-functional-javascript-first-class-and-higher-order-functions-713fde8df50a>
-   <https://eloquentjavascript.net/05_higher_order.html>

### Can you give an example for destructuring an object or an array?

TODO

### ES6 Template Literals offer a lot of flexibility in generating strings, can you give an example?

TODO

### Can you give an example of a curry function and why this syntax offers an advantage?

Currying is a pattern where a function with more than one parameter is broken into multiple functions that, when called in series, will accumulate all of the required parameters one at a time. This technique can be useful for making code written in a functional style easier to read and compose. It's important to note that for a function to be curried, it needs to start out as one function, then broken out into a sequence of functions that each take one parameter.

```js
function curry(fn) {
  if (fn.length === 0) {
    return fn;
  }

  function _curried(depth, args) {
    return function(newArgument) {
      if (depth - 1 === 0) {
        return fn(...args, newArgument);
      }
      return _curried(depth - 1, [...args, newArgument]);
    };
  }

  return _curried(fn.length, []);
}

function add(a, b) {
  return a + b;
}

var curriedAdd = curry(add);
var addFive = curriedAdd(5);

var result = [0, 1, 2, 3, 4, 5].map(addFive); // [5, 6, 7, 8, 9, 10]
```

###### References

-   <https://hackernoon.com/currying-in-js-d9ddc64f162e>

### What are the benefits of using spread syntax and how is it different from rest syntax?

ES6's spread syntax is very useful when coding in a functional paradigm as we can easily create copies of arrays or objects without resorting to `Object.create`, `slice`, or a library function. This language feature gets a lot of use in projects using Redux or RX.js.

```js
function putDookieInAnyArray(arr) {
  return [...arr, 'dookie'];
}

var result = putDookieInAnyArray(['I', 'really', "don't", 'like']); // ["I", "really", "don't", "like", "dookie"]

var person = {
  name: 'Todd',
  age: 29,
};

var copyOfTodd = { ...person };
```

ES6's rest syntax offers a shorthand for including an arbitrary number of arguments to be passed to a function. It is like an inverse of the spread syntax, taking data and stuffing it into an array rather than upacking an array of data, but it only works in function arguments.

```js
function addFiveToABunchOfNumbers(...numbers) {
  return numbers.map(x => x + 5);
}

var result = addFiveToABunchOfNumbers(4, 5, 6, 7, 8, 9, 10); // [9, 10, 11, 12, 13, 14, 15]
```

###### References

-   <https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax>
-   <https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/rest_parameters>

### How can you share code between files?

TODO

### Why you might want to create static class members?

TODO

### Other Answers

-   <http://flowerszhong.github.io/2013/11/20/javascript-questions.html>

## Related

If you are interested in how data structures are implemented, check out [Lago](https://github.com/yangshun/lago), a Data Structures and Algorithms library for JavaScript. It is pretty much still WIP but I intend to make it into a library that is able to be used in production and also a reference resource for revising Data Structures and Algorithms.

## Contributing

Feel free to make pull requests to correct any mistakes in the answers or suggest new questions.
