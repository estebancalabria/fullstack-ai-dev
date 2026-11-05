# Clase 25 - 4 de Noviembre del 2026

# Repaso

* API Key
    * Uso de API Key con Modelos Locales
        * LMStudion
        * Ollama
    * Uso de Chat Completion
      * Ejercicio de Historia tipo "Elige tu propia aventura"
    * Utilizar JSON como formato de respuesta
      * Util para procesarla en nuestro sistema
* Glosario
  * Slop : contenido de baja calidad generado por IA

# Novedades y Miscelaneas

* Entrevistas de trabajo en la era de la IA
  * Todo esta cambiando
    * https://www.youtube.com/watch?v=Cy_Sh7vy-Sw
    * https://www.youtube.com/watch?v=Iiegb31Vpu0

# Colab de la clase

* https://colab.research.google.com/drive/1at7r0A9ogx6p-bQpgBYw1a3N-atKRYHO?usp=sharing

# La GUI para la IA

* Objetivo
    * Darle una interfaz grafica de forma sencilla al ejemplo de la clase pasada
 
* Recuerdan HF
  * Me permitia probar modelos OS online sin programar en los Spaces
  * El 90% de los spaces abajo dice "Construido con Gradio"
    * https://gradio.app/

* Hola mundo en Gradio

```
import gradio as gr

def saludar():
    return "¡Hola, mundo!"

demo = gr.Interface(
    fn=saludar,
    inputs=None,
    outputs="text",
    title="Mi primera app en Gradio"
)

demo.launch()
```

* Saludo en gradio

```
import gradio as gr

def saludar(nombre):
    return f"¡Hola, {nombre}! Bienvenido."

demo = gr.Interface(
    fn=saludar,
    inputs=gr.Textbox(label="Tu nombre", placeholder="Escribí tu nombre"),
    outputs=gr.Textbox(label="Saludo"),
    title="Mi primera app en Gradio",
    submit_btn="Saludar"
)

demo.launch()
```

* Sumar dos numeros en gradio
```
def sumar(a, b):
  return a + b

demo = gr.Interface(
  fn=sumar,
  inputs=[gr.Number(label="Número 1"), gr.Number(label="Número 2")],
  outputs=gr.Number(label="Resultado"))

demo.launch()
```

* Gradio
  * Clases principales
    * gr.Interface
    * gr.ChatInterface
  * Hay una funcion que es el nucleo de nuestra aplicacion
    * La cantidad de parametros de esa funcion depende de la cantidad de inputs
    * la especificamos en el parametro fn
  * Inputs y outputs
  * Exiten componentes de Inerfaz
    * gr.Textbox
    * gr.Number
    * gr.DropDown
    * gr.Image
    * gr.Audio
    * gr.ChatBot (no me acuerdo si se sigue usando)
  * Por defecto tiene un boton para invocar la funcion
 
* Saludo con un Drop Down

```
import gradio as gr

# Funcion que devuelve el saludo segun el pais
def saludar(pais):

    saludos = {
        "Argentina": "¡Hola!",
        "Inglaterra": "Hello!",
        "Francia": "Bonjour!",
        "Alemania": "Hallo!",
        "Italia": "Ciao!"
    }

    return saludos[pais]


# Crear la interfaz
interfaz = gr.Interface(
    fn=saludar,
    inputs=gr.Dropdown(
        choices=["Argentina", "Inglaterra", "Francia", "Alemania", "Italia"],
        label="Selecciona un país"
    ),
    outputs=gr.Textbox(label="Saludo"),
    title="Saludador de países",
    description="Selecciona un país y recibe un saludo en su idioma."
)

# Ejecutar la aplicación
interfaz.launch()
```

* UN chatbot donde lo que escribis lo responde el que habla. Hace un echo

```
import gradio as gr

def responder_eco(mensaje, historial):
  return f"{mensaje}"

demo = gr.ChatInterface(
    fn=responder_eco,
    title="💬 Chatbot Eco",
    description="Escribe cualquier cosa y el chatbot te devolverá exactamente lo mismo.",
    textbox=gr.Textbox(
        placeholder="Escribe tu mensaje aquí...", container=False, scale=7
    )
)
demo.launch()
```

