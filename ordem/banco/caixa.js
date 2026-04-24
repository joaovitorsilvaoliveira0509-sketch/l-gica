export function caixa(val) {
    
    let val
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
}