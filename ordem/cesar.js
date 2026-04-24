const frase = process.argv[2].toUpperCase()
const senha = parseInt(process.argv[3])

console.log(frase)

for (let i = 0; i <= frase.length; i++){
    let posi = frase.charCodeAt(i + senha)

    console.log(posi)
    
}   

let email = "joaovitorsilvaoliviera0509@gmail.com"

let partes = email.split("@")

if (partes.length !=2 || partes[0].length == 0 || partes[1].length == 0 ){
    console.error("Email inválido")
    process.exit(1)
}

console.log("Email válido")
