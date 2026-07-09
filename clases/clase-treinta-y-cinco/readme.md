# Clase Treinta y Cinco - 8 de Julio del 2026

# Repaso

* RAG
  * Integracion RAG con LLM
    * Setup: (generamos los vectores/embeddings) -> (Los guardamos en una base vectorial)
    * Uso: (prompt) -> (calculamos el embedding del prompt)
        * -> (buscabamos documentos relacionados en base vectorial)
        * -> (creabamos nuevo contexto con los documentos delacionados)
        * -> (promot con nuevo contexto) -> (llm)
  * Experimentamos con distintos modelos de embeddings
      * all-MiniLM-L6-v2
      * intfloat/multilingual-e5-large
* Introduccion a Tool Use

---

# Colab de la Clase

* https://colab.research.google.com/drive/1uNHuEoHAyF3GXWNLRaVZHuyooWdJSNV1?usp=sharing

# Tool Use

* Capacidad de el llm de utilizar funciones personalizadas para llevar adelante una tarea

* Antes de arrancar con LLM, voy a definir mi herramienta

```python
import random

def obtener_clima(ciudad):
  temperatura = [-5,0,5,10,15,20,25,30,35]
  condiciones = ["soleado", "nublado", "lluvioso", "ventoso"]

  clima = {
      "ciudad" : ciudad,
      "temperatura" : random.choice(temperatura),
      "condiciones" : random.choice(condiciones)
  }
  
  return clima
```

* Crear una api key en groq
  * https://console.groq.com/keys
 
* Elegir un modelo que tenga Tool Use
  * https://console.groq.com/docs/model/llama-3.3-70b-versatile

* Chequear la documentacion de Tool Use
  * https://console.groq.com/docs/tool-use/overview

* Armar el diccionario de tools para informarle al modelo que tools tiene que usar

* Le pido a claude con este prompt

```
ccionario para informar a un lllm de las tools. Mis tools son : "

import random

def obtener_clima(ciudad):
  temperatura = [-5,0,5,10,15,20,25,30,35]
  condiciones = ["soleado", "nublado", "lluvioso", "ventoso"]

  clima = {
      "ciudad" : ciudad,
      "temperatura" : random.choice(temperatura),
      "condiciones" : random.choice(condiciones)
  }
  
  return clima
"

Quiero que el diccionario siga este esquema definido en la documentacion // Sample request body with tool definitions and messages
{
  "tools": [
    {
      "type": "function",
      "function": {
        "name": "get_weather",
        "description": "Get current weather for a location",
        "parameters": {
          // JSON Schema object
          "type": "object",
          "properties": {
            "location": {
              "type": "string",
              "description": "City and state, e.g. San Francisco, CA"
            },
            "unit": {
              "type": "string",
              "enum": ["celsius", "fahrenheit"]
            }
          },
          "required": ["location"]
        }
      }
    }
  ],
  "messages": [
    {
      "role": "system",
      "content": "You are a weather assistant. Respond to the user question and use tools if needed to answer the query."
    },
    {
      "role": "user",
      "content": "What's the weather in San Francisco?" 
    }
  ],
}
. Completar tools = {}
```

* Y claude me respondio

```
tools = [
    {
        "type": "function",
        "function": {
            "name": "obtener_clima",
            "description": "Obtiene el clima actual de una ciudad",
            "parameters": {
                "type": "object",
                "properties": {
                    "ciudad": {
                        "type": "string",
                        "description": "Nombre de la ciudad, e.g. Buenos Aires"
                    }
                },
                "required": ["ciudad"]
            }
        }
    }
]
```

* Crear cliente de groq

```

from openai import OpenAI

api_key = input("Ingrese su Api Key")

client = OpenAI(
    api_key=api_key,
    base_url="https://api.groq.com/openai/v1",
)

```

* Vamos a armar el system prompt

```python
system_prompt = """
Eres un asistente para responder preguntas sobre el clima.
Si te hablan de algo que no tiene que ver con el clima, rechaza amablemente la solicitud
Debes preguntar la ciudad desde la cual te desea saber el clima el usuario si no la informa 
Para saber el clima en una ciudad tienen una herramienta obtener_clima para consultarlo
"""
```

>[!NOTE]
>A pesar de que le vamos a informar de las herramientas al modelo para asegurarnos que las utilice conviene reforzar su existencia en el system prompt

* Probamos la intencion del modelo de llamar a la herramienta

