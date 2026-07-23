# Clase Treinta y Nueve - 22 de Julio del 2026

# Repaso

* Text-To-Speech
  * No funciono Azure -> CoquiTTS
    * Estuvimos renegando con la dependencias de Python
    * Finalmente lo hicimos funcionar


# Colab de La Clase

* Cada uno ademas crea el suyo


# Manejo de Dependencia de python

## Pipdeptree

* Herramienta para ver dependencias en python

* Instalamos
  
```
pip install pipdeptree
```

* Ejecutamos

```
pipdeptree -o text
```

---

# IA en la nube

* Hoy el dia de probar Azure

* El profesor les creo a cada alumno un usuario y se loguean a https://portal.azure.com/

* El profesor creo un grupo de recursos y le dio permiso a los alumnos para que puedan utilizarlo

* Explorar los recursos de Microsoft Foundry

---

## SpeechToText Azure

* Creamos un servicio de SpeechService

* Ir al portal de Speech Service

* Probar voz a texto en tiempo real

* Creamos en google colab una celda para grabar un audio en un .wav

```
from IPython.display import Javascript, display
from google.colab import output
import base64

js = r'''
async function grabarWAV() {

    const container = document.createElement("div");

    const startBtn = document.createElement("button");
    startBtn.innerHTML = "🎤 Iniciar Grabación";

    const stopBtn = document.createElement("button");
    stopBtn.innerHTML = "⏹ Detener";
    stopBtn.disabled = true;

    container.appendChild(startBtn);
    container.appendChild(stopBtn);
    document.body.appendChild(container);

    return await new Promise(async(resolve)=>{

        let audioContext;
        let processor;
        let stream;
        let input;
        let buffers=[];

        startBtn.onclick = async ()=>{

            stream = await navigator.mediaDevices.getUserMedia({audio:true});

            audioContext = new AudioContext();

            input = audioContext.createMediaStreamSource(stream);

            processor = audioContext.createScriptProcessor(4096,1,1);

            processor.onaudioprocess = e=>{
                buffers.push(new Float32Array(e.inputBuffer.getChannelData(0)));
            };

            input.connect(processor);
            processor.connect(audioContext.destination);

            startBtn.disabled=true;
            stopBtn.disabled=false;
        };

        stopBtn.onclick = ()=>{

            processor.disconnect();
            input.disconnect();

            stream.getTracks().forEach(t=>t.stop());

            let length=0;
            buffers.forEach(b=>length+=b.length);

            const data=new Float32Array(length);

            let offset=0;
            buffers.forEach(b=>{
                data.set(b,offset);
                offset+=b.length;
            });

            function encodeWAV(samples,sampleRate){

                const buffer=new ArrayBuffer(44+samples.length*2);
                const view=new DataView(buffer);

                function writeString(offset,str){
                    for(let i=0;i<str.length;i++)
                        view.setUint8(offset+i,str.charCodeAt(i));
                }

                writeString(0,'RIFF');
                view.setUint32(4,36+samples.length*2,true);
                writeString(8,'WAVE');
                writeString(12,'fmt ');
                view.setUint32(16,16,true);
                view.setUint16(20,1,true);
                view.setUint16(22,1,true);
                view.setUint32(24,sampleRate,true);
                view.setUint32(28,sampleRate*2,true);
                view.setUint16(32,2,true);
                view.setUint16(34,16,true);
                writeString(36,'data');
                view.setUint32(40,samples.length*2,true);

                let index=44;

                for(let i=0;i<samples.length;i++){

                    let s=Math.max(-1,Math.min(1,samples[i]));

                    view.setInt16(index,s<0?s*0x8000:s*0x7FFF,true);

                    index+=2;

                }

                return buffer;

            }

            const wav=encodeWAV(data,audioContext.sampleRate);

            const bytes=new Uint8Array(wav);

            let binary='';

            bytes.forEach(b=>binary+=String.fromCharCode(b));

            document.body.removeChild(container);

            resolve(btoa(binary));

        };

    });

}
'''

display(Javascript(js))

print("Esperando grabación...")

wav_base64 = output.eval_js("grabarWAV()")

with open("grabacion.wav","wb") as f:
    f.write(base64.b64decode(wav_base64))

print("✅ Archivo guardado como grabacion.wav")
```

