import promptSync from "prompt-sync";
const prompt = promptSync();

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