```
import json

prompt = "Que clima hace en Buenos Aires?"

response = client.chat.completions.create(
    model="llama-3.3-70b-versatile",
    messages=[
        {"role": "system", "content": system_prompt},
        {"role": "user", "content": prompt}
    ],
    tools=tools,
    tool_choice="auto"
)

print(json.dumps(response.model_dump(), indent=2, ensure_ascii=False))

if response.choices[0].message.tool_calls:
    print("El modelo pide utilizaruna herraienta")
```

* Me devolvio

```
{
  "id": "chatcmpl-82b58916-a17e-4927-9e6f-3803287f68fa",
  "choices": [
    {
      "finish_reason": "tool_calls",
      "index": 0,
      "logprobs": null,
      "message": {
        "content": null,
        "refusal": null,
        "role": "assistant",
        "annotations": null,
        "audio": null,
        "function_call": null,
        "tool_calls": [
          {
            "id": "yb8vexzkq",
            "function": {
              "arguments": "{\"ciudad\":\"Buenos Aires\"}",
              "name": "obtener_clima"
            },
            "type": "function"
          }
        ]
      }
    }
  ],
  "created": 1783551283,
  "model": "llama-3.3-70b-versatile",
  "object": "chat.completion",
  "moderation": null,
  "service_tier": "on_demand",
  "system_fingerprint": "fp_45180df409",
  "usage": {
    "completion_tokens": 21,
    "prompt_tokens": 329,
    "total_tokens": 350,
    "completion_tokens_details": null,
    "prompt_tokens_details": null,
    "queue_time": 0.174836641,
    "prompt_time": 0.016305129,
    "completion_time": 0.050265384,
    "total_time": 0.066570513
  },
  "usage_breakdown": null,
  "x_groq": {
    "id": "req_01kx1z1kpafrevcf2wxm4wjy2y",
    "seed": 1492279001
  }
}
El modelo pide utilizaruna herraienta

```

* Se ve claramente que el modelo me pide llamar a una herramienta, cada llamada tiene un id
  * ID_De_LLamada: yb8vexzkq

 * Ahora hago la llamada a la tool tal cual me lo pidio el llm y le agrego la respuesta

```python
response = client.chat.completions.create(
    model="llama-3.3-70b-versatile",
    messages=[
        {"role": "system", "content": system_prompt},
        {"role": "user", "content": prompt}
    ],
    tools=tools,
    tool_choice="auto"
)


if response.choices[0].message.tool_calls:
    tool_call = response.choices[0].message.tool_calls[0]
    function_name = tool_call.function.name
    function_args = json.loads(tool_call.function.arguments)
    ciudad = function_args['ciudad']

    if function_name == "obtener_clima":
        clima = obtener_clima(ciudad)
        print(clima)

        response_con_tool = client.chat.completions.create(
            model="llama-3.3-70b-versatile",
            messages=[
                {"role": "system", "content": system_prompt},
                {"role": "user", "content": prompt},
                response.choices[0].message,
                {
                    "role": "function", 
                    "name": function_name, 
                    "tool_call_id" : tool_call.id,
                    "content": json.dumps(clima)
                }
            ],
            tools=tools,
            tool_choice="auto"
        )

        print(response_con_tool.choices[0].message.content)

else: 
    print(response.choices[0].message.content)
```
---

# Ejecicio : Reemplazar el ejercicio anterior la tool que devuelve una temperatura al azar y utilizar alguna api para consultar el clima

* Usamos la api de
  * https://open-meteo.com/

* Ya tenemos la api key en una variable
```
api_key = input("Ingrese su ai key");
```

* Para esta version tenemos que instalar Groq
```
!pip install groq
```

