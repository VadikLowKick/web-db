import { userCheck, showUserView, adminCheck} from "./func_scripts/user_login_checker.js";
import {filterWithPreset} from "./func_scripts/filter.js";
let preset = null;

function fill_preset(){
   
    const minAge = parseInt(document.getElementById('minAge').value, 10);
    const maxAge = parseInt(document.getElementById('maxAge').value, 10);
    const zodiac = document.getElementById('zodiac').value;
    const minHeight = parseInt(document.getElementById('minHeight').value, 10);
    const maxHeight = parseInt(document.getElementById('maxHeight').value, 10);
    const minWeight = parseInt(document.getElementById('minWeight').value, 10);
    const maxWeight = parseInt(document.getElementById('maxWeight').value, 10);
    const minRating = parseFloat(document.getElementById('minRating').value);
    const maxRating = parseFloat(document.getElementById('maxRating').value);
    const maleCheckbox = document.getElementById('maleCheck');
    const femaleCheckbox = document.getElementById('femaleCheck');
    const hiddenCheckbox = document.getElementById('hiddenCheck');
    const visibleCheckbox = document.getElementById('visibleCheck');
    var gender = null;
    if (maleCheckbox.checked){
        gender = "Male";
    }
    if (femaleCheckbox.checked){
        gender = "Female";
    }
    if (maleCheckbox.checked && femaleCheckbox.checked){
        gender = null;
    }


    var IsHidden = null;
    if (hiddenCheckbox.checked){
        IsHidden = true;
    }
    if (visibleCheckbox.checked){
        IsHidden = false;
    }
    if (hiddenCheckbox.checked && visibleCheckbox.checked){
        IsHidden = null;
    }
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
    const minAge = parseInt(document.getElementById('minAge').value, 10);
    const maxAge = parseInt(document.getElementById('maxAge').value, 10000);
    const gender = document.querySelector('input[name="gender"]:checked') ? document.querySelector('input[name="gender"]:checked').value : null;
    const zodiac = document.getElementById('zodiac').value;
    const minHeight = parseInt(document.getElementById('minHeight').value, 10);
    const maxHeight = parseInt(document.getElementById('maxHeight').value, 10);
    const minWeight = parseInt(document.getElementById('minWeight').value, 10);
    const maxWeight = parseInt(document.getElementById('maxWeight').value, 10);
    const minRating = parseFloat(document.getElementById('minRating').value);
    const maxRating = parseFloat(document.getElementById('maxRating').value);


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
        maxRating:  maxRating,
        IsHidden : null
    };


    const users = JSON.parse(localStorage.getItem('users')) || [];

    var filteredUsers = filterWithPreset(users, preset)


    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = ''; 

    if (filteredUsers.length > 0) {
        filteredUsers.forEach(user => {
            const userItem = document.createElement('div');
            userItem.classList.add('user-item');
            
            userItem.innerHTML = `
                <img src="${user.profileImage || '../default-profile.png'}" alt="${user.name}" style="width: 100px; height: 100px;"/>
                <p>${user.name}</p>
                <p>${user.gender} ${user.age} y.o.</p>
                <p>Rating : ${user.avg_rating || 0}</p>
                <p>Hidden User: ${user.IsHidden}</p>
                <button class="viewProfile" data-email="${user.email}">View Profile</button>
            `;
            resultsDiv.appendChild(userItem);
        });

        document.querySelectorAll('.viewProfile').forEach(button => {
            button.addEventListener('click', function () {
                sessionStorage.setItem('viewUserEmail', this.getAttribute('data-email'));
                window.location.href = 'admin-user-profile-view.html';
            });
        });
    } 
    else {
        resultsDiv.innerHTML = '<p>No users found with the selected filters.</p>';
    }

    const toggleSidebarButton = document.getElementById('toggleSidebar');
    const sidebar = document.getElementById('sidebar');


    toggleSidebarButton.addEventListener('click', () => {
        sidebar.classList.toggle('active');
    });

});



document.getElementById('filterForm').addEventListener('submit', function (e) {
    e.preventDefault();

    fill_preset();
    
    const users = JSON.parse(localStorage.getItem('users')) || [];
    var filteredUsers = filterWithPreset(users, preset)

    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = ''; 

    if (filteredUsers.length > 0) {
        filteredUsers.forEach(user => {
            const userItem = document.createElement('div');
            userItem.classList.add('user-item');
            
            userItem.innerHTML = `
                <img src="${user.profileImage || '../default-profile.png'}" alt="${user.name}" style="width: 100px; height: 100px;"/>
                <p>${user.name}</p>
                <p>${user.gender} ${user.age} y.o.</p>
                <p>Rating : ${user.avg_rating || 0}</p>
                <p>Hidden User: ${user.IsHidden}</p>
                <button class="viewProfile" data-email="${user.email}">View Profile</button>
                
            `;
            resultsDiv.appendChild(userItem);
        });
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
