---
title: Pytania z HTML
---

Odpowiedzi do [Front-end Job Interview Questions - HTML Questions](https://github.com/h5bp/Front-end-Developer-Interview-Questions/blob/master/src/questions/html-questions.md). Pull request mile widziany, jeśli masz jakieś sugestie lub poprawki!

## Spis treści

- [Co robi DOCTYPE?](#co-robi-doctype)
- [W jaki sposób wyświetlasz stronę z treścią w wielu językach?](#w-jaki-sposób-wyświetlasz-stronę-z-treścią-w-wielu-językach)
- [Jakich rzeczy należy się wystrzegać podczas projektowania lub tworzenia witryn wielojęzycznych?](#jakich-rzeczy-należy-się-wystrzegać-podczas-projektowania-lub-tworzenia-witryn-wielojęzycznych)
- [Do czego są dobre atrybuty `data-`?](#do-czego-są-dobre-atrybuty-data)
- [Rozważ HTML5 jako Open Web Platform. Jakie są elementy składowe HTML5?](#rozważ-html5-jako-open-web-platform-jakie-są-elementy-składowe-html5)
- [Opisz różnicę pomiędzy `cookie`, `sessionStorage` oraz `localStorage`.](#opisz-różnicę-pomiędzy-cookie-sessionStorage-oraz-localstorage)
- [Opisz różnicę pomiędzy `<script>`, `<script async>` oraz `<script defer>`.](#opisz-różnicę-pomiędzy-script-script-async-oraz-script-defer)
- [Dlaczego ogólnie dobrym pomysłem jest pozycjonowanie CSS `<link>` pomiędzy `<head></head>` oraz JS `<script>` tuż przed `</body>`? Czy znasz jakieś wyjątki?](#dlaczego-ogólnie-dobrym-pomysłem-jest-pozycjonowanie-css-link-pomiędzy-headhead-oraz-js-script-tuż-przed-body-czy-znasz-jakieś-wyjątki)
- [Co to jest rendering progresywny?](#co-to-jest-rendering-progresywny)
- [Dlaczego warto użyć atrybutu `srcset` w tagu obrazu? Wyjaśnij proces wykorzystywany przez przeglądarkę podczas oceny zawartości tego atrybutu.](#dlaczego-warto-użyć-atrybutu-srcset-w-tagu-obrazu-wyjaśnij-proces-wykorzystywany-przez-przeglądarkę-podczas-oceny-zawartości-tego-atrybutu)
- [Czy używałeś wcześniej różnych języków szablonów HTML?](#czy-używałeś-wcześniej-różnych-języków-szablonów-html)

### Co robi DOCTYPE?

**DOCTYPE** to skrót od **DOCument TYPE**. DOCTYPE jest zawsze powiązany z **DTD** - tzn z **Document Type Definition**.

DTD określa, w jaki sposób powinny być uporządkowane dokumenty określonego rodzaju (np. `button` może zawierać `span` ale nie `div`), podczas gdy DOCTYPE deklaruje to, co DTD _jakoby_ respektuje (np. ten dokument jest zgodny z DTD HTML).

W przypadku stron internetowych wymagana jest deklaracja DOCTYPE. Służy do informowania agentów użytkownika (user agents), jakiej wersji specyfikacji HTML dotyczy twój dokument. Gdy user agent rozpozna prawidłowy DOCTYPE, uruchomi **tryb no-quirks** pasujący do tego DOCTYPE do odczytu dokumentu. Jeśli user agent nie rozpozna prawidłowego DOCTYPE, uruchomi **tryb quirks**.

Deklaracja DOCTYPE dla standardów HTML5 to `<!DOCTYPE html>`.

###### Bibliografia

- https://html.spec.whatwg.org/multipage/syntax.html#the-doctype
- https://html.spec.whatwg.org/multipage/xhtml.html
- https://quirks.spec.whatwg.org/

[[↑] Powrót do góry](#spis-treści)

### W jaki sposób wyświetlasz stronę z treścią w wielu językach?

Pytanie jest trochę niejasne, założę się, że chodzi o najczęstszy przypadek, czyli sposób obsługi strony z treścią dostępną w wielu językach, ale treść na stronie powinna być wyświetlana tylko w jednym spójnym języku.

Po wysłaniu żądania HTTP do serwera requestujący user agent zwykle wysyła informacje o preferencjach językowych, na przykład w nagłówku `Accept-Language`. Serwer może następnie użyć tych informacji, aby zwrócić wersję dokumentu w odpowiednim języku, jeśli taka alternatywa jest dostępna. Zwrócony dokument HTML powinien również zadeklarować atrybut `lang` w tagu `<html>`, tak jak `<html lang="en">...</html>`.

W backendzie, HTML będzie zawierać symbole zastępcze `i18n` oraz treść dla określonego języka przechowywaną w formatach YML lub JSON. Serwer następnie dynamicznie generuje stronę HTML z zawartością w tym konkretnym języku, zwykle za pomocą frameworka backend.

###### Bibliografia

- https://www.w3.org/International/getting-started/language

[[↑] Powrót do góry](#spis-treści)

### Jakich rzeczy należy się wystrzegać podczas projektowania lub tworzenia witryn wielojęzycznych?

- Używanie atrybutu `lang` w swoim HTML.
- Przekierowanie użytkowników na ich język ojczysty - pozwól użytkownikowi na łatwą zmianę kraju/języka bez żadnych problemów.
- Tekst na obrazach rastrowych (np. png, gif, jpg, itp.) nie jest skalowalnym podejściem - umieszczanie tekstu na obrazie jest nadal popularnym sposobem na uzyskanie ładnych, niesystemowych czcionek do wyświetlania na dowolnym komputerze. Jednak, aby przetłumaczyć tekst obrazu, każdy ciąg tekstu musi mieć osobny obraz utworzony dla każdego języka. Coś więcej niż kilka takich zamienników, może szybko wymknąć się spod kontroli.
- Ograniczająca długość słów/zdań - niektóre treści mogą być dłuższe, gdy są napisane w innym języku. Uważaj na problemy z układem lub przepełnieniem w projekcie. Najlepiej unikać projektowania miejsca, w którym ilość tekstu mogłaby stworzyć lub zepsuć projekt. Liczby znaków wchodzą w grę z takimi nagłówkami, etykietami i przyciskami. Są mniej problematyczne z płynnym tekstem, takim jak treść lub komentarze.
- Pamiętaj o tym, jak postrzegane są kolory - kolory są postrzegane inaczej w różnych językach i kulturach. Projekt powinien odpowiednio używać koloru.
- Formatowanie dat i walut - Daty kalendarza są czasami przedstawiane na różne sposoby. Na przykład. "May 31, 2012" w Stanach Zjednoczonych, a "31 May 2012" w niektórych częściach Europy.
- Nie łącz przetłumaczonych ciągów - nie rób niczego podobnego jak `"The date today is " + date`. Będzie psuł się w językach o różnej kolejności słów. Zamiast tego użyj ciągu szablonu z podstawieniem parametrów dla każdego języka. Na przykład spójrz na następujące dwa zdania odpowiednio w języku angielskim i chińskim: `I will travel on {% date %}` oraz `{% date %} 我会出发`. Zauważ, że pozycja zmiennej jest inna ze względu na reguły gramatyczne języka.
- Kierunek czytania języka - w języku angielskim czytamy od lewej do prawej, od góry do dołu, w tradycyjnym japońskim tekst jest czytany od góry do dołu, od prawej do lewej.

###### Bibliografia

- https://www.quora.com/What-kind-of-things-one-should-be-wary-of-when-designing-or-developing-for-multilingual-sites

[[↑] Powrót do góry](#spis-treści)

### Do czego są dobre atrybuty `data-`?

Zanim frameworki JavaScript stały się popularne, programiści używali atrybutów `data-` do przechowywania dodatkowych danych w samym DOM, bez innych sztuczek, takich jak niestandardowe atrybuty, dodatkowe właściwości w DOM. Jest przeznaczony do przechowywania niestandardowych danych prywatnych na stronie lub w aplikacji, dla których nie ma już odpowiednich atrybutów ani elementów.

Obecnie używanie atrybutów `data-` ogólnie nie jest popierane. Jednym z powodów jest to, że użytkownicy mogą łatwo modyfikować atrybut danych za pomocą elementu inspekcji w przeglądarce. Model danych jest lepiej przechowywany w samym JavaScript i jest na bieżąco aktualizowany za pomocą DOM poprzez powiązanie danych, ewentualnie za pośrednictwem biblioteki lub frameworka.

Jednakże, jednym całkowicie poprawnym zastosowaniem atrybutów danych jest dodanie hook dla _end to end_ testujących frameworków takich jak Selenium i Capybara bez konieczności tworzenia bezsensownych atrybutów klas lub identyfikatorów. Element musi być znaleziony przez konkretną specyfikację Selenium i coś jak `data-selector='the-thing'` jest prawidłowym sposobem, aby to zrobić bez zwijania znaczników semantycznych.

###### Bibliografia

- http://html5doctor.com/html5-custom-data-attributes/
- https://www.w3.org/TR/html5/dom.html#embedding-custom-non-visible-data-with-the-data-*-attributes

[[↑] Powrót do góry](#spis-treści)

### Rozważ HTML5 jako Open Web Platform. Jakie są elementy składowe HTML5?

- Semantyka - pozwala precyzyjniej opisać treść.
- Łączność - umożliwiając komunikację z serwerem w nowy i innowacyjny sposób.
- Offline i przechowywanie - Umożliwienie stronom lokalnym przechowywanie danych po stronie klienta i wydajniejszą pracę offline.
- Multimedia - Tworzenie wysokiej jakości materiałów wideo i audio w Open Web.
- Grafika i efekty 2D/3D - Umożliwiając znacznie bardziej zróżnicowany zakres opcji prezentacji.
- Wydajność i integracja - Zapewnienie większej optymalizacji prędkości i lepszego wykorzystania sprzętu komputerowego.
- Dostęp do urządzenia - Umożliwia korzystanie z różnych urządzeń wejściowych i wyjściowych.
- Stylizacja - Pozwalanie autorom na pisanie bardziej wyrafinowanych motywów.

###### Bibliografia

- https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/HTML5

[[↑] Powrót do góry](#spis-treści)

### Opisz różnicę pomiędzy `cookie`, `sessionStorage` oraz `localStorage`.

Wszystkie wyżej wymienione technologie są kluczowymi mechanizmami przechowywania po stronie klienta. Są w stanie przechowywać wartości tylko jako ciągi znaków (strings).

|  | `cookie` | `localStorage` | `sessionStorage` |
| --- | --- | --- | --- |
| Initiator | Client or server. Server can use `Set-Cookie` header | Client | Client |
| Expiry | Manually set | Forever | On tab close |
| Persistent across browser sessions | Depends on whether expiration is set | Yes | No |
| Sent to server with every HTTP request | Cookies are automatically being sent via `Cookie` header | No | No |
| Capacity (per domain) | 4kb | 5MB | 5MB |
| Accessibility | Any window | Any window | Same tab |

_Uwaga: Jeśli użytkownik zdecyduje się wyczyścić dane przeglądania za pomocą dowolnego mechanizmu zapewnianego przez przeglądarkę, spowoduje to usunięcie dowolnego zebranego `cookie`, `localStorage`, czy `sessionStorage`. Należy o tym pamiętać przy projektowaniu pod kątem trwałości lokalnej, zwłaszcza w porównaniu z alternatywami, takimi jak przechowywanie po stronie serwera w bazie danych lub podobnym (które oczywiście będzie się utrzymywać pomimo działań użytkownika)._

###### Bibliografia

- https://developer.mozilla.org/en-US/docs/Web/HTTP/Cookies
- http://tutorial.techaltum.com/local-and-session-storage.html

[[↑] Powrót do góry](#spis-treści)

### Opisz różnicę pomiędzy `<script>`, `<script async>` oraz `<script defer>`.

- `<script>` - Parsowanie HTML jest zablokowane, skrypt jest pobierany i wykonywany natychmiast, parsowanie HTML jest wznawiane po wykonaniu skryptu.
- `<script async>` - Skrypt zostanie pobrany równolegle do parsowania HTML i wykonany, gdy tylko będzie dostępny (potencjalnie przed zakończeniem parsowania HTML). Użyj `async` gdy skrypt jest niezależny od innych skryptów na stronie, na przykład analityki.
- `<script defer>` - Skrypt zostanie pobrany równolegle do parsowania HTML i wykonany, gdy strona zakończy parsowanie. Jeśli jest ich wiele, każdy odroczony skrypt jest wykonywany w kolejności, w jakiej napotkano w dokumencie. Jeśli skrypt opiera się na w pełni przeanalizowanym modelu DOM, atrybut `defer` przyda się do pełnego przeanalizowania kodu HTML przed jego wykonaniem. Nie ma dużej różnicy we wprowadzaniu normalnego `<script>` na końcu `<body>`. Odroczony skrypt nie może zawierać `document.write`.

Uwaga: Atrybuty `async` oraz `defer` są ignorowane przez skrypty, które nie zawierają atrybutu `src`.

###### Bibliografia

- http://www.growingwiththeweb.com/2014/02/async-vs-defer-attributes.html
- https://stackoverflow.com/questions/10808109/script-tag-async-defer
- https://bitsofco.de/async-vs-defer/

[[↑] Powrót do góry](#spis-treści)

### Dlaczego ogólnie dobrym pomysłem jest pozycjonowanie CSS `<link>` pomiędzy `<head></head>` oraz JS `<script>` tuż przed `</body>`? Czy znasz jakieś wyjątki?

**Umieszczanie `<link>` w `<head>`**

Umieszczanie `<link>` w nagłówku jest częścią właściwej specyfikacji w budowaniu zoptymalizowanej strony internetowej. Gdy strona ładuje się po raz pierwszy, HTML i CSS są analizowane jednocześnie; HTML tworzy DOM (Document Object Model), a CSS tworzy CSSOM (CSS Object Model). Oba są potrzebne do stworzenia wizualizacji na stronie internetowej, pozwalając na szybkie "pierwsze znaczące malowanie". To progresywne renderowanie jest kategorią optymalizacji witryn ocenianych na podstawie ich wyników. Umieszczenie arkuszy stylów u dołu dokumentu uniemożliwia progresywne renderowanie w wielu przeglądarkach. Niektóre przeglądarki blokują renderowanie, aby uniknąć konieczności przemalowywania elementów strony, jeśli ich style się zmienią. Użytkownik utknął wtedy, oglądając pustą białą stronę. Innym razem mogą pojawiać się błyski niestylizowanej treści (FOUC), które pokazują stronę bez zastosowania stylizacji.

**Umieszczanie `<script>` tuż przed `</body>`**

`<script>` blokuje parsowanie HTML podczas ich pobierania i wykonywania. Umieszczenie skryptów na dole umożliwi parsowanie HTML i wyświetlenie go najpierw użytkownikowi.

Wyjątkiem dla pozycjonowania `<script>` na dole jest gdy twój skrypt zawiera `document.write()`, ale obecnie nie jest to dobra praktyka, aby używać `document.write()`. Również, umieszczanie `<script>` na dole oznacza, że przeglądarka nie może rozpocząć pobierania skryptów, dopóki cały dokument nie zostanie przeanalizowany. Zapewnia to, że kod, który musi manipulować elementami DOM, nie będzie generował błędów i nie zatrzyma całego skryptu. Jeśli musisz umieścić `<script>` w `<head>`, użyj atrybutu `defer`, który osiągnie ten sam efekt pobierania i uruchamiania skryptu dopiero po przeanalizowaniu HTML.

###### Bibliografia

- https://developer.yahoo.com/performance/rules.html#css_top
- https://www.techrepublic.com/blog/web-designer/how-to-prevent-flash-of-unstyled-content-on-your-websites/
- https://developers.google.com/web/fundamentals/performance/critical-rendering-path/

[[↑] Powrót do góry](#spis-treści)

### Co to jest rendering progresywny?

Renderowanie progresywne to nazwa nadana technikom stosowanym w celu poprawy wydajności strony internetowej (w szczególności w celu poprawy postrzeganego czasu ładowania) w celu renderowania treści do wyświetlenia tak szybko, jak to możliwe.

Kiedyś był znacznie bardziej rozpowszechniony w czasach przed internetem szerokopasmowym, ale nadal jest wykorzystywany w nowoczesnym rozwoju, ponieważ mobilne połączenia danych stają się coraz bardziej popularne (i zawodne)!

Przykłady takich technik:

- Leniwe ładowanie obrazów - obrazy na stronie nie są ładowane jednocześnie. JavaScript zostanie użyty do załadowania obrazu, gdy użytkownik przewinie do części strony, która wyświetla obraz.
- Określanie priorytetu widocznej treści (lub renderowania ponad zakładką) - Uwzględnij tylko minimalną ilość CSS/treści/skryptów niezbędnych do tego, aby ilość stron, które byłyby najpierw renderowane w przeglądarce użytkownika, były wyświetlane tak szybko, jak to możliwe, a następnie możesz użyć odroczonych skryptów lub nasłuchiwać zdarzenia `DOMContentLoaded`/`load`, aby załadować inne zasoby i zawartość.
- Asynchroniczne fragmenty HTML - opróżnianie części HTML do przeglądarki, gdy strona jest konstruowana na zapleczu. Więcej szczegółów na temat techniki można znaleźć [tutaj](http://www.ebaytechblog.com/2014/12/08/async-fragments-rediscovering-progressive-html-rendering-with-marko/).

###### Bibliografia

- https://stackoverflow.com/questions/33651166/what-is-progressive-rendering
- http://www.ebaytechblog.com/2014/12/08/async-fragments-rediscovering-progressive-html-rendering-with-marko/

[[↑] Powrót do góry](#spis-treści)

### Dlaczego warto użyć atrybutu `srcset` w tagu obrazu? Wyjaśnij proces wykorzystywany przez przeglądarkę podczas oceny zawartości tego atrybutu.

Możesz użyć atrybutu `srcset` gdy chcesz wyświetlać użytkownikom różne obrazy w zależności od szerokości ekranu ich urządzenia - wyświetlaj obrazy o wyższej jakości na urządzeniach z wyświetlaczem Retina, które poprawiają wrażenia użytkownika, a wyświetlanie obrazów o niższej rozdzielczości na mniejszych urządzeniach zwiększa wydajność i zmniejsza marnotrawstwo danych (ponieważ służy to większemu, obraz nie będzie miał widocznej różnicy). Na przykład: `<img srcset="small.jpg 500w, medium.jpg 1000w, large.jpg 2000w" src="..." alt="">` informuje przeglądarkę, aby wyświetlała małą, średnią lub dużą grafikę `.jpg` w zależności od rozdzielczości klienta. Pierwsza wartość to nazwa obrazu, a druga to szerokość obrazu w pikselach. W przypadku urządzenia o szerokości 320 pikseli wykonywane są następujące obliczenia:

- 500 / 320 = 1.5625
- 1000 / 320 = 3.125
- 2000 / 320 = 6.25

Jeśli rozdzielczość klienta wynosi 1x, 1.5625 jest najbliższa, a '500w' odpowiadające „small.jpg” zostanie wybrane przez przeglądarkę.

Jeśli rozdzielczość to retina (2x), przeglądarka użyje najbliższej rozdzielczości powyżej minimum. Oznacza to, że nie wybierze 500w (1,5625), ponieważ jest większa niż 1 i obraz może wyglądać źle. Przeglądarka wybrałaby wówczas obraz o współczynniku wynikowym bliższym 2, czyli 1000w (3,125).

`srcset` rozwiązuje problem polegający na tym, że chcesz wyświetlać mniejsze pliki obrazów na urządzeniach z wąskim ekranem, ponieważ nie potrzebują one dużych obrazów, takich jak wyświetlacze stacjonarne - a także opcjonalnie, że chcesz wyświetlać obrazy o różnej rozdzielczości na ekranach o wysokiej / niskiej gęstości.

###### Bibliografia

- https://developer.mozilla.org/en-US/docs/Learn/HTML/Multimedia_and_embedding/Responsive_images
- https://css-tricks.com/responsive-images-youre-just-changing-resolutions-use-srcset/

[[↑] Powrót do góry](#spis-treści)

### Czy używałeś wcześniej różnych języków szablonów HTML?

Tak, Pug (formalnie Jade), ERB, Slim, Handlebars, Jinja, Liquid, żeby wymienić tylko kilka. Moim zdaniem są one mniej więcej takie same i zapewniają podobną funkcjonalność ucieczki treści oraz pomocne filtry do manipulowania wyświetlanymi danymi. Większość silników szablonów pozwala również wstrzykiwać własne filtry na wypadek, gdybyś potrzebował niestandardowego przetwarzania przed wyświetleniem.

[[↑] Powrót do góry](#spis-treści)

### Inne odpowiedzi

- https://neal.codes/blog/front-end-interview-questions-html/
- http://peterdoes.it/2015/12/03/a-personal-exercise-front-end-job-interview-questions-and-my-answers-all/

---

Stworzone przez [@yangshun](https://github.com/yangshun) polska wersja od [@mbiesiad](https://github.com/mbiesiad)
