Segurança
==

## Glossário

- **CORS** - Compartilhamento de recursos de Cross-Origin (CORS).
- **CSRF** - O Cross-Site falsificação de solicitação (CSRF) é um ataque que obriga um utilizador final a executar ações indesejadas num aplicativo web no qual eles estão atualmente autenticados.
- **XSS** - Cross-site scripting (XSS).

## CORS

A política da mesma origem protege os utilizadores ao proibir sites para recuperar informações de outros sites de diferentes origens. Uma origem é o triple {protocolo, host, porta}. Dois recursos são considerados da mesma origem se e somente se todos estes valores forem exatamente iguais.

O Compartilhamento de Recursos Cross-Origin permite relaxar da mesma política de origem. O CORS define uma forma pela qual um navegador e servidor podem interagir para determinar se é ou não seguro permitir a solicitação de cross-origin.

Este padrão estende o HTTP com um novo cabeçalho de solicitação `Origin` e cabeçalhos de resposta `Access-Control-Allow-Origin` e `Access-Control-Allow-Methods`. Ele permite que os servidores usem um cabeçalho para listar explicitamente as origens e métodos HTTP que podem solicitar um arquivo ou usar um fator imprevísivel e permitir que um arquivo seja solicitado por qualquer site. `XMLHttpRequest`s para uma origem de destino de uma fonte de origem diferente será bloqueado se o servidor não permitisse o CORS para fonte origem.

## CSRF

As vulnerabilidades XSS permitem que os atacantes ignorem essencialmente todas as prevenções CSRF.

#### Protecão

- Verificando a Mesma Origem com Cabeçalhos Padrão
   - Há duas etapas para esta verificação:
     1. Determinar a origem da solicitação que vem de (fonte de origem).
     2. Determinar a origem para onde solicitação está a ir (origem do alvo).
   - Examina os valores de de Cabeçalho de `Origem`, `Referente` e `Host`.
- Tokens do sincronizador
   - O token CSRF é adicionado como um campo oculto para formulários ou dentro da URL.
   - Características de um token CSRF
     - Única por sessão de utilizador
     - Grande valor aleatório
     - Gerado por um gerador de números aleatórios criptograficamente seguro
   - O servidor rejeita a ação solicitada se o token CSRF falhar na validação.
- Cookie duplo
  - Quando um utilizador visita um site, o site deve gerar um valor pseudo-aleatório (criptograficamente forte) e configurá-lo como um cookie na máquina do utilizador. O site deve exigir cada submissão de formulário para incluir este valor de pseudo-aleatório como um valor de formulário e também como um valor de cookie. Quando um pedido de POST é enviado para o site, o pedido deve ser considerado válido se o valor do formulário e o valor do cookie forem iguais. Quando um atacante envia um formulário em nome de um utilizador, ele só pode modificar os valores do formulário. Um invasor não pode ler nenhum dado enviado do servidor ou modificar valores de cookies, de acordo com a mesma política de origem. Isto significa que, enquanto um atacante pode enviar qualquer valor que quiser com o formulário, ele não poderá modificar ou ler o valor armazenado no cookie. Uma vez que o valor do cookie e o valor do formulário devem ser iguais, o invasor não poderá enviar um formulário com sucesso, a menos que ele seja capaz de adivinhar o valor do pseudo-aleatório.
   - A vantagem desta abordagem é que ela não requer nenhum estado do servidor; tu simplesmente ajustas o valor da cookie uma vez, então cada HTTP POST verifica se um dos valores enviados <input> contém exatamente o mesmo valor da cookie. Qualquer diferença entre os dois significa um possível ataque XSRF.
  - Token de Cookie-to-Header
  - No login, o aplicativo da Web configura um cookie contendo um token aleatório que permanece o mesmo para toda a sessão do utilizador
  - `Set-Cookie: Csrf-token=i8XNjC4b8KVok4uw5RftR38Wgp2BFwql; expira=Thu, 23-Jul-2015 10:25:33 GMT; Max-Age=31449600; Path=/`
  - O JavaScript que opera no lado do cliente lê o teu valor e o copia para um cabeçalho HTTP personalizado enviado com cada solicitação transacional
  - `X-Csrf-Token: i8XNjC4b8KVok4uw5RftR38Wgp2BFwql`
  - O servidor valida a presença e integridade do token.
  - A segurança desta técnica baseia-se no pressuposto de que apenas o JavaScript esteja a executar dentro da mesma origem poderá ler o valor da cookie.
  - JavaScript a executar a partir de um arquivo rogue ou e-mail não será capaz de lê-lo e copiar para o cabeçalho personalizado. Mesmo que a cookie `csrf-token` seja automaticamente enviado com o pedido rogue, o servidor ainda estará à espera dum cabeçalho válido do `X-Csrf-Token`.
