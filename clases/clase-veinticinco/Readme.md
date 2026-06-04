# Clase Veinticinco - 03 de Junio 2026

# Repaso

 * Curso AIDev (Modulo 26-28)
   * Herramientas para Scaffolding
     * Bolt.New
     * Replit
     * Lovable
     * Base444
     * Vo (Vercell)
       * Te permite bajar el zip
    

# Noticias

* IA
    * There Is an AI For that
    * Ver el crecimiento exponencial de aplicacione de IA
* Proyecto parecido al que hicimos la clase pasada
    * https://github.com/pewdiepie-archdaemon/odysseus

> [!NOTE]
> Felicitaciones Lautaro por gener su primer kahoot!!!

# Programacion orientada a objetos

## Javascript

* Clase Persona en Javascript (ES6) (Forma Moderna)
	* Esta es la forma que ya estuvimos viendo cuando hablamos de objetos en javascript

```
// ES6 - Clase Persona
class Persona {
  constructor(nombre, edad, email) {
    this.nombre = nombre;
    this.edad = edad;
    this.email = email;
  }
  saludar() {
    return `Hola, soy ${this.nombre} y tengo ${this.edad} años.`;
  }
  esMayorDeEdad() {
    return this.edad >= 18;
  }
}
```

* Forma anterior o clasica de escribir clases en javascript
	 * Cada Funcion era en si misma una clase
	 * Podia usarla como funcion o como clase.
		  * Si adentro tenia this, posiblemenente era para usarla como clase

```
// Pre-ES6 (ES5) - con funciones constructoras
function Persona(nombre, edad, email) {
  this.nombre = nombre;
  this.edad = edad;
  this.email = email;
}

Persona.prototype.saludar = function() {
  return "Hola, soy " + this.nombre + " y tengo " + this.edad + " años.";
};

Persona.prototype.esMayorDeEdad = function() {
  return this.edad >= 18;
};
```

> [!NOTE]
> En javascript hay dos maneras distintas de definir una clas

* En ambos casos creo una persona con

```
let p = new Persona("juan", 23, "juan@gmail.com")
```



# Programacion orientada a componentes (Dentro de lo que son objetos)

* Objeto : Entidad que representa algo del mundo real capturando sus datos (variables) y sus comportamiento (metodos)
    * Los representabamos visualmente con UML
* Componente : Un objeto que tiene una representacion visual (Front End)
    * Contruccion de Interface graficas
    * Suele tener un meotodo "Dibujar", "Mostrar", "Render" que lo grafica en la inrfaz grafica
    * Si es html el metodo se llama Render y devuelve HTML

* Ejemplo. Si tengo una web y la quiero dividir como en piezas de rompecabezas
    * Header
    * Footer
    * Menu
    * Side Bar

<img width="538" height="479" alt="image" src="https://github.com/user-attachments/assets/7a749a76-4af8-43fb-b66c-03a53d553fb9" />

* Desarrollo de la WEB
  * Antes
    * Html + Javascript + CSS ---> Javascript Vainilla, Javascript Puro
    * Ejecucion
      * Le doy doble clik al index.html o lo corro en un web server
          * Visual Studio Code tiene Live Server
          * Tambien con google app scripts
              * https://script.google.com/
    * Tecnologias
      * Html
      * Javascript
      * CSS
  * Ahora
    * Programa Orientado a componentes
    * Tecnologias
        * Frameworks/Libreria
            * React
              * NextJS (SSR)
            * Angular
            * Vue
        * Node (Javascript del lado del servidor)
    * Ejecucion
      * (Codigo/Varios Componentes) -> (compilacion/tranpilacion) -> (bundle html/javascript/css)  ---> Servidor Web
      * Todos incluyen un web server de desarrollo
    * Orientada a la productividad del desarrollador

## Nuesstra primer App Orientad a Componentes

* No aseguramos que tenemos node y npm instalado

```
> node -v
> npm -v
```
  
* Vamos a crear un proyecto de react

```
npm create vite@latest mi-app -- --template react
```

* Vamos a editar el proyecto con code

```
code .
```

* Entendaos el proyecto
    * package.json
        * Indica que es un proyecto de node (Todo los proyectos de node tienen un package.json)
        * Aca se registran las librerias que utliza mi proyecto
    * node_modules
        * Es la carpeta donde se instalan las librerias
    * src
      * Codigo y componentes

* Vamos a crear nuestro primer componente
    * creo el archivo /src/compononents/Cabecera.jsx

* Le pido a Copilot
```
Crearme un componente Cabecera.jsx de tipo clase que de la bienvenida a esta increible aplicacion web y que se vea super
```

* Me Genera

```
import { Component } from 'react'
import './Cabecera.css'

class Cabecera extends Component {
	render() {
		return (
			<header className="cabecera" role="banner">
				<p className="cabecera__eyebrow">Bienvenido al futuro</p>
				<h1 className="cabecera__title">Esta increible aplicacion web</h1>
				<p className="cabecera__subtitle">
					Diseñada para que cada clic se sienta rapido, claro y espectacular.
				</p>

				<div className="cabecera__chips" aria-label="Características destacadas">
					<span>UI moderna</span>
					<span>React + Vite</span>
					<span>Experiencia premium</span>
				</div>
			</header>
		)
	}
}

export default Cabecera
```

> [!NOTE]
> Cada vez que generamos un componente es como si estuvieramos extendiendo el lenguaje html con nuevos tags
> Aca creamos el tag <Cabecera>

* En el app.jsx me queda:

```
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Cabecera />
      ...
```

* Si lo quiero ejecutar (dentro de la carpeta del proyecto)

