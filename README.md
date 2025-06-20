<div align="center">
  <h2>Engenharia de Software II</h2>
  <h3>Padrões de desenvolvimento</h3>
  <h3>Bruno Beiró Rehling</h3>
</div>

<div align ="center">
    <h3> Padrão  escolhido - Builder </h3>
</div>
<div align ="center">
PROPÓSITO:
</div>
<h4>
O Builder é um padrão de projeto criacional que permite a construção de objetos complexos passo a passo. O padrão permite a produção de diferentes tipos e representações de um objeto usando o mesmo código de construção.
</h4>
<div align ="center">
USABILIDADE:
</div>
<h4>
Quando uma classe possui muitos atributos e combinações, criar um objeto assim pode resultar em muitos construtores e subclasses para as combinações dos atributos, além de gerar repetição de código.

O builder serve para que isso não ocorra, centralizando isso em uma nova classe, o Builder, fazendo com que o código fique limpo, fácil de entender e seguindo o princípio DRY(Dont Repeat Yourself).

Esse padrão organiza a construção do objeto em etapas, e apenas as etapas necessárias são chamadas para formar o objeto final — ou seja, não é preciso usar todas elas obrigatoriamente.
</h4>
<div align ="center">
DIRETOR: 
</div>
<h4>
É possível criar uma classe chamada Diretor, ela define a ordem em que as etapas do Builder serão executadas.

Não é obrigatório, você pode chamar as etapas do builder direto no código, porém o diretor ajuda no reaproveitamento das construções mais comuns em vários lugares do sistema.

Outra vantagem é que o cliente não precisa saber como o produto é montado. Ele só precisa passar um builder para o diretor, mandar construir, e depois pegar o resultado com o próprio builder.
</h4>
<div align ="center">
VANTAGENS:
</div>
<h4>
Você pode construir objetos passo a passo, adiar as etapas de construção ou rodar etapas recursivamente.

Você pode reutilizar o mesmo código de construção quando construindo várias representações de produtos.

Princípio de responsabilidade única. Você pode isolar um código de construção complexo da lógica de negócio do produto.
</h4>
<div align ="center">
DESVANTAGENS:
</div>
<h4>
 A complexidade geral do código aumenta uma vez que o padrão exige criar múltiplas classes novas.
 </h4>