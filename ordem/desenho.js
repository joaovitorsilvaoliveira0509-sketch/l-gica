/* console.log('    *')
console.log('   ***')
console.log('  *****')
console.log(' *******')
console.log('*********') */

/* const c = "*"
const sp = " "
const cont = 12

for (let i = 1; i <= cont; i+=2) {
    console.log(sp.repeat(i/2)+(c.repeat(cont-i)))
} */


const tamanho = 8
const c = '██'

for (let y = 0; y < tamanho; y++) {
    let linha = ""
    for (let x = 0; x < tamanho; x++) {
        if ((x + y) % 2 == 0) {
            linha += c
        } else {
            linha += "  "
        }
    }
    console.log(linha)
}

