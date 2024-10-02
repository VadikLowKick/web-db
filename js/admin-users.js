import { userCheck, showUserView, adminCheck} from "./user_login_checker.js";
import {filterWithPreset} from "./filter.js";
document.addEventListener('DOMContentLoaded', function () {
    userCheck();
    adminCheck(true)
    showUserView();  

    const adminPresets = JSON.parse(localStorage.getItem('adminPresets'));
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
            <img src="${user.profileImage}" alt="${user.name}'s photo" width="100">
            <h2>${user.name}</h2>
            <p>Age: ${user.age}</p>
            <p>Height: ${user.height} cm</p>
            <p>Weight: ${user.weight} kg</p>
            <p>Zodiac: ${user.zodiac}</p>
            <p>Description: ${user.description}</p>
        `;

        usersList.appendChild(userCard);
    });

    var header = document.getElementById('header');
    header.innerText = preset.name;
});