* Para Reproducirlo

```
import wave
from IPython.display import Audio, display


display(Audio("grabacion.wav"))
```

* Instalamos las librerias de Azure

```
!pip -q install azure-cognitiveservices-speech
```
* Codigo para hacer texto a voz con azure

```
import azure.cognitiveservices.speech as speechsdk

# Pedir datos al usuario
endpoint = input("Ingrese el Endpoint del Speech Service: ").strip()
speech_key = input("Ingrese la Key del Speech Service: ").strip()

audio_file = "grabacion.wav"

# Configuración del servicio
speech_config = speechsdk.SpeechConfig(
    subscription=speech_key,
    endpoint=endpoint
)

speech_config.speech_recognition_language = "es-AR"

audio_config = speechsdk.audio.AudioConfig(filename=audio_file)

speech_recognizer = speechsdk.SpeechRecognizer(
    speech_config=speech_config,
    audio_config=audio_config
)

print("\nTranscribiendo...\n")

result = speech_recognizer.recognize_once()

if result.reason == speechsdk.ResultReason.RecognizedSpeech:
    print("Texto reconocido:")
    print(result.text)

elif result.reason == speechsdk.ResultReason.NoMatch:
    print("No se pudo reconocer el audio.")

elif result.reason == speechsdk.ResultReason.Canceled:
    details = result.cancellation_details
    print("La operación fue cancelada.")
    print("Motivo:", details.reason)
    print("Detalles:", details.error_details)
```

* El endpoint y la clave la copio del recurso de SpeechService que cree previamente

---

## Text to Speech

* Probamos el texto speech desde la galeria de voces en https://speech.microsoft.com/

```
import azure.cognitiveservices.speech as speechsdk

speech_key = input("Ingrese Speech Key: ")
service_region = "westus"

speech_config = speechsdk.SpeechConfig(
    subscription=speech_key,
    region=service_region
)

speech_config.speech_synthesis_voice_name = "es-ES-TristanMultilingualNeural"

text = "Hola, soy Tristan y quiero probar la generación de audio a partir de texto."

# Guardar el audio en un archivo WAV
audio_config = speechsdk.audio.AudioOutputConfig(filename="tts.wav")

speech_synthesizer = speechsdk.SpeechSynthesizer(
    speech_config=speech_config,
    audio_config=audio_config
)

result = speech_synthesizer.speak_text_async(text).get()

if result.reason == speechsdk.ResultReason.SynthesizingAudioCompleted:
    print("Audio generado correctamente.")
    print("Archivo: tts.wav")
elif result.reason == speechsdk.ResultReason.Canceled:
    cancellation_details = result.cancellation_details
    print("Speech synthesis canceled:", cancellation_details.reason)
    if cancellation_details.reason == speechsdk.CancellationReason.Error:
        print("Error:", cancellation_details.error_details)
```

* Luego para reproducir el audio

```
from IPython.display import Audio, display

display(Audio("tts.wav"))
```

---

## Face Api

* Creamos el recurso de Face API

* Vamos al portal de usuario en https://portal.vision.cognitive.azure.com/\\

* Probamos primero el reconocimiento de cara en el portal

* Subo un archivo con un rotro llamado cara.jpg y luego por codigo

