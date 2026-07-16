# Clase Treinta y Siete - 15 de Julio del 2026

> [!NOTE]
> Hoy Argentina finalista ganando 2 a 1 a Inglaterra en una remontada historica

# Repaso

* Cloud Computing
  * Mini
      * Heroku : https://www.heroku.com/
  * Microsoft Azure
      * Tour por los datacenters:
        * https://www.youtube.com/watch?v=80aK2_iwMOs&t=4s&pp=ygUVYXp1cmUgZGF0YWNlbnRlciB0b3Vy
  * AWS
  * Google Cloud
  * Oracle Cloud
* Azure
  * Computer Vision
    * Entrenamos un modelo de ML
  * Mahine Learning Studio
    * Creamos un entorno para programar similar al google Colab
* Graficos con MatPlotLib

---

## Google Colab de la Clase

* https://colab.research.google.com/drive/1ZekFpkbPFLtVCqHz0PsYHwO6yx8EFQGa?usp=sharing

---

# MatPlot Lib

* URL
  * https://matplotlib.org/
  * https://matplotlib.org/stable/gallery/index
* Todos estos graficos los podemos usar en google colab

* Esta bueno para pedirle a la IA que genere el codigo

```
Dame el codigo en python para generar un grafico en matplotlib donde se vea un histograma donde se hagan 1000 tiradas de 2 dados de 1 a 6, se calcule la suma y luego se arme un histograma con los resultados
```

* Codigo en python que me devuelve la IA

```
import numpy as np
import matplotlib.pyplot as plt

# Simular 1000 tiradas de 2 dados
np.random.seed(42)  # opcional, para reproducibilidad
dado1 = np.random.randint(1, 7, size=1000)
dado2 = np.random.randint(1, 7, size=1000)
sumas = dado1 + dado2

# Crear histograma
plt.figure(figsize=(10, 6))
bins = np.arange(1.5, 14.5, 1)  # bins centrados en cada suma posible (2 a 13)
plt.hist(sumas, bins=bins, edgecolor='black', rwidth=0.8)

plt.title('Histograma de la suma de 2 dados (1000 tiradas)')
plt.xlabel('Suma de los dados')
plt.ylabel('Frecuencia')
plt.xticks(range(2, 13))
plt.grid(axis='y', alpha=0.3)

plt.show()
```

* Genero este grafico

```
import numpy as np
import matplotlib.pyplot as plt

# Simular 1000 tiradas de 2 dados
np.random.seed(42)  # opcional, para reproducibilidad
dado1 = np.random.randint(1, 7, size=1000)
dado2 = np.random.randint(1, 7, size=1000)
sumas = dado1 + dado2

# Crear histograma
plt.figure(figsize=(10, 6))
bins = np.arange(1.5, 14.5, 1)  # bins centrados en cada suma posible (2 a 13)
plt.hist(sumas, bins=bins, edgecolor='black', rwidth=0.8)

plt.title('Histograma de la suma de 2 dados (1000 tiradas)')
plt.xlabel('Suma de los dados')
plt.ylabel('Frecuencia')
plt.xticks(range(2, 13))
plt.grid(axis='y', alpha=0.3)

plt.show()
```

---

# Text to Speech y Speech to Texto

## Javascript

### Speech to Texto

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <h1>Presione el boton y comience a hablar...</h1>
    <button id="start-speach-regnition">Hablar</button>
    <p id="result">
        
    </p>

    <script>
        const startButton = document.getElementById('start-speach-regnition');
        const resultParagraph = document.getElementById('result');

        const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
        recognition.lang = 'es-ES'; // Establecer el idioma a español

        startButton.addEventListener('click', () => {
            recognition.start();
        });

        recognition.onresult = (event) => {
            const transcript = event.results[0][0].transcript;
            resultParagraph.textContent = transcript;
        };
    </script>


</body>
</html>
```

#### Text To Speech

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <h1>Text To Speech</h1>
    <textarea id="text-input" rows="4" cols="50" placeholder="Escribe el texto aquí...">

    </textarea>
    
    <div>
        <button id="read-text">Leer texto</button>
    </div>

    <script>
        const readButton = document.getElementById('read-text');
        const textInput = document.getElementById('text-input');

        readButton.addEventListener('click', () => {

            const text = textInput.value;
            const utterance = new SpeechSynthesisUtterance(text);
            utterance.lang = 'es-ES'; // Establecer el idioma a español
            speechSynthesis.speak(utterance);
            
        });
    </script>
</body>
</html>
```

## Python

### Text To Speech : gtts

* URL
 * https://pypi.org/project/gTTS/

* Codigo ejemplo para el colab
```python
from gtts import gTTS
from IPython.display import Audio

texto = input("Que queres que diga?: ")

tts = gTTS(text = texto, lang="es")
tts.save("audio.mp3")
Audio("audio.mp3")
```

### Text to Speech : edge-tts

* Primero lo instalo
  
```python
!pip -q install edge-tts
```

* Lo pruebo

```
import edge_tts
import asyncio
from IPython.display import Audio

texto = input("¿Qué querés que diga? ")

async def generar_audio():
    communicate = edge_tts.Communicate(
        text=texto,
        voice="es-AR-TomasNeural"
    )
    await communicate.save("audio.mp3")

# Ejecutar
await generar_audio()

# Reproducir
Audio("audio.mp3")
```

* Podemos listar las voces asi

```
# Listado de voces
import edge_tts

async def voces_espanol():
    voces = await edge_tts.list_voices()

    for v in voces:
        if v["Locale"].startswith("es"):
            print(
                f"{v['ShortName']:30} "
                f"{v['Gender']:8} "
                f"{v['Locale']}"
            )

await voces_espanol()
```

###  Text to Speech : Con API Key


* Ver los modelos de groq

* Sacar una API Key de Groq
  * https://console.groq.com/keys

* Instalamos libreria Groq

```
!pip install groq
```

* Ejecutamos este codigo

```python
import os
from groq import Groq
from IPython.display import Audio

api_key = input("Ingrese su Api Key")
client = Groq(api_key=api_key)

speech_file_path = "orpheus-english.wav" 
model = "canopylabs/orpheus-v1-english"
voice = "troy"
text = "Welcome to Orpheus text-to-speech. [cheerful] This is an example of high-quality English audio generation with vocal directions support."
response_format = "wav"

response = client.audio.speech.create(
    model=model,
    voice=voice,
    input=text,
    response_format=response_format
)

response.write_to_file(speech_file_path)

Audio(speech_file_path)
```

---

### Speech To Text : SpeechRecognition

* URL
 * https://pypi.org/project/SpeechRecognition/

* Primero la instalamos

```
!pip install SpeechRecognition
```

* Vamos a Convertir un archivo mp3 en un archivo wav

* Instalamos el ffmpeg

```
!apt-get -qq install ffmpeg
```

* Convertimos el archivo

```
!ffmpeg -i audio.mp3 audio.wav -y
```

* Hacemos el reconociento de texto

```
import speech_recognition as sr

r = sr.Recognizer()

with sr.AudioFile("audio.wav") as source:
    audio = r.listen(source)

#print(audio)

texto  = r.recognize_google(audio, language="es-ES")

print(f"El audio dice : {texto}")
```

###  Speech To Text : Whisper

* Primero lo instalamos

```
!pip install openai-whisper
```

* Lo probamos

```python
import whisper

model = whisper.load_model("base")

result = model.transcribe("audio.wav", language="es")

print(result["text"])
```

