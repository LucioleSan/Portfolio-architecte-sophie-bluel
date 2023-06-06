const gallery = document.querySelector(".gallery");
let worksList = [];

//APPEL DU FETCH

async function getWorks() {
      const response = await fetch('http://localhost:5678/api/works')
      const works = await response.json();
       console.log(response)
       worksList = works;

       Projets(worksList)

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

function Projets(works){
  works.forEach(element => {

        console.log(element)

        const carteProjet = document.createElement("figure");

        const imageProjet = document.createElement("img");
        imageProjet.setAttribute ('src', element.imageUrl);

        const titreProjet = document.createElement("figcaption");
        titreProjet.innerText = element.title;

        carteProjet.appendChild(imageProjet);
        carteProjet.appendChild(titreProjet);
        
        portfolio.appendChild(carteProjet);         
        
    });
    
}



          // FILTRES

          async function getAllCategories() {
            try {
                const res = await fetch("http://localhost:5678/api/categories");
                if (res.ok) {
                    const categories = await res.json();
                    return categories;
                }
            } catch (err) {
                console.error(err);
            }
        }

      
        async function generateFilters(categories) {
          // Création du filtre "Tous"
          const sectionGalleryFilter = document.querySelector(".filtres");
          const allFilterElement = document.createElement("button");        
          allFilterElement.classList.add("filtres");         
          allFilterElement.classList.add("selected");         
          allFilterElement.innerText = "Tous";

          
    allFilterElement.addEventListener("click", function() {    
      deselectAllFilters();    
      allFilterElement.classList.add("selected");    
      generateWorks(allFilterElement.innerText);
  });

  
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
          generateWorks(category.id);
      });
  }

  // Fonction pour désélectionner tous les filtres
  function deselectAllFilters() {
      const filterElements = document.querySelectorAll(".filtres");
      filterElements.forEach(filterElement => {
          filterElement.classList.remove("selected");
      });
  }
}
   