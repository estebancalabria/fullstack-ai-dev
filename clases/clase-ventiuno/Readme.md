# Clase 21 - 20 de Mayo del 2025

# Repaso

* Base de Datos
  * Funciones de agrupacion
      * Group by
      * Count
      * Max
      * Min
      * Acg
  * Inner Join
  * Sub Select

---

# IA 

* Modelos Propietarios
    * ChatGPT
    * Claude
* Modelos Open Source
    * Qwen
    * DeepSeek
    * Llama

* Formas de Usar un LLM
    * Mediante la interfaz Web
    * Mediante API Key

* Web motor de inferencia para probar modelos Open Source
  * https://groq.com/
  * https://chat.groq.com/
 
* Todos los LLM
  * Tienen dos portales
      * Portal para el usuario final
          * ChatGPT
              * https://chatgpt.com/
          * Groq
            *  https://chat.groq.com/
      * Portal para el desarrollador
          * ChatGPT
              * https://platform.openai.com/  << Puedo sacar claves de API pero su es pago
            * Groq
              * https://console.groq.com/home   << Aca saco api keys
              

> En general utilizar un LLM propietario VIA api suele ser pago (gemini te deja probar gratis)



# Volvemos a Python....

* Colab de la Clase
  * https://colab.research.google.com/drive/1F_l3cu8aN9sNcH7fAvB-2ub0FsD2TlJW?usp=sharing

> Luego le integramos lo que es Bases de Datos

## USO De la API

* Imaginen que hoy quisieramos programar el juego "Preguntados"
* En su momento el creador del juego tenia una base de datos de miles de preguntas que alguien cargaba
* Hoy en dia si quisieramos programarlo de nuevo podemos reemplazar la base de datos con preguntas generad por la IA

* Prompt

```
Dame una pregunta de historia Argentina con 4 respuestas. Indicame la correcta. Respondeme la respuesta en un json { pregunta : "...", resputestas : [ { respuesta : "...", correcta: true/false } ...]
```

* Y La ia respunde
```
{
  "pregunta": "¿En qué año se declaró la independencia de Argentina?",
  "respuestas": [
    {
      "respuesta": "1810",
      "correcta": false
    },
    {
      "respuesta": "1816",
      "correcta": true
    },
    {
      "respuesta": "1820",
      "correcta": false
    },
    {
      "respuesta": "1853",
      "correcta": false
    }
  ]
}
```

* Ir a console.groq.com
* Sacar una api Key
* Guardar un lugar seguro (si me la roban se pueden hacer pasar por mi)

```python
from openai import OpenAI
import os

api_key = input("Ingrese su Api Key: ")
prompt = input("Ingrese su prompt: ")


client = OpenAI(
    api_key=api_key,
    base_url="https://api.groq.com/openai/v1",
)

response = client.responses.create(
    input=prompt,
    model="openai/gpt-oss-20b",
)

print(response.output_text)
```

* Ejemplo ejecucion

```
Ingrese su Api Key: gsk_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
Ingrese su prompt: Quien descrubrio america. Responde en un json { respuesta : "...." }
{"respuesta":"Cristóbal Colón"}
```
