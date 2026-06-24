
const navbarToggle=document.querySelector('.navbar-toggle');
const navbarMenu=document.querySelector('.navbar-menu');

navbarToggle.addEventListener('click', () => {
    navbarToggle.classList.toggle('active');
    navbarMenu.classList.toggle('active');
});

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('sw.js')
      .then(registration => {
        console.log('ServiceWorker registriert:', registration.scope);
      })
      .catch(error => {
        console.log('ServiceWorker-Registrierung fehlgeschlagen:', error);
      });
  });
}

// Funktion zum Öffnen des Pop-Ups
        function openPopup() {
            document.getElementById("popup").style.display = "flex";
        }

        // Funktion zum Schließen des Pop-Ups
        function closePopup() {
            document.getElementById("popup").style.display = "none";
        }

        // Schließen, wenn außerhalb des Pop-Ups geklickt wird
        window.onclick = function(event) {
            const popup = document.getElementById("popup");
            if (event.target === popup) {
                closePopup();
            }
        }

      