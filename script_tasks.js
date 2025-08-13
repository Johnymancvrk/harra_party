const totalTasks = 10;
let tasksState = JSON.parse(localStorage.getItem("tasksState")) || Array(totalTasks).fill("locked");

function saveState() {
    localStorage.setItem("tasksState", JSON.stringify(tasksState));
}

function renderTasks() {
    const container = document.getElementById("tasks-container");
    container.innerHTML = "";
    document.getElementById("progress").textContent = `Úkol ${tasksState.filter(t => t !== "locked").length} z ${totalTasks}`;

    for (let i = 0; i < totalTasks; i++) {
        const state = tasksState[i];
        const taskDiv = document.createElement("div");
        taskDiv.className = `task ${state}`;
        taskDiv.innerHTML = `
            <h2>Úkol ${i + 1}</h2>
            <p>Popis úkolu ${i + 1}...</p>
            ${
                state === "done" ? `<span class="done-label">Splněno ✅</span>` :
                state === "skipped" ? `<span class="skip-label">Přeskočeno ⏭️</span>` :
                `<button onclick="completeTask(${i})">Splněno</button>
                 <button onclick="skipTask(${i})">Přeskočit</button>`
            }
        `;
        if (state === "locked") taskDiv.style.display = "none";
        container.appendChild(taskDiv);
    }
}

function completeTask(index) {
    if (tasksState[index] !== "locked") {
        tasksState[index] = "done";
        if (index + 1 < totalTasks && tasksState[index + 1] === "locked") {
            tasksState[index + 1] = "active";
        }
        saveState();
        renderTasks();
    }
}

function skipTask(index) {
    if (tasksState[index] !== "locked") {
        tasksState[index] = "skipped";
        if (index + 1 < totalTasks && tasksState[index + 1] === "locked") {
            tasksState[index + 1] = "active";
        }
        saveState();
        renderTasks();
    }
}

// Inicializace
if (tasksState[0] === "locked") tasksState[0] = "active";
renderTasks();
