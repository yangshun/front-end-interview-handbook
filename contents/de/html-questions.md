---
title: Fragen zu HTML
---

Antworten auf [Front-end Job Interview Questions - HTML Questions](https://github.com/h5bp/Front-end-Developer-Interview-Questions/blob/master/src/questions/html-questions.md). Pull requests for suggestions and corrections are welcome!

## Inhaltsverzeichnis

<!-- Achtung: Übersetzung der Überschriften zum Teil von hier:
https://github.com/h5bp/Front-end-Developer-Interview-Questions/blob/master/src/questions/html-questions.md
 -->

- [Was tut ein `doctype` und wie viele von ihnen kannst du benennen?](#was-tut-ein-doctype)
- [Wie lieferst du eine Seite mit Inhalten in verschiedenen Sprachen aus?](#wie-lieferst-du-eine-seite-mit-inhalten-in-verschiedenen-sprachen-aus)
- [Vor welchen Dingen solltest du dich hüten, wenn du mehrsprachige Websites designst oder entwickelst?](#vor-welchen-dingen-solltest-du-dich-hüten-wenn-du-mehrsprachige-websites-designst-oder-entwickelst)
- [Wofür sind `data--Attribute` nützlich?](#wofür-sind-data--attribute-nützlich)
- [Stelle dir HTML5 als eine offene Internetplattform vor. Was sind die Basiskomponenten von HTML5?](#stelle-dir-html5-als-eine-offene-internetplattform-vor-was-sind-die-basiskomponenten-von-html5)
- [Beschreibe die Unterschiede zwischen `Cookies`, `sessionStorage` und `localStorage`.](#beschreibe-die-unterschiede-zwischen-cookies-sessionstorage-und-localstorage)
- [Beschreibe die Unterschiedie zwischen `<script>`, `<script async>` und `<script defer>`.](#beschreibe-die-unterschiede-zwischen-script-script-async-und-script-defer)
- [Warum ist es eine gute Idee, die `<link>`s zum CSS-Stylesheet inneralb der `<head></head>` Tags zu platzieren und die JS `<script>`s direkt vorm `</body>` einzubinden? Würdest du Ausnahmen machen?](#warum-ist-es-eine-gute-idee-die-links-zum-css-stylesheet-inneralb-der-head-head-tags-zu-platzieren-und-die-js-scripts-direkt-vorm-body-einzubinden-würdest-du-ausnwahmen-machen)
- [Was ist progressives Rendern?](#was-ist-progressives-rendern)
- [Warum würdest du ein `srcset` Attribut in ein image tag setzen? Erkläre wie der Browser den Inhalt dieses Attributs auswertet.](#warum-würdest-du-ein-srcset-attribute-in-ein-image-tag-einsetzen-erkläre-wie-der-browser-bei-der-auswertung-des-inhalts-dieses-attributs-vorgeht)
- [Hast du Erfahrungen mit unterschiedlichen HTML templating languages gemacht?](#hast-du-erfahrungen-mit-unterschiedlichen-html-templating-languages-gemacht)

### Was tut ein doctype?

**DOCTYPE** ist eine Abkürzung für **DOCument TYPE**. Jeder DOCTYPE ist immer mit einer **DTD** - verbunden, einer **Document Type Definition**.

Eine DTD legt fest, wie ein Dokument eines bestimmten Typs strukturiert ist (d.h. ein `button` kann ein `span` enthalten, aber kein`div`), ein DOCTYPE hingegen erklärt, welche DTD ein Dokument _vermutlich_ akzeptiert (d.h. dieses Dokument akzeptiert eine HTML DTD).

Webseiten benötigen die Ausweisung im jeweiligen DOCTYPE. User Agents erkennen so, welche Version der HTML-Spezifikationen das Dokument akzeptiert. Sobald ein User Agent ein korrektes DOCTYPE erkannt hat, löst es den **no-quirks mode** aus, das dem jeweiligen DOCTYPE entspricht. Wenn der User Agent kein korrektes DOCTYPE erkennt, löst er den **quirks mode** aus.

<!-- DOCTYPE declaration = DOCTYPE Spezifikation? -->

Die DOCTYPE Spezifikation für den HTML5 Standard ist `<!DOCTYPE html>`.

###### Referenzen

- https://html.spec.whatwg.org/multipage/syntax.html#the-doctype
- https://html.spec.whatwg.org/multipage/xhtml.html
- https://quirks.spec.whatwg.org/

[[↑] Back to top](#inhaltsverzeichnis)

### Wie lieferst du eine Seite mit Inhalten in verschiedenen Sprachen aus?

Ich gehe davon aus, dass es sich um den häufigsten Fall handelt: Wie kann eine Seite mit Inhalten bedient werden, die in mehreren Sprachen verfügbar ist. Dabei soll der Inhalt innerhalb der Seite nur in einer konsistenten Sprache angezeigt werden.

Wenn ein Server eine HTTP-Anforderung erhält, sendet der anfordernde User Agent normalerweise Informationen über Sprachpräferenzen, die z.B. im `Accept-Language`-Header definiert sind. Der Server kann dann diese Informationen verwenden, um eine Version des Dokuments in der entsprechenden Sprache zurückzugeben, wenn eine solche Alternative verfügbar ist. Das zurückgegebene HTML-Dokument sollte auch das `lang`-Attribut im `<html>`-Tag deklarieren, wie z.B. `<html lang="en">...</html>`.

<!-- Bitte prüfen -->

Da es keinen Sinn ergibt, eine Suchmaschine wissen zu lassen, dass der gleiche Inhalt in verschiedenen Sprachen erhältlich ist, solltest du das `hreflang` Attribute im `<head>` setzen. D.h `<link rel="alternate" hreflang="de" href="http://de.example.com/page.html" />`

Im Backend enthält das HTML-Markup `i18n'-Platzhalter und Inhalte für die jeweilige Sprache, die im YML- oder JSON-Format gespeichert sind. Der Server generiert dann dynamisch die HTML-Seite mit Inhalt in dieser speziellen Sprache, normalerweise mit Hilfe eines Backend-Frameworks.

###### Referenzen

- https://www.w3.org/International/getting-started/language
- https://support.google.com/webmasters/answer/189077

[[↑] Back to top](#inhaltsverzeichnis)

### Vor welchen Dingen solltest du dich hüten, wenn du mehrsprachige Websites designst oder entwickelst?

- Setze im HTML das `lang` Attribut.
- Erlauben Sie einem Benutzer, sein Land/seine Sprache einfach und problemlos zu ändern.
- Text in rasterbasierten Bildern (z.B. png, gif, jpg, etc.) auszuliefern, ist kein skalierbarer Ansatz. Dabei ist das Platzieren von Texten in Bildern immer noch eine beliebte Methode, um gut aussehende, nicht systemgebundene Schriftarten auf jedem Computer anzuzeigen. In diesem Fall muss aber für jeder auszuliefernde Sprache ein eigenes mit der entsprechenden Textzeichenfolge erstellt werden. Alles, was über eine Handvoll solcher Ersetzungen hinausgeht, kann schnell außer Kontrolle geraten.
- Restriktive Wort-/Satzlänge - Manche Inhalte können länger sein, wenn sie in einer anderen Sprache geschrieben sind. Sei vorsichtig bei Layout- oder Überlaufproblemen im Design. Besondere Aufemerksamkeit ist prominenten Elementen wie Überschriften, Beschriftungen und Schaltflächen zu widmen, das hier sich ändernde Zeilenlängen schnell Überläufe bilden können. Frei fließender Text wie Fließtext oder Kommentartext ist weniger problematisch.
- Achte darauf, wie Farben wahrgenommen werden - Farben werden je nach Sprache und Kultur unterschiedlich wahrgenommen. Das Design sollte das berücksichtigen.
- Formatierung von Daten und Währungen - Kalenderdaten werden unterschiedlich dargestellt. Z.B. "31. Mai 2012" in den USA vs. "31. Mai 2012" in Teilen Europas.

- Verketten Sie keine übersetzten Zeichenketten - Machen Sie nichts wie `"Das heutige Datum ist " + date`. So ein Konstrukt funktioniert in einer Sprache mit einer anderen Wortstellung nicht. Verwende stattdessen Template-Strings mit sprachspezifischen Parameter-Substitution.
    <!--Paramater Substitutionen? Ist das der gängige Begriff?  -->
  Dazu ein Beispiel: `I will travel on {% date %}` sieht auf Chinesisch so aus: `{% date %} 我会出发`. Beachte, dass die Position der Variable Grammatikbedingt unterschiedlich ist.
- Sprachleserichtung - Im Englischen lesen wir von links nach rechts, von oben nach unten, im traditionellen Japanisch wird der Text von oben nach unten, von rechts nach links gelesen.

###### Referenzen

- https://www.quora.com/What-kind-of-things-one-should-be-wary-of-when-designing-or-developing-for-multilingual-sites

[[↑] Back to top](#inhaltsverzeichnis)

### Wofür sind `data-` Attribute nützlich?

Bevor JavaScript-Frameworks populär wurden, benutzten Front-End-Entwickler `data-` Attribute, um zusätzliche Daten innerhalb des DOM selbst zu speichern. Sie dienen zum Speichern benutzerdefinierter Daten, für die es keine passenderen Attribute oder Elemente gibt.

Heute wird die Verwendung von `Daten-` Attributen nicht empfohlen. Zum Beispiel weil Benutzer das Datenattribut leicht modifizieren können, indem sie das inspect-Element im Browser verwenden. Das Datenmodell ist besser im JavaScript gespeichert und bleibt mit dem DOM durch Datenbindung, bspw. eine Library oder ein Framework, auf dem neuesten Stand.

Das Hinzufügen eines Hooks für _end to end_ Testframeworks wie Selenium und Capybara ist ein Beispiel für die gültige Verwendung von Datenattributen. Denn so ist es nicht nötig, sinnlose Klassen oder ID-Attribute erstellen zu müssen. Da das Element einen Weg benötigt , um von einer bestimmten Selenium-Spezifikation gefunden zu werden, und etwas wie `data-selector='the-thing'` ist ein gültiger Weg.

###### Referenzen

- http://html5doctor.com/html5-custom-data-attributes/
- https://www.w3.org/TR/html5/dom.html#embedding-custom-non-visible-data-with-the-data-*-attributes

[[↑] Back to top](#inhaltsverzeichnis)

### Stelle dir HTML5 als eine offene Internetplattform vor. Was sind die Basiskomponenten von HTML5?

- Semantik - Ermöglicht, Inhalte genauer zu beschreiben.
- Konnektivität - Ermöglicht, auf (innovative) neue Weise mit dem Server zu kommunizieren.
- Offline und Speicherung - Ermöglicht Webseiten, Daten auf der Client-Seite lokal zu speichern und offline effizienter zu arbeiten.
- Multimedia - Video und Audio lassen sich besser im Open Web nutzen.
- 2D/3D-Grafiken und -Effekte - Ermöglicht eine vielfältigere Palette von Präsentationsmöglichkeiten.
- Leistung und Integration - Geschwindigkeitsoptimierung und bessere Nutzung der Computerhardware.
- Gerätezugriff - Ermöglicht die Verwendung verschiedener Ein- und Ausgabegeräte.
- Styling - Macht anspruchsvollere Themes möglich.

###### Referenzen

- https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/HTML5

[[↑] Back to top](#inhaltsverzeichnis)

### Beschreibe die Unterschiede zwischen `Cookies`, `sessionStorage` und `localStorage`.

Alle oben genannten Technologien sind Schlüsselspeichermechanismen auf der Client-Seite. Sie sind nur in der Lage, Werte als Strings zu speichern.

|  | `cookie` | `localStorage` | `sessionStorage` |
| --- | --- | --- | --- |
| Initiator | Client bzw. Server. Server nutzt `Set-Cookie` Header | Client | Client |
| Ablauf | Manuell gesetzt | Für immer | Wenn Tab geschlossen |
| Persistenz über Browser-Sessions | Hängt davon ab, welcher Ablauf gesetzt ist | Ja | Nein |
| Wird mit jeder HTTP-Anfrage an den Server gesendet | Cookies werden automatisch über den `Cookie`-Header gesendet | Nein | Nein |
| Kapazität (pro Domain) | 4kb | 5MB | 5MB |
| Zugänglichkeit | Jedes Fenster | Jedes Fenster | Selbes Tab |

_Hinweis: Löscht der Nutzer seine Browser-Daten s zu löschen, löscht dies auch jeden gespeicherten `Cookie`, `LocalStorage` oder `SessionStorage`. Es ist wichtig, dies beim Design für lokale Persistenz zu bedenken. Eventuell sollte eine serverseitige Speicherung in einer Datenbank in Erwägung gezogen werden._

###### Referenzen

- https://developer.mozilla.org/en-US/docs/Web/HTTP/Cookies
- http://tutorial.techaltum.com/local-and-session-storage.html

[[↑] Back to top](#inhaltsverzeichnis)

### Beschreibe die Unterschiedie zwischen `<script>`, `<script async>` und `<script defer>`.

- `<script>` - Das HTML-Parsing wird blockiert, das Skript wird geholt (gefetcht) und sofort ausgeführt, das HTML-Parsing wird nach Ausführung des Scripts fortgesetzt.
- `<script async>` - Das Skript wird parallel zum HTML-Parsing geholt (gefetcht) und ausgeführt, sobald es verfügbar ist (möglicherweise bevor das HTML-Parsing abgeschlossen ist). Verwende `async`, wenn das Skript unabhängig von anderen Skripten auf der Seite ist, z.B. bei Analysen. (im Original "Analytics")
- `<script defer>` - Das Skript wird parallel zum HTML-Parsing geholt (gefetcht) aber erst dann ausgeführt, wenn das Parsen der Seite beendet ist. Sind mehrere Scripts vorhanden, werden sie in der Reihenfolge ausgeführt, in der sie im Dokument angetroffen wurden. Wenn sich ein Script auf ein vollständig geparstes DOM stützt, ist das `defer`-Attribut nützlich, um sicherzustellen, dass das HTML vor der Ausführung vollständig geparst wird. Es macht keinen großen Unterschied, ein normales `<script>` an das Ende von `<body>` zu setzen. Ein verzögertes Skript darf kein `document.write` enthalten.

Hinweis: Die Attribute `async` und `defer` werden für Skripte ignoriert, die kein `src'-Attribut haben.

###### Referenzen

- http://www.growingwiththeweb.com/2014/02/async-vs-defer-attributes.html
- https://stackoverflow.com/questions/10808109/script-tag-async-defer
- https://bitsofco.de/async-vs-defer/

[[↑] Back to top](#inhaltsverzeichnis)

### Warum ist es eine gute Idee, die `<link>`s zum CSS-Stylesheet inneralb der `<head></head>` Tags zu platzieren und die JS `<script>`s direkt vorm `</body>` einzubinden? Würdest du Ausnahmen machen?

**Platzieren von `<link>`s im `<head>`**

Eine optimierten Website setzt voraus, dass das `<link>` Attribut im `<head>` platziert ist. Wird eine Seite erstmalig geladen, werden HTML und CSS gleichzeitig geparst; HTML erzeugt das DOM (Document Object Model) und CSS erzeugt das CSSOM (CSS Object Model). Beide sind für die Erstellung einer Website erforderlich. Je schneller geparsed wird, desto besser, denn "first meaningful paint" ist ein wichtiger Performance-Indikator. Die Platzierung von Stylesheets am unteren Rand des Dokuments würde das progressessive Rendering in vielen Browsern verhindern. Einige Browser blockieren das Rendering, um zu vermeiden, dass Elemente der Seite neu gezeichnet werden müssen, wenn sich ihre Stile ändern. Der Benutzer bleibt dann bei der Anzeige einer leeren weißen Seite hängen. Zu anderen Zeiten kann es Flashs mit unstyled content (FOUC) geben, die eine Webseite ohne angewandtes Styling zeigen.

**Platzieren von `<script>`s direkt vor `</body>`**

`<script>` Tags blockieren das Parsen von HTML, während sie heruntergeladen und ausgeführt werden. Das kann die Seite verlangsamen. Durch die Platzierung der Skripte am unteren Rand wird das HTML zuerst geparsed und dem Benutzer angezeigt.

Es gibt eine Ausnahme für die Positionierung von `<script>`s am unteren Rand: Dein Script enthält `document.write()`. Das ist aber heutzutage eine schlechte Praxis. Außerdem bedeutet die Platzierung von `<script>`s am unteren Rand, dass der Browser erst dann mit dem Herunterladen der Skripte beginnen kann, wenn das gesamte Dokument geparst wurde. Dies stellt sicher, dass Code, der DOM-Elemente manipulieren muss, das gesamte Skript nicht verwirft, Fehler macht und anhält. Muss `<script>` in's `<head>` gesetzt werden, sollte man das`defer`-Attribut nutzen, das den gleichen Effekt erzielt wie das Herunterladen und Ausführen des Skripts nach dem Parsen des HTML-Dokuments.

Denke daran, dass das Einfügen von Scripten vor dem schließenden `</body>`-Tag die Illusion erzeugt, dass die Seite in einem leeren Cache schneller geladen wird (da die Scripte den Download des restlichen Dokuments nicht blockieren). Der Code wird erst dann ausgeführt, wenn die gesamte Seite geladen ist. Sind diese Scripte in das `<head>`-Tag gesetzt, beginnen sie vorher mit der Ausführung - auf einem vorbereiteten Cache würde die Seite also tatsächlich schneller geladen werden.

###### References

- https://developer.yahoo.com/performance/rules.html#css_top
- https://www.techrepublic.com/blog/web-designer/how-to-prevent-flash-of-unstyled-content-on-your-websites/
- https://developers.google.com/web/fundamentals/performance/critical-rendering-path/

[[↑] Back to top](#inhaltsverzeichnis)

### Was ist progressives Rendern?

"Progressive rendering" (progressive Wiedergabe) bezeichnet Techniken zur Verbesserung der Leistung einer Webseite (insbesondere zur Verbesserung der wahrgenommenen Ladezeit), da Inhalte so schnell wie möglich dargestellt werden können.

Vor der Einführung des Breitband-Internets war es viel weiter verbreitet, aber es wird in der modernen Web-Entwicklung immer noch verwendet, da mobile Datenverbindungen immer populärer (und unzuverlässiger) werden!

Beispiele für diese Technologie:

- Langsames Laden von Bildern (Lazy loading of images) - Bilder werden nicht alle auf einmal geladen. JavaScript lädtt Bilder erst, wenn der Benutzer in den Teil der Seite scrollt, der das Bild anzeigt.
- Priorisierung von sichtbarem Inhalt (oder Rendering über dem Falz "above-the-fold rendering" ) - Berücksichtige nur das für das erste Erscheinen der Seite nötige Minimum an CSS/Inhalten/Scripten. Durch verzögerte Scripte bzw. durch `DOMContentLoaded`/`load` können andere Ressourcen nachgeladen werden.
- Asynchrone HTML-Fragmente - Flushen von Teilen des HTML in den Browser, während die Seite im Backend aufgebaut wird.Mehr Details findest du [hier](http://www.ebaytechblog.com/2014/12/08/async-fragments-rediscovering-progressive-html-rendering-with-marko/).

###### Referenzen

- https://stackoverflow.com/questions/33651166/what-is-progressive-rendering
- http://www.ebaytechblog.com/2014/12/08/async-fragments-rediscovering-progressive-html-rendering-with-marko/

[[↑] Back to top](#inhaltsverzeichnis)

### Warum würdest du ein `srcset` Attribute in ein image tag einsetzen? Erkläre wie der Browser bei der Auswertung des Inhalts dieses Attributs vorgeht.

Das`srcset`-Attribut wird verwendet, um Benutzern abhängig von der Anzeigebreite ihrer Geräte unterschiedliche Bilder zur Verfügung zu stellen. Die Bereitstellung von Bildern höherer Qualität für Geräte mit Retina-Display verbessert das Nutzererlebnis, während die Bereitstellung von Bildern niedrigerer Auflösung für Geräte des unteren Marktsegments die Leistung erhöht und das Datenvolumen verringert (da die Bereitstellung eines größeren Bildes keinen sichtbaren Unterschied aufweist). Zum Beispiel: `<img srcset="small.jpg 500w, medium.jpg 1000w, large.jpg 2000w" src="..." alt="">` weist den Browser an, die kleine, mittlere oder große `.jpg` Grafik abhängig von der Auflösung des Kunden anzuzeigen. Der erste Wert ist der Bildname und der zweite ist die Breite des Bildes in Pixeln. Für eine Gerätebreite von 320px werden die folgenden Berechnungen durchgeführt:

- 500 / 320 = 1.5625
- 1000 / 320 = 3.125
- 2000 / 320 = 6.25

Wenn die Auflösung des Clients 1x ist, ist 1.5625 die nächstliegende Auflösung. Damit entspricht `500w` `small.jpg` und wird vom Browser ausgewählt.

Handelt es sich um ein Retina-Display (Auflösung: 2x), verwendet der Browser die nächstliegende Auflösung, die über dem Minimum liegt. Das heißt, er wird nicht die 500w (1,5625) wählen, nur weil sie größer als 1. Der Browser würde stattdessen das Bild mit einem resultierenden Verhältnis wählen, das näher an 2 liegt, d.h. 1000w (3,125). (Dessen Qualität der einer Retina-Auflösung entspricht)

Durch `srcset`s lassen sich Bilddateien Geräte- und Auflösungsspezifisch ausliefern: Kleine Bilder an Geräte mit schmalem Bildschirm, große, an Geräte mit großen Monitoren - und optional auch, Bilder unterschiedlicher Auflösung je nach Pixeldichte.

###### Referenzen

- https://developer.mozilla.org/en-US/docs/Learn/HTML/Multimedia_and_embedding/Responsive_images
- https://css-tricks.com/responsive-images-youre-just-changing-resolutions-use-srcset/

[[↑] Back to top](#inhaltsverzeichnis)

### Hast du Erfahrungen mit unterschiedlichen HTML templating languages gemacht?

Ja, Pug (früher Jade), ERB, Slim, Handlebars, Jinja, Liquid und EJS, um nur einige zu nennen. Meiner Meinung nach sind sie mehr oder weniger gleich und bieten eine ähnliche Funktionalität: Inhalte zu "escapen" und die anzuzeigenden Daten zu Filter um beispielsweise ihre Darstellung zu manipulieren. Die meisten Template-Engines erlauben es, eigene Filter einzufügen, falls eine benutzerdefinierte Verarbeitung benötigt wird.

[[↑] Back to top](#inhaltsverzeichnis)

### Andere Antworten

- https://neal.codes/blog/front-end-interview-questions-html/
- http://peterdoes.it/2015/12/03/a-personal-exercise-front-end-job-interview-questions-and-my-answers-all/
