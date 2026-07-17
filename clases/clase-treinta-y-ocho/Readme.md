# Clase Treinta y Ocho - 17 de Julio del 2026

# Palpitando la previa de la final mundial!
# Vamos Argentina! Vamos Lautaro!!!!

# Repaso

* Text to Speech / Speech To Text
  * Javascript nativo en el navegador
  * Python
    * tts
      * gtts
      * edge-tts
      * usando el modelo orpheus con api key de Groq
    * stt
      * Speech Recognition
      * Whisper bajando el modelo
* Reproduccion de audios en el Colab
* Python
  * MatPlotLib

---

## Colab de la clase

* https://colab.research.google.com/drive/1XWaDVVjwvbLUSFlJ49CbWFhLCLjRX4JP?usp=sharing

## CoquiTTS

* URL
  * https://github.com/coqui-ai/tts
  * HF: https://huggingface.co/coqui/XTTS-v2
* Caracteristica
  * Para probar la clonacion de Voces

* Lo probamos desde la WEB, salio decente
* Ahora vamos a hacerlo desde colab

* Convertimos el archivo original a un .WaV
* 
```
!apt-get -qq install ffmpeg
```

* Luego
```
!ffmpeg -i SaludoMessi.mp3 SaludoMessi.wav -y
```

* Instlamos librerias

```
!pip install coqui-tts
```

* Uso el audio y el modelo para clonar la voz

```
from TTS.api import TTS
tts = TTS("tts_models/multilingual/multi-dataset/xtts_v2", gpu=True)

# generate speech by cloning a voice using default settings
tts.tts_to_file(text="Muchachos, quedense tranquilos que vamos a salir campeones.",
                file_path="NuevoSaludaMessi.wav",
                speaker_wav="SaludoMessi.wav",
                language="es")
```

# Azure

* Una pataforma para desplegar y con servicios para dar soporte a la creacion de aplicaciones


## TTS en Azure

  
