let data = process.argv.slice(2)

let dia = parseInt(data[0])
let mes = parseInt(data[1])
let ano = parseInt(data[2])

const bissexto = (ano % 4 == 0 && ano % 100 !== 0) || (ano % 400 === 0)

if (mes < 1 || mes > 12) {
    console.log(`Data inválida: O mês deve ser um valor entre 1 e 12.`)
} else if (dia < 1 || dia > 31) {
    console.log(`Data inválida: O dia deve ser um valor entre 1 e 31.`)
} else if ((mes === 4 || mes === 6 || mes === 9 || mes === 11) && dia > 30) {
    console.log(`Data inválida: O mês selecionado tem no máximo 30 dias.`)
} else if (mes === 2) {
    if (bissexto && dia > 29) {
        console.log('Data inválida: Fevereiro no ano de ' , ano , ' tem no máximo 29 dias.');
    } else if (!bissexto && dia > 28) {
        console.log('Data inválida: Fevereiro no ano de ' , ano , 'tem no máximo 28 dias.');
    }
} else { 
    console.log("Data válida.");
}