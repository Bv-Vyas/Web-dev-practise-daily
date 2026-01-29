let expenses = [];

const form = document.querySelector("form");
const filterForm = document.querySelector("#filterForm");
const tblBody = document.querySelector("table #tableBody");
const totalExpense = document.querySelector("#totalExpense");
const showAllBtn = document.querySelector("#showAllBtn");

form.addEventListener("submit", (evt) => {
  evt.preventDefault();
  const title = evt.target.title.value.trim();
  const amount = Number(evt.target.amount.value);
  const category = evt.target.category.value.toLowerCase();

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
    amount: amount,
    category: `${category}`,
  };

  expenses.push(newData);
  renderUI(expenses);
};

const renderUI = (expenses) => {
  tblBody.innerHTML = "";
  for (expense of expenses) {
    let newExpense = document.createElement("tr");
    let colOneData = document.createElement("td");
    let colTwoData = document.createElement("td");
    let colThirdData = document.createElement("td");
    let deletBtn = document.createElement("button");

    newExpense.setAttribute("id", `${expense.id}`);
    colOneData.innerText = `${expense.category}`;
    colTwoData.innerText = `${expense.title}`;
    colThirdData.innerText = expense.amount;
    deletBtn.innerText = "dlt";
    deletBtn.classList.add("dltBtn");

    newExpense.append(colOneData, colTwoData, colThirdData, deletBtn);

    tblBody.append(newExpense);
  }
  const total = getTotalExpenses(expenses);
  totalExpense.innerText = `Total Expense = ${total}`;
};

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

  if (expID >= 0) {
    expenses.splice(expID, 1);

    renderUI(expenses);
  }
};

const getTotalExpenses = (list) => {
  let total = 0;
  for (expense of list) {
    total += expense.amount;
  }
  return total;
};

filterForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  const filter = evt.target.categoryFilter.value.toLowerCase();
  if (filter === "") {
    console.log("No filter Added !!");
  } else {
    filterExpenses(filter);
  }
});

const filterExpenses = (filter) => {
  const filterExpenses = expenses.filter(
    (expense) => expense.category === filter,
  );
  renderUI(filterExpenses);
};

showAllBtn.addEventListener("click", () => {
  renderUI(expenses);
});
