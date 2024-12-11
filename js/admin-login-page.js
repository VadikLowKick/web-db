document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    
    let admins = JSON.parse(localStorage.getItem('admins')) || [];


    let admin = admins.find(a => a.email === email);

    if (admin) {
        if (admin.password === password) {
            admin.IsAdmin = true
            sessionStorage.setItem('currentUser', JSON.stringify(admin));  // Сохраняем администратора в sessionStorage
            window.location.href = 'admin-dashboard.html';  // Переход на административную панель
        } else {
            errorMessage();
        }
        return;
    }
    else{
        errorMessage();
        return;
    }
});
function errorMessage(){
    if (!document.querySelector('.error-message')) {
        const paragraph = document.createElement('p'); // Создаем элемент заголовка
        paragraph.textContent = 'Incorrect name or password'; // Устанавливаем текст заголовка
        paragraph.style.color = 'red'; // Делаем текст красным
        paragraph.style.textAlign = 'center'; // Центрируем заголовок
      
        // Добавляем класс для упрощения поиска в будущем
        paragraph.classList.add('error-message');
      
        document.body.appendChild(paragraph); // Добавляем заголовок в body
      }
};