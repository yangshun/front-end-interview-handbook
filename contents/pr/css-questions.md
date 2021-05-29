---
title: Perguntas de CSS
---

Respostas às <a href="https://github.com/h5bp/Front-end-Developer-Interview-Questions/blob/master/src/questions/css-questions.md" id="top">Perguntas da Entrevista de Trabalho de Front-end - Questões CSS</a>. Pull requests para sugestões e correções são bem-vindos!

## Índice

- [O que é a especificidade do seletor CSS e como funciona?](#01)
- [Qual é a diferença entre "redefinir"/"resetting" e "normalizar"/"normalizing" o CSS? Qual você escolheri a e porquê](#02)?
- [Descreva `float` e como eles funcionam.](#03)
- [Descreva o z-index e como o contexto de empilhamento é formado.](#04)
- [Descreva o BFC (Block Formatting Context) e como ele funciona.](#05)
- [Quais são as várias técnicas de limpeza e quais são apropriadas para qual contexto?](#06)
- [Explique os sprites CSS e como você os implementaria em uma página ou site.](#07)

### <a id="01">O que é a especificidade do seletor CSS e como funciona?</a>

O navegador determina quais estilos mostrar em um elemento, dependendo da especificidade das regras CSS. Presumimos que o navegador já determinou as regras que correspondem a um elemento específico. Entre as regras de correspondência, a especificidade, quatro valores separados por vírgulas, `a, b, c, d` são calculados para cada regra com base no seguinte:

1. `a` é se estilos embutidos estão sendo usados. Se a declaração da propriedade for um estilo embutido no elemento, `a` é 1, caso contrário, 0.
2. `b` é o número de seletores de ID.
3. `c` é o número de classes, atributos e seletores de pseudo-classes.
4. `d` é o número de tags e seletores de pseudo-elementos.

A especificidade resultante não é uma pontuação, mas uma matriz de valores que podem ser comparados coluna por coluna. Ao comparar seletores para determinar qual tem a especificidade mais alta, olhe da esquerda para a direita e compare o valor mais alto em cada coluna. Portanto, um valor na coluna `b` substituirá os valores nas colunas `c e d`, não importa quais sejam. Como tal, a especificidade de `0,1,0,0` seria maior do que `0,0,10,10`.

Nos casos de especificidade igual: a regra mais recente é a que conta. Se você escreveu a mesma regra em sua folha de estilo (independentemente de interna ou externa) duas vezes, então a regra inferior em sua folha de estilo está mais próxima do elemento a ser estilizado, é considerada mais específica e, portanto, será aplicada.

Eu escreveria regras CSS com baixa especificidade para que possam ser facilmente substituídas, se necessário. Ao escrever código de biblioteca de componente de UI CSS, é importante que eles tenham especificidades baixas para que os usuários da biblioteca possam substituí-los sem usar regras CSS muito complicadas apenas para aumentar a especificidade ou recorrer a `!important`.

###### Referências

- https://www.smashingmagazine.com/2007/07/css-specificity-things-you-should-know/
- https://www.sitepoint.com/web-foundations/specificity/

[[↑] De volta ao topo](#Índice)

### <a id="02">Qual é a diferença entre "redefinir"/"resetting" e "normalizar"/"normalizing" o CSS? Qual você escolheria e porquê?</a>

- <b>Redefinir</b> - Redefinir visa eliminar todos os estilos padrão do navegador nos elementos. Por exemplo: `margins, paddings, font-size` são todos redefinidos. Você terá que redeclarar o estilo dos elementos tipográficos comuns.
- <b>Normalizar</b> - A normalização preserva estilos padrão úteis em vez de "desestilizar" tudo. Ele também corrige bugs para dependências comuns do navegador.

Eu escolheria redefinir quando tenho um design de site muito personalizado ou não convencional, de modo que preciso fazer muito do meu próprio estilo e não preciso que nenhum estilo padrão seja preservado.

###### Referências

- https://stackoverflow.com/questions/6887336/what-is-the-difference-between-normalize-css-and-reset-css

[[↑] De volta ao topo](#Índice)

### <a id="03">Descreva `float` e como eles funcionam.</a>

Float é uma propriedade de posicionamento CSS. Os elementos flutuantes permanecem como parte do fluxo da página e afetarão o posicionamento de outros elementos (por exemplo, o texto fluirá em torno dos elementos flutuantes), ao contrário dos elementos `position: absolute`, que são removidos do fluxo da página.

A propriedade CSS `clear` pode ser usada para ser posicionada abaixo de `left`/`right`/`both` elementos flutuantes.

Se um elemento pai não contém nada além de elementos flutuantes, sua altura será reduzida a nada. Pode ser consertado limpando o flutuador após os elementos flutuantes no contêiner, mas antes do fechamento do contêiner.

O hack `.clearfix` usa um pseudo-seletor CSS inteligente (`: after`) para limpar os floats. Em vez de definir o overflow no pai, você aplica uma classe adicional `clearfix` a ele. Em seguida, aplique este CSS:

`.clearfix:after { content: ' '; visibility: hidden; display: block; height: 0; clear: both; }`

Como alternativa, atribua a propriedade `overflow: auto` ou `overflow: hidden` ao elemento pai, que estabelecerá um novo contexto de formatação de bloco dentro dos filhos e se expandirá para conter seus filhos.

###### Referências

- https://css-tricks.com/all-about-floats/

[[↑] De volta ao topo](#Índice)

### <a id="04">Descreva o z-index e como o contexto de empilhamento é formado.</a>

A propriedade `z-index` em CSS controla a ordem de empilhamento vertical dos elementos que se sobrepõem. O `z-index` afeta apenas os elementos que possuem um valor `position` que não seja `static`.

Sem nenhum valor de `z-index`, os elementos são empilhados na ordem em que aparecem no DOM (o mais baixo no mesmo nível de hierarquia aparece no topo). Os elementos com posicionamento não estático (e seus filhos) sempre aparecerão no topo dos elementos com posicionamento estático padrão, independentemente da hierarquia HTML.

Um contexto de empilhamento é um elemento que contém um conjunto de camadas. Em um contexto de empilhamento local, os valores de `z-index` de seus filhos são definidos em relação a esse elemento, e não à raiz do documento. Camadas fora desse contexto - ou seja, elementos irmãos de um contexto de empilhamento local - não podem ficar entre as camadas dentro dele. Se um elemento B fica em cima do elemento A, um elemento filho do elemento A, elemento C, nunca pode ser maior do que o elemento B, mesmo se o elemento C tiver um `z-index` maior do que o elemento B.

Cada contexto de empilhamento é autocontido - depois que o conteúdo do elemento é empilhado, todo o elemento é considerado na ordem de empilhamento do contexto de empilhamento pai. Algumas propriedades CSS acionam um novo contexto de empilhamento, como `opacity` menor que 1, `filter` que não é `none` e `transform` que não é `none`.

_Nota: O que exatamente qualifica um elemento para criar um contexto de empilhamento está listado neste longo conjunto de [regras](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Positioning/Understanding_z_index/The_stacking_context#the_stacking_context")._

###### Referências

- https://css-tricks.com/almanac/properties/z/z-index/
- https://philipwalton.com/articles/what-no-one-told-you-about-z-index/
- https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Positioning/Understanding_z_index/The_stacking_context

[[↑] De volta ao topo](#Índice)

### <a id="05">Descreva o BFC (Block Formatting Context) e como ele funciona.</a>

Um Block Formatting Context (BFC) é parte da renderização CSS visual de uma página da web na qual as caixas de bloco são dispostas. Floats, elementos com position absolute, `inline-block`, `table-cells`, `table-caption` e elementos com `overflow` diferente de `visible` (exceto quando esse valor foi propagado para a janela de visualização) estabelecem novos contextos de formatação de bloco.

Saber como estabelecer um contexto de formatação de bloco é importante, pois, sem isso, a caixa que o contém não conterá [filhos flutuantes](https://developer.mozilla.org/en-US/docs/Web/Guide/CSS/Block_formatting_context#Make_float_content_and_alongside_content_the_same_height). Isso é semelhante ao colapso de margens, mas mais insidioso, pois você encontrará caixas inteiras colapsando de maneiras estranhas.

Um BFC é uma caixa HTML que satisfaz pelo menos uma das seguintes condições:

- O valor de `float` não é `none`.
- O valor de `position` não é `static` nem `relative`.
- O valor de `display` é `table-cell`, `table-caption`, `inline-block`, `flex`, ou `inline-flex`.
- O valor de `overflow` não é `visible`.

Em um BFC, a borda externa esquerda de cada caixa toca a borda esquerda do bloco que o contém (para formatação da direita para a esquerda, as bordas direitas se tocam).

Margens verticais entre caixas de nível de bloco adjacentes em um colapso BFC. Leia mais sobre [redução de margens](https://www.sitepoint.com/collapsing-margins/).

###### Referências

- https://developer.mozilla.org/en-US/docs/Web/Guide/CSS/Block_formatting_context
- https://www.sitepoint.com/understanding-block-formatting-contexts-in-css/

[[↑] De volta ao topo](#Índice)

### <a id="06">Quais são as várias técnicas de limpeza e quais são apropriadas para qual contexto?</a>

- `div` vazia, método - `<div style="clear: both;"></div>`.
- Método Clearfix - Consulte a classe `.clearfix` acima.
- Método `overflow: auto` ou `overflow: hidden` - O pai estabelecerá um novo contexto de formatação de bloco e se expandirá para conter seus filhos flutuados.

Em grandes projetos, eu escreveria uma classe utilitária `.clearfix` e a usaria nos lugares onde preciso. `overflow: hidden` pode cortar os filhos se os filhos forem mais altos do que os pais e não for muito ideal.

[[↑] De volta ao topo](#Índice)

### <a id="07">Explique os sprites CSS e como você os implementaria em uma página ou site.</a>

Sprites CSS combinam várias imagens em uma única imagem maior. É uma técnica comumente usada para ícones (o Gmail usa). Como implementar:

[1]Use um gerador de sprite que reúna várias imagens em uma e gere o CSS apropriado para isso. [2]Cada imagem teria uma classe CSS correspondente com propriedades de `background-image`, `background-position` e `background-size` definidas. [3]Para usar essa imagem, adicione a classe correspondente ao seu elemento.

<b>Vantagens:</b>

- Reduza o número de solicitações HTTP para várias imagens (apenas uma única solicitação é necessária por planilha). Mas com HTTP2, carregar várias imagens não é mais um problema.
- Download avançado de ativos que não serão baixados até que sejam necessários, como imagens que só aparecem em: pseudo-estados de `:hover`. Piscando não seria visto.

###### Referências

- https://css-tricks.com/css-sprites/

[[↑] De volta ao topo](#Índice)

Vamos traduzir esse conteúdo juntos para toda comunidade. Agradecemos a sua ajuda na tradução!
