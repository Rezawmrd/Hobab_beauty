document.addEventListener("DOMContentLoaded", function () {

    // ==============================
    // خدمات ما
    // ==============================

    const servicesButton =
        document.querySelector(".services-toggle");

    const servicesContent =
        document.querySelector(".services-content");


    if (servicesButton && servicesContent) {

        servicesButton.addEventListener("click", function () {

            const isOpen =
                servicesContent.classList.contains("open");


            if (isOpen) {

                servicesContent.classList.remove("open");
                servicesButton.classList.remove("active");

                servicesButton.setAttribute(
                    "aria-expanded",
                    "false"
                );

            } else {

                servicesContent.classList.add("open");
                servicesButton.classList.add("active");

                servicesButton.setAttribute(
                    "aria-expanded",
                    "true"
                );

            }

        });

    }


    // ==============================
    // پکیج عروس
    // ==============================

    const bridalButton =
        document.querySelector(".bridal-toggle");

    const bridalContent =
        document.querySelector(".bridal-content");


    if (bridalButton && bridalContent) {

        bridalButton.addEventListener("click", function () {

            const isOpen =
                bridalContent.classList.contains("open");


            if (isOpen) {

                bridalContent.classList.remove("open");
                bridalButton.classList.remove("active");

                bridalButton.setAttribute(
                    "aria-expanded",
                    "false"
                );

            } else {

                bridalContent.classList.add("open");
                bridalButton.classList.add("active");

                bridalButton.setAttribute(
                    "aria-expanded",
                    "true"
                );

            }

        });

    }


    // ==============================
    // انتخاب ساعت
    // ==============================

    const timeButtons =
        document.querySelectorAll(".time-grid button");


    timeButtons.forEach(function (button) {

        button.addEventListener("click", function () {

            timeButtons.forEach(function (item) {

                item.classList.remove("selected");

            });

            button.classList.add("selected");

        });

    });


    // ==============================
    // رزرو از منوی بالا
    // ==============================

    const bookingLink =
        document.querySelector('nav a[href="#booking"]');


    if (bookingLink) {

        bookingLink.addEventListener("click", function (event) {

            event.preventDefault();

            const booking =
                document.querySelector("#booking");


            if (booking) {

                booking.scrollIntoView({
                    behavior: "smooth"
                });

            }

        });

    }

});
