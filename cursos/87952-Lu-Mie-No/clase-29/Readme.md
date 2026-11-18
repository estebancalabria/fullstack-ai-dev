# Clase 29 - 18 de Noviembre del 2026

# Repaso

* AiDev
   * Usamos Github Copilot
     * Usamos SKILLS
         * .github//skills/<folder>/SKILL.md
         * Creamos una Skill para programar en python como yo quiero
* Tratamos de Ejecutar Claude Code Con Illama
   * Instalamos Claude Code
   * Installamos Ollama
   * Peeeroooo perrrrrrrro peeeeeeeeerooo...
      * Ollama ya no deja usar modelos OS en la nube gratis para probar Claude Code
      * Ahora solo con LLM local
     
# Novedades

* Artex
    * IA para buscar vulnerabilidades
    * Sistema que vuelve a los modelos de IA Super Inteligentes para buscar vulnerabilidades
    * Repositorio de Github
        * https://github.com/BaaRai/ARTEX
    * Noticia Advertencia FBI
        * https://www.criptonoticias.com/seguridad-bitcoin/fbi-alerta-artex-ia-permite-hackers-atacar/#google_vignette


# AiDev

## Context Engineering

* Vamos a crear una app sencilla y la bajamos localmente
* Usemos Base44 que no la usamos antes
    * https://base44.com/
    * Ahora es paga
* No lo podemos bajar asi que le pedi al chat que me genere un zip (muehehehe)
    * Que grande Alejandro Hackeando a la IA

* PRompt de REferencia
```
* Crear una aplicacion cliente servidor que implemente una todo list sencilla
* El servidor debe exponer una api rest y guardar todo en una base de datos sqlite
* El servidor que funcione con nodejs y express
* El frontend quiero que sea sencillo y se conecte con el servidor.
* Dividir frontend y backend en carpetas distintas
* El backend todo resuelto en un unico archivo server.js
```

* Lo hicimos independiente de Base44.md y lo descomprimimos en una carpeta (Queda subido a este repo)

* Instalamos las dependencias del package.json

```
npm install
```

> [!NOTE]
> En python instlabamos las librerias con pip install. Esto como es un proyecto de javascript utilizamos npm install (https://www.instagram.com/p/DQUdnV3jqke/?img_index=1)

> [!NOTE]
> En npm las dependencias de un proyecto estan en el archivp package.json. Para este proyecto

```json
{
  "name": "pendientes",
  "version": "1.0.0",
  "private": true,
  "description": "Lista de tareas cliente-servidor: Express, API REST y persistencia en archivo",
  "main": "server.js",
  "scripts": {
    "start": "node server.js",
    "dev": "node --watch server.js"
  },
  "dependencies": {
    "express": "^4.19.2"
  }
}

```

* Cuando hago npm install se crea una carpeta que se llama node_modules donde baja todas las dependencias
    * Y tambien baja las dependencias de las dependencias (El arbol de pdependencias)
    * Si veo la carpeta node_modules esta llena de carpetas (no solo express)
      * Express es una dependencia, pero esa es la que tiene todas esas otras dependencias que estan en

* La carpeta node_modules no la voy a subir al github
  * La idea es que el que se baje todo haga un npm install
  * Esto lo pongo en el archivo .gitignore

* Para ejecutarlo

```
node server.js
```

o

```
npm start
```

* Luego lo abro con el navegador en

```
http://localhost:3000/
```

# Viendo procesos en uso

* A mi el npm start me fallo porque tuve que el puerto 3000 lo tenia ocupado y tuve que ejecutar estos comandos: 
```
C:\Cursos\fullstack-ai-dev\cursos\87952-Lu-Mie-No\clase-29\pendientes>netstat -ano | findstr :3000
  TCP    0.0.0.0:3000           0.0.0.0:0              LISTENING       10888
  TCP    [::]:3000              [::]:0                 LISTENING       10888


C:\Cursos\fullstack-ai-dev\cursos\87952-Lu-Mie-No\clase-29\pendientes>tasklist /FI "PID  eq 10888"

Image Name                     PID Session Name        Session#    Mem Usage
========================= ======== ================ =========== ============
node.exe                     10888 Console                    2     41,212 K

C:\Cursos\fullstack-ai-dev\cursos\87952-Lu-Mie-No\clase-29\pendientes>taskkill /PID 10888 /F
SUCCESS: The process with PID 10888 has been terminated.
```

---
# Break hasta y 35
---
