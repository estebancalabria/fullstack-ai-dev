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



  