* Cargar las funciones a memoria
```
import os
import json
import requests
from IPython.display import display, Markdown
from groq import Groq

# Opción A (rápida, pero evitá compartir esta celda con la key adentro):


# Opción B (recomendada en Colab): guardá la key en el ícono de la llave 🔑
# a la izquierda, con el nombre GROQ_API_KEY, y usá:
# from google.colab import userdata
# os.environ["GROQ_API_KEY"] = userdata.get("GROQ_API_KEY")

client = Groq(api_key=api_key)

# --- 1. Definición de la tool ---
tools = [
    {
        "type": "function",
        "function": {
            "name": "get_weather",
            "description": "Get current weather for a location",
            "parameters": {
                "type": "object",
                "properties": {
                    "location": {
                        "type": "string",
                        "description": "City name, e.g. Rosario, San Francisco, Buenos Aires"
                    },
                    "unit": {
                        "type": "string",
                        "enum": ["celsius", "fahrenheit"]
                    }
                },
                "required": ["location"]
            }
        }
    }
]

# --- 2. Función real: geocodifica la ciudad y pide el clima ---
def get_weather(location, unit="celsius"):
    geo_url = "https://geocoding-api.open-meteo.com/v1/search"
    geo_resp = requests.get(geo_url, params={"name": location, "count": 1, "language": "es"}).json()

    if "results" not in geo_resp or len(geo_resp["results"]) == 0:
        return json.dumps({"error": f"No se encontró la ciudad '{location}'"})

    place = geo_resp["results"][0]
    lat, lon = place["latitude"], place["longitude"]
    nombre_real = f"{place['name']}, {place.get('country', '')}"

    weather_url = "https://api.open-meteo.com/v1/forecast"
    temp_unit = "fahrenheit" if unit == "fahrenheit" else "celsius"
    weather_resp = requests.get(weather_url, params={
        "latitude": lat,
        "longitude": lon,
        "current": "temperature_2m,wind_speed_10m,relative_humidity_2m",
        "temperature_unit": temp_unit
    }).json()

    current = weather_resp.get("current", {})

    return json.dumps({
        "location": nombre_real,
        "temperature": current.get("temperature_2m"),
        "unit": unit,
        "humidity": current.get("relative_humidity_2m"),
        "wind_speed": current.get("wind_speed_10m")
    }, ensure_ascii=False)

available_functions = {"get_weather": get_weather}

# --- 3. Función para mostrar el clima bonito (Markdown) ---
def mostrar_clima_markdown(data_json):
    data = json.loads(data_json)

    if "error" in data:
        display(Markdown(f"### ❌ {data['error']}"))
        return

    unidad_simbolo = "°C" if data["unit"] == "celsius" else "°F"

    md = f"""
### 🌤️ Clima en **{data['location']}**

| Dato | Valor |
|---|---|
| 🌡️ Temperatura | {data['temperature']}{unidad_simbolo} |
| 💧 Humedad | {data['humidity']}% |
| 💨 Viento | {data['wind_speed']} km/h |
"""
    display(Markdown(md))

# --- 4. Función principal: preguntar ---
def preguntar(pregunta_usuario):
    messages = [
        {"role": "system", "content": "Eres un asistente para responder preguntas sobre el clima. Si te hablan de algo que no tiene que ver con el clima, rechaza amablemente la solicitud. Debes preguntar la ciudad desde la cual te desea saber el clima el usuario si no la informa. Para saber el clima en una ciudad tienes una herramienta get_weather para consultarlo"},
        {"role": "user", "content": pregunta_usuario}
    ]

    response = client.chat.completions.create(
        model="llama-3.3-70b-versatile",
        messages=messages,
        tools=tools,
        tool_choice="auto",
        max_tokens=1024
    )

    response_message = response.choices[0].message
    tool_calls = response_message.tool_calls

    if tool_calls:
        messages.append(response_message)
        for tool_call in tool_calls:
            args = json.loads(tool_call.function.arguments)
            result = available_functions[tool_call.function.name](**args)

            # 👇 tarjeta bonita del clima
            mostrar_clima_markdown(result)

            messages.append({
                "tool_call_id": tool_call.id,
                "role": "tool",
                "name": tool_call.function.name,
                "content": result,
            })

        second_response = client.chat.completions.create(
            model="llama-3.3-70b-versatile",
            messages=messages
        )
        respuesta_texto = second_response.choices[0].message.content
        display(Markdown(f"**🤖 Asistente:** {respuesta_texto}"))
        return respuesta_texto
    else:
        display(Markdown(f"**🤖 Asistente:** {response_message.content}"))
        return response_message.content
```

* Invocamos las funciones y las llamadas a herramientas

```
ciudad = input("¿Sobre qué ciudad querés saber el clima? ")
preguntar(f"¿Qué clima hace en {ciudad}?")
```

---

# Vamos a probar generar una imagen en un google colab

* Generamos un google colab nuevo con gpu
 * Menu -> Entorno de Ejecucion -> Tipo de Entorno de Ejecucion -> 

* Cargamos el modelo
```
from diffusers import StableDiffusionPipeline
import torch

model_id = "sd-legacy/stable-diffusion-v1-5"
pipe = StableDiffusionPipeline.from_pretrained(model_id, torch_dtype=torch.float16)
pipe = pipe.to("cuda")

```

* Creamos la imagen

```
prompt = "a cute kitten"

image = pipe(prompt).images[0]  
    
image.save("astronaut_rides_horse.png")

image
```

* Colab
 * https://colab.research.google.com/drive/1vNUNl_3nbcQQtrjFqrst5Cagz9e7XFsV?usp=sharing 


