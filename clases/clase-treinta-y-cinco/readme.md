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
