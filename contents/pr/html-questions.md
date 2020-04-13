---
title: Perguntas de HTML
---

Respostas a [Front-end Job Interview Questions - HTML Questions](https://github.com/h5bp/Front-end-Developer-Interview-Questions/blob/master/src/questions/Índice.md). Os pedidos de sugestões e correções são bem-vindos!

## Índice

- [O que faz um doctype?](#what-does-a-doctype-do)
- [Como é que tu serves uma página com conteúdo em vários idiomas?](#how-do-you-serve-a-page-with-content-in-multiple-languages)
- [Que tipo de coisas tu deves desconfiar ao projetar ou desenvolver sites multilíngues?](#what-kind-of-things-must-you-be-wary-of-when-designing-or-developing-for-multilingual-sites)
- [Quais são os atributos `data-` bons para?](#what-are-data--attributes-good-for)
- [Considera HTML5 como uma plataforma aberta. Quais são os blocos de construção do HTML5?](#consider-html5-as-an-open-web-platform-what-are-the-building-blocks-of-html5)
- [Descreve a diferença entre uma `cookie`, `sessionStorage` e `localStorage`.](#describe-the-difference-between-a-cookie-sessionstorage-and-localstorage)
- [Descreva a diferença entre `<script>`, `<script async>` e `<script defer>`.](#describe-the-difference-between-script-script-async-and-script-defer)
- [Why is it generally a good idea to position CSS `<link>`s between `<head></head>` and JS `<script>`s just before `</body>`? Do you know any exceptions?](#why-is-it-generally-a-good-idea-to-position-css-links-between-headhead-and-js-scripts-just-before-body-do-you-know-any-exceptions)
- [O que é a renderização progressiva?](#what-is-progressive-rendering)
- [Por que usarias um atributo `srcset` numa etiqueta de imagem? Explica o processo que o navegador usa ao avaliar o conteúdo deste atributo](#why-you-would-use-a-srcset-attribute-in-an-image-tag-explain-the-process-the-browser-uses-when-evaluating-the-content-of-this-attribute)
- [Tu já usaste diferentes linguagens de modelos de HTML antes?](#have-you-used-different-html-templating-languages-before)

### O que faz um `DOCTYPE`?

`DOCTYPE` é uma abreviatura para “tipo de documento”. É uma declaração usada em HTML para distinguir entre o modo de padrões e [modo peculiar](https://quirks.spec.whatwg.org/#history). A sua presença diz ao navegador para renderizar a página da web no modo padrão.

Moral da história - apenas adiciona `<!DOCTYPE html>` no início da sua página.

###### Referências

- https://stackoverflow.com/questions/7695044/what-does-doctype-html-do
- https://www.w3.org/QA/Tips/Doctype
- https://quirks.spec.whatwg.org/#history

[[↑] De volta ao topo](#Índice)

### Como é que tu serves uma página com conteúdo em vários idiomas?

A questão é um pouco vaga, eu vou assumir que está a perguntar sobre o caso mais comum, que é como servir uma página com conteúdo disponível em vários idiomas, mas o conteúdo dentro da página deve ser exibido somente num idioma consistente.

Quando uma solicitação HTTP é feita para um servidor, o agente de utilizador pedido geralmente envia informações sobre as preferências de idioma, como no cabeçalho `Aceitar-Idioma`. O servidor pode então usar estas informações para retornar uma versão do documento no idioma apropriado, caso tal alternativa esteja disponível. O documento HTML retornado também deve declarar o atributo`lang`na marca`<html>`, como`<html lang="en">...</html>`.

Na parte de trás, a marcação HTML irá conter espaços reservados `i18n` e conteúdo para o idioma específico armazenado nos formatos YML ou JSON. O servidor, em seguida, gera dinamicamente a página HTML com conteúdo nesse idioma específico, geralmente com a ajuda de uma estrutura de back-end.

###### Referências

- https://www.w3.org/International/getting-started/language

[[↑] De volta ao topo](#Índice)

### Que tipo de coisas tuvocê deves desconfiar ao projetar ou desenvolver sites multilíngues?

- Usa atributos `lang` a tua HTML.
- Direccionando os de utilizadores para o teu idioma nativo - Permite que um utilizador mude facilmente o seu país/idioma sem problemas.
- O texto em imagens não é uma abordagem escalável - Colocar texto numa imagem ainda é uma maneira popular de obter fontes bonitas e sem sistema para serem exibidas em qualquer computador. No entanto, para traduzir o texto da imagem, cada sequência de texto precisará de ter uma imagem separada criada para cada idioma. Qualquer coisa mais do que um punhado de substituições como esta podem rapidamente sair do controle.
- Palavras restritas/comprimento da frase - Alguns conteúdos podem ser mais longos quando escritos num outro idioma. Desconfie de problemas de layout ou transbordamento no design. É melhor evitar projetar onde a quantidade de texto faria ou partisse um projeto. As contagens de personagens entram no jogo com coisas como manchetes, rótulos e botões. Eles são um menor problema com o texto livre, como texto corporativo ou comentários.
- Lembra-te de como as cores são percebidas - As cores são percebidas de maneira diferente em línguas e culturas. O design deve usar a cor adequadamente.
- Formatar datas e moedas - As datas do calendário são por vezes apresentadas de diferentes maneiras. Por exemplo. "31 de maio de 2012" nos EUA versus "31 de maio de 2012" em partes da Europa.
- Não concatene as cordas traduzidas - Não faças nada como `"A data hoje é" + data`. Ele vai partir em idiomas com diferentes ordens de palavras. Usa uma string de modelo com substituição de parâmetros para cada idioma. Por exemplo, vê as duas frases seguintes em inglês e chinês, respectivamente: `I will travel on {% date %}` e `{% date %} 我会出发`. Observa que a posição da variável é diferente devido às regras da gramática do idioma.
- Direção da leitura de idioma - Em inglês, lemos da esquerda para a direita, de cima para baixo, em japonês tradicional, o texto é lido de cima para baixo, da direita para a esquerda.

###### Referências

- https://www.quora.com/What-kind-of-things-one-should-be-wary-of-when-designing-or-developing-for-multilingual-sites

[[↑] De volta ao topo](#Índice)

### Para que são bons os atributos `data-`?

Antes que os frameworks JavaScript se tornassem populares, os desenvolvedores front-end usavam atributos `data-` para armazenar dados extras dentro do próprio DOM, sem outros hacks, como atributos não-padrão, propriedades extras no DOM. É destinado a armazenar dados personalizados privados para a página ou aplicativo, para os quais não há mais atributos ou elementos apropriados.

Atualmente, o uso dos atributos `data-` não é encorajado. Uma das razões é que os utilizadores podem modificar o atributo de dados facilmente usando o elemento de inspeção no navegador. O modelo de dados é melhor armazenado dentro do próprio JavaScript e permaneça atualizado com o DOM via ligação de dados possivelmente através de uma biblioteca ou uma estrutura.

###### Referências

- http://html5doctor.com/html5-custom-data-attributes/
- https://www.w3.org/TR/html5/dom.html#embedding-custom-non-visible-data-with-the-data-*-attributes

[[↑] De volta ao topo](#Índice)

### Considera HTML5 como uma plataforma aberta. Quais são os blocos de construção do HTML5?

- Semântica - Permite que tu descrevas mais precisamente o que é o teu conteúdo.
- Conectividade - Permite que tu comuniques com o servidor de formas novas e inovadoras.
- Offline e armazenamento - Permite que as páginas da Web armazenem dados no lado do cliente localmente e funcionem offline de forma mais eficiente.
- Multimédia - Criar vídeo e áudio de primeira classe cidadãos na Open Web.
- Gráficos e efeitos 2D/3D - Permitir uma gama muito mais diversificada de opções de apresentação.
- Desempenho e integração - Fornecer maior optimização da velocidade e melhor uso do hardware do computador.
- Acesso ao dispositivo - Permitir o uso de vários dispositivos de entrada e saída.
- Styling - Permitir que os autores escrevam temas mais sofisticados.

###### Referências

- https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/HTML5

[[↑] De volta ao topo](#Índice)

### Descreve a diferença entre uma `cookie`,`sessionStorage` e `localStorage`.

Todas as tecnologias acima mencionadas são mecanismos de armazenamento de valor-chave do lado do cliente. Eles só conseguem armazenar valores como strings.

|  | `cookie` | `localStorage` | `sessionStorage` |
| --- | --- | --- | --- |
| Iniciador | Cliente ou servidor. Pode usar cabeçalho `Set-Cookie` | Cliente | Cliente |
| Expira | Definir manualmente | Para sempre | Na aba fechar |
| Persiste em todas sessões do navegador | Depende de se o tempo de validade está configurado | Sim | Não |
| Tem um domínio associado | Sim | Não | Não |
| Enviado para servidor com cada solicitação HTTP | Os cookies são automaticamente enviados através do cabeçalho `Cookie` | Não | Não |
| Capacidade (por domínio) | 4kb | 5MB | 5MB |
| Acessibilidade | Qualquer janela | Qualquer janela | A mesma aba |

###### Referências

- https://developer.mozilla.org/en-US/docs/Web/HTTP/Cookies
- http://tutorial.techaltum.com/local-and-session-storage.html

[[↑] De volta ao topo](#Índice)

### Descreve a diferença entre `<script>`, `<script async>` e `<script defer>`.

- `<script>` - A análise HTML é bloqueada, o script é executado e executado imediatamente, a análise HTML é retomada após o script ser executado.
- `<script async>` - O script será procurado em paralelo com a análise HTML e executado assim que estiver disponível (potencialmente antes da análise HTML). Usa `async` quando o script for independente de qualquer outro script na página, por exemplo, analítica.

* `<script defer>` - O script será procurado em paralelo com a análise de HTML e executado quando a página terminar de analisar. Se houver vários deles, cada script diferido é executado na ordem em que foram encontrados no documento. Se um script depende de um DOM totalmente analisado, o atributo `defer` será útil para garantir que o HTML seja totalmente analisado antes de o executar. Não há muita diferença em colocar um `<script>`normal no final de`<body>`. Um script diferido não deve conter`document.write`.

Nota: Os atributos `async` e` defer`` são ignorados para scripts que não possuem atributo `src`.

###### Referências

- http://www.growingwiththeweb.com/2014/02/async-vs-defer-attributes.html
- https://stackoverflow.com/questions/10808109/script-tag-async-defer
- https://bitsofco.de/async-vs-defer/

[[↑] De volta ao topo](#Índice)

### Por que é geralmente uma boa ideia posicionar o CSS `<link>`s entre `<head></head>` e JS `<script>`s antes de `</body>`? Tu conheces alguma exceção?

**Colocar `<link>`s no `<head>`**

Colocar `<link>`s na cabeça faz parte da especificação. Além disso, colocar na parte superior permite que a página seja processada progressivamente, o que melhora a experiência do utilizador. O problema com a colocação de folhas de estilo perto da parte inferior do documento é que ele proíbe a renderização progressiva em muitos navegadores, incluindo o Internet Explorer. Alguns navegadores bloqueiam a renderização para evitar ter que pintar elementos da página se os seus estilos mudarem. O utilizador está preso a ver uma página branca em branco. Evita o flash de conteúdo não esmagado.

**Colocar `<script>`s pouco antes de `</body>`**

`<script>`s bloqueia a análise HTML enquanto eles estão a ser descarregados e executados. Fazer o download dos scripts na parte inferior permitirá que o HTML seja analisado e mostrado em primeiro ao utilizador.

Uma exceção para o posicionamento de `<script>`s na parte inferior é quando o teu script contém `document.write ()`, mas nos dias de hoje não é uma boa prática usar `document.write ()`. Além disso, colocar `<script>`s na parte inferior significa que o navegador não pode começar a descarregar os scripts até que o documento inteiro seja analisado. Uma solução possível é colocar `<script>` no `<head>` e usar o atributo `defer``

###### Referências

- https://developer.yahoo.com/performance/rules.html#css_top

[[↑] De volta ao topo](#Índice)

### O que é a renderização progressiva?

A renderização progressiva é o nome dado às técnicas utilizadas para melhorar o desempenho de uma página web (em particular, melhorar o tempo de carregamento percebido) para renderizar o conteúdo para a sua exibição o mais rápido possível.

Ele costumava ser muito mais prevalecente nos dias que antecedem a internet de banda larga, mas ainda é útil no desenvolvimento moderno, pois as conexões de dados móveis estão a tornar-se cada vez mais populares (e não confiáveis)!

Exemplos de tais técnicas:

- O carregamento preguiçoso de imagens - As imagens na página não são carregadas de uma só vez. O JavaScript será usado para carregar uma imagem quando o utilizador rolar para a parte da página que mostra a imagem.
- Priorizando o conteúdo visível (ou a renderização acima da dobra) - Inclua apenas o CSS/conteúdo/scripts mínimos necessários para a quantidade de página que será processada no navegador de primeiros utilizadores para exibir o mais rápido possível, tu podes usar o diferido scripts ou ouve o evento `DOMContentLoaded`/`load` para carregar os outros recursos e conteúdo.
- Fragmentos HTML Async - Peças de lavagem do HTML para o navegador à medida que a página é construída na parte traseira. Mais detalhes sobre a técnica podem ser encontrados [aqui](http://www.ebaytechblog.com/2014/12/08/async-fragments-rediscovering-progressive-html-rendering-with-marko/).

###### Referências

- https://stackoverflow.com/questions/33651166/what-is-progressive-rendering
- http://www.ebaytechblog.com/2014/12/08/async-fragments-rediscovering-progressive-html-rendering-with-marko/

[[↑] De volta ao topo](#Índice)

### Por que usarias um atributo `srcset` numa tag de imagem? Explica o processo que o navegador usa ao avaliar o conteúdo deste atributo.

Tu usarias o atributo `srcset` quando quiseres exibir imagens diferentes para os utilizadores, dependendo da largura do ecrã do dispositivo - mostrar imagens de qualidade superior para dispositivos com display de retina aumenta a experiência do utilizador enquanto fornece imagens de baixa resolução para dispositivos de baixo custo aumentam o desempenho e diminuem o desperdício de dados (porque servir uma imagem maior não terá nenhuma diferença visível). Por exemplo: `<img srcset="small.jpg 500w, medium.jpg 1000w, large.jpg 2000w" src="..." alt="">` diz ao navegador para mostrar o pequeno, médio ou grande `.jpg` gráfico dependendo da resolução do cliente. O primeiro valor é o nome da imagem e o segundo é a largura da imagem em pixels. Para uma largura de dispositivo de 320px, os seguintes cálculos são feitos:

- 500 / 320 = 1.5625
- 1000 / 320 = 3.125
- 2000 / 320 = 6.25

Se a resolução do cliente for 1x, 1.5625 é o mais próximo, e `500w` corresponde a `small.jpg` será selecionado pelo navegador.

Se a resolução for retina (2x), o navegador usará a resolução mais próxima acima do mínimo. O que significa que não escolherá o 500w (1.5625) porque é maior que 1 e a imagem pode parecer de má qualidade. O navegador escolheria então a imagem com uma razão resultante mais próxima de 2 que é 1000w (3.125).

`srcset`s resolve o problema pelo qual tu queres servir arquivos de imagem menores para estreitar dispositivos de ecrã, pois eles não precisam de imagens enormes, como monitores de desktop - e também opcionalmente que tu queres servir imagens de resolução diferentes para ecrãs de alta densidade/baixa densidade.

###### Referências

- https://developer.mozilla.org/en-US/docs/Learn/HTML/Multimedia_and_embedding/Responsive_images
- https://css-tricks.com/responsive-images-youre-just-changing-resolutions-use-srcset/

[[↑] De volta ao topo](#Índice)

### Tu já usaste antes diferentes linguagens de modelos de HTML?

Sim, Pug (anteriormente Jade), ERB, Slim, Handlebars, Jinja, Liquid, apenas para citar alguns. Na minha opinião, eles são mais ou menos o mesmo e oferecem funcionalidades semelhantes de conteúdo de escape e filtros úteis para manipular os dados a serem exibidos. A maioria dos modelos de modelos também permitirá que injetes teus próprios filtros no caso de precisares de processamento personalizado antes da exibição.

[[↑] De volta ao topo](#Índice)

### Outras respostas

- https://neal.codes/blog/front-end-interview-questions-html/
- http://peterdoes.it/2015/12/03/a-personal-exercise-front-end-job-interview-questions-and-my-answers-all/
