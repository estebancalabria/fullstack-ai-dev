# Clase 32 - 26 de Junio 2026

# Repaso 

* RAG
  * Usamos el modelo all-MiniLM-L6-v2
  * Distancia coseno (-1,1)
  * Funcionamiento del modelo de embedings
  * Probando en google Colab

---

# Colab de la clase

* https://colab.research.google.com/drive/1HjHD4utgQr5cUzcuiIIYuMQI6eUF1N-1?usp=sharing

# Retrival augmented Generation

* El Rag calcula la similitudes entre las palabras basados en una set de datos de entrenamiento
    * Casa  -->  (1,0,0,0,0)
    * Auto ---> (0,1,0,0,0)
    * "Casa Auto" ---> (1,1,0,0,0)  << Cuando calculamos el embeding de un documento en realidad se calcula la mezcla de los cada palabra particular
* Poblema
    * Si tengo un documento que "mezcla temas" y es muy largo el embeding resultante diluye el significado
* Solucion
    * En la practica los documentos se dividen en partes llamadas "chunks"
      * 1 parrafo
      * 500 caracteres
    * Se calcula el embeding del parrafo y eso es lo que guarda en la base de datos con una referencia al documento original

## Lipieza de datos

* Si por ejemplo procesass pdfs, vas a encontrar que al leerlo tenes muchos metadatos e informacion binaria.
* En ese caso cada documento hay que pre procesarlo para extraer solamente el texto limpio 

## Chunking

* Separar un documento en fragmentos relevantes para calcular los embedings de cada fragmento en lugar del documento total

```python
from sentence_transformers import SentenceTransformer
import numpy as np
from sklearn.metrics.pairwise import cosine_similarity

faq = """
¿Qué es Python?
Python es un lenguaje de programación de alto nivel que se utiliza en muchos ámbitos.
---
¿Cómo se utiliza Python?
Python se utiliza en desarrollo web, análisis de datos, automatización, ciencia de datos, IA y mucho más.
---
¿Quién es Donald Trump?
Donald Trump es un político y empresario estadounidense que fue presidente de Estados Unidos entre 2017 y 2021.
---
¿Qué animales son domésticos?
Algunos animales domésticos son gatos, perros, conejos, hámsteres y aves.
---
¿Qué es una base de datos?
Una base de datos es un sistema que permite almacenar, organizar y consultar información.
---
¿Qué es SQL?
SQL es un lenguaje utilizado para consultar y administrar bases de datos relacionales.
---
¿Qué es una API?
Una API es una interfaz que permite que diferentes aplicaciones se comuniquen entre sí.
---
¿Qué es un servidor?
Un servidor es un equipo o software que proporciona servicios a otros equipos llamados clientes.
---
¿Qué es la computación en la nube?
La computación en la nube consiste en utilizar recursos informáticos a través de Internet.
---
¿Qué es Docker?
Docker es una plataforma para crear y ejecutar aplicaciones dentro de contenedores.
---
¿Qué es Kubernetes?
Kubernetes es una plataforma para administrar y escalar contenedores automáticamente.
---
¿Qué es Git?
Git es un sistema de control de versiones distribuido.
---
¿Qué es GitHub?
GitHub es una plataforma para alojar repositorios Git y colaborar en proyectos de software.
---
¿Qué es HTML?
HTML es el lenguaje utilizado para definir la estructura de las páginas web.
---
¿Qué es CSS?
CSS es un lenguaje utilizado para definir la apariencia visual de una página web.
---
¿Qué es JavaScript?
JavaScript es un lenguaje de programación utilizado principalmente para agregar interactividad a las páginas web.
---
¿Qué es inteligencia artificial?
La inteligencia artificial es una rama de la informática que desarrolla sistemas capaces de realizar tareas que normalmente requieren inteligencia humana.
---
¿Qué es Machine Learning?
Machine Learning es una disciplina de la inteligencia artificial que permite que los sistemas aprendan a partir de datos.
---
¿Qué es un modelo de lenguaje?
Un modelo de lenguaje es un sistema entrenado para comprender y generar texto.
---
¿Qué es un embedding?
Un embedding es una representación numérica de un texto que captura su significado semántico.
---
¿Qué es una búsqueda vectorial?
Una búsqueda vectorial encuentra documentos comparando embeddings mediante una medida de similitud.
---
¿Qué es la distancia coseno?
La distancia o similitud coseno mide qué tan parecidos son dos vectores según el ángulo entre ellos.
---
¿Qué es RAG?
RAG (Retrieval-Augmented Generation) combina la recuperación de información con modelos de lenguaje para responder utilizando conocimiento externo.
---
¿Qué es Azure?
Azure es la plataforma de computación en la nube desarrollada por Microsoft.
---
¿Qué es una máquina virtual?
Una máquina virtual es una emulación de una computadora que ejecuta un sistema operativo de manera aislada.
---
¿Qué es Linux?
Linux es un sistema operativo de código abierto basado en Unix.
---
¿Qué es JSON?
JSON es un formato ligero para intercambiar datos entre aplicaciones.
---
¿Qué es XML?
XML es un lenguaje de marcado utilizado para representar e intercambiar información.
---
¿Qué es una dirección IP?
Una dirección IP identifica de forma única a un dispositivo dentro de una red.
---
¿Qué es Internet?
Internet es una red mundial que conecta millones de dispositivos.
---

#List Comprehension (compresion de listas)
# Dibvido el string en una lista e chunhas separa por ---





# 👇 El único cambio: chunks en lugar de documentos hardcodeados
chunks = [chunk.strip() for chunk in faq.split('---') if chunk.strip()]

# ============================================================
# 1. QUERY
# ============================================================
query = input("🔍 Ingresá tu consulta: ")

# ============================================================
# 2. MODELO
# ============================================================
modelo = SentenceTransformer('all-MiniLM-L6-v2')
print("✅ Modelo cargado\n")

# ============================================================
# 3. EMBEDDINGS
# ============================================================
vector_query  = modelo.encode(query)
vectores_docs = modelo.encode(chunks)          # shape: (30, 384)

print(f"📐 Shape vector query : {vector_query.shape}")
print(f"📐 Shape matriz chunks: {vectores_docs.shape}")

# ============================================================
# 4. SIMILITUD COSENO
# ============================================================
scores = cosine_similarity([vector_query], vectores_docs)[0]

# ============================================================
# 6. ORDENAR
# ============================================================
indices_ordenados = np.argsort(scores)[::-1]

# ============================================================
# 7. RESULTADOS
# ============================================================
print("\n" + "=" * 60)
print(f"📊 RESULTADOS para query: '{query}'")
print("=" * 60)

for rank, idx in enumerate(indices_ordenados[:2], start=1):
    score = scores[idx]
    emoji = "🟢" if score > 0.6 else "🟡" if score > 0.3 else "🔴"
    print(f"\n  #{rank} {emoji}  Score: {score:.4f}")
    print(f"       Chunk: \"{chunks[idx][:80]}...\"")  # muestra los primeros 80 chars

print("\n" + "=" * 60)
print(f"✅ Chunk más similar:\n\n{chunks[indices_ordenados[0]]}")
print("=" * 60)


```

