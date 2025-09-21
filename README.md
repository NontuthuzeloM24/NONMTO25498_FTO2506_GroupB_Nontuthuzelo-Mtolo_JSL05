# 🧠 JSL05 Project Brief: Task Board with Local Storage Persistence and Task Creation

## 📋 Prerequisites

1. Ensure your **DOM elements are correctly structured** (as in JSL04).
2. Clicking a task should **open the modal with the relevant task details** (extension planned).
3. Review your **JSL05 user stories** on the student dashboard for full criteria.

---

## 🛠️ Project Overview

This project implements a **Kanban-style task management board** with:

- ✅ Persistent tasks using **localStorage**
- ✅ Ability to **create tasks via a modal**
- ✅ Task rendering into **status-based columns**
- ✅ A responsive, accessible UI
- ✅ Interactive sidebar footer with **dark/light mode toggle** and **sidebar visibility toggle**

---

## 🎯 Key Features

### 📦 Local Storage Persistence

- ✅ **Tasks are saved to local storage** and persist across refreshes.
- ✅ On page load, tasks are **loaded and rendered** based on their saved status.
- ✅ Tasks retain their correct **status column** (To Do / Doing / Done).

### ✍️ Task Creation Modal

- ✅ Clicking **"Add Task"** opens a modal form.
- ✅ Users can input:
  - Task **title** (required)
  - Task **description** (optional)
  - Task **status** via dropdown
- ✅ Upon submission:
  - The new task is saved to `localStorage`.
  - It is rendered instantly into the correct column.
  - The modal closes and resets.

### 🎨 Design & Responsiveness

- ✅ The modal and layout follow the **Figma design specs**.
- ✅ Works on both **desktop and mobile**.
- ✅ The **Add Task button** and board layout respond fluidly across screen sizes.

### 💡 Sidebar Footer Controls

- ✅ The sidebar now includes a **footer** with:
  - 🌓 **Light/Dark Mode Toggle**
  - 🫥 **Hide/Show Sidebar Toggle**
- ✅ Fully functional, using **emoji icons** for simplicity.
- ✅ Accessible and toggled interactively with persistent state.

---

## 🧱 Code Structure

- 🔄 **Modular JavaScript** with clearly separated concerns:
  - `initialData.js` – Initial seed data
  - `scripts.js` – Main app logic, DOM interaction
- 🧩 Logical separation:
  - Task creation
  - Rendering
  - Storage handling
  - UI state control
- 🧼 Follows **best practices**:
  - Descriptive variable names
  - No redundant DOM queries
  - Clear separation of concerns
- 📘 **JSDoc-style comments** used for maintainability

---

## ✅ Outcome

A fully functional **task management application** that:

- Loads and displays tasks from **localStorage**
- Allows users to **add new tasks** using a modal
- **Preserves task state** after refreshes
- Offers an **intuitive, responsive UI**
- Includes **light/dark mode** and **sidebar toggle**

This codebase is **clean, modular**, and built using modern JavaScript practices.

---

## 🔄 Future Improvements

- ✅ Improve task modal to **edit existing tasks**
- ✅ Allow **drag-and-drop** task reordering between columns
- ✅ Integrate task deletion
- ✅ Support for **multiple boards** or projects
