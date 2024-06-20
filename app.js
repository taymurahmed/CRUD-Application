const taskInput = document.querySelector("#task-input");
const addTaskButton = document.querySelector("#add-task-button");
const taskList = document.querySelector("#task-list");
const counter = document.querySelector("#remaining-task-counter");
const clearAllTask = document.querySelector("#clear-button");

addTaskButton.addEventListener("click", addTask);
clearAllTask.addEventListener("click", allClear);
taskInput.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    addTask();
  }
});

function addTask() {
  const taskText = taskInput.value.trim();
  if (taskText == "") {
    alert("Enter a task please.");
    return;
  }

  const listItem = document.createElement("li");
  const taskSpan = document.createElement("span");
  taskSpan.textContent = taskText;

  // Create a div to wrap the edit & delete buttons
  const buttonContainer = document.createElement("div");
  buttonContainer.className = "buttons";

  //edit
  const editButton = document.createElement("button");
  editButton.textContent = "Edit";
  editButton.id = "edit-button";
  editButton.addEventListener("click", () => editTask(taskSpan, editButton));
  // edit function
  function editTask(taskSpan) {
    const originalText = taskSpan.textContent;
    const input = document.createElement("input");
    input.type = "text";
    input.value = originalText;
    input.id = "task-input";
    // input.style.height = "40px";
    // input.style.width = "80%";
    // input.style.padding = "10px";
    // input.style.border = "1px solid #ccc";
    // input.style.borderRadius = "10px";
    // input.style.margin = "5px 0";
    // input.style.fontSize = "16px";
    // input.style.outline = "none";
    // input.style.color = "black";

    const saveButton = document.createElement("button");
    saveButton.textContent = "Update";
    saveButton.style.background = "rgb(41, 101, 223)";
    saveButton.id = "edit-button";
    
    saveButton.addEventListener("click", saveNow);
    function saveNow() {
      taskSpan.textContent = input.value;
      listItem.replaceChild(taskSpan, input);
      buttonContainer.replaceChild(editButton, saveButton);
    }

    const listItem = taskSpan.parentNode;
    listItem.replaceChild(input, taskSpan);
    const buttonContainer = listItem.querySelector(".buttons");
    const editButton = buttonContainer.querySelector("#edit-button");
    buttonContainer.replaceChild(saveButton, editButton);
  }

  //delete
  const deleteButton = document.createElement("button");
  deleteButton.textContent = "Delete";
  deleteButton.id = "delete-button";
  deleteButton.addEventListener("click", deleteItem);
  //delete function
  function deleteItem() {
    taskList.removeChild(listItem);
    counter.innerText--;
  }

  // Append buttons to the button container
  buttonContainer.appendChild(editButton);
  buttonContainer.appendChild(deleteButton);

  listItem.appendChild(taskSpan);
  // listItem.appendChild(editButton);
  // listItem.appendChild(deleteButton);

  //append buttonContainer to the list item
  listItem.appendChild(buttonContainer);
  taskList.appendChild(listItem);
  counter.innerText++;
  taskInput.value = "";
  taskInput.focus();
}

function allClear() {
  taskList.innerHTML = "";
  counter.innerText = 0;
  taskInput.value = "";
  // location.reload();
}
