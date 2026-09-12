document.addEventListener("DOMContentLoaded", function () {


    /* =========================
       SERVICES
    ========================= */

    const servicesButton =
        document.querySelector(".services-toggle");

    const servicesContent =
        document.querySelector(".services-content");


    if (servicesButton && servicesContent) {

        servicesButton.addEventListener("click", function () {

            servicesContent.classList.toggle("open");

            servicesButton.classList.toggle("active");


            const opened =
                servicesContent.classList.contains("open");


            servicesButton.setAttribute(
                "aria-expanded",
                opened ? "true" : "false"
            );

        });

    }


    /* =========================
       BRIDAL
    ========================= */

    const bridalButton =
        document.querySelector(".bridal-toggle");

    const bridalContent =
        document.querySelector(".bridal-content");


    if (bridalButton && bridalContent) {

        bridalButton.addEventListener("click", function () {

            bridalContent.classList.toggle("open");

            bridalButton.classList.toggle("active");


            const opened =
                bridalContent.classList.contains("open");


            bridalButton.setAttribute(
                "aria-expanded",
                opened ? "true" : "false"
            );

        });

    }


    /* =========================
       TIME SELECTION
    ========================= */

    const timeButtons =
        document.querySelectorAll(".time-grid button");


    timeButtons.forEach(function (button) {

        button.addEventListener("click", function () {

            timeButtons.forEach(function (item) {

                item.classList.remove("selected");

            });


            button.classList.add("selected");

        });

    }


});
