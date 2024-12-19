document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    
    let users = JSON.parse(localStorage.getItem('users')) || [];

    let user = users.find(u => u.email === email);

    if (user) {

        if (user.password === password) {
            user.IsAdmin = false
            sessionStorage.setItem('currentUser', JSON.stringify(user)); 
            

            if (!user.name || !user.age || !user.height || !user.weight) {
                window.location.href = 'user-profile.html'; 
            } else {
                window.location.href = 'user-profile-view.html'; 
            }
        } 
        else {
            errorMessage();
        }
    }
    else{
        errorMessage();
    }
});
function errorMessage(){
    if (!document.querySelector('.error-message')) {
        const paragraph = document.createElement('p'); 
        paragraph.textContent = 'Incorrect name or password';
        paragraph.style.color = 'red';
        paragraph.style.textAlign = 'center'; 
        paragraph.classList.add('error-message');
        document.body.appendChild(paragraph);
      }
};