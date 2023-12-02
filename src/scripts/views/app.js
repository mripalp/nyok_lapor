import UrlHandler from '../routes/url-handler';
import routes from '../routes/routes';

class App {
  constructor({ button, drawer, content }) {
    this._button = button;
    this._drawer = drawer;
    this._content = content;

    // this._initialAppShell();
  }

  _initialAppShell() {
    // eslint-disable-next-line no-undef
    DrawerInitializer.init({
      button: this._button,
      drawer: this._drawer,
      content: this._content,
    }); // kita bisa menginisiasikan komponen lain bila ada
  }

  async renderPage() {
    const url = UrlHandler.parseActiveUrlWithCombiner();
    const page = routes[url];
    this._content.innerHTML = await page.render();
    await page.afterRender();
  }
}

export default App;
