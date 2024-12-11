import { userCheck, showUserView, adminCheck } from "./func_scripts/user_login_checker.js";

// Получаем данные из Local Storage
var storedLogs = JSON.parse(localStorage.getItem('userLogs')) || [];

// Конфигурация для пагинации
const rowsPerPage = 15; // Количество записей на странице
let currentPage = 1; // Текущая страница
let isAscending = true; // Состояние сортировки (по возрастанию)
// Функция для парсинга даты в формате DD.MM.YYYY, HH:mm:ss
function parseCustomDate(dateString) {
    // Разделяем дату и время по запятой
    const [datePart, timePart] = dateString.split(', ');

    // Разбиваем дату по точке
    const [day, month, year] = datePart.split('.');

    // Разбиваем время по двоеточию
    const [hours, minutes, seconds] = timePart.split(':');

    // Создаем объект Date
    const date = new Date(year, month - 1, day, hours, minutes, seconds); // Месяцы начинаются с 0

    return date;
}


// Функция для сортировки всех логов
function sortLogs() {
    storedLogs.sort((a, b) => {
        const dateA = parseCustomDate(a.timestamp);
        const dateB = parseCustomDate(b.timestamp);
        console.log(dateA , "|", dateB, Math.abs(dateA - dateB))
        // Сортировка по возрастанию или убыванию
        return isAscending ? dateA - dateB : dateB - dateA;
    });
}

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
// Добавляем обработчик для сортировки по колонке Timestamp
const timestampHeader = document.getElementById('timestampHeader');
timestampHeader.addEventListener('click', () => {
    isAscending = !isAscending; // Переключаем порядок сортировки
    sortLogs(); // Сортируем все логи
    loadLogsToTable(currentPage);
    console.log('sorted');
});

// Загружаем данные в таблицу при загрузке страницы
document.addEventListener('DOMContentLoaded', function () {
    userCheck();
    adminCheck(true);
    showUserView();
    sortLogs();
    // Сортируем и загружаем таблицу при загрузке страницы
    loadLogsToTable(currentPage);
});

// Функция для преобразования логов в XML
function logsToXML(logs) {
    let xml = '<?xml version="1.0" encoding="UTF-8"?>\n<logs>\n';
    logs.forEach(log => {
        xml += `  <log>\n`;
        xml += `    <user>${log.user}</user>\n`;
        xml += `    <action>${log.action}</action>\n`;
        xml += `    <timestamp>${log.timestamp}</timestamp>\n`;
        xml += `  </log>\n`;
    });
    xml += '</logs>';
    return xml;
}

// Обработчик для кнопки сохранения логов
document.getElementById("saveButton").addEventListener("click", function () {
    const format = document.getElementById('formatSelect').value; // Получаем выбранный формат
    let data;
    let fileName;

    if (format === 'json') {
        // Формат JSON
        data = JSON.stringify(storedLogs, null, 2); // Форматируем для читабельности
        fileName = "log.json";
    } else if (format === 'xml') {
        // Формат XML
        data = logsToXML(storedLogs);
        fileName = "log.xml";
    } else {
        // Формат TXT (по умолчанию)
        data = storedLogs.map(log => `${log.user} | ${log.action} | ${log.timestamp}`).join('\n');
        fileName = "log.txt";
    }

    // Создаём Blob
    const blob = new Blob([data], { type: "text/plain" });

    // Создаём ссылку для скачивания
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
});

document.getElementById("clearButton").addEventListener("click", function() {
    localStorage.removeItem('userLogs');
    location.reload();
});