document.addEventListener('DOMContentLoaded', function () {
    const currentUser = JSON.parse(sessionStorage.getItem('currentUser'));

    if (!currentUser) {
        window.location.href = 'login.html';  // Перенаправление на главную страницу
        return;
    }

    if (!currentUser.IsAdmin)
    {
        window.location.href = 'user-profile-view.html';  // Перенаправление на главную страницу
        return;
    }
    const ratingsList = document.getElementById('ratingsList');
    const users = JSON.parse(localStorage.getItem('users')) || [];

    if (users.length === 0) {
        ratingsList.innerHTML = '<p>No users found.</p>';
        return;
    }

    users.sort((a, b) => b.avg_rating - a.avg_rating);  // Сортируем пользователей по рейтингу (от большего к меньшему)

    users.forEach(user => {
        const userCard = document.createElement('div');
        userCard.classList.add('user-card');

        userCard.innerHTML = `
            <h2>${user.name}</h2>
            <p>Rating: ${user.avg_rating}</p>
        `;

        ratingsList.appendChild(userCard);
    });
});