- Uso de Cabeçalhos de Solicitação Personalizados
  - Uma defesa alternativa que é particularmente adequada para os pontos de extremidade AJAX é o uso de um cabeçalho de solicitação personalizado. Esta defesa baseia-se na restrição de política de origem (SOP) que apenas o JavaScript pode ser usado para adicionar um cabeçalho personalizado e somente dentro da sua origem. Por padrão, os navegadores não permitem que o JavaScript faça solicitações de origem cruzada. Este cabeçalho pode ser `X-Requested-With: XMLHttpRequest`.
  - Se for este o caso para o teu sistema, podes simplesmente verificar a presença deste cabeçalho e valor em todos os teus pontos de extremidade AJAX do lado do servidor para proteger contra ataques CSRF. Esta abordagem tem a dupla vantagem de não exigir alterações de UI e não introduzir qualquer estado do lado do servidor, o que é particularmente atraente para os serviços REST. Podes sempre adicionar o teu próprio cabeçalho e valor personalizado se isso for preferido.
- Requer interação do utilizador
  - Requer uma re-autenticação, usando um token de uma vez, ou exigindo que os utilizadores completem um captcha.

###### Referências

- [OWASP CSRF](https://www.owasp.org/index.php/Cross-Site_Request_Forgery_(CSRF))

## HTTPS

HTTPS é HTTP sobre SSL/TLS. Os servidores e clientes ainda falam exatamente o mesmo HTTP entre si, mas numa conexão SSL segura que criptografa e descriptografa os teus pedidos e respostas. A camada SSL tem 2 objetivos principais:

1. A verificar que estás a falar diretamente com o servidor que tu achas que estás a falar com.
1. Garantir que apenas o servidor possa ler o que tu envias e só tu podes ler o que ele envia de volta.
 
#### TLS Handshake

// TODO. Crosscheck e adiciona mais detalhes.

1. O computador do cliente envia uma mensagem `ClientHello` para o servidor com a tua versão Transport Layer Security (TLS), lista de algoritmos de cifra e métodos de compressão disponíveis.
1. O servidor responde com uma mensagem `ServerHello` para o cliente com a versão TLS, a cifra selecionada, métodos de compactação selecionados e o certificado público do servidor assinado por uma autoridade de certificação (Certificate Authority). O certificado contém uma chave pública que será usada pelo cliente para criptografar o resto do handshake até que uma chave simétrica possa ser acordada.
1. O cliente verifica o certificado digital do servidor em relação à sua lista de CA confiáveis. Se a confiança pode ser estabelecida com base na CA, o cliente gera uma série de bytes pseudo-aleatórios e criptografa isto com a chave pública do servidor. Estes bytes aleatórios podem ser usados para determinar a chave simétrica.
1. O servidor desencripta os bytes aleatórios usando a tua chave privada e usa estes bytes para gerar a tua própria cópia da chave mestre simétrica.
1. O cliente envia uma mensagem `Terminada` para o servidor, criptografando um hash da transmissão até este ponto com a tecla simétrica.
1. O servidor gera o teu próprio hash e de seguida, descriptografa o hash enviado pelo cliente para verificar se ele corresponde. Se o fizer, ele envia a tua própria mensagem `Terminada` para o cliente, também criptografada com a chave simétrica.
1. A partir de agora, a sessão TLS transmite os dados do aplicativo (HTTP) criptografados com a chave simétrica acordada.

#### Desvantagens de HTTPS

- TLS handshake computacional e latência sobrecarga.
- A Criptografia e descriptografia requer mais potência de computação e largura de banda.

###### Referências

- https://blog.hartleybrody.com/https-certificates/
- https://github.com/alex/what-happens-when#tls-handshake
- http://robertheaton.com/2014/03/27/how-does-https-actually-work/

## XSS

As vulnerabilidades XSS permitem que os atacantes ignorem essencialmente todas as prevenções CSRF.

```js
const name = "<img src='x' onerror='alert(1)'>";
el.innerHTML = name;
```

http://shebang.brandonmintern.com/foolproof-html-escaping-in-javascript/

## Sequestro de sessão

- https://developer.mozilla.org/en-US/docs/Web/HTTP/Cookies
- https://www.nczonline.net/blog/2009/05/12/cookies-and-security/


## Framebusting

https://seclab.stanford.edu/websec/framebusting/framebust.pdf

## API

https://github.com/shieldfy/API-Security-Checklist
