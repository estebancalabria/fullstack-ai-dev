# Clase Cinco - 24 de Agosto del 2026

# Repaso

* Modelos Open Source (OS)
  * HuggingFace (HF)
    * Spaces
      * Lugares para probar online modelos sin descargarlos
          * Generacion de Imagenes Con Flux
          * Ai Comic Factory
    * Uso de modelos de HF desde pyhton
        * Modelos Clasidicacion Sentimientos : distilbert-base-uncased-finetuned-sst-2-english
            * https://huggingface.co/distilbert/distilbert-base-uncased-finetuned-sst-2-english
        * Libreria : Hugging Face Transformers
            * from transformers import pipeline
  * Uso comercial de los modelos OS
* AIDev
  * Criterios de uso de la IA para programar
* Herramienta
  * HeyGen para videos basados en avatar
 
---

# Lenguajes de Programacion

## Repositorio de librerias

* Es un lugar en internet donde la comunidad sube las librerias de un ecosistema basado en un lenguaje de programacion para su distribucion
  * Javascript : npm
      * https://www.npmjs.com/
      * CLI: npm install express
  * Python : pip
      * https://pypi.org/project/pip/
      * CLI: pip install transformers
  * DotNet (version OS de .NET) : https://www.nuget.org/ 
      * CLI: dotnet add pagkage

> [!NOTE]
> Para una lista completa de package managers mirar https://www.instagram.com/p/DQUdnV3jqke/?img_index=1 y dejar un MG

---

# Python

## Setup

* Google Colab de la Clase
  * https://colab.research.google.com/drive/1bjLr3ifXm3UgRQUrUIsWJTnLEdxUxBNj?usp=sharing



## Uso libreria HF Transformer

### Colab

> [!NOTE]
> Google colab ya trae instaladas muchas liberiras que no hace falta instalar pero si ejecutamos el mismo codigo localmente si las tenemos que instalar


#### Comandos CLI eb colab

* En google colab se puede instalar paquetes
    * Si un celda tiene una instruccion que empieza con ! (signo de admiracion) esa linea no se ejecuta en python sino en el CLI

```
!ls
```

```
!python --version
```

* Ver los paquetes instalados
```
!pip list
```

* Tratamos de instalar un paquete en colab
```
!pip install fastapi
```

---

#### Uso de HF en colab 

```
from transformers import pipeline

classifier = pipeline("sentiment-analysis")

print(classifier.model)

```

* En linea:
    * from transformers import pipeline
    * transformers es nombre de la libreria hf transformers somo esta subido al repositorio publico de librerias PIP

* La linea
    * classifier = pipeline("sentiment-analysis")
    * classifier es una variable a la que le asigno el resultado de llamar a la funcion
    * "sentiment-analysis" es un parametro de la funcion pipeline

* Ejercicio quiero que el usuario igrese una frase en ingles y la IA le diga si es positiva o negativa

```
from transformers import pipeline

classifier = pipeline("sentiment-analysis",
                      model="distilbert-base-uncased-finetuned-sst-2-english",
                      cache_dir = "/content/modelos_hf")

frase = input("Ingrese una frase en inglés: ") 

#Quiero una nueva version donde el codigo se lo pregunto al usuario
result = classifier(frase)

print(result)
```

### Local

---

# Modelos Open Source

## Ejecuat un LLM Localmentec
