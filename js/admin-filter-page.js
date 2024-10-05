import { userCheck, showUserView, adminCheck} from "./func_scripts/user_login_checker.js";
import {filterWithPreset} from "./func_scripts/filter.js";
let preset = null;

function fill_preset(){
   
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
    const checkbox = document.getElementById('hiddenCheck');

    const IsHidden = checkbox.checked;

    // Создаем preset
    preset = {
    minAge: isNaN(minAge) ? null : minAge,
    maxAge: isNaN(maxAge) ? null : maxAge,
    gender: gender || null,
    zodiac: zodiac || null,
    minHeight:  minHeight,
    maxHeight:  maxHeight,
    minWeight:  minWeight,
    maxWeight:  maxWeight,
    minRating:  minRating,
    maxRating:  maxRating,
    IsHidden : IsHidden
    }; 
};


document.addEventListener('DOMContentLoaded', function () {
    userCheck();
    showUserView();
    adminCheck(true);

    let presetName = sessionStorage.getItem('viewPresetName');
    let adminPresets = JSON.parse(localStorage.getItem('adminPresets')) || [];

    if (!adminPresets){
        localStorage.setItem('adminPresets', adminPresets);
    }

    if (presetName){
        let header = document.getElementById('header');
        let button = document.getElementById('savePreset');
        button.innerText = 'Change Catalog Preset'
        header.innerText = presetName;


        const presetWithName = adminPresets.find(pr => pr.name === presetName)
        console.log(presetWithName)

        const true_preset = presetWithName.preset;
            // Заполняем поля формы значениями из preset
        document.getElementById('minAge').value = true_preset.minAge;
        document.getElementById('maxAge').value = true_preset.maxAge;

        if (true_preset.gender) {
            document.querySelector(`input[name="gender"][value="${true_preset.gender}"]`).checked = true;
        }

        // Устанавливаем значение для поля "Zodiac Sign"
        if (true_preset.zodiac) {
            document.getElementById('zodiac').value = true_preset.zodiac;
        }

        // Заполняем поля для роста и веса
        document.getElementById('minHeight').value = true_preset.minHeight;
        document.getElementById('maxHeight').value = true_preset.maxHeight;
        document.getElementById('minWeight').value = true_preset.minWeight;
        document.getElementById('maxWeight').value = true_preset.maxWeight;
        document.getElementById('minRating').value = true_preset.minRating;
        document.getElementById('maxRating').value = true_preset.maxRating;

        // Устанавливаем значение для поля "Hidden Profile"
        document.getElementById('hiddenCheck').checked = true_preset.IsHidden;


    }


    const viewAllButton = this.getElementById('view_all');
    viewAllButton.addEventListener('click', function () {
        sessionStorage.removeItem('viewPresetName')
        window.location.href = 'admin-catalogs.html'
    })



    const savePresetButton = document.getElementById('savePreset');

    const modal = document.getElementById("myModal");
    const closeModal = document.querySelector(".close");
    const submitBtn = document.getElementById("submitBtn");
    const textInput = document.getElementById("textInput");
    
    savePresetButton.addEventListener('click', function () {
        modal.style.display = "block";
        if (presetName){
            textInput.value = presetName;
        }
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
        
        
        if (presetName){
            adminPresets = adminPresets.filter(pr => pr.name !== presetName);
        }
        fill_preset()
        const inputText = textInput.value; // Получаем введенное значение
        const newPreset = {
            name: inputText,
            preset: preset
        }

        adminPresets.push(newPreset);
        localStorage.setItem('adminPresets', JSON.stringify(adminPresets));
        sessionStorage.removeItem('viewPresetName');
        sessionStorage.setItem('viewPresetName', inputText);
        window.location.reload();
    });




});



document.getElementById('filterForm').addEventListener('submit', function (e) {
    e.preventDefault();

    fill_preset();

    
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

});
