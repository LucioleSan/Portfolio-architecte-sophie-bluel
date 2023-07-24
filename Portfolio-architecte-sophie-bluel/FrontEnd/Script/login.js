const form = document.getElementById('login-form');

//   Fonction pour vérifier si une chaîne est un e-mail valide
function isValidEmail(email) {
  // Expression régulière pour vérifier le format de l'e-mail
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Expression pour le format du Mot de Passe avec 6 lettres
function isValidPassword(password) { 
  const passwordRegex = /^[a-zA-Z]{6,}$/;
  return passwordRegex.test(pass);
}


form.addEventListener('submit', async (event) => {
  event.preventDefault();

  // Récupération des valeurs des champs email et password
  const email = document.getElementById('login-email').value;
  const password = document.getElementById('login-password').value;

  if( !isValidEmail(email))
  {
    alert('email non valide');
    return;
  }

  // if( !isValidPassword(pass))
  // {
  //   alert('Mot de Passe non valide');
  //   return;
  // }

 
  // Envoi des données de connexion au serveur via une requête POST
    try {
      const response = await fetch('http://localhost:5678/api/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      });
      
      // console.log(response);

      // Vérification du code de réponse HTTP
      if (response.status === 200) {
        // Récupération du token d'authentification
        const data = await response.json();
        const token = data.token;
        // Stockage du token dans la sessionStorage
        sessionStorage.setItem('token', token);
        // Redirection vers la page d'accueil
        window.location.href = "../index.html";

      } 
      else {
        // Affichage d'un message d'erreur
        if(response.status === 404) {
          alert(" Utilisateur non trouver ");
          return;
        }

        if(response.status === 401) {
          alert(" MDP incorrect ");
        }
        

        // const data = await response.json();
        // console.log(data)
        // const error = await response.json();
        // alert(error.message);
      }
    }
  catch (error) {
    console.error(error);
    alert('Une erreur est survenue lors de la connexion');
  }
});



