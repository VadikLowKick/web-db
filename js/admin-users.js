import { userCheck, showUserView, adminCheck} from "./func_scripts/user_login_checker.js";
import {filterWithPreset} from "./func_scripts/filter.js";
document.addEventListener('DOMContentLoaded', function () {
    userCheck();
    adminCheck(true)
    showUserView();  

    let adminPresets = JSON.parse(localStorage.getItem('adminPresets'));
    const usersList = document.getElementById('usersList');
    const users = JSON.parse(localStorage.getItem('users')) || [];

    const presetName = sessionStorage.getItem('viewPresetName');

    const preset = adminPresets.find(u => u.name === presetName);

    const filteredUsers = filterWithPreset(users, preset.preset)

    if (users.length === 0) {
        usersList.innerHTML = '<p>No users found.</p>';
        return;
    }




    filteredUsers.forEach(user => {
        const userCard = document.createElement('div');
        userCard.classList.add('user-card');

        userCard.innerHTML = `
            <img src="${user.profileImage || 'default-profile.png'}" alt="${user.name}" style="width: 100px; height: 100px;"/>
        <p id ="name">${user.name}</p>
        <p>${user.gender} ${user.age} y.o.</p>
        <p>Rating : ${user.avg_rating}</p>
        <button id="view__profile_${user.email}" class="viewProfile" data-email="${user.email}">View Profile</button>`;

        usersList.appendChild(userCard);
    });

    // Переход на страницу просмотра профиля
    document.querySelectorAll('.viewProfile').forEach(button => {
        button.addEventListener('click', function () {
            sessionStorage.setItem('viewUserEmail', this.getAttribute('data-email'));
            window.location.href = 'admin-user-profile-view.html';
        });
    });

    const deleteCatalogButton = document.getElementById('deleteCatalog');

    deleteCatalogButton.addEventListener('click', function () {
        adminPresets = adminPresets.filter(preset => preset.name !== presetName);
        // Обновляем данные в LocalStorage
        localStorage.setItem('adminPresets', JSON.stringify(adminPresets));
        sessionStorage.removeItem('viewPresetName');
        window.location.href='admin-catalogs.html'
        
    })

    const editCatalogButton = document.getElementById('editCatalog');

    editCatalogButton.addEventListener('click', function () {
        window.location.href='admin-filter-page.html'
    })


    var header = document.getElementById('header');
    header.innerText = preset.name;
});
