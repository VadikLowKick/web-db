import { userCheck, showUserView, adminCheck} from "./user_login_checker.js";
document.addEventListener('DOMContentLoaded', function () {
    userCheck();
    showUserView();
   
    // Заполнение формы текущими данными пользователя
    document.getElementById('name').value = currentUser.name || '';
    document.getElementById('age').value = currentUser.age || '';
    document.getElementById('height').value = currentUser.height || '';
    document.getElementById('weight').value = currentUser.weight || '';
    document.getElementById('zodiac').value = currentUser.zodiac || '';
    document.getElementById('description').value = currentUser.description || '';

    const radios = document.getElementsByName('gender');
    for (const radio of radios){
        if (radio.value === currentUser.gender){
            radio.checked = true
        }
    }

    // Если у пользователя есть фото, отображаем его
    if (currentUser.profileImage) {
        document.getElementById('imagePreview').src = currentUser.profileImage;
        document.getElementById('imagePreview').style.display = 'block';
    }

    // Логика загрузки изображения
    document.getElementById('profileImage').addEventListener('change', function (e) {
        const reader = new FileReader();
        reader.onload = function () {
            document.getElementById('imagePreview').src = reader.result;
            document.getElementById('imagePreview').style.display = 'block';
            currentUser.profileImage = reader.result;  // Сохраняем изображение в формате base64
        };
        reader.readAsDataURL(this.files[0]);
    });





    // Сохранение обновленных данных
    document.getElementById('profileForm').addEventListener('submit', function (e) {
        e.preventDefault();

        currentUser.name = document.getElementById('name').value;
        currentUser.age = document.getElementById('age').value;
        currentUser.height = document.getElementById('height').value;
        currentUser.weight = document.getElementById('weight').value;
        currentUser.zodiac = document.getElementById('zodiac').value;
        currentUser.description = document.getElementById('description').value;

        const radios = document.getElementsByName('gender');
        for (const radio of radios){
            if (radio.checked){
                currentUser.gender = radio.value
            }
        }

        // Обновляем данные в localStorage
        let users = JSON.parse(localStorage.getItem('users')) || [];
        const userIndex = users.findIndex(u => u.email === currentUser.email);
        users[userIndex] = currentUser;
        localStorage.setItem('users', JSON.stringify(users));

        // Обновляем данные в sessionStorage
        sessionStorage.setItem('currentUser', JSON.stringify(currentUser));

        alert('Profile updated successfully');
        window.location.href = 'user-profile-view.html';
    });

    // Переход на страницу просмотра других пользователей
    document.getElementById('viewUsers').addEventListener('click', function () {
        window.location.href = 'users.html';
    });

});
