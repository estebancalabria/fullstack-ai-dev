# Clase Veintiseis - 5 de Junio del 2026

# Repaso

* Proyecto de ChatBot con Grok
  * Quedo pendientes subirlo a github pages
  * https://github.com/estebancalabria/v0-groq-chatbot-with-local-storage
  * Lo ejecutamos localmente
* Programacion Orientada a Objetos
  * Programacion Orientada a Compoenntes
    * Componente : Un objeto que tiene una representacion visual
    * Programacion orientada a componentes en la Web
        * Generamos una aplicacion de Reacr
          * NodeJS
          * Vite
  * Objetos en Javascript
    * Vanilla Javascript vs Librerias Frameworks (React, VUE, Angular, etc)
    * Sintaxis
      * Hay dos sintaxis para definir una clase
        * Forma ES6 : class : mas parecida a cualquier otro lenguaje
        * Forma Tradicional : function : Las funciones definen clases

# Proyecto del ChatBot

* https://github.com/estebancalabria/v0-groq-chatbot-with-local-storage

* Vamos a:
  * Subir a github pages (Poner Online)
  * Subir a otra plataforma como vercel
  * Compartirlo localmene
 
* Instalacion

```
> npm install
> npm run build
```

* Para crear un compilado

```
> npm run build
```

* Lo empaqueta todo en la carpeta /dist/. Esto es lo que tengo que subir al server
    * Empaqueta en
      * Un index.html
      * Un /assets/<nombre raro>.js empaquetado y ofuscado
      * Un /assets/<nombre raro>.css
      * Arhivos de imagenes

## Compatirlo localmente

* En /dist/ hacemos click en index.html y ponemos "Open with Live Server"
* Me abre un http://127.0.0.1:5500/dist/index.html para verlo localmente
* Para "Compartirlo" ir a una terminal de VSCode y en la solapa de puertos exportar en un tunel el puerto 5500 y hacerlo publico
* Otras herramientas de Tunneling
  * https://www.instagram.com/p/DWCQy8vlUlT/?img_index=11
 
## Compartirlo en github pages

* https://docs.github.com/es/pages
* Para usarlo
  * Ir a mit github https://github.com/<nombre-usuario>
  * Vamos a crear un repo especial que se llama <nombre-usuario>.github.io
  * Subo el contenido de la carpeta /dist
* Accedo con <nombre-usuario>.github.io


## Compartirlo en algun Web Hosting

* Por ejemplo en vercel
  * https://vercel.com/
* Hacemos un deploy directamente desde el repositorio de Github que tiene los fuentes
* Otras herramientas
    * https://www.instagram.com/p/DOKQgB3jpFQ/?img_index=1

---

# Web Componentes

* Los Web Components son componentes que funcionan nativamnte sin usar librerias

* El el 2011 nacio React (De Facebook)
* Segun el estandar HTML se definio el concepto de los Web Components
* En la indistria REact supero a los Web components en su momento
  * Hoy en dia esta tendencia se esta revirtiendo en alguno casos
  * Hay muchos proyectos que se migran de React a Web Coponents

> [!NOTE]
> Los web components son estandar de HTML

## Nuestro primer web component
  
* Editamos una carpeta nueva con VSCode

* Generar un Index.html vacio

* Le pedimos a la IA que me genere el codigo de un web component

```
Creame un web component Cabecera que muestre una cabecera html elegante que diga "Bienvenido a mi sitio de Web Components" Que se vea profesional y moderna
```

* Me genero este codigo