```
import requests
import json

# Pedir datos al usuario
endpoint = input("Ingrese el Endpoint de Face API: ").strip().rstrip("/")
key = input("Ingrese la Key: ").strip()

image_path = "cara.jpg"

# Endpoint de detección
url = f"{endpoint}/face/v1.0/detect"

params = {
    "returnFaceId": False,
    "returnFaceLandmarks": False,
    "detectionModel": "detection_03"
}

headers = {
    "Ocp-Apim-Subscription-Key": key,
    "Content-Type": "application/octet-stream"
}

with open(image_path, "rb") as f:
    image_data = f.read()

response = requests.post(
    url,
    headers=headers,
    params=params,
    data=image_data
)

print("HTTP Status:", response.status_code)

try:
    result = response.json()
    print(json.dumps(result, indent=4, ensure_ascii=False))
except Exception:
    print(response.text)
```

* Me devuelve

```
HTTP Status: 200
[
    {
        "faceRectangle": {
            "top": 62,
            "left": 289,
            "width": 227,
            "height": 317
        }
    }
]
```

* Codigo para ver el rectangulo en el rostro

```
from PIL import Image, ImageDraw
import matplotlib.pyplot as plt

img = Image.open("cara.jpg").convert("RGB")
draw = ImageDraw.Draw(img)

for face in result:
    r = face["faceRectangle"]
    x = r["left"]
    y = r["top"]
    w = r["width"]
    h = r["height"]

    draw.rectangle(
        [(x, y), (x + w, y + h)],
        outline="red",
        width=3
    )

plt.figure(figsize=(8,8))
plt.imshow(img)
plt.axis("off")
plt.show()
```

---

## Computer vision

* Creamos el recurso de computer vision en el portal

* Solo funciona mediante codigo, sacaron el portal donde se hacen las demo


