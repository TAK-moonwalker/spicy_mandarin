const login = document.getElementById("login");
const logout = document.getElementById("logout");

const auth = true;

window.addEventListener('DOMContentLoaded', (e) => {
    if(!auth){
      login.style.display = "block";
      logout.style.display = "none";
  } else {
          login.style.display = "none";
      logout.style.display = "block";
  }

});
