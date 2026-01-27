let tasks = [];

let addBtn = document.querySelector(".inputBox-container button");
let inputBox = document.querySelector(".inputBox-container input");
let warnMsg = document.querySelector(".warnMsg");

addBtn.addEventListener("click", () => {
  let userInput = inputBox.value;
  if (userInput === "") {
    warnMsg.innerHTML = "Please Enter a Task !!";
    setTimeout(() => {
      warnMsg.innerText = "";
    }, 2000);
  } else if (checkInput(userInput.trim())) {
    warnMsg.innerText = "Cannot Add Same Task Again !!";
    setTimeout(() => {
      warnMsg.innerText = "";
    }, 2000);
  } else {
    saveTaskInTodo(userInput);
  }
});

// function to check whether the task is already there or not
let checkInput = (Input) => {
  for (task of tasks) {
    let arrHas = task.text.toLowerCase();
    if (arrHas === Input.toLowerCase()) {
      return true;
    } else {
      return false;
    }
  }
};

let saveTaskInTodo = (input) => {
  const newTask = {
    id: `${Date.now()}`,
    text: `${input}`,
    completed: false,
  };

  tasks.push(newTask);

  //function call for rendering UI for new Task
  renderUI();
};

let renderUI = () => {
  let ul = document.querySelector(".tasksList ul");
  ul.innerHTML = "";
  for (task of tasks) {
    const newTask = document.createElement("li");
    newTask.innerText = `${task.text}`;
    newTask.classList.add("myTask");
    const id = task.id;
    newTask.setAttribute("id", `${id}`);

    const dltBtn = document.createElement("button");
    dltBtn.innerText = "dlt";
    dltBtn.classList.add("deleteTaskBtn");
    //function to handle delete
    dltBtn.addEventListener("click", () => {
      const btnId = newTask.getAttribute("id");
      handleDeleteBtn(btnId);
    });

    const checkBoxBtn = document.createElement("input");
    checkBoxBtn.type = "checkbox";
    checkBoxBtn.addEventListener("click", () => {
      const checkId = newTask.getAttribute("id");
      handleTaskDone(checkId);
    });

    newTask.prepend(checkBoxBtn);
    newTask.append(dltBtn);

    ul.append(newTask);
  }
  updateTotalTask();
};

let handleDeleteBtn = (btnId) => {
  const objectToRemove = tasks.findIndex((item) => item.id == btnId);

  if (objectToRemove > -1) {
    tasks.splice(objectToRemove, 1);
    renderUI();
  }
};

let handleTaskDone = (checkId) => {
  for (task of tasks) {
    if (task.id === checkId) {
      if (task.completed === false) {
        task.completed = true;
        updateCompletedTask();
      } else {
        task.completed = false;
        updateCompletedTask();
      }
    }
  }
};

let updateCompletedTask = () => {
  let count = 0;
  for (task of tasks) {
    if (task.completed === true) {
      count++;
    }
  }
  const newCompleteTask = document.querySelector("#cmpltTasks");
  newCompleteTask.innerText = `${count}`;
};

let updateTotalTask = () => {
  const total = tasks.length;
  const newTotal = document.querySelector("#totalTaks");
  newTotal.innerText = `${total}`;
};
