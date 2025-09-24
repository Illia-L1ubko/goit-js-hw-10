
// Підключення бібліотеки izitoast
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";


const form = document.querySelector(".form");

form.addEventListener("submit", (event) => {
    event.preventDefault(); // Скидаємо  стандартне перезавантаження сторінки після submit

    const delay = Number(form.elements.delay.value);
    const state = form.elements.state.value;

    const promise = new Promise((resolve, reject) => {
        setTimeout(() => {           // Створюємо потрібну затримку 
            if (state === "fulfilled") {
                resolve(delay);
            } else {
                reject(delay);
        }
    }, delay);
});

// Проміс, якщо успішно то зелене повідомлення, якщо відхилено то червоне повідомлення.
promise
    .then((delay) => {
        iziToast.success({
            message: `Fulfilled promise in ${delay}ms`,
            position: "topRight",
        });
    })
        .catch((delay) => {
            iziToast.error({
                message: `Rejected promise in ${delay}ms`,
                position: "topRight",
            });
        });
});