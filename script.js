// script.js
document.getElementById('transaction-form').addEventListener('submit', function(e) {
    e.preventDefault();
    addTransaction();
});

let transactions = [];

function addTransaction() {
    const date = document.getElementById('date').value;
    const category = document.getElementById('category').value;
    const amount = parseFloat(document.getElementById('amount').value);
    const type = document.getElementById('type').value;

    const transaction = { date, category, amount, type };
    transactions.push(transaction);
    displayTransactions(transactions);
    updateSummary();
    clearForm();
}

function displayTransactions(transactions) {
    const tbody = document.getElementById('transaction-tbody');
    tbody.innerHTML = '';

    transactions.forEach(transaction => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${transaction.date}</td>
            <td>${transaction.category}</td>
            <td>${transaction.amount.toFixed(2)}</td>
            <td>${transaction.type}</td>
        `;
        tbody.appendChild(tr);
    });
}

function updateSummary() {
    const totalIncome = transactions.filter(t => t.type === 'income')
                                    .reduce((acc, t) => acc + t.amount, 0);
    const totalExpense = transactions.filter(t => t.type === 'expense')
                                     .reduce((acc, t) => acc + t.amount, 0);
    const balance = totalIncome - totalExpense;

    document.getElementById('total-income').textContent = totalIncome.toFixed(2);
    document.getElementById('total-expense').textContent = totalExpense.toFixed(2);
    document.getElementById('balance').textContent = balance.toFixed(2);
}

function clearForm() {
    document.getElementById('transaction-form').reset();
}

function filterTransactions() {
    const filterDate = document.getElementById('filter-date').value;
    const filterCategory = document.getElementById('filter-category').value.toLowerCase();

    let filteredTransactions = transactions;

    if (filterDate) {
        filteredTransactions = filteredTransactions.filter(t => t.date === filterDate);
    }

    if (filterCategory) {
        filteredTransactions = filteredTransactions.filter(t => t.category.toLowerCase().includes(filterCategory));
    }

    displayTransactions(filteredTransactions);
}
