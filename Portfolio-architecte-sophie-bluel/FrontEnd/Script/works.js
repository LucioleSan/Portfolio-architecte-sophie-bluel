const gallery = document.querySelector(".gallery");
let worksList = [];

//APPEL DU FETCH

async function getWorks() {
      const response = await fetch('http://localhost:5678/api/works')
      const works = await response.json();
    //    console.log(response)
       worksList = works;

       Projets(0);
       getProjectModal();

      if(response.ok){
        console.log(works);
      }else{
          throw new Error("erreur lors de l'appel API.");
      }
}

getWorks()


// BALISE DE RATTACHEMENT

 const portfolio = document.querySelector(".gallery");

// RECUPERATION

function Projets(CurrentCat){

    portfolio.innerHTML = "";

    worksList.forEach(element => {

        console.log(element.categoryId)

        if(element.categoryId === CurrentCat || CurrentCat === 0) {
            const carteProjet = document.createElement("figure");

            const imageProjet = document.createElement("img");
            imageProjet.setAttribute ('src', element.imageUrl);

            const titreProjet = document.createElement("figcaption");
            titreProjet.innerText = element.title;

            carteProjet.appendChild(imageProjet);
            carteProjet.appendChild(titreProjet);
            
            portfolio.appendChild(carteProjet);   
        }

              
        
    });
    
}



    // FILTRES

    async function getAllCategories() {
        try {
            const res = await fetch("http://localhost:5678/api/categories");
            if (res.ok) {
                const categories = await res.json();
                // return categories;
                generateFilters(categories)
            }
        } catch (err) {
            console.error(err);
        }
    }

    getAllCategories();

    async function generateFilters(categories) {

        // Création du filtre "Tous"
        const sectionGalleryFilter = document.querySelector(".filtres");
        const allFilterElement = document.createElement("button");

        allFilterElement.classList.add("gallery-filter");         
        allFilterElement.classList.add("selected");  

        allFilterElement.innerText = "Tous";
        
        allFilterElement.addEventListener("click", function() {    
            deselectAllFilters();    
            allFilterElement.classList.add("selected");    
            Projets(0);
        });


        // Création Option catégorie
        const selectCategorie = document.getElementById("categoriePhoto");

        sectionGalleryFilter.appendChild(allFilterElement);

        // Itération à travers les catégories récupérées depuis l'API
        for (let i = 0; i < categories.length; i++) {
            const category = categories[i];    
            const filterElement = document.createElement("button");     
            filterElement.classList.add("gallery-filter");

            filterElement.innerText = category.name;     
            sectionGalleryFilter.appendChild(filterElement);

            
            filterElement.addEventListener("click", function() {         
                deselectAllFilters();  

                filterElement.classList.add("selected");
                console.log(category.id);
                Projets(category.id);
            });

            const newOption= document.createElement('option');
                newOption.setAttribute('value',category.id)
                const newContentOption= document.createTextNode(category.name)
                newOption.appendChild(newContentOption) 

            selectCategorie.appendChild(newOption) 
    }

    

  // Fonction pour désélectionner tous les filtres
  function deselectAllFilters() {
      const filterElements = document.querySelectorAll(".gallery-filter");
      filterElements.forEach(filterElement => {
          filterElement.classList.remove("selected");
      });
  }
}