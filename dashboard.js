window.addEventListener("DOMContentLoaded", () => {
  if (localStorage.getItem("loggedIn") !== "true") {
    window.location.href = "login.html";
  }

  const taskForm = document.getElementById("taskForm");
  const taskInput = document.getElementById("taskInput");
  const taskList = document.getElementById("taskList");
  const employeList = document.getElementById("employe-list");

  //  fetching employees here
  const employeeData = [
    {
      id: "emp_001",
      name: "Alice Johnson",
      role: "Frontend Developer",
      "profile-image":
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      tasks: [],
    },
    {
      id: "emp_002",
      name: "Bob Singh",
      role: "Backend Developer",
      "profile-image":
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1064&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      tasks: [],
    },
    {
      id: "emp_003",
      name: "Claire Wu",
      role: "Project Manager",
      "profile-image":
        "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      tasks: [],
    },
  ];

  employeList.innerHTML = "";

  employeeData?.map((d) => {
    const empDiv = document.createElement("div");
    empDiv.className = "employee-card";
    empDiv.innerHTML = `
        <div class="image-container">
         <img src="${d["profile-image"]}" alt={${d["title"]}}/>
      </div> 
      <div class="content-container">
        <h4>${d.name}</h4>
        <div><strong>Role:</strong> ${d.role}</div>
        <div><strong>Tasks:</strong> ${d.tasks.length}</div> 
      </div>
    `;
    employeList.appendChild(empDiv);
  });

  // adding employee to the list
  const addEmployee = (name, role,) => {
    const newEmployee = {
      id: `emp_${employeeData.length()+1}`, // generates a unique ID using timestamp
      name: name,
      role: role,
      // profile-image: "",
      tasks: [],
    };

    employeeData.push(newEmployee);
    return newEmployee;
  };
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

  function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }

  function renderTasks() {
    taskList.innerHTML = "";
    tasks.forEach((task, index) => {
      const li = document.createElement("li");

      const taskSpan = document.createElement("span");
      taskSpan.className = "task-text";
      taskSpan.textContent = task;

      const actionDiv = document.createElement("div");
      actionDiv.className = "task-actions";

      const editBtn = document.createElement("button");
      editBtn.textContent = "Edit";
      editBtn.onclick = () => editTask(index);

      const deleteBtn = document.createElement("button");
      deleteBtn.textContent = "Delete";
      deleteBtn.style.backgroundColor = "#dc3545";
      deleteBtn.onclick = () => deleteTask(index);

      actionDiv.appendChild(editBtn);
      actionDiv.appendChild(deleteBtn);

      li.appendChild(taskSpan);
      li.appendChild(actionDiv);
      taskList.appendChild(li);
    });
  }

  taskForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const task = taskInput.value.trim();
    if (task) {
      tasks.push(task);
      taskInput.value = "";
      saveTasks();
      renderTasks();
    }
  });

  window.editTask = function (index) {
    const newTask = prompt("Edit your task:", tasks[index]);
    if (newTask !== null && newTask.trim() !== "") {
      tasks[index] = newTask.trim();
      saveTasks();
      renderTasks();
    }
  };

  window.deleteTask = function (index) {
    if (confirm("Are you sure you want to delete this task?")) {
      tasks.splice(index, 1);
      saveTasks();
      renderTasks();
    }
  };

  renderTasks();
});

function logout() {
  localStorage.removeItem("loggedIn");
  window.location.href = "index.html";
}
