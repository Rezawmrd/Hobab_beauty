document.addEventListener("DOMContentLoaded", function () {

    /* =========================================================
       SUPABASE
    ========================================================= */

    const SUPABASE_URL =
        "https://oeadtawmcbzblkmfqmbd.supabase.co";

    const SUPABASE_KEY =
        "sb_publishable_1t6kJsgr3IwQkWptFgJ1Iw_Fj1FB4U2";

    const supabaseClient =
        window.supabase.createClient(
            SUPABASE_URL,
            SUPABASE_KEY
        );


    /* =========================================================
       SERVICES
    ========================================================= */

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


    /* =========================================================
       BRIDAL
    ========================================================= */

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


    /* =========================================================
       FORM ELEMENTS
    ========================================================= */

    const serviceInput =
        document.getElementById("service");

    const dateInput =
        document.getElementById("date");

    const descriptionInput =
        document.getElementById("description");

    const nameInput =
        document.getElementById("name");

    const phoneInput =
        document.getElementById("phone");

    const bookingButton =
        document.querySelector(".booking-button");


    /* =========================================================
       TIME SELECTION
    ========================================================= */

    const timeButtons =
        document.querySelectorAll(".time-grid button");

    let selectedTime = null;


    timeButtons.forEach(function (button) {

        button.addEventListener("click", function () {

            timeButtons.forEach(function (item) {

                item.classList.remove("selected");

            });


            button.classList.add("selected");

            selectedTime =
                button.dataset.time;

        });

    });


    /* =========================================================
       JALALI CALENDAR
    ========================================================= */

    if (!dateInput) return;


    const monthNames = [
        "فروردین",
        "اردیبهشت",
        "خرداد",
        "تیر",
        "مرداد",
        "شهریور",
        "مهر",
        "آبان",
        "آذر",
        "دی",
        "بهمن",
        "اسفند"
    ];


    const weekDays = [
        "ش",
        "ی",
        "د",
        "س",
        "چ",
        "پ",
        "ج"
    ];


    /* =========================================================
       JALALI CONVERSION
    ========================================================= */

    function div(a, b) {

        return Math.floor(a / b);

    }


    function gregorianToJalali(gy, gm, gd) {

        const gdm = [
            0, 31, 59, 90, 120, 151,
            181, 212, 243, 273, 304, 334
        ];


        let gy2 =
            gm > 2 ? gy + 1 : gy;


        let days =
            355666 +
            (365 * gy) +
            div(gy2 + 3, 4) -
            div(gy2 + 99, 100) +
            div(gy2 + 399, 400) +
            gd +
            gdm[gm - 1];


        let jy =
            -1595 +
            (33 * div(days, 12053));


        days %= 12053;


        jy +=
            4 * div(days, 1461);


        days %= 1461;


        if (days > 365) {

            jy +=
                div(days - 1, 365);

            days =
                (days - 1) % 365;

        }


        let jm;


        if (days < 186) {

            jm =
                1 + div(days, 31);

        } else {

            jm =
                7 + div(days - 186, 30);

        }


        let jd;


        if (days < 186) {

            jd =
                1 + (days % 31);

        } else {

            jd =
                1 + ((days - 186) % 30);

        }


        return {
            year: jy,
            month: jm,
            day: jd
        };

    }


    function jalaliToGregorian(jy, jm, jd) {

        let jy2 =
            jy + 1595;


        let days =
            -355668 +
            (365 * jy2) +
            (div(jy2, 33) * 8) +
            div((jy2 % 33) + 3, 4) +
            jd;


        if (jm < 7) {

            days +=
                (jm - 1) * 31;

        } else {

            days +=
                ((jm - 7) * 30) + 186;

        }


        let gy =
            400 * div(days, 146097);


        days %= 146097;


        if (days > 36524) {

            gy +=
                100 * div(--days, 36524);

            days %= 36524;


            if (days >= 365) {

                days++;

            }

        }


        gy +=
            4 * div(days, 1461);


        days %= 1461;


        if (days > 365) {

            gy +=
                div(days - 1, 365);

            days =
                (days - 1) % 365;

        }


        let gd =
            days + 1;


        const leap =
            (
                gy % 4 === 0 &&
                gy % 100 !== 0
            ) ||
            (gy % 400 === 0);


        const monthDays = [
            31,
            leap ? 29 : 28,
            31,
            30,
            31,
            30,
            31,
            31,
            30,
            31,
            30,
            31
        ];


        let gm = 1;


        while (
            gd > monthDays[gm - 1]
        ) {

            gd -=
                monthDays[gm - 1];

            gm++;

        }


        return {
            year: gy,
            month: gm,
            day: gd
        };

    }


    function getTodayJalali() {

        const now =
            new Date();


        return gregorianToJalali(
            now.getFullYear(),
            now.getMonth() + 1,
            now.getDate()
        );

    }


    function daysInJalaliMonth(year, month) {

        if (month <= 6) {

            return 31;

        }


        if (month <= 11) {

            return 30;

        }


        const nextYear =
            jalaliToGregorian(
                year + 1,
                1,
                1
            );


        const currentYear =
            jalaliToGregorian(
                year,
                1,
                1
            );


        const difference =
            Math.round(
                (
                    new Date(
                        nextYear.year,
                        nextYear.month - 1,
                        nextYear.day
                    ) -

                    new Date(
                        currentYear.year,
                        currentYear.month - 1,
                        currentYear.day
                    )
                ) /
                86400000
            );


        return difference === 366
            ? 30
            : 29;

    }


    /* =========================================================
       CALENDAR STATE
    ========================================================= */

    const today =
        getTodayJalali();


    let currentYear =
        today.year;


    let currentMonth =
        today.month;


    let selectedDate = null;


    /* =========================================================
       CALENDAR HTML
    ========================================================= */

    const calendarOverlay =
        document.createElement("div");


    calendarOverlay.className =
        "jalali-calendar-overlay";


    calendarOverlay.innerHTML = `

        <div class="jalali-calendar">

            <div class="jalali-calendar-header">

                <button
                    type="button"
                    class="jalali-close"
                >
                    ×
                </button>

                <div class="jalali-title"></div>

                <button
                    type="button"
                    class="jalali-today"
                >
                    امروز
                </button>

            </div>


            <div class="jalali-navigation">

                <button
                    type="button"
                    class="jalali-next"
                >
                    ‹
                </button>


                <div class="jalali-month-title"></div>


                <button
                    type="button"
                    class="jalali-prev"
                >
                    ›
                </button>

            </div>


            <div class="jalali-weekdays">

                ${weekDays.map(day => `
                    <span>${day}</span>
                `).join("")}

            </div>


            <div class="jalali-days"></div>

        </div>

    `;


    document.body.appendChild(
        calendarOverlay
    );


    const calendar =
        calendarOverlay.querySelector(
            ".jalali-calendar"
        );


    const daysContainer =
        calendarOverlay.querySelector(
            ".jalali-days"
        );


    const monthTitle =
        calendarOverlay.querySelector(
            ".jalali-month-title"
        );


    const title =
        calendarOverlay.querySelector(
            ".jalali-title"
        );


    /* =========================================================
       RENDER CALENDAR
    ========================================================= */

    function renderCalendar() {

        monthTitle.textContent =
            `${monthNames[currentMonth - 1]} ${currentYear}`;


        title.textContent =
            "انتخاب تاریخ";


        daysContainer.innerHTML = "";


        const firstDay =
            jalaliToGregorian(
                currentYear,
                currentMonth,
                1
            );


        const firstDate =
            new Date(
                firstDay.year,
                firstDay.month - 1,
                firstDay.day
            );


        let weekDay =
            firstDate.getDay();


        weekDay =
            (weekDay + 1) % 7;


        for (
            let i = 0;
            i < weekDay;
            i++
        ) {

            const empty =
                document.createElement("span");


            empty.className =
                "jalali-empty";


            daysContainer.appendChild(
                empty
            );

        }


        const totalDays =
            daysInJalaliMonth(
                currentYear,
                currentMonth
            );


        for (
            let day = 1;
            day <= totalDays;
            day++
        ) {

            const button =
                document.createElement("button");


            button.type =
                "button";


            button.textContent =
                day;


            if (
                currentYear === today.year &&
                currentMonth === today.month &&
                day === today.day
            ) {

                button.classList.add(
                    "today"
                );

            }


            if (
                selectedDate &&
                selectedDate.year === currentYear &&
                selectedDate.month === currentMonth &&
                selectedDate.day === day
            ) {

                button.classList.add(
                    "selected"
                );

            }


            button.addEventListener(
                "click",
                function () {

                    selectedDate = {

                        year:
                            currentYear,

                        month:
                            currentMonth,

                        day:
                            day

                    };


                    dateInput.value =
                        `${currentYear}/${String(currentMonth).padStart(2, "0")}/${String(day).padStart(2, "0")}`;


                    closeCalendar();

                    renderCalendar();

                }
            );


            daysContainer.appendChild(
                button
            );

        }

    }


    /* =========================================================
       OPEN / CLOSE CALENDAR
    ========================================================= */

    function openCalendar() {

        renderCalendar();


        calendarOverlay.classList.add(
            "open"
        );


        document.body.classList.add(
            "calendar-open"
        );

    }


    function closeCalendar() {

        calendarOverlay.classList.remove(
            "open"
        );


        document.body.classList.remove(
            "calendar-open"
        );

    }


    dateInput.addEventListener(
        "click",
        openCalendar
    );


    calendarOverlay.addEventListener(
        "click",
        function (event) {

            if (
                event.target ===
                calendarOverlay
            ) {

                closeCalendar();

            }

        }
    );


    calendar
        .querySelector(".jalali-close")
        .addEventListener(
            "click",
            closeCalendar
        );


    /* =========================================================
       TODAY
    ========================================================= */

    calendar
        .querySelector(".jalali-today")
        .addEventListener(
            "click",
            function () {

                currentYear =
                    today.year;


                currentMonth =
                    today.month;


                renderCalendar();

            }
        );


    /* =========================================================
       PREVIOUS MONTH
    ========================================================= */

    calendar
        .querySelector(".jalali-prev")
        .addEventListener(
            "click",
            function () {

                currentMonth--;


                if (currentMonth < 1) {

                    currentMonth =
                        12;

                    currentYear--;

                }


                renderCalendar();

            }
        );


    /* =========================================================
       NEXT MONTH
    ========================================================= */

    calendar
        .querySelector(".jalali-next")
        .addEventListener(
            "click",
            function () {

                currentMonth++;


                if (currentMonth > 12) {

                    currentMonth =
                        1;

                    currentYear++;

                }


                renderCalendar();

            }
        );


    /* =========================================================
       ESC CLOSE
    ========================================================= */

    document.addEventListener(
        "keydown",
        function (event) {

            if (
                event.key === "Escape"
            ) {

                closeCalendar();

            }

        }
    );


    /* =========================================================
       BOOKING MESSAGE
    ========================================================= */

    function showBookingMessage(
        message,
        type = "success"
    ) {

        let messageBox =
            document.querySelector(
                ".booking-message"
            );


        if (!messageBox) {

            messageBox =
                document.createElement("div");

            messageBox.className =
                "booking-message";

            bookingButton
                .parentNode
                .insertBefore(
                    messageBox,
                    bookingButton
                );

        }


        messageBox.textContent =
            message;


        messageBox.classList.remove(
            "success",
            "error"
        );


        messageBox.classList.add(
            type
        );


        messageBox.scrollIntoView({
            behavior: "smooth",
            block: "center"
        });

    }


    /* =========================================================
       BOOKING SUBMIT
    ========================================================= */

    if (bookingButton) {

        bookingButton.addEventListener(
            "click",
            async function () {

                /* -----------------------------------------
                   GET VALUES
                ----------------------------------------- */

                const service =
                    serviceInput
                        ? serviceInput.value.trim()
                        : "";


                const date =
                    dateInput
                        ? dateInput.value.trim()
                        : "";


                const description =
                    descriptionInput
                        ? descriptionInput.value.trim()
                        : "";


                const name =
                    nameInput
                        ? nameInput.value.trim()
                        : "";


                const phone =
                    phoneInput
                        ? phoneInput.value.trim()
                        : "";


                /* -----------------------------------------
                   VALIDATION
                ----------------------------------------- */

                if (!service) {

                    showBookingMessage(
                        "لطفاً خدمت موردنظر خود را انتخاب کنید.",
                        "error"
                    );

                    serviceInput.focus();

                    return;

                }


                if (!date) {

                    showBookingMessage(
                        "لطفاً تاریخ موردنظر خود را انتخاب کنید.",
                        "error"
                    );

                    dateInput.focus();

                    return;

                }


                if (!selectedTime) {

                    showBookingMessage(
                        "لطفاً ساعت موردنظر خود را انتخاب کنید.",
                        "error"
                    );

                    return;

                }


                if (!description) {

                    showBookingMessage(
                        "لطفاً توضیحات خود را در مورد خدمات موردنظر بنویسید.",
                        "error"
                    );

                    descriptionInput.focus();

                    return;

                }


                if (!name) {

                    showBookingMessage(
                        "لطفاً نام و نام خانوادگی خود را وارد کنید.",
                        "error"
                    );

                    nameInput.focus();

                    return;

                }


                if (!phone) {

                    showBookingMessage(
                        "لطفاً شماره تماس خود را وارد کنید.",
                        "error"
                    );

                    phoneInput.focus();

                    return;

                }


                /* -----------------------------------------
                   PHONE VALIDATION
                ----------------------------------------- */

                const cleanPhone =
                    phone.replace(
                        /[\s\-()]/g,
                        ""
                    );


                if (
                    cleanPhone.length < 10
                ) {

                    showBookingMessage(
                        "لطفاً یک شماره تماس معتبر وارد کنید.",
                        "error"
                    );

                    phoneInput.focus();

                    return;

                }


                /* -----------------------------------------
                   PREVENT DOUBLE SUBMIT
                ----------------------------------------- */

                bookingButton.disabled =
                    true;


                const originalText =
                    bookingButton.textContent;


                bookingButton.textContent =
                    "در حال ثبت درخواست...";


                /* -----------------------------------------
                   SEND TO SUPABASE
                ----------------------------------------- */

                try {

                    const {
                        error
                    } =
                        await supabaseClient
                            .from("appointments")
                            .insert({

                                service:
                                    service,

                                date:
                                    date,

                                time:
                                    selectedTime,

                                description:
                                    description,

                                name:
                                    name,

                                phone:
                                    cleanPhone

                            });


                    if (error) {

                        console.error(
                            "Supabase error:",
                            error
                        );


                        showBookingMessage(
                            "ثبت رزرو انجام نشد. لطفاً دوباره تلاش کنید.",
                            "error"
                        );


                        return;

                    }


                    /* -----------------------------------------
                       SUCCESS
                    ----------------------------------------- */

                    showBookingMessage(
                        "درخواست رزرو شما با موفقیت ثبت شد.",
                        "success"
                    );


                    /* -----------------------------------------
                       RESET FORM
                    ----------------------------------------- */

                    if (serviceInput) {

                        serviceInput.value =
                            "";

                    }


                    if (dateInput) {

                        dateInput.value =
                            "";

                    }


                    if (descriptionInput) {

                        descriptionInput.value =
                            "";

                    }


                    if (nameInput) {

                        nameInput.value =
                            "";

                    }


                    if (phoneInput) {

                        phoneInput.value =
                            "";

                    }


                    timeButtons.forEach(
                        function (button) {

                            button.classList.remove(
                                "selected"
                            );

                        }
                    );


                    selectedTime =
                        null;


                    selectedDate =
                        null;


                } catch (error) {

                    console.error(
                        "Booking error:",
                        error
                    );


                    showBookingMessage(
                        "خطایی هنگام ثبت درخواست رخ داد. لطفاً دوباره تلاش کنید.",
                        "error"
                    );

                } finally {

                    bookingButton.disabled =
                        false;


                    bookingButton.textContent =
                        originalText;

                }

            }
        );

    }

});
