import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

// Кнопка старту спочатку неактивна 
const startBtn = document.querySelector(".start-btn");
startBtn.disabled = true;

// При фокусі інпуту кнопка стає активною



// Елементи таймера
const timerEl = {
    days: document.querySelector("[data-days]"),
    hours: document.querySelector("[data-hours]"),
    minutes: document.querySelector("[data-minutes]"),
    seconds: document.querySelector("[data-seconds]"),
};

let userSelectedDate = null;
let timerId = null;


// Налаштування flatpickr
const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        const pickedDate = selectedDates[0];

        if (!pickedDate) return;

        if (pickedDate <= new Date()) {
            iziToast.error({
                message: 'Please choose a date in the future',
                position: 'topRight',
                backgroundColor: 'red',
                messageColor: 'white',
                
                });;
            startBtn.disabled = true;
            userSelectedDate = null;
        return;
        }

        userSelectedDate = pickedDate;
        startBtn.disabled = false;
    },
};

// Ініціалізація flatpickr
flatpickr("#datetime-picker", options);

// Обробник кліку по кнопці Start
startBtn.addEventListener("click", () => {
    if (!userSelectedDate) return;

    startBtn.disabled = true;
    document.querySelector("#datetime-picker").disabled = true;

    timerId = setInterval(() => {
        const now = new Date();
        const diff = userSelectedDate - now;

        if (diff <= 0) {
        clearInterval(timerId);
        updateTimer({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        document.querySelector("#datetime-picker").disabled = false;
        return;
        }

        updateTimer(convertMs(diff));
    }, 1000);
});

// Функція для оновлення таймера
function updateTimer({ days, hours, minutes, seconds }) {
    timerEl.days.textContent = addLeadingZero(days);
    timerEl.hours.textContent = addLeadingZero(hours);
    timerEl.minutes.textContent = addLeadingZero(minutes);
    timerEl.seconds.textContent = addLeadingZero(seconds);
}

// Функція конвертації мс у дні/години/хв/сек
function convertMs(ms) {
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    const days = Math.floor(ms / day);
    const hours = Math.floor((ms % day) / hour);
    const minutes = Math.floor(((ms % day) % hour) / minute);
    const seconds = Math.floor((((ms % day) % hour) % minute) / second);

    return { days, hours, minutes, seconds };
}

// Функція для додавання нуля попереду
function addLeadingZero(value) {
    return String(value).padStart(2, "0");
}


import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";


