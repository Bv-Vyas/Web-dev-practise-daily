let expenses = [];

const form = document.querySelector("form");
const tblBody = document.querySelector("table #tableBody");
const totalExpense = document.querySelector("#totalExpense");

console.log(totalExpense);

form.addEventListener("submit", (evt) => {
  evt.preventDefault();
  const title = evt.target.title.value.trim();
  const amount = Number(evt.target.amount.value);
  const category = evt.target.category.value;

  if (!title || amount <= 0 || !category) {
    console.log("Please Enter valid data");
  } else {
    setData(title, amount, category);
  }
  evt.target.reset();
});

const setData = (title, amount, category) => {
  let newData = {
    id: `${Date.now()}`,
    title: `${title}`,
    amount: `${amount}`,
    category: `${category}`,
  };

  expenses.push(newData);
  renderUI();
};

const renderUI = () => {
  tblBody.innerHTML = "";
  for (expense of expenses) {
    let newExpense = document.createElement("tr");
    let colOneData = document.createElement("td");
    let colTwoData = document.createElement("td");
    let colThirdData = document.createElement("td");
    let deletBtn = document.createElement("button");
    console.log(expense.id);
    newExpense.setAttribute("id", `${expense.id}`);
    colOneData.innerText = `${expense.category}`;
    colTwoData.innerText = `${expense.title}`;
    colThirdData.innerText = `${expense.amount}`;
    deletBtn.innerText = "dlt";
    deletBtn.classList.add("dltBtn");

    newExpense.append(colOneData, colTwoData, colThirdData, deletBtn);

    tableBody.append(newExpense);

    const total = getTotalExpenses();
    totalExpense.innerText = `Total Expense = ${total}`;
  }
};

const dltbtn = document.querySelector("table .dltBtn");
console.log(dltbtn);

tblBody.addEventListener("click", (evt) => {
  if (!evt.target.classList.contains("dltBtn")) {
    return;
  }
  const row = evt.target.closest("tr");
  const expenseId = row.getAttribute("id");
  hanleDeleteExpense(expenseId);
});

const hanleDeleteExpense = (expenseId) => {
  const expID = expenses.findIndex((item) => item.id === expenseId);
  console.log(expID);
  if (expID >= 0) {
    expenses.splice(expID, 1);

    renderUI();
  }
};

const getTotalExpenses = () => {
  let total = 0;
  for (expense of expenses) {
    total += Number(expense.amount);
  }
  return total;
};
