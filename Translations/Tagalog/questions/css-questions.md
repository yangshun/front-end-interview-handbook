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


1. Ang `a` ay kung ginagamit ang mga inline na estilo. Kung ang deklarasyon ng katangian ay isang estilo ng inline sa elemento,Ang `a` ay 1, ang iba ay 0.
2. Ang `b` ay ang bilang ng mga tagapili ng ID.
3. Ang `c` ay bilang ng mga klase, mga katangian at mga tagapili ng pseudo na klase.
4. Ang `d` ang bilang ng mga tag at mga pseudo na elemento na mga tagapili.

Ang resulta ng pagkakatukoy ay hindi isang marka, ngunit isang matrix ng mga halaga na maaaring ikumpara ng haligi sa haligi. Kapag tinutukoy ang mga tagapili upang matukoy kung alin ang may pinakamataas na pagtitiyak, hanapin mula sa kaliwa hanggang kanan, at ihambing ang pinakamataas na halaga sa bawat haligi. kaya ang halaga sa haligi ng `b` ay susubusin ang mga halaga sa mga haligi ng `c` at `d`, kahit na ano pa yan sila. Dahil dito, ang pagtitiyak ng `0,1,0,0` ay mas malaki kesa sa `0,0,10,10`.

Sa mga kaso ng pantay na pagtitiyak: ang pinakabagong tuntunin ay ang siyang binibilangin. Kung isinulat mo ang parehong patakaran sa iyong style sheetsheet na pang-estilo (kahit na anuman ang panloob o panlabas) ng dalawang beses, pagkatapos ay ang mas mababang panuntunan sa iyong estilo ng sheet ay mas malapit sa elemento na gagawan ng estilo, ito ay itinuturing na mas tiyak at samakatuwid ay ilalapat.

Mas gusto kong magsulat ng mga CSS na panuntunan na may mababang pagtitiyak ng sa ganun ay madali silang i-override kung kinakailangan. Sa pagsusulat ng mga CSS UI na component library code, mahalaga na magkaroon sila ng mababang mga partikularidad ng sa ganun ay maaaring i-override sila ng mga gumagamit ng librerya nang hindi gumagamit ng masyadong komplikadong mga panuntunan sa CSS para lang sa kapakanan ng pagdaragdag ng pagtitiyak o humantong sa `!important`.

###### Mga Reperensiya

* https://www.smashingmagazine.com/2007/07/css-specificity-things-you-should-know/
* https://www.sitepoint.com/web-foundations/specificity/

