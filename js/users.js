import { userCheck, showUserView, adminCheck} from "./func_scripts/user_login_checker.js";

document.addEventListener('DOMContentLoaded', function () {
    userCheck();
    showUserView();


    const usersList = document.getElementById('usersList');

    // Получаем пользователей из Local Storage
    const users = JSON.parse(localStorage.getItem('users')) || [];

    if (users.length === 0) {
        usersList.innerHTML = '<p>No users found.</p>';
        return;
    }

    // Отображаем каждого пользователя
    users.forEach(user => {
        if (user.IsHidden){
            return;
        }
        const userItem = document.createElement('div');
        userItem.classList.add('user-card');
        
        userItem.innerHTML = `
        <img src="${user.profileImage || 'default-profile.png'}" alt="${user.name}" style="width: 100px; height: 100px;"/>
        <p id ="name">${user.name}</p>
        <p>${user.gender} ${user.age} y.o.</p>
        <p>Rating : ${user.avg_rating}</p>
        <button id="view__profile_${user.email}" class="viewProfile" data-email="${user.email}">View Profile</button>`;

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
