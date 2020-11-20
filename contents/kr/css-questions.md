---
title: CSS 질문
---

[프론트엔드 면접 질문 - CSS 질문](https://github.com/h5bp/Front-end-Developer-Interview-Questions/blob/master/src/questions/css-questions.md)에 대한 해설입니다. Pull Request를 통한 제안, 수정 요청 환영합니다.

## 목차

- [CSS 선택자의 특정성은 무엇이며 어떻게 작동하나요?](#css-선택자의-특정성은-무엇이며-어떻게-작동하나요)
- [`Resetting`과 `Normalizing` CSS의 차이점은 무엇인가요? 당신은 무엇을 선택할 것이며, 그 이유는 무엇인가요?](#resetting과-normalizing-css의-차이점은-무엇인가요-당신은-무엇을-선택할-것이며-그-이유는-무엇인가요)
- [`float`가 어떻게 작동하는지 설명하세요.](#float가-어떻게-작동하는지-설명하세요)
- [`z-index`와 스택 컨텍스트(stacking context)가 어떻게 형성되는지 설명하세요.](#z-index와-스택-컨텍스트stacking-context가-어떻게-형성되는지-설명하세요)
- [BFC(Block Formatting Context)와 그 작동 방식을 설명하세요.](#bfcblock-formatting-context와-그-작동-방식을-설명하세요)
- [clear 하는 방법에는 어떤 것이 있으며, 각각 어떤상황에 적합한가요?](#clear-하는-방법에는-어떤-것이-있으며-각각-어떤상황에-적합한가요)
- [CSS 스프라이트는 무엇인가요? 그리고 당신이 페이지나 사이트에 구현하는 방법도 설명해주세요.](#css-스프라이트는-무엇인가요-그리고-당신이-페이지나-사이트에-구현하는-방법도-설명해주세요)
- [브라우저 별로 스타일이 다른 문제를 어떤 접근 방법으로 해결하나요?](#브라우저-별로-스타일이-다른-문제를-어떤-접근-방법으로-해결하나요)
- [기능이 제한된 브라우저의 페이지는 어떻게 처리하나요? 어떤 기술/프로세스를 사용하나요?](#기능이-제한된-브라우저의-페이지는-어떻게-처리하나요-어떤-기술프로세스를-사용하나요)
- [콘텐츠를 시각적으로 숨기는(그리고 screen reader에서만 사용할 수 있게 만드는)다양한 방법은 무엇인가요?](#콘텐츠를-시각적으로-숨기는그리고-screen-reader에서만-사용할-수-있게-만드는다양한-방법은-무엇인가요)
- [그리드 시스템을 사용해본적 있나요? 만약 그렇다면, 당신은 어떤 것을 선호하나요?](#그리드-시스템을-사용해본적-있나요-만약-그렇다면-당신은-어떤-것을-선호하나요)
- [미디어 쿼리나 모바일만을 위한 layouts/CSS를 사용하거나 구현해본적 있나요?](#미디어-쿼리나-모바일만을-위한-layoutscss를-사용하거나-구현해본적-있나요)
- [SVG 스타일링에 익숙하신가요?](#svg-스타일링에-익숙하신가요)
- [screen이 아닌 @media 속성의 예를 들어줄 수 있나요?](#screen이-아닌-media-속성의-예를-들어줄-수-있나요)
- [효율적인 CSS를 작성하는데 있어서 어려움은 무엇인가요?](#효율적인-css를-작성하는데-있어서-어려움은-무엇인가요)
- [CSS 전처리기를 사용하면 어떤 장단점이 있나요?](#css-전처리기를-사용하면-어떤-장단점이-있나요)
- [사용했던 CSS 전처리기에 대해 좋았던 점과 싫었던 점을 설명해주세요.](#사용했던-css-전처리기에-대해-좋았던-점과-싫었던-점을-설명해주세요)
- [비표준 글꼴을 사용하는 웹 디자인 컴포넌트를 어떻게 구현하나요?](#비표준-글꼴을-사용하는-웹-디자인-컴포넌트를-어떻게-구현하나요)
- [브라우저가 CSS 선택자에 일치하는 요소를 어떻게 결정하는지 설명하세요.](#브라우저가-css-선택자에-일치하는-요소를-어떻게-결정하는지-설명하세요)
- [Pseudo-elements에 대해 설명하고 이 요소가 무엇을 위해 사용되는지 설명하세요.](#pseudo-elements에-대해-설명하고-이-요소가-무엇을-위해-사용되는지-설명하세요)
- [박스 모델에 대한 당신의 이해와 CSS에서 브라우저에 다른 박스 모델로 레이아웃을 렌더링하는 방법을 설명하세요.](#박스-모델에-대한-당신의-이해와-css에서-브라우저에-다른-박스-모델로-레이아웃을-렌더링하는-방법을-설명하세요)
- [`* { box-sizing: border-box; }`는 무엇을 하나요? 장점은 무엇인가요?](#--box-sizing-border-box-는-무엇을-하나요-장점은-무엇인가요)
- [CSS의 `display` 속성은 무엇이며 사용법에 대한 몇 가지 예를 들 수 있나요?](#css의-display-속성은-무엇이며-사용법에-대한-몇-가지-예를-들-수-있나요)
- [`inline` 과 `inline-block` 의 차이점은 무엇인가요?](#inline-과-inline-block-의-차이점은-무엇인가요)
- [`relative`, `fixed`, `absolute`, `static` 요소의 차이점은 무엇인가요?](#relative-fixed-absolute-static-요소의-차이점은-무엇인가요)
- [로컬이나 프로덕션 환경에서 사용했던 CSS 프레임워크는 무엇인가요? 어떻게 그들을 바꾸거나 개선할 수 있을까요?](#로컬이나-프로덕션-환경에서-사용했던-css-프레임워크는-무엇인가요-어떻게-그들을-바꾸거나-개선할-수-있을까요)
- [새로운 CSS Flexbox나 Grid 스펙을 사용해본 적이 있나요?](#새로운-css-flexbox나-grid-스펙을-사용해본-적이-있나요)
- [반응형 웹사이트를 코딩하는 것과 모바일 우선 전략을 사용하는 것 사이의 차이점을 설명하세요.](#반응형-웹사이트를-코딩하는-것과-모바일-우선-전략을-사용하는-것-사이의-차이점을-설명하세요)
- [반응형 디자인은 적응형 디자인과 어떻게 다른가요?](#반응형-디자인은-적응형-디자인과-어떻게-다른가요)
- [레티나 그래픽으로 작업 해본 적이 있나요? 그렇다면, 언제, 어떤 기술을 사용하였나요?](#레티나-그래픽으로-작업-해본-적이-있나요-그렇다면-언제-어떤-기술을-사용하였나요)
- [`absolute` 포지셔닝 대신 `translate()`를 사용하는 이유가 무엇인가요? 또는 그 반대의 경우에 대해서는 어떻게 생각하시나요?, 그 이유는 무엇인가요?](#absolute-포지셔닝-대신-translate를-사용하는-이유가-무엇인가요-또는-그-반대의-경우에-대해서는-어떻게-생각하시나요-그-이유는-무엇인가요)

### CSS 선택자의 특정성은 무엇이며 어떻게 작동하나요?

브라우저는 CSS 규칙의 특정성에 따라 요소에 표시할 스타일을 결정합니다. 브라우저는 이미 특정 요소와 일치하는 규칙을 결정했다고 가정합니다. 일치하는 규칙들 가운데, 네개의 쉼표로 구분된 값 `a, b, c, d`는 다음을 기반으로 각 규칙에 대해 계산됩니다.

1.  `a`는 인라인 스타일이 사용되고 있는지 여부입니다. 속성의 선언이 요소의 인라인 스타일이면 `a`는 1이고, 그렇지 않으면 0입니다.
2.  `b`는 ID 셀렉터의 수입니다.
3.  `c`는 클래스, 속성, 가상 클래스 선택자의 수입니다.
4.  `d`는 태그, 가상 요소 선택자의 수입니다.

결과적인 특정성은 점수가 아니라, 컬럼마다 비교할 수 있는 값들의 행렬입니다. 선택자를 비교하여 가장 높은 특정성을 갖는 항목을 결정할 때, 왼쪽에서 오른쪽 순으로 각 열의 가장 높은 값을 비교합니다. 따라서 `b`열의 값은 `c`와 `d`열에 있는 값을 무시합니다. 따라서 `0,1,0,0`의 특정성은 `0,0,10,10`중 하나보다 큽니다.

동등한 특정성의 경우: 가장 마지막 규칙이 중요한 규칙입니다. 스타일시트에 동일한 규칙을 두 번 작성한 경우(내부나 외부에 관계없이) 스타일시트의 하위 규칙이 스타일될 요소에 더 가까우므로 더 구체적으로 적용됩니다.

저라면, 필요하다면 쉽게 재정의할 수 있도록 낮은 특정성 규칙들을 작성할 것입니다. CSS UI 컴포넌트 라이브러리 코드를 작성할 때, 라이브러리 사용자가 `!important`를 사용하거나 특정성을 높이기 위해 지나치게 복잡한 CSS 규칙을 사용하지 않고도 이를 재정의할 수 있도록 특정성을 낮게 하는 것이 중요합니다.

###### 참고자료

- https://www.smashingmagazine.com/2007/07/css-specificity-things-you-should-know/
- https://www.sitepoint.com/web-foundations/specificity/

[[↑] Back to top](#목차)

### `Resetting`과 `Normalizing` CSS의 차이점은 무엇인가요? 당신은 무엇을 선택할 것이며, 그 이유는 무엇인가요?

- **Resetting** - Resetting은 요소의 모든 기본 브라우저 스타일을 제거하기 위한 것입니다. 예: `margin`, `padding`, `font-size`는 같은 값으로 재설정됩니다. 일반적인 타이포그래피 요소에 대한 스타일을 재 선언해야합니다.

- **Normalizing** - Normalizing는 "모든 스타일을 제거"하는 것이 아니라 유용한 기본 스타일을 보존합니다. 또한 일반적인 브라우저 종속성에 대한 버그를 수정합니다.

필자는 저만의 스타일링을 많이 해야 하고 보존할 기본 스타일이 필요하지 않도록 매우 커스터마이징되었거나 자유로운 사이트 디자인해야할 때 리셋을 선택합니다.

###### 참고자료

- https://stackoverflow.com/questions/6887336/what-is-the-difference-between-normalize-css-and-reset-css

[[↑] Back to top](#목차)

### `float`가 어떻게 작동하는지 설명하세요.

Float는 CSS 위치지정 속성입니다. Float된 요소는 페이지의 흐름의 일부가 되며, 페이지의 흐름에서 제거되는 `position: absolute` 요소와 달리 다른 요소(예: 플로팅 요소 주위로 흐르는 텍스트)의 위치에 영향을 줍니다.

CSS `clear` 속성은 float 요소에 `left`/`right`/`both`에 위치하도록 사용될 수 있습니다.

부모 요소에 float 요소만 있으면, 그 높이는 무효가 됩니다. 컨테이너의 float 요소 다음에 있지만 컨테이너가 닫히기 전에 float를 clear하면 해결할 수 있습니다.

`.clearfix`는 영리한 CSS 가상 선택자 (`:after`)를 사용하여 float를 제거합니다. 상위 클래스에 overflow 를 설정하는 대신 추가 클래스 `clearfix`를 적용합니다. 그 다음 아래 CSS를 적용하세요:

```css
.clearfix:after {
  content: ' ';
  visibility: hidden;
  display: block;
  height: 0;
  clear: both;
}
```

대신, 부모 요소에 `overflow: auto`나 `overflow: hidden` 속성을 주면, 자식 요소 내부에 새로운 블록 포맷 컨텍스트을 설정하고 자식을 포함하도록 확장합니다.

###### 참고자료

- https://css-tricks.com/all-about-floats/

[[↑] Back to top](#목차)

### `z-index`와 스택 컨텍스트(stacking context)가 어떻게 형성되는지 설명하세요.

CSS의 `z-index`속성은 겹치는 요소의 쌓임 순서를 제어합니다. `z-index`는 `position`에 `static`이 아닌 값을 갖는 요소에만 영향을 줍니다.

`z-index` 값이 없으면 DOM에 나타나는 순서대로 요소가 쌓이게 됩니다(동일한 계층에서 가장 아래의 것이 맨 위에 보여집니다). 정적이지 않은(non-static) 위치지정 요소(및 해당 하위 요소)는 HTML 레이어 구조와 상관없이 기본 정적 위치로 항상 요소 위에 나타납니다.

스택 컨텍스트(stacking context)는 레이어들을 포함하는 요소입니다. 지역 스택 컨텍스트 내에서, 자식의 `z-index` 값은 문서 루트가 아닌 해당 요소를 기준으로 설정됩니다. 해당 컨텍스트 외부 레이어(예: 지역 스택 컨텍스트의 형제 요소)는 그 사이의 레이어에 올 수 없습니다. 요소 B가 요소 A의 상단에 위치하는 경우, 요소 A의 하위 요소 C는, 요소 C가 요소 B보다 `z-index`가 더 높은 경우에도 요소 B 보다 위에 올 수 없습니다.

각각의 스택 컨텍스트는 자체적으로 포함되어 있습니다 - 요소의 내용이 쌓인 후에는 전체 요소를 스택 컨텍스트의 쌓인 순서로 고려합니다. 다음 몇몇 CSS 속성, `opacity`가 1보다 작거나, `filter`가 `none`이 이거나, `transform`이 `none`이 아닌 것들이 새로운 스택 컨텍스트를 트리거합니다.

###### 참고 자료

- https://css-tricks.com/almanac/properties/z/z-index/
- https://philipwalton.com/articles/what-no-one-told-you-about-z-index/
- https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Positioning/Understanding_z_index/The_stacking_context

[[↑] Back to top](#목차)

### BFC(Block Formatting Context)와 그 작동 방식을 설명하세요.

BFC(Block Formatting Context)는 블록 박스가 배치된 웹 페이지의 시각적 CSS 렌더링의 일부입니다. float, absolute로 배치된 요소, `inline-blocks`, `table-cells`, `table-caption` 그리고 `visible`(그 값이 viewport에 전파되었을 때는 제외)이 아닌 `overflow`가 있는 요소들이 새로운 Block Formatting Context를 만듭니다.

BFC는 다음 조건 중 하나 이상을 충족시키는 HTML 박스입니다:

- `float`의 값이 `none`이 아님.
- `position`의 값이 `static`도 아니고 `relative`도 아님.
- `display`의 값이 `table-cell`, `table-caption`, `inline-block`, `flex`, `inline-flex`임.
- `overflow`의 값이 `visible`이 아님.

BFC에서 각 박스의 왼쪽 바깥 모서리는 포함하는 블록의 왼쪽 모서리에 닿습니다(right-to-left 포맷에서는, 오른쪽 모서리에 닿음).

BFC collapse시에 인접한 블록 레벨 박스 사이의 수직 마진. [collapsing margins](https://www.sitepoint.com/web-foundations/collapsing-margins/)에 대해 자세히 읽어보세요.

###### 참고 자료

- https://developer.mozilla.org/en-US/docs/Web/Guide/CSS/Block_formatting_context
- https://www.sitepoint.com/understanding-block-formatting-contexts-in-css/

[[↑] Back to top](#목차)

### clear 하는 방법에는 어떤 것이 있으며, 각각 어떤상황에 적합한가요?

- 빈 `div` 방법 - `<div style="clear:both;"></div>`
- Clearfix 방법 - 위 `.clearfix` 클래스를 참조하세요.
- `overflow: auto` 또는 `overflow: hidden` 방법 - 부모는 새로운 Block Formatting Context를 설정하고, 확장된 자식을 포함하도록합니다.

대규모의 프로젝트에서는 유용하게 `.clearfix` 클래스를 만들어 필요한 곳에서 사용합니다. 자식이 부모보다 크기가 큰 경우 `overflow: hidden`은 자식을 모두 보여줄 수 없습니다.

[[↑] Back to top](#목차)

### CSS 스프라이트는 무엇인가요? 그리고 당신이 페이지나 사이트에 구현하는 방법도 설명해주세요.

CSS 스프라이트는 여러 이미지를 하나의 큰 이미지로 결합합니다. 일반적으로 아이콘에 사용되는 기술(Gmail에서 사용)입니다. 구현 방법:

1. 스프라이트 생성기를 사용하여 여러 이미지를 하나로 묶어 적절한 CSS를 생성합니다.
1. 각 이미지는 `background-image`, `background-position`, `background-size` 속성이 정의된 해당 CSS 클래스를 갖습니다.
1. 해당 이미지를 사용하기위해, 요소에 해당 클래스를 추가합니다.

**장점:**

- 여러 이미지에 대한 HTTP 요청 수를 줄입니다(스프라이트 시트당 하나의 단일 요청만 필요합니다.) 그러나 HTTP2를 사용하면, 여러 이미지를 로드하는 것이 더 이상 중요하지 않습니다.
- `:hover`의 상태에서만 나타나는 이미지가 필요할 때, 다운로드되지 않는 이미지를 미리 다운로드하여 깜박임이 보이지 않습니다.

###### 참고 자료

- https://css-tricks.com/css-sprites/

[[↑] Back to top](#목차)

### 브라우저 별로 스타일이 다른 문제를 어떤 접근 방법으로 해결하나요?

- 문제와 그 문제를 일으키는 브라우저를 식별한 후, 해당 브라우저가 사용 중일 때만 로드되는 별도의 스타일 시트를 사용합니다. 하지만 이 방식을 사용하려면 서버사이드 렌더링이 필요합니다.
- 이미 이러한 스타일링 문제를 처리하고 있는 Bootstrap 같은 라이브러리를 사용합니다.
- `autoprefixer`를 사용하여 벤더 프리픽스를 코드에 자동으로 추가합니다.
- Reset CSS 또는 Normalize.css를 사용합니다.

[[↑] Back to top](#목차)

### 기능이 제한된 브라우저의 페이지는 어떻게 처리하나요? 어떤 기술/프로세스를 사용하나요?

- 우아한 퇴보 - 최신 브라우저를 위한 어플리케이션을 구축하는 동시에 그것이 구형 브라우저에서도 계속 작동하도록 하는 구축방법.
- 점진적 향상 - 기본 수준의 사용자 환경에 대한 응용 프로그램을 구축하지만 브라우저가 이를 지원할 경우 기능을 강화하는 방법.
- [caniuse.com](https://caniuse.com/)을 사용하여 기능 지원을 확인합니다.
- 자동 벤더 프리픽스 삽입을 위해 Autoprefixer 사용.
- [Modernizr](https://modernizr.com/)를 사용하여 기능 감지.
- CSS Feature 쿼리 [@support](https://developer.mozilla.org/en-US/docs/Web/CSS/@supports) 사용.

[[↑] Back to top](#목차)

### 콘텐츠를 시각적으로 숨기는(그리고 screen reader에서만 사용할 수 있게 만드는)다양한 방법은 무엇인가요?

이러한 기술은 Accessibility(a11y) 에 관련이 있습니다.

- `width: 0; height: 0`. 요소가 화면의 어떤 공간도 차지하지 않도록 합니다. 결과적으로 보이지 않게 됩니다.
- `position: absolute; left: -99999px`. 화면 외부에 배치합니다.
- `text-indent: -9999px`. 이것은 `block`인 요소 내의 텍스트에서만 작동합니다.
- 메타데이터. 예를 들면, Schema.org, RDF, JSON-LD를 사용합니다.
- WAI-ARIA. 웹 페이지의 Accessibility를 높이는 방법을 정의하는 W3C 기술 사양입니다.

WAI-ARIA가 이상적인 해결책이라 하더라도 저는 `absolute` 위치지정 접근방법을 택할 것입니다. 대부분의 요소에 작동하며 간단한 기술이기 때문입니다.

###### 참고자료

- https://www.w3.org/TR/wai-aria-1.1/
- https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA
- http://a11yproject.com/

[[↑] Back to top](#목차)

### 그리드 시스템을 사용해본적 있나요? 만약 그렇다면, 당신은 어떤 것을 선호하나요?

저는는 `float` 기반 그리드 시스템을 좋아합니다. 왜냐하면, 여전히 기존 대체할만한 시스템(flex, grid) 중에서도 가장 많은 브라우저를 지원하기 때문입니다. 이것은 `Bootstrap`에서 수 년동안 사용되었으며, 효과가 있다는 것이 입증되었습니다.

[[↑] Back to top](#목차)

### 미디어 쿼리나 모바일만을 위한 layouts/CSS를 사용하거나 구현해본적 있나요?

네. 한가지 예를 들면, 여러 줄 형식의 네비게이션을 특정 breakpoint를 지나면 `fixed-bottom tab` 형태로 변환하였습니다.

[[↑] Back to top](#목차)

### SVG 스타일링에 익숙하신가요?

네, 객체의 속성을 지정하는 방법을 포함해 inline CSS, CSS section 삽입, 외부 CSS file처럼 shape의 색상을 정하는 여러 방법이 있습니다. 웹에서 볼 수 있는 대부분의 SVG는 inline CSS를 사용하지만, 각각 장단점이 있습니다.

기본적인 채색은 노드에 `fill`과 `stroke` 두 속성을 설정하여 정할 수 있습니다. `fill`은 객체 안쪽 색을 설정하고, `stroke`는 객체 주위에 그려지는 선의 색을 설정합니다. 색상 이름 (`red` 등), RGB값 (`rgb(255,0,0)`), 16진수 값, RGBA 값 등 HTML에서 사용하는 것과 동일한 CSS 색상 이름 스킴을 사용할 수 있습니다. HTML에서 사용하는 것과 동일한 CSS 색상 지정 스킴을 사용할 수 있습니다.

```html
<rect
  x="10"
  y="10"
  width="100"
  height="100"
  stroke="blue"
  fill="purple"
  fill-opacity="0.5"
  stroke-opacity="0.8"
/>
```

###### 참고자료

- https://developer.mozilla.org/en-US/docs/Web/SVG/Tutorial/Fills_and_Strokes

[[↑] Back to top](#목차)

### screen이 아닌 @media 속성의 예를 들어줄 수 있나요?

네, @media 속성은 _screen_ 을 포함하여 4가지 타입이 있습니다.

- all - 모든 미디어 기기 장치
- print - 프린터
- speech - 화면을 크게 읽는 스크린리더
- screen - 컴퓨터 스크린, 태블릿, 스마트폰 등

`print` 미디어 타입의 사용 예제:

```css
@media print {
  body {
    color: black;
  }
}
```

###### 참고자료

- https://developer.mozilla.org/en-US/docs/Web/CSS/@media#Syntax

[[↑] Back to top](#목차)

### 효율적인 CSS를 작성하는데 있어서 어려움은 무엇인가요?

먼저, 브라우저는 선택자가 맨 오른쪽(key 선택자)부터 왼쪽으로 일치하는지 확인합니다. 브라우저는 선택자에 따라 DOM의 요소를 필터링하고 해당 부모요소가 일치하는지 식별합니다. 선택자 체인의 길이가 짧을수록 브라우저는 해당 요소가 선택자와 일치하는지 여부를 빠르게 판별할 수 있습니다. 따라서 태그 선택자와 보편적인 선택자 사용을 피해야 합니다. 이들은 많은 요소가 매치되기 때문에 부모가 일치하는지 여부를 판단하기 위해 브라우저가 많은 작업을 해야합니다.

[BEM (Block Element Modifier)](https://bem.info/) 방법론에서는 모두 단일 클래스를 갖고, 계층구조가 필요한 곳에서는 클래스의 이름을 확장하기를 권장합니다. 따라서 선택자를 쉽고 효율적으로 재정의할 수 있습니다.

어떤 CSS 속성이 reflow, repaint, compositing을 트리거 하는지 알아두세요. 가능하면 레이아웃(reflow 트리거)를 변경하는 스타일은 피하세요.

###### 참고자료

- https://developers.google.com/web/fundamentals/performance/rendering/
- https://csstriggers.com/

[[↑] Back to top](#목차)

### CSS 전처리기를 사용하면 어떤 장단점이 있나요?

**장점:**

- CSS의 유지보수성이 향상됩니다.
- 중첩 선택자를 작성하기 쉽습니다.
- 일관된 테마를 위한 변수사용. 여러 프로젝트에 걸쳐 테마 파일을 공유할 수 있습니다.
- 반복되는 CSS를 위한 Mixins 생성.
- 코드를 여러 파일로 나눕니다. CSS 파일도 나눌 수 있지만, 그렇게 하기 위해서는 각 CSS 파일을 다운로드하기 위한 HTTP 요청이 필요합니다.

**단점:**

- 전처리기를 위한 도구가 필요합니다. 다시 컴파일하는 시간이 느릴 수도 있습니다.

[[↑] Back to top](#목차)

### 사용했던 CSS 전처리기에 대해 좋았던 점과 싫었던 점을 설명해주세요.

**좋은 점:**

- 대부분의 장점은 위에서 언급했습니다.
- Less는 자바스크립트로 작성되었으며, Node와 잘 작동합니다.

**싫은 점:**

- 저는 C++로 작성된 LibSass 바인딩인 `node-sass`를 통해 Sass를 사용합니다. 노드 버전을 바꿀 때 자주 다시 컴파일해야 했습니다.
- Less에서는 변수 이름의 접두어가 `@`이며, `@media`, `@import`, `@font-face` 규칙과 같은 고유 CSS 키워드와 혼동될 수 있습니다.

[[↑] Back to top](#목차)

### 비표준 글꼴을 사용하는 웹 디자인 컴포넌트를 어떻게 구현하나요?

`font-face`를 사용하고 `font-weight`가 다른 경우 `font-family`를 정의합니다.

[[↑] Back to top](#목차)

### 브라우저가 CSS 선택자에 일치하는 요소를 어떻게 결정하는지 설명하세요.

이는 위의 효율적인 CSS 작성과 관련있습니다. 브라우저는 선택자를 오른쪽(선택자)에서부터 왼쪽으로 일치시킵니다. 브라우저는 선택자에 따라 DOM의 요소를 필터링하고 부모요소를 검사하여 일치를 판정합니다. 선택자 체인의 길이가 짧을수록, 브라우저가 해당 요소가 일치하는지 여부를 더 빠르게 판단할 수 있습니다.

예를 들어, 이 선택자 `p span`는 먼저 모든 `<span>`요소를 찾아 그 부모의 루트까지 모두 통과하여 `<p>`요소를 찾습니다. 특정한 `<span>`의 경우 `<p>`를 찾는 즉시 `<span>`이 일치하는 것을 알고있으며, 이에 따라 매칭을 중지합니다.

###### 참고자료

- https://stackoverflow.com/questions/5797014/why-do-browsers-match-css-selectors-from-right-to-left

[[↑] Back to top](#목차)

### Pseudo-elements에 대해 설명하고 이 요소가 무엇을 위해 사용되는지 설명하세요.

CSS Pseudo-element는 선택자에 추가되는 키워드로, 선택한 요소의 특정 부분을 스타일링 할 수 있습니다. 마크업을 수정하지 않고(`:before`, `:after`) 텍스트 데코레이션을 위해 사용하거나(`:first-line`, `:first-letter`) 마크업에 요소를 추가할 수 있습니다.(`content: ...`와 결합)

- `:first-line`과 `:first-letter`는 텍스트를 데코레이션하는데 사용될 수 있습니다.
- 위의 `.clearfix`에 사용되어 `clear: both`로 영역을 차지하지 않는 요소를 추가합니다.
- 툴팁의 삼각 화살표는 `:before`와 `:after`를 사용합니다. 삼각형이 실제로 DOM이 아닌 스타일의 일부로 간주되기 때문에 분리하는 것이 좋습니다. 추가적인 HTML 요소를 사용하지 않고 CSS 스타일만으로 삼각형을 그릴 수는 없습니다.

###### 참고자료

- <https://css-tricks.com/almanac/selectors/a/after-and-before/>

[[↑] Back to top](#목차)

### 박스 모델에 대한 당신의 이해와 CSS에서 브라우저에 다른 박스 모델로 레이아웃을 렌더링하는 방법을 설명하세요.

CSS 박스 모델은 문서 트리의 요소에 대해 생성되고 시각적 포매팅 모델에 따라 배치된 사각형 상자를 나타냅니다. 각 박스에는 content 영역(예: 텍스트, 이미지 등)과 `padding`, `border`, `margin` 영역을 선택적으로 사용할 수 있습니다.

CSS 박스 모델은 다음을 계산합니다.

- 블록 요소가 공간을 얼마나 차지하는지.
- 테두리 또는 여백이 겹치거나 충돌하는지 여부.
- 박스의 크기.

박스 모델에는 다음과 같은 규칙이 있습니다.

- 블록 요소의 크기는 `width`, `height`, `padding`, `border`, `margin`에 의해 계산됩니다.
- `height` 가 지정되어있지 않으면, 블럭 요소는 포함하고있는 내용만큼의 높이를 가질 것이고, `padding`을 더합니다.(float가 아닌경우).
- `width` 가 지정되지있지 않으면, float가 아닌 블록 요소는 [부모의 너비-`padding`]에 맞게 확장됩니다.
- 요소의 `height`는 내용의 `height`에 의해 계산됩니다.
- 요소의 `width`는 내용의 `width`에 의해 계산됩니다.
- 기본적으로, `padding`과 `border`는 요소의 `width`와 `height`의 일부가 아닙니다.

###### 참고자료

- https://www.smashingmagazine.com/2010/06/the-principles-of-cross-browser-css-coding/#understand-the-css-box-model

[[↑] Back to top](#목차)

### `* { box-sizing: border-box; }`는 무엇을 하나요? 장점은 무엇인가요?

- 기본적으로, 요소들에 `box-sizing: content-box`가 적용되면, 내용의 크기만 고려됩니다.
- `box-sizing: border-box`는 요소의 `width`와 `height`가 어떻게 계산되는지를 변경하여, `border`와 `padding`도 계산에 포함됩니다.
- 요소의 `height`는 내용의 [`height` + 수직 `padding` + 수직 `border` 폭]으로 계산됩니다.
- 요소의 `width` 는 내용의 [`width` + 수평 `padding` + 수평 `border` 폭]으로 계산됩니다.
- `padding`과 `border`를 박스 모델의 일부분으로 생각하면, 디자이너가 실제로 생각하는 것과 잘 들어 맞습니다.

###### 참고자료

- https://www.paulirish.com/2012/box-sizing-border-box-ftw/

[[↑] Back to top](#목차)

### CSS의 `display` 속성은 무엇이며 사용법에 대한 몇 가지 예를 들 수 있나요?

- `none`, `block`, `inline`, `inline-block`, `table`, `table-row`, `table-cell`, `list-item`.

TODO

[[↑] Back to top](#목차)

### `inline` 과 `inline-block` 의 차이점은 무엇인가요?

좋은 비교를 위해 `block` 과도 비교해 볼 것입니다.

|  | `block` | `inline-block` | `inline` |
| --- | --- | --- | --- |
| 크기 | 부모 컨테이너의 너비를 채웁니다. | 내용에 의존합니다. | 내용에 의존합니다. |
| 위치 | 새 줄에서 시작하고, 그 옆에 HTML 요소를 허용하지 않습니다 (`float`을 추가 할 때 제외). | 다른 콘텐츠와 함께 흐르고, 다른 요소가 옆에 있는 것을 허용합니다. | 다른 콘텐츠와 함께 흐르고, 다른 요소가 옆에 있는 것을 허용합니다. |
| `width`, `height` 지정 가능 여부 | 가능 | 가능 | 불가능. 설정되면 무시됩니다. |
| `vertical-align` 정렬 가능 여부 | 불가능 | 가능 | 가능 |
| margin 과 padding | 모든 방향에서 가능. | 모든 방향에서 가능. | 수평방향만 가능. 세로방향을 지정하면, 레이아웃에 영향을 주지 않습니다. `border`와 `padding`이 콘텐츠 주위에 시각적으로 나타나는 경우에도, 수직영역은 `line-height`에 의존합니다. |
| Float | - | - | 수직 margin과 padding을 설정할 수 있는 `block` 요소와 같아집니다. |

[[↑] Back to top](#목차)

### `relative`, `fixed`, `absolute`, `static` 요소의 차이점은 무엇인가요?

위치가 정해진 요소는 계산된 `position` 속성이 `relative`, `absolute`, `fixed`, `sticky` 중 하나인 요소입니다.

- `static` - 기본 위치. 요소가 평소와 같이 페이지에 위치합니다. `top`, `right`, `bottom`, `left`, `z-index` 속성은 적용되지 않습니다.
- `relative` - 요소의 위치가 레이아웃을 변경하지 않고, 자체에 상대적으로 조정됩니다. (따라서 배치되지 않은 요소의 간격을 남겨 둡니다.)
- `absolute` - 요소가 페이지의 평소 위치에서 제거되고, 가장 가까운 `static이 아닌` 부모 블록이 있는 경우 지정된 위치에 배치됩니다. 그렇지 않으면 최상위 블록에 의존됩니다. absolute로 배치된 박스는 margin을 가질 수 있으며 다른 margin과 충돌하지 않습니다. 이 요소는 다른 요소의 위치에 영향을 주지 않습니다.
- `fixed` - 요소는 페이지의 평소 위치에서 제거되고 뷰포트를 기준으로 지정된 위치에 배치되며 스크롤 할 때 이동하지 않습니다.
- `sticky` - sticky는 `relative`와 `fixed`의 하이브리드입니다. 요소는 지정된 임계값을 넘을 때까지 `relative` 위치로 처리되며, 특정 지점에서 `fixed` 위치로 처리됩니다.

###### 참고자료

- https://developer.mozilla.org/en/docs/Web/CSS/position

[[↑] Back to top](#목차)

### 로컬이나 프로덕션 환경에서 사용했던 CSS 프레임워크는 무엇인가요? 어떻게 그들을 바꾸거나 개선할 수 있을까요?

- **Bootstrap** - 느린 배포 주기. 부트스트랩 4는 거의 2년 동안 알파버전 상태였습니다. 널리 사용되는 Spinner 버튼 컴포넌트를 추가합니다.
- **Semantic UI** - 소스 코드 구조는 테마 커스터마이징을 이해하기 어렵게 만듭니다. 틀에 얽매이지 않는 테마 시스템으로 사용자 정의하기가 어렵습니다. 벤더 라이브러리 내의 하드 코딩된 설정 경로. 부트스트랩과 달리 변수 오버라이드에 대해 잘 설계되지 않았습니다.
- **Bulma** - 많은 의미없고 불필요한 클래스와 마크업을 필요로 합니다. 이전 버전과 호환되지 않습니다. 버전을 업그레이드하면 미묘한 방식으로 앱이 손상됩니다.

[[↑] Back to top](#목차)

### 새로운 CSS Flexbox나 Grid 스펙을 사용해본 적이 있나요?

네. Flexbox는 주로 1차원 레이아웃을 대상으로 하며 Grid는 2차원 레이아웃을 대상으로 합니다.

Flexbox는 CSS에서 컨테이너 안에 있는 요소의 수직 가운데정렬, sticky footer 등과 같은 많은 일반적인 문제들을 해결합니다. Bootstrap과 Bulma는 Flexbox를 기반으로 하고, 이는 아마도 요즘 레이아웃을 만드는 데 권장되는 방법일 것입니다. 이전에 Flexbox를 사용해 보았지만, `flex-grow`를 사용할 때 일부 브라우저에서 비호환성 문제(Safari)가 발생했습니다. 그래서 백분율로 나타낸 폭을 계산하기 위해 `inline-blocks`과 수학을 사용한 코드로 다시 써야했는데, 이는 좋은 경험은 아니었습니다.

Grid는 그리드 기반의 레이아웃을 생성하기 위한 가장 직관적인 접근법이지만(더 좋을 것입니다!), 현재 브라우저 지원은 넓지 않습니다.

###### 참고자료

- https://philipwalton.github.io/solved-by-flexbox/

[[↑] Back to top](#목차)

### 반응형 웹사이트를 코딩하는 것과 모바일 우선 전략을 사용하는 것 사이의 차이점을 설명하세요.

이 두가지 접근법은 배타적이지 않습니다.

반응형 웹사이트를 만드는 것은 일부 요소가 미디어 쿼리를 통해 장치의 화면 크기(일반적으로 뷰포트 너비)에 따라 크기나 다른 기능을 조정하도록 반응함을 의미합니다. (예: 작은 디바이스에서 글꼴 크기를 줄임)

```css
@media (min-width: 601px) {
  .my-class {
    font-size: 24px;
  }
}

@media (max-width: 600px) {
  .my-class {
    font-size: 12px;
  }
}
```

모바일 우선 전략 또한 반응적이지만, 모바일 장치에 대한 모든 스타일을 정의해야하며 나중에 다른 장치에 대한 특정 규칙을 추가해야합니다. 이전 예를 따르면 다음과 같습니다.

```css
.my-class {
  font-size: 12px;
}

@media (min-width: 600px) {
  .my-class {
    font-size: 24px;
  }
}
```

모바일 우선 전략은 2가지 주요 장점을 가지고 있습니다.

- 모바일 장치에서 적용되는 모든 규칙이 미디어 쿼리에 대해 유효성 검사를 받을 필요가 없으므로 모바일 장치에서 더 뛰어난 성능을 발휘합니다.
- 반응형 CSS 규칙과 관련하여 보다 명확한 코드를 작성해야합니다.

[[↑] Back to top](#목차)

### 반응형 디자인은 적응형 디자인과 어떻게 다른가요?

반응형과 적응형 디자인은 모두 서로 다른 뷰포트 사이즈, 해상도, 사용 컨텍스트, 제어 메커니즘 등을 조정하여 다양한 장치에서 사용자 경험을 최적화하려고 시도합니다.

반응형 디자인은 유연성 원칙에 따라 작동합니다. 즉, 어떤 장치에서나 보기 좋은 단일 변하기 쉬운 웹 사이트입니다. 반응형 웹 사이트는 미디어 쿼리, 유연한 그리드 및 반응 형 이미지를 사용하여 다양한 요인에 따라 유연하고 변화하는 사용자 경험을 제공합니다. 마치 하나의 공이 여러개의 서로 다른 링을 통과하기 위해 커지거나 줄어드는 것과 유사합니다.

적응형 디자인는 점진적 향상의 현대적 정의에 더 가깝습니다. 하나의 유연한 디자인 대신에, 적응형 설계는 장치 및 기타 기능을 감지 한 다음 사전 정의 된 뷰포트 크기 및 기타 특성 세트를 기반으로 적절한 기능 및 레이아웃을 제공합니다. 하나의 공이 여러개의 서로 다른 링을 통과하는 대신, 링의 크기에 따라 여러개의 공을 사용하는 것과 유사합니다.

###### 참고자료

- https://developer.mozilla.org/en-US/docs/Archive/Apps/Design/UI_layout_basics/Responsive_design_versus_adaptive_design
- http://mediumwell.com/responsive-adaptive-mobile/
- https://css-tricks.com/the-difference-between-responsive-and-adaptive-design/

[[↑] Back to top](#목차)

### 레티나 그래픽으로 작업 해본 적이 있나요? 그렇다면, 언제, 어떤 기술을 사용하였나요?

_레티나_ 는 픽셀 비율이 1보다 큰 고해상도 화면을 나타내는 마케팅 용어 일뿐입니다. 중요하게 알아야할 것은 픽셀 비율을 사용하면 이러한 디스플레이가 동일한 크기의 요소를 표시하기 위해 더 저해상도의 화면으로 표현한다는 것입니다. 요즘에는 모든 모바일 디바이스를 _레티나_ 디스플레이로 간주합니다.

브라우저는 기본적으로 이미지들을 제외하고 디바이스의 해상도에 따라 DOM 요소를 렌더링합니다.

레티나 디스플레이를 최상으로 만드는 선명하고보기 좋은 그래픽을 얻으려면 가능한한 고해상도 이미지를 사용해야합니다. 하지만 항상 가장 높은 해상도의 이미지를 사용하면 더 많은 바이트가 전송되어야 하기 때문에 성능에 영향을 미칩니다.

이 문제를 극복하기 위해, HTML5에 스펙인 반응형 이미지를 사용할 수 있습니다. 이는 동일한 이미지의 다른 해상도 파일을 브라우저에 제공하고 html 속성 `srcset`과 `sizes`를 사용하여 어떤 이미지가 가장 적합한지 결정하도록합니다.

```html
<div responsive-background-image>
  <img
    src="/images/test-1600.jpg"
    sizes="
      (min-width: 768px) 50vw,
      (min-width: 1024px) 66vw,
      100vw"
    srcset="
      /images/test-400.jpg   400w,
      /images/test-800.jpg   800w,
      /images/test-1200.jpg 1200w
    "
  />
</div>
```

HTML5의 `srcset`를 지원하지 않는 브라우저(예: IE11)는 이를 무시하고 대신 `src`로 사용한다는 것을 알고있어야 합니다. IE11를 정말 지원해야하고 성능상의 이유로 이 기능을 제공해야하는 경우 자바스크립트 폴리필을 사용할 수 있습니다. 예: Picturefill(참고자료 링크)

아이콘의 경우, SVG나 아이콘폰트를 사용하면 해상도에 관계없이 매우 선명하게 렌더링되므로 가능하면 이를 사용합니다.

###### 참고자료

- https://css-tricks.com/responsive-images-youre-just-changing-resolutions-use-srcset/
- http://scottjehl.github.io/picturefill/
- https://aclaes.com/responsive-background-images-with-srcset-and-sizes/

[[↑] Back to top](#목차)

### `absolute` 포지셔닝 대신 `translate()`를 사용하는 이유가 무엇인가요? 또는 그 반대의 경우에 대해서는 어떻게 생각하시나요?, 그 이유는 무엇인가요?

`translate()`은 CSS `transform`의 값입니다. `transform`이나 `opacity`를 변경해도 브라우저의 reflow나 repaint가 다시 발생하지 않고 컴포지션만 실행되는 반면, 절대 위치를 변경하면 `reflow`가 발생합니다. `transform`을 사용하면 브라우저에서 이 요소를 위한 GPU 레이어가 생성되지만, 절대 위치 속성을 변경하는 것은 CPU를 사용합니다. 그러므로 `translate()`가 더 효율적이며, 매끄러운 애니메이션을 위한 페인트 시간이 짧아집니다.

`translate()`을 사용할 때는 절대 위치를 변경할 때와 달리 원래 위치(일종의 `position: relative`)를 그대로 사용합니다.

###### 참고자료

- https://www.paulirish.com/2012/why-moving-elements-with-translate-is-better-than-posabs-topleft/

[[↑] Back to top](#목차)

### 다른 답변들

- https://neal.codes/blog/front-end-interview-css-questions
- https://quizlet.com/28293152/front-end-interview-questions-css-flash-cards/
- http://peterdoes.it/2015/12/03/a-personal-exercise-front-end-job-interview-questions-and-my-answers-all/
