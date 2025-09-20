import { initialTasks } from './initialData.js'

//DOM Elements
const addTaskBtn = document.getElementById('add-task-btn');
const closeModalBtn = document.getElementById('close-modal-btn');
const taskModal = document.getElementById('task-modal');
const taskForm = document.getElementById('task-form');
const taskTitleInput = document.getElementById('task-title');
const taskDescInput = document.getElementById('task-desc');
const taskStatusSelect = document.getElementById('task-status');

// -------------------------
// Storage Helpers
// -------------------------
function loadTasks() {
    const stored = localStorage.getItems('tasks');
    return stored ? JSON.parse(stored) : [...initialTasks];
}

function saveTasks(tasks) {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// -------------------------
// Rendering Helpers
// -------------------------
function renderTask() {
    const taskCard = document.createElement('div');
    taskCard.classList.add('task-div');
    taskCard.dataset.id = task.id;
    taskCard.textContent = task.title;

    const container = document.querySelector(`column-div[data-status="${task.status}"] .tasks-container`);
    if (container) container.appendChild(taskCard);
}

function renderAllTasks(tasks) {
    document.querySelectorAll('.tasks-container').forEach((container) => {
        container.innerHTML = '';
    });

    tasks.forEach(renderTask);
    updateColumnCounts(tasks);
}

function updateColumnCounts(tasks) {
    const statuses = ['todo', 'doing', 'done'];
    statuses.forEach((status) => {
        const count = tasks.filter((t) => t.status === status).length;
        const header = document.querySelector(`.column-div[data-status="${status}"] h4`);
        if (header) header.textContent = `${status.toUpperCase()} (${count})`;
    });
}

// -------------------------
// Modal + Form Handling
// -------------------------
function openModal() {
    taskModal.showModal();
}

function closeModal() {
    taskForm.reset();
    taskModal.close();
}

function handleFormSubmit(e) {
    e.preventDefault();

    const title = taskTitleInput.value.trim();
    const description = taskDescInput.value.trim();
    const status = taskStatusSelect.value;

    if (!title || !status) {
        alert('! Please fill out this field.');
        return;
    }

    const tasks = loadTasks();
    
    const newTask = {
        id: Date.now(), // unique ID
        title,
        description,
        status,
    };

    tasks.push(newTask);
    saveTasks(tasks);
    renderAllTasks(tasks);
    closeModal();
}

// -------------------------
// Event Listeners
// -------------------------
addTaskBtn.addEventListener('click', openModal);
closeModalBtn.addEventListener('click', closeModal);
taskForm.addEventListener('submit', handleFormSubmit);

// -------------------------
// Initializing
// -------------------------
const tasks =  loadTasks();
saveTasks(tasks); // ensure initialTasks are saved if not present
renderAllTasks(tasks);