---
title: Mga Katanungan sa CSS
---

Mga kasagutan sa [Mga Kasagutan sa Pakikipanayam sa Front-end na Trabaho - Mga Katanungan sa CSS](https://github.com/h5bp/Front-end-Developer-Interview-Questions/blob/master/src/questions/css-questions.md). Malugod na tatanggapin ang mga Pull request para sa mga suhestyon at mga koreksyon!

## Talaan ng nilalaman

- [Ano ang pagsisigurado ng CSS selector at kung paano ito gumagana?](#ano-ang-pagsisigurado-ng-css-selector-at-kung-paano-ito-gumagana)
- [Ano ang pagkakaiba sa pagitan ng "pag-reset" at "pag-normalize" ng CSS? saan sa dalawa ang iyong pipiliin, at bakit?](#ano-ang-pagkakaiba-sa-pagitan-ng-pag-reset-at-pag-normalize-ng-css-saan-sa-dalawa-ang-iyong-pipiliin-at-bakit)
- [Ilarawan ang mga `float` at kung paano sila gumagana.](#ilarawan-ang-mga-float-at-kung-paano-sila-gumagana)
- [Ilarawan ang z-index at kung papaano nabuo ang konteksto.](iIlarawan-ang-z-index-at-kung-papaano-nabuo-ang-konteksto)
- [Ilarawan ang BFK (Block Formatting na Konteksto) at papaaano ito gumagana.](#ilarawan-ang-bfk-block-formatting-na-konteksto-at-papaaano-ito-gumagana)
- [Ano ang iba't ibang teknik ng paglilinis at kung ano ang nararapat sa kung ano ang konteksto?](#ano-ang-ibat-ibang-teknik-ng-paglilinis-at-kung-ano-ang-nararapat-sa-kung-ano-ang-konteksto)
- [Ipaliwanag ang mga CSS na sprite, at papaano mo ipapatupad ang mga ito sa isang pahina o site.](#ipaliwanag-ang-mga-css-na-sprite-at-papaano-mo-ipapatupad-ang-mga-ito-sa-isang-pahina-o-site)
- [Papaano mo didiskartehan ang pag-aayos ng mga ispisipik sa browser na pag-eestilo na isyu?](#papaano-mo-didiskartehan-ang-pag-aayos-ng-mga-ispisipik-sa-browser-na-pag-eestilo-na-isyu)
- [Papaano mo inahahanda ang iyong mga pahina para sa mga browser na kulang sa tampok? Ano-ano ang mga teknik or proseso ang iyong ginagamit?](#papaano-mo-inahahanda-ang-iyong-mga-pahina-para-sa-mga-browser-na-kulang-sa-tampok-ano-ano-ang-mga-teknik-or-proseso-ang-iyong-ginagamit)
- [Ano-ano ang mga iba't ibang pamamaraan upang matago ang nakatagong nilalaman (at gawan ng paraan na ito ay magagamit lamang ng mga mambabasa ng iskrin)?](#ano-ano-ang-mga-ibat-ibang-pamamaraan-upang-matago-ang-nakatagong-nilalaman-at-gawan-ng-paraan-na-ito-ay-magagamit-lamang-ng-mga-mambabasa-ng-iskrin)
- [Ikaw ba ay nakagamit kailanman ng sistemang grid?, at kung gayon, Ano ang iyong mas pipiliin?](#ikaw-ba-ay-nakagamit-kailanman-ng-sistemang-grid-at-kung-gayon-ano-ang-iyong-mas-pipiliin)
- [Ikaw ba ay nakagamit oh nakapagpatupad na ng mga query sa mobile o mga layout na espisipik sa mobile/CSS?](#ikaw-ba-ay-nakagamit-oh-nakapagpatupad-na-ng-mga-query-sa-mobile-o-mga-layout-na-espisipik-sa-mobilecss)
- [Ikaw ba ay pamilyar sa estilong SVG?](#ikaw-ba-ay-pamilyar-sa-estilong-svg)
- [Makapagbibigay kaba ng halimbawa ng klase ng @media maliban sa iskrin?](#makapagbibigay-kaba-ng-halimbawa-ng-klase-ng-media-maliban-sa-iskrin)
- [Ano-ano ang ilan sa mga "pasabog" para sa epektibong pagsusulat ng CSS?](#ano-ano-ang-ilan-sa-mga-pasabog-para-sa-epektibong-pagsusulat-ng-css)
- [Ano ang mga pakinabang o di-pakinabang ng paggamit ng mga preprocessors ng CSS?](#ano-ang-mga-pakinabang-o-di-pakinabang-ng-paggamit-ng-mga-preprocessors-ng-css)
- [Ilarawan kung ano ang iyong gusto at di gusto tungkol sa CSS na mga preprocessor na iyong nagamit.](#ilarawan-kung-ano-ang-iyong-gusto-at-di-gusto-tungkol-sa-css-na-mga-preprocessor-na-iyong-nagamit)
- [Papaano mo ipapatupad ang isang web design comp na gumagamit ng mga di pangkaraniwang font?](#papaano-mo-ipapatupad-ang-isang-web-design-comp-na-gumagamit-ng-mga-di-pangkaraniwang-font)
- [Ipaliwanag kung paano tinutukoy ng isang browser kung anu-anong mga elemento ang tumutugma sa tagapili ng CSS.](#ipaliwanag-kung-paano-tinutukoy-ng-isang-browser-kung-anu-anong-mga-elemento-ang-tumutugma-sa-tagapili-ng-css)
- [Ilarawan ang mga elementong pseudo at talakayin kung para saan ito gagamitin.](#ilarawan-ang-mga-elementong-pseudo-at-talakayin-kung-para-saan-ito-gagamitin)
- [Ipaliwanag ang iyong pagkakaintindi sa modelong kahon at papaano mo pagsasabihan ang browser sa CSS na mag-render ng iyong layout sa iba't ibang modelo ng kahon.](#ipaliwanag-ang-iyong-pagkakaintindi-sa-modelong-kahon-at-papaano-mo-pagsasabihan-ang-browser-sa-css-na-mag-render-ng-iyong-layout-sa-ibat-ibang-modelo-ng-kahon)
- [Ano ang ginagawa ng `* { box-sizing: border-box; }`? Anu-ano ang mga pakinabang nito?](#ano-ang-ginagawa-ng---box-sizing-border-box--anu-ano-ang-mga-pakinabang-nito)
- [Ano ang katangian ng CSS na `display` at pwede ka bang magbigay ng ilang mga halimbawa ng paggamit nito?](#ano-ang-katangian-ng-css-na-display-at-pwede-ka-bang-magbigay-ng-ilang-mga-halimbawa-ng-paggamit-nito)
- [Ano ang pagkakaiba sa pagitan ng `inline` at `inline-block`?](#ano-ang-pagkakaiba-sa-pagitan-ng-inline-at-inline-block)
- [Ano ang pagkakaiba sa pagitan ng `relative`, `fixed`, `absolute` at elementong nakaposisyong panig sa `static`?](#ano-ang-pagkakaiba-sa-pagitan-ng-relative-fixed-absolute-at-elementong-nakaposisyong-panig-sa-static)
- [Ano ang mga umiiral na framework ng CSS na ginamit mo ng lokal, o kaya naman ay sa produksyon? Papaano mo babaguhin o mapapabuti ang mga ito?](#ano-ang-mga-umiiral-na-framework-ng-css-na-ginamit-mo-ng-lokal-o-kaya-naman-ay-sa-produksyon-papaano-mo-babaguhin-o-mapapabuti-ang-mga-ito)
- [Ikaw ba ay nakapaglaro na sa paligid ng bagong CSS Flexbox o Grid na specs?](#ikaw-ba-ay-nakapaglaro-na-sa-paligid-ng-bagong-css-flexbox-o-grid-na-specs)
- [Maipapaliwanag mo ba ang kaibahan sa pagitan ng pag-code ng isang web site na tumutugon kumpara sa paggamit ng diskarteng mobile ang una?](#maipapaliwanag-mo-ba-ang-kaibahan-sa-pagitan-ng-pag-code-ng-isang-web-site-na-tumutugon-kumpara-sa-paggamit-ng-diskarteng-mobile-ang-una)
- [Sa anong paraan naiiba ang disenyo ng tumutugon mula sa disenyo ng umaangkop?](#sa-anong-paraan-naiiba-ang-disenyo-ng-tumutugon-mula-sa-disenyo-ng-umaangkop)
- [Ikaw ba ay nakagamit na ng mga grapikong retina? kung gayon, kelan at anu-anong mga teknik ang iyong ginamit?](#ikaw-ba-ay-nakagamit-na-ng-mga-grapikong-retina-kung-gayon-kelan-at-anu-anong-mga-teknik-ang-iyong-ginamit)
- [May kadahilanan ba na nais mong gamitin ang `translate()` kesa sa `absolute` na pag-poposisyon, o kabaliktaran? at bakit?](#may-kadahilanan-ba-na-nais-mong-gamitin-ang-translate-kesa-sa-absolute-na-pag-poposisyon-o-kabaliktaran-at-bakit)

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

- https://www.smashingmagazine.com/2007/07/css-specificity-things-you-should-know/
- https://www.sitepoint.com/web-foundations/specificity/

[[↑] Bumalik sa taas](#talaan-ng-nilalaman)

### Ano ang pagkakaiba sa pagitan ng "pag-reset" at "pag-normalize" ng CSS? saan sa dalawa ang iyong pipiliin, at bakit?

- **Pag-reset** - Ang pag-reset ay sinadya upang i-strip ang lahat ng mga default na pag-istilo ng browser sa mga elemento. Halimbawa. mga `margin`,mga `padding`,mga `font-size` ng lahat ng mga elemento ay naka-set upang maging pareho. Kakailanganin mong ideklara ulit ang estilo para sa karaniwang mga elemento ng tipograpiya.
- **Pag-normalize** - Ang pag-normalize ay pinapanatili ang kapaki-pakinabang na mga estilo ng default sa halip na i-unstyle ang lahat. Iniayos din nito ang mga bug para sa mga karaniwang dependensya ng browser.

Mas pipiliin ko ang pagreset kung meron man akong mas pinasadya o hindi tipikal na disenyo ng site tulad ng kailangan kong gawin sa karamihan ng aking sariling estilo at hindi kailangan ng anumang mga default na estilo para sa pag-aalaga.

###### Mga Reperensiya

- https://stackoverflow.com/questions/6887336/what-is-the-difference-between-normalize-css-and-reset-css

[[↑] Bumalik sa taas](#talaan-ng-nilalaman)

### Ilarawan ang mga `float` at kung paano sila gumagana.

Ang Float ay isang katangian ng CSS sa pagpoposisyon. Ang mga floated na elemento ay mananatili na isang bahagi ng daloy ng pahina, at makakaapekto sa pagpoposisyon ng mga elemento (e.g. ang teksto ay dadaloy sa palibot ng mga floated na elemento), di kagaya ng mga `position: absolute` na elemento, na inalis mula sa daloy ng pahina.

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

- https://css-tricks.com/all-about-floats/

[[↑] Bumalik sa taas](#talaan-ng-nilalaman)

### Ilarawan ang z-index at kung papaano nabuo ang konteksto.

Ang `z-index` na katangian sa CSS ay kumokontrol sa bertikal na pagkaka-ayos na pagkakasalansan ng mga elemento na sumasapaw. Ang `z-index` ay nakakaapekto lamang sa mga elemento na may `position` na may halagang hindi `static`.

Kung walang kahit na anong `z-index` na halaga, ang mga elemento ay nakasalansan sa pagkakasunud-sunod na lumilitaw sa mga DOM (ang pinakamababang mababa sa parehong antas ng herakiya ay lilitaw sa itaas).Ang mga elemento na may non-static na pagpoposisyon (at ang kanilang mga anak) ay laging makikita sa itaas ng mga elementong may default na static na pagpoposisyon, hindi alintana ang HTML na herarkiya.

Ang isang konteksto ng pagsalansan ay isang elemento na naglalaman ng set ng mga layer. Sa loob ng isang lokal na kontekstong nakasalansan, ang `z-index` na mga halaga sa mga anak nito ay naka-set na kamag-anak sa elementong iyon kaysa sa ugat ng dokumento. Ang mga layers ng nasa labas ng kontekstong iyon — i.e. mga elemento ng kapatid sa isang lokal na kontekstong nakasalansan — ay hindi makakaupo sa pagitan ng mga layer sa loob nito. Kung ang elementong B ay uupo sa itaas ng elementong A, ang isang anak na elemento ng elementong A, elementong C, ay hindi kailanman mas mataas kesa sa elementong B kahit na ang elementong C ay may mas mataas na `z-index` kesa sa elementong B.

Ang bawat kontekstong nakasalansan ay nakatimpi - matapos ang mga nilalaman ng elemento ay nakasalansan, Ang buong elemento ay isinasaalang-alang sa pagkakasunud-sunod ng pagkakasalansan sa magulang na kontekstong nakasalansan. Ang isang maliit na bilang ng mga katangian ng CSS ay sumasanhi ng isang bagong kontekstong nakasalansan, kagaya ng `opacity` na mas mababa sa 1, `filter` na hindi `none`, at `transform` na hindi `none`.

###### Mga Reperensiya

- https://css-tricks.com/almanac/properties/z/z-index/
- https://philipwalton.com/articles/what-no-one-told-you-about-z-index/
- https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Positioning/Understanding_z_index/The_stacking_context

[[↑] Bumalik sa taas](#talaan-ng-nilalaman)

### Ilarawan ang BFK (Block Formatting na Konteksto) at papaaano ito gumagana.

Ang Block Formatting na Konteksto (BFK) ay parte ng biswal na pagrender ng css ng isang pahina ng web na kung saan ang mga bloke na kahon ay inilatag. Ang mga floats, ganap na mga nakaposisyon na mga elemento, `inline-blocks`, `table-cells`, mga `table-caption`, at mga elemento na may `overflow` maliban sa `visible` (maliban kung ang halaga na ito ay pinalaganap sa viewport) na magtatag ng mga bagong konteksto sa pag-format ng bloke .

Ang BFK ay isang HTML na kahon na natutugunan ng hindi bababa sa isa sa mga sumusunod na kondisyon:

- Ang halaga ng `float` ay hindi `none`.
- Ang halaga ng `position` ay hindi `static` o `relative`.
- Ang halaga ng `display` ay `table-cell`, `table-caption`, `inline-block`, `flex`, o `inline-flex`.
- Ang halaga ng `overflow` ay hindi `visible`.

Sa isang BFK, hinawakan ang kaliwang panlabas na gilid ng bawat kahon ang kaliwang gilid ng bloke na naglalaman (for right-to-left formatting, right edges touch).

Ang mga bertikal na margin sa pagitan ng mga katabing kahon ng block-level sa isang pagbagsak ng BFK. Magpasa pa sa [Mga margin na bumabagsak](https://www.sitepoint.com/web-foundations/collapsing-margins/).

###### Mga Reperensiya

- https://developer.mozilla.org/en-US/docs/Web/Guide/CSS/Block_formatting_context
- https://www.sitepoint.com/understanding-block-formatting-contexts-in-css/

[[↑] Bumalik sa taas](#talaan-ng-nilalaman)

### Ano ang iba't ibang teknik ng paglilinis at kung ano ang nararapat sa kung ano ang konteksto?

- Walang laman na `div` na paraaan- `<div style="clear:both;"></div>`.
- Clearfix na paraan - Sumangguni sa `.clearfix` na klase sa itaas.
- `overflow: auto` o `overflow: hidden` na paraan - Magtatatag ang magulang ng isang bagong konteksto sa pag-format ng block at palawakin na naglalaman ng mga anak nito.

Sa mga malaking proyekto, Gusto kong magsulat ng kagamitan na `.clearfix` na klase at gamitin ang mga ito sa mga lugar na kung saan ko kailangan. Ang `overflow: hidden` maaaring i-clip ang mga bata kung ang mga bata ay mas mataas kaysa sa magulang at hindi masyadong mainam.

[[↑] Bumalik sa taas](#talaan-ng-nilalaman)

### Ipaliwanag ang mga CSS na sprite, at papaano mo ipapatupad ang mga ito sa isang pahina o site.

Ang mga CSS na sprite ay pinagsasama ang maramihang mga imahe sa isang solong mas malaking imahe. Karaniwang ginagamit itong pamamaraan para sa mga icon (Ang Gmail ay gumagamit nito). Ito ang mga pamamaraan kung papaano ito ipatutupad:

1. Gumamit ng isang spirte na generator na nagpapack ng maraming mga imahe upang gawing isa at bumuo ng angkop na CSS para dito.
1. Ang bawat imahe ay magkakaroon ng kaukulang klase sa CSS na may `background-image`, `background-position` at `background-size` na mga katangian na tukoy na.
1. Para gamitin ang imaheng iyon, idagdag ang kaukulang klase sa iyong elemento.

**Mga Bentahe:**

- Bawasan ang bilang ng mga kahilingan ng HTTP para sa maraming mga imahe (kailangan lamang ng isang solong kahilingan sa bawat spritesheet). Ngunit sa HTTP2, Ang paglo-load ng maramihang mga imahe ay kinalaunan hindi na isang isyu.
- Pangunang pagdownload ng mga asset na hindi ma-download hangga't hindi pa kailangan, gaya ng mga imahe na makikita lang kung ang `:hover` ay nasa pseudo na estado. Ang pag-blink ay hindi makikita.

###### Mga Reperensiya

- https://css-tricks.com/css-sprites/

[[↑] Bumalik sa taas](#talaan-ng-nilalaman)

### Papaano mo didiskartehan ang pag-aayos ng mga ispisipik sa browser na pag-eestilo na isyu?

- Matapos malaman ang isyu at ang nakakasakit na browser, gumamit ng isang hiwalay na estilo ng sheet na naglo-load lamang kapag ginagamit ang partikular na browser na iyon. Bagaman ang pamamaraan na ito ay nangangailangan ng pagrender sa panig ng serber.
- Gumamit ng mga librerya kagaya ng Bootstrap na humahawak na ng mga estilo ng mga isyu para sa iyo.
- Gumamit ng `autoprefixer` upang awtomatikong magdagdag ng mga prefix ng vendor sa iyong code.
- Gumamit ng pa-reset sa CSS o kaya naman ay Normalize.css.

[[↑] Bumalik sa taas](#talaan-ng-nilalaman)

### Papaano mo inahahanda ang iyong mga pahina para sa mga browser na kulang sa tampok? Ano-ano ang mga teknik or proseso ang iyong ginagamit?

- Kaaya-ayang pag-degrade - Ang pagsasagawa ng pagbuo ng isang aplikasyon para sa mga modernong browser habang tinitiyak na ito ay nananatiling punksyonal sa mas lumang mga browser.
- progresibong pagpapahusay - Ang pagsasagawa ng pagbuo ng isang aplikasyon para sa antas ng lebel ng karanasan ng gumagamit, ngunit nagdaragdag ng mga punksyonal na pagpapahusay kapag sinusuportahan ito ng isang browser.
- Gumamit ng [caniuse.com](https://caniuse.com/)upang suriin ang suporta sa tampok.
- Autoprefixer para sa pagpapasok ng prefix ng awtomatikong vendor.
- Pag-detect ng mga tampok gamit ang [Modernizr](https://modernizr.com/).

[[↑] Bumalik sa taas](#talaan-ng-nilalaman)

### Ano-ano ang mga iba't ibang pamamaraan upang matago ang nakatagong nilalaman (at gawan ng paraan na ito ay magagamit lamang ng mga mambabasa ng iskrin)?

Ang mga pamamaraan na ito ay may kaugnayan sa pagkakarating (a11y).

- `width: 0; height: 0`. Gawin ang elemento na hindi kukuha ng anumang espasyo sa iskrin ng lahat, na magreresulta sa hindi pagpapakita nito.
- `position: absolute; left: -99999px`. Ilagay ito sa labas ng iskrin.
- `text-indent: -9999px`. Ito ay gagana lamang sa mga teksto sa loob ng `block` na mga elemento.
- Metadata. Halimbawa ay sa paggamit ng Schema.org, RDF at JSON-LD.
- WAI-ARIA. Isang W3C na teknikal na ispisipikasyon na tinutukoy kung paano madagdagan ang ang abilidad ng pag-akses ng mga pahina ng web.

Kahit na ang WAI-ARIA ay ang angkop na solusyon, Ako ay pupunta parin sa `absolute` na pagpoposisyon na paglapit, dahil mayroon itong maliit na mga problema, na gumagana para sa karamihan ng mga elemento at ito ay isang madaling pamamaraan.

###### Mga Reperensiya

- https://www.w3.org/TR/wai-aria-1.1/
- https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA
- http://a11yproject.com/

[[↑] Bumalik sa taas](#talaan-ng-nilalaman)

### Ikaw ba ay nakagamit kailanman ng sistemang grid?, at kung gayon, Ano ang iyong mas pipiliin?

Gusto ko ang `float`na batay sa sistemang grid dahil mayroon pa rin itong pinakamaraming suportado ng browser sa mga alternatibong umiiral na mga sistema (flex, grid). Ginamit na ito sa Bootstrap nang maraming taon at napatunayan na ito ay gumagana.

[[↑] Bumalik sa taas](#talaan-ng-nilalaman)

### Ikaw ba ay nakagamit oh nakapagpatupad na ng mga query sa mobile o mga layout na espisipik sa mobile/CSS?

OO. Ang isang halimbawa ay ang pagbabago ng isang nakasalansan na pag-navigate ng pill sa isang fixed-bottom na tab na navigation na lampas sa isang tiyak yugto ng pagpatlang.

[[↑] Bumalik sa taas](#talaan-ng-nilalaman)

### Ikaw ba ay pamilyar sa estilong SVG?

Hindi... Sa kasamaang palad

[[↑] Bumalik sa taas](#talaan-ng-nilalaman)

### Makapagbibigay kaba ng halimbawa ng klase ng @media maliban sa iskrin?

Oo, mayroong apat na uri ng @media na mga katangian (kabilang ang _screen_):

- `all` - para sa lahat ng mga aparatong uri ng media
- `print` - para sa mga printer
- `speech` - para sa mga nagbabasa ng iskrin na "binabasa" ang pahina ng malakas
- `screen` -para sa mga iskrin ng kompyuter, tablet, smart-phone atbp

Narito ang isang halimbawa ng paggamit ng `print` na uri ng media:

```css
@media print {
  body {
    color: black;
  }
}
```

###### Mga Reperensiya

- https://developer.mozilla.org/en-US/docs/Web/CSS/@media#Syntax

[[↑] Bumalik sa taas](#talaan-ng-nilalaman)

### Ano-ano ang ilan sa mga "pasabog" para sa epektibong pagsusulat ng CSS?

Una, unawain na ang mga browser ay tumutugma sa mga tagapili mula sa pinaka-kanang (tagapili ng key) papunta sa kaliwa. Sinasala ng mga browser ang mga elemento sa DOM ayon sa tagapili ng susi, at dumaan ang mga elemento ng magulang nito upang matukoy ang mga tugma. Sa pag-ikli chain ng tagapili, ay siyang pagbilis ng pagtukoy ng browser kung ang elementong iyon ay tumutugma sa tagapili. Kaya iwasan ang mga tagapili ng key na tag at mga pandaigdigang tagapili. Sila ay tugma sa isang malaking bilang ng mga elemento at ang mga browser ay kailangang gumawa ng mas maraming trabaho sa pagtukoy kung ang mga magulang ay tumutugma.

[BEM (Block Element Modifier)](https://bem.info/) na medolohiya ay nagrerekomenda na ang lahat ay may isang klase, at, kung saan kailangan mong herarkiya, na naluluto din sa pangalan ng klase, ito ay natural na ginagawang mahusay ang tagapili at madaling i-override.

Maging maingat kung aling mga katangian ng CSS ang mag-trigger ng reflow, repaint at compositing. Iwasan ang pagsusulat ng mga estilo na nagbabago sa layout (trigger reflow) kung pwede man.

###### Mga Reperensiya

- https://developers.google.com/web/fundamentals/performance/rendering/
- https://csstriggers.com/

[[↑] Bumalik sa taas](#talaan-ng-nilalaman)

### Ano ang mga pakinabang o di-pakinabang ng paggamit ng mga preprocessors ng CSS?

**Mga Bentahe:**

- CSS ay ginawang mas kapanati-panatili.
- Madaling sumulat nga mga nested na tagapili.
- Mga variable para sa pare-pareho na pag-theme. Maaaring magbahagi ng mga file ng tema sa iba't ibang mga proyekto.
- Mga paghalo para maka-generate ng naulit na CSS.
- Ang paghati sa iyong code sa maramihang mga file. Ang mga file ng CSS ay maaaring hatiin din ngunit ang paggawa nito ay mangangailangan pa ng isang HTTP na kahilingan upang i-download ang bawat CSS na file.

**Mga Kasahulan:**

- Nangangailangan ng mga gamit para sa pag-preprocess. Maaaring ang oras ng pag-compile ulit ay magiging.

[[↑] Bumalik sa taas](#talaan-ng-nilalaman)

### Ilarawan kung ano ang iyong gusto at di gusto tungkol sa CSS na mga preprocessor na iyong nagamit.

**Mga Gusto:**

- Halos ang lahat ng bentahe ay nasabi na sa itaas.
- Kaunti lang ang isinulat sa JavaScript, na gumaganap nang mahusay sa Node.

**Mga Hindi Gusto:**

- Gumagamit ako ng Sass sa pamamagitan ng `node-sass`, na kung saan ay naka-bisa para sa LibSass na nakasulat sa C++. Ako ay madalas na mag-recompile nito kapag ako ay lumilipat sa pagitan ng mga bersyon ng node.
- Sa maliit, ang mga variable na pangalan ay naka-prefix sa `@`, na maaaring malito sa katutubong mga keyword sa CSS tulad ng `@ media`,`@ import` at `@ font-face` na panuntunan.

[[↑] Bumalik sa taas](#talaan-ng-nilalaman)

### Papaano mo ipapatupad ang isang web design comp na gumagamit ng mga di pangkaraniwang font?

Gumamit ng `@font-face` at tukuyin ang `font-family` para sa ibang mga `font-weight`.

[[↑] Bumalik sa taas](#talaan-ng-nilalaman)

### Ipaliwanag kung paano tinutukoy ng isang browser kung anu-anong mga elemento ang tumutugma sa tagapili ng CSS.

Ang parteng ito ay may kaugnayan sa taas tungkol sa mahusay na pagsusulat ng CSS. Ang mga browser ay tumutugma sa mga tagapili mula sa pinaka-kanang bahagi (tagapili ng key) hanggang sa kaliwa. sinasala ng mga browser ang mga elemento sa DOM ayon sa tagapili ng, at tinatawid ang mga elemento ng magulang nito upang matukoy ang mga tugma. Kung mas maikli ang haba ng chain ng tagapili, mas mabilis na matutukoy ng browser kung tumutugma ang sangkap na ito sa tagapili.

Halimbawa ay sa tagapiling `p span` na ito, unang hahanapin ng mga browser ang lahat ng `<span>` na mga elemento, at idadaam ang kanyang magulang hanggang sa ugat upang mahanap ang `<p>` na elemento. Para sa partikular na `<span>`, sa lalong madaling panahon na mahanap nito ang `<p>`, malalaman nito na ang `<span>` ay tugma at maaaring ihinto ang pagtutugma nito.

###### Mga Reperensiya

- https://stackoverflow.com/questions/5797014/why-do-browsers-match-css-selectors-from-right-to-left

[[↑] Bumalik sa taas](#talaan-ng-nilalaman)

### Ilarawan ang mga elementong pseudo at talakayin kung para saan ito gagamitin.

Ang CSS pseudo-element ay isang keyword na dinadagdag sa tagapili na nagbibigay-daan sa iyo ng pag-eestilo ng isang tiyak na bahagi ng piniling elemento(s). Maaari silang magamit para sa dekorasyon (`:first-line`, `:first-letter`) o pagdaragdag ng mga elemento sa markup (kasama ng `content: ...`) na hindi na kailangang baguhin pa ang markup (`:before`, `:after`).

- `:first-line` at `:first-letter` ay magagamit para lagyan ng dekorasyon ang teksto. \*Ginamit sa `.clearfix` na hack na ipinakita sa itaas upang magdagdag ng zero-space na elemento kasabay ang `clear: both`.
- Mala-tatsulok na mga arrow sa tooltips ay gumagamit ng `:before` at `:after`. Hinihikayat ang paghihiwalay ng mga alalahanin dahil ang tatsulok ay itinuturing na bahagi ng estilo at hindi talaga ang DOM. Hindi talaga posible na gumuhit ng isang tatsulok na may mga estilo lamang ng CSS nang hindi gumagamit ng karagdagang elemento ng HTML.

  ###### RMga Reperensiya

- https://css-tricks.com/almanac/selectors/a/after-and-before/

[[↑] Bumalik sa taas](#talaan-ng-nilalaman)

### Ipaliwanag ang iyong pagkakaintindi sa modelong kahon at papaano mo pagsasabihan ang browser sa CSS na mag-render ng iyong layout sa iba't ibang modelo ng kahon.

Ang CSS na modelo ng kahon ay naglalarawan ng mga hugis-parihaba na kahon na binuo para sa mga elemento sa puno ng dokumento at inilatag ayon sa visual na format ng modelo. Ang bawat kahon ay may lugar ng nilalaman (e.g. teksto, isang imahe, atbp.) at opsyonal na nakapalgid na `padding`, `border`, at `margin` na mgaa lugar.

Ang CSS na modelong kahon ay responsable sa pagkalkula ng:

- Ilang ang espasyong kinakain ng elemento ng block.
- Kung ang mga borders at / o mga palugit ay magkakapatong, o bumagsak.
- Mga sukat ng isang kahon.

Ang modelo ng kahon ay may mga sumusunod na panuntunan:

- Ang mga sukat ng isang elemento ng block ay kinakalkula gamit ang `lapad`,`taas`, `padding`, mga `border`, at mga `margin`.
- Kung walang tinukoy na `taas`, ang isang elementong bloke ay magiging kasing taas ng nilalaman na naglalaman nito, kasama ang `padding` (maliban kung may mga float, na nakikita sa ibaba).
- Kung walang tinukoy na `lapad`, ang isang hindi floated na elemento ng block ay lalawak upang magkasya ang lapad ng kanyang magulang na bawas ang `padding`.
- Ang `taas` ng isang elemento ay kinakalkula sa pamamagitan ng`taas` ng nilalaman.
- Ang `lapad` ng isang elemento ay kinakalkula ng `lapad` ng nilalaman.
- Sa pamamagitan ng default, ang `padding` at mga `border`s ay hindi bahagi ng `lapad` at`taas` ng isang elemento.

###### Mga Reperensiya

- https://www.smashingmagazine.com/2010/06/the-principles-of-cross-browser-css-coding/#understand-the-css-box-model

[[↑] Bumalik sa taas](#talaan-ng-nilalaman)

### Ano ang ginagawa ng `* { box-sizing: border-box; }`? Anu-ano ang mga pakinabang nito?

- Bilang default, ang mga elemento ay may `box-sizing: content-box` na naipapatupad, at tanging ang laki ng nilalaman lang ang siyang binibilang.
- Ang `box-sizing: border-box` ay ang siyang nagpapabago kung papaano kinakalkula ang `lapad` at `taas` ng mga elemento, kasama ang `border` at `padding` sa pagkalkula.
- Ang `taas` ng isang elemento ay kinalkula ngayon ng lapad ng`taas` + bertikal na `padding` + bertikal na `border`.
- Ang `lapad` ng isang elemento ay kinakalkula ngayon ng `lapad` ng nilalaman + pahalang na `padding` + pahalang na `border`.

[[↑] Bumalik sa taas](#talaan-ng-nilalaman)

### Ano ang katangian ng CSS na `display` at pwede ka bang magbigay ng ilang mga halimbawa ng paggamit nito?

- `none`, `block`, `inline`, `inline-block`, `table`, `table-row`, `table-cell`, `list-item`.

TODO

[[↑] Bumalik sa taas](#talaan-ng-nilalaman)

### Ano ang pagkakaiba sa pagitan ng `inline` at `inline-block`?

Ako ay magbibigay ng isang paghahambing sa `block` para sa mahusay na panukalang.

|  | `block` | `inline-block` | `inline` |
| --- | --- | --- | --- |
| Sukat | Pinupunan ang lapad ng lalagyan ng magulang nito. | Nakadepende sa nilalaman. | Depende sa nilalaman |
| Pagpoposisyon | Magsimula sa isang bagong linya at hindi papayagan ang mga elemento ng HTML sa tabi nito (maliban nalang kapag nagdadagdag ka ng `float`) | Sumasabay kasama ang iba pang nilalaman at nagbibigay-daan sa iba pang mga elemento sa tabi nito. | Sumasabay kasama ang iba pang nilalaman at nagbibigay-daan sa iba pang mga elemento sa tabi nito. |
| Maaaring tukuyin ang `lapad` at`taas` | Oo | Oo | Hindi. Huwag pansinin kung itinakda. |
| Maaaring nakahanay sa `vertical-align` | Hindi | Oo | Oo |
| Mga margin at paddings | Iginagalang ang lahat ng panig. | Iginagalang ang lahat ng panig. | Iginagalang lamang ang mga pahalang na panig. Ang mga bertikal na gilid, kung tinukoy, ito ay hindi nakakaapekto sa layout. Ang bertikal na puwang na kinukuha ay depende sa `line-height`, kahit na ang`border` at `padding` ay mukhang biswal na nakikita sa paligid ng nilalaman. |
| Float | - | - | Nagiging katulad ng isang elemento ng 'block' kung saan maaari kang magtakda ng mga bertikal na margin at paddings. |

[[↑] Bumalik sa taas](#talaan-ng-nilalaman)

### Ano ang pagkakaiba sa pagitan ng `relative`, `fixed`, `absolute` at elementong nakaposisyong panig sa `static`?

Ang isang naka-posisyon na elemento ay isang elemento na ang na-compute na `posisyon` ay alinman sa`kamag-anak`, `absolute`,`fixed` o `malagkit`.

- `static` - Ang default na posisyon; ang elemento ay dumadaloy sa pahina gaya ng karaniwan. Ang mga `taas`,`kanan`, `ilalim`,`kaliwa` at `z-index` na katangian ay hindi nalalapat.
- `kamag-anak` - Ang posisyon ng elemento ay nababagay sa sarili nito, nang hindi binabago ang layout (at sa gayo'y nag-iiwan ng puwang para sa elemento kung saan ay hindi ito nakaposisyon).
- `absolute` - Ang elemento ay inalis mula sa daloy ng pahina at nakaposisyon sa isang tinukoy na posisyon na may kaugnayan sa pinakamalapit na nakaposisyon na ninuno kung mayroon man, o kung hindi man sa kamag-anak sa paunang nilalaman ng bloke. Ang mga nakaposisyon na mga kahon ay maaaring magkaroon ng mga gilid, at hindi sila bumagsak sa anumang iba pang mga margin. Ang mga elementong ito ay hindi nakakaapekto sa posisyon ng iba pang mga elemento.
- `naayos` - Ang elemento ay inalis mula sa daloy ng pahina at nakaposisyon sa isang tinukoy na posisyon na may kaugnayan sa viewport na hindi gumagalaw kapag nag-scroll.
- `malagkit` - Ang malagkit na pagpoposisyon ay isang hybrid ng kamag-anak at nakapirming pagpoposisyon. Ang elemento ay itinuturing bilang `kamag-anak` na nakaposisyon hanggang sa lumampas ito sa tinutukoy na limitasyon, na kung saan ang puntong ito ay itinuturing na `nakatakda` na nakaposisyon.

###### Mga Reperensiya

- https://developer.mozilla.org/en/docs/Web/CSS/position

[[↑] Bumalik sa taas](#talaan-ng-nilalaman)

### Ano ang mga umiiral na framework ng CSS na ginamit mo ng lokal, o kaya naman ay sa produksyon? Papaano mo babaguhin o mapapabuti ang mga ito?

- ** Bootstrap ** - Mabagal na ikot ng paglabas. Ang Bootstrap 4 ay nasa alpha sa halos dalawang taon. Magdagdag ng bahagi ng pindutan ng spinner, dahil malawak itong ginagamit.
- ** Semantikong UI ** - Ang istraktura ng pinagmulang code ay gumagawa ng pagsadya ng tema na napakahirap maunawaan. Masakit na ipasadya sa hindi pangkaraniwang sistema ng paggawa ng tema. Hardcoded na config na landas sa loob ng librerya ng vendor. Hindi mahusay na pag-disenyo para pag-override ng mga variable na hindi katulad sa Bootstrap.
- ** Bulma ** - Isang pulutong ng mga di-semantiko at labis na mga klase at markup ang kinakailangan. Hindi tugma ang pabalik. Ang pag-upgrade ng mga bersyon sa sumisira sa app sa banayad na asal.

[[↑] Bumalik sa taas](#talaan-ng-nilalaman)

### Ikaw ba ay nakapaglaro na sa paligid ng bagong CSS Flexbox o Grid na specs?

Oo. Ang Flexbox ay higit sa lahat para sa 1-dimensional na layout habang ang Grid ay nakatalaga para sa 2-dimensional na mga layout.

Sinosolusyunan ng Flexbox ang maraming pangkaraniwang problema sa CSS, tulad ng bertikal na pagsentro ng mga elemento sa loob ng isang lalagyan, malagkit na footer, atbp. Ang Bootstrap at Bulma ay batay sa Flexbox, at marahil ay ang inirerekumendang paraan upang lumikha ng mga layout sa mga araw na ito. Sinubukan ko ang Flexbox noon ngunit akoy dumaan sa ilang mga isyu ng hindi pagkakatugma ng browser (Safari) sa paggamit ng `flex-grow`, at kailangan kong isulat muli ang aking code gamit ang`inline-blocks` at matematika upang kalkulahin ang mga lapad sa mga porsyentong paraan, at hindi ito magandang karanasan.

Ang Grid sa ngayon ay ang pinaka-intuitive na diskarte para sa paglikha ng grid-based na mga layout (ito ay mas mahusay na!) Ngunit ang suporta sa browser ay hindi pa malawak sa sandaling ito.

###### Mga Reperensiya

- https://philipwalton.github.io/solved-by-flexbox/

[[↑] Bumalik sa taas](#talaan-ng-nilalaman)

### Maipapaliwanag mo ba ang kaibahan sa pagitan ng Pag-code ng isang web site na tumutugon kumpara sa paggamit ng diskarteng mobile ang una?

TODO

[[↑] Bumalik sa taas](#talaan-ng-nilalaman)

### Sa anong paraan naiiba ang disenyo ng tumutugon mula sa disenyo ng umaangkop?

Sinusubukan ng parehong tumutugon at bumabagay na disenyo ang pag-optimize ng karanasan ng gumagamit sa iba't ibang mga device, pag-ayos para sa iba't ibang mga laki ng viewport, mga resolusyon, mga konteksto sa paggamit, mekanismo ng kontrol, at iba pa.

Ang tumutugon na disenyo ay gumagana sa prinsipyo ng kakayahang umangkop - isang solong tuluy-tuloy na website na maaaring magmukhang mabuti sa anumang aparato. Ang mga tumutugon na mga website ay gumagamit ng mga query sa media, flexible na mga grid, at tumutugon na mga imahe upang makalikha ng isang karanasan ng gumagamit na ang mga flexes at mga pagbabago ay batay sa maraming mga kadahilanan. Tulad ng isang bola na lumalaki o lumiliit upang magkasya sa mga maraming iba't ibang hoop.

Ang bumabagay na disenyo ay mas katulad ng modernong kahulugan ng progresibong pagpapahusay. Sa halip ng isang flexible na disenyo, nakikita ng bumabagay na disenyo ang aparato at iba pang mga tampok, at pagkatapos ay nagbibigay ng naaangkop na tampok at layout batay sa isang paunang natukoy na hanay ng mga laki ng viewport at iba pang mga katangian. Nakikita ng site ang uri ng aparato na ginamit, at naghahatid ng pre-set na layout para sa aparatong iyon. Sa halip ng isang solong bola sa pamamagitan ng maraming iba't ibang laki na mga hoop, magkakaroon ka ng maraming iba't ibang mga bola upang magamit depende sa laki ng hoop.

###### Mga Reperensiya

- https://developer.mozilla.org/en-US/docs/Archive/Apps/Design/UI_layout_basics/Responsive_design_versus_adaptive_design
- http://mediumwell.com/responsive-adaptive-mobile/
- https://css-tricks.com/the-difference-between-responsive-and-adaptive-design/

[[↑] Bumalik sa taas](#talaan-ng-nilalaman)

### Ikaw ba ay nakagamit na ng mga grapikong retina? kung gayon, kelan at anu-anong mga teknik ang iyong ginamit?

May gusto kong gamitin ang mas mataas na resolusyon nga mga grapika (dalawang beses ang laki ng display) upang ma-handle ang retina display. Ang mas mahusay na paraan ay ang paggamit ng isang query sa media tulad ng `@media na iskrin lamang at (min-device-pixel-ratio: 2) {...}` at baguhin ang `background-image`.

Para sa mga icon, mas pipiliin ko parin ang paggamit ng svgs at icon na mga font kung saan posible, habang nagreresulta sila ng preskong pagrender sa kahit na anong resolusyon.

Ang isa pang paraan ay ang paggamit ng JavaScript upang palitan ang mga attribute na `<img>` `src` na may mga bersyong mas mataas na resolution pagkatapos masuri ang halaga ng `window.devicePixelRatio`.

###### Mga Reperensiya

- https://www.sitepoint.com/css-techniques-for-retina-displays/

[[↑] Bumalik sa taas](#talaan-ng-nilalaman)

### May kadahilanan ba na nais mong gamitin ang `translate()` kesa sa `absolute` na pag-poposisyon, o kabaliktaran? at bakit?

Ang `translate ()` ay isang halaga ng CSS `transform`. Ang pagpapalit ng `transform` o `opacity` ay hindi nag-trigger ng browser reflow o repaint, mga komposisyon lamang, samantalang ang pagpapalit ng tiyak na pagpoposisyon ay nagpapalit ng `reflow`. Ang `transform` ay nagiging sanhi ng browser na lumikha ng isang GPU na layer para sa elemento ngunit ang pagpapalit ng mga tiyak na katangian sa pagpoposisyon ay gumagamit ng CPU. Kaya ang `isalin ()` ay mas mahusay at magreresulta sa mas maikling oras ng pintura para sa mas malinaw na mga animasyon. Kapag gumagamit ng `translate ()`, ang elemento ay kumakain pa rin ng orihinal na espasyo nito (sabihin nalang nating `posisyon: kamag-anak`), hindi katulad sa pagbabago ng tiyak na pagpoposisyon.

###### Mga Reperensiya

- https://www.paulirish.com/2012/why-moving-elements-with-translate-is-better-than-posabs-topleft/

[[↑] Bumalik sa taas](#talaan-ng-nilalaman)

### Ang ibang mga Kasagutan

- https://neal.codes/blog/front-end-interview-css-questions
- https://quizlet.com/28293152/front-end-interview-questions-css-flash-cards/
- http://peterdoes.it/2015/12/03/a-personal-exercise-front-end-job-interview-questions-and-my-answers-all/
