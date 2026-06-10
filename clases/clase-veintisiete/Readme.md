# Clase Veintisiete - 10 de Junio del 2026

# Repaso

* Proyecto para esta clase
  * https://github.com/estebancalabria/v0-groq-chatbot-with-local-storage
  * Proyecto hecho en react
  * Trabajamos con NodeJS para ejecutar el proyecto localmente
  * Despliegue
    * Le hicimos deploy en Vercel
    * Lo subimos a github pages
* Programacion orientada a componentes
  * En la Web...
    * Frameworks/Librerias
        * React
        * Angular
        * Vue
    * Web Componentes (Nativos de HTML5)
* AIDev
  * Instalamos Ollama
  * Instalamos Claude Code
 
# Noticias

  * Microsoft micro dentro del navegador Edge desde React a Web Components
      * https://thenewstack.io/how-microsoft-edge-is-replacing-react-with-web-components/

# AiDev

## Migracion de React a Web Components con IA

* Verigicamos instalacion de Ollama y Claude

```
C:\>ollama --version
Warning: could not connect to a running Ollama instance
Warning: client version is 0.30.6

C:\>claude --version
2.1.165 (Claude Code)

```

* Preparar una carpeta con el proyecto origen

```
git clone https://github.com/estebancalabria/v0-groq-chatbot-with-local-storage
```

* Lo editamos con Visual Studio Code

* Levantamos el servicor de ollama

```
ollama serve
```

* Ejecutamos Claude code con un servidor de Ollama

```
ollama lauch claude
```
  
* Elijo el modelo minimax-m3

* Primero le preguntamos de que es el proyecto

```
> De que es el proyecto?                                                                                                               
```

* Me responde

```
  Thought for 8s, read 1 file, listed 1 directory (ctrl+o to expand)

● Sobre el proyecto

  Es un chatbot de Next.js potenciado por Groq (el modelo de IA de alta velocidad de Groq) con almacenamiento local. Generado con v0
  (https://v0.app) y conectado a un proyecto v0, así que cada cambio puede hacerse desde el chat de v0 y se hace commit/deploy
  automático a este repo.

  Stack principal:
  - Next.js (App Router, con app/page.tsx como punto de entrada)
  - Groq como proveedor de LLM
  - Almacenamiento local para historial/mensajes (en el navegador del usuario)

  Cómo ejecutarlo localmente:
  npm run dev
  Y abrir http://localhost:3000.

  Notas del repo actual:
  - Estás en la rama main y hay cambios sin commitear: el directorio dist/ fue reconstruido (archivos .js/.css viejos eliminados,
  nuevos generados) y aparece package-lock.json sin trackear — probablemente de un npm run build o npm install reciente.

  ¿Quieres que profundice en alguna parte (código, configuración de la API key de Groq, estructura del almacenamiento local)?

✻ Brewed for 27s
```

* Pedir que lo migre a web components

```
> Generar una carpeta /migracion y quiero migrar todo el proyecto a web components. Quiero un index.html, una carpeta components con
  todos los web components y el resto de los archivos necesarios. No quiero que dependa ni de react ni de ninguna libreria externa
  para componentes. Quiero que sea utilizanda el estnadar html5 de web compoenents
```

