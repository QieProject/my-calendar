let taskSubject = document.getElementById("taskSubject");
let taskTitle = document.getElementById("taskTitle");
let taskCategory = document.getElementById("taskCategory");
let taskSubmitDate = document.getElementById("taskSubmitDate");
let taskDecs = document.getElementById("taskDecs");
let addBtn = document.getElementById("addBtn");
let taskList = document.getElementById("taskList");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function addCell(row, text) {
  let cell = document.createElement("td");
  cell.textContent = text;
  row.appendChild(cell);
}

function showTasks() {
  tasks.sort(function (a, b) {
    if (a.date < b.date) return -1;
    if (a.date > b.date) return 1;
    return 0;
  });

  taskList.innerHTML = "";

  for (let i = 0; i < tasks.length; i++) {
    let row = document.createElement("tr");

    let status = "Not done yet";
    if (tasks[i].done === true) {
      status = "Done";
    }

    addCell(row, status);
    addCell(row, tasks[i].date);
    addCell(row, tasks[i].subject);
    addCell(row, tasks[i].title);
    addCell(row, tasks[i].category);
    addCell(row, tasks[i].description);
    addCell(row, tasks[i].dateAdded);

    let actionCell = document.createElement("td");

    let doneBtn = document.createElement("button");
    if (tasks[i].done === true) {
      doneBtn.textContent = "Undo";
    } else {
      doneBtn.textContent = "Finish";
    }
    doneBtn.onclick = function () {
      tasks[i].done = !tasks[i].done;
      saveTasks();
      showTasks();
    };

    let deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.onclick = function () {
      tasks.splice(i, 1);
      saveTasks();
      showTasks();
    };

    actionCell.appendChild(doneBtn);
    actionCell.appendChild(deleteBtn);
    row.appendChild(actionCell);

    taskList.appendChild(row);
  }
}

addBtn.onclick = function () {
  let subject = taskSubject.value;
  let title = taskTitle.value;
  let category = taskCategory.value;
  let taskDate = taskSubmitDate.value;
  let description = taskDecs.value;

  if (subject.trim() == "" || title.trim() == "" || category.trim() == "" || taskDate.trim() == "" || description.trim() == "") {
    alert("Please enter all details");
    return;
  }

  let dateAdded = new Date().toLocaleDateString("en-CA");

  tasks.push({
    subject: subject,
    title: title,
    category: category,
    date: taskDate,
    description: description,
    dateAdded: dateAdded,
    done: false
  });

  saveTasks();
  showTasks();

  taskSubject.value = "";
  taskTitle.value = "";
  taskSubmitDate.value = "";
  taskDecs.value = "";
};

showTasks();