```
<script>
class Cabecera extends HTMLElement {
  constructor() {
    super();

    const shadow = this.attachShadow({ mode: 'open' });

    shadow.innerHTML = `
      <style>
        :host {
          display: block;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }

        header {
          background: linear-gradient(135deg, #2563eb, #1e40af);
          color: white;
          padding: 4rem 2rem;
          text-align: center;
          border-radius: 16px;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
        }

        h1 {
          margin: 0;
          font-size: 2.8rem;
          font-weight: 700;
          letter-spacing: -1px;
        }

        p {
          margin-top: 1rem;
          font-size: 1.2rem;
          opacity: 0.9;
        }

        @media (max-width: 768px) {
          h1 {
            font-size: 2rem;
          }

          p {
            font-size: 1rem;
          }
        }
      </style>

      <header>
        <h1>Bienvenido a mi sitio de Web Components</h1>
        <p>Desarrollando interfaces modernas, reutilizables y desacopladas con estándares web.</p>
      </header>
    `;
  }
}

customElements.define('mi-cabecera', Cabecera);
</script>
```

* Lo incorporamos en el html

```
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <script>
        class Cabecera extends HTMLElement {
  constructor() {
    super();

    const shadow = this.attachShadow({ mode: 'open' });

    shadow.innerHTML = `
      <style>
        :host {
          display: block;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }

        header {
          background: linear-gradient(135deg, #2563eb, #1e40af);
          color: white;
          padding: 4rem 2rem;
          text-align: center;
          border-radius: 16px;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
        }

        h1 {
          margin: 0;
          font-size: 2.8rem;
          font-weight: 700;
          letter-spacing: -1px;
        }

        p {
          margin-top: 1rem;
          font-size: 1.2rem;
          opacity: 0.9;
        }

        @media (max-width: 768px) {
          h1 {
            font-size: 2rem;
          }

          p {
            font-size: 1rem;
          }
        }
      </style>

      <header>
        <h1>Bienvenido a mi sitio de Web Components</h1>
        <p>Desarrollando interfaces modernas, reutilizables y desacopladas con estándares web.</p>
      </header>
    `;
  }
}

customElements.define('mi-cabecera', Cabecera);
    </script>
</head>
<body>
    <mi-cabecera></mi-cabecera>
</body>
</html>
```

* Agregamos otro web component

```
Haceme un web component "Contador" que tenga dos botones +,- y reset y que muestre un label el valor del contador que se va actualizando
```

> [!NOTE]
> Tutorial de Claude:
> https://claude.ai/public/artifacts/93c5635e-372d-426b-a493-18ae550c1a87

* Genera

```
<script>
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
        :host {
          display: flex;
          justify-content: center;
          font-family: Arial, sans-serif;
          margin: 20px;
        }

        .contador {
          background: #ffffff;
          border-radius: 12px;
          padding: 20px;
          box-shadow: 0 4px 12px rgba(0,0,0,0.1);
          text-align: center;
          min-width: 250px;
        }

        .valor {
          font-size: 3rem;
          font-weight: bold;
          margin-bottom: 20px;
          color: #333;
        }

        .botones {
          display: flex;
          gap: 10px;
          justify-content: center;
        }

        button {
          border: none;
          border-radius: 8px;
          padding: 10px 16px;
          font-size: 1rem;
          cursor: pointer;
          transition: transform 0.2s, opacity 0.2s;
        }

        button:hover {
          transform: translateY(-2px);
          opacity: 0.9;
        }

        .sumar {
          background: #22c55e;
          color: white;
        }

        .restar {
          background: #ef4444;
          color: white;
        }

        .reset {
          background: #3b82f6;
          color: white;
        }
      </style>

      <div class="contador">
        <div class="valor">${this.valor}</div>

        <div class="botones">
          <button class="restar">-</button>
          <button class="reset">Reset</button>
          <button class="sumar">+</button>
        </div>
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
</script>
```

* Queiro un web component que muestre el clima en el lugar donde esta el usuario

```
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
```

## Separando en varios archivos

* Separamos en varios archivos

---

# Preparaciones para la proxima clase

* Instalar Ollama
 * Ir a https://ollama.com/
 * Ejecutar en powershell "irm https://ollama.com/install.ps1 | iex"

* Instalar Claude Code
 * https://claude.com/product/claude-code
  * En powershell "irm https://claude.ai/install.ps1 | iex"

# Proxia Clase

> Vamos a migrar nuestro proyecto de React a Web Components utilizando Claude Coe
