const form = document.getElementById('login-form');
localStorage.setItem("admin", false)

form.addEventListener('submit', (event) => {
    event.preventDefault();
    
    const email = document.getElementById('login-email').value
    const password = document.getElementById('login-password').value

    fetch('http://localhost:5678/api/users/login',{
      	method: 'POST',
      	body: JSON.stringify({ email: email, password: password }),
      	headers: {
        	'Content-Type': 'application/json'
      	}
    })
    .then(reponse =>  reponse.json())
    .then(data => {
        console.log(data),
        
            localStorage.setItem("admin", true);
            localStorage.setItem("token", data.token);
            window.location.href = "index.html";
    })
    .catch(error => console.error(error));
});