[[↑] Bumalik sa taas](#mga-katanungan-sa-css)

### Ano ang pagkakaiba sa pagitan ng "pag-reset" at "pag-normalize" ng CSS? saan sa dalawa ang iyong pipiliin, at bakit?

* **Pag-reset** - Ang pag-reset ay sinadya upang i-strip ang lahat ng mga default na pag-istilo ng browser sa mga elemento. Halimbawa. mga `margin`,mga `padding`,mga `font-size` ng lahat ng mga elemento ay naka-set upang maging pareho. Kakailanganin mong ideklara ulit ang estilo para sa karaniwang mga elemento ng tipograpiya.
* **Pag-normalize** - Ang pag-normalize ay pinapanatili ang kapaki-pakinabang na mga estilo ng default sa halip na i-unstyle ang lahat. Iniayos din nito ang mga bug para sa mga karaniwang dependensya ng browser.

Mas pipiliin ko ang pagreset kung meron man akong mas pinasadya o hindi tipikal na disenyo ng site tulad ng kailangan kong gawin sa karamihan ng aking sariling estilo at hindi kailangan ng anumang mga default na estilo para sa pag-aalaga.

###### Mga Reperensiya

* https://stackoverflow.com/questions/6887336/what-is-the-difference-between-normalize-css-and-reset-css

[[↑] Bumalik sa taas](#mga-katanungan-sa-css)

### Ilarawan ang mga `float` at kung paano sila gumagana.

Ang Float ay isang katangian ng CSS sa pagpoposisyon. Ang mga floated  na elemento ay mananatili na isang bahagi ng daloy ng pahina, at makakaapekto sa pagpoposisyon ng mga elemento (e.g. ang teksto ay dadaloy sa palibot ng mga floated na elemento), di kagaya ng mga `position: absolute` na elemento, na inalis mula sa daloy ng pahina.

Ang CSS na `clear` na katangian ay magagamit sa pagpoposisyon sa ilalim ng `left`/`right`/`both` na mga floated na elemento.

Kung ang isang magulang na elemento ay naglalaman ng walang anuman kundi mga floated na elemento, ang taas nito ay babagsak hanggang sa walang matitira. Maaari itong maayos sa pamamagitan ng pag-clear ng float pagkatapos ng mga floated na elemento sa lalagyan ngunit bago muna ang pagsasara ng lalagyan.

Ang `.clearfix` na hack ay gumagamit ng isang wais na CSS pseudo na selector na (`:after`) para linisin ang mga float. Sa halip na itakda ang overflow sa magulang, Mag-aaply ka ng karagdagang klase ng `clearfix` dito. Pagkatapos ay ilapat ang CSS na ito:

```css
.clearfix:after {
  content: ' ';
  visibility: hidden;
  display: block;
  height: 0;
  clear: both;
}
```

Bilang alternatibo, Ibigay ang `overflow: auto` o `overflow: hidden` na katangian sa magulang na elemento na magtatatag ng isang bagong bloke sa pag-format ng konteksto sa loob ng mga bata at lalawak ito upang maglaman ng mga anak nito.

###### Mga Reperensiya

* https://css-tricks.com/all-about-floats/

[[↑] Bumalik sa taas](#mga-katanungan-sa-css)

### Ilarawan ang z-index at kung papaano nabuo ang konteksto.

Ang `z-index` na katangian sa CSS ay kumokontrol sa bertikal na pagkaka-ayos na pagkakasalansan ng mga elemento na sumasapaw. Ang `z-index` ay nakakaapekto lamang sa mga elemento na may `position` na may halagang hindi `static`.

Kung walang kahit na anong `z-index` na halaga, ang mga elemento ay nakasalansan sa pagkakasunud-sunod na lumilitaw sa mga DOM (ang pinakamababang mababa sa parehong antas ng herakiya ay lilitaw sa itaas).Ang mga elemento na may non-static na pagpoposisyon (at ang kanilang mga anak) ay laging makikita sa itaas ng mga elementong may default na static na pagpoposisyon, hindi alintana ang HTML na herarkiya.

Ang isang konteksto ng pagsalansan ay isang elemento na naglalaman ng set ng mga layer. Sa loob ng isang lokal na kontekstong nakasalansan, ang `z-index` na mga halaga sa mga anak nito ay naka-set na kamag-anak sa elementong iyon kaysa sa ugat ng dokumento. Ang mga layers ng nasa labas ng kontekstong iyon — i.e. mga elemento ng kapatid sa isang lokal na kontekstong nakasalansan — ay hindi makakaupo sa pagitan ng mga layer sa loob nito. Kung ang elementong B ay uupo sa itaas ng elementong A, ang isang anak na elemento ng elementong  A, elementong C, ay hindi kailanman mas mataas kesa sa elementong B kahit na ang elementong C ay may mas mataas na `z-index` kesa sa elementong B.

Ang bawat kontekstong nakasalansan ay nakatimpi - matapos ang mga nilalaman ng elemento ay nakasalansan, Ang buong elemento ay isinasaalang-alang sa pagkakasunud-sunod ng pagkakasalansan sa magulang na kontekstong nakasalansan. Ang isang maliit na bilang ng mga katangian ng CSS ay sumasanhi ng isang bagong kontekstong nakasalansan, kagaya ng `opacity` na mas mababa sa 1, `filter` na hindi `none`, at `transform` na hindi `none`.

###### Mga Reperensiya

* https://css-tricks.com/almanac/properties/z/z-index/
* https://philipwalton.com/articles/what-no-one-told-you-about-z-index/
* https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Positioning/Understanding_z_index/The_stacking_context

[[↑] Bumalik sa taas](#mga-katanungan-sa-css)

### Ilarawan ang BFK (Block Formatting na Konteksto) at papaaano ito gumagana.

Ang Block Formatting na Konteksto (BFK) ay parte ng biswal na pagrender ng css ng isang pahina ng web na kung saan ang mga bloke na kahon ay inilatag. Ang mga floats, ganap na mga nakaposisyon na mga elemento, `inline-blocks`, `table-cells`, mga `table-caption`, at mga elemento na may `overflow` maliban sa `visible` (maliban kung ang halaga na ito ay pinalaganap sa viewport) na magtatag ng mga bagong konteksto sa pag-format ng bloke
.

Ang BFK ay isang HTML na kahon na natutugunan ng hindi bababa sa isa sa mga sumusunod na kondisyon:

* Ang halaga ng `float` ay hindi `none`.
* Ang halaga ng `position` ay hindi `static` o `relative`.
* Ang halaga ng `display` ay `table-cell`, `table-caption`, `inline-block`, `flex`, o `inline-flex`.
* Ang halaga ng `overflow` ay hindi `visible`.

Sa isang BFK, hinawakan ang kaliwang panlabas na gilid ng bawat kahon ang kaliwang gilid ng bloke na naglalaman
 (for right-to-left formatting, right edges touch).

Ang mga bertikal na margin sa pagitan ng mga katabing kahon ng block-level sa isang pagbagsak ng BFK. Magpasa pa sa [Mga margin na bumabagsak](https://www.sitepoint.com/web-foundations/collapsing-margins/).

###### Mga Reperensiya

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