```
npm run dev
```

* Vamos a agregar el componente PieDePagina con la ayuda la IA (Esta vez de tipo funcion)

```
Crear un componente para el pie de pagina de tipo funcion que sea super
```

* Copilot me crea...

```
import './PieDePagina.css'

function PieDePagina() {
	const year = new Date().getFullYear()

	return (
		<footer className="pie-de-pagina" role="contentinfo">
			<div className="pie-de-pagina__grid">
				<div>
					<h3 className="pie-de-pagina__title">
						Gracias por llegar hasta aqui. Lo mejor de esta aplicacion apenas
						comienza.
					</h3>
					<p className="pie-de-pagina__subtitle">
						Construido con energia creativa, codigo limpio y una experiencia que
						se siente premium.
					</p>
				</div>

				<span className="pie-de-pagina__marca">{year} Fullstack AI</span>
			</div>
		</footer>
	)
}

export default PieDePagina
```

> [!NOTE]
> Si bien ambos componentes tienen sintaxis distintas, ambos son clases de javascript que se instancian en objeto

* class Cabecera extends Component {
* function PieDePagina() {



# Desarrollo con IA

## Generacion de componentes con claude

* Claude Web permite desarrollar componentes en react

```
import { useState, useRef } from "react";

const MONTHS = [
  "enero","febrero","marzo","abril","mayo","junio",
  "julio","agosto","septiembre","octubre","noviembre","diciembre"
];

function daysInMonth(m, y) {
  return new Date(y, m, 0).getDate();
}

function validate(d, m, y) {
  if (!d || !m || !y || y.length < 4) return null;
  const dd = parseInt(d), mm = parseInt(m), yy = parseInt(y);
  if (isNaN(dd) || dd < 1 || dd > 31) return { error: "Día inválido." };
  if (isNaN(mm) || mm < 1 || mm > 12) return { error: "Mes inválido." };
  if (isNaN(yy) || yy < 1900 || yy > 2100) return { error: "Año fuera de rango." };
  const max = daysInMonth(mm, yy);
  if (dd > max) return { error: `${MONTHS[mm - 1]} de ${yy} tiene solo ${max} días.` };
  return { result: `${dd} de ${MONTHS[mm - 1]} de ${yy}` };
}

export default function DatePicker({ onChange }) {
  const [day, setDay] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const mmRef = useRef();
  const yyyyRef = useRef();

  const status = validate(day, month, year);

  function onlyDigits(e) {
    if (
      !/[\d]/.test(e.key) &&
      !["Backspace", "Tab", "ArrowLeft", "ArrowRight", "Delete"].includes(e.key)
    ) {
      e.preventDefault();
    }
  }

  function handleDay(e) {
    const v = e.target.value.slice(0, 2);
    setDay(v);
    if (v.length === 2) mmRef.current.focus();
    onChange?.(validate(v, month, year)?.result ?? null);
  }

  function handleMonth(e) {
    const v = e.target.value.slice(0, 2);
    setMonth(v);
    if (v.length === 2) yyyyRef.current.focus();
    onChange?.(validate(day, v, year)?.result ?? null);
  }

  function handleYear(e) {
    const v = e.target.value.slice(0, 4);
    setYear(v);
    onChange?.(validate(day, month, v)?.result ?? null);
  }

  return (
    <div style={{ maxWidth: 360 }}>
      <p style={{ fontSize: 13, color: "gray", marginBottom: 8 }}>Fecha</p>

      <div style={{ display: "flex", gap: 8, alignItems: "flex-end" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
          <label style={{ fontSize: 11 }}>DÍA</label>
          <input
            id="dp-dd"
            inputMode="numeric"
            placeholder="DD"
            maxLength={2}
            value={day}
            style={{ width: 58, textAlign: "center", fontSize: 15, padding: "8px 6px" }}
            onKeyDown={onlyDigits}
            onChange={handleDay}
          />
        </div>

        <span style={{ fontSize: 18, paddingBottom: 10 }}>/</span>

        <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
          <label style={{ fontSize: 11 }}>MES</label>
          <input
            id="dp-mm"
            ref={mmRef}
            inputMode="numeric"
            placeholder="MM"
            maxLength={2}
            value={month}
            style={{ width: 58, textAlign: "center", fontSize: 15, padding: "8px 6px" }}
            onKeyDown={onlyDigits}
            onChange={handleMonth}
          />
        </div>

        <span style={{ fontSize: 18, paddingBottom: 10 }}>/</span>

        <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
          <label style={{ fontSize: 11 }}>AÑO</label>
          <input
            id="dp-yyyy"
            ref={yyyyRef}
            inputMode="numeric"
            placeholder="AAAA"
            maxLength={4}
            value={year}
            style={{ width: 76, textAlign: "center", fontSize: 15, padding: "8px 6px" }}
            onKeyDown={onlyDigits}
            onChange={handleYear}
          />
        </div>
      </div>

      {status?.error && (
        <p style={{ color: "red", fontSize: 13, marginTop: 8 }}>{status.error}</p>
      )}
      {status?.result && (
        <p style={{ fontSize: 14, marginTop: 12 }}>{status.result}</p>
      )}
    </div>
  );
}
```

## Proyecto con el que vamos a trabajar

* Clonar el proyecto que hicimos la clase pasada con Vercell (v0)
    * https://github.com/estebancalabria/v0-groq-chatbot-with-local-storage

* Descargar el repo
```
git clone
```

* Descripcion del Repo
  * Tecnologia : TypeScrypt/React
  * Estilo de Programacion: 



* 
