/* let frutas = ['amora', 'uva', 'berinjela', 'tomate']

console.log('Array:', frutas)
console.log('tamanho:', frutas.length)
console.log('primeiro:', frutas[0])
console.log('ultimo:', frutas[frutas.length - 1])

console.log('\nLista:\n')
for (let fruta of frutas) {
    console.log(fruta)
} */

let temperaturas = [23, 23, 22, 22, 26, 28, 27, 23, -26, -5, -12]

let a = 0
let b = temperaturas[0]
let c = temperaturas[0]

for (temp of temperaturas) {
    a += temp
    if (temp > b) {
        b = temp
    }
    if (temp < c) {
        c = temp
    }
}

console.log("Soma:", a)
console.log("Maior:", b)
console.log("Menor:", c)
console.log("Média", a / temperaturas.length)