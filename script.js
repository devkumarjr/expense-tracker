const balance = document.getElementById("balance");
const income = document.getElementById("income");
const expense = document.getElementById("expense");
const list = document.getElementById("list");
const form = document.getElementById("transaction-form");
const text = document.getElementById("text");
const amount = document.getElementById("amount");

let transactions = JSON.parse(localStorage.getItem("transactions")) || [];


// Add Transaction
function addTransaction(e){
    e.preventDefault();

    const transaction = {
        id: Date.now(),
        text: text.value,
        amount: +amount.value
    };

    transactions.push(transaction);

    updateLocalStorage();

    init();

    text.value = "";
    amount.value = "";
}


// Add transaction to DOM
function addTransactionDOM(transaction){

    const sign = transaction.amount < 0 ? "-" : "+";

    const item = document.createElement("li");

    item.classList.add(
        transaction.amount < 0 ? "minus" : "plus"
    );

    item.innerHTML = `
        ${transaction.text}
        <span>
            ${sign}₹${Math.abs(transaction.amount)}
        </span>

        <button 
            class="delete-btn"
            onclick="removeTransaction(${transaction.id})"
        >
            X
        </button>
    `;

    list.appendChild(item);
}


// Update Balance
function updateValues(){

    const amounts = transactions.map(
        transaction => transaction.amount
    );

    const total = amounts
        .reduce((acc, item) => acc + item, 0)
        .toFixed(2);

    const incomeAmount = amounts
        .filter(item => item > 0)
        .reduce((acc, item) => acc + item, 0)
        .toFixed(2);

    const expenseAmount = (
        amounts
        .filter(item => item < 0)
        .reduce((acc, item) => acc + item, 0) * -1
    ).toFixed(2);

    balance.innerText = `₹${total}`;
    income.innerText = `₹${incomeAmount}`;
    expense.innerText = `₹${expenseAmount}`;
}


// Remove Transaction
function removeTransaction(id){

    transactions = transactions.filter(
        transaction => transaction.id !== id
    );

    updateLocalStorage();

    init();
}


// Local Storage
function updateLocalStorage(){

    localStorage.setItem(
        "transactions",
        JSON.stringify(transactions)
    );
}


// Initialize App
function init(){

    list.innerHTML = "";

    transactions.forEach(addTransactionDOM);

    updateValues();
}

init();

form.addEventListener("submit", addTransaction);