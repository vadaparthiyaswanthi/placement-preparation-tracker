let problems = JSON.parse(localStorage.getItem("placementProblems")) || [];

function saveProblems() {
    localStorage.setItem("placementProblems", JSON.stringify(problems));
}

function updateProgress() {
    const progress = document.getElementById("progress");

    const total = problems.length;
    const completed = problems.filter(problem => problem.completed).length;
    const pending = total - completed;

    progress.textContent =
        "Total Problems: " + total +
        " | Completed: " + completed +
        " | Pending: " + pending;
}

function displayProblems() {
    const list = document.getElementById("problemList");
    list.innerHTML = "";

    problems.forEach(function (problem) {
        const item = document.createElement("li");

        const problemText = document.createElement("span");

        problemText.textContent = problem.completed
            ? "✅ " + problem.name + " - " + problem.difficulty + " (Completed) "
            : problem.name + " - " + problem.difficulty + " ";

        const completeButton = document.createElement("button");
        completeButton.textContent = problem.completed
            ? "Completed"
            : "Mark Completed";

        completeButton.disabled = problem.completed;

        completeButton.onclick = function () {
            problem.completed = true;
            saveProblems();
            displayProblems();
        };

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";

        deleteButton.onclick = function () {
            problems = problems.filter(p => p.id !== problem.id);
            saveProblems();
            displayProblems();
        };

        item.appendChild(problemText);
        item.appendChild(completeButton);
        item.appendChild(deleteButton);

        list.appendChild(item);
    });

    updateProgress();
}

function addProblem() {
    const input = document.getElementById("problemName");
    const difficulty = document.getElementById("difficulty");

    const problemName = input.value.trim();

    if (problemName === "") {
        alert("Please enter a problem name!");
        return;
    }

    const problem = {
        id: Date.now() + Math.random(),
        name: problemName,
        difficulty: difficulty.value,
        completed: false
    };

    problems.push(problem);

    saveProblems();
    displayProblems();

    input.value = "";
}

displayProblems();