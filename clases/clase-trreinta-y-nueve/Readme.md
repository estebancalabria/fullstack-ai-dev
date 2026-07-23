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
