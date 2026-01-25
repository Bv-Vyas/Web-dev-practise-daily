let incBtn = document.querySelector("#incmtBtn");
let decBtn = document.querySelector("#decBtn");
let resBtn = document.querySelector("#resBtn");
let myNum = document.querySelector("#myNumber");
let warnMsg = document.querySelector(".main-container .warningMsg");

let count = 0; // keep track for colour changes

incBtn.addEventListener("click", () => {
  let num = Number(myNum.value);
  let newNum = num + 1;
  myNum.value = newNum;
  count += 1;
  changeColour(count);
});

decBtn.addEventListener("click", () => {
  let num = Number(myNum.value);
  if (num >= 1) {
    let newNum = num - 1;
    myNum.value = newNum;
    count -= 1;
    changeColour(count);
  }
  if (num === 0) {
    warnMsg.innerText = "Cannot go Below 0 !!";
    changeColour(count);
    setTimeout(() => {
      warnMsg.innerText = "";
    }, 2000);
  }
});

resBtn.addEventListener("click", () => {
  myNum.value = 0;
  count = 0;
  changeColour(count);
});

function changeColour(count) {
  if (count) {
    myNum.classList.remove("textRed");
    myNum.classList.add("textGreen");
  } else {
    myNum.classList.remove("textGreen");
    myNum.classList.add("textRed");
  }
}

window.addEventListener("load", () => {
  changeColour(count);
});
