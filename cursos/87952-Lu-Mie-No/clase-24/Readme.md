# Clase 24 - 2 de Noviembre del 2026

# Repaso

* Uso de modelos con API Key
  * Gemini
  * Groq (Modelos OS)
    * Reposes API
      * client.responses.create(...)
      * Solamente el LLM me da una respuesta
    * Chat Copletion
      * client.chat.completions.create(..)
      * Mantiene el historial de la conversacion
  * Uso
    * Desde Google Colab con Python
    * Mediante HTTP con Thunder Client

# Novedad

* Hackeo a Binance
* Patitos de Nvidia
  * https://www.youtube.com/watch?v=Nt6d62vN7CU
* Actualizacion LMStudio
  * Ahora se llama LMStudio Bionic

# Uso de Api Key con Modelos Locales

* Para trabajar con LLM Local hay que usar:
    * LMStudio
    * Ollama
* En LMStudio tenemos la solapa Developer para trabajar igual con modelos locales

<img width="709" height="157" alt="image" src="https://github.com/user-attachments/assets/dc42fb10-561b-4635-97d5-1adfa8053b97" />

* En la actualizacion de LMStudio Bionic

<img width="1845" height="1112" alt="image" src="https://github.com/user-attachments/assets/19c92ce2-18c2-415a-9fa2-d2ea23108a58" />

> [!NOTE]
> PAra desarrollar cosas usando modelos por medio de API existe la positiblicdad de desarrollarlo primero localmente (para no quedarnos sin tokens) y despues cambiandole el endpoint se peude utilizar sobre modelos en la nube

* Esta bueno saber que todo lo que vimos la clase pasada se peude ejecturar tambien con un modelo local sin cambiar el codigo (solamente el endpoint)

> [!NOTE]
> En la era donde los modelos son cada vez mejores. El desafio muchas veces no es utilizar el modelo ma grande (y mas caro) sino tener nuestro prompts tan bien optimizados que lo  mismo podamos hacer y mas rapido con modelos chicos

# Juego con IA

# Glosario

* Slop
  * Slop es contenido de baja calidad, genérico o sin valor, producido masivamente —generalmente mediante IA— sin criterio, originalidad ni cuidado.
    
