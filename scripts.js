import { initialTasks } from './initialData.js'

//DOM Elements
const addTaskBtn = document.getElementById('add-task-btn');
const closeModalBtn = document.getElementById('close-modal-btn');
const taskModal = document.getElementById('task-modal');
const taskForm = document.getElementById('task-form');
const taskTitleInput = document.getElementById('task-title');
const taskDescInput = document.getElementById('task-desc');
const taskStatusSelect = document.getElementById('task-status');

// Sidebar Footer Elements (Theme + Hide Sidebar)
const themeSwitch = document.getElementById('theme-switch');
const hideSidebarBtn = document.getElementById('hide-sidebar-btn');
const sidebar = document.getElementById('side-bar-div');

// -------------------------
// Storage Helpers
// -------------------------
function loadTasks() {
    const stored = localStorage.getItem('tasks');
    return stored ? JSON.parse(stored) : [...initialTasks];
}

function saveTasks(tasks) {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// -------------------------
// Rendering Helpers
// -------------------------
function renderTask(task) {
    const taskCard = document.createElement('div');
    taskCard.classList.add('task-div');
    taskCard.dataset.id = task.id;
    taskCard.textContent = task.title;

    const container = document.querySelector(`.column-div[data-status="${task.status}"] .tasks-container`);
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
// Theme Toggle Handling
// -------------------------
function toggleTheme() {
    document.body.classList.toggle('dark-theme');
    localStorage.setItem('theme', document.body.classList.contains('dark-theme') ? 'dark' : 'light')
}

function loadTheme() {
    const savedTheme = localStorage.getItem('theme')
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-theme');
        if (themeSwitch) themeSwitch.checked = true;
    }
}

// -------------------------
// Sidebar Toggle Handling
// -------------------------
function toggleSidebar() {
    sidebar.style.display = 'none'

    // Add floating "Show Sidebar" button
    const showBtn = document.createElement('button');
    showBtn.textContent = '🚫 Show Sidebar';
    showBtn.className = 'show-sidebar-btn';
    showBtn.style.position = 'fixed';
    showBtn.style.left = '10px';
    showBtn.style.bottom = '10px';
    showBtn.style.zIndex = '1000';
    showBtn.style.backgroundColor = '#635fc7';
    showBtn.style.color = 'white';
    showBtn.style.border = 'none';
    showBtn.style.padding = '8px 12px';
    showBtn.style.borderRadius = '4px';
    showBtn.style.cursor = 'pointer';

    document.body.appendChild(showBtn);

    showBtn.addEventListener('click', () => {
        sidebar.style.display = 'flex';
        showBtn.remove();
    });
}

// -------------------------
// Event Listeners
// -------------------------
addTaskBtn.addEventListener('click', openModal);
closeModalBtn.addEventListener('click', closeModal);
taskForm.addEventListener('submit', handleFormSubmit);

if (themeSwitch) {
    themeSwitch.addEventListener('change', toggleTheme);
}

// -------------------------
// Initializing
// -------------------------
document.addEventListener('DOMContentLoaded', () => {
    console.log('🚀 Kanban App Initializing...');

const tasks =  loadTasks();
saveTasks(tasks); // ensure initialTasks are saved if not present
renderAllTasks(tasks);
loadTheme();
});