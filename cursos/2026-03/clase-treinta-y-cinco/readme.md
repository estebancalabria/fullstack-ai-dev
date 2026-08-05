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

## Ejecicio : Basado en lo anteior, consulta del clima con Gradio

```
import os
import json
import random
import requests
import gradio as gr
from groq import Groq

# ---------------------------------------------------------
# 0. API KEY — pegá la tuya acá abajo.
#    (Ojo: si subís este archivo a un repo público, cualquiera
#    puede ver la key y usarla a tu costa. Si en algún momento
#    lo subís a GitHub, mejor pasarla a variable de entorno.)
# ---------------------------------------------------------
GROQ_API_KEY = "apiiikey"

if not GROQ_API_KEY or GROQ_API_KEY == "PEGA_TU_API_KEY_ACA":
    raise RuntimeError("⚠️ Falta setear GROQ_API_KEY con tu key real arriba en el código.")

client = Groq(api_key=GROQ_API_KEY)
REQUEST_TIMEOUT = 8  # segundos, para no colgarnos si Open-Meteo no responde

# ---------------------------------------------------------
# 1. Tool definition
# ---------------------------------------------------------
tools = [
    {
        "type": "function",
        "function": {
            "name": "get_weather",
            "description": "Get current weather and 5-day forecast for a location",
            "parameters": {
                "type": "object",
                "properties": {
                    "location": {"type": "string", "description": "City name"},
                    "unit": {"type": "string", "enum": ["celsius", "fahrenheit"]}
                },
                "required": ["location"]
            }
        }
    }
]

# ---------------------------------------------------------
# 2. Mapeo COMPLETO de códigos WMO -> emoji, nombre, colores,
#    animación de fondo y tipo de sonido ambiente
# ---------------------------------------------------------
WEATHER_CATALOG = {
    0:  {"emoji": "☀️", "nombre": "Despejado",              "grad": "linear-gradient(135deg, #FFD93D, #FF6B35)", "anim": "sun-spin",   "bg": "sun",   "sound": "chime"},
    1:  {"emoji": "🌤️", "nombre": "Mayormente despejado",   "grad": "linear-gradient(135deg, #FFE29F, #FFA99F)", "anim": "float",      "bg": "sun",   "sound": "chime"},
    2:  {"emoji": "⛅", "nombre": "Parcialmente nublado",    "grad": "linear-gradient(135deg, #A8C0FF, #3F2B96)", "anim": "float",      "bg": "clouds","sound": "wind"},
    3:  {"emoji": "☁️", "nombre": "Nublado",                 "grad": "linear-gradient(135deg, #757F9A, #4B5262)", "anim": "float",      "bg": "clouds","sound": "wind"},
    45: {"emoji": "🌫️", "nombre": "Neblina",                "grad": "linear-gradient(135deg, #BDC3C7, #2C3E50)", "anim": "fade-pulse", "bg": "fog",   "sound": "wind"},
    48: {"emoji": "🌫️", "nombre": "Neblina helada",         "grad": "linear-gradient(135deg, #BDC3C7, #2C3E50)", "anim": "fade-pulse", "bg": "fog",   "sound": "wind"},
    51: {"emoji": "🌦️", "nombre": "Llovizna leve",          "grad": "linear-gradient(135deg, #667eea, #764ba2)", "anim": "rain-shake", "bg": "rain",  "sound": "rain"},
    53: {"emoji": "🌦️", "nombre": "Llovizna",               "grad": "linear-gradient(135deg, #667eea, #764ba2)", "anim": "rain-shake", "bg": "rain",  "sound": "rain"},
    55: {"emoji": "🌧️", "nombre": "Llovizna intensa",       "grad": "linear-gradient(135deg, #4A90E2, #1B2A4A)", "anim": "rain-shake", "bg": "rain",  "sound": "rain"},
    56: {"emoji": "🌧️", "nombre": "Llovizna helada",        "grad": "linear-gradient(135deg, #83a4d4, #b6fbff)", "anim": "rain-shake", "bg": "rain",  "sound": "rain"},
    57: {"emoji": "🌧️", "nombre": "Llovizna helada intensa","grad": "linear-gradient(135deg, #83a4d4, #b6fbff)", "anim": "rain-shake", "bg": "rain",  "sound": "rain"},
    61: {"emoji": "🌧️", "nombre": "Lluvia leve",            "grad": "linear-gradient(135deg, #4A90E2, #1B2A4A)", "anim": "rain-shake", "bg": "rain",  "sound": "rain"},
    63: {"emoji": "🌧️", "nombre": "Lluvia",                 "grad": "linear-gradient(135deg, #396afc, #2948ff)", "anim": "rain-shake", "bg": "rain",  "sound": "rain"},
    65: {"emoji": "🌧️", "nombre": "Lluvia intensa",         "grad": "linear-gradient(135deg, #22314c, #1c3053)", "anim": "rain-shake", "bg": "rain",  "sound": "rain"},
    66: {"emoji": "🌧️", "nombre": "Lluvia helada",          "grad": "linear-gradient(135deg, #83a4d4, #b6fbff)", "anim": "rain-shake", "bg": "rain",  "sound": "rain"},
    67: {"emoji": "🌧️", "nombre": "Lluvia helada intensa",  "grad": "linear-gradient(135deg, #83a4d4, #b6fbff)", "anim": "rain-shake", "bg": "rain",  "sound": "rain"},
    71: {"emoji": "🌨️", "nombre": "Nieve leve",             "grad": "linear-gradient(135deg, #E0EAFC, #8FA6CB)", "anim": "float",      "bg": "snow",  "sound": "wind"},
    73: {"emoji": "❄️", "nombre": "Nieve",                  "grad": "linear-gradient(135deg, #E0EAFC, #8FA6CB)", "anim": "float",      "bg": "snow",  "sound": "wind"},
    75: {"emoji": "❄️", "nombre": "Nieve intensa",          "grad": "linear-gradient(135deg, #cfd9df, #7f8fa6)", "anim": "float",      "bg": "snow",  "sound": "wind"},
    77: {"emoji": "🌨️", "nombre": "Granizo de nieve",       "grad": "linear-gradient(135deg, #E0EAFC, #8FA6CB)", "anim": "float",      "bg": "snow",  "sound": "wind"},
    80: {"emoji": "🌦️", "nombre": "Chaparrones leves",      "grad": "linear-gradient(135deg, #667eea, #764ba2)", "anim": "rain-shake", "bg": "rain",  "sound": "rain"},
    81: {"emoji": "🌦️", "nombre": "Chaparrones",            "grad": "linear-gradient(135deg, #4568dc, #b06ab3)", "anim": "rain-shake", "bg": "rain",  "sound": "rain"},
    82: {"emoji": "⛈️", "nombre": "Chaparrones violentos",  "grad": "linear-gradient(135deg, #232526, #414345)", "anim": "shake",      "bg": "storm", "sound": "storm"},
    85: {"emoji": "🌨️", "nombre": "Chubascos de nieve",     "grad": "linear-gradient(135deg, #E0EAFC, #8FA6CB)", "anim": "float",      "bg": "snow",  "sound": "wind"},
    86: {"emoji": "🌨️", "nombre": "Chubascos de nieve intensos", "grad": "linear-gradient(135deg, #cfd9df, #7f8fa6)", "anim": "float",  "bg": "snow",  "sound": "wind"},
    95: {"emoji": "⛈️", "nombre": "Tormenta",               "grad": "linear-gradient(135deg, #232526, #414345)", "anim": "shake",      "bg": "storm", "sound": "storm"},
    96: {"emoji": "⛈️", "nombre": "Tormenta con granizo",   "grad": "linear-gradient(135deg, #0f2027, #203a43)", "anim": "shake",      "bg": "storm", "sound": "storm"},
    99: {"emoji": "⛈️", "nombre": "Tormenta severa",        "grad": "linear-gradient(135deg, #0f0c29, #302b63)", "anim": "shake",      "bg": "storm", "sound": "storm"},
}

DATOS_CURIOSOS = [
    "¿Sabías que un rayo puede calentar el aire a su alrededor hasta 5 veces más que la superficie del sol? ⚡",
    "La nieve no es blanca en realidad, es transparente: refleja toda la luz visible ❄️",
    "El lugar más lluvioso del mundo es Mawsynram, India, con más de 11.000 mm de lluvia al año 🌧️",
    "Un copo de nieve puede tardar hasta una hora en caer del cielo al suelo ❄️",
    "El récord de temperatura más alta registrada fue de 56.7°C en Death Valley, EE.UU. 🥵",
    "Las nubes pueden pesar toneladas, ¡pero flotan porque las gotas están muy dispersas! ☁️",
    "En la Antártida hay un lugar donde no llueve ni nieva hace millones de años 🧊",
    "El arcoíris nunca tiene el mismo aspecto para dos personas: cada quien ve uno distinto según su ángulo 🌈",
    "Un trueno se escucha después del rayo porque la luz viaja mucho más rápido que el sonido 🔊",
    "El viento más fuerte jamás registrado en la superficie fue de 408 km/h, durante un ciclón en Australia 🌪️",
]


def get_style(weather_code):
    return WEATHER_CATALOG.get(
        weather_code,
        {"emoji": "🌍", "nombre": "Clima variable", "grad": "linear-gradient(135deg, #757F9A, #D7DDE8)",
         "anim": "float", "bg": "clouds", "sound": "wind"},
    )


# ---------------------------------------------------------
# 3. Función real de clima (actual + pronóstico 5 días)
# ---------------------------------------------------------
def get_weather(location, unit="celsius"):
    try:
        geo_url = "https://geocoding-api.open-meteo.com/v1/search"
        geo_resp = requests.get(
            geo_url, params={"name": location, "count": 1, "language": "es"}, timeout=REQUEST_TIMEOUT
        ).json()
    except requests.RequestException:
        return json.dumps({"error": "No pude conectarme al servicio de geolocalización. Probá de nuevo."})

    if "results" not in geo_resp or len(geo_resp["results"]) == 0:
        return json.dumps({"error": f"No se encontró la ciudad '{location}'"}, ensure_ascii=False)

    place = geo_resp["results"][0]
    lat, lon = place["latitude"], place["longitude"]
    nombre_real = f"{place['name']}, {place.get('country', '')}"

    temp_unit = "fahrenheit" if unit == "fahrenheit" else "celsius"
    try:
        weather_url = "https://api.open-meteo.com/v1/forecast"
        weather_resp = requests.get(
            weather_url,
            params={
                "latitude": lat,
                "longitude": lon,
                "current": "temperature_2m,wind_speed_10m,relative_humidity_2m,weather_code",
                "daily": "weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max",
                "temperature_unit": temp_unit,
                "timezone": "auto",
                "forecast_days": 5,
            },
            timeout=REQUEST_TIMEOUT,
        ).json()
    except requests.RequestException:
        return json.dumps({"error": "No pude conectarme al servicio de clima. Probá de nuevo."})

    current = weather_resp.get("current", {})
    daily = weather_resp.get("daily", {})

    forecast = []
    dias = daily.get("time", [])
    codes = daily.get("weather_code", [])
    tmax = daily.get("temperature_2m_max", [])
    tmin = daily.get("temperature_2m_min", [])
    pprob = daily.get("precipitation_probability_max", [])
    for i in range(len(dias)):
        forecast.append({
            "fecha": dias[i],
            "weather_code": codes[i] if i < len(codes) else 0,
            "temp_max": tmax[i] if i < len(tmax) else None,
            "temp_min": tmin[i] if i < len(tmin) else None,
            "prob_lluvia": pprob[i] if i < len(pprob) else None,
        })

    return json.dumps({
        "location": nombre_real,
        "temperature": current.get("temperature_2m"),
        "unit": unit,
        "humidity": current.get("relative_humidity_2m"),
        "wind_speed": current.get("wind_speed_10m"),
        "weather_code": current.get("weather_code", 0),
        "forecast": forecast,
    }, ensure_ascii=False)


available_functions = {"get_weather": get_weather}

# ---------------------------------------------------------
# 4. Llamada al modelo Groq con tool calling
# ---------------------------------------------------------
def preguntar(pregunta_usuario):
    messages = [
        {"role": "system", "content": (
            "Eres un asistente super entusiasta sobre el clima, usa emojis y sé breve y divertido. "
            "Si no tenés la ciudad, preguntala. Usa la tool get_weather para consultar datos reales, "
            "incluyendo el pronóstico de los próximos días si es relevante."
        )},
        {"role": "user", "content": pregunta_usuario}
    ]

    try:
        response = client.chat.completions.create(
            model="llama-3.3-70b-versatile",
            messages=messages,
            tools=tools,
            tool_choice="auto",
            max_tokens=512
        )
    except Exception as e:
        return f"😵 Uy, tuve un problema hablando con el modelo: {e}", None

    response_message = response.choices[0].message
    tool_calls = response_message.tool_calls
    datos_clima = None

    if tool_calls:
        messages.append(response_message)
        for tool_call in tool_calls:
            try:
                args = json.loads(tool_call.function.arguments)
                result = available_functions[tool_call.function.name](**args)
            except Exception as e:
                result = json.dumps({"error": f"Error ejecutando la herramienta: {e}"})
            datos_clima = result
            messages.append({
                "tool_call_id": tool_call.id,
                "role": "tool",
                "name": tool_call.function.name,
                "content": result,
            })

        try:
            second_response = client.chat.completions.create(
                model="llama-3.3-70b-versatile",
                messages=messages
            )
            texto_final = second_response.choices[0].message.content
        except Exception as e:
            texto_final = f"😵 Conseguí el clima pero no pude redactar la respuesta: {e}"
    else:
        texto_final = response_message.content

    return texto_final, datos_clima


# ---------------------------------------------------------
# 5. Elementos de fondo animado por tipo de clima
# ---------------------------------------------------------
def generar_fondo(bg_tipo):
    if bg_tipo == "rain":
        drops = "".join(
            f'<div class="drop" style="left:{random.randint(0,100)}%; '
            f'animation-delay:{random.uniform(0,2):.2f}s; animation-duration:{random.uniform(0.5,1.1):.2f}s;"></div>'
            for _ in range(35)
        )
        return f'<div class="bg-layer bg-rain">{drops}</div>'

    if bg_tipo == "storm":
        drops = "".join(
            f'<div class="drop drop-storm" style="left:{random.randint(0,100)}%; '
            f'animation-delay:{random.uniform(0,2):.2f}s; animation-duration:{random.uniform(0.4,0.8):.2f}s;"></div>'
            for _ in range(45)
        )
        return f'<div class="bg-layer bg-rain">{drops}</div><div class="lightning-flash"></div>'

    if bg_tipo == "snow":
        flakes = "".join(
            f'<div class="flake" style="left:{random.randint(0,100)}%; '
            f'animation-delay:{random.uniform(0,4):.2f}s; animation-duration:{random.uniform(4,8):.2f}s; '
            f'font-size:{random.randint(10,22)}px;">❄</div>'
            for _ in range(25)
        )
        return f'<div class="bg-layer bg-snow">{flakes}</div>'

    if bg_tipo == "sun":
        rays = "".join(f'<div class="ray" style="transform: rotate({i * 30}deg);"></div>' for i in range(12))
        return f'<div class="bg-layer bg-sun"><div class="sun-rays">{rays}</div></div>'

    if bg_tipo == "fog":
        bands = "".join(
            f'<div class="fog-band" style="top:{i * 18}%; animation-delay:{i * 0.7}s;"></div>' for i in range(6)
        )
        return f'<div class="bg-layer bg-fog">{bands}</div>'

    # clouds / default
    clouds = "".join(
        f'<div class="cloud-shape" style="top:{random.randint(5,60)}%; '
        f'animation-delay:{random.uniform(0,10):.2f}s; animation-duration:{random.uniform(18,30):.2f}s; '
        f'transform: scale({random.uniform(0.6,1.3):.2f});">☁️</div>'
        for _ in range(6)
    )
    return f'<div class="bg-layer bg-clouds">{clouds}</div>'


# ---------------------------------------------------------
# 6. Sonido ambiente sintetizado (Web Audio API, sin archivos externos)
# ---------------------------------------------------------
def generar_audio_script(sound_tipo, card_id):
    return f"""
    <script>
    (function() {{
        let audioCtx = null;
        let nodes = [];
        const btn = document.getElementById('sound-btn-{card_id}');
        if (!btn) return;
        let playing = false;

        function makeNoiseBuffer(ctx) {{
            const bufferSize = 2 * ctx.sampleRate;
            const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
            const output = buffer.getChannelData(0);
            for (let i = 0; i < bufferSize; i++) output[i] = Math.random() * 2 - 1;
            return buffer;
        }}

        function startRain(ctx) {{
            const noise = ctx.createBufferSource();
            noise.buffer = makeNoiseBuffer(ctx);
            noise.loop = true;
            const filter = ctx.createBiquadFilter();
            filter.type = 'bandpass';
            filter.frequency.value = 1200;
            filter.Q.value = 0.6;
            const gain = ctx.createGain();
            gain.gain.value = 0.05;
            noise.connect(filter).connect(gain).connect(ctx.destination);
            noise.start();
            return [noise, filter, gain];
        }}

        function startWind(ctx) {{
            const noise = ctx.createBufferSource();
            noise.buffer = makeNoiseBuffer(ctx);
            noise.loop = true;
            const filter = ctx.createBiquadFilter();
            filter.type = 'lowpass';
            filter.frequency.value = 400;
            const lfo = ctx.createOscillator();
            lfo.frequency.value = 0.15;
            const lfoGain = ctx.createGain();
            lfoGain.gain.value = 150;
            lfo.connect(lfoGain).connect(filter.frequency);
            lfo.start();
            const gain = ctx.createGain();
            gain.gain.value = 0.06;
            noise.connect(filter).connect(gain).connect(ctx.destination);
            noise.start();
            return [noise, filter, gain, lfo, lfoGain];
        }}

        function startStorm(ctx) {{
            const rainNodes = startRain(ctx);
            const rumble = ctx.createOscillator();
            rumble.type = 'sine';
            rumble.frequency.value = 45;
            const rumbleGain = ctx.createGain();
            rumbleGain.gain.value = 0.03;
            rumble.connect(rumbleGain).connect(ctx.destination);
            rumble.start();

            function scheduleThunder() {{
                if (!playing) return;
                const thunder = ctx.createBufferSource();
                thunder.buffer = makeNoiseBuffer(ctx);
                const tFilter = ctx.createBiquadFilter();
                tFilter.type = 'lowpass';
                tFilter.frequency.value = 200;
                const tGain = ctx.createGain();
                tGain.gain.setValueAtTime(0.0001, ctx.currentTime);
                tGain.gain.exponentialRampToValueAtTime(0.35, ctx.currentTime + 0.05);
                tGain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 1.8);
                thunder.connect(tFilter).connect(tGain).connect(ctx.destination);
                thunder.start();
                thunder.stop(ctx.currentTime + 2);
                setTimeout(scheduleThunder, 4000 + Math.random() * 6000);
            }}
            setTimeout(scheduleThunder, 1500);
            return [...rainNodes, rumble, rumbleGain];
        }}

        function startChime(ctx) {{
            const notes = [523.25, 659.25, 783.99, 1046.5];
            const created = [];
            function pluck() {{
                if (!playing) return;
                const osc = ctx.createOscillator();
                osc.type = 'sine';
                osc.frequency.value = notes[Math.floor(Math.random() * notes.length)];
                const gain = ctx.createGain();
                gain.gain.setValueAtTime(0.0001, ctx.currentTime);
                gain.gain.exponentialRampToValueAtTime(0.12, ctx.currentTime + 0.02);
                gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 1.2);
                osc.connect(gain).connect(ctx.destination);
                osc.start();
                osc.stop(ctx.currentTime + 1.3);
                setTimeout(pluck, 1200 + Math.random() * 1800);
            }}
            setTimeout(pluck, 200);
            return created;
        }}

        btn.addEventListener('click', function() {{
            if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
            if (playing) {{
                playing = false;
                nodes.forEach(n => {{ try {{ n.stop && n.stop(); }} catch(e) {{}} }});
                nodes = [];
                audioCtx.suspend();
                btn.textContent = '🔊 Escuchar ambiente';
            }} else {{
                playing = true;
                audioCtx.resume();
                if ('{sound_tipo}' === 'rain') nodes = startRain(audioCtx);
                else if ('{sound_tipo}' === 'wind') nodes = startWind(audioCtx);
                else if ('{sound_tipo}' === 'storm') nodes = startStorm(audioCtx);
                else nodes = startChime(audioCtx);
                btn.textContent = '🔇 Silenciar';
            }}
        }});
    }})();
    </script>
    """


# ---------------------------------------------------------
# 7. Generar la tarjeta HTML (actual + pronóstico + fondo + sonido)
# ---------------------------------------------------------
def generar_tarjeta_html(datos_json):
    if datos_json is None:
        return "<div style='text-align:center; padding:40px; color:#888;'>👆 Preguntame algo para ver la magia ✨</div>"

    data = json.loads(datos_json)

    if "error" in data:
        return f"""
        <div style='background:linear-gradient(135deg,#eb3349,#f45c43); border-radius:20px; padding:30px; text-align:center; color:white; font-family:sans-serif;'>
            <div style='font-size:60px;'>🤷‍♂️</div>
            <h2>{data['error']}</h2>
        </div>
        """

    style = get_style(data.get("weather_code", 0))
    unidad = "°C" if data["unit"] == "celsius" else "°F"
    dato_curioso = random.choice(DATOS_CURIOSOS)
    card_id = str(random.randint(100000, 999999))
    fondo_html = generar_fondo(style["bg"])
    audio_script = generar_audio_script(style["sound"], card_id)

    confetti_script = """
    <script src="https://cdn.jsdelivr.net/npm/canvas-confetti@1.6.0/dist/confetti.browser.min.js"></script>
    <script>if (window.confetti) { confetti({particleCount: 150, spread: 90, origin: {y: 0.4}}); }</script>
    """ if style["bg"] == "sun" else ""

    forecast_html = ""
    for dia in data.get("forecast", []):
        f_style = get_style(dia.get("weather_code", 0))
        fecha = dia.get("fecha", "")
        tmax = dia.get("temp_max")
        tmin = dia.get("temp_min")
        pprob = dia.get("prob_lluvia")
        forecast_html += f"""
        <div class="forecast-day">
            <div class="forecast-fecha">{fecha[5:] if fecha else ''}</div>
            <div class="forecast-emoji">{f_style['emoji']}</div>
            <div class="forecast-temps"><b>{tmax}°</b> / {tmin}°</div>
            <div class="forecast-lluvia">💧{pprob if pprob is not None else '–'}%</div>
        </div>
        """

    html = f"""
    <style>
        @keyframes sun-spin {{ from {{transform: rotate(0deg);}} to {{transform: rotate(360deg);}} }}
        @keyframes float {{ 0%,100% {{transform: translateY(0);}} 50% {{transform: translateY(-15px);}} }}
        @keyframes rain-shake {{ 0%,100% {{transform: translateX(0) rotate(-3deg);}} 50% {{transform: translateX(5px) rotate(3deg);}} }}
        @keyframes shake {{ 0%,100% {{transform: translate(0,0);}} 25% {{transform: translate(-4px,2px);}} 75% {{transform: translate(4px,-2px);}} }}
        @keyframes fade-pulse {{ 0%,100% {{opacity:0.6;}} 50% {{opacity:1;}} }}
        @keyframes fall {{ from {{transform: translateY(-10%);}} to {{transform: translateY(110%);}} }}
        @keyframes drift {{ from {{transform: translateX(-15%) rotate(0deg);}} to {{transform: translateX(115%) rotate(15deg);}} }}
        @keyframes cloud-drift {{ from {{left:-15%;}} to {{left:110%;}} }}
        @keyframes fog-drift {{ 0% {{transform: translateX(-10%); opacity:0.3;}} 50% {{opacity:0.6;}} 100% {{transform: translateX(10%); opacity:0.3;}} }}
        @keyframes ray-spin {{ from {{transform: rotate(0deg);}} to {{transform: rotate(360deg);}} }}
        @keyframes flash {{ 0%,92%,100% {{opacity:0;}} 93%,95% {{opacity:0.85;}} 94% {{opacity:0.2;}} }}

        .clima-wrapper {{ position:relative; border-radius:24px; overflow:hidden; box-shadow:0 10px 30px rgba(0,0,0,0.3); }}
        .bg-layer {{ position:absolute; inset:0; overflow:hidden; pointer-events:none; z-index:1; }}
        .drop {{ position:absolute; top:-10%; width:2px; height:16px; background:rgba(255,255,255,0.55);
                 animation-name: fall; animation-timing-function: linear; animation-iteration-count: infinite; }}
        .drop-storm {{ height:22px; background:rgba(255,255,255,0.75); }}
        .flake {{ position:absolute; top:-10%; color:rgba(255,255,255,0.85);
                  animation-name: fall, drift; animation-timing-function: linear; animation-iteration-count: infinite; }}
        .cloud-shape {{ position:absolute; left:-15%; font-size:40px; opacity:0.55;
                        animation-name: cloud-drift; animation-timing-function: linear; animation-iteration-count: infinite; }}
        .fog-band {{ position:absolute; left:0; width:140%; height:16%; background:rgba(255,255,255,0.18);
                     filter: blur(6px); animation: fog-drift 6s ease-in-out infinite; }}
        .sun-rays {{ position:absolute; top:50%; left:50%; width:0; height:0; animation: ray-spin 20s linear infinite; }}
        .ray {{ position:absolute; top:-140px; left:-2px; width:4px; height:140px;
                background:linear-gradient(to top, rgba(255,255,255,0.5), transparent); transform-origin: bottom center; }}
        .lightning-flash {{ position:absolute; inset:0; background:white; opacity:0; z-index:2;
                             animation: flash 6s infinite; }}

        .clima-emoji {{ font-size: 90px; animation: {style['anim']} 3s ease-in-out infinite; display:inline-block; }}
        .clima-card {{ position:relative; z-index:3; background:{style['grad']}; padding:35px 25px 25px; text-align:center;
                        color:white; font-family:'Trebuchet MS',sans-serif; }}
        .stat-box {{ display:inline-block; background:rgba(255,255,255,0.2); border-radius:14px; padding:12px 18px;
                      margin:6px; backdrop-filter:blur(5px); }}
        .dato-curioso {{ margin-top:20px; background:rgba(0,0,0,0.25); border-radius:14px; padding:14px; font-size:14px; }}
        .sound-btn {{ margin-top:18px; border:none; border-radius:20px; padding:10px 20px; font-size:14px;
                       background:rgba(255,255,255,0.25); color:white; cursor:pointer; backdrop-filter:blur(5px);
                       transition: background 0.2s; }}
        .sound-btn:hover {{ background:rgba(255,255,255,0.4); }}
        .forecast-strip {{ position:relative; z-index:3; display:flex; justify-content:space-between; gap:8px;
                            background:rgba(0,0,0,0.2); padding:16px 12px; }}
        .forecast-day {{ flex:1; text-align:center; color:white; font-family:'Trebuchet MS',sans-serif; font-size:13px; }}
        .forecast-emoji {{ font-size:26px; margin:4px 0; }}
        .forecast-fecha {{ opacity:0.8; text-transform:uppercase; font-size:11px; }}
        .forecast-lluvia {{ opacity:0.85; font-size:11px; margin-top:2px; }}
    </style>
    <div class="clima-wrapper">
        {fondo_html}
        <div class="clima-card">
            <div class="clima-emoji">{style['emoji']}</div>
            <h1 style="margin:5px 0;">{data['location']}</h1>
            <h3 style="margin:0; opacity:0.9;">{style['nombre']}</h3>
            <div style="margin-top:20px;">
                <div class="stat-box">🌡️ <b>{data['temperature']}{unidad}</b></div>
                <div class="stat-box">💧 <b>{data['humidity']}%</b></div>
                <div class="stat-box">💨 <b>{data['wind_speed']} km/h</b></div>
            </div>
            <div class="dato-curioso">💡 <i>{dato_curioso}</i></div>
            <button id="sound-btn-{card_id}" class="sound-btn">🔊 Escuchar ambiente</button>
        </div>
        <div class="forecast-strip">
            {forecast_html}
        </div>
    </div>
    {confetti_script}
    {audio_script}
    """
    return html


# ---------------------------------------------------------
# 8. Función principal para Gradio (formato de mensajes moderno)
# ---------------------------------------------------------
def responder(pregunta, historial):
    if not pregunta or not pregunta.strip():
        return historial, gr.update(), ""

    texto, datos_json = preguntar(pregunta)
    tarjeta = generar_tarjeta_html(datos_json)
    historial = historial + [
        {"role": "user", "content": pregunta},
        {"role": "assistant", "content": texto},
    ]
    return historial, tarjeta, ""


# ---------------------------------------------------------
# 9. Interfaz Gradio
# ---------------------------------------------------------
with gr.Blocks(title="🌈 ClimaBot") as demo:
    gr.Markdown("# 🌈 ClimaBot — tu asistente del clima con onda")
    gr.Markdown(
        "Preguntame el clima de cualquier ciudad del mundo y te muestro una tarjeta animada con pronóstico "
        "extendido y sonido ambiente 🎧✨"
    )

    with gr.Row():
        with gr.Column(scale=1):
            tarjeta_html = gr.HTML(generar_tarjeta_html(None))
        with gr.Column(scale=1):
            chat = gr.Chatbot(label="Charla con ClimaBot", height=350)
            entrada = gr.Textbox(placeholder="Ej: ¿Qué clima hace en Rosario?", label="Tu pregunta")
            boton = gr.Button("🚀 Preguntar", variant="primary")

    boton.click(responder, inputs=[entrada, chat], outputs=[chat, tarjeta_html, entrada])
    entrada.submit(responder, inputs=[entrada, chat], outputs=[chat, tarjeta_html, entrada])

if __name__ == "__main__":
    # share=True genera un link público temporal de Gradio (dura ~72hs).
    # Cualquiera con el link puede usar la app y consumir tu cuota de API,
    # así que no lo repartas en lugares públicos si no querés eso.
    demo.launch(
        theme=gr.themes.Soft(primary_hue="orange", secondary_hue="blue"),
        share=True,
        debug=True,
    )
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


