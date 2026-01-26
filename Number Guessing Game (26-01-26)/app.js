let guessBtn = document.querySelector("#guessBtn");
let resetBtn = document.querySelector("#resetBtn");
let inputBox = document.querySelector("#inputBox");
let warnMsg = document.querySelector("#warnMsg");
let inputMsg = document.querySelector(".mainApp span");
let attempt = document.querySelector("#attemptLeft");
let gameMsg = document.querySelector("#gameMsg");
let page = document.querySelector(".contanier");

//Generate Random number for game
const randomNumber = () => {
  let numb = Math.floor(Math.random() * 20) + 1;
  return numb;
};

let secretNumber = randomNumber();
let attempleft = 5;
attempt.innerText = `${attempleft}`;

// Event Listener for guess Button
guessBtn.addEventListener("click", () => {
  let gussedNum = Number(inputBox.value);

  //Function to check input constraints
  checkInput(gussedNum);

  // function to update guess msg based on user input
  updateGuess(gussedNum);

  //Function to update game attempts
  updateAttempts(gussedNum);
});

// Validated input function
let checkInput = (gussedNum) => {
  if (gussedNum === 0) {
    warnMsg.innerText = "Please Enter Number above 0 !!";
    setTimeout(() => {
      warnMsg.innerText = "";
    }, 1000);
  }
  if (gussedNum > 20) {
    warnMsg.innerText = "Guess should be less then 20";
    setTimeout(() => {
      warnMsg.innerText = "";
    }, 1000);
  }
};

// Update guess message for user help
let updateGuess = (gussedNum) => {
  if (gussedNum > 0) {
    if (gussedNum === secretNumber) {
      // call gameWin function when user guess the right number
      gameWin();
    } else if (gussedNum > secretNumber) {
      inputMsg.innerText = "Too High";
      setTimeout(() => {
        inputMsg.innerText = "";
      }, 2000);
    } else {
      inputMsg.innerText = "Too low";
      setTimeout(() => {
        inputMsg.innerText = "";
      }, 2000);
    }
  }
};

let updateAttempts = (gussedNum) => {
  // guard: invalid input
  if (gussedNum <= 0 || gussedNum > 20) return;

  // guard: if already won or game over
  if (attempleft <= 0) return;

  // reduce attempt ONLY for wrong guess
  if (gussedNum !== secretNumber) {
    attempleft--;
    attempt.innerText = attempleft;
  }

  // check game over AFTER decrement
  if (attempleft === 0 && gussedNum !== secretNumber) {
    gameMsg.innerText = "Game Over !!";
    page.classList.add("Over");

    setTimeout(() => {
      gameMsg.innerText = "";
      page.classList.remove("Over");
      reset();
    }, 1500);
  }
};

let gameWin = () => {
  gameMsg.innerText = "You Won 🏆";
  page.classList.add("won");
  setTimeout(() => {
    gameMsg.innerText = "";
    page.classList.remove("won");
    reset();
  }, 2500);
};

resetBtn.addEventListener("click", () => {
  reset();
});

let reset = () => {
  secretNumber = randomNumber();
  attempleft = 5;
  attempt.innerText = `${attempleft}`;
  inputBox.value = 0;
};
