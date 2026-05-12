const tamanho = parseInt(process.argv.slice(2));


if (isNaN(tamanho) || tamanho < 1) {
    console.log("Tamanho deve ser pelo menos 1");
} if (tamanho === 1) {
    console.log("Z")
}
else {
    console.log("Z".repeat(tamanho));

    for (let i = 1; i < tamanho - 1; i++) {
        const espacos = " ".repeat(tamanho - 1 - i);
        console.log(espacos + "Z");
    }

    console.log("Z".repeat(tamanho));
}