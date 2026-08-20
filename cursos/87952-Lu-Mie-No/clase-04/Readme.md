# Clase Cuatro - 19 de Agosto del 2026

# Repaso

* LLM (Large Language Models)
  * Clasificacion
    * Propietarios
      * Groq : El que menos censura riene
    * Open Source
      * Se pueden ejecutar localmente
        * Privacidad : si los uso local no estoy compartiendo datos con una empesa
      * Se le puede hacer un Fine Tunning
      * DeepSeek, Qwen, KimiK3
  * Comparativa
    * Arena.AI
* AiDev
  * Usar la IA para programar
  * Hicismo un ejemplo con css de Glasmorfismo que quedo buenisimo
* Desarrollo
  * Python
  * Html
  * Css
  * JSON
* Glosario
  * Censura
  * Jailbreak
  * Alucinaciones
  * Anclaje / Grounding
 
# Tips y Novedades

* ArenaAI : Lo puedo usar para generar videos sin pagar

* OpenAI hackeo Hugging Face
  * https://www.reuters.com/technology/openai-slows-model-training-bolster-security-after-hugging-face-hack-2026-08-18/?utm_source=chatgpt.com

# Preguntas 

* Si, yo quiero empezar a crear contenido para youtube pero necesito modelo de voz para doblar a ingles
  * Si es para traducir un video podes usar Hey Gen
      * https://heygen.com/
      * https://app.heygen.com/apps/translate
  * Si es solo la voz y traduccion en tiempo real
      * https://elevenlabs.io/

* Profe ...consulta ...el agente que vamos a hacer , va a consumir tokens de algún modelo por api o la idea es que pueda correr en ia local?
    * Si, ambos. El codigo no cambia en cualquiera de los dos casos

* Requisitos minimos de hardware para una ia local ?
  * Varia segun el modelo. Pero para modelos Grandes pensaria en una NVIDA de 32 GB para adelante (4080, 5090)
  * Igual hay modelos mas chicos que si funcionan en hardware mas acotado y aunque va mas lento funcionan

---

# AIDev

## Uso Criterioso de la IA para Programar

* Panorama hoy
  * Hoy es muy facil generar mucho codigo con IA sobre incluso proyectos que no conozco muy bien
  * El problema es cuando se genera mucho codigo que no se chequea y se lo acepta como viene y no se entinde
    * Deuda cognitiva
  * LA IA COMETE ERRORES y usar la IA sin criterio, sin plan y sin estrategia es una formula para el desastre
  * Miren esta noticia
      * https://www.pcgamer.com/gaming-industry/open-source-game-engine-godot-will-no-longer-accept-ai-authored-code-contributions-we-cant-trust-heavy-users-of-ai-to-understand-their-code-enough-to-fix-it/
  * Hay proyectos OS que estan empezando a prestar mucha atencion al codigo que aceptan

---

# Large Language Models

## Open Source

### Hugging Face (HF)

* Es el github de los modelos Open Source
* Todos los modelos Open Source se suben a Huffing Face
* Es una empresa cuyo objetivo es democratizar el acceso a la IA
   * Que pasaria si los modelos de IA fueran solo propietarios?
     * Las empresas, podrian cobrar lo que quisieran, vernderla la IA solo al que la pagara
     * Las empresas se harian de todos los datos sensibles y privados, porque no habria posibilidad de usar una IA independiente
       

* URL
  * https://huggingface.co/
* Pasos
  * **Crear una cuenta en HF**
  * NO PERDER EL USUARIO Y LA CLAVE
* Que hay aca?
  * Modelos
  * Datasets
  * Spaces (Espacios para probar los modelos sin tener que descargarlos)
    * TE permite probar el modelo sin descargarlo
    * HF te presta por dia cierta cantidad de uso de GPU para que puedas probar los modelos
    * URL
      * https://huggingface.co/spaces
    * Ejemplo
      * https://huggingface.co/spaces/black-forest-labs/FLUX.1-dev
    * Los Spaces son interfaces graficad rudimentarias desarrolladas con la libreria Gradio para poder probar un modelo sin romperse la cabeza desarrollando la UI
      * En este curso vamos a utilizar un monton la libreria Gradio

```
A hacker breaching a sensitive system
```

<img width="1024" height="1024" alt="image" src="https://github.com/user-attachments/assets/7bef961d-2834-47c8-bc9b-d2bdfa7c03f2" />

---
BREAK
LUEGO KAHOOT
---

## Oportunidades Comerciales del OS

* Hoy en dia hay cada vez mas applicaciones de IA
  * Estas aplicaciones implementan un sistema Freemium (primero es gratis con un limite, luego pago por uso)
* Muchas personas toman un modelo OS, lo hostean en algun lado y hacen una plataforma Fremium y cobran por uso
  * Ejemplo
     * Pagina Comercial
         * https://aicomicfactory.com/
         * 10 dolares el plan basico
     * Modelo Openr Source en Spaces de HF
         * https://huggingface.co/spaces/jbilcke-hf/ai-comic-factory

----

## Uso de modelos Open Source desde Python

* Vamos a crear un Google Colab
   * https://colab.research.google.com/drive/1UW2g-mT-LBHWgiWYw5SFreHI6g74jQCL?usp=sharing
* Ver la ficha del modelo que vamos a usar
  * https://huggingface.co/distilbert/distilbert-base-uncased-finetuned-sst-2-english
 
```
from transformers import pipeline

# Bajamos el modelo por defecto de analisis de sentimientos desde HF
classifier = pipeline("sentiment-analysis")

print(classifier.model)
print(classifier.model.name_or_path)
```

* Esto descarga el modelo desdde HF al google colab

<img width="1120" height="292" alt="image" src="https://github.com/user-attachments/assets/3176a7e7-aa5d-42a3-b63d-d95a0d6d947b" />

* y muestra como ultima linea

```
distilbert/distilbert-base-uncased-finetuned-sst-2-english
```

* Lo podemos probar un un mensaje negativo
  
```
print(classifier("This product sucks"))
```

* Me Devuelve

```
[{'label': 'NEGATIVE', 'score': 0.9997257590293884}]
```

* Si le pongo

```
print(classifier("This product is great"))
```

* Me Devuelve

```
[{'label': 'POSITIVE', 'score': 0.9998729228973389}]
```

---

# Proxima Clase

## Ejecutar Modelos Localmente
## Ejemcutar el modelo de analisis de sentimientos en vscode
