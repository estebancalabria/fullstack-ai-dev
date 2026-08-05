class MiClima extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });

    this.shadowRoot.innerHTML = `
      <style>
        .card {
          font-family: Arial, sans-serif;
          max-width: 320px;
          margin: 20px auto;
          padding: 20px;
          border-radius: 16px;
          background: linear-gradient(135deg, #3b82f6, #2563eb);
          color: white;
          text-align: center;
          box-shadow: 0 8px 20px rgba(0,0,0,.15);
        }

        .temp {
          font-size: 3rem;
          font-weight: bold;
          margin: 10px 0;
        }

        .estado {
          font-size: 1.1rem;
          opacity: 0.9;
        }
      </style>

      <div class="card">
        <h2>🌤️ Clima Actual</h2>
        <div id="contenido">Obteniendo ubicación...</div>
      </div>
    `;
  }

  connectedCallback() {
    this.obtenerClima();
  }

  async obtenerClima() {
    const contenido = this.shadowRoot.getElementById("contenido");

    if (!navigator.geolocation) {
      contenido.innerHTML = "Geolocalización no soportada.";
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const lat = pos.coords.latitude;
        const lon = pos.coords.longitude;

        try {
          const respuesta = await fetch(
            `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`
          );

          const data = await respuesta.json();
          const clima = data.current_weather;

          contenido.innerHTML = `
            <div class="temp">${clima.temperature}°C</div>
            <div class="estado">💨 Viento: ${clima.windspeed} km/h</div>
            <div class="estado">📍 Lat: ${lat.toFixed(2)} | Lon: ${lon.toFixed(2)}</div>
          `;
        } catch (error) {
          contenido.innerHTML = "Error obteniendo el clima.";
          console.error(error);
        }
      },
      () => {
        contenido.innerHTML = "Permiso de ubicación denegado.";
      }
    );
  }
}

customElements.define("mi-clima", MiClima);