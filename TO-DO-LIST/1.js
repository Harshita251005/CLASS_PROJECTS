function addTask() {
    const taskInput = document.getElementById("taskInput");
    const priority = document.getElementById("priority").value;
    const dueDate = document.getElementById("dueDate").value;
    const taskList = document.getElementById("taskList");
    if (taskInput.value.trim() === "") return;

    const li = document.createElement("li");
    li.classList.add(`priority-${priority.toLowerCase()}`);
    li.innerHTML = `<span onclick="toggleComplete(this)">${taskInput.value} - <small>${dueDate}</small></span> 
                    <div class='controls'>
                        <button class="important" onclick="markImportant(this)"><i class='fas fa-star'></i></button>
                        <button class="edit" onclick="editTask(this)"><i class='fas fa-edit'></i></button>
                        <button class="delete" onclick="removeTask(this)"><i class='fas fa-trash-alt'></i></button>
                    </div>`;
    taskList.appendChild(li);
    taskInput.value = "";
    document.getElementById("dueDate").value = "";
}

function removeTask(button) {
    button.parentElement.parentElement.remove();
}

function toggleComplete(task) {
    task.classList.toggle("completed");
}

function editTask(button) {
    const task = button.parentElement.parentElement.querySelector("span");
    const newText = prompt("Edit your task:", task.innerText.split(" - ")[0]);
    if (newText) task.innerHTML = `${newText} - <small>${task.innerText.split(" - ")[1]}</small>`;
}

function markImportant(button) {
    button.classList.toggle("important");
    const task = button.parentElement.parentElement;
    task.style.fontWeight = task.style.fontWeight === "bold" ? "normal" : "bold";
}

function toggleDarkMode() {
    document.body.classList.toggle("dark-mode");
}
