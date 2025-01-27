document.addEventListener("DOMContentLoaded", () => {
  const inputText = document.getElementById("todo-input");
  const addBtn = document.getElementById("add-task-btn");
  const todoList = document.getElementById("todo-list");

  tasks = JSON.parse(localStorage.getItem("allTasks")) || [];
  tasks.forEach((task) => {
    renderItem(task);
  });

  const handleTaskAdd = () => {
    taskText = inputText.value.trim();
    if (taskText === "") return;
    const newTask = {
      id: Date.now(),
      taskData: taskText,
      isCompleted: false,
    };
    tasks.push(newTask);
    addToLocalStorage();
    renderItem(newTask);
    inputText.value = "";
  };

  addBtn.addEventListener("click", handleTaskAdd);
  inputText.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      handleTaskAdd();
    }
  });

  function renderItem(task) {
    const li = document.createElement("li");

    li.classList.toggle("completed", task.isCompleted);

    li.innerHTML = `
    <input type="checkbox" ${task.isCompleted ? "checked" : ""}>
    <span>${task.taskData}</span>
    <button>Delete</button>`;

    li.querySelector("input").addEventListener("click", (e) => {
      task.isCompleted = !task.isCompleted;
      li.classList.toggle("completed");
      addToLocalStorage();
    });

    li.querySelector("button").addEventListener("click", (e) => {
      e.preventDefault();
      tasks = tasks.filter((t) => t.id !== task.id);
      li.remove();
      addToLocalStorage();
    });

    todoList.appendChild(li);
  }

  function addToLocalStorage() {
    localStorage.setItem("allTasks", JSON.stringify(tasks));
  }
});
