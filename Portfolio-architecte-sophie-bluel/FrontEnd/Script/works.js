

// const gallery = document.querySelector(".gallery");

// async function getWorks() {
//     const response = await fetch('http://localhost:5678/api/works'); 
//     const works = await response.json();
//     return works
//   }

 
//   getWorks().then(works => {
//   console.log(works)
//     for( item of works) {
//       gallery.innerHTML += `      
//       <figure>
// 					<img src="${item.imageUrl}" alt="${item.title}">
// 					<figcaption>${item.title}</figcaption>
// 				</figure>
//       `;
//     }

// })
// .catch (erreur => {
// console.log(erreur.message)
// }) ;


// displayWorks =(Works) => {



// }

        //APPEL DU FETCH

async function getWorks() {
          const response = await fetch('http://localhost:5678/api/works'); 
          const works = await response.json();
           
          if(reponse.ok){
          console.log(works);
      }else{
          throw new Error("erreur lors de l'appel API.");
      }
        }

        // BALISE DE RATTACHEMENT

const portfolio = document.querySelector(".gallery");

        // RECUPERATION

        function Projets(works){
          projets.forEach(element => {
              
              const carteProjet = document.createElement("figure");
              const imageProjet = document.createElement("img");
              imageProjet.src = element.imageUrl;
              const titreProjet = document.createElement("figcaption");
              titreProjet.innerHTML = element.title;
              
              portfolio.appendChild(sectionGallery);
              sectionGallery.appendChild(carteProjet);
              carteProjet.appendChild(imageProjet);
              carteProjet.appendChild(titreProjet);
              
          });
          
      }
            Projets(works);