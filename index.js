const portals = document.querySelectorAll(".portal");

portals.forEach(portal => {
    portal.addEventListener("mouseover", () => {
        portal.src = portal.dataset.hover;
    });
    portal.addEventListener("mouseout", () => {
        portal.src = portal.dataset.original;
    });
});

/*
    Minecraft Worlds Beyond
    Coordinate Storage System

    This script allows users to save build coordinates.
    Data is stored locally using localStorage.
*/

// save coordinates
function saveCoords() {

    // get input values
    const name = document.getElementById("buildName").value;
    const dimension = document.getElementById("dimension").value;
    const coords = document.getElementById("coords").value;

    if(name === "" || dimension === "" || coords === ""){
        alert("Please fill all fields!");
        return;
    }

    // create object
    const entry = `${name} — ${dimension} — ${coords}`;

    // get stored data
    let list = JSON.parse(localStorage.getItem("coords")) || [];

    list.push(entry);

    localStorage.setItem("coords", JSON.stringify(list));

    displayCoords();
}

// show saved coordinates
function displayCoords(){

    const listElement = document.getElementById("coordList");
    listElement.innerHTML = "";

    let list = JSON.parse(localStorage.getItem("coords")) || [];

    list.forEach(item => {
        const li = document.createElement("li");
        li.textContent = item;
        listElement.appendChild(li);
    });
}

// run when page loads
displayCoords();