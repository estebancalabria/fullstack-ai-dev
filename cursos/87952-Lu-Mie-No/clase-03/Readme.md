# Clase Tres - 12 de Agosto del 2026

# Repaso

* Lenguajes de Programacion
  * Javascript
    * NodeJS (backend)
      * Express
* Python
  * Trabajo con Google Colab
    * Usamos matplotlib
    * Usamos print / input
    * Strings interpolados -> f"Hola {nombre}"
  * Caracteristicas
  * Ecosistema de Librerias
    * Importancia de conocerlas para indicarle a la IA que libreria utilice
    * Ejemlos
      * MatplotLib
      * Pandas
      * Numpy
      * Pytest
      * request  (llamada a apis)
      * Flask (como express de Python)
      * Pygame
      * Tkinter
      * ...
* Git
  * Github
  * Instalamos el CLI de git
  * Commandos
    * git add
        * agrega los archivos al repositorio local / stagging ubicado en la carpeta oculta .git
    * git commit -m
        * Confirma los cambios al repositorio local (stagging) indicando un mensaje de que fue lo que se hizo
        * Es super importante ser detallado en el mesaje que ponemos cuando trabajamos en equipo
    * git push
        * Sube los cambios locales en stagging al repositorio demoto (generalmente github)
    * git log
        * Para ver la lista de los commits
    * git clone
        * Crear un repositorio local a partir de la url de un repositorio remoto (generalmente github)
* IA
  * Interprete de codigo en los LLM Web
    * Lo tiene Claude, ChatGPT, Qwen
* Temas Generales
  * Lenguaje Mermaid

---

# Novedades

* Me pasaron esta libreria de Python que no conozco
  * https://flet.dev/
* IA en robotica
  * https://www.youtube.com/watch?v=iJzvfsihRME
 
---

# Modelo de Lenguaje

* Una red neurnoal gralmente basada en la arquitectura transformer que se encarga de generar texto. 
  * https://www.instagram.com/p/DKhQrTvuFcw/?img_index=1
  * Para entrenarlos requieren un proceso costoso intensivo en el uso de capacida de computo
 
* Funcionamiento de los LLM (arquitectura trasformer)
  * Predicen el proximo token (palabras)
      * https://platform.openai.com/tokenizer
  * La novedad de la arquitectura transformer es que ademas del token tiene en cuenta la posicion del token en el texto
      * Sistema de atencion
      * Ver Paper "Attention is all you need"
        * https://arxiv.org/pdf/1706.03762
  * Los tokens se transforman en un vector numerico (embedding)
      * En este curso vamos a ver la parte de RAG y como podemos usar los embeddings para hacer busquedas por similitudes

## Tipos de Modelos

* Propietarios
    * No los puedo descargar a mi pc, solo los puedo usar mediante un portal web o api key
    * ChatGPT (OpenAI)
        * Codex ex una aplicacion para programar que utiliza estos modelos
        * Trata de emular lo mejor que puede el conocimiento humano
    * Modelos de Claude :Sonnet, Opus, Fable (Anthropic)
        * Especializados en tareas tecnicas
        * Tradicionalemnte siempre fueron los modelos elegidos para programar
    * Gemini
        * PAra busquedas web, para grounding
        * Integracion con nnano bannana para generar imagenes
    * Ojo con Copilot
      * Copilot no es un modelo de lenguaje
      * Utiliza por detras los modelos de lenguaje de OpenAI y Anthropic
      * Microsoft no entreno un modelo grande para usuario finales
      * Posee varios de censura porque se especializa en IA para empresas y e IA resposable
    * Grok (X, ex twitter, Elon Musk)
      * Grounding con X
      * Menos cenura tiene : te recponde cosas que otros modelos no responderia
* Open Source
    * Aclaracion : a pesar de que hay una web para usarlos la gracia de estos modelos es poder descargarlos y usarlos en mi pc sin conexion a internet
    * Aclaracion : Lo modelos open source son grauitos si los descargas localmente y los ejecutas locantente con una buena GPU, pero tambien se pueden ejecutar en webs que te cobran
    * Familia Llama (meta)
        * La que esta en Whsaap
    * Qwen
    * Deepseek
    * Kimi (version K3)
        * https://www.kimi.com/es-419

> [!NOTE]
> Cada modelo destaca en algo

* Para nosotros como programador es importante
    * Saber que modelo usar para una tarea determinada
      * No siempre necesito el mejor mejor modelo pero a veces el mejor prompt, la mejor division de tareas, un modelo mas rapido conviene
    * Saber cual es el modelo para programar en un momento determinado
    * Saber si puedo usar un modelo online o uno local si el proyecto requiere privacidad

---
BREAK. A la vuenlta
Retomamos la pregunta de Matias "hay alguna web donde arme un listado con ellos y sus usos?"
Ademas hicimos un kahoot
----

## Comparativa entre modelos

### Arena.AI

* Nuestros aliado para comabitir el FOMO
* Dar nuesto pequeño aporte al mundo de la IA para decir que modelo es mejor
* URL
  * https://arena.ai/
* Caracteristicas
  * Es una web donde se vota el mejor modelo para una tarea determinada
  * TIP : Es un buen truco para usar modelos gratiment
  * Vamos a probar el de generacion de codigo
  * En Arena : Hacemos competir dos modelos anonimos y nos quedamos con el meior
  * En Direct : Podemos Elegir el modelo y ver la lista de modelos

<img width="962" height="346" alt="image" src="https://github.com/user-attachments/assets/e6c8fe6c-fb03-46e3-86ed-90e2210ae93b" />

> [!NOTE]
> Me hizo un login buenisimo que subi aca al repo

### LMStats (Aporte de luis)

* URL
  * https://llm-stats.com/

---

# Pregunta en clase

* Q ganan ellos haciendo un modelo open source?
   * Este video responde la pregunta : https://www.youtube.com/watch?v=6BtIQIGqGJc&t=333s
   * De paso aprovecho a recomendarles ese canal de youtube:
       * https://www.youtube.com/@matthew_berman
       * SUPER RECOMENDADO


---

# Conocimiento General Programacion

* HTML : Lenguaje utilizaod para la wbe
* CSS : Lenguaje que se usa para dale estilos a una web


---

# Gloario

* FOMO (Fear of missing out)
  * Miedo a no esta arctualizado en las ultimas novedades de IA
* Censura
    * Los modelos de lenguaje se entrenan con censura, para evitar problemas legales. Trata de manera particular los temas sensibles
    * Jailbreak : Encontrar prompts para que la IA no tenga censura, el hacking de los llm
* Alucinaciones
    * Cuando el modelo responde cualquiera. Respuestas que tienen de aparencia correctas pero no lo son.
    * El famoso "Si  tenes razon, disculpame..."
* Grounding
    * Anclar la respuesta de la IA en fuentes verificables

---

# Proxima Clase

* Vamos a hablar de los modelos OS, de HF, como ejecutalos localmente y en python
