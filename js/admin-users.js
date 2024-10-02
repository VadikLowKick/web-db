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

    const usersList = document.getElementById('usersList');
    const users = JSON.parse(localStorage.getItem('users')) || [];

    if (users.length === 0) {
        usersList.innerHTML = '<p>No users found.</p>';
        return;
    }

    users.forEach(user => {
        const userCard = document.createElement('div');
        userCard.classList.add('user-card');

        userCard.innerHTML = `
            <img src="${user.photo}" alt="${user.name}'s photo" width="100">
            <h2>${user.name}</h2>
            <p>Age: ${user.age}</p>
            <p>Height: ${user.height} cm</p>
            <p>Weight: ${user.weight} kg</p>
            <p>Zodiac: ${user.zodiac}</p>
            <p>Description: ${user.description}</p>
        `;

        usersList.appendChild(userCard);
    });
});
