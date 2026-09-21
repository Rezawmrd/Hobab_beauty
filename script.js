document.addEventListener("DOMContentLoaded", function () {

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
       FORM
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

    const timeButtons =
        document.querySelectorAll(".time-grid button");


    let selectedTime = null;
    let bookedTimes = new Set();


    /* =========================================================
       CONVERT PERSIAN / ARABIC DIGITS TO ENGLISH
    ========================================================= */

    function convertDigitsToEnglish(value) {

        return String(value)
            .replace(/[۰-۹]/g, function (digit) {

                return "۰۱۲۳۴۵۶۷۸۹".indexOf(digit);

            })
            .replace(/[٠-٩]/g, function (digit) {

                return "٠١٢٣٤٥٦٧٨٩".indexOf(digit);

            });
    }


    /* =========================================================
       RESET TIME BUTTONS
    ========================================================= */

    function resetTimeButtons() {

        timeButtons.forEach(function (button) {

            button.disabled = false;

            button.classList.remove(
                "booked",
                "selected",
                "passed"
            );

            button.removeAttribute(
                "aria-disabled"
            );

            button.removeAttribute(
                "data-booked-count"
            );
        });

        selectedTime = null;
        bookedTimes = new Set();
    }


    /* =========================================================
       LOCK PASSED TIMES — IRAN TIME
    ========================================================= */

    function lockPassedTimes() {

        if (!dateInput) {
            return;
        }


        const selectedDateValue =
            dateInput.value.trim();


        if (!selectedDateValue) {
            return;
        }


        /*
           دریافت تاریخ امروز بر اساس ساعت ایران
        */

        const iranDateParts =
            new Intl.DateTimeFormat("en-US", {
                timeZone: "Asia/Tehran",
                year: "numeric",
                month: "2-digit",
                day: "2-digit"
            }).formatToParts(new Date());


        let iranYear = "";
        let iranMonth = "";
        let iranDay = "";


        iranDateParts.forEach(function (part) {

            if (part.type === "year") {
                iranYear = part.value;
            }

            if (part.type === "month") {
                iranMonth = part.value;
            }

            if (part.type === "day") {
                iranDay = part.value;
            }
        });


        /*
           تبدیل امروز میلادی ایران به جلالی
        */

        const todayJalaliIran =
            gregorianToJalali(
                Number(iranYear),
                Number(iranMonth),
                Number(iranDay)
            );


        const todayJalaliValue =
            `${todayJalaliIran.year}/${String(todayJalaliIran.month).padStart(2, "0")}/${String(todayJalaliIran.day).padStart(2, "0")}`;


        /*
           فقط اگر تاریخ انتخاب شده امروز باشد،
           ساعت‌های گذشته قفل می‌شوند.
        */

        if (
            selectedDateValue !==
            todayJalaliValue
        ) {

            return;
        }


        /*
           دریافت ساعت و دقیقه فعلی ایران
        */

        const currentTime =
            new Intl.DateTimeFormat("en-GB", {
                timeZone: "Asia/Tehran",
                hour: "2-digit",
                minute: "2-digit",
                hour12: false
            }).format(new Date());


        const timeParts =
            currentTime.split(":");


        const currentMinutes =
            Number(timeParts[0]) * 60 +
            Number(timeParts[1]);


        /*
           بررسی تمام ساعت‌ها
        */

        timeButtons.forEach(function (button) {

            const time =
                button.dataset.time;


            if (!time) {
                return;
            }


            const parts =
                time.split(":");


            const buttonMinutes =
                Number(parts[0]) * 60 +
                Number(parts[1]);


            /*
               ساعت‌های گذشته قفل شوند
            */

            if (
                buttonMinutes <
                currentMinutes
            ) {

                button.disabled = true;


                button.classList.remove(
                    "selected"
                );


                button.classList.add(
                    "passed"
                );


                button.setAttribute(
                    "aria-disabled",
                    "true"
                );


                if (
                    selectedTime === time
                ) {

                    selectedTime = null;
                }


            } else {

                button.classList.remove(
                    "passed"
                );
            }
        });
    }


    /* =========================================================
       TIME BUTTONS
    ========================================================= */

    timeButtons.forEach(function (button) {

        button.addEventListener("click", function () {

            if (button.disabled) {
                return;
            }


            timeButtons.forEach(function (item) {

                item.classList.remove(
                    "selected"
                );
            });


            button.classList.add(
                "selected"
            );


            selectedTime =
                button.dataset.time;
        });
    });


    /* =========================================================
       JALALI CALENDAR
    ========================================================= */

    if (!dateInput) {
        return;
    }


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


    function div(a, b) {
        return Math.floor(a / b);
    }


    function gregorianToJalali(
        gy,
        gm,
        gd
    ) {

        const gdm = [
            0, 31, 59, 90, 120, 151,
            181, 212, 243, 273, 304, 334
        ];


        let gy2 =
            gm > 2
                ? gy + 1
                : gy;


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
                7 + div(
                    days - 186,
                    30
                );
        }


        let jd;


        if (days < 186) {

            jd =
                1 + (days % 31);

        } else {

            jd =
                1 +
                (
                    (days - 186) % 30
                );
        }


        return {
            year: jy,
            month: jm,
            day: jd
        };
    }


    function jalaliToGregorian(
        jy,
        jm,
        jd
    ) {

        let jy2 =
            jy + 1595;


        let days =
            -355668 +
            (365 * jy2) +
            (div(jy2, 33) * 8) +
            div(
                (jy2 % 33) + 3,
                4
            ) +
            jd;


        if (jm < 7) {

            days +=
                (jm - 1) * 31;

        } else {

            days +=
                ((jm - 7) * 30) +
                186;
        }


        let gy =
            400 *
            div(
                days,
                146097
            );


        days %=
            146097;


        if (days > 36524) {

            gy +=
                100 *
                div(
                    --days,
                    36524
                );


            days %=
                36524;


            if (days >= 365) {
                days++;
            }
        }


        gy +=
            4 *
            div(
                days,
                1461
            );


        days %=
            1461;


        if (days > 365) {

            gy +=
                div(
                    days - 1,
                    365
                );


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
            (
                gy % 400 === 0
            );


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
            gd >
            monthDays[gm - 1]
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


    function daysInJalaliMonth(
        year,
        month
    ) {

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


    const today =
        getTodayJalali();


    let currentYear =
        today.year;


    let currentMonth =
        today.month;


    let selectedDate =
        null;


    /* =========================================================
       CALENDAR
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

                <div class="jalali-title">
                    انتخاب تاریخ
                </div>

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

                ${weekDays.map(function(day) {

                    return `<span>${day}</span>`;

                }).join("")}

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


    function renderCalendar() {

        monthTitle.textContent =
            `${monthNames[currentMonth - 1]} ${currentYear}`;


        title.textContent =
            "انتخاب تاریخ";


        daysContainer.innerHTML =
            "";


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
                document.createElement(
                    "span"
                );


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
                document.createElement(
                    "button"
                );


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
                async function () {

                    selectedDate = {

                        year:
                            currentYear,

                        month:
                            currentMonth,

                        day:
                            day
                    };


                    const formattedDate =
                        `${currentYear}/${String(currentMonth).padStart(2, "0")}/${String(day).padStart(2, "0")}`;


                    dateInput.value =
                        formattedDate;


                    closeCalendar();


                    renderCalendar();


                    resetTimeButtons();


                    const service =
                        serviceInput
                            ? serviceInput.value.trim()
                            : "";


                    if (service) {

                        await loadBookedTimes(
                            service,
                            formattedDate
                        );

                    } else {

                        /*
                           اگر خدمتی انتخاب نشده باشد،
                           باز هم ساعت‌های گذشته
                           باید برای امروز قفل شوند.
                        */

                        lockPassedTimes();
                    }
                }
            );


            daysContainer.appendChild(
                button
            );
        }
    }


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
        .querySelector(
            ".jalali-close"
        )
        .addEventListener(
            "click",
            closeCalendar
        );


    calendar
        .querySelector(
            ".jalali-today"
        )
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


    calendar
        .querySelector(
            ".jalali-prev"
        )
        .addEventListener(
            "click",
            function () {

                currentMonth--;


                if (
                    currentMonth < 1
                ) {

                    currentMonth =
                        12;

                    currentYear--;
                }


                renderCalendar();
            }
        );


    calendar
        .querySelector(
            ".jalali-next"
        )
        .addEventListener(
            "click",
            function () {

                currentMonth++;


                if (
                    currentMonth > 12
                ) {

                    currentMonth =
                        1;

                    currentYear++;
                }


                renderCalendar();
            }
        );


    /* =========================================================
       LOAD BOOKED TIMES
       CAPACITY = 3
    ========================================================= */

    async function loadBookedTimes(
        service,
        date,
        preserveSelectedTime = false
    ) {

        const previousSelectedTime =
            selectedTime;


        bookedTimes =
            new Set();


        timeButtons.forEach(function (button) {

            button.disabled = false;

            button.classList.remove(
                "booked",
                "selected",
                "passed"
            );

            button.removeAttribute(
                "aria-disabled"
            );

            button.removeAttribute(
                "data-booked-count"
            );
        });


        if (!preserveSelectedTime) {
            selectedTime = null;
        }


        if (!service || !date) {

            lockPassedTimes();

            return;
        }


        try {

            const result =
                await supabaseClient
                    .rpc(
                        "get_booked_times",
                        {
                            p_service: service,
                            p_date: date
                        }
                    );


            if (result.error) {

                console.error(
                    "Booked times error:",
                    result.error
                );


                /*
                   حتی اگر Supabase خطا بدهد،
                   ساعت‌های گذشته همچنان قفل شوند.
                */

                lockPassedTimes();

                return;
            }


            const rows =
                result.data || [];


            rows.forEach(function (row) {

                const time =
                    row.booked_time;


                const count =
                    Number(
                        row.booked_count || 0
                    );


                if (!time) {
                    return;
                }


                /*
                   ظرفیت کامل = 3 نفر
                */

                if (count >= 3) {

                    bookedTimes.add(time);


                    const button =
                        Array.from(
                            timeButtons
                        ).find(function (item) {

                            return (
                                item.dataset.time ===
                                time
                            );

                        });


                    if (button) {

                        button.disabled = true;


                        button.classList.add(
                            "booked"
                        );


                        button.setAttribute(
                            "aria-disabled",
                            "true"
                        );


                        button.setAttribute(
                            "data-booked-count",
                            "3"
                        );
                    }

                } else {

                    /*
                       ظرفیت هنوز باقی مانده
                    */

                    const button =
                        Array.from(
                            timeButtons
                        ).find(function (item) {

                            return (
                                item.dataset.time ===
                                time
                            );

                        });


                    if (button) {

                        button.setAttribute(
                            "data-booked-count",
                            String(count)
                        );
                    }
                }
            });


            /* =================================================
               RESTORE SELECTED TIME
            ================================================= */

            if (
                preserveSelectedTime &&
                previousSelectedTime &&
                !bookedTimes.has(
                    previousSelectedTime
                )
            ) {

                const selectedButton =
                    Array.from(
                        timeButtons
                    ).find(function (button) {

                        return (
                            button.dataset.time ===
                            previousSelectedTime
                        );
                    });


                if (selectedButton) {

                    selectedButton.classList.add(
                        "selected"
                    );


                    selectedTime =
                        previousSelectedTime;
                }
            }


            /* =================================================
               SELECTED TIME WAS JUST FILLED
            ================================================= */

            if (
                preserveSelectedTime &&
                previousSelectedTime &&
                bookedTimes.has(
                    previousSelectedTime
                )
            ) {

                selectedTime = null;
            }


            /* =================================================
               LOCK PASSED TIMES
            ================================================= */

            lockPassedTimes();


        } catch (error) {

            console.error(
                "Load booked times error:",
                error
            );


            /*
               در صورت خطا هم ساعت‌های گذشته قفل شوند.
            */

            lockPassedTimes();
        }
    }


    /* =========================================================
       SERVICE CHANGE
    ========================================================= */

    if (serviceInput) {

        serviceInput.addEventListener(
            "change",
            async function () {

                resetTimeButtons();


                const service =
                    serviceInput.value.trim();


                const date =
                    dateInput
                        ? dateInput.value.trim()
                        : "";


                if (
                    service &&
                    date
                ) {

                    await loadBookedTimes(
                        service,
                        date
                    );

                } else {

                    lockPassedTimes();
                }
            }
        );
    }


    /* =========================================================
       BOOKING MESSAGE
    ========================================================= */

    function createBookingMessage() {

        let overlay =
            document.querySelector(
                ".booking-message-overlay"
            );


        if (overlay) {
            return overlay;
        }


        overlay =
            document.createElement(
                "div"
            );


        overlay.className =
            "booking-message-overlay";


        overlay.innerHTML = `
            <div class="booking-message-card">

                <div class="booking-message-icon">
                    ✓
                </div>

                <h3 class="booking-message-title">
                    رزرو با موفقیت ثبت شد
                </h3>

                <p class="booking-message-text"></p>

                <button
                    type="button"
                    class="booking-message-close"
                >
                    متوجه شدم
                </button>

            </div>
        `;


        document.body.appendChild(
            overlay
        );


        overlay
            .querySelector(
                ".booking-message-close"
            )
            .addEventListener(
                "click",
                closeBookingMessage
            );


        overlay.addEventListener(
            "click",
            function (event) {

                if (
                    event.target ===
                    overlay
                ) {

                    closeBookingMessage();
                }
            }
        );


        return overlay;
    }


    function closeBookingMessage() {

        const overlay =
            document.querySelector(
                ".booking-message-overlay"
            );


        if (!overlay) {
            return;
        }


        overlay.classList.remove(
            "open"
        );


        document.body.classList.remove(
            "booking-message-open"
        );
    }


    function showBookingMessage(
        message,
        type = "success"
    ) {

        const overlay =
            createBookingMessage();


        const icon =
            overlay.querySelector(
                ".booking-message-icon"
            );


        const messageTitle =
            overlay.querySelector(
                ".booking-message-title"
            );


        const messageText =
            overlay.querySelector(
                ".booking-message-text"
            );


        if (type === "success") {

            icon.textContent =
                "✓";


            messageTitle.textContent =
                "رزرو با موفقیت ثبت شد";


            messageText.textContent =
                "درخواست نوبت شما با موفقیت ثبت شد. اطلاعات شما در سیستم ذخیره گردید.";

        } else {

            icon.textContent =
                "!";


            messageTitle.textContent =
                "ثبت رزرو انجام نشد";


            messageText.textContent =
                message;
        }


        overlay.classList.remove(
            "success",
            "error"
        );


        overlay.classList.add(
            type
        );


        document.body.classList.add(
            "booking-message-open"
        );


        requestAnimationFrame(
            function () {

                overlay.classList.add(
                    "open"
                );
            }
        );
    }


    /* =========================================================
       ESC
    ========================================================= */

    document.addEventListener(
        "keydown",
        function (event) {

            if (
                event.key === "Escape"
            ) {

                closeCalendar();
                closeBookingMessage();
            }
        }
    );


    /* =========================================================
       BOOKING
    ========================================================= */

    if (bookingButton) {

        bookingButton.addEventListener(
            "click",
            async function () {

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


                /* VALIDATION */

                if (!service) {

                    showBookingMessage(
                        "لطفاً خدمت موردنظر خود را انتخاب کنید.",
                        "error"
                    );


                    if (serviceInput) {
                        serviceInput.focus();
                    }


                    return;
                }


                if (!date) {

                    showBookingMessage(
                        "لطفاً تاریخ موردنظر خود را انتخاب کنید.",
                        "error"
                    );


                    if (dateInput) {
                        dateInput.focus();
                    }


                    return;
                }


                if (!selectedTime) {

                    showBookingMessage(
                        "لطفاً ساعت موردنظر خود را انتخاب کنید.",
                        "error"
                    );


                    return;
                }


                const timeToBook =
                    selectedTime;


                /* DESCRIPTION */

                if (!description) {

                    showBookingMessage(
                        "لطفاً توضیحات خود را در مورد خدمات موردنظر بنویسید.",
                        "error"
                    );


                    if (descriptionInput) {
                        descriptionInput.focus();
                    }


                    return;
                }


                /* NAME */

                if (!name) {

                    showBookingMessage(
                        "لطفاً نام و نام خانوادگی خود را وارد کنید.",
                        "error"
                    );


                    if (nameInput) {
                        nameInput.focus();
                    }


                    return;
                }


                /* PHONE */

                if (!phone) {

                    showBookingMessage(
                        "لطفاً شماره تماس خود را وارد کنید.",
                        "error"
                    );


                    if (phoneInput) {
                        phoneInput.focus();
                    }


                    return;
                }


                /* =================================================
                   PHONE NORMALIZATION
                ================================================= */

                const cleanPhone =
                    convertDigitsToEnglish(phone)
                        .replace(
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


                    if (phoneInput) {
                        phoneInput.focus();
                    }


                    return;
                }


                /* =================================================
                   DISABLE BUTTON
                ================================================= */

                bookingButton.disabled =
                    true;


                const originalText =
                    bookingButton.textContent;


                bookingButton.textContent =
                    "در حال ثبت درخواست...";


                try {

                    /* =================================================
                       ثبت رزرو از طریق RPC
                       ظرفیت حداکثر 3 نفر
                    ================================================= */

                    const result =
                        await supabaseClient
                            .rpc(
                                "create_appointment",
                                {
                                    p_service:
                                        service,

                                    p_date:
                                        date,

                                    p_time:
                                        timeToBook,

                                    p_description:
                                        description,

                                    p_name:
                                        name,

                                    p_phone:
                                        cleanPhone
                                }
                            );


                    if (result.error) {

                        console.error(
                            "Create appointment error:",
                            result.error
                        );


                        showBookingMessage(
                            "ثبت رزرو انجام نشد. لطفاً دوباره تلاش کنید.",
                            "error"
                        );


                        return;
                    }


                    const response =
                        result.data;


                    /* =================================================
                       ظرفیت پر شده
                    ================================================= */

                    if (
                        response &&
                        response.success === false
                    ) {

                        await loadBookedTimes(
                            service,
                            date,
                            false
                        );


                        showBookingMessage(
                            response.message ||
                            "این ساعت ظرفیت کامل دارد. لطفاً ساعت دیگری انتخاب کنید.",
                            "error"
                        );


                        return;
                    }


                    /* =================================================
                       SUCCESS
                    ================================================= */

                    showBookingMessage(
                        "",
                        "success"
                    );


                    if (serviceInput) {
                        serviceInput.value = "";
                    }


                    if (dateInput) {
                        dateInput.value = "";
                    }


                    if (descriptionInput) {
                        descriptionInput.value = "";
                    }


                    if (nameInput) {
                        nameInput.value = "";
                    }


                    if (phoneInput) {
                        phoneInput.value = "";
                    }


                    resetTimeButtons();


                    selectedDate =
                        null;


                    bookedTimes =
                        new Set();


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
