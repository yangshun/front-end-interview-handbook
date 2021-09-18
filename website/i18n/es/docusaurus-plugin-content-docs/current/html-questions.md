---
title: Preguntas de HTML
---

Respuestas a [Preguntas de trabajo para entrevistas Front-end - Preguntas de HTML](https://github.com/h5bp/Front-end-Developer-Interview-Questions/blob/master/src/questions/html-questions.md). Solicitudes de inserción para sugerencias y correcciones son bienvenidas!

## Tabla de Contenidos

- [¿Qué hace un doctype?](#qué-hace-un-doctype)
- [¿Cómo desplegar una página con contenido en varios idiomas?](#cómo-desplegar-una-página-con-contenido-en-varios-idiomas)
- [¿Qué debes tener en cuenta al diseñar o desarrollar sitios en múltiples lenguajes?](#qué-debes-tener-en-cuenta-al-diseñar-o-desarrollar-sitios-en-múltiples-lenguajes)
- [¿Para qué sirve el atributo `data-`?](#para-qué-sirve-el-atributo-data-)
- [¿Consideras HTML5 como una plataforma web abierta. Cuáles son los componentes básicos de HTML5?](#consideras-html5-como-una-plataforma-web-abierta-cuáles-son-los-componentes-básicos-de-html5)
- [Describe las diferenias entre `cookie`, `sessionStorage` y `localStorage`.](#describe-las-diferenias-entre-cookie-sessionstorage-y-localstorage)
- [Describe las diferencias entre `<script>`, `<script async>` y `<script defer>`.](#describe-las-diferencias-entre-script-script-async-y-script-defer)
- [¿Por qué generalmente es buena idea colocar los `<link>` de CSS entre `<head></head>` y `<script>` de JS justo antes del `</body>`? ¿Conoces alguna excepción?](#por-qué-generalmente-es-buena-idea-colocar-los-link-de-css-entre-headhead-y-script-de-js-justo-antes-del-body-conoces-alguna-excepción)
- [¿Qué es el renderizado progresivo?](#qué-es-el-renderizado-progresivo)
- [¿Por qué usaría el atributo `srcset` en una etiqueta de imagen? Explica el proceso que usa el navegador al evaluar el contenido de este atributo.](#por-qué-usaría-el-atributo-srcset-en-una-etiqueta-de-imagen-explica-el-proceso-que-usa-el-navegador-al-evaluar-el-contenido-de-este-atributo)
- [¿Has utilizado otros lenguajes de plantillas HTML anteriormente?](#has-utilizado-otros-lenguajes-de-plantillas-html-anteriormente)

### ¿Qué hace un doctype?

**DOCTYPE** es una abreviación para **DOCument TYPE**. Un DOCTYPE es siempre asociado a **DTD** - que significa **Definición de tipo de documento, por sus siglas en inglés**.

Un DTD define cómo se deben estructurar los documentos de cierto tipo (por ejemplo, un `button` puede contener un `span` pero no un `div`), mientras un DOCTYPE declara qué DTD un documento _supuestamente_ respeta (por ejemplo, este documento respeta el DTD de HTML).

Para páginas web, se requiere la declaración DOCTYPE. Se utiliza para indicar a los agentes de usuario qué versión de las especificaciones HTML respeta el documento. Una vez que un agente de usuario ha reconocido un DOCTYPE correcto, activará el **modo sin peculiaridades** haciendo coincidir este DOCTYPE para leer el documento. Si un agente de usuario no reconoce un DOCTYPE correcto, activará el **modo con peculiaridades**.

La declaración DOCTYPE para los estándares HTML5 es `<!DOCTYPE html>`.

###### Referencias

- https://html.spec.whatwg.org/multipage/syntax.html#the-doctype
- https://html.spec.whatwg.org/multipage/xhtml.html
- https://quirks.spec.whatwg.org/

[[↑] Volver arriba](#tabla-de-contenidos)

### ¿Cómo desplegar una página con contenido en varios idiomas?

La pregunta es un poco vaga, supondré que se trata del caso más común, que es cómo desplegar una página con contenido disponible en varios idiomas, pero el contenido dentro de la página debe mostrarse solo en un idioma coherente.

Cuando se realiza una solicitud HTTP a un servidor, el agente de usuario solicitante generalmente envía información sobre las preferencias de idioma, como en el encabezado `Accept-Language`. El servidor puede usar esta información para devolver una versión del documento en el idioma apropiado si dicha alternativa está disponible. El documento HTML devuelto también debe declarar el atributo `lang` en la etiqueta`<html>`, como`<html lang="en">...</html>`.

En el back-end, el HTML contendrá marcadores de posición `i18n` y contenido para el idioma específico almacenado en formatos YML o JSON. El servidor genera dinámicamente la página HTML con contenido en ese idioma en particular, generalmente con la ayuda de un framework back-end.

###### Referencias

- https://www.w3.org/International/getting-started/language

[[↑] Volver arriba](#tabla-de-contenidos)

### ¿Qué debes tener en cuenta al diseñar o desarrollar sitios en múltiples lenguajes?

- Usar el atributo `lang` en tu HTML.
- Dirigir a los usuarios a su idioma nativo: permitir que un usuario cambie su país/idioma fácilmente sin problemas.
- El texto en imágenes basadas en ráster (por ejemplo, png, gif, jpg, etc.) no es escalable: colocar texto en una imagen sigue siendo una forma popular de obtener fuentes atractivas que no sean del sistema para mostrarlas en cualquier computadora. Sin embargo, para traducir el texto de la imagen, cada cadena de texto deberá tener una imagen separada creada para cada idioma. Cualquier cosa más que un puñado de reemplazos como este puede salirse rápidamente de control.
- Palabras restrictivas/longitud de la oración: algunos contenidos pueden ser más largos cuando se escriben en otro idioma. Se debe tener cuidado con los problemas de diseño o desbordamiento en el diseño. Es mejor evitar diseñar donde la cantidad de texto crearía o rompería el diseño. El conteo de caracteres entra en juego con cosas como titulares, etiquetas y botones. Son un problema menor con el texto de flujo libre, como el texto del cuerpo o los comentarios.
- Tener en cuenta cómo se perciben los colores: los colores se perciben de manera diferente en todos los idiomas y culturas. El diseño debe usar color adecuadamente.
- Formato de fechas y monedas: las fechas del calendario a veces se presentan de diferentes maneras. Por ejemplo. "Mayo 31, 2012" en los Estados Unidos versus "31 de mayo de 2012" en partes de Europa.
- No concatenar cadenas traducidas. No se deben hacer cosas como `"La fecha de hoy es " + fecha`. Se dividirá en idiomas con un orden de palabras diferente. Utilizar una cadena de plantilla con sustitución de parámetros para cada idioma en su lugar. Por ejemplo, mira las siguientes dos oraciones en español y chino respectivamente: `Viajaré el {%date%}` y `{%date%} 我会出发`. Tener en cuenta que la posición de la variable es diferente debido a las reglas gramaticales del lenguaje.
- Dirección de lectura del idioma: en español, leemos de izquierda a derecha, de arriba a abajo, en japonés tradicional, el texto se lee de arriba a abajo, de derecha a izquierda.

###### Referencias

- https://www.quora.com/What-kind-of-things-one-should-be-wary-of-when-designing-or-developing-for-multilingual-sites

[[↑] Volver arriba](#tabla-de-contenidos)

### ¿Para qué sirve el atributo `data-`?

Antes de que los frameworks de JavaScript se hicieran populares, los desarrolladores front-end usaban atributos `data-` para almacenar datos adicionales dentro del DOM, sin otros hacks como atributos no estándar, propiedades adicionales en el DOM. Está destinado a almacenar datos personalizados privados para la página o aplicación, para los cuales no hay más atributos o elementos apropiados.

Hoy en día, generalmente no se recomienda el uso de los atributos `data-`. Una razón es que los usuarios pueden modificar el atributo de datos fácilmente mediante el uso de inspección de elementos en el navegador. El modelo de datos se almacena mejor dentro de JavaScript y se mantiene actualizado con el DOM a través del enlace de datos posiblemente a través de una biblioteca o un marco.

Sin embargo, un uso perfectamente válido de los atributos de datos es agregar un gancho para frameworks de testeo como Selenium y Capybara, sin tener que crear clases sin sentido o atributos ID. El elemento necesita una forma de ser encontrado por una especificación de Selenium particular y algo como `data-selector='la-cosa`' es una forma válida de hacerlo sin complicar el marcado semántico.

###### Referencias

- http://html5doctor.com/html5-custom-data-attributes/
- https://www.w3.org/TR/html5/dom.html#embedding-custom-non-visible-data-with-the-data-*-attributes

[[↑] Volver arriba](#tabla-de-contenidos)

### ¿Consideras HTML5 como una plataforma web abierta. Cuáles son los componentes básicos de HTML5?

- Semántica: Permite describir con mayor precisión cuál es tu contenido.
- Conectividad: Permite comunicarse con el servidor de forma nueva e innovadora.
- Offline y almacenamiento: Permite que las páginas web almacenen datos por el lado del cliente localmente y operen offline de manera más eficiente.
- Multimedia: Hace ciudadanos de primera clase en la Web abierta a videos y audio.
- Gráficos y efectos 2D/3D: Permite una gama mucho más diversa de opciones de presentación.
- Rendimiento e integración: Proporciona una mayor optimización de la velocidad y un mejor uso del hardware de la computadora.
- Acceso a dispositivos: Permite el uso de varios dispositivos de entrada y salida.
- Estilo: Permite que los autores escriban temas más sofisticados.

###### Referencias

- https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/HTML5

[[↑] Volver arriba](#tabla-de-contenidos)

### Describe las diferenias entre `cookie`, `sessionStorage` y `localStorage`.

Las tecnologías mencionadas anteriormente son mecanismos de almacenamiento de llave-valor en el lado del cliente. Solo pueden almacenar valores como cadenas.

|  | `cookie` | `localStorage` | `sessionStorage` |
| --- | --- | --- | --- |
| Iniciador | Cliente o servidor. El servidor puede utilizar el encabezado `Set-Cookie` | Cliente | Cliente |
| Expiración | Se establece manualmente | Para siempre | Al cerrar la ventana |
| Persistente en sesiones del navegador | Depende de si se establece la caducidad | Si | No |
| Enviado al servidor con cada solicitud HTTP | Las cookies se envían automáticamente a través del encabezado `Cookie` | No | No |
| Capacidad (por dominio) | 4kb | 5MB | 5MB |
| Accesibilidad | Cualquier ventana | Cualquier ventana | Misma ventana |

_Nota: Si el usuario decide borrar los datos de navegación a través de cualquier mecanismo proporcionado por el navegador, esto borrará cualquier `cookie`,` localStorage` o `sessionStorage` almacenada. Es importante tener esto en cuenta al diseñar la persistencia local, especialmente cuando se compara con alternativas como el almacenamiento del lado del servidor en una base de datos o similar (que por supuesto persistirá a pesar de las acciones del usuario) ._

###### Referencias

- https://developer.mozilla.org/en-US/docs/Web/HTTP/Cookies
- http://tutorial.techaltum.com/local-and-session-storage.html

[[↑] Volver arriba](#tabla-de-contenidos)

### Describe las diferencias entre `<script>`, `<script async>` y `<script defer>`.

- `<script>` - El análisis del HTML es bloqueado, el script es extraído y ejecutado inmediatamente, el análisis del HTML se reanuda luego de ejecutado el script.
- `<script async>` - El script será extraído en paralelo con el análisis del HTML y ejecutado tan pronto esté disponible (potencialmente antes de que el análisis HTML termine). Usa `async` cuando el script sea independiente de cualquier otro script en la página, por ejemplo, scripts de analítica.
- `<script defer>` - El script será extraído en paralelo al análisis del HTML y ejecutado una vez la página haya terminado de ser analizada. Si hay varios scripts, cada script diferido es ejecutado en el orden en el que se encuentran en el documento. Si un script está basado en un análisis completo del DOM, el atributo `defer` será útil en asegurarse que el análisis del HTML haya terminado antes de ser ejecutado el script. No hay mucha diferencia con poner un `<script>` normal al final del `<body>`. Un script diferido no debe contener `document.write`.

Nota: Los atributos `async` y `defer` son ignorados por scripts que no tienen el atributo `src`.

###### Referencias

- http://www.growingwiththeweb.com/2014/02/async-vs-defer-attributes.html
- https://stackoverflow.com/questions/10808109/script-tag-async-defer
- https://bitsofco.de/async-vs-defer/

[[↑] Volver arriba](#tabla-de-contenidos)

### ¿Por qué generalmente es buena idea colocar los `<link>` de CSS entre `<head></head>` y `<script>` de JS justo antes del `</body>`? ¿Conoces alguna excepción?

**Colocar los `<link>` en el `<head>`**

Colocar los `<link>` dentro de `<head></head>` es parte de la especificación adecuada en la construcción de un sitio web optimizado. Cuando una página se carga por primera vez, el HTML y el CSS se analizan simultáneamente; el HTML crea el DOM (Modelo de objetos de documento) y el CSS crea el CSSOM (Modelo de objetos de CSS). Ambos son necesarios para crear los elementos visuales en un sitio web, lo que permite una sincronización rápida de la "primera pintura significativa". Esta representación progresiva es una categoría de optimización de sitios que se miden en puntajes de rendimiento. Poner hojas de estilo cerca de la parte inferior del documento prohíbe la representación progresiva en muchos navegadores. Algunos navegadores bloquean la representación para evitar tener que volver a pintar elementos de la página si cambian sus estilos. El usuario queda atrapado viendo una página en blanco. Otras veces puede haber flashes de contenido sin estilo (FOUC), que puede mostrar una página web sin aplicar estilo.

**Colocar los `<script>` justo antes del `</body>`**

Los `<script>` bloquean el análisis del HTML mientras son descargados y ejecutados. Colocar los scripts en la parte inferior permitirá que el HTML se analice y se muestre primero al usuario.

Una excepción para el posicionamiento de los `<script>` en la parte inferior es cuando el script contiene `document.write()`, pero hoy en día no es una buena práctica usar `document.write()`. Además, colocar `<script>` en la parte inferior significa que el navegador no puede comenzar a descargar los scripts hasta que se analice todo el documento. Esto garantiza que el código que necesita manipular elementos del DOM no arrojará errores y detendrá todo el script. Si necesitas poner algún `<script>` dentro del `<head>` por algún motivo, se debe utilizar el atributo `defer`, que logrará el mismo efecto de descarga diferido y ejecutará el script solo después de analizado el HTML.

###### Referencias

- https://developer.yahoo.com/performance/rules.html#css_top
- https://www.techrepublic.com/blog/web-designer/how-to-prevent-flash-of-unstyled-content-on-your-websites/
- https://developers.google.com/web/fundamentals/performance/critical-rendering-path/

[[↑] Volver arriba](#tabla-de-contenidos)

### ¿Qué es el renderizado progresivo?

Renderizado progresivo es el nombre dado a las técnicas utilizadas para mejorar el rendimiento de una página web (en particular, mejorar el tiempo de carga percibido) para representar el contenido y su visualización lo más rápido posible.

Solía ser mucho más frecuente en los días previos a Internet de banda ancha, pero aun es usado en el desarrollo moderno, ya que las conexiones de datos móviles se están volviendo cada vez más populares (y poco confiables).

Ejemplos:

- Carga perezosa de imágenes: las imágenes de la página no se cargan todas a la vez. JavaScript es usado para cargar una imagen a medida que el usuario se desplaza hacia la parte de la página que la muestra.
- Priorizar el contenido visible (o la representación por encima del pliegue): incluir el mínimo CSS/contenido/scripts necesarios para que la página que se representará en el navegador de los usuarios se muestre primero lo más rápido posible, luego puede usar scripts diferidos o escuchar el evento `DOMContentLoaded`/`load` para cargar otros recursos y contenido.
- Fragmentos HTML asíncronos - Enviar partes del HTML al navegador a medida que la página se construye en el back-end. Se pueden encontrar más detalles sobre esta técnica [aquí](http://www.ebaytechblog.com/2014/12/08/async-fragments-rediscovering-progressive-html-rendering-with-marko/).

###### Referencias

- https://stackoverflow.com/questions/33651166/what-is-progressive-rendering
- http://www.ebaytechblog.com/2014/12/08/async-fragments-rediscovering-progressive-html-rendering-with-marko/

[[↑] Volver arriba](#tabla-de-contenidos)

### ¿Por qué usaría el atributo `srcset` en una etiqueta de imagen? Explica el proceso que usa el navegador al evaluar el contenido de este atributo.

El atributo `srcset` debiese ser usado cuando se desee mostrar diferentes imágenes a los usuarios en función del ancho de visualización de su dispositivo; mostrar imágenes de mayor calidad a los dispositivos con pantalla retina mejora la experiencia del usuario, mientras que mostrar imágenes de menor resolución a dispositivos de gama baja aumenta el rendimiento y disminuir el desperdicio de datos (porque mostrar una imagen más grande no tendrá ninguna diferencia visible). Por ejemplo: `<img srcset="pequeño.jpg 500w, mediano.jpg 1000w, grande.jpg 2000w "src="..." alt="">` le dice al navegador que muestre el gráfico `.jpg` pequeño, mediano o grande dependiendo de la resolución del cliente. El primer valor es el nombre de la imagen y el segundo es el ancho de la imagen en píxeles. Para un ancho de dispositivo de 320px, se realizan los siguientes cálculos:

- 500 / 320 = 1.5625
- 1000 / 320 = 3.125
- 2000 / 320 = 6.25

Si la resolución del cliente es 1x, 1.5625 es la más cercana, y el navegador seleccionará `500w` correspondiente a `pequeño.jpg`.

Si la resolución es retina (2x), el navegador usará la resolución más cercana por encima del mínimo. Lo que significa que no elegirá 500w (1.5625) porque es mayor que 1 y la imagen puede verse mal. El navegador elegiría la imagen con una relación resultante más cercana a 2, que es 1000w (3.125).

`srcset` resuelve el problema de mostrar archivos de imagen más pequeños a dispositivos de pantalla estrecha, ya que no necesitan imágenes de gran tamaño como las pantallas de escritorio, y también opcionalmente mostrar imágenes de resolución diferente a pantallas de alta/baja densidad.

###### Referencias

- https://developer.mozilla.org/en-US/docs/Learn/HTML/Multimedia_and_embedding/Responsive_images
- https://css-tricks.com/responsive-images-youre-just-changing-resolutions-use-srcset/

[[↑] Volver arriba](#tabla-de-contenidos)

### ¿Has utilizado otros lenguajes de plantillas HTML anteriormente?

Sí, Pug (anteriormente Jade), ERB, Slim, Handlebars, Jinja, Liquid, por nombrar algunos. En mi opinión, son más o menos lo mismo y proporcionan una funcionalidad similar de escape de contenido y filtros útiles para manipular los datos que se mostrarán. La mayoría de los motores de plantillas también permiten inyectar tus propios filtros en caso de que se necesite un procesamiento personalizado antes de mostrarlos.

[[↑] Volver arriba](#tabla-de-contenidos)

### Otras Respuestas

- https://neal.codes/blog/front-end-interview-questions-html/
- http://peterdoes.it/2015/12/03/a-personal-exercise-front-end-job-interview-questions-and-my-answers-all/
