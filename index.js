const portals = document.querySelectorAll(".portal");

portals.forEach(portal => {
  portal.addEventListener("mouseover", () => {
    portal.src = portal.dataset.hover;
  });
  portal.addEventListener("mouseout", () => {
    portal.src = portal.dataset.original;
  });
});

/* ================= COORDINATE SYSTEM ================= */

// save form
const form = document.getElementById("coordForm");

if (form) {
  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const title = document.getElementById("title").value;
    const dimension = document.querySelector('input[name="dimension"]:checked')?.value;
    const description = document.querySelector('input[name="type"]:checked')?.value;
    const x = document.getElementById("x").value;
    const y = document.getElementById("y").value;
    const z = document.getElementById("z").value;

    const entry = {
      title, dimension, description, x, y, z
    };

    let saved = JSON.parse(localStorage.getItem("minecraftCoords")) || [];
    saved.push(entry);

    localStorage.setItem("minecraftCoords", JSON.stringify(saved));

    alert("Coordinate Saved!");
    form.reset();
  });
}

// show saved
function showSaved() {

  const container = document.getElementById("savedList");
  container.innerHTML = "<h3>Saved Coordinates:</h3>";

  let saved = JSON.parse(localStorage.getItem("minecraftCoords")) || [];

  saved.forEach(item => {
    container.innerHTML += `
        <p>
        ${item.title} — ${item.dimension} — ${item.description} → 
        X:${item.x} Y:${item.y} Z:${item.z}
        </p>
        `;
  });
}

// clear form
function clearForm() {
  document.getElementById("coordForm").reset();
}

// SAVE username
document.getElementById("username").addEventListener("input", function () {
  localStorage.setItem("savedUsername", this.value);
});

// LOAD username when page opens
window.addEventListener("DOMContentLoaded", function () {
  const savedName = localStorage.getItem("savedUsername");

  if (savedName) {
    document.getElementById("username").value = savedName;
  }
});

// Auto-load username from localStorage
// index.js (or coords.js if you want)
window.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("coordForm");

  // Auto-fill username
  const savedName = localStorage.getItem("savedUsername");
  if (savedName) document.getElementById("username").value = savedName;

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const username = document.getElementById("username").value.trim();
    const title = document.getElementById("title").value.trim();
    const dimension = document.getElementById("dimension").value.trim();
    const description = document.getElementById("description").value.trim();
    const coords = document.getElementById("coords").value.trim();
    const imgInput = document.getElementById("image");

    if (!username || !title || !dimension || !description || !coords) {
      alert("Please fill in all fields before saving!");
      return;
    }

    // Save username
    localStorage.setItem("savedUsername", username);

    // Handle image
    const reader = new FileReader();
    reader.onload = function () {
      const imgSrc = reader.result || "assets/default.png";

      // Get saved coordinates array from localStorage
      const savedCoords = JSON.parse(localStorage.getItem("coordsData")) || [];

      // Add new entry
      savedCoords.push({
        username,
        title,
        dimension,
        description,
        coords,
        imgSrc
      });

      // Save back to localStorage
      localStorage.setItem("coordsData", JSON.stringify(savedCoords));

      // Reset form except username
      form.reset();
      document.getElementById("username").value = username;

      alert("Your info has been saved!");
    };

    if (imgInput.files[0]) reader.readAsDataURL(imgInput.files[0]);
    else reader.onload();
  });

  document.getElementById("resetBtn").addEventListener("click", () => {
    form.reset();
    localStorage.removeItem("savedUsername");
  });

});

