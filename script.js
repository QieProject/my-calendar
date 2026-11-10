let taskInput = document.getElementById("taskInput");
let dateInput = document.getElementById("dateInput");
let addBtn = document.getElementById("addBtn");
let taskList = document.getElementById("taskList");

// 1. Ambil task yang dah disimpan. Kalau tak ada, mula dengan senarai kosong
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// 2. Function untuk simpan task
function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// 3. Function untuk papar semua task
function showTasks() {
  taskList.innerHTML = "";

  for (let i = 0; i < tasks.length; i++) {
    let item = document.createElement("li");
    item.textContent = tasks[i].date + " - " + tasks[i].text;
    taskList.appendChild(item);
  }
}

// 4. Bila butang Tambah diklik
addBtn.onclick = function () {
  let taskText = taskInput.value;
  let taskDate = dateInput.value;

  if (taskText === "" || taskDate === "") {
    alert("Isi task dan tarikh dulu");
    return;
  }

  tasks.push({ text: taskText, date: taskDate });
  saveTasks();
  showTasks();

  taskInput.value = "";
  dateInput.value = "";
};

// 5. Papar task yang dah disimpan bila page dibuka
showTasks();