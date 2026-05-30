# Clase Veinticuatro - 29 de Mayo del 2026

# Repaso

* IA en Python en Colab
  * Integramos en un Agente
      * Base de Datos
      * Nuestro sistema de Universidad
      * Con IA y llamada a API Key
      * Con Gradio para la interfaz Grafica
* Uso de Modelos Open Source en Colag
  * Hugging Face
  * Foocus
 
---

# IA

* Vieron esta pagina ?
    * https://theresanaiforthat.com/
    * Aqui hay un compendio de herramientas de IA cara al usuario final
    * Todas estas herramientas se programan usando API key o Modelos Open Source

* La cantidad de herramientas de IA crece exponencialmente

<img width="807" height="388" alt="image" src="https://github.com/user-attachments/assets/c91a7b33-eab8-4407-930c-11cf14bf23d0" />

* Hay muchas oportunidades de generar apps a partir de Api y modelos Open Source
* Esta App
    * https://www.comicsmaker.ai/
* Se realiza utilizando un modelo open Source que esta en HF
    * https://huggingface.co/spaces/jbilcke-hf/ai-comic-factory
* Le crean una frontend, reservan capacidad de computo en algun lado
    * Y te cobran 10 dolares por mes

---

# Herramientas de IA para programadores

* Enunciado
  * Vamos una interfaz tipo ChatBot como chatGPT (donde pones tu api key) pero en javascript en vez de Gradio
  * La vamos a desarrollar con una herramienta de Scaffolding y Vibe Coding
  * La vamos a subir a github pages
 
* Paso 1: Vamos a sacar una api key y ver el codigo para llamar a una api key en javascripts
  * https://console.groq.com/

```
curl -X POST https://api.groq.com/openai/v1/responses \
-H "Authorization: Bearer $GROQ_API_KEY" \
-H "Content-Type: application/json" \
-d '{
    "model": "openai/gpt-oss-20b",
    "input": "Explain the importance of fast language models"
}'
```

### Replit

* Paso 2 : Ir a Replit y crear el proyecto

* Ir y loguearse en:
  * https://replit.com/

* Prompt
```
Quiero una aplicacion web que pueda desplegar en github pages que sea un chatbot con una interfaz tipo chatgpt pero que me permita ingresar la api key de groq.
Tiene que haber un input de tipo password para poner la api key
Las conversaciones se deben guardar en el local storage.
La interfaz lo mas parecida posible a ChatGPT
Para llamar a Groq desde linea de comando uso eso :
curl -X POST https://api.groq.com/openai/v1/responses \
-H "Authorization: Bearer $GROQ_API_KEY" \
-H "Content-Type: application/json" \
-d '{
    "model": "openai/gpt-oss-20b",
    "input": "Explain the importance of fast language models"
}'

```

* Una vez creado vamos a publicar el proyecto en GIT

* Depues lo clonamos localmente
  * Los proyectos de replit usan pnpm

* Instalamos pnpm
 * https://pnpm.io/es/installation

* Desde powershell lo podemos instlar con

```
Invoke-WebRequest https://get.pnpm.io/install.ps1 -UseBasicParsing | Invoke-Expression
```

* Una vez que lo instalo puedo ejecutar con pmpn

```
pnpm
```

> Utiliza pnpm para compilar el proyecto

### Lovable

> https://lovable.dev/

* Mismo prompt

> Usa bun para compilar el proyecto

### Bas44

> https://base44.com/

* Mismo prompt

> Usa Vit

### Bolt.new

> https://bolt.new/
 
* Caracteristicas
 * Mas facil para descargar el proyecto como ZIP

### V0 (De Verel)

> https://v0.app/

* Me dejo bajar el zip sin pasar por github
* Descomprimo el zip en una carpeta
* luego npm install
* lueto npm run preview
