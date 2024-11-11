
export function userCheck(){ 
    const currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
    if (!currentUser) {
        window.location.href = 'login.html';  // Перенаправление на главную страницу
        return;
        }
}

export function adminCheck(relocate = false){
    const currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
    if (currentUser.IsAdmin){
        return true;
    }
    if (!currentUser.IsAdmin && relocate){
            window.location.href = 'users.html';  // Перенаправление на главную страницу
            return;
        }
    if (!currentUser.IsAdmin && !relocate){
        return false;
    }

}

export function showUserView(){
    const currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
    if (!currentUser.IsAdmin) {
        const userInfoDiv = document.getElementById('user-info');
        userInfoDiv.innerHTML = `
            <a id='currentUserLink' href="user-profile-view.html" data-email="${currentUser.email}">
            <img src="${currentUser.profileImage || 'default-profile.png'}" alt="${currentUser.name}"  style="width: 40px; height: 40px; border-radius: 50%;">
            </a>
            <span>${currentUser.name}</span>
            <button id="logoutButton" style="margin-left: 10px;">Logout</button>
        `;
    } else {
        const userInfoDiv = document.getElementById('user-info');
        userInfoDiv.innerHTML = `
            <span id='currentUserLink'>${currentUser.email}</span>
            <button id="logoutButton" style="margin-left: 10px;">Logout</button>
        `;
    }

    document.getElementById('currentUserLink').addEventListener('click', function() {
        if (!currentUser.IsAdmin){
            sessionStorage.setItem('viewUserEmail', this.getAttribute('data-email'));
        }
    });

    
    // Добавляем обработчик события для кнопки "Logout"
    document.getElementById('logoutButton').addEventListener('click', function() {
        sessionStorage.clear();
        window.location.href = 'registration.html'; // Страница регистрации
    });
    
}

