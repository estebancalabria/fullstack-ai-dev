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

# Context Engineering

* Hay un moton de ejemplos en youtube de personas que utilizan Claude Code para hacer juegos completos
  * https://www.youtube.com/watch?v=1AsA5cZfeew
  * https://www.youtube.com/watch?v=VCdTr6zQsXI
  * https://www.youtube.com/watch?v=tpbXZyRxWNY
  * https://www.youtube.com/watch?v=_Ft2enKg4cU
  * https://www.youtube.com/watch?v=F0hHY0D-WTk
  * https://www.youtube.com/watch?v=XTONeqPuh_4
  * https://www.youtube.com/watch?v=PWJ1KaR_A70
  * https://www.youtube.com/watch?v=A4QYEDQCnaQ&t=1391s
  * https://www.youtube.com/watch?v=Njuu80s6emM

> [!NOTE]
> En general nunca los terminan a un 100 y lo que hicieron los juegos declaran que esta muy bueno pero que no entiende el codigo y le falta para terminarlo

> [!NOTE]
> A ninguno le salio gratis hacer esos juegos los costes van de 20 a 200+ dolares (sin contar las horas que le pusieran atras)

* Vismo la ppt de context engineering que proximamente va a estar en el github del profe

* Entonces lo primero que tenemos que hacer cuando tomamos un proyecto es generar el archivo de instrucciones
    * Github Copilot tenemos que generar el archivo .github/copilot-instructions.md

* Linkds de Documentacion
  * Adding repository custom instructions for GitHub Copilot
    * https://docs.github.com/en/copilot/how-tos/copilot-on-github/customize-copilot/add-custom-instructions/add-repository-instructions?ref=apidog.com&utm_source=chatgpt.com
    * Aca tiene un prompt como generar el archivo de copilot-instructions
  * Custom instructions for GitHub Copilot
      *  https://docs.github.com/en/copilot/concepts/prompting-and-context/custom-instructions