# Calculo de Embeddings con API Key (de google)

* Documentacion 
  * https://ai.google.dev/
  * https://ai.google.dev/gemini-api/docs/embeddings?hl=es_419
* Vamos a sacar una api key en
  * https://aistudio.google.com/api-keys

* Para crear el cliente de IA de Google

```python
from google import genai
from google.genai import types
import pandas as pd
from sklearn.metrics.pairwise import cosine_similarity

api_key = input("Ingrese su api key")
client = genai.Client(api_key=api_key)
```


* Probamos el modelo

```
result = client.models.embed_content(
    model = "gemini-embedding-001",
    contents="Prueba para calcular embeding"
)

print(result.embeddings[0].values)
print(len(result.embeddings[0].values))
```

* Lo usamos para calcular diferencias

```python
# ============================================================
# EMBEDDINGS CON GEMINI (batch)
# ============================================================
def get_embeddings_batch(textos):
    result = client.models.embed_content(
        model="gemini-embedding-001",
        contents=textos  # 👈 lista entera de una sola vez
    )
    return np.array([e.values for e in result.embeddings])

chunks = [chunk.strip() for chunk in faq.split('---') if chunk.strip()]

query =  input("Ingrese su pregunta")

# Embeddings — 2 llamadas en lugar de 31
vector_query  = get_embeddings_batch([query])[0]   # shape: (3072,)
vectores_docs = get_embeddings_batch(chunks)        # shape: (30, 3072)

print(f"📐 Shape vector query : {vector_query.shape}")
print(f"📐 Shape matriz chunks: {vectores_docs.shape}")

# Similitud coseno
scores = cosine_similarity([vector_query], vectores_docs)[0]
indices_ordenados = np.argsort(scores)[::-1]

# Resultados (top 2)
print("\n" + "=" * 60)
print(f"📊 RESULTADOS para query: '{query}'")
print("=" * 60)

for rank, idx in enumerate(indices_ordenados[:2], start=1):
    score = scores[idx]
    emoji = "🟢" if score > 0.6 else "🟡" if score > 0.3 else "🔴"
    print(f"\n  #{rank} {emoji}  Score: {score:.4f}")
    print(f"       Chunk: \"{chunks[idx][:80]}...\"")
```
