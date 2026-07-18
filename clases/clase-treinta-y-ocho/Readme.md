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

```
!apt-get -qq install ffmpeg
```

* Luego
```
!ffmpeg -i SaludoMessi.mp3 SaludoMessi.wav -y
```

* Lo ejecuto localmvente con un venv

```
python -m venv coqui-env
coqui-env\Scripts\activate
python -m pip install --upgrade pip
```

* Usamos este requirements.txt

```
absl-py==2.5.0
aiohappyeyeballs==2.7.1
aiohttp==3.14.1
aiosignal==1.4.0
annotated-doc==0.0.4
anyascii==0.3.3
anyio==4.14.2
attrs==26.1.0
audioread==3.1.0
certifi==2026.6.17
cffi==2.1.0
charset-normalizer==3.4.9
click==8.4.2
colorama==0.4.6
contourpy==1.3.3
coqpit-config==0.2.5
coqui-tts==0.27.5
coqui-tts-trainer==0.3.3
cycler==0.12.1
decorator==5.3.1
docopt==0.6.2
einops==0.8.2
filelock==3.30.3
fonttools==4.63.0
frozenlist==1.8.0
fsspec==2026.6.0
grpcio==1.82.1
h11==0.16.0
hf-xet==1.5.2
httpcore==1.0.9
httpx==0.28.1
huggingface_hub==0.36.2
idna==3.18
inflect==7.5.0
Jinja2==3.1.6
joblib==1.5.3
kiwisolver==1.5.0
ko-speech-tools==0.1.0
lazy-loader==0.5
librosa==0.11.0
llvmlite==0.48.0
Markdown==3.10.2
markdown-it-py==4.2.0
MarkupSafe==3.0.3
matplotlib==3.11.0
mdurl==0.1.2
monotonic-alignment-search==0.2.1
more-itertools==11.1.0
mpmath==1.3.0
msgpack==1.2.1
multidict==6.7.1
narwhals==2.24.0
networkx==3.6.1
num2words==0.5.14
numba==0.66.0
numpy==2.4.6
packaging==26.2
pillow==12.3.0
platformdirs==4.10.0
pooch==1.9.0
propcache==0.5.2
protobuf==7.35.1
psutil==7.2.2
pycparser==3.0
Pygments==2.20.0
pyparsing==3.3.2
pysbd==0.3.4
python-dateutil==2.9.0.post0
PyYAML==6.0.3
regex==2026.7.10
requests==2.34.2
rich==15.0.0
safetensors==0.8.0
scikit-learn==1.9.0
scipy==1.17.1
shellingham==1.5.4
six==1.17.0
soundfile==0.14.0
soxr==1.1.0
sympy==1.14.0
tensorboard==2.21.0
tensorboard-data-server==0.7.2
threadpoolctl==3.6.0
tokenizers==0.22.2
torch==2.7.1
torchaudio==2.7.1
torchvision==0.22.1
tqdm==4.69.0
transformers==4.57.6
typeguard==4.5.2
typer==0.27.0
typing_extensions==4.16.0
urllib3==2.7.0
Werkzeug==3.1.8
yarl==1.24.2
```

* Instalo requirements

```
pip install requirements.txt
```

* Uso el audio y el modelo para clonar la voz

```
from TTS.api import TTS
tts = TTS("tts_models/multilingual/multi-dataset/xtts_v2", gpu=False)

# generate speech by cloning a voice using default settings
tts.tts_to_file(text="Muchachos, quedense tranquilos que vamos a salir campeones.",
                file_path="NuevoSaludaMessi.wav",
                speaker_wav="SaludoMessi.wav",
                language="es")
```

# Azure

* Una pataforma para desplegar y con servicios para dar soporte a la creacion de aplicaciones

> [!NOTE]
> Hoy no anda Azure

  
