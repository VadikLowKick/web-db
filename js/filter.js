document.addEventListener('DOMContentLoaded', function() {
    console.log('DOMContentLoaded fired');

    const currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
    console.log('Current User:', currentUser);

    // Если ни обычного пользователя, ни администратора нет в сессии
    if (!currentUser) {
        window.location.href = 'login.html';  // Перенаправление на главную страницу
        return;
    }

    if (!currentUser.IsAdmin) {
        const userInfoDiv = document.getElementById('user-info');
        userInfoDiv.innerHTML = `
            <img src="${currentUser.profileImage || 'default-profile.png'}" alt="${currentUser.name}" style="width: 40px; height: 40px; border-radius: 50%;">
            <span>${currentUser.name}</span>
            <button id="logoutButton" style="margin-left: 10px;">Logout</button>
        `;
    } else {
        const userInfoDiv = document.getElementById('user-info');
        userInfoDiv.innerHTML = `
            <span>${currentUser.email}</span>
            <button id="logoutButton" style="margin-left: 10px;">Logout</button>
        `;
    }
    // Добавляем обработчик события для кнопки "Logout"
    document.getElementById('logoutButton').addEventListener('click', function() {
        sessionStorage.removeItem('currentUser');
        window.location.href = 'registration.html'; // Страница регистрации
    });
});
document.getElementById('filterForm').addEventListener('submit', function (e) {
    e.preventDefault()

    const minAge = parseInt(document.getElementById('minAge').value, 10);
    const maxAge = parseInt(document.getElementById('maxAge').value, 10);
    const gender = document.querySelector('input[name="gender"]:checked') ? document.querySelector('input[name="gender"]:checked').value : null;
    const zodiac = document.getElementById('zodiac').value;
    const minHeight = parseInt(document.getElementById('minHeight').value, 10);
    const maxHeight = parseInt(document.getElementById('maxHeight').value, 10);
    const minWeight = parseInt(document.getElementById('minWeight').value, 10);
    const maxWeight = parseInt(document.getElementById('maxWeight').value, 10);
    const minRating = parseFloat(document.getElementById('minRating').value);
    const maxRating = parseFloat(document.getElementById('maxRating').value);

    // Получаем всех пользователей из LocalStorage
    const users = JSON.parse(localStorage.getItem('users')) || [];

    // Фильтруем пользователей
    const filteredUsers = users.filter(user => {
        return (!isNaN(minAge) ? parseInt(user.age, 10) >= minAge : true) &&
               (!isNaN(maxAge) ? parseInt(user.age, 10) <= maxAge : true) &&
               (!gender || user.gender === gender) &&
               (!zodiac || user.zodiac === zodiac) &&
               (!isNaN(minHeight) ? parseInt(user.height, 10) >= minHeight : true) &&
               (!isNaN(maxHeight) ? parseInt(user.height, 10) <= maxHeight : true) &&
               (!isNaN(minWeight) ? parseInt(user.weight, 10) >= minWeight : true) &&
               (!isNaN(maxWeight) ? parseInt(user.weight, 10) <= maxWeight : true) &&
               (!isNaN(minRating) ? parseFloat(user.avg_rating) >= minRating : true) &&
               (!isNaN(maxRating) ? parseFloat(user.avg_rating) <= maxRating : true);
    });

    // Отображаем результаты
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = ''; // Очищаем результаты перед добавлением новых

    if (filteredUsers.length > 0) {
        filteredUsers.forEach(user => {
            const userItem = document.createElement('div');
            userItem.classList.add('user-item');
            
            userItem.innerHTML = `
                <img src="${user.profileImage || 'default-profile.png'}" alt="${user.name}" style="width: 100px; height: 100px;"/>
                <p>${user.name}</p>
                <p>${user.gender} ${user.age} y.o.</p>
                <p>Рейтинг : ${user.avg_rating}</p>
                <button class="viewProfile" data-email="${user.email}">View Profile</button>
            `;
            resultsDiv.appendChild(userItem);
        });

        // Обрабатываем нажатие кнопки "View Profile"
        document.querySelectorAll('.viewProfile').forEach(button => {
            button.addEventListener('click', function () {
                sessionStorage.setItem('viewUserEmail', this.getAttribute('data-email'));
                window.location.href = 'user-profile-view.html';
            });
        });
    } else {
        resultsDiv.innerHTML = '<p>No users found with the selected filters.</p>';
    }
});
