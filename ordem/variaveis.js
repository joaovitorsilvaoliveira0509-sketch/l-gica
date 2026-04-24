let a = 0
let b = 1
let c = 0
let d = 0

let cont = 0
const num = 43

while (cont < num) {
    cont++
    a = a + b
    b = c
    c = a

    d += a

    console.log("Posição:" + cont + " é = " + a)

}

console.log(`A posição de numero ${cont} equivale a: ${a} \nmédia de Fibonacci: ${d / cont} `)

//==========================================

let nA = 70
let nB = 92

let total = nA + nB

console.log("A média da nota é de: ",total / 2)

//==========================================

let nomeA = "João"
let nomeB = "Maria"

//-----------------------------------------

let nomeC = nomeA
nomeA = nomeB
nomeB = nomeC

//-----------------------------------------

console.log(`A -> ${nomeA}\nB -> ${nomeB}`) 

//=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-= 
 
console.log('👌👌👌👌👌👌👌👌👌👌👌👍👍👍') 

///////////////////////////////////////////////////

let raio = 15.0

let area = Math.PI * raio**2 ;
console.log(`Para um circulo com o raio de: ${raio}, a área é de ${area}`)

///-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/

let catA = 3
let catB = 4

let hipotenusa = Math.sqrt(catA**2 + catB**2)
console.log(`Hipotenusa: ${hipotenusa}`)