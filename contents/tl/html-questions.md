---
title: Mga Tanong sa HTML
---

Mga sagot sa [Mga Tanong sa Pakikipanayam para sa Trabahong Pangfront-end - Mga Tanong sa HTML](https://github.com/h5bp/Front-end-Developer-Interview-Questions/blob/master/src/questions/html-questions.md). Malugod naming tatanggaping ang mga pull request para sa mga mungkahi at mga koreksyon

## Talaan ng nilalaman

- [Ano ang ginagawa ng `DOCTYPE`?](#ano-ang-ginagawa-ng-doctype)
- [Papaano mo ihahain ang pahinang may iba't-ibang lenggwaheng nilalaman?](#papaano-mo-ihahain-ang-pahinang-may-ibat-ibang-lenggwaheng-nilalaman)
- [Anong uri ng mga bagay ang dapat mong ingatan ukol sa pagdidisenyo o pag-develop ng mga multilingual na site?](#anong-uri-ng-mga-bagay-ang-dapat-mong-ingatan-ukol-sa-pagdidisenyo-o-pag-develop-ng-mga-multilingual-na-site)
- [Saan maganda ang mga `data-`na katangian?](#saan-maganda-ang-mga-data-na-katangian)
- [Isaalang-alang ang HTML5 bilang isang bukas na web platform. Ano-ano ang mga pangunahing sangkap ng HTML5?](#isaalang-alang-ang-html5-bilang-isang-bukas-na-web-platform-ano-ano-ang-mga-pangunahing-sangkap-ng-html5)
- [Ilarawan ang pagkakaiba sa pagitan ng isang `cookie`,`sessionStorage` at `localStorage`.](#ilarawan-ang-pagkakaiba-sa-pagitan-ng-isang-cookie-sessionstorage-at-localstorage)
- [Ilarawan ang pagkakaiba sa pagitan ng `<script>`, `<script async>` at `<script defer>`.](#ilarawan-ang-pagkakaiba-sa-pagitan-ng-script-script-async-at-script-defer)
- [Bakit karaniwang magandang ideya na ilagay ang mga CSS `<link>` sa pagitan ng `<head> </ head>` at JS `<script>` s bago ang `/ <body>`? May alam ka bang anumang mga pagbubukod?](#bakit-karaniwang-magandang-ideya-na-ilagay-ang-mga-css-link-sa-pagitan-ng-head-head-at-js-script-s-bago-ang-body-may-alam-ka-bang-anumang-mga-pagbubukod)
- [Ano ang progresibong pag-render?](#ano-ang-progresibong-pag-render)
- [Bakit ka gagamit ng isang `srcset` na katangian sa isang tag ng imahe? Ipaliwanag ang proseso na ginagamit ng browser sa pagsuri ng nilalaman ng katangiang ito.](#bakit-ka-gagamit-ng-isang-srcset-na-katangian-sa-isang-tag-ng-imahe-ipaliwanag-ang-proseso-na-ginagamit-ng-browser-sa-pagsuri-ng-nilalaman-ng-katangiang-ito)
- [Nakagamit ka na ba ng ibang lenggwahe sa pag-template ng HTML?](#nakagamit-ka-na-ba-ng-ibang-lenggwahe-sa-pag-template-ng-html)

### Ano ang ginagawa ng `DOCTYPE`?

Ang `DOCTYPE` ay isang pagdadaglat para sa "uri ng dokumento". Ito ay isang deklarasyon na ginagamit sa HTML upang makilala sa pagitan ng pamantayan na mode at [quirks na mode](https://quirks.spec.whatwg.org/#history). Ang presensya nito ay nagsasabi sa browser na i-render ang web page sa mga pamantayan na mode.

Moral ng kuwento - idagdag lamang ang `<! DOCTYPE html>` sa simula ng iyong pahina.

###### Mga Reperensiya

- https://stackoverflow.com/questions/7695044/what-does-doctype-html-do
- https://www.w3.org/QA/Tips/Doctype
- https://quirks.spec.whatwg.org/#history

[[↑] Bumalik sa taas](#talaan-ng-nilalaman)

### Papaano mo ihahain ang pahinang may iba't-ibang lenggwaheng nilalaman?

Ang tanong ay medyo hindi malinaw, ipinapalagay ko na ito ay nagtatanong tungkol sa pinaka-karaniwang kaso, na kung paano maghain ng isang pahina na may nilalaman na magagamit sa maraming wika, ngunit ang nilalaman sa loob ng pahina ay dapat na ipakita lamang sa isang tuloy-tuloy na parehong wika.

Kapag ang isang HTTP na kahilingan ay ginawa sa isang serber, karaniwang nagpapadala ang humiling na ahente ng gumagamit ng impormasyon tungkol sa mga kagustuhan sa wika, tulad ng sa header na `Tanggapin-Wika`. Pagkatapos ay maaring gamitin ng serber ang impormasyong ito upang ibalik ang isang bersyon ng dokumento sa naaangkop na wika kung may alternatibong pwede. Ang isang ibinalik na dokumentong HTML ay dapat ding ipahayag ang `lang` na katangian sa`<html>`na tag, tulad ng`html html = 'en"> ... </ html>`.

Sa back end, ang HTML markup ay maglalaman ng mga `i18n` na placeholder at para sa partikular na wika na naka-imbak sa mga format ng YML o JSON. Pagkatapos ay dynamikong bubuuin ng server ang pahina ng HTML na naglalaman sa partikular na wika, kadalasan sa tulong ng back end na balangkas.

###### Mga Reperensiya

- https://www.w3.org/International/getting-started/language

[[↑] Bumalik sa taas](#talaan-ng-nilalaman)

### Anong uri ng mga bagay ang dapat mong ingatan ukol sa pagdidisenyo o pag-develop ng mga multilingual na site?

- Gumamit ng `lang` na katangian sa iyong HTML.
- Pag-direkta sa mga gumagamit sa kanilang katutubong wika - Payagan ang isang gumagamit na baguhin ang kanyang bansa / wika nang walang abala.
- Ang teksto sa mga imahe ay hindi isang nasusukat na diskarte - Ang paglalagay ng teksto sa isang imahe ay isang sikat pa rin na paraan upang makakuha ng mga kagandahan, di-systemang mga font na ipapakita sa anumang kompyuter. Gayunpaman upang i-translate ang teksto ng imahe, ang bawat string ng teksto ay kailangang magkaroon ng isang hiwalay na imahe na ililikha para sa bawat wika. Anumang bagay na higit pa sa isang dakot ng kapalit na tulad nito ay maaaring mabilis na mawalan ng kontrol.
- Maging maingat sa mga isyu ng layout o overflow sa disenyo. Pinakamainam na iwasan ang pagdisenyo kung saan ang halaga ng teksto ay makakasira sa isang disenyo. Ang mga bilang ng mga character ay nakikipaglaro sa mga bagay na tulad ng mga headline, mga label, at mga pindutan. Mas mababa ang mga ito sa isang isyu sa libreng dumadaloy na teksto tulad ng teksto ng katawan o mga komento.
- Pag-isipan kung paano nakikita ang mga kulay - Ang mga kulay ay itinuturing na isang paghatol din sa mga wika at kultura. Ang disenyo ay dapat gumamit ng kulay kung ano man ang naaangkop.
- Mga petsa at pera sa pag-format - Ang mga petsa ng kalendaryo ay ipinapahayag minsan sa iba't ibang paraan. Halimbawa, "Mayo 31, 2012" sa U.S. kumpara sa "31 Mayo 2012" sa mga bahagi ng Europa.
- Huwag pagsama-samahin ang mga isinalin na mga string - Huwag gumawa ng anumang bagay tulad ng `"Ang petsa ngayon ay "+ date`.Ito ay makasisira sa mga wika na may iba't ibang pagkasunod-sunod ng mga salita. Gumamit ng isang string ng template na may mga parameter na pagpapalit para sa bawat wika sa halip. Halimbawa, tingnan ang sumusunod na dalawang pangungusap sa wikang Ingles at Tsino: `Maglalakbay ako sa {% date%}` at `{% date%} 我 会 出发`. Tandaan na ang posisyon ng variable ay naiiba dahil sa mga tuntunin ng grammar ng wika.
- Direksyon sa pagbabasa ng wika - Sa Ingles, binabasa namin mula sa kaliwa papuntang kanan, mula itaas papuntang pailalim, habang sa tradisyunal na Hapon naman, ang teksto ay binabasa nang pababa, mula kanan papuntang kaliwa.

###### Mga Reperensiya

- https://www.quora.com/What-kind-of-things-one-should-be-wary-of-when-designing-or-developing-for-multilingual-sites

[[↑] Bumalik sa taas](#talaan-ng-nilalaman)

### Saan maganda ang mga `data-`na katangian?

Bago pa man naging sikat ang mga balangkas ng JavaScript, ginagamit na ng mga front-end developer ang mga katangian ng `data-` upang mag-imbak ng sobrang data sa loob mismo ng DOM, nang walang iba pang mga hack gaya ng mga di-karaniwang mga katangian, mga dagdag na katangian sa DOM. Ito ay inilaan upang mag-imbak ng pribadong pasadyang data sa pahina o aplikasyon, na kung saan walang mas naaangkop na mga katangian o mga elemento.

These days, using `data-` attributes is not encouraged. One reason is that users can modify the data attribute easily by using inspect element in the browser. The data model is better stored within JavaScript itself and stay updated with the DOM via data binding possibly through a library or a framework.

###### Mga Reperensiya

- http://html5doctor.com/html5-custom-data-attributes/
- https://www.w3.org/TR/html5/dom.html#embedding-custom-non-visible-data-with-the-data-*-attributes

[[↑] Bumalik sa taas](#talaan-ng-nilalaman)

### Isaalang-alang ang HTML5 bilang isang bukas na web platform. Ano-ano ang mga pangunahing sangkap ng HTML5?

- Mga semantika - Nagpapahintulot sa iyo na ilarawan nang mas tiyak kung ano ang nilalaman.
- Pagkakakonekta - Binibigyang-daan ka na makipag-ugnay sa serber sa mga bago at makabagong pamamaraan.
- Offline at imbakan - Pinapayagan ang mga webpage na mag-imbak ng data sa lokal na client-side at mag-operate sa paraang offline nang mas mahusay.
- Multimedia - Paggawa ng mga pangmamamayang de-kalidad na video at audio sa Open Web.
- 2D / 3D na mga grapiks at mga effects - Pinapayagan ang mas malawak na hanay ng mga pagpipilian sa pagtatanghal.
- Pagsasagawa at pagsasama - Pagbibigay ng mabilis na pag-optimize at mas mahusay na paggamit ng hardware sa kompyuter.
- Akses ng device - Nagpapahintulot para sa paggamit ng iba't ibang mga input at output na aparato.
- Pag-istilo - Pagpapaalam sa mga may-akda na magsulat ng mas sopistikadong mga tema.

###### Mga Reperensiya

- https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/HTML5

[[↑] Bumalik sa taas](#talaan-ng-nilalaman)

### Ilarawan ang pagkakaiba sa pagitan ng isang `cookie`,`sessionStorage` at `localStorage`.

Ang lahat ng nabanggit na mga teknolohiya ay ang mahahalagang mekanismo ng imbakan sa parte ng kliyente. Ang mga ito ay maaari lamang mag-imbak ng mga halaga bilang mga string.

|  | `cookie` | `localStorage` | `sessionStorage` |
| --- | --- | --- | --- |
| Tagasimula | Kliyente o serber. Ang serber ay pwedeng gumamit ng `Set-Cookie` na header | Kliyente | Kliyente |
| Pag-expire | Mano-manong pag-set | Habang buhay | Nasa tab malapit |
| Patuloy sa lahat ng mga sesyon ng browser | Depende sa kung ang panahon nng pag-expire ay itinakda | Oo | Hindi |
| Ipinadala sa server sa bawat kahilingan ng HTTP | Ang mga cookies ay awtomatikong ipinadala sa pamamagitan ng `Cookie`na header | Hindi | Hindi |
| Kapasidad (kada domain) | 4kb | 5MB | 5MB |
| kayang i-aakses | Kahit na anong bintana | Kahit na anong bintana | Parehong tab |

###### Mga Reperensiya

- https://developer.mozilla.org/en-US/docs/Web/HTTP/Cookies
- http://tutorial.techaltum.com/local-and-session-storage.html

[[↑] Bumalik sa taas](#talaan-ng-nilalaman)

### Ilarawan ang pagkakaiba sa pagitan ng `<script>`, `<script async>` at `<script defer>`.

- `<script>` - Ang pag-parse ng HTML ay naka-block, ang script ay kinuha at agad na pinaandar, ang pag-parse ng HTML ay ipagpapatuloy pagkatapos na maisagawa ang script.
- `<script async>` - Ang script ay kukunin na kahilera sa pag-parse ng HTML at maisagawa sa lalong madaling panahon na ito ay magagamit (may potensyal bago makumpleto ang pag-parse ng HTML). Gumamit ng `async` kapag ang script ay malaya sa anumang iba pang mga script sa pahina, halimbawa ay mga analitika.
- `<script defer>` - Ang script ay kukuha ng kahanay sa pag-parse ng HTML at isasagawa kapag natapos na ang pahina sa pag-parse. Kung maraming ganito, ang bawat ipinagpaliban na script ay ipapagana ayon sa pagkakasunud-sunod sa panahong itoy nasagupaan sa dokumento. Kung ang isang script ay umaasa sa isang ganap na nai-parse na DOM, ang `defer` na katangian ay magiging kapaki-pakinabang sa pagtitiyak na ang HTML ay ganap na ma-parse bago pa man isagawa. Hindi gaanong naiiba ang paglagay ng normal na `<script>` sa dulo ng `` body '`. Ang isang ipinagpaliban na script ay hindi dapat maglalaman ng`document.write`.

Tandaan: Ang mga katangian ng `async` at `defer` ay binabalewala para sa mga script na walang katangian na `src`.

###### Mga Reperensiya

- http://www.growingwiththeweb.com/2014/02/async-vs-defer-attributes.html
- https://stackoverflow.com/questions/10808109/script-tag-async-defer
- https://bitsofco.de/async-vs-defer/

[[↑] Bumalik sa taas](#talaan-ng-nilalaman)

### Bakit karaniwang magandang ideya na ilagay ang mga CSS `<link>` sa pagitan ng `<head> </ head>` at JS `<script>` s bago ang `/ <body>`? May alam ka bang anumang mga pagbubukod?

** Paglalagay ng mga `<link>` sa `<head>` **

Ang paglagay ng mga `<link>` sa ulo ay bahagi ng ispisipikasyon. Bukod diyan, ang paglalagay sa itaas ay nagbibigay-daan sa pahina na mag-render sa paraang progresibo na nagpapabuti sa karanasan ng gumagamit. Ang problema sa paglalagay ng mga stylesheet malapit sa ilalim ng dokumento ay ipinagbabawal nito ang progresibong pag-render sa maraming browser, kabilang dito ang Internet Explorer. Ang ilang mga browser ay nag-block ng pag-render upang maiwasan ang pag-repaint ng mga elemento ng pahina kung ang kanilang mga estilo ay mabago. Ang gumagamit ay stuck sa pagtingin sa isang blangko na puting pahina. Pinipigilan nito ang flash ng mga walang istilong nilalaman.

** Paglalagay ng mga `<script>` bago ang `</ body>` **

Ang pag-parse ng mga `<script>` na block HTML habang ang mga ito ay nai-download at naisakatuparan. Ang pag-download ng mga script sa ibaba ay magbibigay-daan sa HTML na ma-parse at maipakita muna sa gumagamit.

Ang isang pagbubukod para sa pagpoposisyon ng mga `<script>` sa baba ay kapag ang iyong script ay naglalaman ng `document.write ()`, ngunit sa panahon ngayon ay hindi mahusay na kasanayan ang paggamit ng `document.write ()`. Gayundin, ang paglalagay ng mga `<script>` sa ibaba ay nangangahulugan na ang browser ay hindi maaaring magsimulang mag-download ng mga script hanggang sa ma-parse muna ang buong dokumento. Ang isang posibleng paraan ay ilagay ang `<script>` sa `<head>` at gamitin ang `defer` na katangian.

###### Mga Reperensiya

- https://developer.yahoo.com/performance/rules.html#css_top

[[↑] Bumalik sa taas](#talaan-ng-nilalaman)

### Ano ang progresibong pag-render?

Ang progresibong pag-render ay ang pangalan na ibinigay sa mga teknik na ginagamit upang mapabuti ang pagganap ng isang webpage (lalo na, ipinagbubuti ang oras ng pag-load) upang mag-render ng nilalaman para ipakita nang mabilisan hangga't maaari.

Ito ay ginagamit ng mas laganap noong mga araw na wala pang broadband internet ngunit pa rin ito ay kapaki-pakinabang sa modernong pag-unlad bilang mga mobile na koneksyon ng data lalo na't ang mga mobile data na koneksyon ay unti-unting popular (at hindi kapani-paniwala)!

Mga halimbawa ng naturang pamamaraan:

- Mabagal na pag-load ng mga imahe - Ang lahat ng mga imahe sa pahina ay hindi nag-load ng sabay-sabay. Ang JavaScript ay gagamitin upang mag-load ng isang imahe kapag nag-scroll ang gumagamit sa bahagi ng pahina na nagpapakita ng imahe.
- Pag-prioritize ng nakikitang nilalaman (o pag-render sa itaas ng tiklop) - Isama lamang ang pinakamaliit na CSS / nilalaman / script na kailangan para sa dami ng pahina na mai-render sa unang gumagamit ng browser upang ipakita nang mabilis hangga't maaari, maaari mong gamitin ang ipinagpaliban na script o makinig para sa kaganapan ng `DOMContentLoaded` /` load ' upang mag-load sa iba pang mga mapagkukunan at nilalaman.
- Mga fragment ng Async HTML - Ang mga bahagi ng HTML sa pag-flush sa browser habang ginagawa ang pahina sa back end. Ang mga higit pang mga detalye sa pamamaraan ay matatagpuan [dito](http://www.ebaytechblog.com/2014/12/08/async-fragments-rediscovering-progressive-html-rendering-with-marko/).

###### Mga Reperensiya

- https://stackoverflow.com/questions/33651166/what-is-progressive-rendering
- http://www.ebaytechblog.com/2014/12/08/async-fragments-rediscovering-progressive-html-rendering-with-marko/

[[↑] Bumalik sa taas](#talaan-ng-nilalaman)

### Bakit ka gagamit ng isang `srcset` na katangian sa isang tag ng imahe? Ipaliwanag ang proseso na ginagamit ng browser sa pagsuri ng nilalaman ng katangiang ito.

TODO

[[↑] Bumalik sa taas](#talaan-ng-nilalaman)

### Nakagamit ka na ba ng ibang lenggwahe sa pag-template ng HTML?

Oo, Pug (dating Jade), ERB, Slim, Handlebars, Jinja, Liquid, upang pangalanan lamang ang ilan. Sa palagay ko, ang mga ito ay higit pa o mas mababa na parehong nagbibigay ng katulad na pag-andar ng nilalamang tumatakas at kapaki-pakinabang na mga pag-sala para sa pagmamanipula ng datos na ipapakita. Ang karamihan sa mga engine sa pag-template ay magpapahintulot din sa iyo na mag-inject ng iyong sariling mga pag-sala sa kaganapan na kailangan mo ng pasadyang pagproseso bago ipakita. [[↑] Bumalik sa taas](#talaan-ng-nilalaman)

### Mga Ibang Sagot

- https://neal.codes/blog/front-end-interview-questions-html/
- http://peterdoes.it/2015/12/03/a-personal-exercise-front-end-job-interview-questions-and-my-answers-all/
