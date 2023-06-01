const taskInput = document.querySelector('#task__input');
const addTaskButton = document.querySelector('#tasks__add');
const taskList = document.querySelector('#tasks__list');

addTaskButton.addEventListener('click', addTask);
taskList.addEventListener('click', removeTask);

function addTask(e) {
    const task = taskInput.value.trim(); // добавлен вызов метода trim() 

    if ((e.keyCode !== 13) && (e.target === taskInput)) {
        taskList.innerHTML += ` 
    <div class="task"> 
        <div class="task__title"> 
        ${task} 
        </div> 
        <a href="#" class="task__remove"> 
        &times; 
        </a> 
    </div> 
    `;
        taskInput.value = '';
        saveElement();
    }
}

function removeTask(e) {
    if (e.target.classList.contains('task__remove')) { // проверяем, был ли клик на крестику 
        const taskItem = e.target.closest('.task'); // получаем родительский элемент задачи 
        taskItem.outerHTML = ''; // удаляем задачу 
        saveElement();
    }
}

function saveElement() {
    const elem = taskList.innerHTML;
    localStorage.setItem('key', elem);
}

function loadElement() {
    if (localStorage.getItem('key')) { // добавлена проверка на наличие сохраненных данных 
        taskList.innerHTML = localStorage.getItem('key');
    }
}

loadElement();


function createTask() {
    if (taskInput.value.trim() !== '') { // проверяем, что поле не пустое
        const task = `
    <div class="task">
        <div class="task__title">
        ${taskInput.value.trim()}
        </div>
        <a href="#" class="task__remove">&times;</a>
    </div>
    `;
        taskList.insertAdjacentHTML('afterend', task);
        taskInput.value = '';
        const closeButtons = document.querySelectorAll('.task__remove'); // ищем все кнопки закрытия задач

        closeButtons.forEach(closeButton => { // на каждую кнопку вешаем обработчик событий
            closeButton.addEventListener('click', event => {
                event.preventDefault();
                const taskItem = event.target.closest('.task');
                taskItem.remove();
                saveElement();
            });
        });
        saveElement();
    }
}

addTaskButton.addEventListener('click', createTask);
taskInput.addEventListener('keydown', e => {
    if (e.keyCode === 13) {
        createTask();
    }
});