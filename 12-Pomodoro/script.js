let toDoObject = [];
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
  timerId = setInterval(() => {}, 1000);
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
