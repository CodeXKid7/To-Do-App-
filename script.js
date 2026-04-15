let todos = [];
let isEditing = false;

const form = document.getElementById('todoForm');
const listContainer = document.getElementById('todoList');
const submitBtn = document.getElementById('submitBtn');
const cancelBtn = document.getElementById('cancelEdit');

// Calculate time remaining in d, h, m
function getTimeRemainingText(targetDateStr) {
    const now = new Date();
    const target = new Date(targetDateStr);
    const diffMs = target - now;
    
    if (diffMs <= 0) {
        const absDiff = Math.abs(diffMs);
        const hours = Math.floor(absDiff / (1000 * 60 * 60));
        const mins = Math.floor((absDiff / (1000 * 60)) % 60);
        return `<span class="overdue">Overdue by ${hours}h ${mins}m</span>`;
    }

    const mins = Math.floor((diffMs / (1000 * 60)) % 60);
    const hours = Math.floor((diffMs / (1000 * 60 * 60)) % 24);
    const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (days > 0) return `Due in ${days}d ${hours}h`;
    if (hours > 0) return `Due in ${hours}h ${mins}m`;
    return `Due in ${mins} minute(s)`;
}

function formatFriendlyDate(dateStr) {
    const options = { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(dateStr).toLocaleDateString('en-US', options);
}

// Handle Form Submission (Create/Update)
form.addEventListener('submit', (e) => {
    e.preventDefault();
    const taskData = {
        title: document.getElementById('inputTitle').value,
        description: document.getElementById('inputDesc').value,
        priority: document.getElementById('inputPriority').value,
        dueDateTime: document.getElementById('inputDateTime').value,
    };

    if (isEditing) {
        const id = parseInt(document.getElementById('editId').value);
        todos = todos.map(t => t.id === id ? { ...t, ...taskData } : t);
        resetForm();
    } else {
        todos.push({ id: Date.now(), ...taskData, completed: false });
    }
    
    renderTodos();
    form.reset();
});

function deleteTask(id) {
    todos = todos.filter(t => t.id !== id);
    renderTodos();
}

function toggleComplete(id) {
    todos = todos.map(t => t.id === id ? {...t, completed: !t.completed} : t);
    renderTodos();
}

function editTask(id) {
    const task = todos.find(t => t.id === id);
    document.getElementById('editId').value = task.id;
    document.getElementById('inputTitle').value = task.title;
    document.getElementById('inputDesc').value = task.description;
    document.getElementById('inputPriority').value = task.priority;
    document.getElementById('inputDateTime').value = task.dueDateTime;
    
    isEditing = true;
    submitBtn.textContent = "Update Task";
    document.getElementById('formTitle').textContent = "Edit Task";
    cancelBtn.style.display = "block";
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function resetForm() {
    isEditing = false;
    submitBtn.textContent = "Add Task";
    document.getElementById('formTitle').textContent = "Create New Task";
    cancelBtn.style.display = "none";
    form.reset();
}

cancelBtn.onclick = resetForm;

function renderTodos() {
    listContainer.innerHTML = '';
    todos.forEach(task => {
        const card = document.createElement('article');
        card.className = `todo-card ${task.completed ? 'completed' : ''}`;
        card.setAttribute('data-testid', 'test-todo-card');
        
        card.innerHTML = `
            <div class="card-header">
                <input type="checkbox" data-testid="test-todo-complete-toggle" 
                    ${task.completed ? 'checked' : ''} onchange="toggleComplete(${task.id})">
                <div>
                    <h3 data-testid="test-todo-title">${task.title}</h3>
                    <p data-testid="test-todo-description">${task.description}</p>
                </div>
            </div>
            <div style="margin-top:10px">
                <span class="priority-badge" data-testid="test-todo-priority">${task.priority}</span>
            </div>
            <div class="time-box">
                <time data-testid="test-todo-due-date">Deadline: ${formatFriendlyDate(task.dueDateTime)}</time>
                <time data-testid="test-todo-time-remaining" class="remaining-hint">
                    ${getTimeRemainingText(task.dueDateTime)}
                </time>
            </div>
            <div class="actions">
                <button data-testid="test-todo-edit-button" onclick="editTask(${task.id})">Edit</button>
                <button class="btn-delete" data-testid="test-todo-delete-button" onclick="deleteTask(${task.id})">Delete</button>
            </div>
        `;
        listContainer.appendChild(card);
    });
}


setInterval(renderTodos, 60000);
