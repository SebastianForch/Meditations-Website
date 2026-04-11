
const navbarToggle=document.querySelector('.navbar-toggle');
const navbarMenu=document.querySelector('.navbar-menu');

navbarToggle.addEventListener('click', () => {
    navbarToggle.classList.toggle('active');
    navbarMenu.classList.toggle('active');
});

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/Meditations-Website/sw.js')
      .then(registration => {
        console.log('ServiceWorker registriert:', registration.scope);
      })
      .catch(error => {
        console.log('ServiceWorker-Registrierung fehlgeschlagen:', error);
      });
  });
}