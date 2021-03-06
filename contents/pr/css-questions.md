---
title: Perguntas de CSS
---

Respostas às <a href="https://github.com/h5bp/Front-end-Developer-Interview-Questions/blob/master/src/questions/css-questions.md" id="top">Perguntas da Entrevista de Trabalho de Front-end - Questões CSS</a>. Pull requests para sugestões e correções são bem-vindos!

## Tabela de Conteúdos
- <a href="#01">O que é a especificidade do seletor CSS e como funciona?</a>
- <a href="#02">Qual é a diferença entre "redefinir"/"resetting" e "normalizar"/"normalizing" o CSS? Qual você escolheria e porquê?</a>
- <a href="#03">Descreva ```float``` e como eles funcionam.</a>


### <p id="01">O que é a especificidade do seletor CSS e como funciona?<p>
O navegador determina quais estilos mostrar em um elemento, dependendo da especificidade das regras CSS. Presumimos que o navegador já determinou as regras que correspondem a um elemento específico. Entre as regras de correspondência, a especificidade, quatro valores separados por vírgulas, ```a, b, c, d``` são calculados para cada regra com base no seguinte:

1. ```a``` é se estilos embutidos estão sendo usados. Se a declaração da propriedade for um estilo embutido no elemento, ```a``` é 1, caso contrário, 0.
2. ```b``` é o número de seletores de ID.
3. ```c``` é o número de classes, atributos e seletores de pseudo-classes.
4. ```d``` é o número de tags e seletores de pseudo-elementos.

A especificidade resultante não é uma pontuação, mas uma matriz de valores que podem ser comparados coluna por coluna. Ao comparar seletores para determinar qual tem a especificidade mais alta, olhe da esquerda para a direita e compare o valor mais alto em cada coluna. Portanto, um valor na coluna ```b``` substituirá os valores nas colunas ```c e d```, não importa quais sejam. Como tal, a especificidade de ```0,1,0,0``` seria maior do que ```0,0,10,10```.

Nos casos de especificidade igual: a regra mais recente é a que conta. Se você escreveu a mesma regra em sua folha de estilo (independentemente de interna ou externa) duas vezes, então a regra inferior em sua folha de estilo está mais próxima do elemento a ser estilizado, é considerada mais específica e, portanto, será aplicada.

Eu escreveria regras CSS com baixa especificidade para que possam ser facilmente substituídas, se necessário. Ao escrever código de biblioteca de componente de UI CSS, é importante que eles tenham especificidades baixas para que os usuários da biblioteca possam substituí-los sem usar regras CSS muito complicadas apenas para aumentar a especificidade ou recorrer a ```!important```.

Referências
- https://www.smashingmagazine.com/2007/07/css-specificity-things-you-should-know/
- https://www.sitepoint.com/web-foundations/specificity/

<a href="#top">[↑]Volte para o topo</a>

### <p id="02">Qual é a diferença entre "redefinir"/"resetting" e "normalizar"/"normalizing" o CSS? Qual você escolheria e porquê?<p>
- <b>Redefinir</b> - Redefinir visa eliminar todos os estilos padrão do navegador nos elementos. Por exemplo: ```margins, paddings, font-size``` são todos redefinidos. Você terá que redeclarar o estilo dos elementos tipográficos comuns.
- <b>Normalizar</b> - A normalização preserva estilos padrão úteis em vez de "desestilizar" tudo. Ele também corrige bugs para dependências comuns do navegador.

Eu escolheria redefinir quando tenho um design de site muito personalizado ou não convencional, de modo que preciso fazer muito do meu próprio estilo e não preciso que nenhum estilo padrão seja preservado.

Referências
- https://stackoverflow.com/questions/6887336/what-is-the-difference-between-normalize-css-and-reset-css

<a href="#top">[↑]Volte para o topo</a>

### <p id="03">Descreva ```float``` e como eles funcionam.</a>
Float é uma propriedade de posicionamento CSS. Os elementos flutuantes permanecem como parte do fluxo da página e afetarão o posicionamento de outros elementos (por exemplo, o texto fluirá em torno dos elementos flutuantes), ao contrário dos elementos ```position: absolute```, que são removidos do fluxo da página.

A propriedade CSS ```clear``` pode ser usada para ser posicionada abaixo de ```left```/```right```/```both``` elementos flutuantes.

Se um elemento pai não contém nada além de elementos flutuantes, sua altura será reduzida a nada. Pode ser consertado limpando o flutuador após os elementos flutuantes no contêiner, mas antes do fechamento do contêiner.

O hack ```.clearfix``` usa um pseudo-seletor CSS inteligente (```: after```) para limpar os floats. Em vez de definir o overflow no pai, você aplica uma classe adicional ```clearfix``` a ele. Em seguida, aplique este CSS:

```
.clearfix:after {
    content: ' ';
    visibility: hidden;
    display: block;
    height: 0;
    clear: both;
}
```

Como alternativa, atribua a propriedade ```overflow: auto``` ou ```overflow: hidden``` ao elemento pai, que estabelecerá um novo contexto de formatação de bloco dentro dos filhos e se expandirá para conter seus filhos.

Referências
- https://css-tricks.com/all-about-floats/

Vamos traduzir esse conteúdo juntos para toda comunidade. Agradecemos a sua ajuda na tradução!
