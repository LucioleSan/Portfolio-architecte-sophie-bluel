const isAdmin = localStorage.getItem("token") ? true : false;


const login = document.getElementById('login');
const logout = document.getElementById('logout');

const navEdition = document.getElementById('navEdition')
const filtres = document.getElementById('filtres')

const modify1 = document.querySelector('.modify1')
const modify2 = document.querySelector('.modify2')

logout.addEventListener('click' , function() {    
    localStorage.clear();
    window.location.href = "./login.html";
});

if(isAdmin) {

    login.style.display = 'none';
    logout.style.display = 'inline';

    filtres.style.display = 'none';
    // navEdition.style.display ="block";

    modify1.style.display = 'inline';
    modify2.style.display = 'inline';

    // autre elements

}
else
{
    login.style.display = 'inline';
    logout.style.display = 'none';

    filtres.style.display = 'inline';

    navEdition.style.display = 'none';
    
    modify1.style.display = 'none';
    modify2.style.display = 'none';

    // autre elements

}