document.getElementById('loginForm').addEventListener('submit', function (e) {
    e.preventDefault();
  
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value.trim();
  
    // Replace with real auth in production
    if (username === 'team1' && password === 'task123') {
      localStorage.setItem('loggedIn', 'true');
      window.location.href = 'dashboard.html';
    } else {
      document.getElementById('message').style.color = 'red';
      document.getElementById('message').innerText = 'Invalid credentials';
    }
  });
  