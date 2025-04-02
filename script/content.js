// 2025 EPITECH HUB JAN NGUYEN

console.log("Script content.js chargé");

function getPlanningURL(startDate, endDate) {
    const baseURL = "https://intra.epitech.eu/planning/load?format=json";
    return `${baseURL}&start=${startDate}&end=${endDate}`;
}

// document.getElementById("import").addEventListener("click", getPlanning);

function getPlanning() {
    let today = new Date();
    let startDate = today.toISOString().split('T')[0];

    let nextWeek = new Date();
    nextWeek.setDate(today.getDate() + 7);
    let endDate = nextWeek.toISOString().split('T')[0];

    console.log("Génération de l'URL du planning...");
    console.log("Date de début :", startDate);
    console.log("Date de fin :", endDate);

    let planningURL = getPlanningURL(startDate, endDate);
    console.log("URL générée :", planningURL);

    fetch(planningURL)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Erreur HTTP : ${response.status}`);
            }
            return response.json();
        })
        .then(data => console.log("Données reçues :", data))
        .catch(error => console.error("Erreur lors de la requête :", error));
}