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
- [Warum ist es eine gute Idee, die `<link>`s zum CSS-Stylesheet inneralb der `<head></head>` Tags zu platzieren und die JS `<script>`s direkt vorm `</body>` einzubinden? Würdest du Ausnwahmen machen?](#warum-ist-es-eine-gute-idee-die-links-zum-css-stylesheet-inneralb-der-head-head-tags-zu-platzieren-und-die-js-scripts-direkt-vorm-body-einzubinden-würdest-du-ausnwahmen-machen)
- [Was ist progressives Rendern?](#was-ist-progressives-rendern)
- [Warum würdest du ein `srcset` Attribute in ein image tag einsetzen? Erkläre wie der Browser bei der Auswertung des Inhalts dieses Attributs vorgeht](#warum-würdest-du ein-srcset-attribute-in-ein-image-tag-einsetzen-erkläre-wie-der-browser-bei-der-auswertung-des-inhalts-dieses-attributs-vorgeht)
  <!-- templating languages = template Enginges ? -->
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

[[↑] Back to top](#table-of-contents)

### Wie lieferst du eine Seite mit Inhalten in verschiedenen Sprachen aus?

Ich gehe davon aus, dass es sich um den häufigsten Fall handelt: Wie kann eine Seite mit Inhalten bedient werden, die in mehreren Sprachen verfügbar ist. Dabei soll der Inhalt innerhalb der Seite nur in einer konsistenten Sprache angezeigt werden.

Wenn ein Server eine HTTP-Anforderung erhält, sendet der anfordernde User Agent normalerweise Informationen über Sprachpräferenzen, die z.B. im `Accept-Language`-Header definiert sind. Der Server kann dann diese Informationen verwenden, um eine Version des Dokuments in der entsprechenden Sprache zurückzugeben, wenn eine solche Alternative verfügbar ist. Das zurückgegebene HTML-Dokument sollte auch das `lang`-Attribut im `<html>`-Tag deklarieren, wie z.B. `<html lang="en">...</html>`.

<!-- Bitte prüfen -->

Da es keinen Sinn ergibt, eine Suchmaschine wissen zu lassen, dass der gleiche Inhalt in verschiedenen Sprachen erhältlich ist, solltest du das `hreflang` Attribute im `<head>` setzen. D.h `<link rel="alternate" hreflang="de" href="http://de.example.com/page.html" />`

Im Backend enthält das HTML-Markup `i18n'-Platzhalter und Inhalte für die jeweilige Sprache, die im YML- oder JSON-Format gespeichert sind. Der Server generiert dann dynamisch die HTML-Seite mit Inhalt in dieser speziellen Sprache, normalerweise mit Hilfe eines Backend-Frameworks.

###### Referenzen

- https://www.w3.org/International/getting-started/language
- https://support.google.com/webmasters/answer/189077

[[↑] Back to top](#table-of-contents)

### Vor welchen Dingen solltest du dich hüten, wenn du mehrsprachige Websites designst oder entwickelst?

- Setze im HTML das `lang` Attribut.
- Erlauben Sie einem Benutzer, sein Land/seine Sprache einfach und problemlos zu ändern.
- Text in rasterbasierten Bildern (z.B. png, gif, jpg, etc.) auszuliefern, ist kein skalierbarer Ansatz. Dabei ist das Platzieren von Texten in Bildern immer noch eine beliebte Methode, um gut aussehende, nicht systemgebundene Schriftarten auf jedem Computer anzuzeigen. In diesem Fall muss aber für jeder auszuliefernde Sprache ein eigenes mit der entsprechenden Textzeichenfolge erstellt werden. Alles, was über eine Handvoll solcher Ersetzungen hinausgeht, kann schnell außer Kontrolle geraten.
- Restriktive Wort-/Satzlänge - Manche Inhalte können länger sein, wenn sie in einer anderen Sprache geschrieben sind. Seien Sie vorsichtig bei Layout- oder Überlaufproblemen im Design. Besondere Aufemerksamkeit ist prominenten Elementen wie Überschriften, Beschriftungen und Schaltflächen zu widmen, das hier sich ändernde Zeilenlängen schnell Überläufe bilden können. Frei fließender Text wie Fließtext oder Kommentartext ist weniger problematisch.
- Achte darauf, wie Farben wahrgenommen werden - Farben werden je nach Sprache und Kultur unterschiedlich wahrgenommen. Das Design sollte das berücksichtigen.
- Formatierung von Daten und Währungen - Kalenderdaten werden unterschiedlich dargestellt. Z.B. "31. Mai 2012" in den USA vs. "31. Mai 2012" in Teilen Europas.

- Verketten Sie keine übersetzten Zeichenketten - Machen Sie nichts wie `"Das heutige Datum ist " + date`. So ein Konstrukt funktioniert in einer Sprache mit einer anderen Wortstellung nicht. Verwende stattdessen Template-Strings mit sprachspezifischen Parameter-Substitution.
    <!--Paramater Substitutionen? Ist das der gängige Begriff?  -->
  Dazu ein Beispiel: `I will travel on {% date %}` sieht auf Chinesisch so aus: `{% date %} 我会出发`. Beachte, dass die Position der Variable Grammatikbedingt unterschiedlich ist.
- Sprachleserichtung - Im Englischen lesen wir von links nach rechts, von oben nach unten, im traditionellen Japanisch wird der Text von oben nach unten, von rechts nach links gelesen.

###### Referenzen

- https://www.quora.com/What-kind-of-things-one-should-be-wary-of-when-designing-or-developing-for-multilingual-sites

[[↑] Back to top](#table-of-contents)

### Wofür sind `data-` Attribute nützlich?

Bevor JavaScript-Frameworks populär wurden, benutzten Front-End-Entwickler `data-` Attribute, um zusätzliche Daten innerhalb des DOM selbst zu speichern. Sie dienen zum Speichern benutzerdefinierter Daten, für die es keine passenderen Attribute oder Elemente gibt.

Heute wird die Verwendung von `Daten-` Attributen nicht empfohlen. Zum Beispiel weil Benutzer das Datenattribut leicht modifizieren können, indem sie das inspect-Element im Browser verwenden. Das Datenmodell ist besser im JavaScript gespeichert und bleibt mit dem DOM durch Datenbindung, bspw. eine Library oder ein Framework, auf dem neuesten Stand.

Das Hinzufügen eines Hooks für _end to end_ Testframeworks wie Selenium und Capybara ist ein Beispiel für die gültige Verwendung von Datenattributen. Denn so ist es nicht nötig, sinnlose Klassen oder ID-Attribute erstellen zu müssen. Da das Element einen Weg benötigt , um von einer bestimmten Selenium-Spezifikation gefunden zu werden, und etwas wie `data-selector='the-thing'` ist ein gültiger Weg.

###### Referenzen

- http://html5doctor.com/html5-custom-data-attributes/
- https://www.w3.org/TR/html5/dom.html#embedding-custom-non-visible-data-with-the-data-*-attributes

[[↑] Back to top](#table-of-contents)

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

[[↑] Back to top](#table-of-contents)

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

_Note: Löscht der Nutzer seine Browser-Daten s zu löschen, löscht dies auch jeden gespeicherten `Cookie`, `LocalStorage` oder `SessionStorage`. Es ist wichtig, dies beim Design für lokale Persistenz zu bedenken. Eventuell sollte eine serverseitige Speicherung in einer Datenbank in Erwägung gezogen werden._

###### Referenzen

- https://developer.mozilla.org/en-US/docs/Web/HTTP/Cookies
- http://tutorial.techaltum.com/local-and-session-storage.html

[[↑] Back to top](#table-of-contents)

### Describe the difference between `<script>`, `<script async>` and `<script defer>`.

- `<script>` - HTML parsing is blocked, the script is fetched and executed immediately, HTML parsing resumes after the script is executed.
- `<script async>` - The script will be fetched in parallel to HTML parsing and executed as soon as it is available (potentially before HTML parsing completes). Use `async` when the script is independent of any other scripts on the page, for example, analytics.
- `<script defer>` - The script will be fetched in parallel to HTML parsing and executed when the page has finished parsing. If there are multiple of them, each deferred script is executed in the order they were encoun­tered in the document. If a script relies on a fully-parsed DOM, the `defer` attribute will be useful in ensuring that the HTML is fully parsed before executing. There's not much difference in putting a normal `<script>` at the end of `<body>`. A deferred script must not contain `document.write`.

Note: The `async` and `defer` attrib­utes are ignored for scripts that have no `src` attribute.

###### References

- http://www.growingwiththeweb.com/2014/02/async-vs-defer-attributes.html
- https://stackoverflow.com/questions/10808109/script-tag-async-defer
- https://bitsofco.de/async-vs-defer/

[[↑] Back to top](#table-of-contents)

### Why is it generally a good idea to position CSS `<link>`s between `<head></head>` and JS `<script>`s just before `</body>`? Do you know any exceptions?

**Placing `<link>`s in the `<head>`**

Putting `<link>`s in the `<head>` is part of proper specification in building an optimized website. When a page first loads, HTML and CSS are being parsed simultaneously; HTML creates the DOM (Document Object Model) and CSS creates the CSSOM (CSS Object Model). Both are needed to create the visuals in a website, allowing for a quick "first meaningful paint" timing. This progressive rendering is a category optimization sites are measured in their performance scores. Putting stylesheets near the bottom of the document is what prohibits progressive rendering in many browsers. Some browsers block rendering to avoid having to repaint elements of the page if their styles change. The user is then stuck viewing a blank white page. Other times there can be flashes of unstyled content (FOUC), which show a webpage with no styling applied.

**Placing `<script>`s just before `</body>`**

`<script>` tags block HTML parsing while they are being downloaded and executed which can slow down your page. Placing the scripts at the bottom will allow the HTML to be parsed and displayed to the user first.

An exception for positioning of `<script>`s at the bottom is when your script contains `document.write()`, but these days it's not a good practice to use `document.write()`. Also, placing `<script>`s at the bottom means that the browser cannot start downloading the scripts until the entire document is parsed. This ensures your code that needs to manipulate DOM elements will not throw and error and halt the entire script. If you need to put `<script>` in the `<head>`, use the `defer` attribute, which will achieve the same effect of downloading and running the script only after the HTML is parsed.

Keep in mind that putting scripts just before the closing `</body>` tag will create the illusion that the page loads faster on an empty cache (since the scripts won't block downloading the rest of the document). However, if you have some code you want to run during page load, it will only start executing after the entire page has loaded. If you put those scripts in the `<head>` tag, they would start executing before - so on a primed cache the page would actually appear to load faster.

###### References

- https://developer.yahoo.com/performance/rules.html#css_top
- https://www.techrepublic.com/blog/web-designer/how-to-prevent-flash-of-unstyled-content-on-your-websites/
- https://developers.google.com/web/fundamentals/performance/critical-rendering-path/

[[↑] Back to top](#table-of-contents)

### What is progressive rendering?

Progressive rendering is the name given to techniques used to improve the performance of a webpage (in particular, improve perceived load time) to render content for display as quickly as possible.

It used to be much more prevalent in the days before broadband internet but it is still used in modern development as mobile data connections are becoming increasingly popular (and unreliable)!

Examples of such techniques:

- Lazy loading of images - Images on the page are not loaded all at once. JavaScript will be used to load an image when the user scrolls into the part of the page that displays the image.
- Prioritizing visible content (or above-the-fold rendering) - Include only the minimum CSS/content/scripts necessary for the amount of page that would be rendered in the users browser first to display as quickly as possible, you can then use deferred scripts or listen for the `DOMContentLoaded`/`load` event to load in other resources and content.
- Async HTML fragments - Flushing parts of the HTML to the browser as the page is constructed on the back end. More details on the technique can be found [here](http://www.ebaytechblog.com/2014/12/08/async-fragments-rediscovering-progressive-html-rendering-with-marko/).

###### References

- https://stackoverflow.com/questions/33651166/what-is-progressive-rendering
- http://www.ebaytechblog.com/2014/12/08/async-fragments-rediscovering-progressive-html-rendering-with-marko/

[[↑] Back to top](#table-of-contents)

### Why you would use a `srcset` attribute in an image tag? Explain the process the browser uses when evaluating the content of this attribute.

You would use the `srcset` attribute when you want to serve different images to users depending on their device display width - serve higher quality images to devices with retina display enhances the user experience while serving lower resolution images to low-end devices increase performance and decrease data wastage (because serving a larger image will not have any visible difference). For example: `<img srcset="small.jpg 500w, medium.jpg 1000w, large.jpg 2000w" src="..." alt="">` tells the browser to display the small, medium or large `.jpg` graphic depending on the client's resolution. The first value is the image name and the second is the width of the image in pixels. For a device width of 320px, the following calculations are made:

- 500 / 320 = 1.5625
- 1000 / 320 = 3.125
- 2000 / 320 = 6.25

If the client's resolution is 1x, 1.5625 is the closest, and `500w` corresponding to `small.jpg` will be selected by the browser.

If the resolution is retina (2x), the browser will use the closest resolution above the minimum. Meaning it will not choose the 500w (1.5625) because it is greater than 1 and the image might look bad. The browser would then choose the image with a resulting ratio closer to 2 which is 1000w (3.125).

`srcset`s solve the problem whereby you want to serve smaller image files to narrow screen devices, as they don't need huge images like desktop displays do — and also optionally that you want to serve different resolution images to high density/low-density screens.

###### References

- https://developer.mozilla.org/en-US/docs/Learn/HTML/Multimedia_and_embedding/Responsive_images
- https://css-tricks.com/responsive-images-youre-just-changing-resolutions-use-srcset/

[[↑] Back to top](#table-of-contents)

### Have you used different HTML templating languages before?

Yes, Pug (formerly Jade), ERB, Slim, Handlebars, Jinja, Liquid, and EJS just to name a few. In my opinion, they are more or less the same and provide similar functionality of escaping content and helpful filters for manipulating the data to be displayed. Most templating engines will also allow you to inject your own filters in the event you need custom processing before display.

[[↑] Back to top](#table-of-contents)

### Other Answers

- https://neal.codes/blog/front-end-interview-questions-html/
- http://peterdoes.it/2015/12/03/a-personal-exercise-front-end-job-interview-questions-and-my-answers-all/