* Prompt sugerido para hacer el obboarding del proyecto y generar el copit-instructions.md
```
# Tarea: Generar instrucciones de Copilot Cloud Agent para la carpeta actual

Tu tarea es incorporar las instrucciones necesarias para que GitHub Copilot Cloud Agent pueda trabajar eficientemente en el proyecto ubicado en la **carpeta actual**, creando un archivo `.github/copilot-instructions.md`.

## 1. Alcance de la tarea (MUY IMPORTANTE)

El proyecto que debes analizar está ubicado en la carpeta actual, que puede ser un subdirectorio dentro de un repositorio Git más grande.

**Debes limitar absolutamente todo el análisis a la carpeta actual y sus subdirectorios.**

- No explores, analices ni documentes archivos ubicados fuera de la carpeta actual.
- No recorras el repositorio padre ni otros proyectos que puedan existir en él.
- No utilices información de otros directorios del repositorio para inferir la arquitectura o el funcionamiento de este proyecto.
- No modifiques archivos fuera de la carpeta actual.
- El archivo `.github/copilot-instructions.md` debe crearse dentro de la carpeta actual, en su subdirectorio `.github`.
- Si existe un `.github/copilot-instructions.md` en la carpeta actual, revísalo y actualízalo en lugar de sobrescribirlo sin analizarlo.

Considera la carpeta actual como la raíz independiente del proyecto a documentar, independientemente de su ubicación dentro del repositorio Git.

## 2. Idioma

**Toda la documentación y las instrucciones deben estar escritas en español.**

Esto incluye descripciones, explicaciones, comandos comentados, procedimientos, advertencias y recomendaciones.

Conserva en su idioma original los nombres de tecnologías, comandos, archivos, variables, APIs y términos técnicos cuando corresponda.

## 3. Objetivo

Realizar un onboarding de Copilot Cloud Agent para que pueda trabajar en este proyecto como si fuera la primera vez que lo encuentra.

Las instrucciones deben:

- Reducir la exploración innecesaria del código.
- Evitar errores al ejecutar comandos, compilar y validar cambios.
- Identificar rápidamente dónde implementar cada tipo de modificación.
- Conocer las dependencias, herramientas y configuraciones necesarias.
- Reproducir correctamente los procesos de desarrollo y validación.
- Reducir la probabilidad de generar cambios que rompan el proyecto o sus pipelines de CI/CD.

El resultado debe ser práctico, preciso y orientado a la ejecución, no una descripción genérica del proyecto.

## 4. Inventario del proyecto

Realiza un análisis exhaustivo de la carpeta actual y sus subdirectorios.

Examina, según corresponda:

- README y documentación del proyecto.
- Archivos CONTRIBUTING y guías de desarrollo.
- Archivos de configuración.
- Archivos de dependencias y gestores de paquetes.
- Scripts de instalación, inicialización, compilación y ejecución.
- Scripts de testing y linting.
- Configuraciones de frameworks y runtimes.
- Tests y fixtures.
- Archivos Docker y configuraciones de contenedores.
- Workflows de GitHub Actions que estén dentro del alcance de la carpeta actual.
- Archivos de configuración de CI/CD.
- Comentarios relevantes en el código, especialmente TODO, FIXME, HACK y workarounds.
- Archivos principales de implementación y puntos de entrada de la aplicación.

No es necesario incluir archivos irrelevantes, dependencias descargadas, artefactos generados ni contenido redundante.

## 5. Información que debe contener el archivo

### A. Descripción general

Documenta:

- Qué hace el proyecto.
- Qué problema resuelve.
- Tipo de aplicación o proyecto.
- Lenguajes utilizados.
- Frameworks y bibliotecas principales.
- Runtime y versiones requeridas.
- Dependencias relevantes.
- Herramientas de desarrollo utilizadas.

### B. Arquitectura y estructura

Describe la organización del proyecto:

- Directorios principales y su responsabilidad.
- Archivos de configuración importantes.
- Puntos de entrada de la aplicación.
- Componentes y módulos principales.
- Relaciones y dependencias entre componentes.
- Ubicación de tests.
- Ubicación de recursos y archivos estáticos, si corresponde.

Identifica especialmente dónde debe trabajar un agente cuando necesite modificar una funcionalidad determinada.

### C. Instalación y entorno

Documenta paso a paso:

- Requisitos previos.
- Versiones necesarias.
- Instalación de dependencias.
- Variables de entorno.
- Configuraciones adicionales.
- Servicios externos necesarios.
- Procedimiento de inicialización.

Distingue los pasos obligatorios de los opcionales.

### D. Compilación y ejecución

Para cada procedimiento relevante, documenta:

- Comando exacto.
- Directorio desde el que debe ejecutarse.
- Prerrequisitos.
- Secuencia correcta de ejecución.
- Resultado esperado.
- Problemas conocidos y soluciones.

Incluye los procedimientos de:

- Bootstrap o inicialización.
- Build.
- Run.
- Test.
- Lint.
- Type checking.
- Otros procesos específicos del proyecto.

### E. Testing y validación

Investiga y documenta cómo validar correctamente los cambios.

- Identifica todos los mecanismos de testing disponibles.
- Ejecuta los tests cuando sea posible.
- Identifica los comandos que deben ejecutarse y en qué orden.
- Documenta las validaciones de linting y compilación.
- Identifica los pipelines y workflows de CI/CD.
- Documenta cómo reproducir localmente las verificaciones automatizadas.

Distingue claramente entre comandos probados y comandos identificados en documentación pero no ejecutados.

### F. Problemas conocidos y workarounds

Documenta los problemas que hayas comprobado durante la exploración:

- Comandos que fallan.
- Problemas de dependencias.
- Conflictos de versiones.
- Problemas de configuración.
- Requisitos de entorno no evidentes.
- Problemas de tiempos de ejecución.
- Soluciones y workarounds comprobados.

No inventes problemas ni soluciones.

## 6. Validación práctica

Siempre que sea posible:

1. Ejecuta los comandos de instalación y preparación necesarios.
2. Comprueba que el proyecto puede compilarse.
3. Ejecuta los tests.
4. Ejecuta linting y otras validaciones disponibles.
5. Comprueba los procedimientos de ejecución.
6. Identifica problemas y documenta soluciones verificadas.

No realices cambios funcionales en el código fuente como parte de esta tarea.

Si necesitas comprobar que una modificación puede compilarse, utiliza un cambio temporal, aislado y reversible, sin dejar modificaciones funcionales en el proyecto.

No ejecutes operaciones destructivas ni elimines datos, configuraciones o archivos del usuario.

Si un comando no puede ejecutarse por falta de servicios, credenciales, permisos o recursos, indícalo expresamente.

## 7. Criterios de calidad

El archivo debe cumplir estas condiciones:

- Máximo dos páginas.
- Escrito íntegramente en español.
- Específico de este proyecto.
- Sin instrucciones particulares de una tarea concreta.
- Sin información redundante.
- Con comandos exactos y verificables.
- Con rutas relativas a la carpeta actual.
- Priorizando la información que ahorre tiempo y evite errores.

No intentes llenar las dos páginas por obligación. Prioriza la información de mayor utilidad para un agente.

## 8. Instrucciones permanentes para el futuro agente

Incluye indicaciones explícitas para que los futuros agentes:

- Consideren este archivo como la primera fuente de información para trabajar en el proyecto.
- Confíen en los procedimientos documentados mientras no exista evidencia de que están incompletos o desactualizados.
- No vuelvan a explorar innecesariamente el proyecto.
- Consulten los archivos originales únicamente cuando necesiten información que no esté documentada o detecten contradicciones.
- Ejecuten las validaciones indicadas antes de considerar terminado un cambio.
- Respeten la arquitectura y las convenciones existentes.
- No modifiquen archivos fuera de la carpeta actual.

## 9. Entrega

Crea el archivo:

`.github/copilot-instructions.md`

Verifica que:

- El archivo exista en la ubicación correcta.
- No supere las dos páginas.
- Contenga información comprobada y útil.
- No incluya información de directorios externos a la carpeta actual.
- No se hayan modificado otros archivos del proyecto.

Al finalizar, presenta un resumen breve de lo documentado, las validaciones ejecutadas y cualquier limitación encontrada.

```

* Luego  verificar el copilot-instructions.md

* Tambien puede ser util analizar las conversaciones y guardrlas
  * ctrl+shit+p -> Export Chats
  * Despues estos chat los analizas con un LLM
