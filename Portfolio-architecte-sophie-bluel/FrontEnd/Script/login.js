// const form = document.getElementById('login-form');
// localStorage.setItem("admin", false);

// form.addEventListener('submit', async (event) => {
//     event.preventDefault();
    
//     const email = document.getElementById('login-email').value
//     const password = document.getElementById('login-password').value

//     fetch('http://localhost:5678/api/users/login',{
//       	method: 'POST',
//       	body: JSON.stringify({ email: email, password: password }),
//       	headers: {
//         	'Content-Type': 'application/json'
//       	}
//     })
//     .then(reponse =>  reponse.json())
//     .then(data => {
//         console.log(data);
        
//             localStorage.setItem("admin", true);
//             localStorage.setItem("token", data.token);
//             window.location.href = "index.html";
//     })
//     .catch(error => console.error(error));
// });

const form = document.querySelector('login-form');

form.addEventListener('submit', async (event) => {
        event.preventDefault();

  // Récupération des valeurs des champs email et password
  const email = document.getElementById('login-email').value;
  const password = document.getElementById('login-password').value;

  // Envoi des données de connexion au serveur via une requête POST
  try {
    const response = await fetch('http://localhost:5678/api/users/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    });
  console.log(response);
    // Vérification du code de réponse HTTP
    if (response.status === 200) {
      // Récupération du token d'authentification
      const data = await response.json();
      const token = data.token;
      // Stockage du token dans le localStorage
      localStorage.setItem('token', token);
      // Redirection vers la page d'accueil
      window.location.href = "../index.html"
    } else {
      // Affichage d'un message d'erreur
      const error = await response.json();
      alert(error.message);
    }
  } catch (error) {
    console.error(error);
    alert('Une erreur est survenue lors de la connexion');
  }
});

