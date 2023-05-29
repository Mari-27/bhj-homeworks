const taskInput = document.querySelector('#task__input');
const addTaskButton = document.querySelector('#tasks__add');
const taskList = document.querySelector('#tasks__list');


taskInput.addEventListener('keypress', addTask);
addTaskButton.addEventListener('click', addTask);


function addTask(e) {
    const task = taskInput;

    if ((e.keyCode !== 13) && (this === taskInput)) {
        return;
    }
    if (task.value !== '') {

        taskList.innerHTML += `
                    <div class="task">
                        <div class="task__title">
                        ${task.value}
                        </div>
                        <a href="#" class="task__remove" onclick = "this.closest('.task').outerHTML = '';"
                    >&times;
                        </a>
                    </div>`;
        task.value = '';
        e.preventDefault();
        saveElement();


        return false;

    }
    function saveElement() {
        const elem = taskList.innerHTML;
        localStorage.setItem('key', elem);


    }
}
function loadElement() {
    taskList.innerHTML = localStorage.getItem('key');
}
loadElement();