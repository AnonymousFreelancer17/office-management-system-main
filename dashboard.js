window.addEventListener('DOMContentLoaded', () => {
    if (localStorage.getItem('loggedIn') !== 'true') {
      window.location.href = 'login.html';
    }
  
    const taskForm = document.getElementById('taskForm');
    const taskInput = document.getElementById('taskInput');
    const taskList = document.getElementById('taskList');
  
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  
    function saveTasks() {
      localStorage.setItem('tasks', JSON.stringify(tasks));
    }
  
    function renderTasks() {
      taskList.innerHTML = '';
      tasks.forEach((task, index) => {
        const li = document.createElement('li');
  
        const taskSpan = document.createElement('span');
        taskSpan.className = 'task-text';
        taskSpan.textContent = task;
  
        const actionDiv = document.createElement('div');
        actionDiv.className = 'task-actions';
  
        const editBtn = document.createElement('button');
        editBtn.textContent = 'Edit';
        editBtn.onclick = () => editTask(index);
  
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.style.backgroundColor = '#dc3545';
        deleteBtn.onclick = () => deleteTask(index);
  
        actionDiv.appendChild(editBtn);
        actionDiv.appendChild(deleteBtn);
  
        li.appendChild(taskSpan);
        li.appendChild(actionDiv);
        taskList.appendChild(li);
      });
    }
  
    taskForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const task = taskInput.value.trim();
      if (task) {
        tasks.push(task);
        taskInput.value = '';
        saveTasks();
        renderTasks();
      }
    });
  
    window.editTask = function(index) {
      const newTask = prompt('Edit your task:', tasks[index]);
      if (newTask !== null && newTask.trim() !== '') {
        tasks[index] = newTask.trim();
        saveTasks();
        renderTasks();
      }
    };
  
    window.deleteTask = function(index) {
      if (confirm('Are you sure you want to delete this task?')) {
        tasks.splice(index, 1);
        saveTasks();
        renderTasks();
      }
    };
  
    renderTasks();
  });
  
  function logout() {
    localStorage.removeItem('loggedIn');
    window.location.href = 'login.html';
  }
  