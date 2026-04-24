/* 

OPERADORES BIT A BIT 

<< Deslocamento à esquerda
>> Deslocamento à direita 
>>> Deslocamento à direita (sem sinal)
& Bit And
| Bit Or
~ Bit Not 
^ Xor

let n = 7

n.toString(2)

n.toString(2).padStart(32,"0")

let cor = 0xFF11CC

*/

/* const { cp } = require("node:fs")

let cor = 0x724dab

console.log("RGB:", cor, cor.toString(2).padStart(8, "0"))

let R = (cor >> 16) & 0xFF
let G = (cor >> 8) & 0xFF
let B = cor & 0xFF

console.log("Desempacotado:")
console.log("R:", R, R.toString(2).padStart(8, "0"))
console.log("G:", G, G.toString(2).padStart(8, "0"))
console.log("B:", B, B.toString(2).padStart(8, "0"))

let pack = B | (G << 8) | (R << 16)

console.log("PAK:", pack, pack.toString(2).padStart(8, "0"), pack.toString(16).padStart(8, "0"))

let M = Math.floor((R+G+B)/3)

console.log("Preto e Branco:", M) */

console.log("____________________________________\nSEGREDO:")


const mensagem = "Receita de vó"
const segredo  = "vnlakbvanbkas"
let resultado = " "

for (let i = 0; i < mensagem; i++) {
    const codigo = mensagem.charCodeAt(i);
    const codigosegredo = segredo.charCodeAt(i) 
    const cifra = codigo ^ codigosegredo;
    resultado += String.fromCharCode(cifra)
    
}

console.log(JSON.stringify(resultado))

const newmensagem = resultado

for (let i = 0; i < newmensagem; i++) {
    const codigo = newmensagem.charCodeAt(i);
    const codigosegredo = segredo.charCodeAt(i) 
    const cifra = codigo ^ codigosegredo;
    resultado += String.fromCharCode(cifra)
}

console.log(JSON.stringify(resultado))