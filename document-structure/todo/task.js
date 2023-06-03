const taskInput = document.querySelector('#task__input');
const addTaskButton = document.querySelector('#tasks__add');
const taskList = document.querySelector('#tasks__list');

addTaskButton.addEventListener('click', addTask);
taskList.addEventListener('click', removeTask);

function addTask() {
    const task = taskInput.value.trim();

    if (task) { // проверяем, что task не пустое
        const taskItem = `
            <div class="task">
                <div class="task__title">
                    ${task}
                </div>
                <a href="#" class="task__remove">&times;</a>
            </div>
        `;
        taskList.insertAdjacentHTML('beforeend', taskItem);
        taskInput.value = '';
        saveTasks();
    }
}

function removeTask(event) {
    if (event.target.classList.contains('task__remove')) {
        const taskItem = event.target.closest('.task');
        taskItem.remove();
        saveTasks();
    }
}

function saveTasks() {
    localStorage.setItem('tasks', taskList.innerHTML);
}

function loadTasks() {
    if (localStorage.getItem('tasks')) {
        taskList.innerHTML = localStorage.getItem('tasks');
    }
}

loadTasks();

addTaskButton.addEventListener('click', addTask);
taskInput.addEventListener('keydown', function(event) {
    if (event.keyCode === 13) {
        addTask();
    }
});