# CSS 질문

-   [CSS 선택자 특이성은 무엇이며 어떻게 작동합니까?](#css-선택자-특이성은-무엇이며-어떻게-작동합니까)
-   ["Resetting"과 "Normalizing" CSS의 차이점은 무엇입니까? 당신은 무엇을 선택할 것이며, 그 이유는 무엇입니까?](#resetting과-normalizing-css의-차이점은-무엇입니까-당신은-무엇을-선택할-것이며-그-이유는-무엇입니까)
-   [`float`이 어떻게 작동하는지 설명하세요.](#float이-어떻게-작동하는지-설명하세요)
-   [`z-index`와 쌓임 맥락(stacking context)이 어떻게 형성되는지 설명하세요.](#z-index와-쌓임-맥락stacking-context이-어떻게-형성되는지-설명하세요)
-   [블록 서식 문맥(BFC)과 작동 방식을 설명하세요.](#블록-서식-문맥bfc과-작동-방식을-설명하세요)
-   [clear하는 방법에는 어떤 것이 있으며, 각각 어떤상황에 적합합니까?](#clear하는-방법에는-어떤-것이-있으며-각각-어떤상황에-적합합니까)
-   [CSS 스프라이트는 무엇입니까? 그리고 당신이 페이지 나 사이트에 구현하는 방법도 설명해주세요.](#CSS-스프라이트는-무엇입니까-그리고-당신이-페이지나-사이트에-구현하는-방법도-설명해주세요)
-   [브라우저 별 스타일링 문제를 해결하는 방법에 대해 어떻게 생각하십니까?](#브라우저-별-스타일링-문제를-해결하는-방법에-대해-어떻게-생각하십니까)
-   [기능이 제한된 브라우저의 페이지는 어떻게 처리합니까? 어떤 기술/프로세스를 사용하십니까?](#기능이-제한된-브라우저의-페이지는-어떻게-처리합니까-어떤-기술-프로세스를-사용하십니까)
-   [콘텐츠를 시각적으로 숨기고(화면 판독기에서만 사용할 수 있게 만드는)다양한 방법은 무엇입니까?](#콘텐츠를-시각적으로-숨기고-화면-판독기에서만-사용할-수-있게-만드는-다양한-방법은-무엇입니까)
-   [혹시 그리드 시스템을 사용하나요? 만약 그렇다면, 당신은 어떤것을 선호합니까?](#혹시-그리드-시스템을-사용하나요-만약-그렇다면-당신은-어떤것을-선호합니까)
-   [미디어 쿼리 또는 모바일 관련 layouts/CSS를 사용하거나 구현해 보았습니까?](#미디어-쿼리-또는-모바일-관련-layouts-CSS를-사용하거나-구현해-보았습니까)
-   [SVG-스타일링에-익숙하십니까?](#SVG-스타일링에-익숙하십니까)
-   [screen이 아닌 @media 속성의 예를 들려 줄 수 있습니까?](#screen이-아닌-@media-속성의-예를-들려-줄-수-있습니까)
-   [효율적인 CSS를 작성하는데 있어 "어려움"은 무엇입니까?](#효율적인-CSS를-작성하는데-있어-"어려움"은-무엇입니까)
-   [CSS 전처리기를 사용하면 어떤 장단점이 있습니까?](#CSS-전처리기를-사용하면-어떤-장단점이-있습니까)
-   [사용했던 CSS 전처리기에 대해 좋아하는 것과 싫어하는 것을 설명하십시오.](#사용했던-CSS-전처리기에-대해-좋아하는-것과-싫어하는-것을-설명하십시오)
-   [비표준 글꼴을 사용하는 웹 디자인 디자인을 구현하는 방법은 무엇입니까?](#비표준-글꼴을-사용하는-웹-디자인-디자인을-구현하는-방법은-무엇입니까)
-   [CSS 셀렉터에 일치하는 요소가 어떤 것인지 브라우저가 어떻게 결정되는지를 설명하시오.](#CSS-셀렉터에-일치하는-요소가-어떤-것인지-브라우저가-어떻게-결정되는지를-설명하시오)
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

-   비어있는 `div` 방법 - `<div style="clear:both;"></div>`
-   Clearfix 방법 - 이와 같은 `.clearfix` 클래스를 참조하세요.
-   `overflow: auto` 또는 `overflow: hidden` 방법 - 부모는 새로운 블록 서식 지정 컨텍스트를 설정하고, 확장 된 자식을 포함하도록합니다.

대규모의 프로젝트에서는 유용하게 `.clearfix` 클래스를 만들어 필요한 곳에서 사용합니다. 자식이 부모보다 크기가 경우 `overflow: hidden`은 자식의 모두 보여줄 수 없습니다.

### CSS 스프라이트는 무엇입니까? 그리고 당신이 페이지 나 사이트에 구현하는 방법도 설명해주세요.

CSS 스프라이트는 여러 이미지를 하나의 큰 이미지로 결합합니다. 일반적으로 아이콘에 사용되는 기술(Gmail에서 사용)입니다. 구현방법:

1. 스프라이트 생성기를 사용하여 여러 이미지를 하나로 묶어 적절한 CSS를 생성합니다.
2. 각 이미지는`background-image`,`background-position` 및`background-size` 속성이 정의 된 해당 CSS 클래스를 갖습니다.
3. 해당 이미지를 사용하려면 요소에 해당 클래스를 추가하십시오.

**장점:**
-   여러 이미지에 대한 HTTP 요청 수 줄이기(스프라이트 시트 당 하나의 단일 요청 만 필요합니다.) 그러나 HTTP2를 사용하면 여러 이미지를로드하는 것이 더 이상 중요하지 않습니다.
-   `: hover`의 상태에서만 나타나는 이미지가 필요할 때 다운로드되지 않는 이미지를 미리 다운로드하여 깜박임이 보이지 않습니다.

###### 참고 자료

-   <https://css-tricks.com/css-sprites/>

### 브라우저 별 스타일링 문제를 해결하는 방법에 대해 어떻게 생각하십니까?

-   문제 및 문제를 일으키는 브라우저를 식별한 후에는 해당 브라우저가 사용 중일 때만 로드되는 별도의 스타일 시트를 사용하십시오. 하지만 이 기술을 사용하려면 서버 측 렌더링이 필요합니다.
-   이미 이러한 스타일링 문제를 처리하고 있는 Bootstrap과 같은 라이브러리를 사용하십시오.
-   `autoprefixer`를 사용하여 벤더 프리픽스를 코드에 자동으로 추가하십시오.
-   Reset CSS 또는 Normalize.css를 사용합니다.

### 기능이 제한된 브라우저의 페이지는 어떻게 처리합니까? 어떤 기술/프로세스를 사용하십니까?

-   우아한 퇴화 - 최신 브라우저를 위한 응용 프로그램을 구축하는 동시에 그것이 구형 브라우저에서도 계속 작동하도록 하는 구축방법.
-   점진적 향상 - 기본 수준의 사용자 환경에 대한 응용 프로그램을 구축하지만 브라우저가 이를 지원할 경우 기능을 강화하는 방법이 있습니다.
-   [caniuse.com](https://caniuse.com/)을 사용하여 기능 지원을 확인하십시오.
-   자동 공급 프리픽스인 Autoprefixer 삽입.
-   [Modernizr](https://modernizr.com/)를 사용하여 미래 간파.

### 콘텐츠를 시각적으로 숨기고(화면 판독기에서만 사용할 수 있게 만드는)다양한 방법은 무엇입니까?

이러한 기술은 접근성 (a11y)에 관련이 있습니다.

-   `visibility: hidden`. 그러나 요소는 아직 페이지의 흐름에 여전히 공간을 차지하고 있습니다.
-   `width: 0; height: 0`. 요소가 화면의 어떤 공간도 차지하지 않도록하십시오. 결과적으로 보이지 않습니다.
-   `position: absolute; left: -99999px`. 화면 외부에 배치합니다.
-   `text-indent: -9999px`. 이것은 `block`인 엘리먼트 내의 텍스트에서만 작동합니다.
-   메타 데이터. 예를 들어, Schema.org, RDF 및 JSON-LD를 사용합니다.
-   WAI-ARIA. 웹 페이지의 액세스 가능성을 높이는 방법을 지정하는 W3C 기술 사양입니다.

WAI-ARIA가 이상적인 해결책이라 하더라도, 저는 `absolute` 접근법을 택할 것입니다. 대부분요소에 적용되고, 쉽고 주의해야할 것이 가장 적습니다.

###### 참고자료

-   <https://www.w3.org/TR/wai-aria-1.1/>
-   <https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA>
-   <http://a11yproject.com/>

### 혹시 그리드 시스템을 사용하나요? 만약 그렇다면, 당신은 어떤것을 선호합니까?

나는 `float` 기반 그리드 시스템을 좋아한다. 왜냐하면 여전히 기존의 다른 시스템들(flex, grid) 중에서도 가장 많은 브라우저를 지원하기 때문입니다. 이것은 부트 스트랩에서 수년 동안 사용되었으며, 효과가 있다는 것이 입증되었습니다.

### 미디어 쿼리 또는 모바일 관련 layouts/CSS를 사용하거나 구현해 보았습니까?

네. 한가지 예를 들면 여러 줄 형식의 네비게이션을 중간시점이 지나면 텝의 형태로 변환하였습니다.

### SVG 스타일링에 익숙하십니까?

슬프게도 아니요...

### screen이 아닌 @media 속성의 예를 들려 줄 수 있습니까?

예, @ media 속성을 screen포함하여 4 가지 종류가 있습니다. :

-   all - for all media type devices
-   print - for printers
-   speech - for screenreaders that "reads"the page out loud
-   screen - for computer screens, tablets, smart-phones etc.
-   print 미디어 유형의 사용 예제 :

```css
@media  print {
   body {
     color : black ;
  }
}
```

### 효율적인 CSS를 작성하는데 있어 "어려움"은 무엇입니까?

먼저 브라우저는 오른쪽선택자에서 왼쪽으로 선택자가 일치하는지 확인합니다. 브라우저는 선택자에 따라 DOM의 요소를 필터링하고 해당 부모요소가 일치하는지 식별합니다. 선택자 체인의 길이가 짧을수록 브라우저는 해당 요소가 선택자와 일치하는지 여부를 빠르게 판별할 수 있습니다. 따라서 태그선택자와 보편적인 선택자자를 사용하지마세요. 그것들은 다수의 요소가 브라우저와 매치되기 때문에 부모가 일치하는지 여부를 판단하기 위해 많은 작업을 해야합니다.

[BEM (Block Element Modifier)](https://bem.info/)의 방법론에서는 모두 단일 클래스를 갖고, 계층구조가 필요한 곳에서는 클래스의 이름이 확장되기를 권장합니다. 따라서 선택자를 쉽고 효율적으로 재정의 할 수 있습니다.

어떠한 CSS 속성이 리플로우또는 합성되는 것을 주의 하십시오. 가능하다면 레이아웃을 변경하는 스타일링(리플로우를 작동시키는 스타일)은 작성하지 마십시오.g styles that change the layout (trigger reflow) where possible.

###### 참고 자료

-   <https://developers.google.com/web/fundamentals/performance/rendering/>
-   <https://csstriggers.com/>

### CSS 전처리기를 사용하면 어떤 장단점이 있습니까?

**장점:**

-   CSS의 유지보수성 향상됩니다.
-   중첩된 선택자를 작성하기 쉽습니다.
-   일관된 스타일링 설정을 위한 변수사용. 여러 프로젝트에 걸쳐 테마 파일을 공유할 수 있습니다.
-   반복되는 CSS를 위한 Mixins 생성.
-   코드를 여러 파일로 나눕니다. CSS파일도 나눌 수 있지만, 그렇게 하기 위해서는 각 CSS파일을 다운로드하기 위한 HTTP요청이 필요합니다.

**단점:**

-   전처리기를 위한 도구가 필요합니다. 다시 컴파일하는 시간이 느릴 수 있습니다.

### 사용했던 CSS 전처리기에 대해 좋아하는 것과 싫어하는 것을 설명하십시오.

**좋은것:**

-   대부분 위에서 언급 한 장점이 있습니다..
-   Less는 자바 스크립트로 작성되었으며 Node와 잘 작동합니다.

**싫은것:**

-   나는 C++로 작성된 LibSass를 바인딩인 'node-sass'를 통해 Sass를 사용합니다. 노드 버전이 바뀔 때 자주 다시 컴파일해야합니다.
-   Less에서는 변수 이름의 접두어가`@`로되어 있으며, `@media`, `@import` 및 `@font-face` 규칙과 같은 고유 CSS 키워드와 혼동 될 수 있습니다.

### 비표준 글꼴을 사용하는 웹 디자인 디자인을 구현하는 방법은 무엇입니까?

`font-face`를 사용하고 `font-weight`가 다른 경우 `font-family`를 정의합니다.

### CSS 셀렉터에 일치하는 요소가 어떤 것인지 브라우저가 어떻게 결정되는지를 설명하시오.

이 부분은 위의 효율적인 CSS 작성에 대한 것입니다. 브라우저는 셀렉터를 오른쪽(선택자)에서 왼쪽으로 일치시킵니다. 브라우저는 선택자에 따라 DOM의 요소를 필터링하고 부모 요소를 검사하여 일치를 판정합니다. 선택자 체인의 길이가 짧을수록, 브라우저가 해당 요소가 선택기에 일치하는지 여부를 판단 할 수 있습니다.

예를 들어,이 셀렉터 `p span`는 브라우저는 먼저 모든 `<span>`요소를 찾아 그 부모의 루트까지 모두 통과하여 `<p>`요소를 찾습니다. 특정한 `<span>`의 경우 `<p>`를 찾는 즉시 `<span>`이 일치하는 것을 알고 있으며, 그에 따라 매칭 중지합니다.

###### 참고자료

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
