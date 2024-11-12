import { userCheck, showUserView, adminCheck} from "./func_scripts/user_login_checker.js";


// Получаем данные из Local Storage
const storedLogs = JSON.parse(localStorage.getItem('userLogs')) || [];

// Конфигурация для пагинации
const rowsPerPage = 15; // Количество записей на странице
let currentPage = 1; // Текущая страница

// Функция для отображения данных в таблице
function loadLogsToTable(page) {
    const tableBody = document.getElementById('logsTable').querySelector('tbody');
    tableBody.innerHTML = ''; // Очищаем таблицу перед заполнением

    // Вычисляем индексы для текущей страницы
    const startIndex = (page - 1) * rowsPerPage;
    const endIndex = startIndex + rowsPerPage;
    const paginatedLogs = storedLogs.slice(startIndex, endIndex);

    // Добавляем строки таблицы для текущей страницы
    paginatedLogs.forEach(log => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${log.user}</td>
            <td>${log.action}</td>
            <td>${log.timestamp}</td>
        `;
        tableBody.appendChild(row);
    });

    // Обновляем кнопки пагинации
    updatePagination();
}

// Функция для создания кнопок пагинации
function updatePagination() {
    const paginationDiv = document.getElementById('pagination');
    paginationDiv.innerHTML = ''; // Очищаем блок пагинации перед обновлением

    const totalPages = Math.ceil(storedLogs.length / rowsPerPage);

    // Создаем кнопки для каждой страницы
    for (let i = 1; i <= totalPages; i++) {
        const button = document.createElement('button');
        button.textContent = i;
        button.classList.add('pagination-button');
        if (i === currentPage) button.classList.add('active');
        button.addEventListener('click', () => {
            currentPage = i;
            loadLogsToTable(currentPage);
        });
        paginationDiv.appendChild(button);
    }
}

// Загружаем данные в таблицу при загрузке страницы
document.addEventListener('DOMContentLoaded', function () {
    userCheck();
    adminCheck(true);
    showUserView();
    loadLogsToTable(currentPage)  
});

document.getElementById("saveButton").addEventListener("click", function() {
    // Получаем данные из localStorage
    const data = JSON.stringify(localStorage.getItem('userLogs'));

    // Создаем Blob с типом "text/plain"
    const blob = new Blob([data], { type: "text/plain" });

    // Создаем ссылку для скачивания
    const url = URL.createObjectURL(blob);

    // Создаем временный элемент <a> для скачивания
    const a = document.createElement("a");
    a.href = url;
    a.download = "log.txt"; // Указываем имя файла
    document.body.appendChild(a);
    a.click(); // Имитируем клик для скачивания

    // Удаляем временный элемент
    document.body.removeChild(a);

    // Освобождаем URL-объект
    URL.revokeObjectURL(url);
});

document.getElementById("clearButton").addEventListener("click", function() {
    localStorage.removeItem('userLogs');
    location.reload();
});
