document.addEventListener('DOMContentLoaded', function () {
    
    const currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
    const currentAdmin = JSON.parse(sessionStorage.getItem('currentAdmin'));

    // Если ни обычного пользователя, ни администратора нет в сессии
    if (!currentUser) {
        window.location.href = 'login.html';  // Перенаправление на главную страницу
        return;
    }

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
