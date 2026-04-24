/* const readline = require('readline')

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

let forca = 0

const numeros = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"]

const simbolos = ["!", "@", "#", "$", "%", "^", "&", "*", "(", ")", "-", "_", "=", "+", "[", "]", "{", "}", ";", ":", "'", "\"", ",", ".",
    "<", ">", "/", "?", "\\", "|", "~", "`", "§", "©", "®", "™", "✓", "★", "♥", "♦", "♣", "♠", "♪", "♫", "∞", "≠", "≈", "±", "÷", "×"];

function valida(senha) {
    if (senha.length < 10) {
        return (`Sua senha é muito fraca, precisa de no mínimo 10 caracteres!\nAdicione mais ${10 - senha.length}`)
    } else if (senha === senha.toLowerCase()) {
        return ("Sua senha é fraca, falta letras MAIÚSCULAS")
    } else if (senha === senha.toUpperCase()) {
        return ("Sua senha é fraca, falta letras minúsculas")
    } else if (!simbolos.some(simbolo => senha.includes(simbolo))) {
        return ("Senha fraca, precisa conter pelo menos um símbolo")
    } else if (!numeros.some(num => senha.includes(num))) {
        return ("Senha fraca, precisa conter ao menos um número")
    }

}

function pontuacao(forca, senha) {

    if (senha.length >= 10) { forca++ }
    if (senha !== senha.toLowerCase()) { forca++ }
    if (senha !== senha.toUpperCase()) { forca++ }
    if (simbolos.some(simbolo => senha.includes(simbolo))) { forca++ }
    if (numeros.some(num => senha.includes(num))) { forca++ }

    forca = forca * senha.length

    if (senha.length > 50) {
        return (`Sua senha é muito ruim`)
    } else if (forca >= 50 && forca <= 70) {
        return (`Sua senha é aceitável\nPontuação: ${forca}`)
    } else if (forca >= 71 && forca <= 100) {
        return (`Sua senha é muito boa\nPontuação: ${forca}`)
    } else if (forca >= 101 && forca <= 150) {
        return (`Meus parabéns, sua senha é extraordinária\nPontuação: ${forca}`)
    } else if (forca > 151) {
        return (`Cara...melhor anotar essa senha...\nPontuação: ${forca}`)
    }

}

rl.question("Digite a sua senha para a validação\nSenha: ", (senha) => {
    console.log(valida(senha))
    console.log(pontuacao(forca,senha))
    rl.close()
})
 */

let ano = 2016;
let mes = 2

/* if (mes = 2 && ano >= 400) {
    ano % 400
    if (ano % 4 !== 0) {
        console.log("Seu ano não é bissexto")
    } else if (ano < 400 && ano > 0) {
        console.log("Seu ano é bissexto")
    }
}
 */

if (mes == 2 && (ano % 400 === 0 || ano % 4 === 0 || ano % 100 !== 0)){
    console.log('Seu ano é bissexto')
} else { 
    console.log('Seu ano não é bissexto')
}