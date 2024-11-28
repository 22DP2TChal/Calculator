let history = JSON.parse(localStorage.getItem('calcHistory')) || [];

function appendToInput(value) {
    document.getElementById("input").value += value;
}

function clearInput() {
    document.getElementById("input").value = '';
}

function calculate() {
    const input = document.getElementById("input").value;

    if (!input) {
        alert("Lūdzu, ievadiet izteiksmi!");
        return; // Izvairāmies no tālākas apstrādes bez ievades
    }

    try {
        const result = eval(input);
        
        // Iestata rezultātu kā placeholder
        document.getElementById("input").placeholder = `Rezultāts: ${result}`;

        // Saglabā rezultātu vēsturē
        history.push(`${input} = ${result}`);
        localStorage.setItem('calcHistory', JSON.stringify(history));
        updateHistory();
        
        clearInput(); // Iespēja dzēst ievadi pēc aprēķina
    } catch (error) {
        alert("Kļūda aprēķinā! Lūdzu, pārbaudiet ievadi.");
        clearInput();
    }
}

function updateHistory() {
    const historyList = document.getElementById("history");
    historyList.innerHTML = '';
    
    history.forEach((entry, index) => {
        const li = document.createElement("li");
        li.textContent = entry;

        // Pievieno dzēšanas pogu
        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Dzēst";
        deleteButton.onclick = () => deleteEntry(index);
        
        li.appendChild(deleteButton);
        historyList.appendChild(li);
    });
}

function clearHistory() {
    if (confirm("Vai tiešām vēlaties dzēst visu vēsturi?")) {
        history = [];
        localStorage.removeItem('calcHistory');
        updateHistory();
        alert("Vēsture ir dzēsta.");
    }
}

function deleteEntry(index) {
    if (confirm("Vai tiešām vēlaties dzēst šo ierakstu?")) {
        history.splice(index, 1);
        localStorage.setItem('calcHistory', JSON.stringify(history));
        updateHistory();
        alert("Ieraksts ir dzēsts.");
    }
}

// Atjauno vēsturi lapas ielādēšanas laikā
window.onload = updateHistory;