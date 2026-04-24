const fs = require("fs");
const path = require("path");

// Lê o arquivo e divide em linhas (baixado de https://www.gutenberg.org/ebooks/results/)
const nomeArquivo = "casmurro.txt";
const conteudo = fs.readFileSync(path.join(__dirname, nomeArquivo), "utf-8");
const linhas = conteudo.split(/\r?\n/);

console.log("Nº de linhas:", linhas.length);
console.log("Primeira linha:",linhas[0]);
console.log("")

let cont = 0
let branco = 0
// Atravessar cada linha uma por uma:
for(let linha of linhas) {
    // Fazer algo com cada linha
    linha =  linha.toUpperCase()
    linha = linha.replaceAll("."," ")
    linha = linha.replaceAll("_"," ")
    linha = linha.replaceAll(","," ")
    linha = linha.replaceAll(";"," ")
    linha = linha.replaceAll(":"," ")
    linha = linha.replaceAll("?"," ")
    linha = linha.replaceAll("!"," ")
    let palavras = linha.split(" ")
    for (let palavra of palavras){
        if (palavra == "PADRE"){
            console.log(linha)
            cont++
        }
        if (linha.trim().length == 0){
            branco++
        }
    }

}

console.log(`Foram encontrados ${cont} 
    `)
