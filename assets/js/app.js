const demoButton = document.getElementById("demoButton");

const matchOverview = document.getElementById("matchOverview");
const dashboard = document.getElementById("dashboard");
const decisionGrid = document.getElementById("decisionGrid");

demoButton.addEventListener("click", loadAnalysis);

async function loadAnalysis() {

    try {

        const response = await fetch("data/demo/analysis.json");

        if (!response.ok) {
            throw new Error("Unable to load analysis.");
        }

        const analysis = await response.json();

        renderMatch(analysis);
        renderDashboard(analysis);
        renderDecisions(analysis);

    }

    catch (error) {

        console.error(error);

        decisionGrid.innerHTML = `
            <div class="placeholder">
                ${error.message}
            </div>
        `;

    }

}

function renderMatch(analysis) {

    const match = analysis.match;

    matchOverview.innerHTML = `

        <div class="matchCard">

            <h3>${match.homeTeam} vs ${match.awayTeam}</h3>

            <p>
                ${match.competition}
            </p>

            <div class="matchMeta">

                <span>Season ${match.season}</span>

                <span>Matchday ${match.matchday}</span>

                <span>${match.date}</span>

            </div>

        </div>

    `;

}

function renderDashboard(analysis) {

    dashboard.innerHTML = "";

    renderStatSection(
        "Main Statistics",
        analysis.dashboard.mainStats
    );

    renderStatSection(
        "Advanced Statistics",
        analysis.dashboard.advancedStats
    );

}

function renderStatSection(title, stats) {

    const section = document.createElement("div");

    section.className = "dashboardSection";

    const heading = document.createElement("h3");

    heading.textContent = title;

    const grid = document.createElement("div");

    grid.className = "statsGrid";

    stats.forEach(stat => {

        const card = document.createElement("div");

        card.className = "statCard";

        card.innerHTML = `

            <div class="statLabel">

                ${stat.label}

            </div>

            <div class="statValue">

                ${stat.value}

            </div>

        `;

        grid.appendChild(card);

    });

    section.appendChild(heading);

    section.appendChild(grid);

    dashboard.appendChild(section);

}

function renderDecisions(analysis) {

    decisionGrid.innerHTML = "";

    analysis.decisions.forEach(decision => {

        const card = createDecisionCard(decision);

        decisionGrid.appendChild(card);

    });

}

function createDecisionCard(decision) {

    const card = document.createElement("div");

    card.className = "decisionCard";

    const evidenceList = decision.evidence
        .map(item => `<li>${item}</li>`)
        .join("");

    card.innerHTML = `

        <div class="decisionHeader">

            <div class="priority">

                PRIORITY ${decision.priority}

            </div>

            <div class="category">

                ${decision.category}

            </div>

        </div>

        <h3 class="decisionTitle">

            ${decision.title}

        </h3>

        <p class="decisionDescription">

            ${decision.description}

        </p>

        <div class="infoBlock">

            <h4>Recommendation</h4>

            <p>

                ${decision.recommendation}

            </p>

        </div>

        <div class="infoBlock">

            <h4>Evidence</h4>

            <ul>

                ${evidenceList}

            </ul>

        </div>

        <div class="badgeContainer">

            <div class="badge">

                Confidence: ${Math.round(decision.confidence * 100)}%

            </div>

            <div class="badge">

                Impact: ${decision.impact}

            </div>

            <div class="badge">

                ${decision.teamPhase}

            </div>

            <div class="badge">

                Severity: ${decision.severity}

            </div>

        </div>

    `;

    return card;

}
