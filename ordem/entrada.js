import { caixa } from "./pratica.js"

/* console.log(process.argv[7])

console.log(process.argv.slice(2))
 */

/* const argumentos = process.argv.slice(2)

const nome = argumentos[0]

const a = Number(argumentos[0])
const b = Number(argumentos[1])

console.log(
    `
    A --> ${a}, type:${typeof a}\n
    B --> ${b}, type:${typeof b}\n
    A + B = ${a+b}
    `
)
 */

/* const argumento = process.argv[2]

const val = argumento

let media = Math.floor((500 - (val * 6))/4)

if (val <= 16){
    console.log("Aluno REPROVADO sem chance de recuperação")
}if (val >=16 && val <= 60){
    console.log(`Aluno em recuperação. Nota nescessaria:${media}`)
} else {
    console.log(`Aluno aprovado com média de ${val}`)}
 */
let argumento = process.argv[2]

console.log(caixa(argumento))