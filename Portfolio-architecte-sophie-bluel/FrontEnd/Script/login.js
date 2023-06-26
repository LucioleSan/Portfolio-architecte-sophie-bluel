const form = document.getElementById('login-form');
localStorage.setItem("admin", false);

form.addEventListener('submit', async (event) => {
    event.preventDefault();
    
    const email = document.getElementById('login-email').value
    const password = document.getElementById('login-password').value

    // Fonction pour vérifier si une chaîne est un e-mail valide
function isValidEmail(email) {
    // Expression régulière pour vérifier le format de l'e-mail
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

    fetch('http://localhost:5678/api/users/login',{
      	method: 'POST',
      	body: JSON.stringify({ email, password }),
      	headers: {
        	'Content-Type': 'application/json'
      	}
    })
    .then(reponse =>  reponse.json())
    .then(data => {
        console.log(data);
        
            localStorage.setItem("admin", true);
            localStorage.setItem("token", data.token);
            window.location.href = "index.html";
    })
    .catch(error => console.error(error));
});



// / Fonction pour gérer la soumission du formulaire
function handleFormSubmit(event) {
  event.preventDefault(); // Empêche le rechargement de la page

  // Récupération des valeurs des champs e-mail et mot de passe
  const email = document.getElementById('login-email').value
  const password = document.getElementById('login-password').value

  // Validation de l'e-mail
  if (!isValidEmail(email)) {
    alert("Veuillez entrer un e-mail valide.");
    return;
  }

  // Connexion avec les informations fournies
  login(email, password);
}


// const form = document.getElementById('login-form');

// form.addEventListener('submit', async (event) => {
//         event.preventDefault();

//   // Récupération des valeurs des champs email et password
//   const email = document.getElementById('login-email').value;
//   const password = document.getElementById('login-password').value;

//     //   Fonction pour vérifier si une chaîne est un e-mail valide
// function isValidEmail(email) {
//     // Expression régulière pour vérifier le format de l'e-mail
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     return emailRegex.test(email);
//   }

//   // Envoi des données de connexion au serveur via une requête POST
//   try {
//     const response = await fetch('http://localhost:5678/api/users/login', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json'
//       },
//       body: JSON.stringify({ email, password })
//     });
//   console.log(response);
//     // Vérification du code de réponse HTTP
//     if (response.status === 200) {
//       // Récupération du token d'authentification
//       const data = await response.json();
//       const token = data.token;
//       // Stockage du token dans le localStorage
//       localStorage.setItem('token', token);
//       // Redirection vers la page d'accueil
//       window.location.href = "../index.html"
//     } else {
//       // Affichage d'un message d'erreur
//       const error = await response.json();
//       alert(error.message);
//     }
//   } catch (error) {
//     console.error(error);
//     alert('Une erreur est survenue lors de la connexion');
//   }
// });



