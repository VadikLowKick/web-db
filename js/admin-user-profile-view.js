import { userCheck, showUserView, adminCheck} from "./func_scripts/user_login_checker.js";
document.addEventListener('DOMContentLoaded', function () {
    userCheck();
    showUserView(); 
    adminCheck(true);

    const currentUser = JSON.parse(sessionStorage.getItem('currentUser')); //Email пользователя, который вошел в аккаунт
    const userEmail = sessionStorage.getItem('viewUserEmail');  // Email пользователя, которого мы смотрим
    let users = JSON.parse(localStorage.getItem('users')) || [];

     // Проверяем, есть ли данные о пользователях
     if (users.length === 0) {
         alert('No users found in the database');
         window.location.href = 'users.html';
         return;
     }
 
     // Если есть viewUserEmail, ищем пользователя по нему, иначе используем currentUser
     let user = users.find(u => u.email === (userEmail || currentUser.email));
 
     // Если пользователь не найден, сообщаем об этом и перенаправляем
     if (!user) {
         alert(`User with email ${userEmail.email || currentUser} not found`);
         console.log(`Пользователь с email ${userEmail.email || currentUser} не найден`);
         window.location.href = 'users.html';
         return;
     }


    // Отображаем данные пользователя
    document.getElementById('name').textContent = user.name;
    document.getElementById('age').textContent = user.age;
    document.getElementById('gender').textContent = user.gender;
    document.getElementById('height').textContent = user.height;
    document.getElementById('weight').textContent = user.weight;
    document.getElementById('zodiac').textContent = user.zodiac;
    document.getElementById('description').textContent = user.description;
    document.getElementById('profileImage').src = user.profileImage || 'default-profile.png';
    // Отображаем текущий средний рейтинг
    user.ratings = user.ratings || [];
    document.getElementById('rating').textContent = user.ratings.length > 0 ? calculateAverageRating(user.ratings) : 'No ratings yet';
    document.getElementById('hiddenCheck').checked = user.IsHidden;                           
    
    const checkbox = document.getElementById('hiddenCheck');

    checkbox.addEventListener('change', function() {
        // Выводим текущее значение в консоль для отладки
        user.IsHidden = checkbox.checked;
        users = users.filter(usr => usr.name !== user.name);
        users.push(user);
        localStorage.setItem('users', JSON.stringify(users));
        console.log(user);
    });

    

    // Кнопка для возврата к списку пользователей
    document.getElementById('back').addEventListener('click', function () {
        window.location.href = 'admin-users.html';
    });
});
