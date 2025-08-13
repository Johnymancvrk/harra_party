function checkPassword() {
    const pwd = document.getElementById("password").value;
    if (pwd === "matej_se_zeni_kurva") {
        document.getElementById("password-container").style.display = "none";
        document.getElementById("settings-container").style.display = "block";
    } else {
        alert("Špatné heslo!");
    }
}

function resetTasks() {
    localStorage.removeItem("tasksState");
    alert("Úkoly byly resetovány");
}

function resetQuestions() {
    localStorage.removeItem("questionsState");
    alert("Otázky byly resetovány");
}
