const Modal = {
  toggleModal(){
    document.querySelector('.modal-overlay').classList.toggle('active');
  }
}

const transactions = [
  {
    id: 1,
    description: 'Luz',
    amount: -50000,
    date: '23/01/2021'
  },
  {
    id: 2,
    description: 'Website',
    amount: 500000,
    date: '23/01/2021'
  },
  {
    id: 3,
    description: 'Internet',
    amount: -20000,
    date: '23/01/2021'
  },
]

const Transaction = {
  incomes() {
    let income = 0;

    // Verifica se a transação é maior que 0 para calcular a entrada
    transactions.map(transaction => {
      if(transaction.amount > 0) {
        /*  
            += faz com que a variavel some a ela mesma e adicione o valor a seguir
            a mesma coisa que income = income + transaction.amount
        */
        income += transaction.amount;
      }
    })

    return income
  },
  expenses() {
    let expense = 0;

    transactions.map(transaction => {
      if(transaction.amount < 0) {
        /*  
            += faz com que a variavel some a ela mesma e adicione o valor a seguir
            a mesma coisa que income = income + transaction.amount
        */
        expense += transaction.amount;
      }
    })

    return expense
  },
  total() {
    // Soma entrada e saida para gerar o valor total
    return Transaction.incomes() + Transaction.expenses()
  }
}

const DOM = {
  transactionsContainer: document.querySelector('#data-table tbody'),

  addTransction(transaction, index){
    const tr = document.createElement('tr');
    tr.innerHTML = DOM.innerHTMLTransaction(transaction);

    DOM.transactionsContainer.appendChild(tr);
  },

  innerHTMLTransaction(transaction) {
    const cssClass = transaction.amount > 0 ? "income" : "expense";

    const amount = Utils.formatCurrency(transaction.amount);

    const html = `
    <tr>
      <td class="description">${transaction.description}</td>
      <td class="${cssClass}">${amount}</td>
      <td class="date">${transaction.date}</td>
      <td>
        <img src="./assets/minus.svg" alt="Remover transação">
      </td>
    </tr>
    `

    return html;
  },

  updateBalance() {
    document
      .getElementById("incomeDisplay")
      .innerHTML = Utils.formatCurrency(Transaction.incomes());

    document
    .getElementById("expenseDisplay")
    .innerHTML = Utils.formatCurrency(Transaction.expenses());

    document
    .getElementById("totalDisplay")
    .innerHTML = Utils.formatCurrency(Transaction.total());

  }
}

const Utils = {
  formatCurrency(value) {
    const signal = Number(value) < 0 ? "-" : "";

    value = String(value).replace(/\D/g, "");

    // Faz com que os numeros fiquem com casas decimais de moedas
    value = Number(value) / 100;

    value = value.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL"
    })

    return signal + value;
  }
}

transactions.map((transaction, index) => {
  DOM.addTransction(transaction);
});

DOM.updateBalance();