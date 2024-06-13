// Lista de tareas
let tasks = [];

// Elementos del DOM
const taskList = document.getElementById('task-list');
const todoForm = document.getElementById('todo-form');
const newTaskInput = document.getElementById('new-task');
const filterButtons = document.querySelectorAll('.filter-btn');

// Evento submit para agregar tarea
todoForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const taskText = newTaskInput.value.trim();
    if (taskText !== '') {
        addTask(taskText);
        newTaskInput.value = '';
    }
});

// Función para añadir tarea
function addTask(taskText) {
    const task = {
        id: Date.now(),
        text: taskText,
        completed: false
    };
    tasks.push(task);
    renderTasks();
}

// Función para renderizar las tareas en la lista
function renderTasks() {
    taskList.innerHTML = '';
    tasks.forEach((task, index) => {
        const taskItem = createTaskElement(task, index);
        taskList.appendChild(taskItem);
    });
}

// Función para crear elemento de tarea
function createTaskElement(task, index) {
    const taskItem = document.createElement('li');
    taskItem.classList.add('task-item');
    if (task.completed) {
        taskItem.classList.add('checked');
    }

    // Contenido HTML de la tarea
    taskItem.innerHTML = `
        <button class="complete-btn" data-id="${task.id}"></button>
        <span>${task.text}</span>
        <button class="delete-btn" data-id="${task.id}">Borrar</button>
        <button class="move-up-btn move-btn" data-index="${index}">&#8593;</button>
        <button class="move-down-btn move-btn" data-index="${index}">&#8595;</button>
    `;

    // Evento click para marcar como completada
    const completeBtn = taskItem.querySelector('.complete-btn');
    completeBtn.addEventListener('click', function() {
        task.completed = !task.completed;
        renderTasks();
    });

    // Evento click para eliminar tarea
    const deleteBtn = taskItem.querySelector('.delete-btn');
    deleteBtn.addEventListener('click', function() {
        tasks = tasks.filter(item => item.id !== task.id);
        renderTasks();
    });

    // Evento click para mover tarea hacia arriba
    const moveUpBtn = taskItem.querySelector('.move-up-btn');
    moveUpBtn.addEventListener('click', function() {
        if (index > 0) {
            const movedTask = tasks.splice(index, 1)[0];
            tasks.splice(index - 1, 0, movedTask);
            renderTasks();
        }
    });

    // Evento click para mover tarea hacia abajo
    const moveDownBtn = taskItem.querySelector('.move-down-btn');
    moveDownBtn.addEventListener('click', function() {
        if (index < tasks.length - 1) {
            const movedTask = tasks.splice(index, 1)[0];
            tasks.splice(index + 1, 0, movedTask);
            renderTasks();
        }
    });

    return taskItem;
}

// Evento click para filtrar tareas
filterButtons.forEach(button => {
    button.addEventListener('click', function() {
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        const filterType = button.id.replace('filter-', '');
        filterTasks(filterType);
    });
});

// Función para filtrar las tareas
function filterTasks(filterType) {
    let filteredTasks = [];
    switch (filterType) {
        case 'all':
            filteredTasks = tasks;
            break;
        case 'pending':
            filteredTasks = tasks.filter(task => !task.completed);
            break;
        case 'completed':
            filteredTasks = tasks.filter(task => task.completed);
            break;
        default:
            filteredTasks = tasks;
            break;
    }
    renderFilteredTasks(filteredTasks);
}

// Función para renderizar las tareas filtradas
function renderFilteredTasks(filteredTasks) {
    taskList.innerHTML = '';
    filteredTasks.forEach((task, index) => {
        const taskItem = createTaskElement(task, index);
        taskList.appendChild(taskItem);
    });
}

// Inicializar la lista de tareas
renderTasks();
