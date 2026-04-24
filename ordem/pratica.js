let massa = 110
let alt = 1.81

console.log("____________________________________________")

console.log(`IMC:${massa / (alt ** 2)}`)

//------------------------------------------------------------

let md = 43
let ef = Math.floor((500 - (md * 6)) / 4) + 1

console.log("____________________________________________")

if (md < 60) {
    console.log(`Aluno de recuperação com nota necessaria:${ef}`)
} else {
    console.log("Aluno aprovado ")
}

//_______________________________________________________________

let val

export function caixa(val) {
    let cont = 0


    console.log("____________________________________________")

    if (val >= 100) {
        while (val >= 100) {
            val -= 100
            cont++
        }
        console.log(`${cont} nota(s) de R$ 100,00`)
        cont = 0
    } if (val >= 50) {
        while (val >= 50) {
            val -= 50
            cont++
        }
        console.log(`${cont} nota(s) de R$ 50,00`)
        cont = 0
    } if (val >= 20) {
        while (val >= 20) {
            val -= 20
            cont++
        }
        console.log(`${cont} nota(s) de R$ 20,00`)
        cont = 0
    } if (val >= 10) {
        while (val >= 10) {
            val -= 10
            cont++
        }
        console.log(`${cont} nota(s) de R$ 10,00`)
        cont = 0
    } if (val >= 5) {
        while (val >= 5) {
            val -= 5
            cont++
        }
        console.log(`${cont} nota(s) de R$ 5,00`)
        cont = 0
    } if (val >= 2) {
        while (val >= 2) {
            val -= 2
            cont++
        }
        console.log(`${cont} nota(s) de R$ 2,00`)
        cont = 0
    } if (val >= 1) {
        while (val >= 1) {
            val -= 1
            cont++
        }
        console.log(`${cont} nota(s) de R$ 1,00`)
        cont = 0
    }

}

val = nota

console.log("____________________________________________")

console.log(`${Math.floor(val / 100)} nota(s) de 100`)
val %= 100
console.log(`${Math.floor(val / 50)} nota(s) de 50`)
val %= 50
console.log(`${Math.floor(val / 20)} nota(s) de 20`)
val %= 20
console.log(`${Math.floor(val / 10)} nota(s) de 10`)
val %= 10
console.log(`${Math.floor(val / 5)} nota(s) de 5`)
val %= 5
console.log(`${Math.floor(val / 2)} nota(s) de 2`)
val %= 2
console.log(`${Math.floor(val / 1)} nota(s) de 1`)

val = nota

console.log("____________________________________________")

for (val; val > 100; val -= 100) {
    cont++
}
console.log(`${cont} nota(s) de R$100.00`)
cont = 0
for (val; val > 50; val -= 50) {
    cont++
}
console.log(`${cont} nota(s) de R$50.00`)
cont = 0
for (val; val > 20; val -= 20) {
    cont++
}
console.log(`${cont} nota(s) de R$20.00`)
cont = 0
for (val; val > 10; val -= 10) {
    cont++
}
console.log(`${cont} nota(s) de R$10.00`)
cont = 0
for (val; val > 5; val -= 5) {
    cont++
}
console.log(`${cont} nota(s) de R$5.00`)
cont = 0
for (val; val > 2; val -= 2) {
    cont++
}
console.log(`${cont} nota(s) de R$2.00`)
cont = 0
for (val; val > 100; val -= 100) {
    cont++
}
console.log(`${cont} nota(s) de R$1.00`)
cont = 0
