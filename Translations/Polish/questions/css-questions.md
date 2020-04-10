# Pytania z CSS

Odpowiedzi do [Front-end Job Interview Questions - CSS Questions](https://github.com/h5bp/Front-end-Developer-Interview-Questions/blob/master/src/questions/css-questions.md). Pull requesty mile widziane, jeśli masz sugestie i poprawki!

- [What is CSS selector specificity and how does it work?](#what-is-css-selector-specificity-and-how-does-it-work)
- [What's the difference between "resetting" and "normalizing" CSS? Which would you choose, and why?](#whats-the-difference-between-resetting-and-normalizing-css-which-would-you-choose-and-why)
- [Describe `float`s and how they work.](#describe-floats-and-how-they-work)
- [Describe z-index and how stacking context is formed.](#describe-z-index-and-how-stacking-context-is-formed)
- [Describe BFC (Block Formatting Context) and how it works.](#describe-block-formatting-context-bfc-and-how-it-works)
- [What are the various clearing techniques and which is appropriate for what context?](#what-are-the-various-clearing-techniques-and-which-is-appropriate-for-what-context)
- [Explain CSS sprites, and how you would implement them on a page or site.](#explain-css-sprites-and-how-you-would-implement-them-on-a-page-or-site)
- [How would you approach fixing browser-specific styling issues?](#how-would-you-approach-fixing-browser-specific-styling-issues)
- [How do you serve your pages for feature-constrained browsers? What techniques/processes do you use?](#how-do-you-serve-your-pages-for-feature-constrained-browsers-what-techniquesprocesses-do-you-use)
- [What are the different ways to visually hide content (and make it available only for screen readers)?](#what-are-the-different-ways-to-visually-hide-content-and-make-it-available-only-for-screen-readers)
- [Have you ever used a grid system, and if so, what do you prefer?](#have-you-ever-used-a-grid-system-and-if-so-what-do-you-prefer)
- [Have you used or implemented media queries or mobile specific layouts/CSS?](#have-you-used-or-implemented-media-queries-or-mobile-specific-layoutscss)
- [Are you familiar with styling SVG?](#are-you-familiar-with-styling-svg)
- [Can you give an example of an @media property other than screen?](#can-you-give-an-example-of-an-media-property-other-than-screen)
- [What are some of the "gotchas" for writing efficient CSS?](#what-are-some-of-the-gotchas-for-writing-efficient-css)
- [What are the advantages/disadvantages of using CSS preprocessors?](#what-are-the-advantagesdisadvantages-of-using-css-preprocessors)
- [Describe what you like and dislike about the CSS preprocessors you have used.](#describe-what-you-like-and-dislike-about-the-css-preprocessors-you-have-used)
- [How would you implement a web design comp that uses non-standard fonts?](#how-would-you-implement-a-web-design-comp-that-uses-non-standard-fonts)
- [Explain how a browser determines what elements match a CSS selector.](#explain-how-a-browser-determines-what-elements-match-a-css-selector)
- [Describe pseudo-elements and discuss what they are used for.](#describe-pseudo-elements-and-discuss-what-they-are-used-for)
- [Explain your understanding of the box model and how you would tell the browser in CSS to render your layout in different box models.](#explain-your-understanding-of-the-box-model-and-how-you-would-tell-the-browser-in-css-to-render-your-layout-in-different-box-models)
- [What does `* { box-sizing: border-box; }` do? What are its advantages?](#what-does---box-sizing-border-box--do-what-are-its-advantages)
- [What is the CSS `display` property and can you give a few examples of its use?](#what-is-the-css-display-property-and-can-you-give-a-few-examples-of-its-use)
- [What's the difference between `inline` and `inline-block`?](#whats-the-difference-between-inline-and-inline-block)
- [What's the difference between a `relative`, `fixed`, `absolute` and `static`ally positioned element?](#whats-the-difference-between-a-relative-fixed-absolute-and-statically-positioned-element)
- [What existing CSS frameworks have you used locally, or in production? How would you change/improve them?](#what-existing-css-frameworks-have-you-used-locally-or-in-production-how-would-you-changeimprove-them)
- [Have you played around with the new CSS Flexbox or Grid specs?](#have-you-played-around-with-the-new-css-flexbox-or-grid-specs)
- [Can you explain the difference between coding a website to be responsive versus using a mobile-first strategy?](#can-you-explain-the-difference-between-coding-a-website-to-be-responsive-versus-using-a-mobile-first-strategy)
- [How is responsive design different from adaptive design?](#how-is-responsive-design-different-from-adaptive-design)
- [Have you ever worked with retina graphics? If so, when and what techniques did you use?](#have-you-ever-worked-with-retina-graphics-if-so-when-and-what-techniques-did-you-use)
- [Is there any reason you'd want to use `translate()` instead of `absolute` positioning, or vice-versa? And why?](#is-there-any-reason-youd-want-to-use-translate-instead-of-absolute-positioning-or-vice-versa-and-why)

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

[[↑] Powrót na górę](#pytania-z-css)

### Jaka jest różnica pomiędzy CSS "resetting" oraz "normalizing"? Które wybrałbyś, i dlaczego?

- **Resetting** - Resetowanie ma na celu usunięcie wszystkich domyślnych stylów przeglądarki z elementów. Na przykład `margin`, `padding`, `font-size` wszystkich elementów są resetowane, aby były takie same. Będziesz musiał zmienić styl dla wspólnych elementów typograficznych.
- **Normalizing** - Normalizacja zachowuje użyteczne style domyślne zamiast "unstyling" wszystkiego. Poprawia również błędy w typowych zależnościach przeglądarki.

Zdecydowałbym się zresetować, gdy mam bardzo niestandardowy lub niekonwencjonalny projekt strony, tak że muszę zrobić dużo własnej stylizacji i nie muszę zachowywać żadnej domyślnej stylizacji.

###### Bibliografia

- https://stackoverflow.com/questions/6887336/what-is-the-difference-between-normalize-css-and-reset-css

[[↑] Powrót na górę](#pytania-z-css)

### Opisz `float`y i jak one działają.

Float to właściwość pozycjonowania CSS. Elementy pływające (floated elements) pozostają częścią przepływu strony i będą wpływać na położenie innych elementów (np. tekst będzie płynął wokół elementów pływających), w przeciwieństwie do elementów `position: absolute`, które są usuwane z przepływu strony.

Właściwość `clear` CSS może być użyta do pozycjonowania poniżej elementów pływających `left`/`right`/`both`.

Jeśli element nadrzędny zawiera wyłącznie elementy pływające, jego wysokość zostanie zwinięta do zera. Można to naprawić, usuwając float za pływającymi elementami w kontenerze, ale przed zamknięciem kontenera.

Hack `.clearfix` używa sprytnego CSS [pseudo selektora](#describe-pseudo-elements-and-discuss-what-they-are-used-for) (`:after`) do czyszczenia float'ów. Zamiast ustawiać przepełnienie dla elementu nadrzędnego, stosuje się do niego dodatkową klasę `clearfix`. Następnie stosuje ten CSS:

```css
.clearfix:after {
  content: " ";
  visibility: hidden;
  display: block;
  height: 0;
  clear: both;
}
```

Alternatywnie, nadaj właściwość `overflow: auto` lub `overflow: hidden` elementowi nadrzędnemu, który ustanowi nowy kontekst formatowania bloku wewnątrz elementów podrzędnych i rozszerzy się, aby objąć jego elementy podrzędne.

###### Bibliografia

- https://css-tricks.com/all-about-floats/

[[↑] Powrót na górę](#pytania-z-css)

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

[[↑] Powrót na górę](#pytania-z-css)

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

[[↑] Powrót na górę](#pytania-z-css)

### Jakie są różne techniki czyszczenia i które są odpowiednie w jakim kontekście?

- Pusta metoda `div` - `<div style="clear:both;"></div>`.
- Metoda clearfix - nawiązując do klasy powyżej `.clearfix`.
- `overflow: auto` lub metoda `overflow: hidden` - Rodzic ustanowi nowy kontekst formatowania bloku i rozszerzy się, aby zawierał elementy podrzędne.

W dużych projektach napisałbym klasę użyteczności `.clearfix` i używał ich w miejscach, w których tego potrzebuję. `overflow: hidden` może podcinać children, jeśli children jest wyższy od parent i nie jest zbyt idealny.

[[↑] Powrót na górę](#pytania-z-css)

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

[[↑] Powrót na górę](#pytania-z-css)

### Jak podchodziłbyś do rozwiązywania problemów związanych ze stylem specyficznym dla przeglądarki?

- Po zidentyfikowaniu problemu i sprawiającej kłopoty przeglądarki użyj osobnego arkusza stylów, który ładuje się tylko wtedy, gdy używana jest konkretna przeglądarka. Ta technika wymaga jednak renderowania po stronie serwera.
- Używaj bibliotek takich jak Bootstrap, które już obsługują te problemy ze stylem.
- Użyj `autoprefixer`, aby automatycznie dodać prefiksy dostawcy do swojego kodu.
- Użyj Reset CSS lub Normalize.css.
- Jeśli korzystasz z Postcss (lub podobnej biblioteki do transpilowania), mogą istnieć wtyczki, które pozwolą ci wybrać nowoczesną składnię CSS (a nawet propozycje W3C), które przekształcą te sekcje twojego kodu w odpowiedni bezpieczny kod, który będzie pracować w celach, dla których korzystałeś.

[[↑] Powrót na górę](#pytania-z-css)

### Jak wyświetlasz swoje strony w przeglądarkach z ograniczeniami funkcji? Jakich technik/procesów używasz?

- Wdzięczna degradacja (graceful degradation) - praktyka polegająca na tworzeniu aplikacji dla nowoczesnych przeglądarek przy jednoczesnym zapewnieniu jej funkcjonalności w starszych przeglądarkach.
- Progresywne ulepszenie (progressive enhancement) - Praktyka budowania aplikacji dla podstawowego poziomu doświadczenia użytkownika, ale dodawanie ulepszeń funkcjonalnych, gdy przeglądarka ją obsługuje.
- Używanie [caniuse.com](https://caniuse.com/) aby sprawdzić obsługę funkcji.
- Autoprefixer do automatycznego wstawiania prefiksu dostawcy.
- Wykrywanie funkcji za pomocą [Modernizr](https://modernizr.com/).
- Używanie zapytań CSS Feature [@support](https://developer.mozilla.org/en-US/docs/Web/CSS/@supports)

[[↑] Powrót na górę](#pytania-z-css)

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

[[↑] Powrót na górę](#pytania-z-css)

### Czy kiedykolwiek korzystałeś z systemu siatki (grid system), a jeśli tak, to co preferujesz?

Przed tym jak Flex stał się popularny (około roku 2014), oparty na `float` grid system był najbardziej niezawodny, ponieważ nadal ma największą obsługę przeglądarek wśród alternatywnych istniejących systemów (flex, grid). Bootstrap korzystał z podejścia `float` do chwili, gdy Bootstrap 4, przełączył się na podejście oparte na `flex`. W chwili pisania (2020r.), `flex` jest zalecanym podejściem do budowania systemów gridowych i ma [przyzwoitą obsługę przeglądarki](https://caniuse.com/#search=flex).

Dla odważnych, mogą zajrzeć w [CSS Grid Layout](https://css-tricks.com/snippets/css/complete-guide-grid/), który używa nowej błyszczącej właściwości `grid`; jest nawet lepszy niż `flex` do budowania układów siatki i będzie de facto sposobem na zrobienie tego w przyszłości.

[[↑] Powrót na górę](#pytania-z-css)

### Czy używałeś lub implementowałeś media queries lub mobile-specific layouts/CSS?

Tak. Przykładem może być przekształcenie nawigacji stacked pill w nawigację fixed-bottom tab poza pewnym breakpointem.

[[↑] Powrót na górę](#pytania-z-css)

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

[[↑] Powrót na górę](#pytania-z-css)

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

[[↑] Powrót na górę](#pytania-z-css)

### Jakie są "tricki" do pisania wydajnego CSS?

Po pierwsze, zrozum, że przeglądarki dopasowują selektory od skrajnie prawej (key selector) do lewej. Przeglądarki odfiltrowują elementy w DOM zgodnie z key selector'em i przesuwają w górę jego elementy nadrzędne, aby ustalić dopasowania. Im krótsza długość łańcucha selektora, tym szybciej przeglądarka może ustalić, czy ten element pasuje do selektora. Dlatego unikaj key selectorów, które są selektorami tagów i uniwersalnymi. Pasują do dużej liczby elementów, a przeglądarki będą musiały wykonać więcej pracy, aby ustalić, czy rodzice pasują.

Metodologia [BEM (Block Element Modifier)](https://bem.info/) zaleca, aby wszystko miało jedną klasę, a tam, gdzie potrzebna jest hierarchia, która wpisuje się również w nazwę klasy, w naturalny sposób sprawia to, że selektor jest wydajny i łatwy do zastąpienia.

Należy pamiętać, które właściwości CSS wyzwalają [trigger](https://csstriggers.com/) reflow, repaint, i compositing. Unikaj pisania stylów, które zmieniają układ (wyzwalanie przepływu) tam, gdzie to możliwe.

###### Bibliografia

- https://developers.google.com/web/fundamentals/performance/rendering/
- https://csstriggers.com/

[[↑] Powrót na górę](#pytania-z-css)

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

[[↑] Powrót na górę](#pytania-z-css)

### Opisz, co lubisz, a czego nie w preprocesorach CSS, z których korzystałeś.

**Polubione:**

- Głównie zalety wymienione powyżej.
- Less jest napisany w JavaScript, który dobrze współpracuje z Node.

**Niepolubione:**

- Używam Sass przez `node-sass`, który jest powiązaniem dla LibSass napisanego w C++. Muszę często go przekompilować podczas przełączania między wersjami węzłów.
- W Less, nazwy zmiennych są poprzedzone znakiem `@`, które można pomylić z natywnymi słowami kluczowymi CSS, takimi jak `@media`, `@import` i reguła `@font-face`.

[[↑] Powrót na górę](#pytania-z-css)

### Jak zaimplementowałbyś kompozycję do projektowania stron internetowych, która wykorzystuje niestandardowe czcionki?

Użycie `@font-face` i zdefiniowanie `font-family` dla różnych `font-weight`.

[[↑] Powrót na górę](#pytania-z-css)

### Wyjaśnij, w jaki sposób przeglądarka określa, które elementy pasują do selektora CSS.

Ta część jest związana z powyższą na temat [pisania wydajnego CSS](#what-are-some-of-the-gotchas-for-writing-efficient-css). Przeglądarki dopasowują selektory od skrajnie prawej (key selector) do lewej. Przeglądarki odfiltrowują elementy w DOM zgodnie z key selector i przesuwają w górę jego elementy nadrzędne, aby ustalić dopasowania. Im krótsza długość łańcucha selektora, tym szybciej przeglądarka może ustalić, czy ten element pasuje do selektora.

Na przykład ten selektor `p span`, przeglądarka najpierw znajduje wszystkie elementy `<span>` i przemierza jego rodzica aż do roota, aby znaleźć element `<p>`. Dla konkretnego `<span>`, jak tylko znajdzie `<p>`, wie że `<span>` dopasowane i może zatrzymać dopasowanie.

###### Bibliografia

- https://stackoverflow.com/questions/5797014/why-do-browsers-match-css-selectors-from-right-to-left

[[↑] Powrót na górę](#pytania-z-css)

### Opisz pseudoelementy i omów, do czego służą.

Pseudoelement CSS jest słowem kluczowym dodawanym do selektora, który pozwala stylizować określoną część wybranych elementów. Mogą być używane do dekoracji (`:first-line`, `:first-letter`) lub dodawać elementy do znaczników (w połączeniu z `content: ...`) bez konieczności modyfikowania znaczników (`:before`, `:after`).

- `:first-line` i `:first-letter` może służyć do ozdabiania tekstu.
- Użycie `.clearfix` jak pokazano powyżej, aby dodać element zero-space z `clear: both`.
- Trójkątne strzałki w tooltips używają `:before` i `:after`. Zachęca do rozdzielenia rzeczy, ponieważ trójkąt jest uważany za część stylizacji, a nie DOM.

###### Bibliografia

- https://css-tricks.com/almanac/selectors/a/after-and-before/

[[↑] Powrót na górę](#pytania-z-css)

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

[[↑] Powrót na górę](#pytania-z-css)

### Co robi `* { box-sizing: border-box; }`? Jakie są tego zalety?

- Domyślnie, elementy mają `box-sizing: content-box` zastosowane, i uwzględniany jest tylko rozmiar contentu.
- `box-sizing: border-box` zmienia jak `width` i `height` elementów są liczone, `border` i `padding` są również uwzględniane w obliczeniach.
- `height` elementu jest teraz obliczany na podstawie zawartości `height` + pionowy `padding` + pionowa szerokość `border`.
- `width` elementu jest teraz obliczany na podstawie zawartości `width` + poziomy `padding` + pozioma szerokość `border`.
- Biorąc pod uwagę `padding` oraz `border` jako część naszego modelu pudełkowego lepiej współgra z tym, jak projektanci wyobrażają sobie treść w gridach.

###### Bibliografia

- https://www.paulirish.com/2012/box-sizing-border-box-ftw/

[[↑] Powrót na górę](#pytania-z-css)

### What is the CSS `display` property and can you give a few examples of its use?

- `none`, `block`, `inline`, `inline-block`, `flex`, `grid`, `table`, `table-row`, `table-cell`, `list-item`.

| `display`      | Description                                                                                                                                                                                                            |
| :------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `none`         | Does not display an element (the elementv no longer affects the layout of the document). All child element are also no longer displayed. The document is rendered as if the element did not exist in the document tree |
| `block`        | The element consumes the whole line in the block direction (which is usually horizontal)                                                                                                                               |
| `inline`       | Elements can be laid out beside each other                                                                                                                                                                             |
| `inline-block` | Similar to `inline`, but allows some `block` properties like setting `width` and `height`                                                                                                                              |
| `table`        | Behaves like the `<table>` element                                                                                                                                                                                     |
| `table-row`    | Behaves like the `<tr>` element                                                                                                                                                                                        |
| `table-cell`   | Behaves like the `<td>` element                                                                                                                                                                                        |
| `list-item`    | Behaves like a `<li>` element which allows it to define `list-style-type` and `list-style-position`                                                                                                                    |

[[↑] Powrót na górę](#pytania-z-css)

### What's the difference between `inline` and `inline-block`?

I shall throw in a comparison with `block` for good measure.

|                                      | `block`                                                                                     | `inline-block`                                                      | `inline`                                                                                                                                                                                                             |
| ------------------------------------ | ------------------------------------------------------------------------------------------- | ------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Size                                 | Fills up the width of its parent container.                                                 | Depends on content.                                                 | Depends on content.                                                                                                                                                                                                  |
| Positioning                          | Start on a new line and tolerates no HTML elements next to it (except when you add `float`) | Flows along with other content and allows other elements beside it. | Flows along with other content and allows other elements beside it.                                                                                                                                                  |
| Can specify `width` and `height`     | Yes                                                                                         | Yes                                                                 | No. Will ignore if being set.                                                                                                                                                                                        |
| Can be aligned with `vertical-align` | No                                                                                          | Yes                                                                 | Yes                                                                                                                                                                                                                  |
| Margins and paddings                 | All sides respected.                                                                        | All sides respected.                                                | Only horizontal sides respected. Vertical sides, if specified, do not affect layout. Vertical space it takes up depends on `line-height`, even though the `border` and `padding` appear visually around the content. |
| Float                                | -                                                                                           | -                                                                   | Becomes like a `block` element where you can set vertical margins and paddings.                                                                                                                                      |

[[↑] Powrót na górę](#pytania-z-css)

### What's the difference between a `relative`, `fixed`, `absolute` and `static`ally positioned element?

A positioned element is an element whose computed `position` property is either `relative`, `absolute`, `fixed` or `sticky`.

- `static` - The default position; the element will flow into the page as it normally would. The `top`, `right`, `bottom`, `left` and `z-index` properties do not apply.
- `relative` - The element's position is adjusted relative to itself, without changing layout (and thus leaving a gap for the element where it would have been had it not been positioned).
- `absolute` - The element is removed from the flow of the page and positioned at a specified position relative to its closest positioned ancestor if any, or otherwise relative to the initial containing block. Absolutely positioned boxes can have margins, and they do not collapse with any other margins. These elements do not affect the position of other elements.
- `fixed` - The element is removed from the flow of the page and positioned at a specified position relative to the viewport and doesn't move when scrolled.
- `sticky` - Sticky positioning is a hybrid of relative and fixed positioning. The element is treated as `relative` positioned until it crosses a specified threshold, at which point it is treated as `fixed` positioned.

###### Bibliografia

- https://developer.mozilla.org/en/docs/Web/CSS/position

[[↑] Powrót na górę](#pytania-z-css)

### What existing CSS frameworks have you used locally, or in production? How would you change/improve them?

- **Bootstrap** - Slow release cycle. Bootstrap 4 has been in alpha for almost 2 years. Add a spinner button component, as it is widely used.
- **Semantic UI** - Source code structure makes theme customization extremely hard to understand. Its unconventional theming system is a pain to customize. Hardcoded config path within the vendor library. Not well-designed for overriding variables unlike in Bootstrap.
- **Bulma** - A lot of non-semantic and superfluous classes and markup required. Not backward compatible. Upgrading versions breaks the app in subtle manners.

[[↑] Powrót na górę](#pytania-z-css)

### Have you played around with the new CSS Flexbox or Grid specs?

Yes. Flexbox is mainly meant for 1-dimensional layouts while Grid is meant for 2-dimensional layouts.

Flexbox solves many common problems in CSS, such as vertical centering of elements within a container, sticky footer, etc. Bootstrap and Bulma are based on Flexbox, and it is probably the recommended way to create layouts these days. Have tried Flexbox before but ran into some browser incompatibility issues (Safari) in using `flex-grow`, and I had to rewrite my code using `inline-blocks` and math to calculate the widths in percentages, it wasn't a nice experience.

Grid is by far the most intuitive approach for creating grid-based layouts (it better be!) but browser support is not wide at the moment.

###### Bibliografia

- https://philipwalton.github.io/solved-by-flexbox/

[[↑] Powrót na górę](#pytania-z-css)

### Can you explain the difference between coding a website to be responsive versus using a mobile-first strategy?

Note that these two 2 approaches are not exclusive.

Making a website responsive means the some elements will respond by adapting its size or other functionality according to the device's screen size, typically the viewport width, through CSS media queries, for example, making the font size smaller on smaller devices.

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

A mobile-first strategy is also responsive, however it agrees we should default and define all the styles for mobile devices, and only add specific responsive rules to other devices later. Following the previous example:

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

A mobile-first strategy has 2 main advantages:

- It's more performant on mobile devices, since all the rules applied for them don't have to be validated against any media queries.
- It forces to write cleaner code in respect to responsive CSS rules.

[[↑] Powrót na górę](#pytania-z-css)

### How is responsive design different from adaptive design?

Both responsive and adaptive design attempt to optimize the user experience across different devices, adjusting for different viewport sizes, resolutions, usage contexts, control mechanisms, and so on.

Responsive design works on the principle of flexibility - a single fluid website that can look good on any device. Responsive websites use media queries, flexible grids, and responsive images to create a user experience that flexes and changes based on a multitude of factors. Like a single ball growing or shrinking to fit through several different hoops.

Adaptive design is more like the modern definition of progressive enhancement. Instead of one flexible design, adaptive design detects the device and other features and then provides the appropriate feature and layout based on a predefined set of viewport sizes and other characteristics. The site detects the type of device used and delivers the pre-set layout for that device. Instead of a single ball going through several different-sized hoops, you'd have several different balls to use depending on the hoop size.

Both have these methods have some issues that need to be weighed:

- Responsive design can be quite challenging, as you're essentially using a single albeit responsive layout to fit all situations. How to set the media query breakpoints is one such challenge. Do you use standardized breakpoint values? Or, do you use breakpoints that make sense to your particular layout? What if that layout changes?
- Adaptive design generally requires user agent sniffing, or DPI detection, etc., all of which can prove unreliable.

###### Bibliografia

- https://developer.mozilla.org/en-US/docs/Archive/Apps/Design/UI_layout_basics/Responsive_design_versus_adaptive_design
- http://mediumwell.com/responsive-adaptive-mobile/
- https://css-tricks.com/the-difference-between-responsive-and-adaptive-design/

[[↑] Powrót na górę](#pytania-z-css)

### Have you ever worked with retina graphics? If so, when and what techniques did you use?

_Retina_ is just a marketing term to refer to high resolution screens with a pixel ratio bigger than 1. The key thing to know is that using a pixel ratio means these displays are emulating a lower resolution screen in order to show elements with the same size. Nowadays we consider all mobile devices _retina_ defacto displays.

Browsers by default render DOM elements according to the device resolution, except for images.

In order to have crisp, good-looking graphics that make the best of retina displays we need to use high resolution images whenever possible. However using always the highest resolution images will have an impact on performance as more bytes will need to be sent over the wire.

To overcome this problem, we can use responsive images, as specified in HTML5. It requires making available different resolution files of the same image to the browser and let it decide which image is best, using the html attribute `srcset` and optionally `sizes`, for instance:

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

It is important to note that browsers which don't support HTML5's `srcset` (i.e. IE11) will ignore it and use `src` instead. If we really need to support IE11 and we want to provide this feature for performance reasons, we can use a JavaScript polyfill, e.g. Picturefill (link w bibliografii).

For icons, I would also opt to use SVGs and icon fonts where possible, as they render very crisply regardless of resolution.

###### Bibliografia

- https://css-tricks.com/responsive-images-youre-just-changing-resolutions-use-srcset/
- http://scottjehl.github.io/picturefill/
- https://aclaes.com/responsive-background-images-with-srcset-and-sizes/

[[↑] Powrót na górę](#pytania-z-css)

### Is there any reason you'd want to use `translate()` instead of `absolute` positioning, or vice-versa? And why?

`translate()` is a value of CSS `transform`. Changing `transform` or `opacity` does not trigger browser reflow or repaint but does trigger compositions; whereas changing the absolute positioning triggers `reflow`. `transform` causes the browser to create a GPU layer for the element but changing absolute positioning properties uses the CPU. Hence `translate()` is more efficient and will result in shorter paint times for smoother animations.

When using `translate()`, the element still occupies its original space (sort of like `position: relative`), unlike in changing the absolute positioning.

###### Bibliografia

- https://www.paulirish.com/2012/why-moving-elements-with-translate-is-better-than-posabs-topleft/

[[↑] Powrót na górę](#pytania-z-css)

### Other Answers

- https://neal.codes/blog/front-end-interview-css-questions
- https://quizlet.com/28293152/front-end-interview-questions-css-flash-cards/
- http://peterdoes.it/2015/12/03/a-personal-exercise-front-end-job-interview-questions-and-my-answers-all/

___________________________
Stworzone przez @[yangshun](https://github.com/yangshun) polska wersja od @[mbiesiad](https://github.com/mbiesiad)
