const balance = document.getElementById("balance"); // show balance
const incomeMoney = document.getElementById("income-money"); // show net income
const expenseMoney = document.getElementById("expense-money"); // show net expense
const list = document.getElementById("list"); // ul collection
const form = document.getElementById("form");
const text = document.getElementById("text"); // input text
const amount = document.getElementById("amount"); // input number

let dataTransaction = [];

function init() {
    calculateMoney();
    list.innerHTML = "";
    dataTransaction.forEach(addDataToList);
}

function addDataToList(data) {
    const symbol = data.amount > 0 ? "+" : "-";
    const status = data.amount > 0 ? "income" : "expense";
    const item = document.createElement("li");
    item.innerHTML = `${data.text} <span>${symbol}${numberWithCommas(
        Math.abs(data.amount)
    )}</span><button class="delete" onClick="deleteItem(${
        data.id
    })">X</button>`;

    item.classList.add(status);
    list.appendChild(item);
}

function calculateMoney() {
    const amounts = dataTransaction.map((transaction) => transaction.amount);
    const total = amounts.reduce((res, item) => (res += item), 0);
    const netIncome = amounts.reduce(
        (res, item) => (item > 0 ? (res += item) : (res += 0)),
        0
    );
    const netExpense = amounts.reduce(
        (res, item) => (item < 0 ? (res += item) : (res += 0)),
        0
    );

    balance.innerText = `${numberWithCommas(total)}฿`;
    incomeMoney.innerText = `${numberWithCommas(netIncome)}฿`;
    expenseMoney.innerText = `${numberWithCommas(netExpense * -1)}฿`;
}

function deleteItem(id) {
    dataTransaction = dataTransaction.filter(
        (transaction) => transaction.id !== id
    );
    init();
}

function numberWithCommas(x) {
    x = x.toString();
    var pattern = /(-?\d+)(\d{3})/;
    while (pattern.test(x)) x = x.replace(pattern, "$1,$2");
    return x;
}

function generateID() {
    return Math.floor(Math.random() * 10000000);
}

function addTransaction(event) {
    event.preventDefault();

    if (text.value.trim === "" || amount.value.trim == "") {
        alert("Please fill both data");
    } else {
        const newData = {
            id: generateID(),
            text: text.value,
            amount: +amount.value,
        };

        dataTransaction.push(newData);
        text.value = "";
        amount.value = "";

        addDataToList(newData);
        calculateMoney();
    }
}

form.addEventListener("submit", addTransaction);
init();
