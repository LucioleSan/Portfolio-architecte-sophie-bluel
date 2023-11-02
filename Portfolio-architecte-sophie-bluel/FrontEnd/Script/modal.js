// Modal

const Modal1 = document.getElementById('modal1');
Modal1.style.display='none';


const modalPhoto= document.getElementById('modalPhoto');


const modalAjout= document.getElementById('modalAjout');
modalAjout.style.display='none'

// Récupérer l'élément avec l'ID "modify3"
const modify3Element = document.querySelector(".modify3");

// Ajouter un écouteur d'événement au clic de la souris
modify3Element.addEventListener("click", openModal);

// Fonction pour ouvrir la modal
function openModal() {  
  // Afficher la modal en modifiant son style
  Modal1.style.display = "flex";
}



const closeBtn = document.querySelector(".closeModal");


closeBtn.addEventListener("click", closeModal);

/*Création de la constante closeModal */
function closeModal() {

   
   
     Modal1.style.display = 'none' /* cache la modale */
     modalAjout.style.display = "none";
    modalPhoto.style.display='block';
   
   
};

// fonction pour la fermeture de la modale quand on clique en dehors


function closeModalClickOut(event) {
   
    if (event.target === Modal1) {
        Modal1.style.display = 'none';
        modalAjout.style.display = "none";
        modalPhoto.style.display='block';
      }
    }

    Modal1.addEventListener("click", closeModalClickOut);
 


//récupère les projets depuis l'API et les ajoute à la modal
function getProjectModal() {
    const modalGallery = document.querySelector(".modalGallery");
    modalGallery.innerHTML="";
   
    worksList.forEach(function (project) {
        addProjectToModal(project);
    })
}

// Ajouter les photos à la modal
function addProjectToModal(project) {

    const modalGallery = document.querySelector(".modalGallery");


    const figure = document.createElement("figure");
    figure.classList.add("figureModal");

    const img = document.createElement("img");
    img.classList.add("imgModal");
    img.src = project.imageUrl;
    img.width = 100;

    const figcaption = document.createElement("figcaption");
    figcaption.classList.add("figCaption");
    figcaption.alt = project.title;
    figcaption.textContent = "éditer";

    const categoryId = document.createElement("p");
    categoryId.src = project.categoryId;

    const deleteWork = document.createElement("i");
    deleteWork.classList.add("deleteTrashIcon", "fa", "fa-solid", "fa-trash-can");
   

    deleteWork.addEventListener("click", function() {deletePicture(project.id)})

    let arrows = document.createElement("i");
    arrows.classList.add("fa-solid", "fa-arrows-up-down-left-right");
    arrows.style.display='none';
    // APPARITION DE LA CROIX AU SURVOL DE LA SOURIS

    figure.addEventListener('mouseover', function() {
        arrows.style.display='block';
    });

    figure.addEventListener('mouseout', function(){
        arrows.style.display='none';
    });
   
    figure.append(img, figcaption, categoryId, deleteWork,arrows);

    modalGallery.append(figure);
   
}

// Ouvrir Ajouter une photo avec l'évènement click
const ajout = document.getElementById("ajout-image");

ajout.addEventListener("click", openPicture);

function openPicture() {  
   
    modalAjout.style.display = "block";
    modalPhoto.style.display='none';
  }

//   Clique pour le retour en arrière

const back = document.getElementById("arrowBack");

back.addEventListener("click", arrow);
function arrow(){
    modalAjout.style.display = "none";
    modalPhoto.style.display='block';
}


//Partie pour supprimer une image de la galerie (au click de la poubelle)

async function deletePicture(id) {
 
      const projectId = id;      

    if (confirm("Voulez-vous supprimer l'image?") == true) {
        console.log(localStorage.getItem("token"))
        fetch("http://localhost:5678/api/works/" + projectId, {
          method: 'DELETE',
          headers: {
            'accept' : '*/*',
            'Authorization' : 'Bearer ' + (sessionStorage.getItem("token")),
         }
      }).then (() => {
         getWorks();
      });
       
 
}
}



// Récupérez l'élément img pour la prévisualisation
const imagePreview = document.getElementById('imagePreview');

// Écoutez l'événement "change" sur l'élément input file
ajoutPhotoBtn.addEventListener('change', function() {
    readURL(this); // Appelez la fonction readURL avec l'élément input file en tant qu'argument
});

