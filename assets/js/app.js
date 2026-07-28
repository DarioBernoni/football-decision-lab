const button = document.getElementById("demoButton");
const cards = document.getElementById("cards");

button.addEventListener("click", loadAnalysis);

async function loadAnalysis() {

    try {

        const response = await fetch("data/demo/analysis.json");

        if (!response.ok) {
            throw new Error("Unable to load analysis.");
        }

        const analysis = await response.json();

        renderAnalysis(analysis);

    } catch (error) {

        cards.innerHTML = `
            <div class="card">
                <h3>Error</h3>
                <p>${error.message}</p>
            </div>
        `;

        console.error(error);

    }

}const matchTitle = document.getElementById("matchTitle");
const competition = document.getElementById("competition");
const summary = document.getElementById("summary");

matchTitle.textContent =
`${analysis.match.homeTeam} vs ${analysis.match.awayTeam}`;

competition.textContent =
`${analysis.match.competition} • ${analysis.match.date}`;

summary.innerHTML = `

<div class="summaryCard">

<h4>Possession</h4>

<p>${analysis.summary.possession}</p>

</div>

<div class="summaryCard">

<h4>Shots</h4>

<p>${analysis.summary.shots}</p>

</div>

<div class="summaryCard">

<h4>Shots on Target</h4>

<p>${analysis.summary.shotsOnTarget}</p>

</div>

`;

function renderAnalysis(analysis) {

    cards.innerHTML = "";

    analysis.decisions.forEach(decision => {

        const card = document.createElement("div");

        card.className = "card";

        card.innerHTML = `
            <h3>#${decision.priority} · ${decision.title}</h3>
            <p>${decision.description}</p>
        `;

        cards.appendChild(card);

    });

}
