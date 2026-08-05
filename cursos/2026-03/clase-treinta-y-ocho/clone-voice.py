from TTS.api import TTS
tts = TTS("tts_models/multilingual/multi-dataset/xtts_v2", gpu=False)

# generate speech by cloning a voice using default settings
tts.tts_to_file(text="Muchachos, quedense tranquilos que vamos a salir campeones.",
                file_path="NuevoSaludaMessi.wav",
                speaker_wav="SaludoMessi.wav",
                language="es")