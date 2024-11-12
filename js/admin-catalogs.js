import {filterWithPreset} from "./func_scripts/filter.js";
import { userCheck, showUserView, adminCheck} from "./func_scripts/user_login_checker.js";

document.addEventListener('DOMContentLoaded', function () {
    userCheck();
    adminCheck(true);
    showUserView();  

    const users = JSON.parse(localStorage.getItem('users')) || [];
    const usersList = document.getElementById('result');
    const adminPresets = JSON.parse(localStorage.getItem('adminPresets')) || [];;


    adminPresets.forEach(preset => {
        const userItem = document.createElement('div');
        userItem.classList.add('user-card');
        const filteredUsers = filterWithPreset(users, preset.preset)
        userItem.innerHTML = `
        <p><strong>${preset.name}</strong></p>
        <p>${filteredUsers.length}</p>
        <button class="viewCatalog" data="${preset.name}">View</button>
    `;

        usersList.appendChild(userItem);
     });

        const userItem = document.createElement('div');
        userItem.classList.add('user-card')
        userItem.innerHTML = `
         <button id="AddCatalog">Add new catalog</button>
        
    `;
        usersList.appendChild(userItem);

     // Переход на страницу просмотра профиля
    document.querySelectorAll('.viewCatalog').forEach(button => {
        button.addEventListener('click', function () {
            sessionStorage.setItem('viewPresetName', this.getAttribute('data'));
            window.location.href = 'admin-users.html';
        });
    });

    const addCatalogButton = document.getElementById('AddCatalog');
    addCatalogButton.addEventListener('click', function () {
        window.location.href = 'admin-filter-page.html';
    })

});