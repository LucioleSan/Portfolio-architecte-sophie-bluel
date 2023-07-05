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

    // if (modal === null) return /* si la modale n'existe pas, on sort de la fonction */
    // if (previouslyFocusedElement !== null) previouslyFocusedElement.focus() 
    
     Modal1.style.display = 'none' /* cache la modale */
    // modal.setAttribute('aria-hidden', 'true') 
    // modal.removeAttribute('aria-modal')
    // modal.removeEventListener('click', closeModal)
    // modal.querySelector('.closeModal').removeEventListener('click', closeModal)
    // modal.querySelector('.closeModal').removeEventListener('click', stopPropagation)
    // modal = null
};



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

    figure.append(img, figcaption, categoryId, deleteWork); 

    modalGallery.append(figure);
    
}

// Ouvrir Ajouter une photo avec l'évènement click
const ajout = document.getElementById("ajout-image");

ajout.addEventListener("click", openPicture);

function openPicture() {  
    
    modalAjout.style.display = "flex";
    modalPhoto.style.display='none';
  }

//   Clique pour le retour en arrière 

const back = document.getElementById("arrowBack");

back.addEventListener("click", arrow);
function arrow(){
    modalAjout.style.display = "none";
    modalPhoto.style.display='flex';
}

