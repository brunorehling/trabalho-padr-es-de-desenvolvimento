import promptSync from "prompt-sync";
const prompt = promptSync();

class Computador{
    ram?: number;
    armazenamento?: number;
    processador?: string;
    placaVideo?: string;

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
    const result = this.computador;
    this.computador = new Computador();
    return result;
  }
}


function montarComputador() {
  const builder = new ComputadorBuilderConcreto();

  const ram = Number(prompt("Digite a memória RAM (GB): "));
  const armazenamento = Number(prompt("Digite o armazenamento (GB): "));
  const processador = prompt("Digite o processador: ");
  const placaVideo = prompt("Digite a placa de vídeo (opcional): ");

  if (isNaN(ram) || isNaN(armazenamento) || !processador) {
    throw new Error("Entrada inválida");
  }

  builder.setRam(ram).setArmazenamento(armazenamento).setProcessador(processador);

  if (placaVideo) {
    builder.setPlacaVideo(placaVideo);
  }

  const pc = builder.construir();
  pc.mostrar();
}

montarComputador();