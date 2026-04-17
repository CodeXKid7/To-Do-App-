💧 Frontend Wizards — Stage 1a Project

Welcome to the Frontend Wizards Stage 1a Project — an evolution from a single Todo Card into a more dynamic and interactive Task Manager system.

This version combines both single-card logic and multi-task functionality, creating a clean, modern, and fully interactive experience using pure HTML, CSS, and JavaScript.


---

🚀 Project Overview

This project is a fully functional Todo Manager that allows users to:

Add new tasks

Edit existing tasks

Delete tasks

Track task status

Manage priorities

Expand/collapse task descriptions

View time remaining or overdue status


It maintains the Bluish modern UI style while introducing real interactivity and state handling.


---

✨ Features

🧩 Task Creation

Add new tasks with:

Title

Description

Priority (Low / Medium / High)

Due date & time



📝 Editable Tasks

Switch any task into edit mode

Update all fields

Save or cancel changes


🔄 Status Management

Change task status between:

Pending

In Progress

Done


Checkbox shortcut to quickly mark tasks as Done


🎯 Priority Indicators

Visual color bar on each task:

🔴 High

🟡 Medium

🟢 Low



📖 Expand / Collapse

Toggle task descriptions

Uses aria-expanded for accessibility


⏳ Time Tracking

Displays:

Time remaining (e.g., Due in 2h 30m)

OR overdue status (Overdue by...)


Automatically updates every 30 seconds


⚠️ Overdue Detection

Highlights overdue tasks clearly


🗑️ Task Deletion

Remove tasks instantly from the list



---

🧪 Testing Compatibility

All required data-testid attributes are included for automated testing:

test-todo-card

test-todo-title

test-todo-description

test-todo-priority

test-todo-priority-indicator

test-todo-status-control

test-todo-complete-toggle

test-todo-expand-toggle

test-todo-collapsible-section

test-todo-due-date

test-todo-time-remaining

test-todo-overdue-indicator

test-todo-edit-form

test-todo-edit-title-input

test-todo-edit-description-input

test-todo-edit-priority-select

test-todo-edit-due-date-input

test-todo-save-button

test-todo-cancel-button

test-todo-edit-button

test-todo-delete-button



---

🏗️ Tech Stack

HTML5 — Structure

CSS3 — Styling (modern UI, responsive layout)

Vanilla JavaScript (ES6) — State management & interactivity



---

🧠 Architecture

The app uses a simple but effective structure:

todos[] → stores all tasks

Each task contains:

title, description

priority, status

dueDate

UI states (isEditing, isExpanded)



Rendering is handled by a single render() function that:

Dynamically updates the DOM

Switches between view mode and edit mode

Ensures UI stays in sync with state



---

🔁 Lifecycle Behavior

Initial task is preloaded

UI updates instantly on any interaction

Time tracking refreshes every 30 seconds



---

🎯 Key Learning Outcomes

This project demonstrates:

DOM manipulation without frameworks

State-driven UI rendering

Component-like structure using functions

Handling user input and forms

Conditional rendering

Accessibility basics (ARIA attributes)



---

📌 Future Improvements

💾 LocalStorage persistence

🔍 Task filtering (All / Completed / Pending)

🎨 Animations & transitions

⚛️ Migration to React / Next.js



---

🧙‍♂️ Author Note

This project is part of the Frontend Wizards program, designed to strengthen real-world frontend development skills by building progressively complex interfaces from scratch.


---

📷 Preview

A clean, modern task manager with interactive cards, smooth UX, and real-time updates.


---

🏁 Final Thoughts

This Stage 1a project bridges the gap between a simple UI component and a mini application, introducing real-world concepts like state management, interactivity, and scalability.

You're no longer just building components — you're building systems.