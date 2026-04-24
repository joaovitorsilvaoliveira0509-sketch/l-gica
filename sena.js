const prompt = require('prompt-sync')({ sigint: true })

let numers = []
for (let i = 0; i < 6; i++) {
    let num = parseInt(prompt(`Digite o seu ${i + 1}º numero:`))
    numers.push(num)
}

let sorteio = []
let cont = 0
let acerto = []
for (let i = 0; i < 6; i++) {
    let sor = Math.floor(Math.random() * 60) + 1
    if (!sorteio.includes(sor)) {
        sorteio.push(sor)
    } else {
        i--
    }

    if (numers.includes(sor)) {
        cont++
        acerto.push(sor)
    }
}

const valida = numers.every(i => sorteio.includes(i))

if (valida == true) {
    console.log("Vc ganhou na MEGA")
} else {
    console.log("Vc perdeu ")
}

console.log(`Numero de acertos ${cont}\nNumero(s) acertados: ${acerto}\n\nTABELA VERDADE\n\nNumeros inseridos: ${numers}\nNumeros sorteados: ${sorteio}`)