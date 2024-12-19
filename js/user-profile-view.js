import { userCheck, showUserView, adminCheck} from "./func_scripts/user_login_checker.js";
document.addEventListener('DOMContentLoaded', function () {
    userCheck();
    showUserView(); 

    const currentUser = JSON.parse(sessionStorage.getItem('currentUser')); 
    const userEmail = sessionStorage.getItem('viewUserEmail'); 
    const users = JSON.parse(localStorage.getItem('users')) || [];


     if (users.length === 0) {
         alert('No users found in the database');
         window.location.href = 'users.html';
         return;
     }
 

     const user = users.find(u => u.email === (userEmail || currentUser.email));
 
     if (!user) {
         alert(`User with email ${userEmail.email || currentUser} not found`);
         console.log(`Пользователь с email ${userEmail.email || currentUser} не найден`);
         window.location.href = 'users.html';
         return;
     }


    function calculateAverageRating(ratings) {
        const sum = ratings.reduce((acc, ratingObj) => acc + ratingObj.rating, 0);
        return (sum / ratings.length).toFixed(1); 
    }


    document.getElementById('name').textContent = user.name;
    document.getElementById('age').textContent = user.age;
    document.getElementById('gender').textContent = user.gender;
    document.getElementById('height').textContent = user.height;
    document.getElementById('weight').textContent = user.weight;
    document.getElementById('zodiac').textContent = user.zodiac;
    document.getElementById('description').textContent = user.description;
    document.getElementById('profileImage').src = user.profileImage || 'default-profile.png';



    user.ratings = user.ratings || [];
    document.getElementById('rating').textContent = user.ratings.length > 0 ? calculateAverageRating(user.ratings) : 'No ratings yet';


    document.getElementById('submitRating').addEventListener('click', function () {
        const selectedRating = parseInt(document.getElementById('userRating').value, 10);


        const existingRating = user.ratings.find(rating => rating.email === currentUser.email);

        if (existingRating) {

            existingRating.rating = selectedRating;
        } else {

            user.ratings.push({ email: currentUser.email, rating: selectedRating });
        }


        const newAverageRating = calculateAverageRating(user.ratings);
        user.avg_rating = newAverageRating
        document.getElementById('rating').textContent = newAverageRating;


        localStorage.setItem('users', JSON.stringify(users));
        alert('Thank you for rating!');
    });
                                    

     if (user.email === currentUser.email) {

        const editButton = document.createElement('button');
        editButton.textContent = 'Edit Profile';
        editButton.id = 'edit_own_profile';
        editButton.classList.add('user-profile-btn'); 


        editButton.addEventListener('click', function () {
            window.location.href = 'user-profile.html';
        });

        document.getElementById('profileActions').appendChild(editButton);
    } else {
        console.log("This is not the current user's profile. Edit button will not be shown.");
    }

  

    // Кнопка для возврата к списку пользователей
    document.getElementById('back_to_users').addEventListener('click', function () {
        window.location.href = 'users.html';
    });
});
