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

// Navigation inclusive dans la modale par le clavier //

document.addEventListener('keydown', function(e) {
    if (e.key === 'Tab') {
        handleTabInModal(e);
    }
});



function handleTabInModal(e) {
    // const modal = document.querySelector('.modal1'); 

    if (Modal1.style.display === 'none') return; // s'il n'y a pas de modal ouvert, ne faites rien

    const focusableElements = 'a[href], button, textarea, input[type="text"], input[type="radio"], input[type="checkbox"], select';
    const focusableItems = Array.from(Modal1.querySelectorAll(focusableElements));

    if (!focusableItems.length) return; // s'il n'y a pas d'éléments pouvant recevoir le focus, ne faites rien

    e.preventDefault();

    const currentIndex = focusableItems.findIndex(f => f === document.activeElement);

    let nextIndex;
    if (e.shiftKey) { // si la touche Shift est enfoncée, nous allons vers l'arrière
        nextIndex = currentIndex === 0 ? focusableItems.length - 1 : currentIndex - 1;
    } else { // sinon, nous allons vers l'avant
        nextIndex = currentIndex === focusableItems.length - 1 ? 0 : currentIndex + 1;
    }

    focusableItems[nextIndex].focus();
}

// Ce code commence par ajouter un gestionnaire d'événements à l'objet document qui 
// écoute les événements de type 'keydown'. Si la touche pressée est 'Tab', il appelle la fonction handleTabInModal().
// La fonction handleTabInModal() cherche d'abord un élément avec la classe '.modal.show', 
// qui est supposé être le modal actuellement ouvert. Ensuite, il trouve tous les 
// éléments à l'intérieur du modal qui peuvent recevoir le focus. Si la touche 'Tab' est pressée, 
// le focus est déplacé vers l'élément suivant (ou précédent si 'Shift' est également pressé) dans 
// le modal. Si le focus atteint la fin (ou le début) de la liste, il boucle et revient au début (ou à la fin).

function escapeModal(e) {
    if (e.key === "Escape" || e.key === "Esc") { //gestionnaire d'événements pour la touche "Escape" qui ferme la modale
        closeModal(e)
    }
}

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