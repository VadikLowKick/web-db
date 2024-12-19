import { userCheck, showUserView, adminCheck} from "./func_scripts/user_login_checker.js";
document.addEventListener('DOMContentLoaded', function () {
    userCheck();
    showUserView(); 
    adminCheck(true);

    const currentUser = JSON.parse(sessionStorage.getItem('currentUser')); 
    const userEmail = sessionStorage.getItem('viewUserEmail'); 
    let users = JSON.parse(localStorage.getItem('users')) || [];
    let user = users.find(u => u.email === (userEmail || currentUser.email));
 
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
    document.getElementById('hiddenCheck').checked = user.IsHidden;                           
    
    const checkbox = document.getElementById('hiddenCheck');

    checkbox.addEventListener('change', function() {
        user.IsHidden = checkbox.checked;
        users = users.filter(usr => usr.name !== user.name);
        users.push(user);
        localStorage.setItem('users', JSON.stringify(users));
        console.log(user);
    });

    
    document.getElementById('back').addEventListener('click', function () {
        window.location.href = 'admin-filter-page.html';
    });
});

function calculateAverageRating(ratings) {
    const sum = ratings.reduce((acc, ratingObj) => acc + ratingObj.rating, 0);
    return (sum / ratings.length).toFixed(1);
}
