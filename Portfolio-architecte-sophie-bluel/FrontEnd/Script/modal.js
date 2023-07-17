// Modal

const Modal1 = document.getElementById('modal1');
Modal1.style.display='none';


// const ModalEdition = document.getElementById('modalEdition');
// ModalEdition.addEventListener("click", function() {  
//      alert('test')
//     Modal1.style.display='flex'
// });


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
    
    if (event.target === modal) {
        modal.style.display = 'none';
      }
    }

    document.addEventListener("click", closeModalClickOut);
  


//récupère les projets depuis l'API et les ajoute à la modal
function getProjectModal() {
    console.log(worksList)
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
    deleteWork.dataset.id = project.id;

    let arrows = document.createElement("i");
    arrows.classList.add("fa-solid", "fa-arrows-up-down-left-right");
    
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

async function deletePicture(e) {
  if (e.target.classList.contains('deleteTrashIcon')) {
      const projectId = e.target.dataset.id;
      console.log(sessionStorage.getItem('token'));
      const response = await fetch("http://localhost:5678/api/works/" + projectId, {
          method: 'DELETE',
          headers: {
              "Content-Type": "application/json; charset=utf-8",
              "authorization": `Bearer ${sessionStorage.getItem('token')}`
          }
      });
      if (response.ok) {
          if (confirm("Voulez-vous supprimer l'image?") == true) {
              e.target.parentElement.remove(); //suppression du target
          } else {
              modalAjout;
          }
      } else {
          console.log("Une erreur s'est produite lors de la suppression du projet.");
      }
  }
};

function validateImage() {
    //Création des photos
    let ajoutPhotoBouton = document.getElementById("ajoutPhotoBtn");
    let ajoutPhotoLabel = document.getElementById("ajoutPhotoLabel");
    let imgContainer = document.getElementById("imgContainer");
    
        //appel de la fonction pour vérifier si le fichier est sous un format valide
        //Condition Si il n'y a pas de fichier
        if (ajoutPhotoBouton.files.length == 0) { 
            return; //La fonction s'arrête la 
        }
        //sinon
        else {
            //si le fichier est sous le bon format alors
            if (validFileType(ajoutPhotoBouton.files[0].type)) {
                //vérification de la taille du fichier
                //si fichier trop volumineux
                if (ajoutPhotoBouton.files[0].size > 4000000) {
                    alert('Photo trop volumineuse');
                }
                //sinon
                else {
                    const imgFile = document.createElement('img');
                    let imgErrorMessage = document.createElement("span");
    
                    imgFile.setAttribute("id", "imgPreview");
                    imgFile.setAttribute('alt', 'Aperçu de l\'image sélectionnée');
                    
                    imgErrorMessage.classList.add("imgErrorMessage"); // création des messages d'erreurs

                    imgContainer.appendChild(imgFile, imgErrorMessage); // ajout de l'élément imgFile au parent imgContainer
    
                    imgFile.src = URL.createObjectURL(ajoutPhotoBouton.files[0]); // création de l'url de la photo ajoutée
                    imgFile.className = 'img-uploaded';
                    
                    // Invisibilité des autres éléments de l'image container quand on preview l'image uploadée
                    ajoutPhotoLabel.style.display = "none";
                    let ajoutPhotoIcon = document.getElementById("ajoutPhotoIcon");
                    ajoutPhotoIcon.style.display = "none";
                    let pContainer = document.getElementById("pContainer");
                    pContainer.style.display = "none";

                // suppression des éléments d'erreur s'ils existent
                let imgErrorMessageExists = document.querySelector('.imgErrorMessage');

                if (imgErrorMessageExists) {
                    imgErrorMessageExists.remove();
                }
            }
        } else {
            alert('Format non accepté');
        }
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

// Ajout d'un élément
async function validateFormProject() {
    

    // Récupération des saisies pour la création du nouvel élément
    const imgUploaded = document.getElementById("ajoutPhotoBtn").files[0];
    
    const inputTitle = document.getElementById("titrePhoto").value;
    
    const selectCategorie = document.getElementById("categoriePhoto");
    const categoriePhotoId = selectCategorie.options[selectCategorie.selectedIndex].dataset.id;
    
  

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
        alert('L\'ajout de l\'image a été réalisé avec succès');
        // déclenchement du bouton tous, pour pouvoir afficher tous les projets
    
        // todo : fermer la modale
    } else if (response.status === 401 || 400) {
        alert('Veuillez ajouter un titre ou image');
        console.log("Action impossible");
    };
    
} 
;

//Changement de couleur du bouton validé
function changeBtnColor() {
    const validerBtn = document.getElementById("validerBtn");
    let inputTitle = document.getElementById("titrePhoto");

    if (ajoutPhotoBouton.files.length === 0 || inputTitle.value === "") {
        validerBtn.classList.add('validerBtnFalse');
    } else {
        validerBtn.classList.remove('validerBtnFalse');
    }

}

  
