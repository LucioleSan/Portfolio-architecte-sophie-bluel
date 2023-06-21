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


