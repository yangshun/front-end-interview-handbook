---
title: Perguntas sobre HTML
---

Respostas a [Front-end Job Interview Questions - HTML Questions](https://github.com/h5bp/Front-end-Developer-Interview-Questions/blob/master/src/questions/Índice.md). Pedidos de sugestões e correções são bem-vindos!

import TOCInline from '@theme/TOCInline';

<TOCInline toc={toc} />

**DOCTYPE** é uma abreviatura para **Tipo de documento** (Document Type). Um DOCTYPE sempre está associado a um **DTD** - Document Type Definition (Definição do Tipo de Documento).

O DTD define como estruturar documentos de um certo tipo (por exemplo, um `<button>` pode conter um `<span>` mas não um `<div>`), enquanto o DOCTYPE declara qual DTD o documento _supostamente_ respeita (por exemplo, este documento respeita o DTD de HTML).

Uma declaração de DOCTYPE é necessária para os websites. A declaração é utilizada para indicar aos agentes-usuários qual versão das especificações HTML o documento respeita. Assim que o agente-usuário reconheça o DOCTYPE correto, será ativado o **modo padrão** (_no-quirks mode_) que coincide com esse DOCTYPE para ler o documento. Caso o agente-usuário não reconheça um DOCTYPE correto, será ativado o **modo peculiar** (_quirks mode_).

A declaração DOCTYPE para os _standards_ de HTML5 é `<!DOCTYPE html>`.

Moral da história - apenas adiciona `<!DOCTYPE html>` no início da sua página.

###### Referências

- https://stackoverflow.com/questions/7695044/what-does-doctype-html-do
- https://www.w3.org/QA/Tips/Doctype
- https://quirks.spec.whatwg.org/#history

### Como podemos servir uma página com conteúdo em vários idiomas?

A questão é um pouco vaga. Vou supor que quer saber sobre o caso mais comum: servir uma página com conteúdo disponível em vários idiomas, mas o conteúdo dentro da página deve ser exibido somente em um idioma coerente.

Quando uma requisição (_request_) HTTP é feita para um servidor, o agente-usuário que faz a requisição geralmente envia informações sobre as preferências de idioma, como no cabeçalho `Accept-Language`. O servidor pode usar essas informações para retornar uma versão do documento no idioma apropriado, caso tal alternativa esteja disponível. O documento HTML retornado também deve declarar o atributo `lang` na tag `<html>`, como por exemplo `<html lang="en">...</html>`.

Obviamente, isso não permite a um mecanismo de busca saiba que o conteúdo está disponível em idiomas diferentes, e por isso devemos também usar o atributo `hreflang` na `<head>`. Por exemplo, <link rel="alternate" hreflang="de" href="http://de.example.com/page.html"/>.

No back end, o HTML irá conter marcadores de posição (_placeholders_) `i18n` e conteúdo para o idioma específico, armazenado em formato YML ou JSON. O servidor, em seguida, gera dinamicamente a página HTML com conteúdo nesse idioma específico, geralmente com a ajuda de uma estrutura de back end.

###### Referências

- https://www.w3.org/International/getting-started/language

### O que deve ser levado em conta ao projetar ou desenvolver sites multilíngues?

- Usar o atributo `lang` no HTML.
- Direcionar os usuários ao seu idioma nativo - Permitir que um usuário mude seu país/idioma sem problemas.
- Texto em imagens rasterizadas (por exemplo, png, gif, jpg) não é uma abordagem escalável - colocar texto numa imagem ainda é uma maneira popular de exibir fontes bonitas e que não são do sistema em qualquer computador. No entanto, para traduzir o texto da imagem, cada sequência de texto precisará de uma imagem separada para cada idioma. Qualquer coisa além de algumas substituições como essa podem rapidamente sair do controle.
- Restrições no comprimento de palavras restritas/frases - Alguns conteúdos podem ser mais longos quando escritos num outro idioma. É preciso ter cuidado com problemas de layout ou overflow no design. É melhor evitar situações em que a quantidade de texto possa quebrar o layout. A contagem de caracteres é importante para coisas como manchetes, legendas e botões. É um problema menor com texto livre, como o corpo do texto ou comentários.
- Levar em consideração a percepção das cores - As cores são percebidas de maneira diferente dependendo do idioma e a cultura. O design deve usar a cor adequadamente.
- Formatar datas e moedas - As datas do calendário são por vezes apresentadas de maneiras diferentes. Por exemplo, "May 31, 2012" nos EUA e "31 de maio de 2012" em partes da Europa.
- Não concatenar strings traduzidas - Não fazer coisas como `"A data hoje é" + data`. Isso não vai funcionar para idiomas com diferentes ordem de palavras. É melhor usar um template que permita a substituição de parâmetros para cada idioma. Por exemplo, considere as frases seguintes em inglês e chinês, respectivamente: `I will travel on {% date %}` e `{% date %} 我会出发`. Observe que a posição da variável é diferente devido às regras da gramática do idioma.
- Direção da leitura do idioma - Em inglês, lemos da esquerda para a direita, de cima para baixo; em japonês tradicional, o texto é lido de cima para baixo, da direita para a esquerda.
- Útil - incluir o local na especificação (p.ex., en_US, zh_CN, etc.).

###### Referências

- https://www.quora.com/What-kind-of-things-one-should-be-wary-of-when-designing-or-developing-for-multilingual-sites

### Para que servem os atributos `data-`?

Antes que os frameworks JavaScript se tornassem populares, os programadores front-end usavam atributos `data-` para armazenar dados extras dentro do próprio DOM, sem usar outros hacks como atributos fora do padrão, propriedades extras no DOM. Os atributos `data-` servem para armazenar dados personalizados privados de uma página ou aplicativo, para os quais não há mais atributos ou elementos apropriados.

Atualmente, o uso dos atributos `data-` não é recomendado. Um dos motivos é que os usuários podem modificar o atributo de dados facilmente mediante a inspeção de elementos no navegador. O modelo de dados é melhor armazenado dentro do próprio JavaScript e se mantém atualizado com o DOM pela ligação de dados possivelmente com o uso de uma biblioteca ou framework.

No entanto, um uso perfeitamente válido dos atributos `-data` é adicionar um gancho para frameworks de teste como Selenium e Cabybara, sem a necessidade de criar classes sem sentido ou atributos ID. É necessário que o elemento possa ser encontrado por uma especificação particular de Selenium e algo como `data-selector='a-coisa` é uma solução válida que não irá confundir o markup semântico.

###### Referências

- http://html5doctor.com/html5-custom-data-attributes/
- https://www.w3.org/TR/html5/dom.html#embedding-custom-non-visible-data-with-the-data-*-attributes

### Considere o HTML5 como uma plataforma aberta. Quais são os blocos de construção do HTML5?

- Semântica - Permite descrever o conteúdo mais precisamente.
- Conectividade - Permite a comunicação com o servidor de formas novas e inovadoras.
- Offline e armazenamento - Permite que os websites armazenem dados localmente no lado do cliente e funcionem offline de forma mais eficiente.
- Multimédia - Faz com que vídeo e áudio sejam cidadãos de primeira classe na Open Web.
- Gráficos e efeitos 2D/3D - Permite uma gama muito mais diversificada de opções de apresentação.
- Desempenho e integração - Possibilita uma maior optimização da velocidade e melhor uso do hardware do computador.
- Acesso ao dispositivo - Permite o uso de vários dispositivos de entrada e saída.
- Estilo - Permite que autores escrevam temas mais sofisticados.

###### Referências

- https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/HTML5

### Descreva a diferença entre `cookie`,`sessionStorage` e `localStorage`.

Todas as tecnologias mencionadas são mecanismos de armazenamento de valor-chave do lado do cliente. Elas só podem armazenar valores como strings.

|  | `cookie` | `localStorage` | `sessionStorage` |
| --- | --- | --- | --- |
| Iniciador | Cliente ou servidor. O servidor pode usar o cabeçalho `Set-Cookie` | Cliente | Cliente |
| Validade | Definida manualmente | Para sempre | Ao fechar a aba |
| Persiste em todas sessões do navegador | Depende de se o tempo de validade está configurado | Sim | Não |
| Enviado para servidor a cada solicitação HTTP | Os cookies são automaticamente enviados através do cabeçalho `Cookie` | Não | Não |
| Capacidade (por domínio) | 4kb | 5MB | 5MB |
| Acessibilidade | Qualquer janela | Qualquer janela | A mesma aba |

_Nota: Se o usuário decide apagar os dados de navegação através de qualquer mecanismo disponibilizado pelo navegador, isso irá apagar qualquer `cookie`,` localStorage` ou `sessionStorage` armazenada. É importante ter isso em mente ao projetar para persistência local, especialmente quando se compara com alternativas como o armazenamento do lado do servidor em uma base de dados ou algo semelhante (que obviamente irá persistir independentemente das ações do usuário) ._

###### Referências

- https://developer.mozilla.org/en-US/docs/Web/HTTP/Cookies
- http://tutorial.techaltum.com/local-and-session-storage.html

### Descreva a diferença entre `<script>`, `<script async>` e `<script defer>`.

- `<script>` - A análise do HTML é bloqueada, o script é obtido e executado imediatamente, a análise do HTML é retomada após o script ser executado.
- `<script async>` - O script será obtido em paralelo com a análise do HTML e executado assim que estiver disponível (possivelmente antes da análise do HTML ter sido finalizada). Use `async` quando o script for independente de qualquer outro script na página, por exemplo, scripts de analítica.

* `<script defer>` - O script será obtido em paralelo com a análise do HTML e executado quando a página terminar de analisar. Se houver vários scripts, cada script diferido será executado na ordem em que se encontra no documento. Se um script estiver baseado na análise completa do DOM, o atributo `defer` será útil para garantir que o HTML seja totalmente analisado antes de executar o script. Não é muito diferente de colocar um `<script>` normal no final de `<body>`. Um script diferido não deve conter `document.write`.

Nota: Os atributos `async` e` defer` são ignorados para scripts que não tenham o atributo `src`.

###### Referências

- http://www.growingwiththeweb.com/2014/02/async-vs-defer-attributes.html
- https://stackoverflow.com/questions/10808109/script-tag-async-defer
- https://bitsofco.de/async-vs-defer/

### Por que geralmente é uma boa ideia posicionar os `<link>`s para CSS entre `<head></head>` e os `<script>`s de JS antes de `</body>`? Existe alguma exceção?

**Colocar `<link>`s no `<head>`**

Colocar `<link>`s no `<head>` faz parte da especificação adequada para construir um website otimizado. Quando a página é carregada pela primeira vez, o HTML e CSS são analisados simultaneamente; o HTML cria o DOM (Document Object Model) e o CSS cria o CSSOM (CSS Object Model). Ambos são necessários para criar a parte visual de um website, permitindo uma sincronização rápida da "primeira pintura significativa". Essa renderização progressiva é uma categoria de otimização mensurada em análises de desempenho. Colocar as folhas de estilo perto da parte inferior do documento impede a renderização progressiva em muitos navegadores. Alguns navegadores bloqueiam a renderização para evitar ter que pintar elementos da página novamente caso os seus estilos mudem. O utilizador terá que ver uma página em branco. Em outras situações pode haver flashes de conteúdo não estilizado (FOUC), mostrando uma página sem nenhum estilo aplicado.

**Colocar `<script>`s pouco antes de `</body>`**

A tag `<script>`s bloqueia a análise do HTML enquanto os scripts estão sendo descarregados e executados, o que pode tornar a página lenta. Colocar os scripts na parte inferior permite que o HTML seja analisado e mostrado por primeiro ao utilizador.

Uma exceção para o posicionamento de `<script>`s na parte inferior é quando o script contém `document.write()`, mas nos dias de hoje não é uma boa prática usar `document.write()`. Além disso, colocar `<script>`s na parte inferior significa que o navegador não pode começar a descarregar os scripts até que o documento inteiro seja analisado. Isso garante que o código que precise manipular elementos do DOM não apresente erros e detenha todo o script. Se for necessário colocar `<script>`s na `<head>`, utilize o atributo `defer`, o que vai ter o mesmo efeito de executar o script apenas depois do HTML ser analisado, mas permite ao navegador baixar o script antes.

###### Referências

- https://developer.yahoo.com/performance/rules.html#css_top

### O que é renderização progressiva?

A renderização progressiva é o nome dado às técnicas utilizadas para melhorar o desempenho de uma página web (em particular, melhorar a percepção do usuário sobre o tempo de carregamento) de forma a renderizar o conteúdo para exibição o mais rápido possível.

Costumava ser muito mais prevalente antes da internet de banda larga, mas ainda é utilizada no desenvolvimento moderno, pois as conexões de dados móveis estão a tornar-se cada vez mais populares (e não confiáveis)!

Exemplos de tais técnicas:

- O carregamento preguiçoso de imagens - As imagens da página não são carregadas de uma só vez. O JavaScript será usado para carregar uma imagem quando o utilizador encontrar a parte da página que mostra a imagem.
- Priorizar o conteúdo visível (ou a renderização acima da dobra) - Incluir apenas o CSS/conteúdo/scripts mínimos necessários para que a página apresentada no navegador do utilizador seja exibida o mais rápido possível, pode-se então usar scripts diferidos ou escutar o evento `DOMContentLoaded`/`load` para carregar os outros recursos e conteúdo.
- Fragmentos HTML assíncronos - Enviar partes do HTML ao navegador à medida em que a página é construída no back-end. Mais detalhes sobre a técnica podem ser encontrados [aqui](http://www.ebaytechblog.com/2014/12/08/async-fragments-rediscovering-progressive-html-rendering-with-marko/).

###### Referências

- https://stackoverflow.com/questions/33651166/what-is-progressive-rendering
- http://www.ebaytechblog.com/2014/12/08/async-fragments-rediscovering-progressive-html-rendering-with-marko/

### Por que usar um atributo `srcset` numa tag de imagem? Explique o processo que o navegador usa ao avaliar o conteúdo desse atributo.

Tu usarias o atributo `srcset` quando quiseres exibir imagens diferentes para os utilizadores, dependendo da largura do ecrã (tela) do dispositivo - mostrar imagens de qualidade superior para dispositivos com display de retina melhora a experiência do utilizador, enquanto fornecer imagens de baixa resolução para dispositivos de baixo custo melhora o desempenho e diminui o desperdício de dados (porque mostrar uma imagem maior não terá nenhuma diferença visível). Por exemplo: `<img srcset="small.jpg 500w, medium.jpg 1000w, large.jpg 2000w" src="..." alt="">` diz ao navegador para mostrar o `.jpg` pequeno, médio ou grande dependendo da resolução do cliente. O primeiro valor é o nome da imagem e o segundo é a largura da imagem em pixels. Para um dispositivo com 320px de largura, são feitos os seguintes cálculos:

- 500 / 320 = 1.5625
- 1000 / 320 = 3.125
- 2000 / 320 = 6.25

Se a resolução do cliente for 1x, 1.5625 é a mais próxima, e o navegador irá selecionar `500w` que corresponde a `small.jpg`.

Se a resolução for retina (2x), o navegador usará a resolução mais próxima acima do mínimo. O que significa que não escolherá o 500w (1.5625) porque é maior que 1 e a imagem pode parecer de má qualidade. O navegador escolheria então a imagem com uma razão resultante mais próxima de 2, que é 1000w (3.125).

O `srcset` resolve o problema de querer servir arquivos de imagem menores para dispositivos com ecrã estreita, já que não precisam de imagens enormes como monitores de desktop - e também opcionalmente permite servir imagens de resolução diferentes para ecrãs de alta densidade/baixa densidade.

###### Referências

- https://developer.mozilla.org/en-US/docs/Learn/HTML/Multimedia_and_embedding/Responsive_images
- https://css-tricks.com/responsive-images-youre-just-changing-resolutions-use-srcset/

### Já usou diferentes linguagens de modelos de HTML antes?

Sim, Pug (anteriormente Jade), ERB, Slim, Handlebars, Jinja, Liquid, para citar alguns. Na minha opinião, eles são mais ou menos o mesmo e oferecem funcionalidades semelhantes de escape de conteúdo e filtros úteis para manipular os dados a serem exibidos. A maioria motores de template também permitirá que injetes teus próprios filtros no caso de precisares de processamento personalizado antes da exibição.

### Outras respostas

- https://neal.codes/blog/front-end-interview-questions-html/
- http://peterdoes.it/2015/12/03/a-personal-exercise-front-end-job-interview-questions-and-my-answers-all/
