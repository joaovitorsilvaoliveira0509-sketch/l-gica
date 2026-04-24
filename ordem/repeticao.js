/* let moeda = 0

while(moeda == 0 ){
    moeda = Math.floor(Math.random() * 2)
    console. log("Sorteio", moeda)
}
console.log("Fim")

let a = 0
let b = 1

while(true){
    let c = a
    a = a + b
    b=c
    console.log(a)
}
 */


const argumentos = process.argv.slice(2)
let txt = argumentos[0]

let cont = 0
while (cont <= txt.length) {
    console.log(txt[cont],txt.charCodeAt(cont))
    cont++
}