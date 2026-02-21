const portals = document.querySelectorAll(".portal");

portals.forEach(portal => {
    portal.addEventListener("mouseover", () => {
        portal.src = portal.dataset.hover;
    });
    portal.addEventListener("mouseout", () => {
        portal.src = portal.dataset.original;
    });
});