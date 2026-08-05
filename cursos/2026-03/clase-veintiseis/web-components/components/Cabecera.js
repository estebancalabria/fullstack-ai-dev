class Cabecera extends HTMLElement {
  constructor() {
    super();

    const shadow = this.attachShadow({ mode: 'open' });

    shadow.innerHTML = `
      <style>
        :host {
          display: block;
          font-family: 'Segoe UI', sans-serif;
        }

        header {
          background: linear-gradient(135deg, #2563eb, #1e40af);
          color: white;
          padding: 4rem 2rem;
          text-align: center;
          border-radius: 16px;
          box-shadow: 0 10px 25px rgba(0,0,0,.15);
        }
      </style>

      <header>
        <h1>Bienvenido a mi sitio de Web Components</h1>
        <p>Desarrollando interfaces modernas y reutilizables.</p>
      </header>
    `;
  }
}

customElements.define('mi-cabecera', Cabecera);