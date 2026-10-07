# Clase 18 - 7 de Octubre del 2026

# Repaso

* Novedades
  * Jev-Ai
* Buenas Practicas
  * Evitar el uso de variables Globales
* Arquitectura de Sofware
  * Capa de Servicios
  * Receta para crear un Crud
* Testeo de Apis
  * Postman
  * Thurder client

---

# Novedad

* Nvidia esta dando modelos de IA para que la gente pruebe y use en forma gratuita
    * https://build.nvidia.com/models

# Recordatorio

* Para el que lo hizo recuerden entregar el Mini-TP para practicar la arquitectura en Capas
    * Completar este formulario una vez finalizado
      * https://forms.cloud.microsoft/Pages/ResponsePage.aspx?id=FPbD6dnIlUCa1IfSyafYxE4uGCthyi9EnQYg85vv3slUOVlOSTNOUUJLRTIzQ081TFJHWTVaNDNZTS4u

> [!NOTE]
> Tanto el TP como la participacion en kahoot sera tenido en cuenta como nota conceptual e informado segun el requerimiento de EducacionIT
> No importa si ganan o pierdan. Importa que participen (Y aprendan)

# Desarrolo Dev

* Para compartir el proyecto con un colega a nivel codigo fuente y trabjar colaborativamente en tiempo real que pueden usar:
  * Extension Live Share
* Si yo expongo una api en mi casa, como hago para que otro pueda acceder desde la suya
  * Ver mi direccion IP
  * Abrir un puerto en mi maquina
  * Habilitar el firewall de windows para permitir conexiones desde afuera
  * Ver si mi ISP soporta conexiones dede afuera
  * Someterme al peligro de dejar un puerto abierto y que me hackeen
* Subirlo a un servicio Online
 * Valido
 * Cada cambio que hago local tengo que subir todo el proyecto
 * Muy bueno para produccion, pero puede ser incomodo para pruebas
* Usar un servicio de port Forwarding
  * Yo me conecto a un servidor que expone mi servicio a internet
  * Vos no abris un puerto en tu pc, vos te conectas a un tercero que es el que te manda la info
  * Como un proxy
  * Opciones para port forwarding
    * ngrok
      * https://ngrok.com/
    * Nativo con vscode
 

## Port Worwarding nativo VSCode

* Inciar la api que hicmos la clase pasada

```
>python api.py
 * Serving Flask app 'api'
 * Debug mode: on
WARNING: This is a development server. Do not use it in a production deployment. Use a production WSGI server instead.
 * Running on http://127.0.0.1:5000
```

* Abrir una terminal de VSCode
  * Vemos que tiene una solapa "Ports"
   * Ponen Foward a port... Elijen el puerto 5000
   * Hacer el puerto 5000 publico
   * Ver que Microsoft te dio una url publica para api
   

# Arquitectura de Software

## Arquitectura Cliente-Servidor

* La clases pasadas estuvimos programando un backend (servidor)
* Me gustaria ahora utilizar una IA para programar el cliente

### Lovable

* Es una app que te programa todo el fontend basado en node / javascript
* Vamos con este prompt

```
Tengo un tunel a mi api local en "https://lg3zkhvf-5000.brs.devtunnels.ms/" (al ser una puerto de vscode la primera vez hay que confirmar ok) igual esto quiero que sea parametrizable por el usuario, que tenga un textbox. Mi api tiene los siguientes endpoints GET /alumos muestra todos.  GET /alumnos/id muestra con un id determinado. POST permite agregar un alumno.  Quiero que me generes un frontend moderno y elegante para mi api. un cliente. Que me muestre los alumnos cargados y me permita por medio de un formulario cargar un alumno nuevo.
```

Le adjunte el api.py y alumno.py para darle contexto

* Vamos a aguardar para ver el estado final

> [!NOTE]
> Hicimos una genialidad. Le dijimos "Dame un zip con todo el proyecto" en el chat de lovable y lo hizo!

```
Listo, tu proyecto completo está empaquetado.

Incluye 86 archivos: el código fuente (src/), configuración (package.json, bun.lock, vite.config.ts, tsconfig.json, eslint.config.js), public/, README.md y AGENTS.md. Dejé afuera las dependencias instaladas y los metadatos internos — al descomprimir, corre bun install y después bun run dev para levantarlo.
```

* Restructuracion
  * La api la vamos a poner en una carpeta llamada backend
  * Y el proyecto lo voy poner en una carpeta frontend
  * En una terminal voy a correr el backend con api.py en el puerto 5000

* PAra correr el proyecto de lovable necesito bun (un empaquetador)
  * https://bun.com/
 
* En otra terminal voy a correr el frontend con bun

```
bun install
bun run dev
```

* Me inicia en el 8080

```
>bun run dev
$ vite dev
The plugin "vite-tsconfig-paths" is detected. Vite now supports tsconfig paths resolution natively via the resolve.tsconfigPaths option. You can remove the plugin and set resolve.tsconfigPaths: true in your Vite config instead.

  VITE v8.1.5  ready in 23259 ms

  ➜  Local:   http://localhost:8080/
  ➜  Network: http://192.168.1.3:8080/
  ➜  press h + enter to show help

8:07:20 PM [vite] (client) [optimizer] bundling dependencies...
```

* No se conecta porque el API me da error de CORS

```
Access to fetch at 'http://localhost:5000/alumnos' from origin 'http://localhost:8080' has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present on the requested resource.
```

* Habilitar el CORS en Flask

# CORS

* Que es cors?
* CORS (Cross-Origin Resource Sharing o Intercambio de Recursos de Origen Cruzado) es un mecanismo de seguridad de los navegadores web que impide que un sitio web en un dominio (o puerto) realice peticiones a un servidor en un dominio diferente, a menos que el servidor lo autorice explícitamente

* Primero instalamos flask-cors
```
pip install flask-cors
```

* Luego modificamos el fuente
```
from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)
```

---
# Break hasta y 40
---
