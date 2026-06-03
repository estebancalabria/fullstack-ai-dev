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

# Desarrollo con IA

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
