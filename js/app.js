let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

window.onload = function () {
  displayTasks();
};

function addTask() {
  const input = document.getElementById("taskInput");
  const taskText = input.value.trim();

  if (taskText === "") {
    alert("Please enter a task!");
    return;
  }

  tasks.push({
    text: taskText,
    completed: false,
    createdAt: new Date().toLocaleString()
  });

  localStorage.setItem("tasks", JSON.stringify(tasks));
  input.value = "";
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
    taskDate.textContent = "Added: " + (task.createdAt || "Unknown time");

    taskInfo.appendChild(taskText);
    taskInfo.appendChild(taskDate);

    taskInfo.onclick = function () {
      tasks[index].completed = !tasks[index].completed;
      localStorage.setItem("tasks", JSON.stringify(tasks));
      displayTasks();
    };

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.onclick = function (e) {
      e.stopPropagation();
      tasks.splice(index, 1);
      localStorage.setItem("tasks", JSON.stringify(tasks));
      displayTasks();
    };

    li.appendChild(taskInfo);
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