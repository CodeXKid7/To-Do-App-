let todos = [
    {
        id: 1,
        title: "Complete Stage 1a Wizard Task",
        description: "Must include required features",
        priority: "High",
        dueDate: new Date(Date.now() + 3600000).toISOString().slice(0, 16),
        completed: false
    }
];

let isEditing = false;
let expandedIds = new Set();

const form = document.getElementById('todoForm');
const listContainer = document.getElementById('todoList');
const submitBtn = document.getElementById('submitBtn');
const cancelBtn = document.getElementById('cancelEdit');

function getTimeRemaining(dateStr) {
    const diff = new Date(dateStr) - new Date();
    const mins = Math.floor(Math.abs(diff) / 60000);
    const hrs = Math.floor(mins / 60);
    return diff < 0 ? `Overdue by ${hrs}h` : `Due in ${hrs}h`;
}

form.addEventListener('submit', (e) => {
    e.preventDefault();

    const taskData = {
        title: inputTitle.value,
        description: inputDesc.value,
        priority: inputPriority.value,
        dueDate: inputDateTime.value
    };

    if (isEditing) {
        const id = +editId.value;
        todos = todos.map(t => t.id === id ? { ...t, ...taskData } : t);
        resetForm();
    } else {
        todos.push({ id: Date.now(), ...taskData, completed: false });
    }

    render();
    form.reset();
});

function render() {
    listContainer.innerHTML = '';

    todos.forEach(task => {
        const el = document.createElement('div');
        el.innerHTML = `
            <div class="todo-card ${task.completed ? 'completed' : ''}">
                <div class="priority-indicator p-${task.priority.toLowerCase()}"></div>
                <input type="checkbox" ${task.completed ? 'checked' : ''} onclick="toggleComplete(${task.id})">
                <h3>${task.title}</h3>
                <button onclick="toggleExpand(${task.id})">Toggle</button>
                <div class="collapsible-container ${expandedIds.has(task.id) ? 'expanded' : ''}">
                    ${task.description}
                </div>
                <div>${getTimeRemaining(task.dueDate)}</div>
                <div class="actions">
                    <button onclick="editTask(${task.id})">Edit</button>
                    <button onclick="deleteTask(${task.id})">Delete</button>
                </div>
            </div>
        `;
        listContainer.appendChild(el);
    });
}

function toggleComplete(id) {
    todos = todos.map(t => t.id === id ? { ...t, completed: !t.completed } : t);
    render();
}

function toggleExpand(id) {
    expandedIds.has(id) ? expandedIds.delete(id) : expandedIds.add(id);
    render();
}

function deleteTask(id) {
    todos = todos.filter(t => t.id !== id);
    render();
}

function editTask(id) {
    const t = todos.find(t => t.id === id);
    inputTitle.value = t.title;
    inputDesc.value = t.description;
    inputPriority.value = t.priority;
    inputDateTime.value = t.dueDate;

    editId.value = id;
    isEditing = true;
    cancelBtn.style.display = 'block';
}

function resetForm() {
    isEditing = false;
    cancelBtn.style.display = 'none';
}

cancelBtn.onclick = resetForm;

render();