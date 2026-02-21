// Load saved coordinates from localStorage
const container = document.getElementById("savedContainer");

let saved = JSON.parse(localStorage.getItem("minecraftCoords")) || [];

if(saved.length === 0){
    container.innerHTML = "<p>No saved coordinates yet.</p>";
}

saved.forEach(item => {

    const card = document.createElement("div");
    card.className = "saved-card";

    card.innerHTML = `
        <!-- LEFT HALF -->
        <div class="card-left">
            <!-- later you can replace with real structure image -->
        </div>

        <!-- RIGHT HALF -->
        <div class="card-right">
            <div>${item.username || "user"}</div>
            <div>${item.title}</div>
            <div>${item.dimension}</div>
            <div>${item.type}</div>
            <div>${item.which}</div>

            <!-- default inline coordinates -->
            <div class="coords-inline">
                ${item.x}, ${item.y}, ${item.z}
            </div>

            <!-- expanded on hover -->
            <div class="coords-expanded">
        ${item.coords.split(',').map((c, i) => {
            const label = ['X','Y','Z'][i] || '';
            return `<p>${label}: ${c.trim()}</p>`;
        }).join('')}
        </div>
        </div>
    `;

    container.appendChild(card);
});

// index.js

const coordForm = document.getElementById("coordForm");

coordForm.addEventListener("submit", function(event) {
    event.preventDefault(); // prevent page reload

    // Grab form values
    const username = document.getElementById("username").value;
    const title = document.getElementById("title").value;
    const dimension = document.getElementById("dimension").value;
    const type = document.getElementById("type").value;
    const which = document.getElementById("which").value;
    const coords = document.getElementById("coords").value;
    const imageInput = document.getElementById("image");

    // Convert image to base64 so we can store it
    const reader = new FileReader();
    reader.onload = function() {
        const imgSrc = reader.result;

        // Get previous saved data
        const savedData = JSON.parse(localStorage.getItem("coordsData")) || [];

        // Add new entry
        savedData.push({ username, title, dimension, type, which, coords, imgSrc });

        // Save back to localStorage
        localStorage.setItem("coordsData", JSON.stringify(savedData));

        alert("Your info was saved! ✅");

        // Optional: clear form except username
        document.getElementById("title").value = "";
        document.getElementById("dimension").value = "";
        document.getElementById("type").value = "";
        document.getElementById("which").value = "";
        document.getElementById("coords").value = "";
        document.getElementById("image").value = "";
    };

    if (imageInput.files[0]) {
        reader.readAsDataURL(imageInput.files[0]);
    } else {
        // If no image, save anyway with placeholder
        const imgSrc = "assets/placeholder.png"; // optional default image
        const savedData = JSON.parse(localStorage.getItem("coordsData")) || [];
        savedData.push({ username, title, dimension, type, which, coords, imgSrc });
        localStorage.setItem("coordsData", JSON.stringify(savedData));
        alert("Your info was saved! ✅");

        // Clear form except username
        document.getElementById("title").value = "";
        document.getElementById("dimension").value = "";
        document.getElementById("type").value = "";
        document.getElementById("which").value = "";
        document.getElementById("coords").value = "";
    }
});
