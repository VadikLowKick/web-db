// Сохранение логов в LocalStorage
function logAction(action) {
    const logs = JSON.parse(localStorage.getItem('userLogs')) || [];
    logs.push({
        action: action,
        timestamp: new Date().toLocaleString()
    });
    localStorage.setItem('userLogs', JSON.stringify(logs));
}

// Функция для отслеживания всех кликов и ввода данных
function trackUserActions() {
    // Отслеживание нажатий на элементы формы
    document.addEventListener('click', function (event) {
        const element = event.target;
        if (element.tagName === 'BUTTON' || element.tagName === 'INPUT' || element.tagName === 'SELECT') {
            logAction(`Clicked on ${element.tagName} with id="${element.id}"`);
        }
    });

    // Отслеживание изменений в инпутах
    document.addEventListener('input', function (event) {
        const element = event.target;
        if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA' || element.tagName === 'SELECT') {
            logAction(`Input in ${element.tagName} with id="${element.id}" changed to "${element.value}"`);
        }
    });
}

// Запуск отслеживания при загрузке страницы
document.addEventListener('DOMContentLoaded', trackUserActions);
