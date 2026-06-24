# Clase Treina y uno - 24 de junio del 2026

# Repaso

* Usar el LM studio con una IA Local
* Busquedas Semanticas VS Busquedas Textuales
* RAG
    * (Texto) ---->  (Modelo de Embedings)  -----> (Vector : Enbedings)
    * A Dos embedings se le puede calcular una distancia entre si
    * Base de datos de Embedigns
        * PineCone
        * ChromaDB

---

# Colab de la clase

* https://colab.research.google.com/drive/1SmoYN1lYYHs3TLEdCXIHVxDhozWr3ezw?usp=sharing

---

# Tipos De modelos de Embedigas

* Local / Open Source
    * all-MiniLM-L6-v2
    * https://huggingface.co/sentence-transformers/all-MiniLM-L6-v2
* Por Api Key / OS o Propietario
    * https://developers.openai.com/api/docs/models/all
      * Fijarse los modelos de Embedigs

> [!NOTE]
> Un mismo texto codificado como embeding con dos modelos distintos dan dos vectores completamente distinto (en longitud como en valores)

---

# Programando con Embedings

* Mi lista de documentos
  
```python
documentos = [
    "Python es un lenguaje de programacion de alto nivel",
    "Python se utiliza en una amploa variedad de aplicaciones",
    "Doland Trump ataca Bolivia y se hace con el control de Sudamerica"m
    "Los animales son buenos"
]
```
    
