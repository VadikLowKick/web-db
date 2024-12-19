import { userCheck, showUserView, adminCheck } from "./func_scripts/user_login_checker.js";

document.addEventListener('DOMContentLoaded', function () {
    userCheck();
    adminCheck(true);
    showUserView();

    const ratingsList = document.getElementById('ratingsList');
    const toggleSortButton = document.getElementById('toggleSortButton');
    const users = JSON.parse(localStorage.getItem('users')) || [];

    if (users.length === 0) {
        ratingsList.innerHTML = '<p>No users found.</p>';
        return;
    }

    let sortDescending = true; // По умолчанию сортировка по убыванию

    const renderUsers = () => {

        ratingsList.innerHTML = '';
        users.sort((a, b) => sortDescending ? b.avg_rating - a.avg_rating : a.avg_rating - b.avg_rating);
        users.forEach(user => {
            const userCard = document.createElement('div');
            userCard.classList.add('user-card');

            userCard.innerHTML = `
                <h2>${user.name}</h2>
                <p>Rating: ${user.avg_rating || user.rating}</p>
            `;

            ratingsList.appendChild(userCard);
        });
    };

    // Обработчик нажатия на кнопку для переключения сортировки
    toggleSortButton.addEventListener('click', () => {
        sortDescending = !sortDescending; 
        renderUsers(); 
    });

    renderUsers();
});
