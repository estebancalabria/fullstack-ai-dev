class Contador extends HTMLElement {
  constructor() {
    super();

    this.valor = 0;
    this.attachShadow({ mode: "open" });

    this.render();
  }

  render() {
    this.shadowRoot.innerHTML = `
      <style>
        .contador {
          text-align: center;
          padding: 20px;
          margin: 10px;
          border-radius: 10px;
          box-shadow: 0 4px 10px rgba(0,0,0,.1);
        }

        .valor {
          font-size: 3rem;
          margin-bottom: 10px;
        }

        button {
          padding: 8px 15px;
          margin: 5px;
          cursor: pointer;
        }
      </style>

      <div class="contador">
        <div class="valor">${this.valor}</div>

        <button class="restar">-</button>
        <button class="reset">Reset</button>
        <button class="sumar">+</button>
      </div>
    `;

    this.shadowRoot.querySelector(".sumar")
      .addEventListener("click", () => {
        this.valor++;
        this.actualizar();
      });

    this.shadowRoot.querySelector(".restar")
      .addEventListener("click", () => {
        this.valor--;
        this.actualizar();
      });

    this.shadowRoot.querySelector(".reset")
      .addEventListener("click", () => {
        this.valor = 0;
        this.actualizar();
      });
  }

  actualizar() {
    this.shadowRoot.querySelector(".valor").textContent = this.valor;
  }
}

customElements.define("mi-contador", Contador);