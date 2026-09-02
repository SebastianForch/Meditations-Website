
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

// Funktion zum Öffnen des Popups (für Bild oder PDF)
function openPopup(type, source) {
    const popup = document.getElementById("popup");
    const popupContent = document.getElementById("popup-content");

    // Leere den Inhalt des Popups
    popupContent.innerHTML = "";

    if (type === "image") {
        // Erstelle ein Bild-Element für das Popup
        const img = document.createElement("img");
        img.src = source;
        img.alt = "Popup-Inhalt";
        img.style.maxWidth = "100%";
        img.style.maxHeight = "100%";
        img.style.objectFit = "contain";
        popupContent.appendChild(img);
    } else if (type === "pdf") {
        // Erstelle ein iframe-Element für die PDF (besser für Vollbild)
        const iframe = document.createElement("iframe");
        iframe.src = source;
        iframe.style.width = "100%";
        iframe.style.height = "100%";
        iframe.style.border = "none"; // Entfernt Rahmen
        popupContent.appendChild(iframe);
    }

    // Zeige das Popup an
    popup.style.display = "flex";
}

// Funktion zum Schließen des Popups
function closePopup() {
    document.getElementById("popup").style.display = "none";
}

// Schließen, wenn außerhalb des Popups geklickt wird
window.onclick = function(event) {
    const popup = document.getElementById("popup");
    if (event.target === popup) {
        closePopup();
    }
};
      