---
title: Pytania z CSS
---

Odpowiedzi do [Front-end Job Interview Questions - CSS Questions](https://github.com/h5bp/Front-end-Developer-Interview-Questions/blob/master/src/questions/css-questions.md). Pull requesty mile widziane, jeśli masz sugestie i poprawki!

## Spis treści

- [Czym jest specyficzność selektora CSS i jak działa?](#czym-jest-specyficzność-selektora-css-i-jak-działa)
- [Jaka jest różnica pomiędzy CSS "resetting" oraz "normalizing"? Które wybrałbyś, i dlaczego?](#jaka-jest-różnica-pomiędzy-css-resetting-oraz-normalizing-które-wybrałbyś-i-dlaczego)
- [Opisz `float`y i jak one działają.](#opisz-floaty-i-jak-one-działają)
- [Opisz `z-index` i jak powstaje stacking context.](#opisz-z-index-i-jak-powstaje-stacking-context)
- [Opisz Block Formatting Context (BFC) i jak działa.](#opisz-block-formatting-context-bfc-i-jak-działa)
- [Jakie są różne techniki czyszczenia i które są odpowiednie w jakim kontekście?](#jakie-są-różne-techniki-czyszczenia-i-które-są-odpowiednie-w-jakim-kontekście)
- [Wyjaśnij CSS sprites, i jak zaimplementujesz je na stronie lub witrynie.](#wyjaśnij-css-sprites-i-jak-zaimplementujesz-je-na-stronie-lub-witrynie)
- [Jak podchodziłbyś do rozwiązywania problemów związanych ze stylem specyficznym dla przeglądarki?](#jak-podchodziłbyś-do-rozwiązywania-problemów-związanych-ze-stylem-specyficznym-dla-przeglądarki)
- [Jak wyświetlasz swoje strony w przeglądarkach z ograniczeniami funkcji? Jakich technik/procesów używasz?](#jak-wyświetlasz-swoje-strony-w-przeglądarkach-z-ograniczeniami-funkcji-jakich-technikprocesów-używasz)
- [Jakie są różne sposoby wizualnego ukrywania treści (i udostępniania jej tylko dla czytników ekranu)?](#jakie-są-różne-sposoby-wizualnego-ukrywania-treści-i-udostępniania-jej-tylko-dla-czytników-ekranu)
- [Czy kiedykolwiek korzystałeś z systemu siatki (grid system), a jeśli tak, to co preferujesz?](#czy-kiedykolwiek-korzystałeś-z-systemu-siatki-grid-system-a-jeśli-tak-to-co-preferujesz)
- [Czy używałeś lub implementowałeś media queries lub mobile-specific layouts/CSS?](#czy-używałeś-lub-implementowałeś-media-queries-lub-mobile-specific-layoutsCSS)
- [Czy znasz stylizację SVG?](#czy-znasz-stylizację-cvg)
- [Czy możesz podać przykład właściwości @media innej niż screen?](#czy-możesz-podać-przykład-właściwości-media-innej-niż-screen)
- [Jakie są "tricki" do pisania wydajnego CSS?](#jakie-są-tricki-do-pisania-wydajnego-css)
- [Jakie są zalety/wady korzystania z preprocesorów CSS?](#jakie-są-zaletywady-korzystania-z-preprocesorów-css)
- [Opisz, co lubisz, a czego nie w preprocesorach CSS, z których korzystałeś.](#opisz-co-lubisz-a-czego-nie-w-preprocesorach-css-z-których-korzystałeś)
- [Jak zaimplementowałbyś kompozycję do projektowania stron internetowych, która wykorzystuje niestandardowe czcionki?](#jak-zaimplementowałbyś-kompozycję-do-projektowania-stron-internetowych-która-wykorzystuje-niestandardowe-czcionki)
- [Wyjaśnij, w jaki sposób przeglądarka określa, które elementy pasują do selektora CSS.](#wyjaśnij-w-jaki-sposób-przeglądarka-określa-które-elementy-pasują-do-selektora-css)
- [Opisz pseudoelementy i omów, do czego służą.](#opisz-pseudoelementy-i-omów-do-czego-służą)
- [Wyjaśnij swoje zrozumienie box model i sposób, w jaki chcesz, aby przeglądarka w CSS renderowała układ w różnych modelach pudełkowych.](#wyjaśnij-swoje-zrozumienie-box-model-i-sposób-w-jaki-chcesz-aby-przeglądarka-w-css-renderowała-układ-w-różnych-modelach-pudełkowych)
- [Co robi `* { box-sizing: border-box; }`? Jakie są tego zalety?](#co-robi---box-sizing-border-box--jakie-są-tego-zalety)
- [Czym jest właściwość `display` w CSS i czy możesz podać kilka przykładów jej użycia?](#czym-jest-właściwość-display-w-css-i-czy-możesz-podać-kilka-przykładów-jej-użycia)
- [Jaka jest różnica pomiędzy `inline`, a `inline-block`?](#jaka-jest-różnica-pomiędzy-inline-a-inline-block)
- [Jaka jest różnica między pozycjonowaniem `relative`, `fixed`, `absolute` i `static` elementu?](#jaka-jest-różnica-między-pozycjonowaniem-relative-fixed-absolute-i-static-elementu)
- [Z jakich istniejących frameworków CSS korzystałeś lokalnie lub na produkcji? Jak byś je zmienił/ulepszył?](#z-jakich-istniejących-frameworków-css-korzystałeś-lokalnie-lub-na-produkcji-jak-byś-je-zmieniłulepszył)
- [Czy robiłeś coś w nowej specyfikacji CSS Flexbox lub Grid?](#czy-robiłeś-coś-w-nowej-specyfikacji-css-flexbox-lub-grid)
- [Czy potrafisz wyjaśnić różnicę między kodowaniem strony internetowej, aby była responsywna, a używaniem mobile-first strategy?](#czy-potrafisz-wyjaśnić-różnicę-między-kodowaniem-strony-internetowej-aby-była-responsywna-a-używaniem-mobile-first-strategy)
- [Czym różni się projektowanie responsywne od projektowania adaptacyjnego?](#czym-różni-się-projektowanie-responsywne-od-projektowania-adaptacyjnego)
- [Czy kiedykolwiek pracowałeś z grafiką Retina? Jeśli tak, kiedy i jakich technik użyłeś?](#czy-kiedykolwiek-pracowałeś-z-grafiką-retina-jeśli-tak-kiedy-i-jakich-technik-użyłeś)
- [Czy jest jakiś powód, dla którego chciałbyś użyć `translate ()` zamiast pozycjonowania `absolute` lub odwrotnie? I dlaczego?](#czy-jest-jakiś-powód-dla-którego-chciałbyś-użyć-translate-zamiast-pozycjonowania-absolute-lub-odwrotnie-i-dlaczego)

### Czym jest specyficzność selektora CSS i jak działa?

Przeglądarka określa, jakie style mają być wyświetlane w elemencie, w zależności od specyfiki reguł CSS. Zakładamy, że przeglądarka już określiła reguły, które pasują do określonego elementu. Wśród reguł dopasowania, specyfika, cztery wartości oddzielone przecinkami, `a, b, c, d` są obliczane dla każdej reguły na podstawie:

1. `a` określa, czy stosowane są style wbudowane. Jeśli deklaracja właściwości jest stylem wbudowanym w elemencie, `a` jest 1, w przeciwnym razie 0.
2. `b` jest numerem ID selektorów.
3. `c` to liczba selektorów klas, atrybutów i pseudoklas.
4. `d` to liczba znaczników i selektorów pseudoelementów.

Wynikająca z tego specyficzność nie jest wynikiem, ale macierzą wartości, które można porównać kolumna po kolumnie. Porównując selektory w celu ustalenia, która ma najwyższą swoistość, spójrz od lewej do prawej i porównaj najwyższą wartość w każdej kolumnie. Tak więc wartość w kolumnie `b` zastąpi wartości w kolumnach `c` i `d`, bez względu na to, jakie mogą być. Jako taka, specyfika `0,1,0,0` byłaby większa niż jedno z `0,0,10,10`.

W przypadkach o jednakowej specyficzności: najnowsza reguła się liczy. Jeśli dwukrotnie zapisałeś tę samą regułę w arkuszu stylów (niezależnie od wewnętrznego lub zewnętrznego), wówczas dolna reguła w arkuszu stylów jest bliżej elementu, który ma być stylizowany, jest uważana za bardziej szczegółową i dlatego zostanie zastosowana.

Pisałbym reguły CSS o niskiej specyficzności, aby w razie potrzeby można je było łatwo zastąpić. Pisząc kod biblioteki komponentu interfejsu użytkownika CSS, ważne jest, aby miały niską specyficzność, aby użytkownicy biblioteki mogli je zastąpić bez stosowania zbyt skomplikowanych reguł CSS tylko ze względu na zwiększenie specyficzności lub uciekanie się do `!important`.

###### Bibliografia

- https://www.smashingmagazine.com/2007/07/css-specificity-things-you-should-know/
- https://www.sitepoint.com/web-foundations/specificity/

[[↑] Powrót na górę](#spis-treści)

### Jaka jest różnica pomiędzy CSS "resetting" oraz "normalizing"? Które wybrałbyś, i dlaczego?

- **Resetting** - Resetowanie ma na celu usunięcie wszystkich domyślnych stylów przeglądarki z elementów. Na przykład `margin`, `padding`, `font-size` wszystkich elementów są resetowane, aby były takie same. Będziesz musiał zmienić styl dla wspólnych elementów typograficznych.
- **Normalizing** - Normalizacja zachowuje użyteczne style domyślne zamiast "unstyling" wszystkiego. Poprawia również błędy w typowych zależnościach przeglądarki.

Zdecydowałbym się zresetować, gdy mam bardzo niestandardowy lub niekonwencjonalny projekt strony, tak że muszę zrobić dużo własnej stylizacji i nie muszę zachowywać żadnej domyślnej stylizacji.

###### Bibliografia

- https://stackoverflow.com/questions/6887336/what-is-the-difference-between-normalize-css-and-reset-css

[[↑] Powrót na górę](#spis-treści)

### Opisz `float`y i jak one działają.

Float to właściwość pozycjonowania CSS. Elementy pływające (floated elements) pozostają częścią przepływu strony i będą wpływać na położenie innych elementów (np. tekst będzie płynął wokół elementów pływających), w przeciwieństwie do elementów `position: absolute`, które są usuwane z przepływu strony.

Właściwość `clear` CSS może być użyta do pozycjonowania poniżej elementów pływających `left`/`right`/`both`.

Jeśli element nadrzędny zawiera wyłącznie elementy pływające, jego wysokość zostanie zwinięta do zera. Można to naprawić, usuwając float za pływającymi elementami w kontenerze, ale przed zamknięciem kontenera.

Hack `.clearfix` używa sprytnego CSS [pseudo selektora](#describe-pseudo-elements-and-discuss-what-they-are-used-for) (`:after`) do czyszczenia float'ów. Zamiast ustawiać przepełnienie dla elementu nadrzędnego, stosuje się do niego dodatkową klasę `clearfix`. Następnie stosuje ten CSS:

```css
.clearfix:after {
  content: ' ';
  visibility: hidden;
  display: block;
  height: 0;
  clear: both;
}
```

Alternatywnie, nadaj właściwość `overflow: auto` lub `overflow: hidden` elementowi nadrzędnemu, który ustanowi nowy kontekst formatowania bloku wewnątrz elementów podrzędnych i rozszerzy się, aby objąć jego elementy podrzędne.

###### Bibliografia

- https://css-tricks.com/all-about-floats/

[[↑] Powrót na górę](#spis-treści)

### Opisz `z-index` i jak powstaje stacking context.

Właściwość `z-index` w CSS kontroluje pionową kolejność układania elementów, które się nakładają. `z-index` wpływa tylko na elementy, które mają wartość `position`, która nie jest `static`.

Bez żadnej wartości `z-index`, elementy układają się w kolejności, w jakiej występują w DOM (najniższy na dole na tym samym poziomie hierarchii pojawia się na górze). Elementy z pozycjonowaniem niestatycznym (i ich potomnymi) zawsze będą pojawiać się na elementach z domyślnym pozycjonowaniem statycznym, niezależnie od hierarchii HTML.

Kontekst stosu to element zawierający zestaw warstw. W lokalnym kontekście stosowym wartości `z-index` jego elementów podrzędnych są ustawione względem tego elementu, a nie do katalogu głównego dokumentu. Warstwy poza tym kontekstem - np. sibling elements lokalnego kontekstu stosu - nie mogą znajdować się między warstwami w tym kontekście. Jeśli element B znajduje się na szczycie elementu A, element potomny elementu A, elementu C, nigdy nie może być wyższy niż element B, nawet jeśli element C ma wyższy `z-index`, niż element B.

Każdy kontekst stosu jest samowystarczalny - po ułożeniu zawartości elementu cały element jest rozpatrywany w kolejności stosu nadrzędnego kontekstu stosu. Kilka właściwości CSS wyzwala nowy kontekst stosu, taki jak `opacity` mniejszy niż 1, `filter` który nie jest `none`, oraz `transform` który nie jest `none`.

_Uwaga: To, co dokładnie kwalifikuje element do utworzenia kontekstu stosu, znajduje się w tym długim zestawie [reguł](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Positioning/Understanding_z_index/The_stacking_context#The_stacking_context)._

###### Bibliografia

- https://css-tricks.com/almanac/properties/z/z-index/
- https://philipwalton.com/articles/what-no-one-told-you-about-z-index/
- https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Positioning/Understanding_z_index/The_stacking_context

[[↑] Powrót na górę](#spis-treści)

### Opisz Block Formatting Context (BFC) i jak działa.

Block Formatting Context (BFC) jest częścią wizualnego renderowania CSS strony internetowej, na której układane są pola bloków. Float'y, elementy absolutnie pozycjonowane, `inline-blocks`, `table-cells`, `table-caption`, i elementy z `overflow` inne niż `visible` (z wyjątkiem sytuacji, gdy ta wartość została propagowana do viewport), ustal nowe konteksty formatowania bloków.

Umiejętność ustanowienia kontekstu formatowania bloku jest ważna, ponieważ bez tego pole zawierające nie będzie [zawierało floated children](https://developer.mozilla.org/en-US/docs/Web/Guide/CSS/Block_formatting_context#Make_float_content_and_alongside_content_the_same_height). Jest to podobne do zwijających się marginesów, ale bardziej podstępne, ponieważ całe boxes zapadają się w dziwny sposób.

BFC to box HTML, który spełnia co najmniej jeden z następujących warunków:

- Wartość `float` nie jest `none`.
- Wartość `position` nie jest `static` ani `relative`.
- Wartość `display` jest `table-cell`, `table-caption`, `inline-block`, `flex`, lub `inline-flex`.
- Wartość `overflow` nie jest `visible`.

W BFC lewa zewnętrzna krawędź każdego box'a dotyka lewej krawędzi bloku zawierającego (w przypadku formatowania od prawej do lewej dotykają się prawej krawędzi).

Pionowe marginesy między sąsiadującymi polami na poziomie bloku w zwinięciu BFC. Przeczytaj więcej na temat [zawijanych marginesów](https://www.sitepoint.com/web-foundations/collapsing-margins/).

###### Bibliografia

- https://developer.mozilla.org/en-US/docs/Web/Guide/CSS/Block_formatting_context
- https://www.sitepoint.com/understanding-block-formatting-contexts-in-css/

[[↑] Powrót na górę](#spis-treści)

### Jakie są różne techniki czyszczenia i które są odpowiednie w jakim kontekście?

- Pusta metoda `div` - `<div style="clear:both;"></div>`.
- Metoda clearfix - nawiązując do klasy powyżej `.clearfix`.
- `overflow: auto` lub metoda `overflow: hidden` - Rodzic ustanowi nowy kontekst formatowania bloku i rozszerzy się, aby zawierał elementy podrzędne.

W dużych projektach napisałbym klasę użyteczności `.clearfix` i używał ich w miejscach, w których tego potrzebuję. `overflow: hidden` może podcinać children, jeśli children jest wyższy od parent i nie jest zbyt idealny.

[[↑] Powrót na górę](#spis-treści)

### Wyjaśnij CSS sprites, i jak zaimplementujesz je na stronie lub witrynie.

CSS sprites łączy wiele obrazów w jeden większy obraz. Jest to powszechnie stosowana technika ikon (Gmail ją używa). Jak ją zaimplementować:

1. Użyj generatora sprite, który pakuje wiele obrazów w jeden i generuje odpowiedni CSS do tego.
1. Każdy obraz miałby odpowiednią klasę CSS `background-image`, `background-position` i `background-size` - zdefiniowane właściwości.
1. Aby użyć tego obrazu, dodaj odpowiednią klasę do swojego elementu.

**Korzyści:**

- Zmniejszy liczbę żądań HTTP dla wielu obrazów (wymagane jest tylko jedno pojedyncze żądanie na spritesheet). Jednak w przypadku HTTP2 ładowanie wielu obrazów nie stanowi już większego problemu.
- Pobieraj z wyprzedzeniem zasoby, które nie zostaną pobrane, dopóki nie będą potrzebne, takie jak obrazy, które pojawiają się tylko w pseudo-states `: hover`. Nie widać migania.

###### Bibliografia

- https://css-tricks.com/css-sprites/

[[↑] Powrót na górę](#spis-treści)

### Jak podchodziłbyś do rozwiązywania problemów związanych ze stylem specyficznym dla przeglądarki?

- Po zidentyfikowaniu problemu i sprawiającej kłopoty przeglądarki użyj osobnego arkusza stylów, który ładuje się tylko wtedy, gdy używana jest konkretna przeglądarka. Ta technika wymaga jednak renderowania po stronie serwera.
- Używaj bibliotek takich jak Bootstrap, które już obsługują te problemy ze stylem.
- Użyj `autoprefixer`, aby automatycznie dodać prefiksy dostawcy do swojego kodu.
- Użyj Reset CSS lub Normalize.css.
- Jeśli korzystasz z Postcss (lub podobnej biblioteki do transpilowania), mogą istnieć wtyczki, które pozwolą ci wybrać nowoczesną składnię CSS (a nawet propozycje W3C), które przekształcą te sekcje twojego kodu w odpowiedni bezpieczny kod, który będzie pracować w celach, dla których korzystałeś.

[[↑] Powrót na górę](#spis-treści)

### Jak wyświetlasz swoje strony w przeglądarkach z ograniczeniami funkcji? Jakich technik/procesów używasz?

- Wdzięczna degradacja (graceful degradation) - praktyka polegająca na tworzeniu aplikacji dla nowoczesnych przeglądarek przy jednoczesnym zapewnieniu jej funkcjonalności w starszych przeglądarkach.
- Progresywne ulepszenie (progressive enhancement) - Praktyka budowania aplikacji dla podstawowego poziomu doświadczenia użytkownika, ale dodawanie ulepszeń funkcjonalnych, gdy przeglądarka ją obsługuje.
- Używanie [caniuse.com](https://caniuse.com/) aby sprawdzić obsługę funkcji.
- Autoprefixer do automatycznego wstawiania prefiksu dostawcy.
- Wykrywanie funkcji za pomocą [Modernizr](https://modernizr.com/).
- Używanie zapytań CSS Feature [@support](https://developer.mozilla.org/en-US/docs/Web/CSS/@supports)

[[↑] Powrót na górę](#spis-treści)

### Jakie są różne sposoby wizualnego ukrywania treści (i udostępniania jej tylko dla czytników ekranu)?

Te techniki są związane z dostępnością (a11y).

- `width: 0; height: 0`. Spraw, aby element nie zajmował w ogóle miejsca na ekranie, co powoduje, że nie jest pokazywany.
- `position: absolute; left: -99999px`. Ustaw go poza ekranem.
- `text-indent: -9999px`. Działa to tylko w przypadku tekstu w elementach `block`.
- Metadane. Na przykład za pomocą Schema.org, RDF i JSON-LD.
- WAI-ARIA. Specyfikacja techniczna W3C określająca sposób zwiększenia dostępności stron internetowych.

Nawet jeśli WAI-ARIA jest idealnym rozwiązaniem, wybrałbym podejście pozycjonowania `absolute`, ponieważ ma najmniej zastrzeżeń, działa na większość elementów i jest łatwą techniką.

###### Bibliografia

- https://www.w3.org/TR/wai-aria-1.1/
- https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA
- http://a11yproject.com/

[[↑] Powrót na górę](#spis-treści)

### Czy kiedykolwiek korzystałeś z systemu siatki (grid system), a jeśli tak, to co preferujesz?

Przed tym jak Flex stał się popularny (około roku 2014), oparty na `float` grid system był najbardziej niezawodny, ponieważ nadal ma największą obsługę przeglądarek wśród alternatywnych istniejących systemów (flex, grid). Bootstrap korzystał z podejścia `float` do chwili, gdy Bootstrap 4, przełączył się na podejście oparte na `flex`. W chwili pisania (2020r.), `flex` jest zalecanym podejściem do budowania systemów gridowych i ma [przyzwoitą obsługę przeglądarki](https://caniuse.com/#search=flex).

Dla odważnych, mogą zajrzeć w [CSS Grid Layout](https://css-tricks.com/snippets/css/complete-guide-grid/), który używa nowej błyszczącej właściwości `grid`; jest nawet lepszy niż `flex` do budowania układów siatki i będzie de facto sposobem na zrobienie tego w przyszłości.

[[↑] Powrót na górę](#spis-treści)

### Czy używałeś lub implementowałeś media queries lub mobile-specific layouts/CSS?

Tak. Przykładem może być przekształcenie nawigacji stacked pill w nawigację fixed-bottom tab poza pewnym breakpointem.

[[↑] Powrót na górę](#spis-treści)

### Czy znasz stylizację SVG?

Tak, istnieje kilka sposobów pokolorowania kształtów (w tym określenie atrybutów obiektu) za pomocą wbudowanego CSS, osadzonej sekcji CSS lub zewnętrznego pliku CSS. Większość plików SVG, które można znaleźć w Internecie, wykorzystuje wbudowany CSS, ale z każdym typem wiążą się wady i zalety.

Podstawowe kolorowanie można wykonać, ustawiając dwa atrybuty w węźle: `fill` i `stroke`. `fill` ustawia kolor wewnątrz obiektu i `stroke` ustawia kolor linii rysowanej wokół obiektu. Możesz używać tych samych schematów nazewnictwa kolorów CSS, których używasz w HTML, niezależnie od tego, czy są to nazwy kolorów (to znaczy `red`), wartości RGB (tzn. `rgb(255,0,0)`), wartości Hex, wartości RGBA, etc.

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

Powyższe `fill="purple"` to przykład _presentational attribute_. Co ciekawe, w przeciwieństwie do stylów wbudowanych, takich jak `style="fill: purple"`, który również jest atrybutem, atrybuty prezentacji można [zastąpić stylami CSS](https://css-tricks.com/presentation-attributes-vs-inline-styles/) zdefiniowanymi w arkuszu stylów. Więc, jeśli zrobić coś takiego jak `svg { fill: blue; }` zastąpiłoby to zdefiniowane przez nas fioletowe wypełnienie.

###### Bibliografia

- https://developer.mozilla.org/en-US/docs/Web/SVG/Tutorial/Fills_and_Strokes

[[↑] Powrót na górę](#spis-treści)

### Czy możesz podać przykład właściwości @media innej niż screen?

Tak, są cztery typy właściwości @media (włączając w to _screen_):

- `all` - dla wszystkich typu media
- `print` - dla drukarek
- `speech` - lub czytników ekranu, które "czytają" stronę na głos
- `screen` - do ekranów komputerowych, tabletów, smartfonów itp.

Tu jest przykład użycia typu `print` media:

```css
@media print {
  body {
    color: black;
  }
}
```

###### Bibliografia

- https://developer.mozilla.org/en-US/docs/Web/CSS/@media#Syntax

[[↑] Powrót na górę](#spis-treści)

### Jakie są "tricki" do pisania wydajnego CSS?

Po pierwsze, zrozum, że przeglądarki dopasowują selektory od skrajnie prawej (key selector) do lewej. Przeglądarki odfiltrowują elementy w DOM zgodnie z key selector'em i przesuwają w górę jego elementy nadrzędne, aby ustalić dopasowania. Im krótsza długość łańcucha selektora, tym szybciej przeglądarka może ustalić, czy ten element pasuje do selektora. Dlatego unikaj key selectorów, które są selektorami tagów i uniwersalnymi. Pasują do dużej liczby elementów, a przeglądarki będą musiały wykonać więcej pracy, aby ustalić, czy rodzice pasują.

Metodologia [BEM (Block Element Modifier)](https://bem.info/) zaleca, aby wszystko miało jedną klasę, a tam, gdzie potrzebna jest hierarchia, która wpisuje się również w nazwę klasy, w naturalny sposób sprawia to, że selektor jest wydajny i łatwy do zastąpienia.

Należy pamiętać, które właściwości CSS wyzwalają [trigger](https://csstriggers.com/) reflow, repaint, i compositing. Unikaj pisania stylów, które zmieniają układ (wyzwalanie przepływu) tam, gdzie to możliwe.

###### Bibliografia

- https://developers.google.com/web/fundamentals/performance/rendering/
- https://csstriggers.com/

[[↑] Powrót na górę](#spis-treści)

### Jakie są zalety/wady korzystania z preprocesorów CSS?

**Zalety:**

- CSS jest łatwiejszy w utrzymaniu.
- Łatwe do pisania zagnieżdżone selektory.
- Zmienne dla spójnego motywu. Może udostępniać pliki motywów w różnych projektach.
- Mixins do generowania powtarzanego CSS.
- Funkcje Sass, takie jak pętle, listy i mapy, mogą ułatwić konfigurację i zmniejszyć poziom szczegółowości.
- Dzielenie kodu na wiele plików. Pliki CSS można również podzielić, ale będzie to wymagało żądania HTTP pobrania każdego pliku CSS.

**Wady:**

- Wymaga narzędzi do wstępnego przetwarzania. Czas ponownej kompilacji może być długi.
- Brak pisania obecnego i potencjalnie użytecznego CSS. Na przykład, używając czegoś podobnego do [postcss-loader](https://github.com/postcss/postcss-loader) z [webpack](https://webpack.js.org/), możesz napisać potencjalnie kompatybilny CSS, pozwalając na używanie takich zmiennych jak CSS zamiast zmiennych Sass. W ten sposób uczysz się nowych umiejętności, które mogą się opłacić, jeśli/gdy zostaną ujednolicone.

[[↑] Powrót na górę](#spis-treści)

### Opisz, co lubisz, a czego nie w preprocesorach CSS, z których korzystałeś.

**Polubione:**

- Głównie zalety wymienione powyżej.
- Less jest napisany w JavaScript, który dobrze współpracuje z Node.

**Niepolubione:**

- Używam Sass przez `node-sass`, który jest powiązaniem dla LibSass napisanego w C++. Muszę często go przekompilować podczas przełączania między wersjami węzłów.
- W Less, nazwy zmiennych są poprzedzone znakiem `@`, które można pomylić z natywnymi słowami kluczowymi CSS, takimi jak `@media`, `@import` i reguła `@font-face`.

[[↑] Powrót na górę](#spis-treści)

### Jak zaimplementowałbyś kompozycję do projektowania stron internetowych, która wykorzystuje niestandardowe czcionki?

Użycie `@font-face` i zdefiniowanie `font-family` dla różnych `font-weight`.

[[↑] Powrót na górę](#spis-treści)

### Wyjaśnij, w jaki sposób przeglądarka określa, które elementy pasują do selektora CSS.

Ta część jest związana z powyższą na temat [pisania wydajnego CSS](#what-are-some-of-the-gotchas-for-writing-efficient-css). Przeglądarki dopasowują selektory od skrajnie prawej (key selector) do lewej. Przeglądarki odfiltrowują elementy w DOM zgodnie z key selector i przesuwają w górę jego elementy nadrzędne, aby ustalić dopasowania. Im krótsza długość łańcucha selektora, tym szybciej przeglądarka może ustalić, czy ten element pasuje do selektora.

Na przykład ten selektor `p span`, przeglądarka najpierw znajduje wszystkie elementy `<span>` i przemierza jego rodzica aż do roota, aby znaleźć element `<p>`. Dla konkretnego `<span>`, jak tylko znajdzie `<p>`, wie że `<span>` dopasowane i może zatrzymać dopasowanie.

###### Bibliografia

- https://stackoverflow.com/questions/5797014/why-do-browsers-match-css-selectors-from-right-to-left

[[↑] Powrót na górę](#spis-treści)

### Opisz pseudoelementy i omów, do czego służą.

Pseudoelement CSS jest słowem kluczowym dodawanym do selektora, który pozwala stylizować określoną część wybranych elementów. Mogą być używane do dekoracji (`:first-line`, `:first-letter`) lub dodawać elementy do znaczników (w połączeniu z `content: ...`) bez konieczności modyfikowania znaczników (`:before`, `:after`).

- `:first-line` i `:first-letter` może służyć do ozdabiania tekstu.
- Użycie `.clearfix` jak pokazano powyżej, aby dodać element zero-space z `clear: both`.
- Trójkątne strzałki w tooltips używają `:before` i `:after`. Zachęca do rozdzielenia rzeczy, ponieważ trójkąt jest uważany za część stylizacji, a nie DOM.

###### Bibliografia

- https://css-tricks.com/almanac/selectors/a/after-and-before/

[[↑] Powrót na górę](#spis-treści)

### Wyjaśnij swoje zrozumienie box model i sposób, w jaki chcesz, aby przeglądarka w CSS renderowała układ w różnych modelach pudełkowych.

Model pola CSS opisuje prostokątne pola, które są generowane dla elementów w drzewie dokumentu i rozmieszczone zgodnie z wizualnym modelem formatowania. Każdy box ma pole zawartości (np. text, an image, etc.) i opcjonalne otoczenie polami `padding`, `border`, i `margin`.

Model pudełkowy CSS odpowiada za obliczenie:

- Ile miejsca zajmuje element bloku.
- Niezależnie od tego, czy granice i/lub marginesy nachodzą na siebie, czy się zawalają.
- Wymiary pudełka.

Model pudełkowy ma następujące zasady:

- Wymiary elementu bloku są obliczane przez `width`, `height`, `padding`, `border` i `margin`.
- Jeśli `height` nie jest określona, element blokowy będzie tak samo wysoki, jak zawarta w nim zawartość, plus `padding` (chyba że są to floaty, dla których patrz poniżej).
- Jeśli `width` nie jest określona, element blokowy non-floated rozszerzy się, aby dopasować się do szerokości jego rodzica minus `padding`.
- `height` elementu jest obliczany na podstawie zawartości `height`.
- `width` elementu jest obliczany na podstawie zawartości `width`.
- Domyślnie, `padding` i `border` nie są częścią `width` oraz `height` elementu.

###### Bibliografia

- https://www.smashingmagazine.com/2010/06/the-principles-of-cross-browser-css-coding/#understand-the-css-box-model

[[↑] Powrót na górę](#spis-treści)

### Co robi `* { box-sizing: border-box; }`? Jakie są tego zalety?

- Domyślnie, elementy mają `box-sizing: content-box` zastosowane, i uwzględniany jest tylko rozmiar contentu.
- `box-sizing: border-box` zmienia jak `width` i `height` elementów są liczone, `border` i `padding` są również uwzględniane w obliczeniach.
- `height` elementu jest teraz obliczany na podstawie zawartości `height` + pionowy `padding` + pionowa szerokość `border`.
- `width` elementu jest teraz obliczany na podstawie zawartości `width` + poziomy `padding` + pozioma szerokość `border`.
- Biorąc pod uwagę `padding` oraz `border` jako część naszego modelu pudełkowego lepiej współgra z tym, jak projektanci wyobrażają sobie treść w gridach.

###### Bibliografia

- https://www.paulirish.com/2012/box-sizing-border-box-ftw/

[[↑] Powrót na górę](#spis-treści)

### Czym jest właściwość `display` w CSS i czy możesz podać kilka przykładów jej użycia?

- `none`, `block`, `inline`, `inline-block`, `flex`, `grid`, `table`, `table-row`, `table-cell`, `list-item`.

| `display` | Description |
| :-- | :-- |
| `none` | Does not display an element (the elementv no longer affects the layout of the document). All child element are also no longer displayed. The document is rendered as if the element did not exist in the document tree |
| `block` | The element consumes the whole line in the block direction (which is usually horizontal) |
| `inline` | Elements can be laid out beside each other |
| `inline-block` | Similar to `inline`, but allows some `block` properties like setting `width` and `height` |
| `table` | Behaves like the `<table>` element |
| `table-row` | Behaves like the `<tr>` element |
| `table-cell` | Behaves like the `<td>` element |
| `list-item` | Behaves like a `<li>` element which allows it to define `list-style-type` and `list-style-position` |

[[↑] Powrót na górę](#spis-treści)

### Jaka jest różnica pomiędzy `inline`, a `inline-block`?

Dla dobrego porównania wrzucę porównanie z `block`.

|  | `block` | `inline-block` | `inline` |
| --- | --- | --- | --- |
| Size | Fills up the width of its parent container. | Depends on content. | Depends on content. |
| Positioning | Start on a new line and tolerates no HTML elements next to it (except when you add `float`) | Flows along with other content and allows other elements beside it. | Flows along with other content and allows other elements beside it. |
| Can specify `width` and `height` | Yes | Yes | No. Will ignore if being set. |
| Can be aligned with `vertical-align` | No | Yes | Yes |
| Margins and paddings | All sides respected. | All sides respected. | Only horizontal sides respected. Vertical sides, if specified, do not affect layout. Vertical space it takes up depends on `line-height`, even though the `border` and `padding` appear visually around the content. |
| Float | - | - | Becomes like a `block` element where you can set vertical margins and paddings. |

[[↑] Powrót na górę](#spis-treści)

### Jaka jest różnica między pozycjonowaniem `relative`, `fixed`, `absolute` i `static` elementu?

Element pozycjonowany to element, którego obliczona właściwość `position` jest albo `relative`, `absolute`, `fixed` lub `sticky`.

- `static` - Pozycja domyślna; element wpłynie na stronę w normalny sposób. Właściwości `top`, `right`, `bottom`, `left` i `z-index` nie mają zastosowania.
- `relative` - Pozycja elementu jest dopasowywana względem siebie, bez zmiany układu (i tym samym pozostawiając odstęp dla elementu, w którym byłby, gdyby nie został ustawiony).
- `absolute` - Element jest usuwany z przepływu strony i ustawiany w określonej pozycji względem najbliższego umieszczonego przodka, jeśli taki istnieje, lub w inny sposób względem początkowego bloku zawierającego. Pola absolutnie pozycjonowane mogą mieć marginesy i nie zwijają się z żadnymi innymi marginesami. Te elementy nie wpływają na pozycję innych elementów.
- `fixed` - Element jest usuwany z przepływu strony i ustawiany w określonej pozycji względem viewport i nie porusza się podczas przewijania.
- `sticky` - Pozycjonowanie sticky to hybryda pozycjonowania względnego i ustalonego. Element jest traktowany jako pozycja `relative`, dopóki nie przekroczy określonego progu, w którym to momencie jest traktowany jako pozycja `fixed`.

###### Bibliografia

- https://developer.mozilla.org/en/docs/Web/CSS/position

[[↑] Powrót na górę](#spis-treści)

### Z jakich istniejących frameworków CSS korzystałeś lokalnie lub na produkcji? Jak byś je zmienił/ulepszył?

- **Bootstrap** - Cykl wolnego wydania. Bootstrap 4 jest w wersji alfa od prawie 2 lat. Dodać spinner button component, ponieważ jest on powszechnie używany.
- **Semantic UI** - Struktura kodu źródłowego sprawia, że dostosowanie motywu jest niezwykle trudne do zrozumienia. Niekonwencjonalny system tematyczny jest trudny do dostosowania. Zahardkodowana ścieżka konfiguracji w bibliotece dostawcy. Niezbyt dobrze zaprojektowany do nadpisywania zmiennych w przeciwieństwie do Bootstrap.
- **Bulma** - Wymaganych jest wiele niesemantycznych i zbędnych klas i znaczników. Niekompatybilny wstecz. Uaktualnianie wersji psuje aplikację w subtelny sposób.

[[↑] Powrót na górę](#spis-treści)

### Czy robiłeś coś w nowej specyfikacji CSS Flexbox lub Grid?

Tak. Flexbox jest przeznaczony głównie do układów 1-wymiarowych, a Grid do układów 2-wymiarowych.

Flexbox rozwiązuje wiele typowych problemów w CSS, takich jak pionowe centrowanie elementów w kontenerze, sticky footer itp. Bootstrap i Bulma są oparte na Flexbox i jest to prawdopodobnie zalecany sposób tworzenia układów w dzisiejszych czasach. Próbowałem już Flexboksa wcześniej, ale napotkałem pewne problemy z niekompatybilnością przeglądarki (Safari) przy użyciu `flex-grow`, i musiałem przepisać mój kod przy użyciu `inline-block` i matematyki, aby obliczyć szerokości w procentach, to nie było miłe doświadczenie.

Grid jest zdecydowanie najbardziej intuicyjnym podejściem do tworzenia układów opartych na grid'zie (lepiej!), ale obsługa przeglądarki nie jest w tej chwili szeroka.

###### Bibliografia

- https://philipwalton.github.io/solved-by-flexbox/

[[↑] Powrót na górę](#spis-treści)

### Czy potrafisz wyjaśnić różnicę między kodowaniem strony internetowej, aby była responsywna, a używaniem mobile-first strategy?

Pamiętaj, że te dwa podejścia nie są wykluczające.

Uaktywnienie strony internetowej oznacza, że niektóre elementy zareagują, dostosowując jej rozmiar lub inne funkcje zgodnie z rozmiarem ekranu urządzenia, zwykle szerokością viewport, poprzez CSS media queries, na przykład zmniejszając rozmiar czcionki na mniejszych urządzeniach.

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

Mobile-first strategy również jest responsywna, jednak zgadza się, że powinniśmy domyślnie zdefiniować wszystkie style dla urządzeń mobilnych, a później dopiero dodać konkretne reguły responsywne do innych urządzeń. Zgodnie z poprzednim przykładem:

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

Mobile-first strategy ma 2 główne zalety:

- Jest bardziej wydajna na urządzeniach mobilnych, ponieważ wszystkie zastosowane reguły nie muszą być sprawdzane pod kątem media queries.
- Wymusza pisanie czystszego kodu w odniesieniu do responsywnych reguł CSS.

[[↑] Powrót na górę](#spis-treści)

### Czym różni się projektowanie responsywne od projektowania adaptacyjnego?

Zarówno responsywne, jak i adaptacyjne próbują zoptymalizować wrażenia użytkownika na różnych urządzeniach, dostosowując się do różnych rozmiarów viewport, rozdzielczości, kontekstów użytkowania, mechanizmów kontrolnych i tak dalej.

Responsywne projektowanie działa na zasadzie elastyczności - jedna płynna strona internetowa, która może dobrze wyglądać na dowolnym urządzeniu. Responsywne strony internetowe używają media queries, elastycznych gridów i responsywnych obrazów, aby stworzyć wrażenia użytkownika, które zmieniają w zależności od wielu czynników. Jak pojedyncza piłka rosnąca lub kurcząca się, aby zmieścić się w kilku różnych obręczach.

Projektowanie adaptacyjne bardziej przypomina nowoczesną definicję stopniowego ulepszania. Zamiast jednego elastycznego projektu, projekt adaptacyjny wykrywa urządzenie i inne funkcje, a następnie zapewnia odpowiednią funkcję i układ na podstawie predefiniowanego zestawu rozmiarów viewport i innych cech. Witryna wykrywa typ używanego urządzenia i zapewnia wstępnie ustawiony układ tego urządzenia. Zamiast jednej piłki przechodzącej przez kilka różnej wielkości obręczy, będziesz mieć kilka różnych piłek do użycia w zależności od rozmiaru obręczy.

Obie z tych metod mają pewne problemy, które warto ocenić:

- Elastyczne projektowanie może być dość trudne, ponieważ zasadniczo używasz jednego, choć responsywnego układu, pasującego do wszystkich sytuacji. Jak ustawić punkty przerwania media query to jedno z takich wyzwań. Czy używasz standardowych wartości progowych? A może używasz punktów przerwania, które mają sens dla twojego konkretnego układu? Co jeśli ten układ się zmieni?
- Projektowanie adaptacyjne zazwyczaj wymaga user agent sniffing lub wykrywania DPI itp., co może okazać się zawodne.

###### Bibliografia

- https://developer.mozilla.org/en-US/docs/Archive/Apps/Design/UI_layout_basics/Responsive_design_versus_adaptive_design
- http://mediumwell.com/responsive-adaptive-mobile/
- https://css-tricks.com/the-difference-between-responsive-and-adaptive-design/

[[↑] Powrót na górę](#spis-treści)

### Czy kiedykolwiek pracowałeś z grafiką Retina? Jeśli tak, kiedy i jakich technik użyłeś?

_Retina_ jest po prostu marketingowym terminem odnoszącym się do ekranów o wysokiej rozdzielczości ze współczynnikiem pikseli większym niż 1. Kluczową rzeczą, o której należy wiedzieć, jest to, że użycie współczynnika pikseli oznacza, że wyświetlacze emulują ekran o niższej rozdzielczości w celu wyświetlenia elementów o tym samym rozmiarze. Obecnie rozważamy defacto wszystkie wyświetlacze urządzeń mobilnych _retina_.

Przeglądarki domyślnie renderują elementy DOM zgodnie z rozdzielczością urządzenia, z wyjątkiem obrazów.

Aby mieć wyraźną, ładną grafikę, która najlepiej wykorzystuje wyświetlacze retina, musimy w miarę możliwości używać obrazów o wysokiej rozdzielczości. Jednak używanie zawsze obrazów o najwyższej rozdzielczości będzie miało wpływ na wydajność, ponieważ więcej bajtów będzie trzeba przesłać przewodowo.

Aby rozwiązać ten problem, możemy użyć responsywnych obrazów, jak określono w HTML5. Wymaga udostępnienia przeglądarki różnych plików o tym samym obrazie w różnych rozdzielczościach i pozwala zdecydować, który obraz jest najlepszy, używając atrybutu HTML `srcset` i opcjonalnie `sizes`, na przykład:

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

Ważne jest, aby pamiętać, że przeglądarki, które nie obsługują `srcset` HTML5 (np. IE11), zignorują go i zamiast tego użyją `src`. Jeśli naprawdę musimy obsługiwać IE11 i chcemy udostępnić tę funkcję ze względu na wydajność, możemy użyć polyfill JavaScript, np. Picturefill (link w bibliografii).

W przypadku ikon wolałbym również używać plików SVG i czcionek ikon, jeśli to możliwe, ponieważ renderują one bardzo ostro, niezależnie od rozdzielczości.

###### Bibliografia

- https://css-tricks.com/responsive-images-youre-just-changing-resolutions-use-srcset/
- http://scottjehl.github.io/picturefill/
- https://aclaes.com/responsive-background-images-with-srcset-and-sizes/

[[↑] Powrót na górę](#spis-treści)

### Czy jest jakiś powód, dla którego chciałbyś użyć `translate ()` zamiast pozycjonowania `absolute` lub odwrotnie? I dlaczego?

`translate()` jest wartością CSS `transform`. Zmieniając `transform` lub `opacity` nie powoduje ponownego wczytywania przeglądarki ani odmalowywania, ale powoduje kompozycje; podczas gdy zmiana bezwzględnych wyzwalaczy pozycjonowania `reflow`. `transform` powoduje, że przeglądarka tworzy warstwę GPU dla elementu, ale zmiana bezwzględnych właściwości pozycjonowania wykorzystuje procesor. W związku z tym `translate()` jest bardziej wydajny i spowoduje krótszy czas malowania dla płynniejszych animacji.

Kiedy używasz `translate ()`, element nadal zajmuje swoją pierwotną przestrzeń (coś w rodzaju `position: relative`), w przeciwieństwie do zmiany absolutnego pozycjonowania.

###### Bibliografia

- https://www.paulirish.com/2012/why-moving-elements-with-translate-is-better-than-posabs-topleft/

[[↑] Powrót na górę](#spis-treści)

### Inne odpowiedzi

- https://neal.codes/blog/front-end-interview-css-questions
- https://quizlet.com/28293152/front-end-interview-questions-css-flash-cards/
- http://peterdoes.it/2015/12/03/a-personal-exercise-front-end-job-interview-questions-and-my-answers-all/

---

Stworzone przez [@yangshun](https://github.com/yangshun) polska wersja od [@mbiesiad](https://github.com/mbiesiad)
