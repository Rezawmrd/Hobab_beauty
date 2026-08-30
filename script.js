// ========================================
// HOBAB BEAUTY
// Main JavaScript
// ========================================

document.addEventListener("DOMContentLoaded", function () {


    // ========================================
    // SERVICES ACCORDION
    // ========================================

    const servicesButton =
        document.querySelector(".services-toggle");

    const servicesContent =
        document.querySelector(".services-content");

    const servicesArrow =
        document.querySelector(".services-arrow");


    if (servicesButton && servicesContent) {

        servicesButton.addEventListener("click", function () {

            const isOpen =
                servicesContent.classList.contains("open");


            if (isOpen) {

                // بستن خدمات

                servicesContent.classList.remove("open");

                servicesButton.classList.remove("active");

                servicesButton.setAttribute(
                    "aria-expanded",
                    "false"
                );


            } else {

                // باز کردن خدمات

                servicesContent.classList.add("open");

                servicesButton.classList.add("active");

                servicesButton.setAttribute(
                    "aria-expanded",
                    "true"
                );

            }

        });

    }


    // ========================================
    // TIME SELECTION
    // ========================================

    const timeButtons =
        document.querySelectorAll(".time-grid button");


    timeButtons.forEach(function (button) {

        button.addEventListener("click", function () {

            // حذف انتخاب قبلی

            timeButtons.forEach(function (item) {

                item.classList.remove("selected");

            });


            // انتخاب ساعت جدید

            button.classList.add("selected");

        });

    });


    // ========================================
    // HEADER BOOKING BUTTON
    // ========================================

    const headerBookingButton =
        document.querySelector(".menu-btn");


    if (headerBookingButton) {

        headerBookingButton.addEventListener(
            "click",
            function () {

                const bookingSection =
                    document.querySelector("#booking");


                if (bookingSection) {

                    bookingSection.scrollIntoView({
                        behavior: "smooth"
                    });

                }

            }
        );

    }


    // ========================================
    // HERO / BOOKING BUTTON
    // ========================================

    const bookingButtons =
        document.querySelectorAll(
            ".hero button, .bridal button"
        );


    bookingButtons.forEach(function (button) {

        button.addEventListener(
            "click",
            function () {

                const bookingSection =
                    document.querySelector("#booking");


                if (bookingSection) {

                    bookingSection.scrollIntoView({
                        behavior: "smooth"
                    });

                }

            }
        );

    });


});
