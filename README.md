<div align="center">
  <h2>Engenharia de Software II</h2>
  <h3>Padrões de desenvolvimento</h3>
  <h3>Bruno Beiró Rehling</h3>
  <h3>
  Link do vídeo de apresentação: 
  <a href="https://drive.google.com/file/d/1eRC5Sec9S6dfY6l6NWcYy_J-oSMKfTIU/view?usp=sharing" target="_blank">
    Assistir vídeo
  </a>
</h3>
</div>

<div align ="center">
    <h3> Padrão  escolhido - Builder</h3>
</div>
<div align ="center">
PROPÓSITO:
</div>
<h4  style="border: 1px solid rgb(49, 49, 49); border-radius: 8px; padding: 16px; margin: 10px 0; background-color: rgb(49, 49, 49)">
O Builder é um padrão de projeto criacional que permite a construção de objetos complexos passo a passo. O padrão permite a produção de diferentes tipos e representações de um objeto usando o mesmo código de construção.
</h4>
<div align ="center">
USABILIDADE:
</div>
<h4 style="border: 1px solid rgb(49, 49, 49); border-radius: 8px; padding: 16px; margin: 10px 0; background-color: rgb(49, 49, 49)">
Quando uma classe possui muitos atributos e combinações, criar um objeto assim pode resultar em muitos construtores e subclasses para as combinações dos atributos, além de gerar repetição de código.

O builder serve para que isso não ocorra, centralizando isso em uma nova classe, o Builder, fazendo com que o código fique limpo, fácil de entender e seguindo o princípio DRY.

Esse padrão organiza a construção do objeto em etapas, e apenas as etapas necessárias são chamadas para formar o objeto final — ou seja, não é preciso usar todas elas obrigatoriamente.
</h4>

#### Exemplo de código sem builder:

```ts
class Computador{
    ram: number;
    armazenamento: number;
    processador: string;
    placaVideo?: string;

    constructor (ram: number, armazenamento: number, processador: string, placaVideo: string,){
        this.ram = ram;
        this.armazenamento = armazenamento;
        this.processador = processador;
        this.placaVideo = placaVideo;
    }
}



function montarComputador() {
    const Ram = Number(prompt("Digite a memória RAM: "))
    const Armazenamento = Number(prompt("Digite o Armazenamento: "))
    const Processador = prompt("Digite o processador: ")
    const PlacaVideo = prompt("Digite a Placa de Video: ")

    if (isNaN(Ram) || isNaN(Armazenamento) || !Processador){
        throw new Error("Entrada inválida");
    }

    const montar_pc = new Computador(Ram, Armazenamento, Processador, PlacaVideo)
    console.log(montar_pc)
}

montarComputador()
```

#### Implementação do builder no código
```ts
interface ComputadorBuilder {
  setRam(ram: number): this;
  setArmazenamento(armazenamento: number): this;
  setProcessador(processador: string): this;
  setPlacaVideo(placaVideo: string): this;
  construir(): Computador;
}


class ComputadorBuilderConcreto implements ComputadorBuilder {
  private computador: Computador = new Computador();

  setRam(ram: number): this {
    this.computador.ram = ram;
    return this;
  }

  setArmazenamento(armazenamento: number): this {
    this.computador.armazenamento = armazenamento;
    return this;
  }

  setProcessador(processador: string): this {
    this.computador.processador = processador;
    return this;
  }

  setPlacaVideo(placaVideo: string): this {
    this.computador.placaVideo = placaVideo;
    return this;
  }

  construir(): Computador {
    const resultado = this.computador;
    this.computador = new Computador();
    return resultado;
  }
}

```
<div align ="center">
DIRETOR: 
</div>
<h4 style="border: 1px solid rgb(49, 49, 49); border-radius: 8px; padding: 16px; margin: 10px 0; background-color: rgb(49, 49, 49)">
É possível criar uma classe chamada Diretor, ela define a ordem em que as etapas do Builder serão executadas.

Não é obrigatório, você pode chamar as etapas do builder direto no código, porém o diretor ajuda no reaproveitamento das construções mais comuns em vários lugares do sistema.

Outra vantagem é que o cliente não precisa saber como o produto é montado. Ele só precisa passar um builder para o diretor, mandar construir, e depois pegar o resultado com o próprio builder.
</h4>

#### Código do diretor

```ts
class Diretor {
  private builder: ComputadorBuilder;

  constructor(builder: ComputadorBuilder) {
    this.builder = builder
  }

  montarComputadorBasico(ram: number, armazenamento: number, processador: string) {
    this.builder
      .setRam(ram)
      .setArmazenamento(armazenamento)
      .setProcessador(processador)
  }

  montarComputadorCompleto(ram: number, armazenamento: number, processador: string, placaVideo: string) {
    this.builder
      .setRam(ram)
      .setArmazenamento(armazenamento)
      .setProcessador(processador)
      .setPlacaVideo(placaVideo)
  }
}

```
#### Chamada do diretor na função

```ts
function montarComputador() {
  const builder = new ComputadorBuilderConcreto()
  const diretor = new Diretor(builder)

  const ram = Number(prompt("Digite a memória RAM (GB): "))
  const armazenamento = Number(prompt("Digite o armazenamento (GB): "))
  const processador = prompt("Digite o processador: ")
  const placaVideo = prompt("Digite a placa de vídeo (opcional): ")

  if (isNaN(ram) || isNaN(armazenamento) || !processador) {
    throw new Error("Entrada inválida")
  }

  if (placaVideo) {
    diretor.montarComputadorCompleto(ram, armazenamento, processador, placaVideo)
  } else {
    diretor.montarComputadorBasico(ram, armazenamento, processador)
  }

  const pc = builder.construir()
  pc.mostrar()
}

montarComputador()
```

<div align ="center">
VANTAGENS:
</div>
<h4 style="border: 1px solid rgb(49, 49, 49); border-radius: 8px; padding: 16px; margin: 10px 0; background-color: rgb(49, 49, 49)">
✅ Possibilidade de construir objetos passo a passo, adiar as etapas de construção ou rodar etapas recursivamente.
<hr>
✅ Possibilidade de reutilizar o mesmo código de construção quando construindo várias representações de produtos.
<hr>
✅ Princípio de responsabilidade única. Você pode isolar um código de construção complexo da lógica de negócio do produto.
</h4>
<div align ="center">
DESVANTAGENS:
</div>
<h4 style="border: 1px solid rgb(49, 49, 49); border-radius: 8px; padding: 16px; margin: 10px 0; background-color:rgb(49, 49, 49)">
❌ A complexidade geral do código aumenta uma vez que o padrão exige criar múltiplas classes novas.
</h4>
<div align="center">
CONCLUSÃO
</div>
<h4 style="border: 1px solid rgb(49, 49, 49); border-radius: 8px; padding: 16px; margin: 10px 0; background-color:rgb(49, 49, 49)">
 O Builder é um padrão de desenvolvimento ideal para lidar com classes com muitos atributos. Embora torne o código um pouco mais trabalhoso de escrever, acaba compensando em projetos maiores.
</h4>