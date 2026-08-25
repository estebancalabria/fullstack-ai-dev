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

* La funcion principal se llama pipeline
  * recibe como parametro el tipo de tarea y devuelve (si no le especifico nada) un modelo de IA para esa tarea alojado en HF
    * Ej: "sentiment-analysys"
  * Documentacion : https://huggingface.co/docs/transformers/main_classes/pipelines

* Tareas
   "audio-classification": will return a AudioClassificationPipeline.
   "automatic-speech-recognition": will return a AutomaticSpeechRecognitionPipeline.
   "depth-estimation": will return a DepthEstimationPipeline.
   "document-question-answering": will return a DocumentQuestionAnsweringPipeline.
   "feature-extraction": will return a FeatureExtractionPipeline.
   "fill-mask": will return a FillMaskPipeline:.
   "image-classification": will return a ImageClassificationPipeline.
   "image-feature-extraction": will return an ImageFeatureExtractionPipeline.
   "image-segmentation": will return a ImageSegmentationPipeline.
   "image-text-to-text": will return a ImageTextToTextPipeline.
   "keypoint-matching": will return a KeypointMatchingPipeline.
   "mask-generation": will return a MaskGenerationPipeline.
   "object-detection": will return a ObjectDetectionPipeline.
   "table-question-answering": will return a TableQuestionAnsweringPipeline.
   "text-classification" (alias "sentiment-analysis" available): will return a TextClassificationPipeline.
   "text-generation": will return a TextGenerationPipeline:.
   "text-to-audio" (alias "text-to-speech" available): will return a TextToAudioPipeline:.
   "token-classification" (alias "ner" available): will return a TokenClassificationPipeline.
   "video-classification": will return a VideoClassificationPipeline.
   "zero-shot-classification": will return a ZeroShotClassificationPipeline.
   "zero-shot-image-classification": will return a ZeroShotImageClassificationPipeline.
   "zero-shot-audio-classification": will return a ZeroShotAudioClassificationPipeline.
   "zero-shot-object-detection": will return a ZeroShotObjectDetectionPipeline.

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

* Abrir VSCode en una carpeta de la clase (code . abre vscode en la carpeta actual)

```
code .
```

* Crear el archivo analisis-sentimiento.py

```
import os
os.environ["HF_HUB_CACHE"] = "./modelos"

from transformers import pipeline

classifier = pipeline("sentiment-analysis",
                      model="distilbert-base-uncased-finetuned-sst-2-english") 

frase = input("Ingrese una frase en inglés: ") 

#Quiero una nueva version donde el codigo se lo pregunto al usuario
result = classifier(frase)

print(result)
```

* Abrir una terminal el vscode

```
> python analisis-sentimiento.py
```

* Lo mas probable que tire el error ModuleNotFound
<img width="777" height="77" alt="image" src="https://github.com/user-attachments/assets/738d53aa-79df-4358-8534-5728128e3197" />

* Si no esta instalada la libreria transformers

```
pip install transformers
```

* Sino

```
python -m pip install transformers
```

* Instalamos tambien torch (inteligencia artificial y redes neuronales)

```
pip install torch
```

* o..

```
python -m pip install torch
```

* Luego ejecutamos el codigo (Ahora si)

```
python analisis-sentimiento.py
```

* Y ahi si lo ejecutamos localmente!

> [!NOTE]
> La carpeta modelos no la quiero subir a github, por eso voy a hacer que no la suba a mi repositorio

---
BREAK
Hasta menos 5
Despues Kahoot
---

# Modelos Open Source

## Ejecuat un LLM Localmentec
