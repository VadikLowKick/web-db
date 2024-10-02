document.addEventListener('DOMContentLoaded', function () {
    const currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
    const currentAdmin = JSON.parse(sessionStorage.getItem('currentAdmin'));

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

    const usersList = document.getElementById('usersList');

    // Получаем пользователей из Local Storage
    const users = JSON.parse(localStorage.getItem('users')) || [];

    if (users.length === 0) {
        usersList.innerHTML = '<p>No users found.</p>';
        return;
    }

    // Отображаем каждого пользователя
    users.forEach(user => {
        const userItem = document.createElement('div');
        userItem.classList.add('user-card');
        
        userItem.innerHTML = `
        <img src="${user.profileImage || 'default-profile.png'}" alt="${user.name}" style="width: 100px; height: 100px;"/>
        <p>${user.name}</p>
        <p>${user.gender} ${user.age} y.o.</p>
        <p>Рейтинг : ${user.avg_rating}</p>
        <button class="viewProfile" data-email="${user.email}">View Profile</button>
    `;

        usersList.appendChild(userItem);
    });

    // Переход на страницу просмотра профиля
    document.querySelectorAll('.viewProfile').forEach(button => {
        button.addEventListener('click', function () {
            sessionStorage.setItem('viewUserEmail', this.getAttribute('data-email'));
            window.location.href = 'user-profile-view.html';
        });
    });



});
