import { createInterface } from 'node:readline/promises';

const term = createInterface({
    input: process.stdin,
    output: process.stdout
});

const produtos = [
    ["001", "Arroz", 2, 10.00],
    ["002", "Feijão", 1, 5.00],
    ["003", "Leite", 3, 15.00],
    ["004", "Batata", 4, 8.00],
    ["005", "Cenoura", 5, 6.00],
    ["006", "Tomate", 16, 32.00],
    ["007", "Macarrão", 7, 14.00],
    ["008", "Óleo", 2, 18.00],
    ["009", "Sal", 1, 2.50],
    ["010", "Açúcar", 3, 9.00],
    ["011", "Café", 2, 22.00],
    ["012", "Farinha", 4, 12.00],
    ["013", "Frango", 6, 48.00],
    ["014", "Carne Bovina", 5, 75.00],
    ["015", "Peixe", 3, 45.00],
    ["016", "Banana", 10, 20.00],
    ["017", "Maçã", 8, 24.00],
    ["018", "Laranja", 12, 30.00],
    ["019", "Pão", 6, 18.00],
    ["020", "Queijo", 2, 28.00]
];


let valTotal = 0;
let linhas = [];

for (let i = 0; i < produtos.length; i++) {
    let codigo = produtos[i][0];
    let produto = produtos[i][1];
    let qtd = produtos[i][2];
    let preco = produtos[i][3].toFixed(2);

    let form = `| ${codigo.padEnd(5)}${produto.padEnd(15)}${qtd.toString().padEnd(4)} R$${preco.padStart(6)} |`;
    linhas.push(form);

    valTotal += qtd * produtos[i][3];
}


let txt = "Bem vindo ao mercado mais mais\nonde tudo é mais caro"
let largura = linhas[0].length;

console.log("-".repeat(largura));
let txtFormatado = txt.split("\n").map(l => l.padStart((largura + l.length) / 2).padEnd(largura)).join("\n");
console.log(txtFormatado );
console.log("-".repeat(largura));
linhas.forEach(l => console.log(l));
console.log("-".repeat(largura));
console.log(`Valor total: R$${valTotal.toFixed(2)}`);

term.close();
