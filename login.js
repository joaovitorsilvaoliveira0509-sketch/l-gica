let valor = process.argv.slice(2)

const senha = ["RAIO", "CRISTAL", "HORIZONTE", "LABIRINTO", "AURORA", "CAPIM", "MARFIM", "NEBLINA", "ESTALACTITE", "ORVALHO"]
let valida = 0

for (let i = 0; i < senha.length; i++) {
    if (valor.includes(senha[i])) {
        valida += 1
        break
    }
}

if (valida == 1) {
    console.log("Bem vindo!")
} else {
    console.log("Senha incorreta")
}