# Mga Tanong sa HTML
Mga sagot sa [Mga Tanong sa Pakikipanayam para sa Trabahong Pangfront-end - Mga Tanong sa HTML](https://github.com/h5bp/Front-end-Developer-Interview-Questions/blob/master/questions/html-questions.md). Malugod naming tatanggaping ang mga pull request para sa mga mungkahi at mga koreksyon 

* [Ano ang ginagawa ng `DOCTYPE`?](#ano-ang-ginagawa-ng-doctype)
* [Papaano mo ihahain ang pahinang may iba't-ibang lenggwaheng nilalaman?](#papaano-mo-ihahain-ang-pahinang-may-ibat-ibang-lenggwaheng-nilalaman)
* [Anong uri ng mga bagay ang dapat mong ingatan ukol sa pagdidisenyo o pag-develop ng mga multilingual na site?](#anong-uri-ng-mga-bagay-ang-dapat-mong-ingatan-ukol-sa-pagdidisenyo-o-pag-develop-ng-mga-multilingual-na-site)
* [Saan maganda ang mga `data-`na katangian?](#saan-maganda-ang-mga-data-na-katangian)
* [Isaalang-alang ang HTML5 bilang isang bukas na web platform. Ano-ano ang mga pangunahing sangkap ng HTML5?](#isaalang-alang-ang-html5-bilang-isang-bukas-na-web-platform-ano-ano-ang-mga-pangunahing-sangkap-ng-html5)
* [Ilarawan ang pagkakaiba sa pagitan ng isang `cookie`,` sessionStorage` at `localStorage`.](#ilarawan-ang-pagkakaiba-sa-pagitan-ng-isang-cookie-sessionstorage-at-localstorage)
* [Ilarawan ang pagkakaiba sa pagitan ng `<script>`, `<script async>` at `<script defer>`.](#ilarawan-ang-pagkakaiba-sa-pagitan-ng-script-script-async-at-script-defer)
* [Bakit karaniwang magandang ideya na ilagay ang mga CSS `<link>`  sa pagitan ng `<head> </ head>` at JS `<script>` s bago ang ` / <body>`? May alam ka bang anumang mga pagbubukod?](#bakit-karaniwang-magandang-ideya-na-ilagay-ang-mga-CSS-link-sa-pagitan-ng-head-head-at-js-script-s-bago-ang-body-may-alam-ka-bang-anumang-mga-pagbubukod)
* [Ano ang progresibong pag-render?](#ano-ang-progresibong-pag-render)
* [Bakit ka gagamit ng isang `srcset` na katangian sa isang tag ng imahe? Ipaliwanag ang proseso na ginagamit ng browser sa pagsuri ng nilalaman ng katangiang ito.](#bakit-ka-gagamit-ng-isang-srcset-na-katangian-sa-isang-tag-ng-imahe-ipaliwanag-ang-proseso-na-ginagamit-ng-browser-sa-pagsuri-ng-nilalaman-ng-katangiang-ito)
* [Nakagamit ka na ba ng ibang lenggwahe sa pag-template ng HTML?](#nakagamit-ka-na-ba-ng-ibang-lenggwahe-sa-pag-template-ng-html)

### Ano ang ginagawa ng `DOCTYPE`?

Ang `DOCTYPE` ay isang pagdadaglat para sa "uri ng dokumento". Ito ay isang deklarasyon na ginagamit sa HTML upang makilala sa pagitan ng pamantayan na mode at [quirks na mode](https://quirks.spec.whatwg.org/#history). Ang presensya nito ay nagsasabi sa browser na i-render ang web page sa mga pamantayan na mode.

Moral ng kuwento - idagdag lamang ang `<! DOCTYPE html>` sa simula ng iyong pahina.

###### Mga Reperensiya

* https://stackoverflow.com/questions/7695044/what-does-doctype-html-do
* https://www.w3.org/QA/Tips/Doctype
* https://quirks.spec.whatwg.org/#history

[[↑] Bumalik sa taas](#mga-tanong-sa-html)

### Papaano mo ihahain ang pahinang may iba't-ibang lenggwaheng nilalaman?

Ang tanong ay medyo hindi malinaw, ipinapalagay ko na ito ay nagtatanong tungkol sa pinaka-karaniwang kaso, na kung paano maghain ng isang pahina na may nilalaman na magagamit sa maraming wika, ngunit ang nilalaman sa loob ng pahina ay dapat na ipakita lamang sa isang tuloy-tuloy na parehong wika.

Kapag ang isang HTTP na kahilingan ay ginawa sa isang serber, karaniwang nagpapadala ang humiling na ahente ng gumagamit ng impormasyon tungkol sa mga kagustuhan sa wika, tulad ng sa header na `Tanggapin-Wika`. Pagkatapos ay maaring gamitin ng serber ang impormasyong ito upang ibalik ang isang bersyon ng dokumento sa naaangkop na wika kung may alternatibong pwede. Ang isang ibinalik na dokumentong HTML ay dapat ding ipahayag ang `lang` na katangian sa`<html>`na tag, tulad ng`html html = 'en"> ... </ html> `.

Sa back end, ang HTML markup ay maglalaman ng mga `i18n` na placeholder at  para sa partikular na wika na naka-imbak sa mga format ng YML o JSON. Pagkatapos ay dynamikong bubuuin ng server ang pahina ng HTML na naglalaman sa partikular na wika, kadalasan sa tulong ng back end na balangkas.

###### Mga Reperensiya

* https://www.w3.org/International/getting-started/language

[[↑] Bumalik sa taas](#mga-tanong-sa-html)

### Anong uri ng mga bagay ang dapat mong ingatan ukol sa pagdidisenyo o pag-develop ng mga multilingual na site?

* Gumamit ng `lang` na katangian sa iyong HTML.
* Pag-direkta sa mga gumagamit sa kanilang katutubong wika - Payagan ang isang gumagamit na baguhin ang kanyang bansa / wika nang walang abala.
* Ang teksto sa mga imahe ay hindi isang nasusukat na diskarte - Ang paglalagay ng teksto sa isang imahe ay isang sikat pa rin na paraan upang makakuha ng mga kagandahan, di-systemang mga font na ipapakita sa anumang kompyuter. Gayunpaman upang i-translate ang teksto ng imahe, ang bawat string ng teksto ay kailangang magkaroon ng isang hiwalay na imahe na ililikha para sa bawat wika. Anumang bagay na higit pa sa isang dakot ng kapalit na tulad nito ay maaaring mabilis na mawalan ng kontrol.
* Maging maingat sa mga isyu ng layout o overflow sa disenyo. Pinakamainam na iwasan ang pagdisenyo kung saan ang halaga ng teksto ay makakasira sa isang disenyo. Ang mga bilang ng mga character ay nakikipaglaro sa mga bagay na tulad ng mga headline, mga label, at mga pindutan. Mas mababa ang mga ito sa isang isyu sa libreng dumadaloy na teksto tulad ng teksto ng katawan o mga komento.
* Pag-isipan kung paano nakikita ang mga kulay - Ang mga kulay ay itinuturing na isang paghatol din sa mga wika at kultura. Ang disenyo ay dapat gumamit ng kulay kung ano man ang naaangkop.
* Mga petsa at pera sa pag-format - Ang mga petsa ng kalendaryo ay ipinapahayag minsan sa iba't ibang paraan. Halimbawa, "Mayo 31, 2012" sa U.S. kumpara sa "31 Mayo 2012" sa mga bahagi ng Europa.
* Huwag pagsama-samahin ang mga isinalin na mga string - Huwag gumawa ng anumang bagay tulad ng `"Ang petsa ngayon ay "+ date`.Ito ay makasisira sa mga wika na may iba't ibang pagkasunod-sunod ng mga salita. Gumamit ng isang string ng template na may mga parameter na pagpapalit para sa bawat wika sa halip. Halimbawa, tingnan ang sumusunod na dalawang pangungusap sa wikang Ingles at Tsino: `Maglalakbay ako sa {% date%}` at `{% date%} 我 会 出发`. Tandaan na ang posisyon ng variable ay naiiba dahil sa mga tuntunin ng grammar ng wika.
* Direksyon sa pagbabasa ng wika - Sa Ingles, binabasa namin mula sa kaliwa papuntang kanan, mula itaas papuntang pailalim, habang sa tradisyunal na Hapon naman, ang teksto ay binabasa nang pababa, mula kanan papuntang kaliwa.

###### Mga Reperensiya

* https://www.quora.com/What-kind-of-things-one-should-be-wary-of-when-designing-or-developing-for-multilingual-sites

[[↑] Bumalik sa taas](#mga-tanong-sa-html)

### Saan maganda ang mga `data-`na katangian?

Bago pa man naging sikat ang mga balangkas ng JavaScript, ginagamit na ng mga front-end developer ang mga katangian ng `data-` upang mag-imbak ng sobrang data sa loob mismo ng DOM, nang walang iba pang mga hack gaya ng mga di-karaniwang mga katangian, mga dagdag na katangian sa DOM. Ito ay inilaan upang mag-imbak ng pribadong pasadyang data sa pahina o aplikasyon, na kung saan walang mas naaangkop na mga katangian o mga elemento.

These days, using `data-` attributes is not encouraged. One reason is that users can modify the data attribute easily by using inspect element in the browser. The data model is better stored within JavaScript itself and stay updated with the DOM via data binding possibly through a library or a framework.

###### Mga Reperensiya

* http://html5doctor.com/html5-custom-data-attributes/
* https://www.w3.org/TR/html5/dom.html#embedding-custom-non-visible-data-with-the-data-*-attributes

[[↑] Bumalik sa taas](#mga-tanong-sa-html)

### Isaalang-alang ang HTML5 bilang isang bukas na web platform. Ano-ano ang mga pangunahing sangkap ng HTML5?

* Semantics - Allowing you to describe more precisely what your content is.
* Connectivity - Allowing you to communicate with the server in new and innovative ways.
* Offline and storage - Allowing webpages to store data on the client-side locally and operate offline more efficiently.
* Multimedia - Making video and audio first-class citizens in the Open Web.
* 2D/3D graphics and effects - Allowing a much more diverse range of presentation options.
* Performance and integration - Providing greater speed optimization and better usage of computer hardware.
* Device access - Allowing for the usage of various input and output devices.
* Styling - Letting authors write more sophisticated themes.

###### Mga Reperensiya

* https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/HTML5

[[↑] Bumalik sa taas](#mga-tanong-sa-html)

### Ilarawan ang pagkakaiba sa pagitan ng isang `cookie`,` sessionStorage` at `localStorage`.

All the above mentioned technologies are key-value storage mechanisms on the client side. They are only able to store values as strings.

|                                        | `cookie`                                                 | `localStorage` | `sessionStorage` |
| -------------------------------------- | -------------------------------------------------------- | -------------- | ---------------- |
| Initiator                              | Client or server. Server can use `Set-Cookie` header     | Client         | Client           |
| Expiry                                 | Manually set                                             | Forever        | On tab close     |
| Persistent across browser sessions     | Depends on whether expiration is set                     | Yes            | No               |
| Have domain associated                 | Yes                                                      | No             | No               |
| Sent to server with every HTTP request | Cookies are automatically being sent via `Cookie` header | No             | No               |
| Capacity (per domain)                  | 4kb                                                      | 5MB            | 5MB              |
| Accessibility                          | Any window                                               | Any window     | Same tab         |

###### Mga Reperensiya

* https://developer.mozilla.org/en-US/docs/Web/HTTP/Cookies
* http://tutorial.techaltum.com/local-and-session-storage.html

[[↑] Bumalik sa taas](#mga-tanong-sa-html)

### Ilarawan ang pagkakaiba sa pagitan ng `<script>`, `<script async>` at `<script defer>`.

* `<script>` - HTML parsing is blocked, the script is fetched and executed immediately, HTML parsing resumes after the script is executed.
* `<script async>` - The script will be fetched in parallel to HTML parsing and executed as soon as it is available (potentially before HTML parsing completes). Use `async` when the script is independent of any other scripts on the page, for example analytics.
* `<script defer>` - The script will be fetched in parallel to HTML parsing and executed when the page has finished parsing. If there are multiple of them, each deferred script is executed in the order they were encoun­tered in the document. If a script relies on a fully-parsed DOM, the `defer` attribute will be useful in ensuring that the HTML is fully parsed before executing. There's not much difference from putting a normal `<script>` at the end of `<body>`. A deferred script must not contain `document.write`.

Note: The `async` and `defer` attrib­utes are ignored for scripts that have no `src` attribute.

###### Mga Reperensiya

* http://www.growingwiththeweb.com/2014/02/async-vs-defer-attributes.html
* https://stackoverflow.com/questions/10808109/script-tag-async-defer
* https://bitsofco.de/async-vs-defer/

[[↑] Bumalik sa taas](#mga-tanong-sa-html)

### Bakit karaniwang magandang ideya na ilagay ang mga CSS `<link>`  sa pagitan ng `<head> </ head>` at JS `<script>` s bago ang ` / <body>`? May alam ka bang anumang mga pagbubukod?

**Placing `<link>`s in the `<head>`**

Putting `<link>`s in the head is part of the specification. Besides that, placing at the top allows the page to render progressively which improves user experience. The problem with putting stylesheets near the bottom of the document is that it prohibits progressive rendering in many browsers, including Internet Explorer. Some browsers block rendering to avoid having to repaint elements of the page if their styles change. The user is stuck viewing a blank white page. It prevents the flash of unstyled contents.

**Placing `<script>`s just before `</body>`**

`<script>`s block HTML parsing while they are being downloaded and executed. Downloading the scripts at the bottom will allow the HTML to be parsed and displayed to the user first.

An exception for positioning of `<script>`s at the bottom is when your script contains `document.write()`, but these days it's not a good practice to use `document.write()`. Also, placing `<script>`s at the bottom means that the browser cannot start downloading the scripts until the entire document is parsed. One possible workaround is to put `<script>` in the `<head>` and use the `defer` attribute.

###### Mga Reperensiya

* https://developer.yahoo.com/performance/rules.html#css_top

[[↑] Bumalik sa taas](#mga-tanong-sa-html)

### Ano ang progresibong pag-render?

Progressive rendering is the name given to techniques used to improve performance of a webpage (in particular, improve perceived load time) to render content for display as quickly as possible.

It used to be much more prevalent in the days before broadband internet but it is still useful in modern development as mobile data connections are becoming increasingly popular (and unreliable)!

Examples of such techniques:

* Lazy loading of images - Images on the page are not loaded all at once. JavaScript will be used to load an image when the user scrolls into the part of the page that displays the image.
* Prioritizing visible content (or above-the-fold rendering) - Include only the minimum CSS/content/scripts necessary for the amount of page that would be rendered in the users browser first to display as quickly as possible, you can then use deferred scripts or listen for the `DOMContentLoaded`/`load` event to load in other resources and content.
* Async HTML fragments - Flushing parts of the HTML to the browser as the page is constructed on the back end. More details on the technique can be found [here](http://www.ebaytechblog.com/2014/12/08/async-fragments-rediscovering-progressive-html-rendering-with-marko/).

###### Mga Reperensiya

* https://stackoverflow.com/questions/33651166/what-is-progressive-rendering
* http://www.ebaytechblog.com/2014/12/08/async-fragments-rediscovering-progressive-html-rendering-with-marko/

[[↑] Bumalik sa taas](#mga-tanong-sa-html)

### Bakit ka gagamit ng isang `srcset` na katangian sa isang tag ng imahe? Ipaliwanag ang proseso na ginagamit ng browser sa pagsuri ng nilalaman ng katangiang ito.

TODO

[[↑] Bumalik sa taas](#mga-tanong-sa-html)

### Nakagamit ka na ba ng ibang lenggwahe sa pag-template ng HTML?

Yes, Pug (formerly Jade), ERB, Slim, Handlebars, Jinja, Liquid, just to name a few. In my opinion, they are more or less the same and provide similar functionality of escaping content and helpful filters for manipulating the data to be displayed. Most templating engines will also allow you to inject your own filters in the event you need custom processing before display.

[[↑] Bumalik sa taas](#mga-tanong-sa-html)

### Mga Ibang Sagot

* https://neal.codes/blog/front-end-interview-questions-html/
* http://peterdoes.it/2015/12/03/a-personal-exercise-front-end-job-interview-questions-and-my-answers-all/

---
