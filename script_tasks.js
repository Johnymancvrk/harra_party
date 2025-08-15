<script>
const tasks = [
    // 📸 Fotky & Selfie
    "Coldplay camera s random lidma",
    "Vyfoť selfie s 5 různými cizími ženami",
    "Vyfoť se během víkendu se třemi různými lidmi jménem Matěj",

    // 🖊️ Podpisy & Zápisy
    "Získej 5 podpisů od cizích žen na svoje tričko",
    "Podepiš někomu tričko fixem. Tvý kamarádi se nepočítají",
    "Přesvěč nějakou slečnu ať se podepíše na triko tvého kamaráda",

    // 🍹 Pivo, Drink & Bar
    "Objednej drink pro úplně cizího člověka",
    "Natoč si v hospodě vlastní pivo",
    "Objednej si pití falešným přízvukem (např. Ital, Rus, Francouz)",

    // 💬 Socializace
    "Dostaň číslo od cizí holky",
    "Na chvíli si hraj na číšníka v baru a obsluž někoho cizího",
    "Zazvoň na dveře a požádej o svatební požehnání",
    "Zeptej se kolemjdoucí ženy, jestli se nechce nechat vyšetřit od pana doktora farmacie",
    "Požádej o radu v lásce od staršího páru",
    "Přesvědč někoho, ať tě adoptuje jako svého syna",
    "Buď wingman a dohod jednu slečnu kámošovi",
    "Najdi někoho bez vlasů a zeptej se, jestli by ti nedal tři vlasy děda vševěda",
    "Otevři dveře na toalety a řekni: 'Che tady někdo sex?'",

    // 🎭 Zábava
    "Zahraj si pantomimu – ostatní vyberou téma",

    // 🎯 Soutěže
    "Udělej 5 kliků uprostřed baru",
    "Vyměň si jeden kus oblečení s úplně cizím člověkem",

    // 🔄 Výměny
    "Sežeň kondom a vyměň ho s někým za jiný předmět",

    // 🎤 Komunikace
    "Zeptej se tří lidí, jestli se ženíš ze správných důvodů",

    // 🎶 Karaoke
    "Přihlas se do karaoke",

    // 💸 Prodej
    "Prodej fiktivní svatební lístky kolemjdoucím",

    // 🕊️ Symbolické
    "Založ v baru minichvíli ticha na počest tvé svobody"
];


const totalTasks = tasks.length;
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
            <p>${tasks[i]}</p>
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
</script>
