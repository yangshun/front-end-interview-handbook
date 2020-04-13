---
title: Mga Tanong sa JS
---

Mga Sagot sa [Mga Tanong sa Pakikipanayam sa Trabahong Pangfront-end - Mga Tanong sa JS](https://github.com/h5bp/Front-end-Developer-Interview-Questions/blob/master/src/questions/javascript-questions.md). Ang mga pull request para sa mga suhestyon at koreksyon ay malugod na tatanggapin

## Talaan ng nilalaman

- [Ipaliwanag ang delegasyon ng kaganapan](#ipaliwanag-ang-delegasyon-ng-kaganapan)
- [Ipaliwanag kung paano gumagana ang `this` na ito sa JavaScript](#ipaliwanag-kung-paano-gumagana-ang-this-na-ito-sa-javascript)
- [Ipaliwanag kung paano gumagana ang prototypal na pagmamana](#ipaliwanag-kung-paano-gumagana-ang-prototypal-na-pagmamana)
- [Ano ang iyong naiisip sa AMD laban sa CommonJS?](#ano-ang-iyong-naiisip-sa-amd-laban-sa-commonjs)
- [Ipaliwanag kung bakit ang mga sumusunod ay hindi gumagana bilang isang IIFE: `function foo(){ }();`. Ano ang kailangang baguhin upang gawing maayos itong IIFE?](#ipaliwanag-kung-bakit-ang-mga-sumusunod-ay-hindi-gumagana-bilang-isang-iife-function-foo--ano-ang-kailangang-baguhin-upang-gawing-maayos-itong-iife)
- [Ano ang kaibahan sa pagitan ng isang variable na: `null`, `undefined` o hindi naipahayag? Paano mo gagawin ang pag-check para sa alinman sa mga kalagayang ito?](#ano-ang-kaibahan-sa-pagitan-ng-isang-variable-na-null-undefined-o-hindi-naipahayag-paano-mo-gagawin-ang-pag-check-para-sa-alinman-sa-mga-kalagayang-ito)
- [Ano ang pagsasara, at paano mo gagamitin ang isa sa mga ito?](#ano-ang-pagsasara-at-paano-mo-gagamitin-ang-isa-sa-mga-ito)
- [Mailalarawan mo ba ang pangunahing pagkakaiba sa pagitan ng isang `.forEach` na loop at isang `.Map()` na loop at bakit kailangan mo lang pumili ng isa mula sa dalawa?](#mailalarawan-mo-ba-ang-pangunahing-pagkakaiba-sa-pagitan-ng-isang-foreach-na-loop-at-isang-map-na-loop-at-bakit-kailangan-mo-lang-pumili-ng-isa-mula-sa-dalawa?)
- [Ano ang isang tipikal na kaso ng paggamit para sa mga hindi kilalang punksyon?](#ano-ang-isang-tipikal-na-kaso-ng-paggamit-para-sa-mga-hindi-kilalang-punksyon)
- [Paano mo inaayos ang iyong code? (modular na pattern, makalumang pagmamana?)](#paano-mo-inaayos-ang-iyong-code-modular-na-pattern-makalumang-pagmamana)
- [Ano ang pagkakaiba sa pagitan ng mga host na bagay at mga likas na bagay?](#ano-ang-pagkakaiba-sa-pagitan-ng-mga-host-na-bagay-at-mga-likas-na-bagay)
- [Kaibahan sa pagitan ng: punksyon na `Person(){}`, `var person = Person()`, at `var person = new Person()`?](#kaibahan-sa-pagitan-ng-punksyon-na-person-var-person--person-var-person--new-person)
- [Ano ang pagkakaiba sa pagitan ng `.call` at `.apply`?](#ano-ang-pagkakaiba-sa-pagitan-ng-call-at-apply)
- [Ipaliwanag ang `Function.prototype.bind`.](#ipaliwanag-ang-functionprototypebind)
- [Kelan ka gagamit ng `document.write()`?](#kelan-ka-gagamit-ng-documentwrite)
- [Ano ang kaibahan sa pagitan ng pagtukoy na tampok, tampok na pagkakilala, at paggamit ng UA na string?](#ano-ang-kaibahan-sa-pagitan-ng-pagtukoy-na-tampok-tampok-na-pagkakilala-at-paggamit-ng-Uua-na-string)
- [Ipaliwanag ang Ajax sa mas detalyadong pamamaraan hangga't maaari.](#ipaliwanag-ang-ajax-sa-mas-detalyadong-pamamaraan-hanggat-maaari)
- [Ano ang mga kalamangan at di-kalamangan ng paggamit ng Ajax?](#ano-ang-mga-kalamangan-at-di-kalamangan-ng-paggamit-ng-ajax)
- [Ipaliwanag kung papaano gumagana ang JSONP (at kung bakit hindi talaga Ajax).](#ipaliwanag-kung-papaano-gumagana-ang-jsonp-at-kung-bakit-hindi-talaga-ajax)
- [Ikaw ba ay nakagamit na ng JavaScript sa pag-template? Kung gayon, anong mga librerya ang ginamit mo?](#ikaw-ba-ay-nakagamit-na-ng-javascript-sa-pag-template-kung-gayon-anong-mga-librerya-ang-ginamit-mo)
- [Ipaliwanag ang "hoisting".](#ipaliwanag-ang-hoisting)
- [Ilarawan ang kaganapan ng pagbubwak.](#ilarawan-ang-kaganapan-ng-pagbubwak)
- [Ano ang pagkakaiba sa pagitan ng isang "katangian" at isang "propyedad"?](#ano-ang-pagkakaiba-sa-pagitan-ng-isang-katangian-at-isang-propyedad)
- [Bakit ang pagpapalawak ng mga built-in na JavaScript na mga bagay ay hindi isang magandang ideya?](#bakit-ang-pagpapalawak-ng-mga-built-in-na-javascript-na-mga-bagay-ay-hindi-isang-magandang-ideya)
- [Pagkakaiba sa pagitan ng kaganapan ng `pag-load` ng dokumento at dokumento ng `DOMContentLoaded` na kaganapan?](#pagkakaiba-sa-pagitan-ng-kaganapan-ng-pag-load-ng-dokumento-at-dokumento-ng-domcontentloaded-na-kaganapan)
- [Ano ang pagkakaiba sa pagitan ng `==` at `===`?](#ano-ang-pagkakaiba-sa-pagitan-ng--at-)
- [Ipaliwanag ang patakaran na pareho pareho dapat ang pinanggalingan tungkol sa JavaScript.](#ipaliwanag-ang-patakaran-na-pareho-pareho-dapat-ang-pinanggalingan-tungkol-sa-javascript)
- [Paganahin ito:](#paganahin-ito)
- [Bakit tinatawag itong isang ternary na ekspresyon, ano ang ibig sabihin ng salitang "Ternary"?](#bakit-tinatawag-itong-isang-ternary-na-ekspresyon-ano-ang-ibig-sabihin-ng-salitang-ternary)
- [Ano ang `"use strict";`? ano ang mga bentahe at di-bentahe sa paggamit nito?](#ano-ang-use-strict-ano-ang-mga-bentahe-at-di-bentahe-sa-paggamit-nito)
- [Gumawa ng para sa loop na mag-iterate hanggang sa 100 habang mag-ouput ng "fizz" sa multiples ng 3, "buzz" sa pagmultiplika ng 5 at "fizzbuzz" sa pagmultiplika ng 3 at 5](#gumawa-ng-para-sa-loop-na-mag-iterate-hanggang-sa-100-habang-mag-ouput-ng-fizz-sa-multiples-ng-3-buzz-sa-pagmultiplika-ng-5-at-fizzbuzz-sa-pagmultiplika-ng-3-at-5)
- [Bakit, sa pangkalahatan, isang magandang ideya na iwanan ang pandaigdigang saklaw ng isang website bilang kung ano man ito at hindi kailanman na galawin ito?](#bakit-sa-pangkalahatan-isang-magandang-ideya-na-iwanan-ang-pandaigdigang-saklaw-ng-isang-website-bilang-kung-ano-man-ito-at-hindi-kailanman-na-galawin-ito)
- [Bakit mo gagamitin ang isang bagay tulad ng `load` na kaganapan? Mayroon bang mga di-bentahe ang kaganapang ito? May alam ka bang anumang mga alternatibo, at bakit mo gagamitin ang mga ito?](#bakit-mo-gagamitin-ang-isang-bagay-tulad-ng-load-na-kaganapan-mayroon-bang-mga-di-bentahe-ang-kaganapang-ito-may-alam-ka-bang-anumang-mga-alternatibo-at-bakit-mo-gagamitin-ang-mga-ito)
- [Ipaliwanag kung ano ang isang solong pahina na app at kung paano gumawa ng isang SEO-friendly.](#ipaliwanag-kung-ano-ang-isang-solong-pahina-na-app-at-kung-paano-gumawa-ng-isang-seo-friendly)
- [Ano ang lawak ng iyong karanasan sa mga Pangako at o ang kanilang mga polyfill?](#ano-ang-lawak-ng-iyong-karanasan-sa-mga-pangako-at-o-ang-kanilang-mga-polyfill)
- [Ano ang mga kalamangan at kahinaan ng paggamit ng mga Pangako sa halip ng mga callback?](#ano-ang-mga-kalamangan-at-kahinaan-ng-paggamit-ng-mga-pangako-sa-halip-ng-mga-callback?)
- [Ano ang ilan sa mga pakinabang o di-pakinabang ng pagsulat ng JavaScript code sa isang wika na naka-compile sa JavaScript?](#ano-ang-ilan-sa-mga-pakinabang-o-di-pakinabang-ng-pagsulat-ng-javascript-code-sa-isang-wika-na-naka-compile-sa-javascript)
- [Anong mga kagamitan at pamamaraan ang ginagamit mo sa pag-debug ng JavaScript na code?](#anong-mga-kagamitan-at-pamamaraan-ang-ginagamit-mo-sa-pag-debug-ng-javascript-na-code)
- [Anong mga pag-construct ng wika ang ginagamit mo para sa pag-ulit sa mga katangian ng bagay at mga item na array?](#anong-mga-pag-construct-ng-wika-ang-ginagamit-mo-para-sa-pag-ulit-sa-mga-katangian-ng-bagay-at-mga-item-na-array)
- [Ipaliwanag ang pagkakaiba sa pagitan ng mga bagay na nababago at hindi nababago.](#ipaliwanag-ang-pagkakaiba-sa-pagitan-ng-mga-bagay-na-nababago-at-hindi-nababago)
- [Ipaliwanag ang pagkakaiba sa pagitan ng sabay at hindi sabay na punksiyon.](#ipaliwanag-ang-pagkakaiba-sa-pagitan-ng-sabay-at-hindi-sabay-na-punksiyon)
- [Ano ang loop na kaganapan? Ano ang pagkakaiba sa pagitan ng call na stack at queue ng gawain?](#ano-ang-loop-na-kaganapan-ano-ang-pagkakaiba-sa-pagitan-ng-call-na-stack-at-queue-ng-gawain)
- [Ipaliwanag ang mga pagkakaiba sa paggamit ng `foo` sa pagitan ng `function foo() {}` at `var foo = function() {}`](#ipaliwanag-ang-mga-pagkakaiba-sa-paggamit-ng-foo-sa-pagitan-ng-function-foo--at-var-foo--function-)
- [Ano ang mga pagkakaiba sa pagitan ng mga variable na nilikha sa pamamagitan ng paggamit ng `let`,`var` o `const`?](#ano-ang-mga-pagkakaiba-sa-pagitan-ng-mga-variable-na-nilikha-sa-pamamagitan-ng-paggamit-ng-let-var-o-const)
- [Ano ang mga pagkakaiba sa pagitan ng ES6 na class at mga ES5 na taga-construct na punksyon?](#ano-ang-mga-pagkakaiba-sa-pagitan-ng-es6-na-class-at-mga-es5-na-taga-construct-na-punksyon)
- [May maaalok ka bang isang kaso ng paggamit para sa bagong arrow => sintaks ng punksyon? Paano naiiba ang bagong sintaks na ito sa iba pang mga punksyon?](#may-maaalok-ka-bang-isang-kaso-ng-paggamit-para-sa-bagong-arrow--sintaks-ng-punksyon-Paano-naiiba-ang-bagong-sintaks-na-ito-sa-iba-pang-mga-punksyon)
- [Ano ang bentahe para sa paggamit ng sintaks na arrow para sa isang paraan sa isang taga-construct?](#ano-ang-bentahe-para-sa-paggamit-ng-sintaks-na-arrow-para-sa-isang-paraan-sa-isang-taga-construct)
- [Ano ang kahulugan ng isang mas mataas na hanay na punksyon?](#ano-ang-kahulugan-ng-isang-mas-mataas-na-hanay-na-punksyon)
- [Makapagbibigaay kaba ng isang halimbawa para sa pag-destructure ng isang bagay o isang array?](#makapagbibigaay-kaba-ng-isang-halimbawa-para-sa-pag-destructure-ng-isang-bagay-o-isang-array)
- [Ang literal na ES6 na template ay nag-aalok ng maraming kakayahan na umangkop sa pagbuo ng mga string, maaari ka bang makapagbigay ng isang halimbawa?](#ang-literal-na-es6-na-template-ay-nag-aalok-ng-maraming-kakayahan-na-umangkop-sa-pagbuo-ng-mga-string-maaari-ka-bang-makapagbigay-ng-isang-halimbawa)
- [Makapagbibigay kaba ng isang halimbawa ng isang punksyon na curry at kung bakit ang sintaks na ito ay nag-aalok ng isang kalamangan?](#makapagbibigay-kaba-ng-isang-halimbawa-ng-isang-punksyon-na-curry-at-kung-bakit-ang-sintaks-na-ito-ay-nag-aalok-ng-isang-kalamangan)
- [Ano ang mga pakinabang ng paggamit ng spread na sintaks at kung paano ito naiiba mula sa rest na sintaks?](#ano-ang-mga-pakinabang-ng-paggamit-ng-spread-na-sintaks-at-kung-paano-ito-naiiba-mula-sa-rest-na-sintaks)
- [Paano ka makakabahagi ng code sa pagitan ng mga file?](#paano-ka-makakabahagi-ng-code-sa-pagitan-ng-mga-file)
- [Bakit gusto mong lumikha ng mga statik na miyembro ng klase?](#bakit-gusto-mong-lumikha-ng-mga-statik-na-miyembro-ng-klase)

### Ipaliwanag ang delegasyon ng kaganapan

Ang delegasyon ng kaganapan ay isang pamamaraan na kinasasangkutan ng pagdaragdag ng mga tagapakinig ng kaganapan sa isang elemento ng magulang sa halip na idagdag ang mga ito sa mga kaapu-apuhan na elemento. Ang tagapakinig ay titira kapag ang kaganapan ay na-trigger sa mga kaapu-apuhan na sangkap dahil sa kaganapang pagbulubok sa DOM. Ang mga pakinabang ng pamamaraang ito ay:

- Ang bakas ng memorya ay bababa dahil ang isang nag-iisang humahawak ay kailangan sa elemento ng magulang, sa halip na mag-attach sa mga humahawak ng kaganapan sa bawat inapo.
- Hindi na kailangang buksan ang humahawak mula sa mga elemento na aalisin at itali ang kaganapan para sa mga bagong elemento.

###### Mga Reperensiya

- https://davidwalsh.name/event-delegate
- https://stackoverflow.com/questions/1687296/what-is-dom-event-delegation

[[↑] Bumalik sa taas](#talaan-ng-nilalaman)

### Ipaliwanag kung paano gumagana ang `this` na ito sa JavaScript

Walang simpleng paliwanag para sa `this`; ito ay isa sa mga pinaka-nakakalitong konsepto sa JavaScript. Ang isang paliwanag na hand-wavey na ang halaga ng `this` ay nakadepende sa kung paano tinawag ang punksyon. Nabasa ko ang maraming paliwanag sa `this` online, at natagpuan ko ang paliwanag ni [Arnav Aggrawal](https://medium.com/@arnav_aggarwal) para sa kalinawan. Ang mga sumusunod na alituntunin ay inilalapat:

1. Kung ang `new` na keyword ay ginagamit kapag tumatawag sa punksyon, ang `this` sa loob ng punksyon ay isang bagong bagay.
2. Kung ang `apply`,`call`, o `bind` ay ginamit upang tumawag o gumawa ng isang punksyon,ang `this` sa loob ng punksyon ay ang bagay na ipinasa bilang isang argumento.
3. Kung ang isang punksyon ay tinawag bilang isang paraan, tulad ng `obj.method ()` - ang `this` ay ang bagay na ang punksyon ay isang propyedad.
4. Kung ang isang punksyon ay tinatawag na isang libreng punksyon ng pagsang-ayon, nangangahulugan na ito ay tinatawag na walang anumang mga kundisyon sa itaas, ang `this` ay ang pandaigdigang bagay. Sa isang browser, ito ay ang `window` na bagay. Kung sa isang mahigpit na mode (`'gamitin ang mahigpit'`), ang `this` ay magiging `undefined` sa halip na ang pandaigdigang bagay.
5. Kung na-aplay ang karamihan sa panuntunan sa itaas, ang panuntunan na mas mataas ay ang siyang panalo at itatakda ang `this` na halaga.
6. Kung ang punksyo ay isang punksyon na ES2015 na arrow, binabalewala nito ang lahat ng mga patakaran sa itaas at tinatanggap ang `this` na halaga ng nakapalibot sa saklaw nito sa oras na ito ay nalikha.

Para sa malalim na pagpapaliwanag, tingnan ang kanyang [artikulo sa Medium](https://codeburst.io/the-simple-rules-to-this-in-javascript-35d97f31bde3).

###### Mga Reperensiya

- https://codeburst.io/the-simple-rules-to-this-in-javascript-35d97f31bde3
- https://stackoverflow.com/a/3127440/1751946

[[↑] Bumalik sa taas](#talaan-ng-nilalaman)

### Ipaliwanag kung paano gumagana ang prototypal na pagmamana

Ito ay isang pangkaraniwan na tanong sa pakikipanayam tungkol sa JavaScript. Ang lahat ng mga JavaScript na mga bagay ay may isang `__proto__` na propyedad, iyon ay isang reperensiya sa ibang bagay. Kapag ang isang propyedad ay na-akses sa isang bagay at kung ang propyedad ay hindi natagpuan sa bagay na iyon, tinitingnan ng engine ng JavaScript ang `__proto__` ng object, at ang`__proto__` ng `__proto__` at iba pa, hanggang sa matagpuan nito ang tinukoy ng propyedad sa isa sa `__proto__` o hanggang sa ito ay umabot sa dulo ng prototype na chain. Ang pag-uugali na ito ay gumagaya ng klasikal na pagpapamana, ngunit ito ay higit pa sa [delegasyon kaysa sa pamana](https://davidwalsh.name/javascript-objects).

###### Mga Reperensiya

- https://www.quora.com/What-is-prototypal-inheritance/answer/Kyle-Simpson
- https://davidwalsh.name/javascript-objects

[[↑] Bumalik sa taas](#talaan-ng-nilalaman)

### Ano ang iyong naiisip sa AMD laban sa CommonJS??

Ang dalawa ay parehong mga paraan upang ipatupad ang isang sistema ng module, na hindi likas na nasa JavaScript hanggang sa dumating ang ES2015. Ang CommonJS ay sinkronisado habang ang AMD (Di sinkronisado na module na kahulugan) ay maliwanag na di sinkronisado. Ang CommonJS ay dinisenyo sa pagpapaunlad ng server-side habang ang AMD, kasama ang suporta nito para sa di sinkronisado na pagload ng modules, ay mas inilaan para sa mga browser.

Nakikita ko ang sintaks ng AMD na parang masyadong malubha at ang CommonJS ay mas malapit sa estilo na nais mong ng pagsulat ng mga pahayag ng pag-import sa iba pang mga wika. halos kada, nakikita kong hindi kailangang AMD, dahil kung napagsilbihan mo ang lahat ng iyong JavaScript sa isang pinagdugtong na bugkos na, hindi ka makikinabang mula sa mga propyedad ng pag-load sa paraang async. Gayundin, ang sintaks ng CommonJS ay mas malapit sa estilo ng Node ng pagsusulat ng mga module at mayroong mas kaunting konteksto na lumilipat sa itaas kapag lumipat sa pagitan ng panig sa kliyente at panig sa serber na pag-develop ng JavaScript.

Natutuwa ako na may mga ES2015 na module, na may suporta para sa parehong kasabay at di sinkronisado na paglo-load, maaari na sa wakas na tayo ay mananatili lamang sa isang diskarte. Kahit na hindi ito ganap na pinagsama sa mga browser at sa Node, maaari tayong gumamit lagi ng mga transpiler upang i-convert ang ating code. .

###### Mga Reperensiya

- https://auth0.com/blog/javascript-module-systems-showdown/
- https://stackoverflow.com/questions/16521471/relation-between-commonjs-amd-and-requirejs

[[↑] Bumalik sa taas](#talaan-ng-nilalaman)

### Ipaliwanag kung bakit ang mga sumusunod ay hindi gumagana bilang isang IIFE: `function foo(){ }();`. Ano ang kailangang baguhin upang gawing maayos itong IIFE?

IAng IFE ay nangangahulugan ng Immediately Invoked Function Expressions. Ang parser ng JavaScript binabasa ang `function foo () {} ();` bilang `function foo () {}` at `();`, kung saan ang dati ay isang deklarasyon ng punksyon at ang huli (isang pares ng mga braket) ay isang pagtatangka sa pagtawag sa isang punksyon ngunit walang pangalan na tinukoy, kaya ito ay tumatapon ng `Uncaught SyntaxError: Hindi inaasahang token)`.

Narito ang dalawang paraan upang ayusin ito na kinasasangkutan ng pagdaragdag ng higit pang mga braket: `(function foo () {}) ()` at `(function foo () {} ())`. Ang mga punksyon ay hindi nakalantad sa pandaigdigang nasasakupan at maaari mo ring alisin ang pangalan nito kung hindi mo kailangang gawing reperensiya ang sarili nito sa loob ng katawan.

###### Mga Reperensiya

- http://lucybain.com/blog/2014/immediately-invoked-function-expression/

[[↑] Bumalik sa taas](#talaan-ng-nilalaman)

### Ano ang kaibahan sa pagitan ng isang variable na: `null`, `undefined` o hindi naipahayag? Paano mo gagawin ang pag-check para sa alinman sa mga kalagayang ito?

Ang mga **di-deklarado ** na mga variable ay nalilikha kapag ikaw ay nagtatalaga ng isang halaga sa isang identifier na hindi pa nilikha noong una gamit ang `var`,`let` o `const`. Ang mga di-deklaradong variable ay tinutukoy sa pangkaalahatan, sa labas ng kasalukuyang saklaw. Sa mahigpit na mode, ang isang `ReferenceError` ay itatapon kapag susubukan mong italaga sa isang di-ipinahayag na variable. Ang mga di-deklaradong variable ay masama tulad ng kung papaano naging masama ang mga pandaigdigan na variable. Iwasan ang mga ito sa abot ng iyong makakaya! Upang suriin ang mga ito, balutin ang paggamit nito sa isang block ng `try` /`catch`.

```js
function foo() {
  x = 1; // Magtatapon ng isang ReferenceError sa mahigpit na mode
}

foo();
console.log(x); // 1
```

Ang isang variable na `undefined` ay isang variable na ipinahayag na, ngunit hindi nakatalaga sa isang halaga. Ito ay uri ng `undefined`. Kung ang isang punksyon ay hindi nagbabalik ng anumang halaga bilang resulta ng pagpapatupad na itinalaga sa isang variable, ang variable ay magkakaroon din ng halaga na `undefined`. Upang suriin ito, ihambing ang paggamit ng mahigpit na pagkakapantay-pantay (`===`) na operator o `typeof` na magbibigay ng string na `'undefined'`. Tandaan na hindi mo dapat gamitin ang abstraktong operator ng pagkapantay-pantay upang sumuri, dahil ito ay babalik sa `true` kung ang halaga ay`null`.

```js
var foo;
console.log(foo); // undefined
console.log(foo === undefined); // true
console.log(typeof foo === 'undefined'); // true

console.log(foo == null); // true. Mali, wag itong gamitin para sumuri!

function bar() {}
var baz = bar();
console.log(baz); // undefined
```

Ang isang variable na `null` ay malinaw na itinalaga sa`null` na halaga. Ito ay kumakatawan ng walang anumang halaga at iba mula sa `undefined` sa paraang ito ay tahasang itinalaga. Upang suriin ang `null,` ihambing lang ang paggamit ng mahigpit na operator ng pagkakapantay-pantay. Tandaan na tulad ng sa itaas, hindi mo dapat gamitin ang abstraktong operator ng pagkakapantay-pantay (`==`) upang sumuri, dahil ito ay babalik sa `true` kung ang halaga ay `undefined`.

```js
var foo = null;
console.log(foo === null); // true

console.log(foo == undefined); // true. Mali, wag itong gamitin para sumuri!
```

Bilang isang personal na nakaugalian, hindi ko kailanman iiwanan ang aking mga variable na hindi naipahayag o hindi ipinagkaloob. Ako ay tahasang magtatalaga ng `null` sa kanila pagkatapos ng deklarasyon, kung wala pa akong balak na gamitin ito.

###### Mga Reperensiya

- https://stackoverflow.com/questions/15985875/effect-of-declared-and-undeclared-variables
- https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/undefined

[[↑] Bumalik sa taas](#talaan-ng-nilalaman)

### Ano ang pagsasara, at paano mo gagamitin ang isa sa mga ito?

Ang pagsasara ay ang kumbinasyon ng isang punksyon at ang leksikong environment sa loob kung saan ang punksyon ay ipinahayag. Ang salitang "leksikal" ay tumutukoy sa katotohanang ang paggamit ng leksiko ay paggamit ng lokasyon kung saan ang isang variable ay ipinahayag sa loob ng source code upang matukoy kung saan pwede pa ang variable na iyon. Ang mga pagsasara ay mga punksyon na may akses sa mga panlabas na (kalakip) na mga variable ng punkyon na saklaw kahit na matapos na bumalik ang panlabas na punksyon.

**Bakit ka pipili ng isa?**

- Privacy sa datos / pag-emulate ng pribadong pamamaraan sa closures. Karaniwang ginagamit sa [pattern ng module](https://addyosmani.com/resources/essentialjsdesignpatterns/book/#modulepatternjavascript).
- [Bahagyang mga aplikasyon o pagcurry](https://medium.com/javascript-scene/curry-or-partial-application-8150044c78b8#.l4b6l1i3x).

###### Mga Reperensiya

- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Closures
- https://medium.com/javascript-scene/master-the-javascript-interview-what-is-a-closure-b2f0d2152b36

[[↑] Bumalik sa taas](#talaan-ng-nilalaman)

### Mailalarawan mo ba ang pangunahing pagkakaiba sa pagitan ng isang `.forEach` na loop at isang `.Map()` na loop at bakit kailangan mo lang pumili ng isa mula sa dalawa?

Upang maunawaan ang mga pagkakaiba sa pagitan ng dalawa, tingnan natin kung ano ang ginagawa ng bawat punksyon.

**`forEach`**

- nagbabago sa pamamagitan ng mga elemento sa isang array.
- Nagpapatupad ng callback para sa bawat elemento.
- Hindi nagbabalik ng isang halaga.

```js
const a = [1, 2, 3];
const doubled = a.forEach((num, index) => {
  // Gumawa ng isang bagay na may num at / o indeks.
});

// doubled = undefined
```

**`map`**

- binabago sa pamamagitan ng mga elemento sa isang array.
- Mina- "Map" ang bawat elemento sa isang bagong elemento sa pamamagitan ng pagtawag sa punksyon sa bawat elemento, na lumilikha ng isang bagong array bilang isang resulta.

```js
const a = [1, 2, 3];
const doubled = a.map((num) => {
  return num * 2;
});

// doubled = [2, 4, 6]
```

Ang pangunahing pagkakaiba sa pagitan ng `.forEach` at `.map ()` ay ang `.map ()`ay nagbabalik ng isang bagong array. Kung kailangan mo ang resulta, ngunit ayaw mong baguhin ang orihinal na array, ang `.map ()` ay ang malinaw na pagpipilian. Kung kailangan mo lang umulit sa isang array, ang `forEach` ay magandang piliin din.

###### Mga Reperensiya

- https://codeburst.io/javascript-map-vs-foreach-f38111822c0f

[[↑] Bumalik sa taas](#talaan-ng-nilalaman)

### Ano ang isang tipikal na kaso ng paggamit para sa mga hindi kilalang punksyon?

Maaari silang gamitin sa mga IIFE upang ipaloob ang ilang mga code sa loob ng isang lokal na saklaw upang ang mga variable na ipinahayag dito ay hindi mag-leak sa pandaigdigang saklaw.

```js
(function () {
  // Ibang mga code dito.
})();
```

Bilang isang callback na ginagamit minsan at hindi na kailangang magamit kahit saan pa. Ang code ay mukhang mas self-contained at nababasa kapag ang mga handler ay tinukoy sa loob ng code na tinatawag ang mga ito, sa halip na maghanap sa ibang lugar upang mahanap ang punksyon na katawan.

```js
setTimeout(function () {
  console.log('Hello world!');
}, 1000);
```

Mga argumento sa mga punksyonal na mga konstruktura na pag-program o Lodash (katulad ng mga callbacks).

```js
const arr = [1, 2, 3];
const double = arr.map(function (el) {
  return el * 2;
});
console.log(double); // [2, 4, 6]
```

###### Mga Reperensiya

- https://www.quora.com/What-is-a-typical-usecase-for-anonymous-functions
- https://stackoverflow.com/questions/10273185/what-are-the-benefits-to-using-anonymous-functions-instead-of-named-functions-fo

[[↑] Bumalik sa taas](#talaan-ng-nilalaman)

### Paano mo inaayos ang iyong code? (modular na pattern, makalumang pagmamana?)

Sa nakaraan, ginamit ko ang Backbone para sa aking mga modelo na naghihikayat sa higit pang pamamaraan sa OOP, ang paglikha ng mga modelo ng Backbone at paglakip ng mga pamamaraan sa kanila.

Mahusay pa rin ang module pattern, ngunit sa mga araw na ito, ginagamit ko ang arkitektura ng Flux batay sa React o Redux na naghihikayat sa isang direksyunal na punksyunal na pag-program na pamamaraan sa halip. Gusto kong kumatawan sa mga modelo ng aking app gamit ang mga plain na mga bagay at sumulat ng utility na purong mga punksyon upang manipulahin ang mga bagay na ito. Minamanipula ang estado gamit ang mga pagkilos at mga reducer tulad ng sa anumang iba pang aplikasyon ng Redux.

Iniiwasan ko ang paggamit ng klasikal na pagmamana kung posible. Kapag at kung gagawin ko, mananatili ako sa [mga patakarang ito](https://medium.com/@dan_abramov/how-to-use-classes-and-sleep-at-night-9af8de78ccb4).

[[↑] Bumalik sa taas](#talaan-ng-nilalaman)

### Ano ang pagkakaiba sa pagitan ng mga host na bagay at mga likas na bagay?

Ang mga likas na bagay ay mga bagay na bahagi ng wika ng JavaScript na tinutukoy ECMAScript na ispisipikasyon, kagaya ng `String`, `Math`, `RegExp`, `Object`, `Function`, atbp.

Ang mga bagay na host ay ibinibigay ng runtime environment (browser o Node), kagaya ng `window`, `XMLHTTPRequest`, atbp.

###### Mga Reperensiya

- https://stackoverflow.com/questions/7614317/what-is-the-difference-between-native-objects-and-host-objects

[[↑] Bumalik sa taas](#talaan-ng-nilalaman)

### Kaibahan sa pagitan ng: punksyon na `Person(){}`, `var person = Person()`, at `var person = new Person()`?

Ang tanong na ito ay medyo hindi malinaw. Aking pinakamahusay na hula sa intensyon nito ay ito ay nagtatanong tungkol sa mga tagapagbuo sa JavaScript. Sa teknikal na pagkakasabi, ang `function Person () {}` ay isang normal na punksyon na deklarasyon. Ang kombensyon ay gumamit ng PascalCase para sa mga punksyon na nilalayon upang magamit bilang mga tagapagbuo.

Ang `var person = Person()` ay tinatawag ang `Person` bilang isang punksyon, At hindi bilang isang tagapagbuo. Ang pagtatawag tulad nito ay isang pangkaraniwang pagkakamali kung ang punksyon ay inilaan upang magamit bilang isang tagapagbuo. Kadalasan, ang tagapagbuo ay hindi nagbabalik ng anumang bagay, kaya ang pagtawag sa tagapagbuo tulad ng isang normal na punksyon ay magbabalik ng `undefined` at itatalaga sa variable na inilaan bilang halimbawa.

Ang `var person = new Person()` ay lilikha ng isang halimbawa ng `Person` na gamit ang `new` na operator, na minana mula sa `Person.prototype`. Ang isang alternatibong gagawin ay gamitin ang `Object.create`, kagaya ng: `Object.create(Person.prototype)`.

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

###### Mga Reperensiya

- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/new

[[↑] Bumalik sa taas](#talaan-ng-nilalaman)

### Ano ang pagkakaiba sa pagitan ng `.call` at `.apply`?

Ang parehong `.call` at `.apply` ay ginagamit upang tumawag ng mga punksyon at ang unang parameter ay gagamitin bilang halaga ng `ito` sa loob ng punksyon Gayunpaman, Ang `.call` ay tumatagal ng mga argumento na pinaghiwalay ng kuwit bilang mga susunod na argumento habang ang `.apply` tumatagal sa isang hanay ng mga argumento bilang susunod na argumento. Ang pinakamadaling paraaan upang matandaan ito ay ang C ay para sa `call` na pinaghihiwalay ng kuwit at A para sa `apply` at array ng mga argumento.

```js
function add(a, b) {
  return a + b;
}

console.log(add.call(null, 1, 2)); // 3
console.log(add.apply(null, [1, 2])); // 3
```

[[↑] Bumalik sa taas](#talaan-ng-nilalaman)

### Ipaliwanag ang `Function.prototype.bind`.

Kinuha mula sa bawat salita ng [MDN](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_objects/Function/bind):

> Ang paraan ng `bind ()` ay lumilikha ng isang bagong punksyon na, kapag tinawag, ay may naka-set na ang keyword na ito sa binigay na halaga, na may isang ibinigay na pagkakasunod-sunod ng mga argumento bago ang anumang ibinigay kapag ang bagong punksyon ay tinawag na.

Sa aking karanasan, ito ay pinaka-kapaki-pakinabang para sa pag-bind ng halaga ng `this` sa mga pamamaraan ng mga klaseng gusto mong ipasa sa iba pang mga punksyon. Ito ay madalas na ginagawa sa mga bahagi ng Reacts.

###### Mga Reperensiya

- https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_objects/Function/bind

[[↑] Bumalik sa taas](#talaan-ng-nilalaman)

### Kelan ka gagamit ng `document.write()`?

Ang `document.write()` ay sumusulat ng isang string ng teksto sa isang stream ng dokumento na binuksan ng `document.open()`. Kapag ang `document.write ()` ay naisakatuparan pagkatapos na mai-load ang pahina, tatawag itong `document.open` na nililimas ang buong dokumento (`<head>`at`<body>`removed!) At pinapalitan ang mga nilalaman sa binigay na halaga ng parameter sa string. Kaya nga naman ito ay karaniwang itinuturing na mapanganib at madaling kapitan ng sakit sa maling paggamit.

Mayroong ilang mga sagot na makikita online na nagpapaliwanag na ang `document.write()` ay ginagamit sa analitikang code o [kapag nais mong isama ang mga estilo na dapat gagana lamang kung pinagana ang JavaScript](https://www.quirksmode.org/blog/archives/2005/06/three_javascrip_1.html). Ginagamit pa rin ito sa boilerplate ng HTML5 sa [load script na kahanay at pinanatili ang pagkakasunud-sunod ng pagpapatupad](https://github.com/paulirish/html5-boilerplate/wiki/Script-Loading-Techniques#documentwrite-script-tag)! Gayunpaman, pinaghihinalaan ko na ang mga kadahilanan na maaaring pinaglumaan na sa panahon at sa modernong araw, maaari nilang makamit nang hindi gumagamit ng `document.write()`. Kung maaari ay itama mo ako kung mali ako tungkol dito.

###### Mga Reperensiya

- https://www.quirksmode.org/blog/archives/2005/06/three_javascrip_1.html
- https://github.com/h5bp/html5-boilerplate/wiki/Script-Loading-Techniques#documentwrite-script-tag

[[↑] Bumalik sa taas](#talaan-ng-nilalaman)

### Ano ang kaibahan sa pagitan ng pagtukoy na tampok, tampok na pagkakilala, at paggamit ng UA na string?

**Pagtuklas ng Tampok**

Ang pagtuklas ng tampok ay kinasasangkutan ng pagtatrabaho kung ang isang browser ay sumusuporta sa isang tiyak na bloke ng code, at nagpapatakbo ng ibang code na nakasalalay sa kung ito (o hindi), upang ang browser ay maaaring makapagbigay kahit kailan ng isang gumaganang karanasan sa halip na mag-crash o magka-error sa ilang mga browser. Halimbawa:

```js
if ('geolocation' in navigator) {
  // Pwedeng gamitin ang navigator.geolocation
} else {
  // Ang handle ay kulang sa tampok
}
```

[Modernizr](https://modernizr.com/) is a great library to handle feature detection.

**Tampok na Kaganapan**

Ang tampok na kaganapan as sumusuri ng tampok kagaya nalang din ng pangtuklas ng tampok, ngunit ito'y gumagamit ng ibang punksyon dahil hinihinilaan din na ito ay nag-eexist e.g.:

```js
if (document.getElementsByTagName) {
  element = document.getElementById(id);
}
```

Hindi ito talagang inirerekomenda. Ang pagtuklas ng tampok ay mas walang palya.

**UA String**

Ito ay isang string na iniulat ng browser na nagbibigay-daan sa mga network protocol na peer na kilalanin ang uri ng aplikasyon, operating system, software vendor o bersyon ng software ng humihiling ng user agent na software. Maa-akses ito sa pamamagitan ng `navigator.userAgent`. Gayunpaman, ang string ay nakakalito i-parse at pwedeng ma-spoofed. Halimbawa, ang Chrome ay nag-uulat pareho bilang Chrome at Safari. Kaya upang ma-detect ang Safari ay kailangan mong suriin ang mga string ng Safari at ang kawalan ng string ng Chrome. Iwasan ang pamamaraang ito.

###### Mga Reperensiya

- https://developer.mozilla.org/en-US/docs/Learn/Tools_and_testing/Cross_browser_testing/Feature_detection
- https://stackoverflow.com/questions/20104930/whats-the-difference-between-feature-detection-feature-inference-and-using-th
- https://developer.mozilla.org/en-US/docs/Web/HTTP/Browser_detection_using_the_user_agent

[[↑] Bumalik sa taas](#talaan-ng-nilalaman)

### Ipaliwanag ang Ajax sa mas detalyadong pamamaraan hangga't maaari.

Ang Ajax ay (sinkronisadong JavaScript at XML) ay isang set ng mga diskarte sa pag-develop ng web gamit ang maraming mga teknolohiya ng web sa panig ng kliyente upang lumikha ng mga aplikasyon ng web na sinkronisado. Sa Ajax, ang mga web na aplikasyon ay maaaring magpadala ng datos sa at kunin mula sa isang serber na di-sinkronisado (sa background) nang hindi nakakasagabal sa displey at pag-uugali ng umiiral na pahina. Sa pamamagitan ng pag-decoupling ng layer ng pagpapalit ng datos mula sa layer ng pagtatanghal, ang Ajax ay nagbibigay-daan para sa mga web na pahina, at sa pamamagitan ng extension ng mga aplikasyon sa web, upang baguhin ang nilalaman na dynamic na walang kailangang i-reload ang buong pahina. Sa pagsasagawa, ang mga modernong pagpapatupad ay kadalasang kapalit ng JSON para sa XML dahil sa mga pakinabang ng pagiging likas sa JavaScript.

Ang `XMLHttpRequest` na API ay madalas na ginagamit para sa di-sinkronisadong komunikasyon o sa mga araw ngayon, ang`fetch` na API.

###### Mga Reperensiya

- https://en.wikipedia.org/wiki/Ajax_(programming)
- https://developer.mozilla.org/en-US/docs/AJAX

[[↑] Bumalik sa taas](#talaan-ng-nilalaman)

### Ano ang mga kalamangan at di-kalamangan ng paggamit ng Ajax?

**Mga Kalamangan**

- Mas mahusay na pakikipag-ugnayan. Maaaring mabago ang bagong nilalaman mula sa serber nang hindi kailangang i-reload ang buong pahina.
- Binawasang mga koneksyon sa serber dahil ang mga script at mga stylesheet lamang ay kailangang hilingin ng isang beses lamang.
- Maaaring mapanatili ang estado sa isang pahina. Ang mga JavaScript na variable at DOM na estado ay mananatili dahil ang pangunahing pahinang paglalagyan ay hindi na-reload.
- Karaniwang karamihan sa mga pakinabang ng isang SPA.

**Mga Di Kalamangan**

- Ang mga dynamic na webpage ay mas mahirap i-bookmark.
- Hindi gagana kung hindi pinagana ang JavaScript sa browser.\* Ang ilang mga webcrawlers ay hindi nagsasagawa ng JavaScript at hindi makikita ang nilalamang na-load ng JavaScript.
- Karaniwang karamihan sa mga di kalamangan ng isang SPA.

[[↑] Bumalik sa taas](#talaan-ng-nilalaman)

### Ipaliwanag kung papaano gumagana ang JSONP (at kung bakit hindi talaga Ajax).

Ang JSONP (JSON na may Padding) ay isang paraan na parating ginagamit para i-bypass ang mga cross-domain mga patakaran sa mga web browser dahil ang Ajax ay humihingi mula sa kasalukuyang pahina papunta sa isang cross-origin na domain ay hindi pinahihintulutan.

Gumagana ang JSONP sa pamamagitan ng paggawa ng isang kahilingan sa isang cross-origin na domain sa pamamagitan ng isang tag na `<script>` at kadalasan ay may parameter na query ng `callback`, halimbawa:`https: //example.com? Callback = printData`. Pagkatapos ay bubuuin ng serber ang datos sa loob ng isang punksyon na tinatawag na `printData` at ibabalik ito sa kliyente.

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
// Ang file ay naload galing sa https://example.com?callback=printData
printData({name: 'Yang Shun'});
```

Ang kliyente ay dapat magkaroon ng punksyon na `printData` sa pandaigdigang saklaw nito at ang punksyon ay isasagawa ng kliyente kapag ang tugon mula sa cross-origin na domain ay natanggap na.

Maaaring hindi ligtas ang JSONP at mayroong ilang implikasyon sa seguridad. Tulad ng JSONP na talagang JavaScript, maari nitong gawin ang lahat ng iba pang magagawa ng JavaScript, kaya kailangan mong magtiwala sa tagabigay ng JSONP na datos.

Sa panahon ngayon, Ang [CORS](http://en.wikipedia.org/wiki/Cross-origin_resource_sharing) ay ang nirerekomendang pamamaraan at ang JSONP ay makikita bilang isang hack.

###### Mga Reperensiya

- https://stackoverflow.com/a/2067584/1751946

[[↑] Bumalik sa taas](#talaan-ng-nilalaman)

### Ikaw ba ay nakagamit na ng JavaScript sa pag-template? Kung gayon, anong mga librerya ang ginamit mo?

Oo. mga Handlebar, Underscore, Lodash, AngularJS at JSX. Hindi ko nagustuhan ang pag-template sa AngularJS dahil sa mabigat na paggamit nito ng mga string sa mga direktiba at ang mga typo ay di agad nakikita. Ang JSX ay ang aking bagong paborito dahil ito ay mas malapit sa JavaScript at mayroong halos anumang sintaks na iyong matututunan. Sa mga araw na ito, maaari mo ring gamitin ang ES2015 na mga template string literal bilang isang mabilis na paraan para sa paglikha ng mga template nang hindi umaasa sa third-party na code.

```js
const template = `<div>My name is: ${name}</div>`;
```

Gayunpaman, maging maingat sa isang potensyal na XSS sa itaas na pamamaraan dahil ang mga nilalaman ay hindi ligtas para sa iyo, hindi katulad sa mga libreryang pang-template.

[[↑] Bumalik sa taas](#talaan-ng-nilalaman)

### Ipaliwanag ang "hoisting".

Ang pag-hoist ay isang terminong ginamit upang ipaliwanag ang pag-uugali ng mga variable na deklarasyon sa iyong code. Ang mga variable na ipinahayag o nasimulan sa keyword na `var` ay magkakaroon ng kanilang deklarasyon na "hoisted" hanggang sa tuktok ng kasalukuyangnasasakupan. Gayunpaman, ang pagpapahayag lamang ang na-hoist na, ang pagtatalaga (kung mayroong isa), ay mananatili kung saan ito. Ipaliwanag natin ang ilang mga halimbawa.

```js
// var na mga deklarasyon ay na-hoist.
console.log(foo); // undefined
var foo = 1;
console.log(foo); // 1

// let/const na mga deklarasyon ay hindi na-hoist.
console.log(bar); // ReferenceError: ang bar ay hindi natukoy
let bar = 2;
console.log(bar); // 2
```

Ang mga deklarasyon ng punksyon ay may na-hoist katawan habang ang mga ekspresyon ng punksyon (nakasulat sa anyo ng mga variable na deklarasyon) ay may variable na deklarasyon na na-hoist lamang.

```js
// Deklarasyon ng Punksyon
console.log(foo); // [Function: foo]
foo(); // 'FOOOOO'
function foo() {
  console.log('FOOOOO');
}
console.log(foo); // [Function: foo]

// Ekspresyon ng Punksyon
console.log(bar); // undefined
bar(); // Uncaught TypeError: ang bar ay hindi isang punksyon
var bar = function () {
  console.log('BARRRR');
};
console.log(bar); // [Function: bar]
```

[[↑] Bumalik sa taas](#talaan-ng-nilalaman)

### Ilarawan ang kaganapan ng pagbubwak.

Kapag ang isang kaganapan ay nag-trigger sa isang elemento ng DOM, susubukan nito na pangasiwaan ang kaganapan kung may nakakabit na tagapakinig, pagkatapos ay ang kaganapan ay bubula hanggang sa kanyang magulang at ang parehong bagay ang mangyayari. Ang pag-bula na ito ay nangyayari sa mga ninuno ng elemento sa lahat ng mga paraan sa `dokumento`. Ang kaganapan ng pagbubwak ng bula ay ang mekanismo sa likod ng delegasyon ng kaganapan.

[[↑] Bumalik sa taas](#talaan-ng-nilalaman)

### Ano ang pagkakaiba sa pagitan ng isang "katangian" at isang "propyedad"?

Ang mga katangian ay tinukoy sa markup ng HTML ngunit ang mga propyedad ay tinukoy sa DOM. Upang ilarawan ang pagkakaiba, isipin na mayroon kaming field na ito sa aming HTML: `<input type ="text"value ="Hello">`.

```js
const input = document.querySelector('input');
console.log(input.getAttribute('value')); // Hello
console.log(input.value); // Hello
```

Ngunit pagkatapos mong baguhin ang halaga ng patlang ng teksto sa pamamagitan ng pagdaragdag ng "World!" dito, ito ay nagiging:

```js
console.log(input.getAttribute('value')); // Hello
console.log(input.value); // Hello World!
```

###### Mga Reperensiya

- https://stackoverflow.com/questions/6003819/properties-and-attributes-in-html

[[↑] Bumalik sa taas](#talaan-ng-nilalaman)

### Bakit ang pagpapalawak ng mga built-in na JavaScript na mga bagay ay hindi isang magandang ideya?

Ang pagpapalawak ng isang built-in o likas na JavaScript na bagay ay nangangahulugan ng pagdaragdag ng mga katangian o mga punksyon sa `prototype` nito. Bagaman ito ay maaaring mukhang isang magandang ideya sa simula, ito ay mapanganib sa pagsasagawa. Isipin mo nalang na ang iyong code ay gumagamit ng ilang mga librerya na parehong nagpapahaba ng `Array.prototype` sa pamamagitan ng pagdaragdag ng parehong `contains` na paraan, ang mga pagpapatupad ay papatungan ang bawat isa at ang iyong code at masisira kung ang pag-uugali ng dalawang mga paraan ay hindi pareho.

Ang tanging oras na maaari mong i-extend ang isang likas na bagay ay kung nais mong lumikha ng isang polyfill, mahalagang nagbibigay ng iyong sariling pagpapatupad para sa isang paraan na bahagi ng pagtutukoy ng JavaScript ngunit maaaring hindi umiiral sa browser ng gumagamit sa kadahilanang ito ay isang mas lumang browser .

###### Mga Reperensiya

- http://lucybain.com/blog/2014/js-extending-built-in-objects/

[[↑] Bumalik sa taas](#talaan-ng-nilalaman)

### Pagkakaiba sa pagitan ng kaganapan ng `pag-load` ng dokumento at dokumento ng `DOMContentLoaded` na kaganapan?

Ang `DOMContentLoaded` na kaganapan ay pinapaputok kapag ang unang HTML na dokumento ay ganap na na-load at ma-parse, nang hindi naghihintay para sa mga stylesheet, mga larawan, at mga subframe upang tapusin ang paglo-load. Ang `window` ng `load` na kaganapan ay painapaputok pagkatapos lamang ng DOM at ang lahat ng mga mapagkukunang at asset na umaasa.

###### Mga Reperensiya

- https://developer.mozilla.org/en-US/docs/Web/Events/DOMContentLoaded
- https://developer.mozilla.org/en-US/docs/Web/Events/load

[[↑] Bumalik sa taas](#talaan-ng-nilalaman)

### Ano ang pagkakaiba sa pagitan ng `==` at `===`

Ang `==` ay ang abstraktong pagkakapantay-pantay na operator habang ang `===` ay ang mahigpit na pagkakapantay-pantay na operator. Ang `==` ay ang abstraktong pagkakapantay-pantay na operator habang ang `===` ay ang mahigpit na pagkakapantay-pantay na operator. Ang `== operator ay maghahambing para sa pagkakapantay-pantay matapos gawin ang anumang kinakailangang mga conversion na uri. Ang operator ng`===`ay hindi gagawin ang uri ng conversion, kaya kung ang dalawang halaga ay hindi magkatulad na uri`=== `ay babalik lamang` false`. Kapag gumagamit ng`==`, ang mga funky bagay ay maaaring mangyari, tulad ng: na operator ay maghahambing para sa pagkakapantay-pantay matapos gawin ang anumang kinakailangang mga pagpapalit na uri. Ang operator ng`===`ay hindi gagawin ang uri ng pagpapalit, kaya kung ang dalawang halaga ay hindi magkatulad na uri` === `ay babalik lamang sa`false`. Kapag gumagamit ng`==`, ang mga kaiba-ibang mga bagay ay maaaring mangyari, tulad ng:

```js
1 == '1'; // true
1 == [1]; // true
1 == true; // true
0 == ''; // true
0 == '0'; // true
0 == false; // true
```

Ang aking payo ay hindi dapat gamitin ang operator na `==', maliban sa kaginhawaan kapag naghahambing laban sa`null`o`undefined`, kung saan ang`a == null`ay babalik sa`true`kung` ang `a` ay `null` o `undefined`.

```js
var a = null;
console.log(a == null); // true
console.log(a == undefined); // true
```

###### Mga Reperensiya

- https://stackoverflow.com/questions/359494/which-equals-operator-vs-should-be-used-in-javascript-comparisons

[[↑] Bumalik sa taas](#talaan-ng-nilalaman)

### Ipaliwanag ang patakaran na pareho pareho dapat ang pinanggalingan tungkol sa JavaScript.

Pinipigilan ng patakaran ng may parehong pinagmulan ang JavaScript mula sa paggawa ng mga kahilingan sa mga hangganan ng domain. Ang pinagmulan ay tinukoy bilang isang kumbinasyon ng scheme ng URI, hostname, at numero ng port. Pinipigilan ng patakarang ito ang isang nakakahamak na script sa isang pahina mula sa pagkuha ng akses sa mga sensitibong datos sa isa pang pahina ng web sa pamamagitan ng Document Object Model na pahina.

###### Mga reperensiya

- https://en.wikipedia.org/wiki/Same-origin_policy

[[↑] Bumalik sa taas](#talaan-ng-nilalaman)

### Paganahin ito:

```js
duplicate([1, 2, 3, 4, 5]); // [1,2,3,4,5,1,2,3,4,5]
```

```js
function duplicate(arr) {
  return arr.concat(arr);
}

duplicate([1, 2, 3, 4, 5]); // [1,2,3,4,5,1,2,3,4,5]
```

[[↑] Bumalik sa taas](#talaan-ng-nilalaman)

### Bakit tinatawag itong isang ternary na ekspresyon, ano ang ibig sabihin ng salitang "Ternary"?

"Ternary" indicates three, and a ternary expression accepts three operands, the test condition, the "then" expression and the "else" expression. Ternary expressions are not specific to JavaScript and I'm not sure why it is even in this list.

###### References

- https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Operators/Conditional_Operator

[[↑] Bumalik sa taas](#talaan-ng-nilalaman)

### Ano ang `"use strict";`? ano ang mga bentahe at di-bentahe sa paggamit nito?

'use strict' is a statement used to enable strict mode to entire scripts or individual functions. Strict mode is a way to opt in to a restricted variant of JavaScript.

Advantages:

- Makes it impossible to accidentally create global variables.
- Makes assignments which would otherwise silently fail to throw an exception.
- Makes attempts to delete undeletable properties throw (where before the attempt would simply have no effect).
- Requires that function parameter names be unique.
- `this` is undefined in the global context.
- It catches some common coding bloopers, throwing exceptions.
- It disables features that are confusing or poorly thought out.

Disadvantages:

- Many missing features that some developers might be used to.
- No more access to `function.caller` and `function.arguments`.
- Concatenation of scripts written in different strict modes might cause issues.

Overall, I think the benefits outweigh the disadvantages, and I never had to rely on the features that strict mode blocks. I would recommend using strict mode.

###### References

- http://2ality.com/2011/10/strict-mode-hatred.html
- http://lucybain.com/blog/2014/js-use-strict/

[[↑] Bumalik sa taas](#talaan-ng-nilalaman)

### Gumawa ng para sa loop na mag-iterate hanggang sa `100` habang mag-ouput ng **"fizz"** sa multiples ng `3`, **"buzz"** sa pagmultiplika ng `5` at **"fizzbuzz"** sa pagmultiplika ng `3` at `5`

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

- https://gist.github.com/jaysonrowe/1592432

[[↑] Bumalik sa taas](#talaan-ng-nilalaman)

### Bakit, sa pangkalahatan, isang magandang ideya na iwanan ang pandaigdigang saklaw ng isang website bilang kung ano man ito at hindi kailanman na galawin ito?

Every script has access to the global scope, and if everyone is using the global namespace to define their own variables, there will bound to be collisions. Use the module pattern (IIFEs) to encapsulate your variables within a local namespace.

[[↑] Back to top](#js-questions)

### Bakit mo gagamitin ang isang bagay tulad ng `load` na kaganapan? Mayroon bang mga di-bentahe ang kaganapang ito? May alam ka bang anumang mga alternatibo, at bakit mo gagamitin ang mga ito?

The `load` event fires at the end of the document loading process. At this point, all of the objects in the document are in the DOM, and all the images, scripts, links and sub-frames have finished loading.

The DOM event `DOMContentLoaded` will fire after the DOM for the page has been constructed, but do not wait for other resources to finish loading. This is preferred in certain cases when you do not need the full page to be loaded before initializing.

TODO.

###### References

- https://developer.mozilla.org/en-US/docs/Web/API/GlobalEventHandlers/onload

[[↑] Bumalik sa taas](#talaan-ng-nilalaman)

### Ipaliwanag kung ano ang isang solong pahina na app at kung paano gumawa ng isang SEO-friendly.

The below is taken from the awesome [Grab Front End Guide](https://github.com/grab/front-end-guide), which coincidentally, is written by me!

Web developers these days refer to the products they build as web apps, rather than websites. While there is no strict difference between the two terms, web apps tend to be highly interactive and dynamic, allowing the user to perform actions and receive a response for their action. Traditionally, the browser receives HTML from the server and renders it. When the user navigates to another URL, a full-page refresh is required and the server sends fresh new HTML for the new page. This is called server-side rendering.

However in modern SPAs, client-side rendering is used instead. The browser loads the initial page from the server, along with the scripts (frameworks, libraries, app code) and stylesheets required for the whole app. When the user navigates to other pages, a page refresh is not triggered. The URL of the page is updated via the [HTML5 History API](https://developer.mozilla.org/en-US/docs/Web/API/History_API). New data required for the new page, usually in JSON format, is retrieved by the browser via [AJAX](https://developer.mozilla.org/en-US/docs/AJAX/Getting_Started) requests to the server. The SPA then dynamically updates the page with the data via JavaScript, which it has already downloaded in the initial page load. This model is similar to how native mobile apps work.

The benefits:

- The app feels more responsive and users do not see the flash between page navigations due to full-page refreshes.
- Fewer HTTP requests are made to the server, as the same assets do not have to be downloaded again for each page load.
- Clear separation of the concerns between the client and the server; you can easily build new clients for different platforms (e.g. mobile, chatbots, smart watches) without having to modify the server code. You can also modify the technology stack on the client and server independently, as long as the API contract is not broken.

The downsides:

- Heavier initial page load due to loading of framework, app code, and assets required for multiple pages.
- There's an additional step to be done on your server which is to configure it to route all requests to a single entry point and allow client-side routing to take over from there.
- SPAs are reliant on JavaScript to render content, but not all search engines execute JavaScript during crawling, and they may see empty content on your page. This inadvertently hurts the Search Engine Optimization (SEO) of your app. However, most of the time, when you are building apps, SEO is not the most important factor, as not all the content needs to be indexable by search engines. To overcome this, you can either server-side render your app or use services such as [Prerender](https://prerender.io/) to "render your javascript in a browser, save the static HTML, and return that to the crawlers".

###### References

- https://github.com/grab/front-end-guide#single-page-apps-spas
- http://stackoverflow.com/questions/21862054/single-page-app-advantages-and-disadvantages
- http://blog.isquaredsoftware.com/presentations/2016-10-revolution-of-web-dev/
- https://medium.freecodecamp.com/heres-why-client-side-rendering-won-46a349fadb52

[[↑] Bumalik sa taas](#talaan-ng-nilalaman)

### Ano ang lawak ng iyong karanasan sa Mga Pangako at/o ang kanilang mga polyfill?

Possess working knowledge of it. A promise is an object that may produce a single value some time in the future: either a resolved value, or a reason that it's not resolved (e.g., a network error occurred). A promise may be in one of 3 possible states: fulfilled, rejected, or pending. Promise users can attach callbacks to handle the fulfilled value or the reason for rejection.

Some common polyfills are `$.deferred`, Q and Bluebird but not all of them comply to the specification. ES2015 supports Promises out of the box and polyfills are typically not needed these days.

###### References

- https://medium.com/javascript-scene/master-the-javascript-interview-what-is-a-promise-27fc71e77261

[[↑] Bumalik sa taas](#talaan-ng-nilalaman)

### Ano ang mga kalamangan at kahinaan ng paggamit ng mga pangako sa halip ng mga callback?

**Pros**

- Avoid callback hell which can be unreadable.
- Makes it easy to write sequential asynchronous code that is readable with `.then()`.
- Makes it easy to write parallel asynchronous code with `Promise.all()`.

**Cons**

- Slightly more complex code (debatable).
- In older browsers where ES2015 is not supported, you need to load a polyfill in order to use it.

[[↑] Bumalik sa taas](#talaan-ng-nilalaman)

### Ano ang ilan sa mga pakinabang o di-pakinabang ng pagsulat ng JavaScript code sa isang wika na naka-compile sa JavaScript?

Some examples of languages that compile to JavaScript include CoffeeScript, Elm, ClojureScript, PureScript and TypeScript.

Advantages:

- Fixes some of the longstanding problems in JavaScript and discourages JavaScript anti-patterns.
- Enables you to write shorter code, by providing some syntactic sugar on top of JavaScript, which I think ES5 lacks, but ES2015 is awesome.
- Static types are awesome (in the case of TypeScript) for large projects that need to be maintained over time.

Disadvantages:

- Require a build/compile process as browsers only run JavaScript and your code will need to be compiled into JavaScript before being served to browsers.
- Debugging can be a pain if your source maps do not map nicely to your pre-compiled source.
- Most developers are not familiar with these languages and will need to learn it. There's a ramp up cost involved for your team if you use it for your projects.
- Smaller community (depends on the language), which means resources, tutorials, libraries and tooling would be harder to find.
- IDE/editor support might be lacking.
- These languages will always be behind the latest JavaScript standard.
- Developers should be cognizant of what their code is being compiled to — because that is what would actually be running, and that is what matters in the end.

Practically, ES2015 has vastly improved JavaScript and made it much nicer to write. I don't really see the need for CoffeeScript these days.

###### References

- https://softwareengineering.stackexchange.com/questions/72569/what-are-the-pros-and-cons-of-coffeescript

[[↑] Bumalik sa taas](#talaan-ng-nilalaman)

### Anong mga kagamitan at pamamaraan ang ginagamit mo sa pag-debug ng JavaScript na code?

- React and Redux
  - [React Devtools](https://github.com/facebook/react-devtools)
  - [Redux Devtools](https://github.com/gaearon/redux-devtools)
- JavaScript
  - [Chrome Devtools](https://hackernoon.com/twelve-fancy-chrome-devtools-tips-dc1e39d10d9d)
  - `debugger` statement
  - Good old `console.log` debugging

###### References

- https://hackernoon.com/twelve-fancy-chrome-devtools-tips-dc1e39d10d9d
- https://raygun.com/blog/javascript-debugging/

[[↑] Bumalik sa taas](#talaan-ng-nilalaman)

### Anong mga pag-construct ng wika ang ginagamit mo para sa pag-ulit sa mga katangian ng bagay at mga item na array?

For objects:

- `for` loops - `for (var property in obj) { console.log(property); }`. However, this will also iterate through its inherited properties, and you will add an `obj.hasOwnProperty(property)` check before using it.
- `Object.keys()` - `Object.keys(obj).forEach(function (property) { ... })`. `Object.keys()` is a static method that will lists all enumerable properties of the object that you pass it.
- `Object.getOwnPropertyNames()` - `Object.getOwnPropertyNames(obj).forEach(function (property) { ... })`. `Object.getOwnPropertyNames()` is a static method that will lists all enumerable and non-enumerable properties of the object that you pass it.

For arrays:

- `for` loops - `for (var i = 0; i < arr.length; i++)`. The common pitfall here is that `var` is in the function scope and not the block scope and most of the time you would want block scoped iterator variable. ES2015 introduces `let` which has block scope and it is recommended to use that instead. So this becomes: `for (let i = 0; i < arr.length; i++)`.
- `forEach` - `arr.forEach(function (el, index) { ... })`. This construct can be more convenient at times because you do not have to use the `index` if all you need is the array elements. There are also the `every` and `some` methods which will allow you to terminate the iteration early.

Most of the time, I would prefer the `.forEach` method, but it really depends on what you are trying to do. `for` loops allow more flexibility, such as prematurely terminate the loop using `break` or incrementing the iterator more than once per loop.

[[↑] Bumalik sa taas](#talaan-ng-nilalaman)

### Ipaliwanag ang pagkakaiba sa pagitan ng mga bagay na nababago at hindi nababago.

- What is an example of an immutable object in JavaScript?
- What are the pros and cons of immutability?
- How can you achieve immutability in your own code?

TODO

[[↑] Bumalik sa taas](#talaan-ng-nilalaman)

### Ipaliwanag ang pagkakaiba sa pagitan ng sabay at hindi sabay na punksiyon.

Synchronous functions are blocking while asynchronous functions are not. In synchronous functions, statements complete before the next statement is run. In this case the program is evaluated exactly in order of the statements and execution of the program is paused if one of the statements take a very long time.

Asynchronous functions usually accept a callback as a parameter and execution continues on the next line immediately after the asynchronous function is invoked. The callback is only invoked when the asynchronous operation is complete and the call stack is empty. Heavy duty operations such as loading data from a web server or querying a database should be done asynchronously so that the main thread can continue executing other operations instead of blocking until that long operation to complete (in the case of browsers, the UI will freeze).

[[↑] Bumalik sa taas](#talaan-ng-nilalaman)

### Ano ang loop na kaganapan? Ano ang pagkakaiba sa pagitan ng call na stack at queue ng gawain?

The event loop is a single-threaded loop that monitors the call stack and checks if there is any work to be done in the task queue. If the call stack is empty and there are callback functions in the task queue, a function is dequeued and pushed onto the call stack to be executed.

If you haven't already checked out Philip Robert's [talk on the Event Loop](https://2014.jsconf.eu/speakers/philip-roberts-what-the-heck-is-the-event-loop-anyway.html), you should. It is one of the most viewed videos on JavaScript.

###### References

- https://2014.jsconf.eu/speakers/philip-roberts-what-the-heck-is-the-event-loop-anyway.html
- http://theproactiveprogrammer.com/javascript/the-javascript-event-loop-a-stack-and-a-queue/

[[↑] Bumalik sa taas](#talaan-ng-nilalaman)

### Ipaliwanag ang mga pagkakaiba sa paggamit ng `foo` sa pagitan ng `function foo() {}` at `var foo = function() {}`

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
var foo = function () {
  console.log('FOOOOO');
};
```

###### References

- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function

[[↑] Bumalik sa taas](#talaan-ng-nilalaman)

### Ano ang mga pagkakaiba sa pagitan ng mga variable na nilikha sa pamamagitan ng paggamit ng `let`,`var` o `const`?

Variables declared using the `var` keyword are scoped to the function in which they are created, or if created outside of any function, to the global object. `let` and `const` are _block scoped_, meaning they are only accessible within the nearest set of curly braces (function, if-else block, or for-loop).

```js
function foo() {
  // All variables are accessible within functions.
  var bar = 'bar';
  let baz = 'baz';
  const qux = 'qux';

  console.log(bar); // bar
  console.log(baz); // baz
  console.log(qux); // qux
}

console.log(bar); // ReferenceError: bar is not defined
console.log(baz); // ReferenceError: baz is not defined
console.log(qux); // ReferenceError: qux is not defined
```

```js
if (true) {
  var bar = 'bar';
  let baz = 'baz';
  const qux = 'qux';
}

// var declared variables are accessible anywhere in the function scope.
console.log(bar); // bar
// let and const defined variables are not accessible outside of the block they were defined in.
console.log(baz); // ReferenceError: baz is not defined
console.log(qux); // ReferenceError: qux is not defined
```

`var` allows variables to be hoisted, meaning they can be referenced in code before they are declared. `let` and `const` will not allow this, instead throwing an error.

```js
console.log(foo); // undefined

var foo = 'foo';

console.log(baz); // ReferenceError: can't access lexical declaration 'baz' before initialization

let baz = 'baz';

console.log(bar); // ReferenceError: can't access lexical declaration 'bar' before initialization

const bar = 'bar';
```

Redeclaring a variable with `var` will not throw an error, but 'let' and 'const' will.

```js
var foo = 'foo';
var foo = 'bar';
console.log(foo); // "bar"

let baz = 'baz';
let baz = 'qux'; // Uncaught SyntaxError: Identifier 'baz' has already been declared
```

`let` and `const` differ in that `let` allows reassigning the variable's value while `const` does not.

```js
// This is fine.
let foo = 'foo';
foo = 'bar';

// This causes an exception.
const baz = 'baz';
baz = 'qux';
```

###### References

- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/let
- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/var
- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/const

[[↑] Bumalik sa taas](#talaan-ng-nilalaman)

### Ano ang mga pagkakaiba sa pagitan ng ES6 na class at mga ES5 na taga-construct na punksyon?

TODO

[[↑] Bumalik sa taas](#talaan-ng-nilalaman)

### May maaalok ka bang isang kaso ng paggamit para sa bagong arrow => sintaks ng punksyon? Paano naiiba ang bagong sintaks na ito sa iba pang mga punksyon?

TODO

[[↑] Bumalik sa taas](#talaan-ng-nilalaman)

### Ano ang bentahe para sa paggamit ng sintaks na arrow para sa isang paraan sa isang taga-construct?

TODO

[[↑] Bumalik sa taas](#talaan-ng-nilalaman)

### Ano ang kahulugan ng isang mas mataas na hanay na punksyon?

A higher-order function is any function that takes one or more functions as arguments, which it uses to operate on some data, and/or returns a function as a result. Higher-order functions are meant to abstract some operation that is performed repeatedly. The classic example of this is `map`, which takes an array and a function as arguments. `map` then uses this function to transform each item in the array, returning a new array with the transformed data. Other popular examples in JavaScript are `forEach`, `filter`, and `reduce`. A higher-order function doesn't just need to be manipulating arrays as there are many use cases for returning a function from another function. `Array.prototype.bind` is one such example in JavaScript.

**Map**

Let say we have an array of names which we need to transform each string to uppercase.

```js
const names = ['irish', 'daisy', 'anna'];
```

The imperative way will be as such:

```js
const transformNamesToUppercase = function (names) {
  const results = [];
  for (let i = 0; i < names.length; i++) {
    results.push(names[i].toUpperCase());
  }
  return results;
};
transformNamesToUppercase(names); // ['IRISH', 'DAISY', 'ANNA']
```

Use `.map(transformerFn)` makes the code shorter and more declarative.

```js
const transformNamesToUppercase = function (names) {
  return names.map((name) => name.toUpperCase());
};
transformNamesToUppercase(names); // ['IRISH', 'DAISY', 'ANNA']
```

###### References

- https://medium.com/javascript-scene/higher-order-functions-composing-software-5365cf2cbe99
- https://hackernoon.com/effective-functional-javascript-first-class-and-higher-order-functions-713fde8df50a
- https://eloquentjavascript.net/05_higher_order.html

[[↑] Bumalik sa taas](#talaan-ng-nilalaman)

### Makapagbibigaay kaba ng isang halimbawa para sa pag-destructure ng isang bagay o isang array?

Destructuring is an expression available in ES6 which enables a succinct and convenient way to extract values of Objects or Arrays, and place them into distinct variables.

**Array destructuring**

```js
// Variable assignment.
const foo = ['one', 'two', 'three'];

const [one, two, three] = foo;
console.log(one); // "one"
console.log(two); // "two"
console.log(three); // "three"
```

```js
// Swapping variables
let a = 1;
let b = 3;

[a, b] = [b, a];
console.log(a); // 3
console.log(b); // 1
```

**Object destructuring**

```js
// Variable assignment.
const o = {p: 42, q: true};
const {p, q} = o;

console.log(p); // 42
console.log(q); // true
```

###### References

- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment
- https://ponyfoo.com/articles/es6-destructuring-in-depth

[[↑] Bumalik sa taas](#talaan-ng-nilalaman)

### Ang literal na ES6 na template ay nag-aalok ng maraming kakayahan na umangkop sa pagbuo ng mga string, maaari ka bang makapagbigay ng isang halimbawa

TODO

[[↑] Bumalik sa taas](#talaan-ng-nilalaman)

### Makapagbibigay kaba ng isang halimbawa ng isang punksyon na curry at kung bakit ang sintaks na ito ay nag-aalok ng isang kalamangan?

Currying is a pattern where a function with more than one parameter is broken into multiple functions that, when called in series, will accumulate all of the required parameters one at a time. This technique can be useful for making code written in a functional style easier to read and compose. It's important to note that for a function to be curried, it needs to start out as one function, then broken out into a sequence of functions that each take one parameter.

```js
function curry(fn) {
  if (fn.length === 0) {
    return fn;
  }

  function _curried(depth, args) {
    return function (newArgument) {
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

- https://hackernoon.com/currying-in-js-d9ddc64f162e

[[↑] Bumalik sa taas](#talaan-ng-nilalaman)

### Ano ang mga pakinabang ng paggamit ng spread na sintaks at kung paano ito naiiba mula sa rest na sintaks?

ES6's spread syntax is very useful when coding in a functional paradigm as we can easily create copies of arrays or objects without resorting to `Object.create`, `slice`, or a library function. This language feature is used often in Redux and RxJS projects.

```js
function putDookieInAnyArray(arr) {
  return [...arr, 'dookie'];
}

const result = putDookieInAnyArray(['I', 'really', "don't", 'like']); // ["I", "really", "don't", "like", "dookie"]

const person = {
  name: 'Todd',
  age: 29,
};

const copyOfTodd = {...person};
```

ES6's rest syntax offers a shorthand for including an arbitrary number of arguments to be passed to a function. It is like an inverse of the spread syntax, taking data and stuffing it into an array rather than unpacking an array of data, and it works in function arguments, as well as in array and object destructuring assignments.

```js
function addFiveToABunchOfNumbers(...numbers) {
  return numbers.map((x) => x + 5);
}

const result = addFiveToABunchOfNumbers(4, 5, 6, 7, 8, 9, 10); // [9, 10, 11, 12, 13, 14, 15]

const [a, b, ...rest] = [1, 2, 3, 4]; // a: 1, b: 2, rest: [3, 4]

const {e, f, ...others} = {
  e: 1,
  f: 2,
  g: 3,
  h: 4,
}; // e: 1, f: 2, others: { g: 3, h: 4 }
```

###### References

- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax
- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/rest_parameters
- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment

[[↑] Bumalik sa taas](#talaan-ng-nilalaman)

### Paano ka makakabahagi ng code sa pagitan ng mga file?

TODO

[[↑] Bumalik sa taas](#talaan-ng-nilalaman)

### Bakit gusto mong lumikha ng mga statik na miyembro ng klase?

TODO

[[↑] Bumalik sa taas](#talaan-ng-nilalaman)

### Mga Ibang Sagot

- http://flowerszhong.github.io/2013/11/20/javascript-questions.html
