// Modal

const Modal1 = document.getElementById('modal1');
Modal1.style.display='none';


const ModalEdition = document.getElementById('modalEdition');
ModalEdition.addEventListener("click", function() {    
    Modal1.style.display='flex'
});


const modalPhoto= document.getElementById('modalPhoto');

const modalAjout= document.getElementById('modalAjout');
modalAjout.style.display='none'

/*Création de la constante closeModal */
function closeModal(e) {
    if (modal === null) return /* si la modale n'existe pas, on sort de la fonction */
    if (previouslyFocusedElement !== null) previouslyFocusedElement.focus() 
    e.preventDefault() 
    modal.style.display = 'none' /* cache la modale */
    modal.setAttribute('aria-hidden', 'true') 
    modal.removeAttribute('aria-modal')
    modal.removeEventListener('click', closeModal)
    modal.querySelector('.closeModal').removeEventListener('click', closeModal)
    modal.querySelector('.closeModal').removeEventListener('click', stopPropagation)
    modal = null
};

// Navigation inclusive dans la modale par le clavier //

document.addEventListener('keydown', function(e) {
    if (e.key === 'Tab') {
        handleTabInModal(e);
    }
});

function handleTabInModal(e) {
    const modal = document.querySelector('.modal1'); 

    if (!modal) return; // s'il n'y a pas de modal ouvert, ne faites rien

    const focusableElements = 'a[href], button, textarea, input[type="text"], input[type="radio"], input[type="checkbox"], select';
    const focusableItems = Array.from(modal.querySelectorAll(focusableElements));

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

