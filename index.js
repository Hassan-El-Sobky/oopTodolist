const taskSubmit = document.getElementById('taskSubmit');

taskSubmit.addEventListener('click', (e) => {
  e.preventDefault();
  Task.addTask();
});

document.querySelector('#taskList').addEventListener('click', (e) => {
  const task = e.target;
  if (task.checked) {
    const ListItemText = task.parentElement.lastElementChild.innerHTML;
    Task.removeTask(task.parentElement.parentElement);
    Task.completeTask(ListItemText);
  }
});

class Task {
  constructor() {}

  static addTask() {
    const userInput = document.getElementById('taskInput').value;
    if (!userInput) {
      Task.showAlertMessage('alert-danger', 'Please Add a Task!');
    } else {
      const listItem = Task.createTask(userInput);
      Task.showAlertMessage('alert-success', 'Task added Successfully!');

      let taskList = document.getElementById('taskList');

      taskList.append(listItem);
      // clear input
      document.getElementById('taskInput').value = '';
    }
  }

  static showAlertMessage(alertClass, message) {
    let showMyAlert;

    taskSubmit.addEventListener('click', () => {
      clearTimeout(showMyAlert);
    });

    const alertMessage = document.getElementById('alertMessage');

    alertMessage.className = `alert text-center ${alertClass}`;
    alertMessage.classList.remove('hidden');
    alertMessage.textContent = message;
    showMyAlert = setTimeout(() => {
      alertMessage.classList.add('hidden');
    }, 3000);
  }

  // adding task to completed task list
  static completeTask(completedTaskText) {
    const completedList = document.getElementById('completedList');
    const listItem = Task.createTask(completedTaskText, 'checked disabled');
    Task.showAlertMessage('alert-success', 'Task Completed!');
    completedList.appendChild(listItem);
  }

  // create list Item
  static createTask(taskText, myAttripute = '') {
    const listItem = document.createElement('li');
    listItem.classList.add('list-group-item'); //bootstrap class
    listItem.innerHTML = `<div class="form-check">
<input class="form-check-input" type="checkbox" ${myAttripute}/>
<label class="form-check-label" for="defaultCheck1"> ${taskText} </label>
</div>`;
    return listItem;
  }

  static removeTask(task) {
    task.remove();
  }
}
