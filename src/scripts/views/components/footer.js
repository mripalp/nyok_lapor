class Footer extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = `
    
        `;
  }
}
customElements.define('footer', Footer);
