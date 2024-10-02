import { userCheck, showUserView, adminCheck} from "./user_login_checker.js";
document.addEventListener('DOMContentLoaded', function () {
    userCheck();
    showUserView(); 




    const currentUser = JSON.parse(sessionStorage.getItem('currentUser')); //Email пользователя, который вошел в аккаунт
    const userEmail = sessionStorage.getItem('viewUserEmail');  // Email пользователя, которого мы смотрим
    const users = JSON.parse(localStorage.getItem('users')) || [];

     // Проверяем, есть ли данные о пользователях
     if (users.length === 0) {
         alert('No users found in the database');
         window.location.href = 'users.html';
         return;
     }
 
     // Если есть viewUserEmail, ищем пользователя по нему, иначе используем currentUser
     const user = users.find(u => u.email === (userEmail || currentUser.email));
 
     // Если пользователь не найден, сообщаем об этом и перенаправляем
     if (!user) {
         alert(`User with email ${userEmail.email || currentUser} not found`);
         console.log(`Пользователь с email ${userEmail.email || currentUser} не найден`);
         window.location.href = 'users.html';
         return;
     }

    // Функция для расчета среднего рейтинга
    function calculateAverageRating(ratings) {
        const sum = ratings.reduce((acc, ratingObj) => acc + ratingObj.rating, 0);
        return (sum / ratings.length).toFixed(1); // Округляем до 1 знака после запятой
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

    // Обработчик отправки нового рейтинга
    document.getElementById('submitRating').addEventListener('click', function () {
        const selectedRating = parseInt(document.getElementById('userRating').value, 10);

        // Ищем, выставлял ли текущий пользователь уже оценку этому профилю
        const existingRating = user.ratings.find(rating => rating.email === currentUser.email);

        if (existingRating) {
            // Если оценка уже есть, обновляем её
            existingRating.rating = selectedRating;
        } else {
            // Если нет, добавляем новую оценку
            user.ratings.push({ email: currentUser.email, rating: selectedRating });
        }

        // Пересчитываем средний рейтинг и обновляем на странице
        const newAverageRating = calculateAverageRating(user.ratings);
        user.avg_rating = newAverageRating
        document.getElementById('rating').textContent = newAverageRating;

        // Сохраняем изменения
        localStorage.setItem('users', JSON.stringify(users));
        alert('Thank you for rating!');
    });
                                    
     // Проверка, если это профиль текущего пользователя, показываем кнопку для редактирования
     if (user.email === currentUser.email) {
        // Создаем кнопку для редактирования профиля
        const editButton = document.createElement('button');
        editButton.textContent = 'Edit Profile';
        editButton.classList.add('user-profile-btn'); // Вы можете добавить классы для стилизации

        // Добавляем обработчик клика для перехода на страницу редактирования профиля
        editButton.addEventListener('click', function () {
            window.location.href = 'user-profile.html';
        });

        document.getElementById('profileActions').appendChild(editButton);
    } else {
        console.log("This is not the current user's profile. Edit button will not be shown.");
    }

  

    // Кнопка для возврата к списку пользователей
    document.getElementById('back').addEventListener('click', function () {
        window.location.href = 'users.html';
    });
});