// Définissez la fonction readURL
function readURL(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function (e) {
            imagePreview.src = e.target.result;
            imagePreview.style.display = 'block'; // Assurez-vous que l'image prévisualisée est visible
            imgContainer.style.display = 'none'
        };

        reader.readAsDataURL(input.files[0]);
    }
}



//Format accepté
const fileTypes = [
    "image/jpeg",
    "image/png",
    "image/jpg"
];

// Fonction pour gerer les erreurs pour le TITRE
function validateTitle() {
    let inputTitle = document.getElementById("titrePhoto");
    let errors = false;

    if (inputTitle.value == "") { // si le champ de titre reste vide, affichage d'un message d'erreur
        titleErrorMessage.innerText = "Veuillez mettre un titre valide.";
        inputTitle.classList.add("inputError");
        errors = true;
    }
    else { // sinon enlever le message d'erreur
        titleErrorMessage.innerText = "";
        inputTitle.classList.remove("inputError");
        errors = false;
    }

    return errors;
}

// Fonction pour gerer les erreurs pour les FICHIERS
function validateFile() {
   

    let errors = false;
    if (document.getElementById("ajoutPhotoBtn").files.length === 0) {
        // on indique dont qu'il y a une erreur dans le formulaire
        errors = true;
        alert("Veuillez sélectionner un fichier.");
    }
    else {
        errors = false;
    }
    return errors;

}


validerBtn.addEventListener('click', (e) =>{
    e.preventDefault();
   
     validateFormProject();

})

// Ajout d'un élément
async function validateFormProject() {
   

    // Récupération des saisies pour la création du nouvel élément
    const imgUploaded = document.getElementById("ajoutPhotoBtn").files[0];
   
    const inputTitle = document.getElementById("titrePhoto").value;
   
    const selectCategorie = document.getElementById("categoriePhoto");
    const categoriePhotoId = selectCategorie.options[selectCategorie.selectedIndex].value;

    if(categoriePhotoId === '0' ){
        alert('veillez choisir une categorie')
        return
    }

    if(inputTitle === "" ){
        alert('veillez entrer le titre')
        return
    }

    if( document.getElementById("ajoutPhotoBtn").files.length === 0 ){
        alert('veillez choisir une image')
        return
    }

 

    // Construction du formData à envoyer
    const formData = new FormData();

    formData.append("image", imgUploaded);
    formData.append("title", inputTitle);
    formData.append("category", categoriePhotoId);


    // Appel de la fonction fetch avec toutes les informations nécessaires
    let response = await fetch("http://localhost:5678/api/works", {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Authorization' : "Bearer " + sessionStorage.getItem("token"),
      },
      body: formData,
    });

    // Condition si on réussi à rajouter l'image
    if (response.status === 200 || 201) {
        getWorks();

    
       

        document.getElementById('ajoutPhoto-form').reset();
        imagePreview.style.display = 'none';
        imgContainer.style.display = 'flex';

        alert('L\'ajout de l\'image a été réalisé avec succès');
       
   
    } else if (response.status === 401 || 400) {
        alert('Veuillez ajouter un titre ou image');
        console.log("Action impossible");
    };
   
}
;

ajoutPhotoBtn.addEventListener('change', function() {
    // Vérifier la taille du fichier sélectionné
    const fileSize = this.files[0].size; // Taille du fichier en octets
    const maxSize = 4 * 1024 * 1024; // 4 Mo en octets

    if (fileSize > maxSize) {
        alert("L'image sélectionnée dépasse la taille maximale de 4 Mo.");
        this.value === 0; // Effacez la sélection de fichier en réinitialisant la valeur
    } else {
        // Si la taille est valide, continuez avec la prévisualisation ou d'autres actions
        readURL(this);
        changeBtnColor();
    }
});

//Changement de couleur du bouton validé
function changeBtnColor() {
    const validerBtn = document.getElementById("validerBtn");    

    if (ajoutPhotoBtn.files.length === 0 || titrePhoto.value === "" || categoriePhoto.options[categoriePhoto.selectedIndex].value == 0 ) {
       
        validerBtn.classList.add('validerBtnFalse');
        validerBtn.style.backgroundColor = 'green';
       
    } else {
       
        validerBtn.classList.remove('validerBtnFalse');
       
    }

}



titrePhoto.addEventListener('blur' , () => {
    changeBtnColor();
})

categoriePhoto.addEventListener('onchange', () => {
    changeBtnColor();
})

