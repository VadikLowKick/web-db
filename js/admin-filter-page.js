import { userCheck, showUserView, adminCheck} from "./func_scripts/user_login_checker.js";
import {filterWithPreset} from "./func_scripts/filter.js";



document.addEventListener('DOMContentLoaded', function () {
    userCheck();
    showUserView();
    adminCheck(true);

});



document.getElementById('filterForm').addEventListener('submit', function (e) {
    e.preventDefault()

    const minAge = parseInt(document.getElementById('minAge').value, 10);
    const maxAge = parseInt(document.getElementById('maxAge').value, 10);
    const gender = document.querySelector('input[name="gender"]:checked') ? document.querySelector('input[name="gender"]:checked').value : null;
    const zodiac = document.getElementById('zodiac').value;
    const minHeight = parseInt(document.getElementById('minHeight').value, 10);
    const maxHeight = parseInt(document.getElementById('maxHeight').value, 10);
    const minWeight = parseInt(document.getElementById('minWeight').value, 10);
    const maxWeight = parseInt(document.getElementById('maxWeight').value, 10);
    const minRating = parseFloat(document.getElementById('minRating').value);
    const maxRating = parseFloat(document.getElementById('maxRating').value);


    // Создаем preset
const preset = {
    minAge: isNaN(minAge) ? null : minAge,
    maxAge: isNaN(maxAge) ? null : maxAge,
    gender: gender || null,
    zodiac: zodiac || null,
    minHeight:  minHeight,
    maxHeight:  maxHeight,
    minWeight:  minWeight,
    maxWeight:  maxWeight,
    minRating:  minRating,
    maxRating:  maxRating
};
    
    // Получаем всех пользователей из LocalStorage
    const users = JSON.parse(localStorage.getItem('users')) || [];

    var filteredUsers = filterWithPreset(users, preset)


    // Отображаем результаты
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = ''; // Очищаем результаты перед добавлением новых

    if (filteredUsers.length > 0) {
        filteredUsers.forEach(user => {
            const userItem = document.createElement('div');
            userItem.classList.add('user-item');
            
            userItem.innerHTML = `
                <img src="${user.profileImage || 'default-profile.png'}" alt="${user.name}" style="width: 100px; height: 100px;"/>
                <p>${user.name}</p>
                <p>${user.gender} ${user.age} y.o.</p>
                <p>Рейтинг : ${user.avg_rating}</p>
                <button class="viewProfile" data-email="${user.email}">View Profile</button>
            `;
            resultsDiv.appendChild(userItem);
        });

        // Обрабатываем нажатие кнопки "View Profile"
        document.querySelectorAll('.viewProfile').forEach(button => {
            button.addEventListener('click', function () {
                sessionStorage.setItem('viewUserEmail', this.getAttribute('data-email'));
                window.location.href = 'admin-user-profile-view.html';
            });
        });
    } else {
        resultsDiv.innerHTML = '<p>No users found with the selected filters.</p>';
    }

    const savePresetButton = document.getElementById('savePreset');

    const modal = document.getElementById("myModal");
    const closeModal = document.querySelector(".close");
    const submitBtn = document.getElementById("submitBtn");
    const textInput = document.getElementById("textInput");
    
    savePresetButton.addEventListener('click', function () {
        modal.style.display = "block";
    })

    // Закрытие модального окна при нажатии на крестик
    closeModal.addEventListener('click', function() {
        modal.style.display = "none";
    });

    // Закрытие модального окна при клике вне его
    window.addEventListener('click', function(event) {
            if (event.target == modal) {
                modal.style.display = "none";
            }
    });

    // Обработчик кнопки Submit
    submitBtn.addEventListener('click', function() {
        
        let adminPresets = JSON.parse(localStorage.getItem('adminPresets'));
        console.log(adminPresets)
        const inputText = textInput.value; // Получаем введенное значение
        const newPreset = {
            name: inputText,
            preset: preset
        };

        adminPresets.push(newPreset);
        localStorage.setItem('adminPresets', JSON.stringify(adminPresets));
    });

});
