# Clase 23 - 28 de Octubre del 2026

# Repaso

* Aplicacion Full Stack
  * Cliente
    * Applicacion Web
  * Server
    * Presentacion / Controladores / API
    * Servicio
    * Modelo
    * Persistencia
      * Conectamos con una Base de datos de SQLITE
      * Memoria -> Base de Datos
* Aidev
  * Lo que nos devuelve la ia -> Refactorizar
  * Sacado valores hardcodeados
  * Pedirle la IA que mire el codigo y sugerir mejoras
    * Si me parece tomo la mejora
    * No estoy obligado a tomar la mejora si no me gusta
  * La IA siempre nos va a estar enseniando cosas nuevas del codigo
* Python
  * Base de datos
    * Uso de parametros ? para evitar inyeccion de SQL

---

# Novedades

* Alternativa a la extension ThuderClient y al famoso Postman
  * https://www.usebruno.com/

# Python

# IA a full -> Uso de la API

* Que signigica usar la API de un modelo de IA
  * Tradicionalmente usamos los LLM usando la interfaz web , el chat
  * Mediante la api podemos consumir modelos de IA desde python!

> [!NOTE]
> Para usar ChatGPT mediante API es pago :(

* Los modelos de IA tienen dos paginas
  * La del Usuario Final (chat)
  * La web para el desarrollador
    * Aqui se puede encontrar
        * Documentacion de como usar los modelos desde la programacion
        * Datos de facturacion (usar los modelos por API generalmente se cobra)
        * Playground para probar modelos y hacer pruebas
        * Podemos obtener una API KEY, que es una clave alfanumerica para usar los modelos
  * OpenAI (Modelos Propietarios)
    * Chat : https://chatgpt.com/
    * Dev : https://platform.openai.com/
        * DOCS : https://developers.openai.com/api/docs
        * API KEY : https://platform.openai.com/api-keys
        * Billing : https://platform.openai.com/settings/organization/billing/overview
  * Google (Modelos Propietarios)
    * Chat : https://gemini.google.com/
    * Dev : https://ai.google.dev/
      * DOCS : https://ai.google.dev/docs
      * API KEY : https://aistudio.google.com/app/apikey
  * Groq (Modelos Open Source)
    * Chat : https://chat.groq.com/
    * Dev : https://console.groq.com/
      * API : https://console.groq.com/keys
      * DOCS : https://console.groq.com/docs/overview
      * BILLING : https://console.groq.com/settings/billing/plans

> [!NOTE]
> Groq (con q) se caracteriza por tener una arquitectura de servidores llamada LPU que responde rapidisimo


## Google Colab de la clase  

> https://colab.research.google.com/drive/1Uc8tNWo6Yo3WWhQA6OwlYi67pECiWPzF?usp=sharing

## Nuestro hola mundo en API con Groq

* Vamos a sacar una api key en groq
  * Vaoms a https://console.groq.com/keys
  * Sacamos una API Key
  * La guardamos en un lugar seguro (como un notepad)
  * Me la va a mostrar solamente la primera vez

* Vamos a ver el ejemplo de codigo para llamar a la api
   * https://console.groq.com/docs/overview

```
from openai import OpenAI
import os

client = OpenAI(
    api_key=os.environ.get("GROQ_API_KEY"),
    base_url="https://api.groq.com/openai/v1",
)

response = client.responses.create(
    input="Explain the importance of fast language models",
    model="openai/gpt-oss-20b",
)
print(response.output_text)

```

> [!NOTE]
> Este ejemplo usa la api de responses (da una respuesta) no mantiene una conversacion
> https://developers.openai.com/api/docs/guides/migrate-to-responses
> La api de responses es mas nueva y mas sencilla

* Vamos a modificar el codigo en el Colab

```

from openai import OpenAI
import os

api_key = input("Ingrese su API Key")
prompt = input("Ingrese su prompt")


client = OpenAI(
    api_key=api_key,
    base_url="https://api.groq.com/openai/v1",
)

response = client.responses.create(
    input=prompt,
    model="openai/gpt-oss-20b",
)

print("--------------------------------")
print(response.output_text)
```

---

# Tabmien lo podemos probar desde thunder Client


# Tarea

* Explorar los docs de Openai para dev (https://developers.openai.com/api/docs)

<img width="404" height="225" alt="image" src="https://github.com/user-attachments/assets/e28676b5-5c16-4a0d-9707-1e260b7991b9" />

<img width="400" height="300" alt="image" src="https://github.com/user-attachments/assets/8738fef7-f613-4c19-bd33-1f66acc5d300" />

<img width="392" height="304" alt="image" src="https://github.com/user-attachments/assets/5c3ef213-587e-46af-899e-03a7cd4ee41d" />

Me dio esta respuesta :

```json
{
  "id": "resp_01m62cap1deyxa3bvwz2pv5nsd",
  "object": "response",
  "status": "completed",
  "created_at": 1793228888,
  "output": [
    {
      "type": "reasoning",
      "id": "resp_01m62cap1deyxs84q79jdbh25p",
      "status": "completed",
      "content": [
        {
          "type": "reasoning_text",
          "text": "The user asks: \"La capital de Argentina es...\" They probably want to know: \"La capital de Argentina es Buenos Aires\". So we respond accordingly. This is a straightforward answer. Also, the user might want to know the capital of Argentina. We say it's Buenos Aires. Also we might confirm it's Buenos Aires. It's a short answer. No other instruction. We'll comply."
        }
      ],
      "summary": []
    },
    {
      "type": "message",
      "id": "msg_01m62cap1deyybxh139f45534z",
      "status": "completed",
      "role": "assistant",
      "content": [
        {
          "type": "output_text",
          "text": "La capital de Argentina es **Buenos Aires**.",
          "annotations": [],
          "logprobs": null
        }
      ]
    }
```



---
# Break
Hasta y 30
---

# Chat Completion

* Recien utilizamos la api mas nueva que es la de responses
* Tradicionalmente se utilizaba una api que mantenia todo el contexto de la conversacion qeu se llama chatcompletion
  * https://developers.openai.com/api/reference/resources/chat

```
from openai import OpenAI

api_key = input("Ingrese su API Key: ")
prompt = input("Ingrese su prompt: ")

client = OpenAI(
    api_key=api_key,
    base_url="https://api.groq.com/openai/v1",
)

response = client.chat.completions.create(
    model="openai/gpt-oss-20b",
    messages=[
        {"role": "user", "content": prompt}
    ],
)

print("--------------------------------")
print(response.choices[0].message.content)
```

* Otro ejemplo con un system prompt y una conversacion

```
from openai import OpenAI

api_key = input("Ingrese su API Key: ")

client = OpenAI(
    api_key=api_key,
    base_url="https://api.groq.com/openai/v1",
)

messages = [
    {
        "role": "system",
        "content": "Sos un profesor de Python. Respondé de forma clara y con ejemplos sencillos."
    },
    {
        "role": "user",
        "content": "¿Qué es una variable en Python?"
    },
    {
        "role": "assistant",
        "content": "Una variable es un nombre que permite almacenar un valor. Por ejemplo: edad = 25."
    },
    {
        "role": "user",
        "content": "¿Y cómo puedo mostrar su valor en pantalla?"
    }
]

response = client.chat.completions.create(
    model="openai/gpt-oss-20b",
    messages=messages,
)

print("--------------------------------")
print(response.choices[0].message.content)
```

* En los mensajes hay 3 posibilidades
  * "role": "system",
    * El system prompt que controla como responde la IA
  * "role": "user",
    * Lo que ingresa el usuario, el prompt del usuario
  * "role": "assistant",
    * Lo que responde la IA

> El system prompt es donde se pueden poner reglas generales para que el modelo de IA no se ponga a responder cosas diferentes para lo que está diseñado

---

# Ejemplo usando la API de Gemini

## Response Completion

* Creo la api key aca:
  * https://aistudio.google.com/app/api-keys
 
* Miro la documentacion aca
  * https://ai.google.dev/gemini-api/docs?hl=es-419#python

* Adapto el codigo y queda asi:
* 
```python
from google import genai

api_key = input("Ingrese su API Key: ")
prompt = input("Ingrese su prompt: ")

client = genai.Client(api_key=api_key)

interaction = client.interactions.create(
    model="gemini-3.5-flash-lite",
    input=prompt
)

print(interaction.output_text)
```

## Chat Completion

```
from google import genai

api_key = input("Ingrese su API Key: ")

# Inicializamos el cliente
client = genai.Client(api_key=api_key)

# Creamos una sesión de chat indicando el modelo
# (Nota: usamos un modelo actual soportado, como gemini-2.5-flash)
chat = client.chats.create(model="gemini-2.5-flash")

print("\n¡Chat iniciado! Escribe 'salir' para terminar.\n")

while True:
    prompt = input("Tú: ")
    if prompt.lower() in ["salir", "exit", "quit"]:
        break

    # Enviamos el mensaje al chat; este método ya almacena el contexto y la respuesta
    response = chat.send_message(prompt)

    print(f"Gemini: {response.text}\n")
```

---

# Sobre los LPU de Groq

```
Los LPU de groq son alternativa a la GPU?
Sí, los LPU (Language Processing Units) de Groq son considerados una alternativa directa a las GPUs (y también a las TPUs de Google) específicamente para la inferencia de modelos de lenguaje grandes (LLMs). Sin embargo, no son una sustitución universal para todas las funciones de una GPU.

Aquí te explico las diferencias clave y por qué se posicionan como alternativa:

1. Enfoque Diferente
GPUs (NVIDIA, AMD): Son procesadores generalistas. Están diseñados para manejar una amplia variedad de tareas paralelas (renderizado de video, entrenamiento de modelos, inferencia, simulaciones físicas, etc.). Su arquitectura está optimizada para flexibilidad y volumen de datos masivo.
LPUs (Groq): Son procesadores especialistas. Están diseñados exclusivamente para la inferencia de LLMs. Su arquitectura está optimizada para una sola cosa: procesar lenguaje de forma ultra-rápida y predecible.
2. Arquitectura y Rendimiento
Groq LPU: Utiliza una arquitectura determinista (no estocástica). Esto significa que cada operación sabe exactamente cuándo y dónde ocurrirá, eliminando la necesidad de gestión compleja de memoria y sincronización que las GPUs requieren. Esto permite:
Latencias extremadamente bajas: Groq puede generar tokens a velocidades de cientos o incluso miles de tokens por segundo, mucho más rápido que las GPUs actuales en tareas de inferencia pura.
Eficiencia energética superior: Al no tener que gestionar la memoria de forma dinámica, consume menos energía por token generado.
GPUs: Tienen una arquitectura estocástica con gestión dinámica de memoria. Son excelentes para el entrenamiento de modelos (donde la flexibilidad es clave) y para la inferencia cuando se necesitan grandes lotes (batches) o se procesan múltiples tareas a la vez.
3. ¿Cuándo usar LPU vs. GPU?
Escenario	Mejor opción	Razón
Inferencia de LLMs con baja latencia (chatbots, asistentes en tiempo real)	Groq LPU	Velocidad de generación de tokens muy superior y latencia mínima.
Entrenamiento de modelos desde cero	GPU (NVIDIA)	Las GPUs son más flexibles y maduras para el entrenamiento pesado. Groq aún no se enfoca en entrenamiento.
Procesamiento de imágenes/video	GPU	Las LPUs no están diseñadas para visión artificial o renderizado.
Inferencia con grandes lotes (batches)	GPU	Las GPUs pueden manejar múltiples solicitudes simultáneas de forma más eficiente en ciertos casos, aunque Groq compite fuerte aquí también.
4. Limitaciones de las LPU
Especialización: Solo son útiles para inferencia de modelos de lenguaje (y posiblemente otros modelos secuenciales). No sirven para juegos, CAD, simulaciones o entrenamiento.
Ecosistema: El ecosistema de software (librerías, herramientas) es mucho más joven que el de CUDA (NVIDIA).
Disponibilidad: Groq opera principalmente como un servicio en la nube (GroqCloud), mientras que las GPUs están disponibles en hardware local, servidores y nubes de múltiples proveedores.
Conclusión
Los LPU de Groq son una alternativa válida y superior en rendimiento específico para la inferencia de LLMs, especialmente cuando se prioriza la velocidad de respuesta (latencia) y el costo por token. Sin embargo, no reemplazan a las GPUs en general, ya que las GPUs siguen siendo necesarias para el entrenamiento de modelos, tareas de visión artificial, y cualquier aplicación que requiera flexibilidad computacional.

En resumen:

Si tu única tarea es hacer que un LLM responda lo más rápido posible, Groq LPU es una alternativa excelente a la GPU. Si necesitas entrenar modelos o hacer otras cosas, necesitas una GPU.




Se venden los lpu en mercadolibre? Los fabrica la gente de groq?
No, los LPU de Groq no se venden en MercadoLibre ni en ninguna tienda minorista convencional.

Aquí te explico por qué:

1. ¿Los fabrica Groq?
Sí, Groq diseña y fabrica sus propios chips LPU.
A diferencia de muchas empresas que usan chips de terceros (como Intel o AMD), Groq desarrolló su propia arquitectura de silicio desde cero. Fabrican los chips en colaboración con foundries (fábricas de semiconductores) como TSMC, pero el diseño y la propiedad intelectual son 100% de Groq.

2. ¿Por qué no se venden al público?
Los LPU de Groq no son productos de consumo. No son tarjetas de video que puedas comprar para tu PC. Son hardware especializado de centro de datos. Las razones principales son:

Arquitectura especializada: Están diseñados exclusivamente para inferencia de LLMs. No sirven para juegos, edición de video ni tareas generales.
Integración en la nube: Groq opera principalmente como un proveedor de servicios en la nube (GroqCloud). Tú no compras el chip; alquilas el poder de cómputo de sus servidores que ya tienen miles de LPUs instaladas.
Costo y escala: El hardware es extremadamente caro y requiere infraestructura de data center (refrigeración, energía, red) que no es viable para un usuario final o incluso para la mayoría de las empresas pequeñas.
Estrategia de negocio: Groq gana dinero vendiendo tokens generados (o tiempo de cómputo), no vendiendo hardware. Es un modelo similar a AWS o Azure, pero enfocado en IA de lenguaje.
3. ¿Cómo puedes acceder a los LPU de Groq?
No los compras, los alquilas a través de su plataforma en la nube:

Te registras en GroqCloud (o mediante APIs).
Pagas por el uso (por token generado o por hora de cómputo).
Groq se encarga de mantener el hardware, la refrigeración y la red.
4. ¿Qué se vende en MercadoLibre?
En MercadoLibre (y otras tiendas) puedes encontrar:

GPUs de NVIDIA (RTX 3090, RTX 4090, etc.) para gaming o desarrollo local.
TPUs de Google (no se venden al público, solo vía Google Cloud).
Hardware de servidores genérico, pero nunca chips especializados de IA como los LPU de Groq.
Conclusión
¿Los fabrica Groq? Sí.
¿Se venden en MercadoLibre? No.
¿Cómo se usan? Solo a través de la nube de Groq (GroqCloud) o mediante acuerdos corporativos directos con la empresa.
Si necesitas rendimiento extremo para inferencia de LLMs, la opción actual es usar la API de Groq, no comprar hardware.
```