---
# BREAK
Hasta y 30
---

* Version minimalista del ChatBot

```
import gradio as gr

def responder(mensaje, historial):
    return "Recibí tu mensaje: " + mensaje

gr.ChatInterface(fn=responder).launch()
```

* Version con Blocks (Combinar varios elementos)

```
import gradio as gr

def responder(mensaje, historial, api_key):
    return f"Tu mensaje es: {mensaje}. API Key recibida."

with gr.Blocks() as app:

    api_key = gr.Textbox(
        label="API Key",
        type="password"
    )

    gr.ChatInterface(
        fn=responder,
        additional_inputs=[api_key]
    )

app.launch()
```

# Integrando Gradio con la Interfaz de Groq

* Vamos a hacer un chatbot bromista. Que no consteste en serio. Todo se lo tome a la broma.

* System Prompt
```
Sos un chatbot bromista, sarcástico e irreverente. Tu personalidad es la de un comediante que no puede tomarse nada en serio.

**Reglas:**
- Respondé siempre con humor, ironía, sarcasmo o comentarios absurdos.
- Nunca des respuestas convencionales o excesivamente serias.
- Convertí cualquier pregunta en una oportunidad para hacer un chiste.
- Sé ingenioso y espontáneo. No repitas siempre los mismos chistes.
- Usá respuestas cortas y contundentes.
- Si el usuario te pide que hables en serio, ¡ni se te ocurra! Redoblá la apuesta.
- No expliques tus chistes.
- No seas ofensivo ni discriminatorio.

**Excepción:** ante emergencias, peligros reales o situaciones delicadas, dejá el humor de lado y respondé responsablemente.

Tu lema: ¡La vida es demasiado corta para responder seriamente!
```

> [!NOTE]
> Ejercicio : A partir del ejemplo de chartbot con la api key y el colab de clase pasada (https://colab.research.google.com/drive/19oUXkYhmpVaNA7PSNSpjGWMv1W_3uXvH?usp=sharing) Crear el chatbot con Gradio

```
import gradio as gr
from openai import OpenAI

SYSTEM_PROMPT = """
Sos un chatbot bromista, sarcástico e irreverente. Tu personalidad es la de un comediante que no puede tomarse nada en serio.

**Reglas:**
- Respondé siempre con humor, ironía, sarcasmo o comentarios absurdos.
- Nunca des respuestas convencionales o excesivamente serias.
- Convertí cualquier pregunta en una oportunidad para hacer un chiste.
- Sé ingenioso y espontáneo. No repitas siempre los mismos chistes.
- Usá respuestas cortas y contundentes.
- Si el usuario te pide que hables en serio, ¡ni se te ocurra! Redoblá la apuesta.
- No expliques tus chistes.
- No seas ofensivo ni discriminatorio.

**Excepción:** ante emergencias, peligros reales o situaciones delicadas, dejá el humor de lado y respondé responsablemente.

Tu lema: ¡La vida es demasiado corta para responder seriamente!
"""

def responder(mensaje, historial, api_key):
   try:
      client = OpenAI(
        api_key=api_key,
        base_url="https://api.groq.com/openai/v1",
      )
      
      mensajes = []

      mensajes.append({"role": "system", "content": SYSTEM_PROMPT})
      
      for msg in historial:
          mensajes.append({
              "role": msg["role"],
              "content": msg["content"]
          })
                
      mensajes.append({"role": "user", "content": mensaje})
    
   
      respuesta = client.chat.completions.create(model="openai/gpt-oss-20b", messages=mensajes, temperature=0.7)
      return respuesta.choices[0].message.content
   
   except Exception as e:
     return f"Ocurrió un error al conectar con la API de Grok: {str(e)}"

with gr.Blocks() as app:

    api_key = gr.Textbox(
        label="API Key",
        type="password"
    )

    gr.ChatInterface(
        fn=responder,
        additional_inputs=[api_key]
    )

app.launch()
```
