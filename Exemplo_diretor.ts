import promptSync from "prompt-sync"
const prompt = promptSync()

class Computador {
  private ram?: number
  private armazenamento?: number
  private processador?: string
  private placaVideo?: string

  setRam(ram: number): void {
    this.ram = ram
  }

  setArmazenamento(armazenamento: number): void {
    this.armazenamento = armazenamento
  }

  setProcessador(processador: string): void {
    this.processador = processador
  }

  setPlacaVideo(placaVideo: string): void {
    this.placaVideo = placaVideo
  }

  getRam(): number | undefined {
    return this.ram
  }

  getArmazenamento(): number | undefined {
    return this.armazenamento
  }

  getProcessador(): string | undefined {
    return this.processador
  }

  getPlacaVideo(): string | undefined {
    return this.placaVideo
  }

  mostrar(): void {
    console.log({
      ram: this.ram,
      armazenamento: this.armazenamento,
      processador: this.processador,
      placaVideo: this.placaVideo,
    })
  }
}

interface ComputadorBuilder {
  setRam(ram: number): this
  setArmazenamento(armazenamento: number): this
  setProcessador(processador: string): this
  setPlacaVideo(placaVideo: string): this
  construir(): Computador
}


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

class ComputadorBuilderConcreto implements ComputadorBuilder {
  private computador: Computador = new Computador()

  setRam(ram: number): this {
    this.computador.setRam(ram)
    return this
  }

  setArmazenamento(armazenamento: number): this {
    this.computador.setArmazenamento(armazenamento)
    return this
  }

  setProcessador(processador: string): this {
    this.computador.setProcessador(processador)
    return this
  }

  setPlacaVideo(placaVideo: string): this {
    this.computador.setPlacaVideo(placaVideo)
    return this
  }

  construir(): Computador {
    const resultado = this.computador
    this.computador = new Computador()
    return resultado
  }
}


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
