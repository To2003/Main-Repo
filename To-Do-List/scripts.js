// Espera a que el contenido del DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', function() {
    const taskForm = document.getElementById('task-form'); // Selecciona el formulario de tareas
    const taskInput = document.getElementById('task-input'); // Selecciona el campo de entrada de tareas
    const taskList = document.getElementById('task-list'); // Selecciona la lista de tareas

    // Añade un evento de envío al formulario
    taskForm.addEventListener('submit', function(e) {
        e.preventDefault(); // Evita el comportamiento predeterminado del formulario

        // Obtiene el valor del campo de entrada
        const taskText = taskInput.value.trim();

        // Si el campo de entrada no está vacío, añade la nueva tarea a la lista
        if (taskText !== '') {
            addTask(taskText);
            taskInput.value = ''; // Limpia el campo de entrada
        }
    });

    // Función para añadir una nueva tarea
    function addTask(task) {
        // Crea un nuevo elemento de lista (li)
        const li = document.createElement('li');
        li.className = 'task-item'; // Asigna una clase al elemento

        // Crea un span para el texto de la tarea
        const taskSpan = document.createElement('span');
        taskSpan.textContent = task;

        // Crea un botón para eliminar la tarea
        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'delete-btn';
        deleteBtn.textContent = 'Eliminar';

        // Añade un evento de clic al botón de eliminar
        deleteBtn.addEventListener('click', function() {
            taskList.removeChild(li); // Elimina la tarea de la lista
        });

        // Añade el texto de la tarea y el botón de eliminar al elemento de lista
        li.appendChild(taskSpan);
        li.appendChild(deleteBtn);

        // Añade el nuevo elemento de lista a la lista de tareas
        taskList.appendChild(li);
    }
});
