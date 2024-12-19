import { userCheck, showUserView, adminCheck} from "./func_scripts/user_login_checker.js";
document.addEventListener('DOMContentLoaded', function () {
    userCheck();
    showUserView();
    const currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
   
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
    if (currentUser.profileImage) {
        document.getElementById('imagePreview').src = currentUser.profileImage;
        document.getElementById('imagePreview').style.display = 'block';
    }
    document.getElementById('profileImage').addEventListener('change', function (e) {
        const reader = new FileReader();
        reader.onload = function () {
            document.getElementById('imagePreview').src = reader.result;
            document.getElementById('imagePreview').style.display = 'block';
            currentUser.profileImage = reader.result; 
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


        let users = JSON.parse(localStorage.getItem('users')) || [];
        const userIndex = users.findIndex(u => u.email === currentUser.email);
        users[userIndex] = currentUser;
        localStorage.setItem('users', JSON.stringify(users));


        sessionStorage.setItem('currentUser', JSON.stringify(currentUser));
        window.location.href = 'user-profile-view.html';
    });

    document.getElementById('viewUsers').addEventListener('click', function () {
        window.location.href = 'users.html';
    });

});
