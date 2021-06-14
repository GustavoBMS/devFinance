const Modal = {
  toggleModal(){
    document.querySelector('.modal-overlay').classList.toggle('active');
  }
}

const transactions = [
  {
    description: 'Luz',
    amount: -50000,
    date: '23/01/2021'
  },
  {
    description: 'Website',
    amount: 500000,
    date: '23/01/2021'
  },
  {
    description: 'Internet',
    amount: -20000,
    date: '23/01/2021'
  },
]

const Transaction = {
  all: transactions,
  add(transaction){
    Transaction.all.push(transaction)
    App.reload();
  },

  remove(index) {
    Transaction.all.splice(index,1);

    App.reload();
  },

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

  },

  clearTransaction() {
    // remove da DOM os dados renderizados anteriormente
    DOM.transactionsContainer.innerHTML = "";
  }
}

const Utils = {
  formatAmount(value) {
    value = Number(value) * 100;
    
    return value;
  },

  formatDate(date) {
    const splittedDate = date.split("-");
    return `${splittedDate[2]}/${splittedDate[1]}/${splittedDate[0]}`;
  },

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

const Form = {
  description: document.querySelector('input#description'),
  amount: document.querySelector('input#amount'),
  date: document.querySelector('input#date'),

  getValues() {
    return {
      description: Form.description.value,
      amount: Form.amount.value,
      date: Form.date.value,
    }
  },

  validateFields() {
    const { description, amount, date} = Form.getValues();

    if(description.trim() === "" || amount.trim() === "" || date.trim() === "") {
      throw new Error("Por favor, preencha todos os campos")
    }
  },

  formatValues() {
    let { description, amount, date} = Form.getValues();
    
    amount = Utils.formatAmount(amount);

    date = Utils.formatDate(date);

    return {
      description: description,
      amount: amount,
      date: date,
    }
  },

  saveTransaction() {
    Transaction.add(transaction);
  },

  clearFields() {
    Form.description.value = ""
    Form.amount.value = ""
    Form.date.value = ""
  },

  submit(event) {
    event.preventDefault();

    try {
      Form.validateFields();

      const transaction = Form.formatValues();

      //  Salva a transacao
      Transaction.add(transaction);

      //  Apaga os dados do form
      Form.clearFields();

      //  Fecha o Modal
      Modal.toggleModal();
    } catch(e) {

    }

  }
}

const App = {
  init() {
    Transaction.all.map((transaction, index) => {
      DOM.addTransction(transaction);
    });
    
    DOM.updateBalance();
  },
  reload() {
    // Remove tudo antes de renderizar
    DOM.clearTransaction()
    App.init()
  }
}

App.init();