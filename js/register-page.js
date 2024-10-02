document.getElementById('registrationForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    if (password !== confirmPassword) {
        alert('Passwords do not match');
        return;
    }

    let users = JSON.parse(localStorage.getItem('users')) || [];

    if (users.some(user => user.email === email)) {
        alert('This email is already registered');
        return;
    }

    const newUser = {
        email: email,
        password: password,
        profile: {}
    };

    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    
    alert('Registration successful!');
    window.location.href = 'user-profile.html';
});
