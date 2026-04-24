const num = [56,7,55,69,14,2,78,6,0,1]
const list = []
let ante = 0
let suce = 0

for (let i = 0; i < num.length; i++) {
    ante = num[i - 1]
    suce = num[i + 1]

    if (ante == undefined) {
        if (num[0] > num[1]) {
            list.push(num[0])
        }
    } else if (suce == undefined) {
        if (num[i] > ante) {
            list.push(num[i])
        }
    } else {
        if (num[i] > ante && num[i] > suce) {
            list.push(num[i])
        }
    }
}

console.log(list)