* Casos de uso
 * Analisis de Imagen
 * Generacion de Capitions
 * Etiquetado de imagenes
 * Deteccion de objetos
 * Deteccion de personas
 * OCR
 * Generacion de mascara de primer plano
 * Deteccion de contenido adulto o inapropiado
 * Recorte Intelifente
 * Extraccion de caraceristicas (calidad, paleta de colors, dimensiones, formato, 

### Analisis de Imagen

* Subimos una imagen y la analizamos con python
```
import requests
import json

# Pedir datos al usuario
endpoint = input("Ingrese el Endpoint de Azure AI Vision: ").strip().rstrip("/")
key = input("Ingrese la Key: ").strip()

image_path = "cara.jpg"

# Endpoint de Image Analysis
url = f"{endpoint}/computervision/imageanalysis:analyze"

# Características a analizar
params = {
    "api-version": "2024-02-01",
    "features": "caption,denseCaptions,tags,objects,read,smartCrops,people"
}

headers = {
    "Ocp-Apim-Subscription-Key": key,
    "Content-Type": "application/octet-stream"
}

with open(image_path, "rb") as f:
    image_data = f.read()

response = requests.post(
    url,
    headers=headers,
    params=params,
    data=image_data
)

print("HTTP Status:", response.status_code)

try:
    result = response.json()
    print(json.dumps(result, indent=4, ensure_ascii=False))
except Exception:
    print(response.text)
```

* Me devuelve

```json
HTTP Status: 200
{
    "modelVersion": "2023-10-01",
    "captionResult": {
        "text": "a man in a suit",
        "confidence": 0.9195850491523743
    },
    "denseCaptionsResult": {
        "values": [
            {
                "text": "a man in a suit",
                "confidence": 0.9195850491523743,
                "boundingBox": {
                    "x": 0,
                    "y": 0,
                    "w": 768,
                    "h": 768
                }
            },
            {
                "text": "a man in a suit and tie",
                "confidence": 0.8774699568748474,
                "boundingBox": {
                    "x": 0,
                    "y": 0,
                    "w": 716,
                    "h": 750
                }
            },
            {
                "text": "a close up of a tie",
                "confidence": 0.8234975934028625,
                "boundingBox": {
                    "x": 338,
                    "y": 413,
                    "w": 126,
                    "h": 349
                }
            },
            {
                "text": "a red bird with black eyes",
                "confidence": 0.7755876779556274,
                "boundingBox": {
                    "x": 584,
                    "y": 551,
                    "w": 60,
                    "h": 79
                }
            }
        ]
    },
    "metadata": {
        "width": 768,
        "height": 768
    },
    "tagsResult": {
        "values": [
            {
                "name": "person",
                "confidence": 0.9971995949745178
            },
            {
                "name": "clothing",
                "confidence": 0.9942586421966553
            },
            {
                "name": "tie",
                "confidence": 0.9845768213272095
            },
            {
                "name": "human face",
                "confidence": 0.9802500009536743
            },
            {
                "name": "collar",
                "confidence": 0.9767420291900635
            },
            {
                "name": "man",
                "confidence": 0.9709677696228027
            },
            {
                "name": "formal wear",
                "confidence": 0.9585469961166382
            },
            {
                "name": "blazer",
                "confidence": 0.9555672407150269
            },
            {
                "name": "dress shirt",
                "confidence": 0.9502903819084167
            },
            {
                "name": "gentleman",
                "confidence": 0.9402216672897339
            },
            {
                "name": "building",
                "confidence": 0.939478874206543
            },
            {
                "name": "outerwear",
                "confidence": 0.9210767149925232
            },
            {
                "name": "white-collar worker",
                "confidence": 0.912745475769043
            },
            {
                "name": "coat",
                "confidence": 0.8972408175468445
            },
            {
                "name": "businessperson",
                "confidence": 0.8929969668388367
            },
            {
                "name": "wearing",
                "confidence": 0.8797560930252075
            },
            {
                "name": "outdoor",
                "confidence": 0.8754348754882812
            },
            {
                "name": "male person",
                "confidence": 0.8730376958847046
            },
            {
                "name": "chin",
                "confidence": 0.856214702129364
            },
            {
                "name": "necktie",
                "confidence": 0.7616192102432251
            },
            {
                "name": "suit",
                "confidence": 0.7022040486335754
            },
            {
                "name": "business",
                "confidence": 0.5766170024871826
            },
            {
                "name": "jacket",
                "confidence": 0.5423729419708252
            },
            {
                "name": "shirt",
                "confidence": 0.5380292534828186
            }
        ]
    },
    "objectsResult": {
        "values": [
            {
                "boundingBox": {
                    "x": 351,
                    "y": 430,
                    "w": 134,
                    "h": 338
                },
                "tags": [
                    {
                        "name": "tie",
                        "confidence": 0.835
                    }
                ]
            },
            {
                "boundingBox": {
                    "x": 19,
                    "y": 256,
                    "w": 703,
                    "h": 506
                },
                "tags": [
                    {
                        "name": "suit",
                        "confidence": 0.933
                    }
                ]
            }
        ]
    },
    "readResult": {
        "blocks": []
    },
    "smartCropsResult": {
        "values": [
            {
                "aspectRatio": 1.38,
                "boundingBox": {
                    "x": 32,
                    "y": 32,
                    "w": 704,
                    "h": 512
                }
            }
        ]
    },
    "peopleResult": {
        "values": [
            {
                "boundingBox": {
                    "x": 0,
                    "y": 0,
                    "w": 755,
                    "h": 767
                },
                "confidence": 0.9619508385658264
            },
            {
                "boundingBox": {
                    "x": 301,
                    "y": 295,
                    "w": 167,
                    "h": 174
                },
                "confidence": 0.0018270768923684955
            }
        ]
    }
}

```

### Caption de imagen

```
import requests

endpoint = input("Ingrese el Endpoint de Azure AI Vision: ").strip().rstrip("/")
key = input("Ingrese la Key: ").strip()

url = f"{endpoint}/computervision/imageanalysis:analyze"

params = {
    "api-version": "2024-02-01",
    "features": "caption"
}

headers = {
    "Ocp-Apim-Subscription-Key": key,
    "Content-Type": "application/octet-stream"
}

with open("imagen.jpg", "rb") as f:
    image = f.read()

response = requests.post(
    url,
    params=params,
    headers=headers,
    data=image
)

print(response.status_code)
print(response.text)
```
