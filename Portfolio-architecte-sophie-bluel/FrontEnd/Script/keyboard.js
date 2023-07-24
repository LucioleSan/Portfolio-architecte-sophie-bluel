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


function escapeModal(e) {
    if (e.key === "Escape" || e.key === "Esc") { //gestionnaire d'événements pour la touche "Escape" qui ferme la modale
        closeModal(e)
    }
}