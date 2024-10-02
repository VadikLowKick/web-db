
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
            window.location.href = 'user-profile-view.html';  // Перенаправление на главную страницу
            return;
        }
    if (!currentUser.IsAdmin && !relocate){
        return true;
    }

}

export function showUserView(){
    const currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
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
    
}

