# HTML 问题

本章节是[前端开发者面试问题 - HTML 部分](https://github.com/h5bp/Front-end-Developer-Interview-Questions#html-questions)的参考答案。 欢迎提出 PR 进行建议和指正！

* [`DOCTYPE`有什么用？](#doctype有什么用)
* [如何提供包含多种语言内容的页面？](#如何提供包含多种语言内容的页面)
* [在设计开发多语言网站时，需要留心哪些事情？](#在设计开发多语言网站时需要留心哪些事情)
* [什么是`data-`属性？](#什么是data-属性)
* [将 HTML5 看作成开放的网络平台，什么是 HTML5 的基本构件（building block）？](#将-html5-看作成开放的网络平台什么是-html5-的基本构件building-block)
* [请描述`cookie`、`sessionStorage`和`localStorage`的区别。](#请描述cookiesessionstorage和localstorage的区别)
* [请描述`<script>`、`<script async>`和`<script defer>`的区别。](#请描述scriptscript-async和script-defer的区别)
* [为什么最好把 CSS 的`<link>`标签放在`<head></head>`之间？为什么最好把 JS 的`<script>`标签恰好放在`</body>`之前，有例外情况吗？](#为什么最好把css的link标签放在headhead之间为什么最好把js的script标签恰好放在body之前有例外情况吗)
* [什么是渐进式渲染（progressive rendering）？](#什么是渐进式渲染progressive-rendering)
* [为什么在`<img>`标签中使用`srcset`属性？请描述浏览器遇到该属性后的处理过程。](#为什么在img标签中使用srcset属性请描述浏览器遇到该属性后的处理过程)
* [你有过使用不同模版语言的经历吗？](#你有过使用不同模版语言的经历吗)

### `DOCTYPE`有什么用？

`DOCTYPE`是“document type”的缩写。它是 HTML 中用来区分标准模式和[怪异模式](https://quirks.spec.whatwg.org/#history)的声明，用来告知浏览器使用标准模式渲染页面。

从中获得的启发：在页面开始处添加`<!DOCTYPE html>`即可。

###### 参考

* https://stackoverflow.com/questions/7695044/what-does-doctype-html-do
* https://www.w3.org/QA/Tips/Doctype
* https://quirks.spec.whatwg.org/#history

[[↑] 回到顶部](#html-问题)

### 如何提供包含多种语言内容的页面？

这个问题有点问得含糊其辞，我认为这是在询问最常见的情况：如何提供包含多种语言内容的页面，并保证页面内容语言的一致性。

当客户端向服务器发送 HTTP 请求时，通常会发送有关语言首选项的信息，比如使用`Accept-Language`请求头。如果替换语言存在，服务器可以利用该信息返回与之相匹配的 HTML 文档。返回的 HTML 文档还应在`<html>`标签中声明`lang`属性，比如`<html lang="en">...</html>`

在后台中，HTML 将包含`i18n`占位符和待以替换的内容，这些按照不同语言，以 YML 或 JSON 格式存储。然后，服务器将动态生成指定语言内容的 HTML 页面。整个过程通常需要借助后台框架实现。

###### 参考

* https://www.w3.org/International/getting-started/language

[[↑] 回到顶部](#html-问题)

### 在设计开发多语言网站时，需要留心哪些事情？

* 在 HTML 中使用`lang`属性。
* 引导用户切换到自己的母语——让用户能够轻松地切换到自己的国家或语言，而不用麻烦。
* 在图片中展示文本会阻碍网站规模增长——把文本放在图片中展示，仍然是一种非常流行的方式。这样做可以在所有终端上，都能显示出美观的非系统字体。然而，为了翻译图片中的文本，需要为每种语言单独创建对应的图片，这种做法很容易在图片数量不断增长的过程中失控。
* 限制词语或句子的长度——网页内容在使用其他语言表述时，文字长度会发生变化。设计时，需要警惕文字长度溢出布局的问题，最好不要使用受文字长度影响较大的设计。比如标题、标签、按钮的设计，往往很受文字长度影响，这些设计中的文字与正文或评论部分不同，一般不可以自由换行。
* 注意颜色的使用——颜色在不同的语言和文化中，意义和感受是不同的。设计时应该使用恰当的颜色。
* 日期和货币的格式化——日期在不同的国家和地区，会以不同的方式显示。比如美国的日期格式是“May 31, 2012”，而在欧洲部分地区，日期格式是“31 May 2012”。
* 不要使用连接的翻译字符串——不要做类似这样的事情，比如`“今天的日期是”+具体日期`。这样做可能会打乱其他语言的语序。替代方案是，为每种语言编写带变量替换的模版字符串。请看下面两个分别用英语和中文表示的句子：`I will travel on {% date %}`和`{% date %} 我会出发`。可以看到，语言的语法规则不同，变量的位置是不同的。
* 注意语言阅读的方向——在英语中，文字是从左向右阅读的；而在传统日语中，文字是从右向左阅读的。

###### 参考

* https://www.quora.com/What-kind-of-things-one-should-be-wary-of-when-designing-or-developing-for-multilingual-sites

[[↑] 回到顶部](#html-问题)

### 什么是`data-`属性？

在 JavaScript 框架变得流行之前，前端开发者经常使用`data-`属性，把额外数据存储在 DOM 自身中。当时没有其他 Hack 手段（比如使用非标准属性或 DOM 上额外属性）。这样做是为了将自定义数据存储到页面或应用中，对此没有其他更适当的属性或元素。

而现在，不鼓励使用`data-`属性。原因之一是，用户可以通过在浏览器中利用检查元素，轻松地修改属性值，借此修改数据。数据模型最好存储在 JavaScript 本身中，并利用框架提供的数据绑定，使之与 DOM 保持更新。

###### 参考

* http://html5doctor.com/html5-custom-data-attributes/
* https://www.w3.org/TR/html5/dom.html#embedding-custom-non-visible-data-with-the-data-*-attributes

[[↑] 回到顶部](#html-问题)

### 将 HTML5 看作成开放的网络平台，什么是 HTML5 的基本构件（building block）？

* 语义 - 提供更准确地描述内容。
* 连接 - 提供新的方式与服务器通信。
* 离线和存储 - 允许网页在本地存储数据并有效地离线运行。
* 多媒体 - 在 Open Web 中，视频和音频被视为一等公民（first-class citizens）。
* 2D/3D 图形和特效 - 提供更多种演示选项。
* 性能和集成 - 提供更快的访问速度和性能更好的计算机硬件。
* 设备访问 - 允许使用各种输入、输出设备。
* 外观 - 可以开发丰富的主题。

###### 参考

* https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/HTML5

[[↑] 回到顶部](#html-问题)

### 请描述`cookie`、`sessionStorage`和`localStorage`的区别。

上面提到的技术名词，都是在客户端以键值对存储的存储机制，并且只能将值存储为字符串。

|                                                    | `cookie`                                           | `localStorage` | `sessionStorage` |
| -------------------------------------------------- | -------------------------------------------------- | -------------- | ---------------- |
| 由谁初始化                                         | 客户端或服务器，服务器可以使用`Set-Cookie`请求头。 | 客户端         | 客户端           |
| 过期时间                                           | 手动设置                                           | 永不过期       | 当前页面关闭时   |
| 在当前浏览器会话（browser sessions）中是否保持不变 | 取决于是否设置了过期时间                           | 是             | 否               |
| 是否随着每个 HTTP 请求发送给服务器                 | 是，Cookies 会通过`Cookie`请求头，自动发送给服务器 | 否             | 否               |
| 容量（每个域名）                                   | 4kb                                                | 5MB            | 5MB              |
| 访问权限                                           | 任意窗口                                           | 任意窗口       | 当前页面窗口     |

###### 参考

* https://developer.mozilla.org/en-US/docs/Web/HTTP/Cookies
* http://tutorial.techaltum.com/local-and-session-storage.html

[[↑] 回到顶部](#html-问题)

### 请描述`<script>`、`<script async>`和`<script defer>`的区别。

* `<script>` - HTML 解析中断，脚本被提取并立即执行。执行结束后，HTML 解析继续。
* `<script async>` - 脚本的提取、执行的过程与 HTML 解析过程并行，脚本执行完毕可能在 HTML 解析完毕之前。当脚本与页面上其他脚本独立时，可以使用`async`，比如用作页面统计分析。
* `<script defer>` - 脚本仅提取过程与 HTML 解析过程并行，脚本的执行将在 HTML 解析完毕后进行。如果有多个含`defer`的脚本，脚本的执行顺序将按照在 document 中出现的位置，从上到下顺序执行。

注意：没有`src`属性的脚本，`async`和`defer`属性会被忽略。

###### 参考

* http://www.growingwiththeweb.com/2014/02/async-vs-defer-attributes.html
* https://stackoverflow.com/questions/10808109/script-tag-async-defer
* https://bitsofco.de/async-vs-defer/

[[↑] 回到顶部](#html-问题)

### 为什么最好把 CSS 的`<link>`标签放在`<head></head>`之间？为什么最好把 JS 的`<script>`标签恰好放在`</body>`之前，有例外情况吗？

**把`<link>`放在`<head>`中**

把`<link>`标签放在`<head></head>`之间是规范要求的内容。此外，这种做法可以让页面逐步呈现，提高了用户体验。将样式表放在文档底部附近，会使许多浏览器（包括 Internet Explorer）不能逐步呈现页面。一些浏览器会阻止渲染，以避免在页面样式发生变化时，重新绘制页面中的元素。这种做法可以防止呈现给用户空白的页面或没有样式的内容。

**把`<script>`标签恰好放在`</body>`之前**

脚本在下载和执行期间会阻止 HTML 解析。把`<script>`标签放在底部，保证 HTML 首先完成解析，将页面尽早呈现给用户。

例外情况是当你的脚本里包含`document.write()`时。但是现在，`document.write()`不推荐使用。同时，将`<script>`标签放在底部，意味着浏览器不能开始下载脚本，直到整个文档（document）被解析。也许，对此比较好的做法是，`<script>`使用`defer`属性，放在`<head>`中。

###### 参考

* https://developer.yahoo.com/performance/rules.html#css_top

[[↑] 回到顶部](#html-问题)

### 什么是渐进式渲染（progressive rendering）？

渐进式渲染是用于提高网页性能（尤其是提高用户感知的加载速度），以尽快呈现页面的技术。

在以前互联网带宽较小的时期，这种技术更为普遍。如今，移动终端的盛行，而移动网络往往不稳定，渐进式渲染在现代前端开发中仍然有用武之地。

一些举例：

* 图片懒加载——页面上的图片不会一次性全部加载。当用户滚动页面到图片部分时，JavaScript 将加载并显示图像。
* 确定显示内容的优先级（分层次渲染）——为了尽快将页面呈现给用户，页面只包含基本的最少量的 CSS、脚本和内容，然后可以使用延迟加载脚本或监听`DOMContentLoaded`/`load`事件加载其他资源和内容。
* 异步加载 HTML 片段——当页面通过后台渲染时，把 HTML 拆分，通过异步请求，分块发送给浏览器。更多相关细节可以在[这里](http://www.ebaytechblog.com/2014/12/08/async-fragments-rediscovering-progressive-html-rendering-with-marko/)找到。

###### 参考

* https://stackoverflow.com/questions/33651166/what-is-progressive-rendering
* http://www.ebaytechblog.com/2014/12/08/async-fragments-rediscovering-progressive-html-rendering-with-marko/

[[↑] 回到顶部](#html-问题)

### 为什么在`<img>`标签中使用`srcset`属性？请描述浏览器遇到该属性后的处理过程。

因为需要设计响应式图片。我们可以使用两个新的属性——`srcset` 和 `sizes`——来提供更多额外的资源图像和提示，帮助浏览器选择正确的一个资源。

**srcset** 定义了我们允许浏览器选择的图像集，以及每个图像的大小。

**sizes** 定义了一组媒体条件（例如屏幕宽度）并且指明当某些媒体条件为真时，什么样的图片尺寸是最佳选择。

所以，有了这些属性，浏览器会：

1. 查看设备宽度
2. 检查 sizes 列表中哪个媒体条件是第一个为真
3. 查看给予该媒体查询的槽大小
4. 加载 srcset 列表中引用的最接近所选的槽大小的图像

###### 参考

* https://developer.mozilla.org/zh-CN/docs/Learn/HTML/Multimedia_and_embedding/Responsive_images

[[↑] 回到顶部](#html-问题)

### 你有过使用不同模版语言的经历吗？

有过，比如 Pug （以前叫 Jade）、 ERB、 Slim、 Handlebars、 Jinja、 Liquid 等等。在我看来，这些模版语言大多是相似的，都提供了用于展示数据的内容替换和过滤器的功能。大部分模版引擎都支持自定义过滤器，以展示自定义格式的内容。

[[↑] 回到顶部](#html-问题)

### 其它答案

* https://neal.codes/blog/front-end-interview-questions-html/
* http://peterdoes.it/2015/12/03/a-personal-exercise-front-end-job-interview-questions-and-my-answers-all/

---
