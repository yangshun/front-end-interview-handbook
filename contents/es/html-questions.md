---
title: Preguntas de HTML
---

Respuestas a [Preguntas de trabajo para entrevistas Front-end - Preguntas de HTML](https://github.com/h5bp/Front-end-Developer-Interview-Questions/blob/master/src/questions/html-questions.md). Solicitudes de inserción para sugerencias y correcciones son bienvenidas!

## Tabla de Contenidos

- [¿Qué hace un doctype?](#qué-hace-un-doctype)
- [¿Cómo desplegar una página con contenido en varios idiomas?](#cómo-desplegar-una-página-con-contenido-en-varios-idiomas)
- [¿Qué cosas debes tener en cuenta al diseñar o desarrollar sitios en múltiples lenguajes?](#qué-cosas-debes-tener-en-cuenta-al-diseñar-o-desarrollar-sitios-en-múltiples-lenguajes)

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

Cuando se realiza una solicitud HTTP a un servidor, el agente de usuario solicitante generalmente envía información sobre las preferencias de idioma, como en el encabezado `Accept-Language`. El servidor puede usar esta información para devolver una versión del documento en el idioma apropiado si dicha alternativa está disponible. El documento HTML devuelto también debe declarar el atributo `lang` en la etiqueta` <html> `, como` <html lang = "en"> ... </html> `.

En el back-end, el HTML contendrá marcadores de posición `i18n` y contenido para el idioma específico almacenado en formatos YML o JSON. El servidor genera dinámicamente la página HTML con contenido en ese idioma en particular, generalmente con la ayuda de un framework back-end.

###### Referencias

- https://www.w3.org/International/getting-started/language

[[↑] Volver arriba](#tabla-de-contenidos)

### ¿Qué cosas debes tener en cuenta al diseñar o desarrollar sitios en múltiples lenguajes?

- Usar el atributo `lang` en tu HTML.
- Dirigir a los usuarios a su idioma nativo: permitir que un usuario cambie su país / idioma fácilmente sin problemas.
- El texto en imágenes basadas en ráster (por ejemplo, png, gif, jpg, etc.) no es escalable: colocar texto en una imagen sigue siendo una forma popular de obtener fuentes atractivas que no sean del sistema para mostrarlas en cualquier computadora. Sin embargo, para traducir el texto de la imagen, cada cadena de texto deberá tener una imagen separada creada para cada idioma. Cualquier cosa más que un puñado de reemplazos como este puede salirse rápidamente de control.
- Palabras restrictivas / longitud de la oración: algunos contenidos pueden ser más largos cuando se escriben en otro idioma. Se debe tener cuidado con los problemas de diseño o desbordamiento en el diseño. Es mejor evitar diseñar donde la cantidad de texto crearía o rompería el diseño. El conteo de caracteres entra en juego con cosas como titulares, etiquetas y botones. Son un problema menor con el texto de flujo libre, como el texto del cuerpo o los comentarios.
- Tener en cuenta cómo se perciben los colores: los colores se perciben de manera diferente en todos los idiomas y culturas. El diseño debe usar color adecuadamente.
- Formato de fechas y monedas: las fechas del calendario a veces se presentan de diferentes maneras. Por ejemplo. "Mayo 31, 2012" en los Estados Unidos versus "31 de mayo de 2012" en partes de Europa.
- No concatenar cadenas traducidas. No haga nada como `" La fecha de hoy es "+ fecha`. Se dividirá en idiomas con un orden de palabras diferente. Utilizar una cadena de plantilla con sustitución de parámetros para cada idioma en su lugar. Por ejemplo, mira las siguientes dos oraciones en español y chino respectivamente: `Viajaré el {% date%}` y `{% date%} 我 会 出发`. Tenga en cuenta que la posición de la variable es diferente debido a las reglas gramaticales del lenguaje.
- Dirección de lectura del idioma: en español, leemos de izquierda a derecha, de arriba a abajo, en japonés tradicional, el texto se lee de arriba a abajo, de derecha a izquierda.

###### Referencias
###### Referencias
[[↑] Volver arriba](#tabla-de-contenidos)
###### Referencias
[[↑] Volver arriba](#tabla-de-contenidos)
###### Referencias

[[↑] Volver arriba](#tabla-de-contenidos)
###### Referencias
[[↑] Volver arriba](#tabla-de-contenidos)
###### Referencias

[[↑] Volver arriba](#tabla-de-contenidos)
###### Referencias

[[↑] Volver arriba](#tabla-de-contenidos)
