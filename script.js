function addTask() {
    const taskInput = document.getElementById('task');
    const dueDateInput = document.getElementById('dueDate');
    const priorityInput = document.getElementById('priority');

    const task = taskInput.value;
    const dueDate = dueDateInput.value;
    const priority = priorityInput.value;

    if (task && dueDate) {
      const taskObject = { task, dueDate, priority };
      addTaskToList(taskObject);
      saveTasksToLocalStorage();
      taskForm.reset();
    }
  }
  // Function to add a task to the list
  function addTaskToList(taskObject) {
    const taskList = document.getElementById('taskList');

    const li = document.createElement('li');
    li.innerHTML = `
      <span>${taskObject.task}</span>
      <span class="duedate">${taskObject.dueDate}</span>
      <span class="priority">${taskObject.priority}</span>
      <button onclick="editTask(this)">📝</button>
      <button onclick="deleteTask(this)">❌</button>
    `;

    taskList.appendChild(li);
  }
  // Function to edit a task
  function editTask(button) {
    const li = button.parentNode;
    const taskText = li.querySelector('span:first-child').textContent;
    const dueDateText = li.querySelector('span:nth-child(2)').textContent;
    const priorityText = li.querySelector('span:nth-child(3)').textContent;

    const taskInput = document.getElementById('task');
    const dueDateInput = document.getElementById('dueDate');
    const priorityInput = document.getElementById('priority');

    taskInput.value = taskText;
    dueDateInput.value = dueDateText;
    priorityInput.value = priorityText;

    li.remove();
    saveTasksToLocalStorage();
  }

  // Function to delete a task
  function deleteTask(button) {
    const li = button.parentNode;
    li.remove();
    saveTasksToLocalStorage();
  }

  // Function to save tasks to local storage
  function saveTasksToLocalStorage() {
    const taskList = document.getElementById('taskList');
    const tasks = [];

    taskList.querySelectorAll('li').forEach((li) => {
      const task = li.querySelector('span:first-child').textContent;
      const dueDate = li.querySelector('span:nth-child(2)').textContent;
      const priority = li.querySelector('span:nth-child(3)').textContent;
      tasks.push({ task, dueDate, priority });
    });

    localStorage.setItem('quenchQueueTasks', JSON.stringify(tasks));
  }

  // Function to load tasks from local storage
  function loadTasksFromLocalStorage() {
    const savedTasks = localStorage.getItem('quenchQueueTasks');
    if (savedTasks) {
      const tasks = JSON.parse(savedTasks);
      tasks.forEach((task) => addTaskToList(task));
    }
  }

  // Load tasks from local storage on page load
  loadTasksFromLocalStorage();