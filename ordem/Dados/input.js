const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let min = 1

function sorte(min, info) {

    info++

    let pri = Math.floor(Math.random() * (info - min) + min)
    let seg = Math.floor(Math.random() * (info - min) + min)

    let maior = Math.max(pri, seg)
    return `Primeira rolagem: ${pri}\nSegunda rolagem: ${seg}\nMelhor rolagem ${maior}`
}

rl.question('Digite o numero de lados do dado:', (val) => {
    info = val
    console.log(`Numero de lados: ${info}`)
    console.log(sorte(min, info))

    rl.close()
});

