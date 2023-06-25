const isAdmin = localStorage.getItem("token") ? true : false;


const login = document.getElementById('login');
const logout = document.getElementById('logout');

logout.addEventListener('click' , function() {    
    localStorage.clear();
    window.location.href = "./login.html";
});

if(isAdmin) {

    login.style.display = 'none';
    logout.style.display = 'inline';

    // autre elements

}
else
{
    login.style.display = 'inline';
    logout.style.display = 'none';

    // autre elements

}