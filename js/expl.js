const explOverlay = document.getElementById("expl-overlay");
const explModal = document.getElementById("expl-modal");
const explTitle = document.getElementById("expl-title");
const explCloseBtn = document.getElementById("expl-close");
const explBody = document.getElementById("expl-body");

explCloseBtn.addEventListener("click", () => {
    explBody.replaceChildren();
    explTitle.innerText = "";
    explOverlay.hide();
    explModal.hide();
});
