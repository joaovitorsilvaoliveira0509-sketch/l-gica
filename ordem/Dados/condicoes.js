const argumentos = process.argv.slice(2)

const nome = argumentos[0]
const sobre = argumentos[1]

if (nome == undefined || sobre == undefined) {
    console.log("Você deve informar um nome/sobre nome válido!!")
} else {
    console.log(`Olá, ${nome + " " + sobre}`)
}

if (nome != undefined & sobre != undefined) {
    console.log(`Olá, ${nome + " " + sobre}`)
} else {
    console.log("Você deve informar um nome/sobre nome válido!!")
}

// Importa o módulo readline do Node.js
const readline = require('readline');

// Cria a interface para ler e escrever no terminal
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Solicita entrada do usuário
rl.question('Digite seu nome: ', (nome) => {
  // Validação simples
  if (!nome.trim()) {
    console.log('Você não digitou um nome válido.');
  } else {
    console.log(`Olá, ${nome}!`);
  }

  // Fecha a interface
  rl.close();
});
