document.addEventListener("DOMContentLoaded", function () {

    /* =========================
       SUPABASE
    ========================= */

    const SUPABASE_URL =
        "https://oeadtawmcbzblkmfqmbd.supabase.co";

    const SUPABASE_KEY =
        "sb_publishable_1t6kJsgr3IwQkWptFgJ1Iw_Fj1FB4U2";

    const supabaseClient =
        window.supabase.createClient(
            SUPABASE_URL,
            SUPABASE_KEY
        );


    /* =========================
       SERVICES ACCORDION
    ========================= */

    const servicesToggle =
        document.getElementById("servicesToggle");

    const servicesContent =
        document.getElementById("servicesContent");

    if (servicesToggle && servicesContent) {

        servicesToggle.addEventListener("click", function () {

            servicesToggle.classList.toggle("active");
            servicesContent.classList.toggle("open");

        });

    }


    /* =========================
       BRIDAL ACCORDION
    ========================= */

    const bridalToggle =
        document.getElementById("bridalToggle");

    const bridalContent =
        document.getElementById("bridalContent");

    if (bridalToggle && bridalContent) {

        bridalToggle.addEventListener("click", function () {

            bridalToggle.classList.toggle("active");
            bridalContent.classList.toggle("open");

        });

    }


    /* =========================
       FORM ELEMENTS
    ========================= */

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
        document.getElementById("bookingButton");

    const timeButtons =
        document.querySelectorAll(".time-grid button");


    /* =========================
       SELECTED TIME
    ========================= */

    let selectedTime = null;


    /* =========================
       DIGIT CONVERSION
    ========================= */

    function convertDigitsToEnglish(value) {

        if (!value) return value;

        return value
            .replace(/[۰-۹]/g, function (digit) {
                return String(
                    "۰۱۲۳۴۵۶۷۸۹".indexOf(digit)
                );
            })
            .replace(/[٠-٩]/g, function (digit) {
                return String(
                    "٠١٢٣٤٥٦٧٨٩".indexOf(digit)
                );
            });
    }


    /* =========================
       RESET TIME BUTTONS
    ========================= */

    function resetTimeButtons() {

        selectedTime = null;

        timeButtons.forEach(function (button) {

            button.classList.remove("selected");
            button.classList.remove("active");

            button.disabled = false;

        });

    }


    /* =========================
       TIME BUTTONS
    ========================= */

    timeButtons.forEach(function (button) {

        button.addEventListener("click", function () {

            timeButtons.forEach(function (item) {

                item.classList.remove("selected");
                item.classList.remove("active");

            });

            button.classList.add("selected");
            button.classList.add("active");

            selectedTime =
                button.dataset.time;

        });

    });


    /* =========================
       JALALI CALENDAR
    ========================= */

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


    function div(className) {

        const element =
            document.createElement("div");

        if (className) {
            element.className = className;
        }

        return element;
    }


    /* =========================
       GREGORIAN → JALALI
    ========================= */

    function gregorianToJalali(
        gy,
        gm,
        gd
    ) {

        const g_d_m = [
            0,
            31,
            59,
            90,
            120,
            151,
            181,
            212,
            243,
            273,
            304,
            334
        ];

        let jy;

        if (gy > 1600) {

            jy = 979;

            gy -= 1600;

        } else {

            jy = 0;

            gy -= 621;

        }

        const gy2 =
            gm > 2
                ? gy + 1
                : gy;

        let days =
            365 * gy +
            Math.floor(
                (gy2 + 3) / 4
            ) -
            Math.floor(
                (gy2 + 99) / 100
            ) +
            Math.floor(
                (gy2 + 399) / 400
            ) -
            80 +
            gd +
            g_d_m[gm - 1];

        jy +=
            33 *
            Math.floor(days / 12053);

        days %= 12053;

        jy +=
            4 *
            Math.floor(days / 1461);

        days %= 1461;

        if (days > 365) {

            jy +=
                Math.floor(
                    (days - 1) / 365
                );

            days =
                (days - 1) % 365;

        }

        let jm;

        if (days < 186) {

            jm =
                1 +
                Math.floor(days / 31);

        } else {

            jm =
                7 +
                Math.floor(
                    (days - 186) / 30
                );

        }

        const jd =
            1 +
            (
                days < 186
                    ? days % 31
                    : (days - 186) % 30
            );

        return [
            jy,
            jm,
            jd
        ];

    }


    /* =========================
       JALALI → GREGORIAN
    ========================= */

    function jalaliToGregorian(
        jy,
        jm,
        jd
    ) {

        jy += 1595;

        let days =
            -355668 +
            365 * jy +
            Math.floor(jy / 33) * 8 +
            Math.floor(
                ((jy % 33) + 3) / 4
            ) +
            jd;

        if (jm < 7) {

            days +=
                (jm - 1) * 31;

        } else {

            days +=
                (jm - 7) * 30 +
                186;

        }

        let gy =
            400 *
            Math.floor(days / 146097);

        days %= 146097;

        if (days > 36524) {

            gy +=
                100 *
                Math.floor(
                    --days / 36524
                );

            days %= 36524;

            if (days >= 365) {
                days++;
            }

        }

        gy +=
            4 *
            Math.floor(days / 1461);

        days %= 1461;

        if (days > 365) {

            gy +=
                Math.floor(
                    (days - 1) / 365
                );

            days =
                (days - 1) % 365;

        }

        const gd =
            days + 1;

        const sal_a = [
            0,
            31,
            (
                gy % 4 === 0 &&
                gy % 100 !== 0
            ) ||
            gy % 400 === 0
                ? 29
                : 28,
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

        let gm = 0;
        let dayCount = 0;

        while (
            gm < 13 &&
            dayCount + sal_a[gm] < gd
        ) {

            dayCount +=
                sal_a[gm];

            gm++;

        }

        return [
            gy,
            gm,
            gd - dayCount
        ];

    }


    /* =========================
       IRAN TODAY
    ========================= */

    function getIranTodayJalali() {

        const now =
            new Date();

        const iranTime =
            new Date(
                now.toLocaleString(
                    "en-US",
                    {
                        timeZone:
                            "Asia/Tehran"
                    }
                )
            );

        return gregorianToJalali(
            iranTime.getFullYear(),
            iranTime.getMonth() + 1,
            iranTime.getDate()
        );

    }


    /* =========================
       TODAY
    ========================= */

    function getTodayJalali() {

        return getIranTodayJalali();

    }


    /* =========================
       DAYS IN JALALI MONTH
    ========================= */

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
            year + 1;

        const current =
            jalaliToGregorian(
                year,
                12,
                29
            );

        const next =
            jalaliToGregorian(
                nextYear,
                1,
                1
            );

        return (
            next[2] === 1 &&
            next[1] === 1
        )
            ? 30
            : 29;

    }


    /* =========================
       CALENDAR ELEMENTS
    ========================= */

    const calendarOverlay =
        document.createElement("div");

    calendarOverlay.className =
        "calendar-overlay";

    calendarOverlay.innerHTML = `

        <div class="calendar-box">

            <div class="calendar-header">

                <button
                    type="button"
                    class="calendar-prev"
                >
                    ‹
                </button>

                <div
                    class="calendar-title"
                ></div>

                <button
                    type="button"
                    class="calendar-next"
                >
                    ›
                </button>

            </div>

            <div
                class="calendar-weekdays"
            ></div>

            <div
                class="calendar-days"
            ></div>

            <button
                type="button"
                class="calendar-today"
            >
                امروز
            </button>

        </div>

    `;

    document.body.appendChild(
        calendarOverlay
    );


    const calendarTitle =
        calendarOverlay.querySelector(
            ".calendar-title"
        );

    const calendarDays =
        calendarOverlay.querySelector(
            ".calendar-days"
        );

    const calendarWeekdays =
        calendarOverlay.querySelector(
            ".calendar-weekdays"
        );

    const calendarPrev =
        calendarOverlay.querySelector(
            ".calendar-prev"
        );

    const calendarNext =
        calendarOverlay.querySelector(
            ".calendar-next"
        );

    const calendarToday =
        calendarOverlay.querySelector(
            ".calendar-today"
        );


    weekDays.forEach(function (day) {

        const element =
            document.createElement("div");

        element.textContent = day;

        calendarWeekdays.appendChild(
            element
        );

    });


    let calendarYear;
    let calendarMonth;


    /* =========================
       CALENDAR RENDER
    ========================= */

    function renderCalendar() {

        calendarTitle.textContent =
            `${monthNames[calendarMonth - 1]} ${calendarYear}`;

        calendarDays.innerHTML = "";

        const firstDayGregorian =
            jalaliToGregorian(
                calendarYear,
                calendarMonth,
                1
            );

        const firstDate =
            new Date(
                firstDayGregorian[0],
                firstDayGregorian[1] - 1,
                firstDayGregorian[2]
            );

        let startDay =
            firstDate.getDay();

        /*
          JS:
          Sunday = 0
          Monday = 1
          ...
          Saturday = 6

          Persian calendar starts Saturday.
        */

        startDay =
            (startDay + 1) % 7;


        for (
            let i = 0;
            i < startDay;
            i++
        ) {

            const empty =
                document.createElement("div");

            empty.className =
                "calendar-empty";

            calendarDays.appendChild(
                empty
            );

        }


        const days =
            daysInJalaliMonth(
                calendarYear,
                calendarMonth
            );


        const today =
            getTodayJalali();


        for (
            let day = 1;
            day <= days;
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

            button.className =
                "calendar-day";


            if (
                calendarYear === today[0] &&
                calendarMonth === today[1] &&
                day === today[2]
            ) {

                button.classList.add(
                    "today"
                );

            }


            /*
              گذشته را غیرفعال می‌کنیم
            */

            const isPast =
                calendarYear < today[0] ||
                (
                    calendarYear === today[0] &&
                    calendarMonth < today[1]
                ) ||
                (
                    calendarYear === today[0] &&
                    calendarMonth === today[1] &&
                    day < today[2]
                );


            if (isPast) {

                button.disabled = true;

                button.classList.add(
                    "disabled"
                );

            }


            button.addEventListener(
                "click",
                function () {

                    const formattedDate =
                        `${calendarYear}/${String(calendarMonth).padStart(2, "0")}/${String(day).padStart(2, "0")}`;

                    dateInput.value =
                        formattedDate;

                    calendarOverlay.classList.remove(
                        "open"
                    );

                    resetTimeButtons();

                }
            );


            calendarDays.appendChild(
                button
            );

        }

    }


    /* =========================
       OPEN CALENDAR
    ========================= */

    if (dateInput) {

        dateInput.addEventListener(
            "click",
            function () {

                const current =
                    dateInput.value;

                if (current) {

                    const parts =
                        current.split("/");

                    calendarYear =
                        parseInt(parts[0]);

                    calendarMonth =
                        parseInt(parts[1]);

                } else {

                    const today =
                        getTodayJalali();

                    calendarYear =
                        today[0];

                    calendarMonth =
                        today[1];

                }

                renderCalendar();

                calendarOverlay.classList.add(
                    "open"
                );

            }
        );

    }


    /* =========================
       CALENDAR NAVIGATION
    ========================= */

    calendarPrev.addEventListener(
        "click",
        function () {

            calendarMonth--;

            if (calendarMonth < 1) {

                calendarMonth = 12;
                calendarYear--;

            }

            renderCalendar();

        }
    );


    calendarNext.addEventListener(
        "click",
        function () {

            calendarMonth++;

            if (calendarMonth > 12) {

                calendarMonth = 1;
                calendarYear++;

            }

            renderCalendar();

        }
    );


    calendarToday.addEventListener(
        "click",
        function () {

            const today =
                getTodayJalali();

            calendarYear =
                today[0];

            calendarMonth =
                today[1];

            dateInput.value =
                `${today[0]}/${String(today[1]).padStart(2, "0")}/${String(today[2]).padStart(2, "0")}`;

            calendarOverlay.classList.remove(
                "open"
            );

            resetTimeButtons();

        }
    );


    /* =========================
       CLOSE CALENDAR
    ========================= */

    calendarOverlay.addEventListener(
        "click",
        function (event) {

            if (
                event.target ===
                calendarOverlay
            ) {

                calendarOverlay.classList.remove(
                    "open"
                );

            }

        }
    );


    /* =========================
       SERVICE CHANGE
    ========================= */

    if (serviceInput) {

        serviceInput.addEventListener(
            "change",
            function () {

                resetTimeButtons();

            }
        );

    }


    /* =========================
       BOOKING MESSAGE
    ========================= */

    function createBookingMessage() {

        const modal =
            document.createElement("div");

        modal.className =
            "booking-message-overlay";

        modal.innerHTML = `

            <div class="booking-message-box">

                <div
                    class="booking-message-icon"
                >
                    ✓
                </div>

                <h3>
                    رزرو با موفقیت انجام شد
                </h3>

                <p>
                    نوبت شما ثبت شد.
                    لطفاً در زمان تعیین‌شده
                    در سالن حضور داشته باشید.
                </p>

                <button
                    type="button"
                    class="booking-message-close"
                >
                    باشه
                </button>

            </div>

        `;

        document.body.appendChild(
            modal
        );

        return modal;

    }


    function closeBookingMessage(
        modal
    ) {

        if (!modal) return;

        modal.remove();

    }


    function showBookingMessage() {

        const modal =
            createBookingMessage();

        const closeButton =
            modal.querySelector(
                ".booking-message-close"
            );

        closeButton.addEventListener(
            "click",
            function () {

                closeBookingMessage(
                    modal
                );

            }
        );

        modal.addEventListener(
            "click",
            function (event) {

                if (
                    event.target === modal
                ) {

                    closeBookingMessage(
                        modal
                    );

                }

            }
        );

    }


    /* =========================
       ESC
    ========================= */

    document.addEventListener(
        "keydown",
        function (event) {

            if (
                event.key === "Escape"
            ) {

                calendarOverlay.classList.remove(
                    "open"
                );

            }

        }
    );


    /* =========================
       BOOKING SUBMIT
    ========================= */

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
                        ? convertDigitsToEnglish(
                            dateInput.value.trim()
                        )
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


                /* =====================
                   VALIDATION
                ===================== */

                if (!service) {

                    alert(
                        "لطفاً خدمت مورد نظر را انتخاب کنید."
                    );

                    return;

                }


                if (!date) {

                    alert(
                        "لطفاً تاریخ مورد نظر را انتخاب کنید."
                    );

                    return;

                }


                if (!selectedTime) {

                    alert(
                        "لطفاً نوبت صبح یا عصر را انتخاب کنید."
                    );

                    return;

                }


                if (!description) {

                    alert(
                        "لطفاً توضیحات مورد نیاز را وارد کنید."
                    );

                    return;

                }


                if (!name) {

                    alert(
                        "لطفاً نام و نام خانوادگی را وارد کنید."
                    );

                    return;

                }


                if (!phone) {

                    alert(
                        "لطفاً شماره موبایل را وارد کنید."
                    );

                    return;

                }


                const cleanPhone =
                    convertDigitsToEnglish(
                        phone
                    ).replace(
                        /\s+/g,
                        ""
                    );


                if (
                    cleanPhone.length < 10
                ) {

                    alert(
                        "لطفاً شماره موبایل صحیح وارد کنید."
                    );

                    return;

                }


                /* =====================
                   BUTTON LOADING
                ===================== */

                const originalText =
                    bookingButton.textContent;

                bookingButton.disabled =
                    true;

                bookingButton.textContent =
                    "در حال ثبت رزرو...";


                try {

                    /* =================
                       DATABASE
                    ================= */

                    const {
                        data,
                        error
                    } =
                        await supabaseClient.rpc(
                            "create_appointment",
                            {
                                p_service:
                                    service,

                                p_date:
                                    date,

                                p_time:
                                    selectedTime,

                                p_description:
                                    description,

                                p_name:
                                    name,

                                p_phone:
                                    cleanPhone
                            }
                        );


                    if (error) {

                        console.error(
                            "Supabase error:",
                            error
                        );

                        alert(
                            "ثبت رزرو انجام نشد. لطفاً دوباره تلاش کنید."
                        );

                        return;

                    }


                    if (
                        data &&
                        data.success === false
                    ) {

                        alert(
                            data.message ||
                            "ثبت رزرو انجام نشد."
                        );

                        return;

                    }


                    /* =================
                       SUCCESS
                    ================= */

                    showBookingMessage();


                    /* =================
                       RESET FORM
                    ================= */

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


                } catch (error) {

                    console.error(
                        "Booking error:",
                        error
                    );

                    alert(
                        "خطایی در ثبت رزرو رخ داد. لطفاً دوباره تلاش کنید."
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


    /* =========================
       INITIAL STATE
    ========================= */

    resetTimeButtons();

});
