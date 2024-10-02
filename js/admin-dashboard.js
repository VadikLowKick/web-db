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
});
