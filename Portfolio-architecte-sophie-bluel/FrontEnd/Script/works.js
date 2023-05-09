// appel du fetch

const reponse = await fetch("http://localhost:5678/api/works");
const projets = await reponse.json();

if(reponse.ok){
    console.log(projets);
}else{
    throw new Error("Impossible d'acceder aux travaux !");
}

const portfolio = document.querySelector("#portfolio");