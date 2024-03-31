var tooltip = document.querySelector(".tooltip-flair");

window.addEventListener("mousemove", (event) => {

    tooltip.style.left = `${event.x}px`;
    tooltip.style.top = `150px`;
});

document.querySelectorAll(".main>.team-div>section>.member").forEach((item) => {

    item.addEventListener("mouseout", () => {
        tooltip.classList.remove("tooltip-flair__active");
    });

    item.addEventListener("mouseover", () => {
        tooltip.classList.add("tooltip-flair__active");
        tooltip.querySelector("span").innerText = item.dataset.name;
    });

});