/* eslint-disable no-unused-vars */
import '../styles/main.css';
import '../styles/tailwind.css';
import './views/components/nav-bar';
import Alpine from 'alpinejs';
import App from './views/app';

window.Alpine = Alpine;

Alpine.start();

const app = new App({
  button: document.querySelector('#hamburgerButton'),
  drawer: document.querySelector('#navigationDrawer'),
  content: document.querySelector('#mainContent'),
});

window.addEventListener('hashchange', () => {
  app.renderPage();
});

window.addEventListener('load', () => {
  app.renderPage();
});
