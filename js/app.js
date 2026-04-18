let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

window.onload = function () {
  displayTasks();
};

function addTask() {
  const input = document.getElementById("taskInput");
  const timeInput = document.getElementById("taskTime");

  const taskText = input.value.trim();
  const taskTime = timeInput.value;

  if (taskText === "") {
    alert("Please enter a task!");
    return;
  }

  tasks.push({
    text: taskText,
    time: taskTime,
    completed: false,
    createdAt: new Date().toLocaleString()
  });

  localStorage.setItem("tasks", JSON.stringify(tasks));

  input.value = "";
  timeInput.value = "";
  displayTasks();
}

function displayTasks() {
  const list = document.getElementById("taskList");
  const totalTasks = document.getElementById("totalTasks");
  const completedTasks = document.getElementById("completedTasks");

  list.innerHTML = "";

  let completedCount = 0;

  tasks.forEach((task, index) => {
    if (task.completed) {
      completedCount++;
    }

    const li = document.createElement("li");

    const leftBox = document.createElement("div");
    leftBox.className = "task-left";

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = task.completed;

    checkbox.onchange = function () {
      tasks[index].completed = checkbox.checked;
      localStorage.setItem("tasks", JSON.stringify(tasks));
      displayTasks();
    };

    const taskInfo = document.createElement("div");
    taskInfo.className = "task-info";

    const taskText = document.createElement("span");
    taskText.className = "task-text";
    taskText.textContent = task.text;

    if (task.completed) {
      taskText.classList.add("completed");
    }

    const taskDate = document.createElement("small");
    taskDate.className = "task-date";
    taskDate.textContent =
      "Task time: " + (task.time || "Not selected") +
      " | Added: " + (task.createdAt || "Unknown time");

    taskInfo.appendChild(taskText);
    taskInfo.appendChild(taskDate);

    leftBox.appendChild(checkbox);
    leftBox.appendChild(taskInfo);

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.onclick = function () {
      tasks.splice(index, 1);
      localStorage.setItem("tasks", JSON.stringify(tasks));
      displayTasks();
    };

    li.appendChild(leftBox);
    li.appendChild(deleteBtn);
    list.appendChild(li);
  });

  totalTasks.textContent = tasks.length;
  completedTasks.textContent = completedCount;
}

function clearAllTasks() {
  const isConfirmed = confirm("Are you sure you want to delete all tasks?");
  if (!isConfirmed) return;

  tasks = [];
  localStorage.setItem("tasks", JSON.stringify(tasks));
  displayTasks();
}