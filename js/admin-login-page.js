document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    
    let admins = JSON.parse(localStorage.getItem('admins')) || [];


    let admin = admins.find(a => a.email === email);

    if (admin) {
        if (admin.password === password) {
            admin.IsAdmin = true
            sessionStorage.setItem('currentUser', JSON.stringify(admin));  
            window.location.href = 'admin-dashboard.html';  
        } else {
            errorMessage();
        }
        return;
    }
    else{
        errorMessage();
        return;
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