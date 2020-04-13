---
title: HTML 질문
---

[프론트엔드 면접 질문 - HTML 질문](https://github.com/h5bp/Front-end-Developer-Interview-Questions/blob/master/src/questions/html-questions.md)에 대한 해설입니다. Pull Request를 통한 제안, 수정 요청 환영합니다.

## 목차

- [`DOCTYPE`은 무엇을 하나요?](#doctype은-무엇을-하나요)
- [여러 언어로 되어 있는 콘텐츠의 페이지를 어떻게 제공하나요?](#여러-언어로-되어-있는-콘텐츠의-페이지를-어떻게-제공하나요)
- [다국어 사이트를 디자인하거나 개발할 때 주의해야할 사항은 무엇인가요?](#다국어-사이트를-디자인하거나-개발할-때-주의해야할-사항은-무엇인가요)
- [`data-`속성은 무엇에 좋은가요?](#data-속성은-무엇에-좋은가요)
- [HTML5를 개방형 웹 플랫폼으로 간주할 때, HTML5의 구성 요소는 무엇인가요?](#html5를-개방형-웹-플랫폼으로-간주할-때-html5의-구성-요소는-무엇인가요)
- [`cookie`, `sessionStorage`, `localStorage` 사이의 차이점을 설명하세요.](#cookie-sessionstorage-localstorage-사이의-차이점을-설명하세요)
- [`<script>`, `<script async>`, `<script defer>` 사이의 차이점을 설명하세요.](#script-script-async-script-defer-사이의-차이점을-설명하세요)
- [왜 일반적으로 CSS `<link>` 태그를 `<head></head>` 태그 사이에 위치시키고, JS `<script>` 태그를 `</body>` 직전에 위치시키는 것이 좋은 방법인가요? 다른 예외적인 상황을 알고있나요?](#왜-일반적으로-css-link-태그를-headhead-태그-사이에-위치시키고-js-script-태그를-body-직전에-위치시키는-것이-좋은-방법인가요-다른-예외적인-상황을-알고있나요)
- [프로그레시브 렌더링이 무엇인가요?](#프로그레시브-렌더링이-무엇인가요)
- [이미지 태그에 `srcset` 속성을 사용하는 이유는 무엇인가요? 이 속성의 컨텐츠를 실행할 때 브라우저의 프로세스를 설명하세요.](#이미지-태그에-srcset-속성을-사용하는-이유는-무엇인가요-이-속성의-컨텐츠를-실행할-때-브라우저의-프로세스를-설명하세요)
- [다른 HTML 템플릿 언어를 사용해본 적이 있나요?](#다른-html-템플릿-언어를-사용해본-적이-있나요)

### `DOCTYPE`은 무엇을 하나요?

**DOCTYPE**은 **document type**의 약어입니다. **DOCTYPE**은 항상 **DTD(Document Type Definition)**와 관련됩니다.

**DTD**는 특정 문서가 어떻게 구성되어야 하는지 정의합니다(예시: `button`은 `span`을 포함할 수 있지만, `div`는 그럴 수 없다.), 반면, **DOCTYPE**은 문서가 _대략_ 존중할만한 **DTD**를 선언합니다. (예시: 이 문서는 HTML DTD를 존중한다.)

웹 페이지의는 DOCTYPE 선언이 필요합니다. 유저 에이전트에게 문서가 존중하는 HTML 사양의 버전을 알리는데 사용됩니다. 유저 에이전트가 올바른 DOCTYPE을 인식하면, 문서를 읽는데에 DOCTYPE과 일치하는 **no-quirks mode**를 트리거합니다. 유저 에이전트가 올바른 DOCTYPE을 인식하지 못하면, **quirks mode**를 트리거합니다.

HTML5 표준에 대한 DOCTYPE 선언은 `<!DOCTYPE html>`입니다.

###### 참고자료

- https://html.spec.whatwg.org/multipage/syntax.html#the-doctype
- https://html.spec.whatwg.org/multipage/xhtml.html
- https://quirks.spec.whatwg.org/

[[↑] Back to top](#목차)

### 여러 언어로 되어 있는 콘텐츠의 페이지를 어떻게 제공하나요?

이 질문은 다소 모호합니다. 여러 언어로 제공되는 내용의 페이지를 제공하는 방법에 대한, 가장 일반적인 경우에 대해 묻고 있다고 가정합니다. 하지만 페이지 내의 내용은 하나의 일관된 언어로만 표시되어야합니다.

HTTP 요청을 서버에 보내면, 대개 요청하는 유저 에이전트가 `Accept-Language` 헤더와 같은 기본 언어 설정에 대한 정보를 보냅니다. 그 다음 서버는 이 정보를 사용하여 해당 언어가 제공 가능한 경우, 해당 언어 버전의 문서를 반환할 수 있습니다. 반환된 HTML 문서는 `<html lang="en">...</html>`과 같이 `<html>` 태그에 `lang` 속성을 선언해야 합니다.

백엔드에서, HTML 마크업은 YML 또는 JSON 형식으로 저장된 특정 언어에 대한 `i18n` placeholder와 내용을 포함합니다. 그 다음 서버는 일반적으로 백엔드 프레임워크의 도움을 받아 특정 언어로 HTML 페이지를 동적 생성합니다.

###### 참고자료

- https://www.w3.org/International/getting-started/language

[[↑] Back to top](#목차)

### 다국어 사이트를 디자인하거나 개발할 때 주의해야할 사항은 무엇인가요?

- HTML에 `lang` 속성을 사용합니다.
- 사용자를 그들의 모국어로 안내합니다 - 사용자가 번거롭지 않도록 쉽게 국가/언어를 변경할 수 있도록 합니다.
- 텍스트를 포함한 이미지를 사용하는 것은 확장가능한 접근이 아닙니다 - 이미지에 텍스트를 배치하는 것은 잘 보이고 시스템 글꼴이 아닌 글꼴을 모든 컴퓨터에 표시하는데 여전히 널리 사용되는 방법입니다. 그러나 이미지에 텍스트를 번역하려면, 텍스트 문자열에 각 언어에 대해 만들어진 별도 이미지가 필요합니다. 이 같은 대체 방식이 늘어나면 금방 통제가 어려워집니다.
- 단어/문장 길이 제한 - 일부 언어는 다른 언어로 작성될 때 더 길어질 수도 있습니다. 디자인에 레이아웃이나 오버 플로우 문제 발생에 주의하세요. 디자인에 필요한 텍스트의 양을 정하거나, 디자인이 꺠질 수 있는 디자인은 하지 않도록 하는 것이 가장 좋습니다. 문자 수 제한은 제목, 레이블, 버튼과 같은 항목에서 사용됩니다. 본문이나 댓글과 같이 자유롭게 흐르는 텍스트에 대해서는 문제가 되지 않습니다.
- 색상이 어떻게 이해될지에 대해 주의 깊게보세요 - 색상은 언어와 문화에 따라 다르게 인식됩니다. 적절한 색상을 사용하여 디자인해야 합니다.
- 날짜와 통화 형식 - 날짜는 종종 다른 방식으로 표현됩니다. 예) 미국의 "May 31, 2012" vs. 유럽의 "31 May 2012".
- 번역된 문자열을 연결하지 않습니다 - `"오늘의 날짜는 " + date + "입니다"` 와 같은 것은 하지마세요. 단어의 순서가 다른 언어에서는 문자가 망가지게됩니다. 대신 각 언어에 대한 매개변수와 함께 템플릿 스트링을 사용하세요. 예를 들면, 영어와 한국어로된 다음 두 문장을 보세요. `I will travel on {% date %}`, `나는 {% date %}에 여행 갈거야`. 변수의 위치는 언어의 문법에 따라 달라집니다.
- 언어를 읽는 방향 - 영어는 왼쪽에서 오른쪽으로, 위에서 아래로 읽지만, 전통적인 일본어는 위에서 아래로, 오른쪽에서 왼쪽으로 읽습니다.

###### 참고자료

- https://www.quora.com/What-kind-of-things-one-should-be-wary-of-when-designing-or-developing-for-multilingual-sites

[[↑] Back to top](#목차)

### `data-`속성은 무엇에 좋은가요?

JavaScript 프레임워크가 인기있기 전에, 프론트엔드 개발자는 비표준 속성, DOM 추가 프로퍼티 등의 조작없이, DOM 자체에 추가적인 데이터를 저장하기 위해 `data-`속성을 사용했었습니다. 이는 적절한 속성이나 요소가 없는 페이지나 애플리케이션에 사용자정의 데이터를 비공개로 저장하기 위한 것입니다.

요즘에는, `data-`속성을 사용하는 것을 권장하지 않습니다. 그 이유 중 하나는 사용자가 브라우저의 inspect 기능를 사용하여 데이터 속성을 쉽게 수정할 수 있다는 것입니다. 데이터 모델은 JavaScript 자체에 더 잘 저장되며, 라이브러리나 프레임워크의 데이터 바인딩을 통해 DOM을 업데이트된 상태로 유지하는 것이 더 낫습니다.

###### 참고자료

- http://html5doctor.com/html5-custom-data-attributes/
- https://www.w3.org/TR/html5/dom.html#embedding-custom-non-visible-data-with-the-data-*-attributes

[[↑] Back to top](#목차)

### HTML5를 개방형 웹 플랫폼으로 간주할 때, HTML5의 구성 요소는 무엇인가요?

- 의미 - 콘텐츠를 보다 더 정확하게 설명할 수 있도록 허용합니다.
- 연결 - 새롭고 혁신적인 방법으로 서버와 통신할 수 있도록 허용합니다.
- 오프라인과 저장소 - 웹 페이지가 클라이언트 측에서 데이터를 로컬로 저장하여, 오프라인에서보다 효율적으로 작동하도록 허용합니다.
- 멀티미디어 - 개방형 웹에서 비디오와 오디오를 일급으로 만듭니다.
- 2D/3D 그래픽과 효과 - 훨씬 다양한 프레젠테이션 옵션을 허용합니다.
- 성능과 통합 - 컴퓨터 하드웨어의 성능 최적화와 개선으로 더 나은 사용을 제공합니다.
- 장치 접근 - 다양한 입출력 장치의 사용을 허용합니다.
- 스타일링 - 사용자가 더 세련된 테마를 사용하게 합니다.

###### 참고자료

- https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/HTML5

[[↑] Back to top](#목차)

### `cookie`, `sessionStorage`, `localStorage` 사이의 차이점을 설명하세요.

위 세 가지 기술은 모두 클라이언트 측에서 값을 저장하는 key-value 저장소 매커니즘입니다. 모두 문자열로만 값을 저장할 수 있습니다.

|  | `cookie` | `localStorage` | `sessionStorage` |
| --- | --- | --- | --- |
| 생성자 | 클라이언트나 서버. 서버는 `Set-Cookie` 헤더를 사용할 수 있습니다 | 클라이언트 | 클라이언트 |
| 만료 | 수동으로 설정 | 영구적 | 탭을 닫을 때 |
| 브라우저 세션 전체에서 지속 | 만료 설정 여부에 따라 다름 | O | X |
| 모든 HTTP 요청과 함께 서버로 보냄 | 쿠키는 `Cookie` 헤더를 통해 자동 전송됨 | X | X |
| 용량 (도메인당) | 4kb | 5MB | 5MB |
| 접근성 | 모든 윈도우 | 모든 윈도우 | 같은 탭 |

###### 참고자료

- https://developer.mozilla.org/en-US/docs/Web/HTTP/Cookies
- http://tutorial.techaltum.com/local-and-session-storage.html

[[↑] Back to top](#목차)

### `<script>`, `<script async>`, `<script defer>` 사이의 차이점을 설명하세요.

- `<script>` - HTML 파싱이 중단되고, 스크립트를 즉시 가져오고 실행되며, 스크립트 실행 후 HTML 파싱이 다시 시작됩니다.
- `<script async>` - 이 스크립트는 HTML 파싱과 병렬적으로 가져오며, 가능할 때 즉시 실행됩니다(아마 HTML 파싱이 끝나기 전). 스크립트가 페이지의 다른 스크립트들과 독립적인 경우 `async`를 사용하세요. 예) analytics.
- `<script defer>` - 이 스크립트는 HTML 파싱과 병렬적으로 가져오지만, 페이지 파싱이 끝나면 실행됩니다. 이 것이 여러개 있는 경우, 각 스크립트는 페이지에 등장한 순서대로 실행됩니다. 스크립트가 완전히 파싱된 DOM에 의존되는 경우 `defer` 속성은 스크립트를 실행하기 전에 HTML이 완전히 파싱되도록 하는데 유용합니다. `<body>`의 끝부분에 일반 `<script>`를 두는 것과 별 차이가 없습니다. `defer` 스크립트는 `document.write`를 포함하면 안됩니다.

주의: `src` 속성이 없는 스크립트 태그는 `async` 와 `defer` 속성이 무시됩니다.

###### 참고자료

- http://www.growingwiththeweb.com/2014/02/async-vs-defer-attributes.html
- https://stackoverflow.com/questions/10808109/script-tag-async-defer
- https://bitsofco.de/async-vs-defer/

[[↑] Back to top](#목차)

### 왜 일반적으로 CSS `<link>` 태그를 `<head></head>` 태그 사이에 위치시키고, JS `<script>` 태그를 `</body>` 직전에 위치시키는 것이 좋은 방법인가요? 다른 예외적인 상황을 알고있나요?

**`<head>` 안에 `<link>`를 넣는 이유**

`<link>`를 `<head>` 안에 넣는 것은 최적화된 웹사이트를 구출할 때 적절한 명세의 일부입니다. 페이지가 처음로드되면 HTML과 CSS가 동시에 파싱됩니다. HTML은 DOM(Document Object Model)을 만들고 CSS는 CSSOM (CSS Object Model)을 만듭니다. 두 가지 모두 웹사이트에서 시각적인 부분을 만드는데 필요하므로, 빠른 "first meaningful paint"를 가능하게 합니다. 이 점진적 렌더링은 사이트의 성능 점수에서 측정되는 사이트 최적화의 범주입니다. 문서 최하단에 스타일시트를 두는 것은 많은 브라우저에서 점진적 렌더링을 금지하게 되는 것입니다. 몇몇 브라우저는 스타일이 변경되면 페이지의 요소를 다시 그리는 것을 피하기 위해 렌더링을 차단합니다. 그렇게되면 사용자는 빈 하얀 페이지를 보게됩니다.

그 외에도 상단에 배치하면 페이지가 점진적으로 렌더링되기 때문에 UX가 향상됩니다. 문서 맨 아래에 CSS 를 두는 것은 Internet Explorer 를 비롯한 많은 브라우저에서 점진적 렌더링을 금지시키는 것입니다. 몇몇 브라우저는 스타일이 변경되면 페이지의 요소를 다시 그리지 않아도 되도록 렌더링을 차단합니다. 사용자는 빈 하얀 페이지에서 멈추게 됩니다. 또한 스타일이 없는 내용이 잠깐 보이는 것을 방지합니다. 다른 경우에는 스타일되지 않은 내용이 깜빡일 수 있습니다(flashes of unstyled content: FOUC).

**`</body>` 직전에 `<script>`를 넣는 이유**

`<script>`는 다운로드되고 실행되는 동안 HTML 파싱을 차단합니다. 스크립트를 맨 아래에 두면 HTML을 먼저 파싱하여 사용자에게 표시할 수 있습니다.

스크립트에 `document.write()`가 있을 때는 `<script>`를 아래쪽에 두는 것이 예외적일 수 있습니다만, 요즘은 `document.write()`를 사용하지 않는 것이 좋습니다. 또한, `<script>`를 맨 아래에 두면, 브라우저가 전체 문서가 파싱될 때까지 스크립트 다운로드를 시작할 수 없다는 것을 의미합니다. 이렇게하면 DOM 요소를 조작해야하는 코드가 오류를 발생시키지 않고 전체 스크립트를 중지시키지 않습니다. `<head>`에 `<script>`를 넣어야하는 경우, `defer` 속성을 사용하세요. HTML을 파싱한 후에 스크립트를 다운로드하고 실행하는 것과 같은 효과가 있습니다.

###### 참고자료

- https://developer.yahoo.com/performance/rules.html#css_top
- https://www.techrepublic.com/blog/web-designer/how-to-prevent-flash-of-unstyled-content-on-your-websites/
- https://developers.google.com/web/fundamentals/performance/critical-rendering-path/

[[↑] Back to top](#목차)

### 프로그레시브 렌더링이 무엇인가요?

프로그레시브 렌더링이란 콘텐츠를 가능한한 빠르게 표시하기 위해 웹 페이지의 성능을 향상시키는 데 사용되는 기술입니다. (특히, 인식되는 로딩 시간을 향상시킵니다)

예전에는 광대역 인터넷을 사용하기도 했지만 불안정한 모바일 데이터 연결이 점점 인기를 끌면서 최근 개발에 있어서도 여전히 유용합니다!

관련 기술 예시:

- 이미지 지연 로딩 - 페이지의 이미지를 한꺼번에 로딩하지 않습니다. JavaScript를 사용하여 사용자가 이미지를 표시하는 페이지 부분으로 스크롤 할 때 이미지를 로드 할 수 있습니다.
- 보이는 콘텐츠의 우선순위 설정 (또는 스크롤 없이 볼 수 있는 렌더링) - 가능한 한 빨리 표시하기 위해 사용자 브라우저에서 렌더링될 페이지에 필요한 최소한의 CSS/콘텐츠/스크립트 만 포함하면 `deferred` 스크립트를 사용하거나 `DOMContentLoaded`/`load` 이벤트를 사용하여 다른 리소스와 내용을 로드할 수 있습니다.
- 비동기 HTML 프래그먼트 - 페이지의 백엔드에서 HTML 페이지의 일부를 브라우저로 가져옵니다. 이 기술에 대한 자세한 내용은 [여기](http://www.ebaytechblog.com/2014/12/08/async-fragments-rediscovering-progressive-html-rendering-with-marko/)에서 찾을 수 있습니다.

###### 참고자료

- https://stackoverflow.com/questions/33651166/what-is-progressive-rendering
- http://www.ebaytechblog.com/2014/12/08/async-fragments-rediscovering-progressive-html-rendering-with-marko/

[[↑] Back to top](#목차)

### 이미지 태그에 `srcset` 속성을 사용하는 이유는 무엇인가요? 이 속성의 컨텐츠를 실행할 때 브라우저의 프로세스를 설명하세요.

기기의 디스플레이 너비에 따라 다른 이미지를 사용자에게 제공하려는 경우 `srcset` 속성을 사용합니다 - 레티나 디스플레이를 통해 장치에 고품질 이미지를 제공하여 사용자 경험을 향상시키고, 저해상도 이미지를 저사양 기기에 제공하여 성능을 높이고 데이터 낭비를 줄입니다. (왜냐하면 더 큰 이미지를 제공하는 것은 눈에 보일 정도의 차이가 없기 때문). 예를 들면: `<img srcset="small.jpg 500w, medium.jpg 1000w, large.jpg 2000w" src="..." alt="">`는 클라이언트의 해상도에 따라 브라우저에 small, medium, large `.jpg` 그래픽을 표시하도록 지시합니다. 첫 번째 값은 이미지 이름이고 두 번째 값은 픽셀 단위의 이미지 너비입니다. 320px 너비의 경우, 다음과 같은 계산을 따릅니다

- 500 / 320 = 1.5625
- 1000 / 320 = 3.125
- 2000 / 320 = 6.25

클라이언트의 해상도가 1x 일 경우, 1.5625가 가장 가깝고 `small.jpg`에 해당하는 `500w`가 브라우저에 의해 선택됩니다.

해상도가 레티나 (2x)인 경우 브라우저는 최소값에서 가장 위로 가까운 해상도를 사용합니다. 500w (1.5625)는 1보다 크고 이미지가 보기 좋지 않을 수 있기 때문에 선택하지 않는다는 것을 의미합니다. 그래서 브라우저는 계산 결과 비율값이 2에 가까운 1000w (3.125) 이미지를 선택합니다.

`srcset`는 데스크탑 디스플레이처럼 거대한 이미지를 필요로하지 않기 때문에 화면 장치를 좁히는 작은 이미지 파일을 제공하고자하는 문제를 해결합니다.

`srcset`는 화면이 작은 기기에서 데스크탑 디스플레이처럼 큰 이미지가 필요하지 않기 때문에 작은 이미지 파일을 제공하는 문제를 해결합니다 — 또한 선택적으로 고해상도/저해상도 화면에 다른 해상도 이미지를 제공할 수도 있습니다.

###### 참고자료

- https://developer.mozilla.org/en-US/docs/Learn/HTML/Multimedia_and_embedding/Responsive_images
- https://css-tricks.com/responsive-images-youre-just-changing-resolutions-use-srcset/

[[↑] Back to top](#목차)

### 다른 HTML 템플릿 언어를 사용해본 적이 있나요?

네, Pug (formerly Jade), ERB, Slim, Handlebars, Jinja, Liquid 등이 있습니다. 필자의 견해로, 이들은 다소 차이는 없으며, 보여줄 데이터를 조작하는 데 유용한 필터들과 내용을 escape하는 유사한 기능을 제공합니다. 대부분의 템플릿 엔진을 사용하면 표시하기 전에 처리가 필요한 이벤트에 자신의 필터를 삽입할 수 있습니다.

[[↑] Back to top](#목차)

### 다른 답변들

- https://neal.codes/blog/front-end-interview-questions-html/
- http://peterdoes.it/2015/12/03/a-personal-exercise-front-end-job-interview-questions-and-my-answers-all/
