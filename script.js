// HOBAB BEAUTY

document.addEventListener("DOMContentLoaded", function () {

    const button = document.querySelector(".services-toggle");
    const content = document.querySelector(".services-content");

    if (!button || !content) {
        return;
    }

    button.addEventListener("click", function () {

        const open = content.classList.toggle("open");

        button.classList.toggle("active", open);

        button.setAttribute(
            "aria-expanded",
            open ? "true" : "false"
        );

    });

});
