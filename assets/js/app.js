const button = document.getElementById("demoButton");

const cards = document.getElementById("cards");

button.addEventListener("click", () => {

cards.innerHTML = `

<div class="card">

<h3>Decision 1</h3>

<p>

Press the opponent higher during build-up.

</p>

</div>

<div class="card">

<h3>Decision 2</h3>

<p>

Exploit the left half-space.

</p>

</div>

<div class="card">

<h3>Decision 3</h3>

<p>

Improve defensive transitions after losing possession.

</p>

</div>

`;

});
