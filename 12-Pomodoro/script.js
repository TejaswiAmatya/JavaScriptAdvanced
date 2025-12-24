let toDoObject = [];
let intervalId = null;
const focusTime = 5;
const breakTime = 2;
let audio = new Audio("alarm.mp3");

document.querySelector(".timer").innerHTML = formatTime(focusTime);
function addTask() {
  const inputElement = document.querySelector(".inputTask");
  const name = inputElement.value;

  const dateElement = document.querySelector(".dueDateTask");
  const dueDate = dateElement.value;

  toDoObject.push({
    name,
    dueDate,
  });

  inputElement.value = "";
  printTasks();
}

function printTasks() {
  let taskListHtml = "";
  for (i = 0; i < toDoObject.length; i++) {
    const { name, dueDate } = toDoObject[i];
    const html = `<p>${name} ${dueDate} 
    <button onClick = "toDoObject.splice(${i}, 1);
    printTasks();
    ">Delete</button></p>`;
    taskListHtml += html;
  }

  const taskList = document.querySelector(".taskLists");
  taskList.innerHTML = taskListHtml;
}

function startTimer() {
  const statusElement = document.querySelector(".status");
  const statusTimer = statusElement.innerHTML;

  if (statusTimer === "Focus") {
    startTime(focusTime);
  } else {
    startTime(breakTime);
  }
}

function startTime(startTime) {
  // Clear any existing interval
  if (intervalId !== null) {
    clearInterval(intervalId);
  }

  let timeLeft = startTime;
  intervalId = setInterval(() => {
    timerElement = document.querySelector(".timer");
    timeLeft--;
    timerElement.innerHTML = formatTime(timeLeft);

    // Stop when timer reaches 0
    if (timeLeft < 0) {
      clearInterval(intervalId);
      intervalId = null;

      playSound();

      const statusElement = document.querySelector(".status");
      const currentStatus = statusElement.innerHTML;
      const timerElement = document.querySelector(".timer");

      if (currentStatus === "Focus") {
        statusElement.innerHTML = "Break";
        timerElement.innerHTML = formatTime(breakTime);
      } else {
        statusElement.innerHTML = "Focus";
        timerElement.innerHTML = formatTime(focusTime);
      }
    }
  }, 1000);
}

function playSound() {
  audio.play();

  setTimeout(() => {
    audio.pause();
  }, 2000);
}

//this is to format time
function formatTime(seconds) {
  let minutes = Math.floor(seconds / 60);
  let remainingSeconds = seconds % 60;

  // add leading zero if needed
  if (minutes < 10) {
    minutes = "0" + minutes;
  }

  if (remainingSeconds < 10) {
    remainingSeconds = "0" + remainingSeconds;
  }

  return minutes + ":" + remainingSeconds;
}
