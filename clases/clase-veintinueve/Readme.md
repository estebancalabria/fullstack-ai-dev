# Clase 29 - 17 de Junio del 2026

# Vamos Argentina!!!!

# Repaso

* Ia para Programadores
  * Uso de la IA en cada etapa de desarrollo de Software
   * Aider ( Nos quedamos sin credito al toque)
* Pruebas Unitarias
  * Pruebas unitarias en Python
  * El uso de la IA para generar pruebas unitarias

# Novedades

* Reviews de Hardware y de IA
    * https://www.youtube.com/@NateGentile7
* Estudio sobre lo redituable que resulta la IA
    * https://isaiprofitable.com/
 
# IA 

* Ejecucion de un modelo localmente
  * Ollama
    * Todo por linea de comandos
  * LMStudio
      * https://lmstudio.ai/

> [!NOTE]
> Los modelos de lenguaje del LMstudio se descargan de HF

## LMStudio

* Descargo modelos como el deepseek-r1-0528-qwen3-8b (5gb)
    * En una prueba que hicios un prompt sencillo tardo 1 minuto
* Lo puedo ejecutar dentro de la herramienta
* La solapa Developer permite ejecutar un servidor que cumple la especificacion de api de OpenAI pero local

## LMStudio Con Aider

* La clase pasada usamos AIder con Groq y nos quedamos sin tokens enseguida
* Aparecio la necesidad de poder utilizar las herramientas como aider (o claude code) con un LLM local
   * https://aider.chat/docs/llms/lm-studio.html

---

# IA Responsable

* Para el consultor IA.
* Cuando le recomendarian a una empresa usar un LLM local con Ollama/LMStudio
* Al trabajar con Datos Sensibles un empresa NO puede subir datos de terceros a un LLM publico (chatgpt)
  * GPDR : Ley de privacidad de datos de Europa
  * Ley 25.326 de Protección de los Datos Personales

> [!NOTE]
> TIP para entrevista de trabajo

* https://www.infobae.com/tecno/2026/04/29/el-lado-oscuro-de-la-ia-el-agente-de-claude-borro-todos-los-datos-de-una-empresa-sin-aviso/

## Shadow IT

* El acceso a una herramienta online (ChatGPT, DropBox) sin que IT se entere y lo controle
  * Ej : Bajo un repo de la empresa y lo pongo como adjunto a ChatGPT para hacerle preguntas y se filtr una API Key

---

# Agentes con IA

# RAG (Retrival Augmented Generation)

## Busquedas Semanticas

* Recuperacion semantica (por significado de texto)

* En SQL

```
Select * from producto where descripcion like "%economico%"
```
* (La descripcion del producto tiene que tener exactamente la palbra producto)
* Tadicionalmete las busquedas en internet eran por texto exacto
  * Busque por keywords
  * Esa busqueda es exacta y no contempla la intencion o el significado de lo que estamos buscando

* Busqueda semantica (en un lenguaje inventado)

```
Select descripcion from producto where descripcion means "economico"
```
* Nos devuelve la descripcion "El parlante JBL es muy barato"

## Funcionamiento de la busqueda semantica

* Para entrenar una busqueda semantica necesitamos un conjunto muy grande de datos y entrenar un codificador
   * Este entrenamiento convierte palabras en vectores
* Este codificador asigna a cada palabra un vector que aprende a partir del entrenamiento
  * (lindo) ---> (1,0,0,0,0)
  * (bello) ---> (1,1,0,0,0)
  * (feo) ----> (3,5,0,0,0)
* Usando pitagoras podes calcular la distancia entre los vectores
* Observamos qeu las palabras que estan mas relacionadas tiene menor distancia
* Cuando uno hace una busqueda semantica no busca la palabra exacta, sino aquellas palabras que estena una distancia d del concepto que quiero

* La representacion vectorial de cada texto es conocida como "embeding"
  * https://www.instagram.com/p/C-qz5rBxByW/?img_index=1
* El modelo de embedigs (generado luego del entrenamiento)
  * Conviete cada palabra enun vector
* Podemos viualizar un modelo de embeding en esta pagina
  * https://projector.tensorflow.org/

# Base de datos de Embeddings

* Son bases de datos especializadas para almacenar vectores de embedings y hacer busquedas semanticas (Calcular distancias)
  * Ejemplos de Base de Datos de Embedings (Nativas)
    * Pinecone
      * https://www.pinecone.io/
    * Chroma
     * https://www.trychroma.com/
    * qdrant
     * https://qdrant.tech/
    * Weviate
     * https://weaviate.io/
  * Las bases de datos tradicionales (Postgres, MongoDB) estan incoporando embedings en el esquema tradicional
     * Ademas del varchar, int empiezan a aparecer tipos de columnas que representan embedings
      * https://www.mongodb.com/es/lp/cloud/atlas/vector/database
      * https://medium.com/@richardhightower/building-ai-powered-search-and-rag-with-postgresql-and-vector-embeddings-09af314dc2ff

# Embedigs y Agentes

* El problema de los LLM muchas son las alucionaciones y el gounding
* La idea es que antes de pasarle al LLM el promt solito, vamos a hacer una busqueda vectorial previamente y vamos a enriquecer el prompt original con informacion de contexto sacada de nuestra propia base de datos vectorial

> La proxima clase vamos a aplicar estos conceptos programando un agente que tenga un RAG incorporado
