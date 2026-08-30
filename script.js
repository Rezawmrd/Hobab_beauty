document.addEventListener("DOMContentLoaded", function () {

    // ==============================
    // SERVICES
    // ==============================

    const servicesButton = document.querySelector(".services-toggle");
    const servicesContent = document.querySelector(".services-content");

    if (servicesButton && servicesContent) {

        servicesButton.onclick = function () {

            servicesContent.classList.toggle("open");
            servicesButton.classList.toggle("active");

            const opened =
                servicesContent.classList.contains("open");

            servicesButton.setAttribute(
                "aria-expanded",
                opened ? "true" : "false"
            );
        };
    }


    // ==============================
    // BRIDAL
    // ==============================

    const bridalButton = document.querySelector(".bridal-toggle");
    const bridalContent = document.querySelector(".bridal-content");

    if (bridalButton && bridalContent) {

        bridalButton.onclick = function () {

            bridalContent.classList.toggle("open");
            bridalButton.classList.toggle("active");

            const opened =
                bridalContent.classList.contains("open");

            bridalButton.setAttribute(
                "aria-expanded",
                opened ? "true" : "false"
            );
        };
    }


    // ==============================
    // TIME SELECTION
    // ==============================

    const timeButtons =
        document.querySelectorAll(".time-grid button");

    timeButtons.forEach(function (button) {

        button.onclick = function () {

            timeButtons.forEach(function (item) {
                item.classList.remove("selected");
            });

            button.classList.add("selected");
        };

    });


    // ==============================
    // BRIDAL BOOKING BUTTON
    // ==============================

    const bridalBookingButton =
        document.querySelector(".bridal-booking-button");

    if (bridalBookingButton) {

        bridalBookingButton.onclick = function () {

            const booking =
                document.querySelector("#booking");

            if (booking) {

                booking.scrollIntoView({
                    behavior: "smooth"
                });

            }

        };

    }

});
