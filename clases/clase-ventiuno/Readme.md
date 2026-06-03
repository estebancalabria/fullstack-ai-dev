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

### Response Completion

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

> [!NOTE] Esta forma sirve cuando necesitamos una sola respuesta

### Chat Completion con System Prompt

* Este modo de usar un llm me permite
  * Mantener el contexto de la conversacion
  * Agregarle al principio de todo un system prompt que controla el comportamiento del LLM

```python
from openai import OpenAI
import os

api_key = input("Ingrese su Api Key: ")
prompt = input("Ingrese su sobre que quiere una pregunta : ")

client = OpenAI(
    api_key=api_key,
    base_url="https://api.groq.com/openai/v1",
)

response = client.chat.completions.create(
    model="openai/gpt-oss-20b",
    messages=[
        {"role" : "system", "content" : 
          """
          Eres un generador de preguntas de una aplicacion. 
          Cada vez que te dicen algo generas una pregunta mutiple choice sobre eso
          Cada pregunta tiene 4 opciones cortas
          La pregunta es corta
          Quiero que devuelvas un json de la forma 
          { "pregunta" : "..", respuestas : [ { texto : "..." , correcta : "..." }, ... ]}
          Devolver el json y nada mas. Sin citas, sin markdown, solo el  json
          """
         },
        {"role": "user", "content": prompt}
    ],
)

print(response.choices[0].message.content)
```

### Chat Completion con Conversacion

* Cuando generamos una conversacion podemos tener 3 roles
  * system : Donde se carga el system prompt
  * user : Donde cargamos el prompt del usuario
  * assistant : Donde cargamos la respuesta del modelo de lenguane
 
```
from openai import OpenAI
import os

system_prompt = """
Eres un amigo simpatico y gracioso que le gusta tener conversaciones
"""

messages=[
    {"role" : "system", "content" : system_prompt }
]


api_key = input("Ingrese su Api Key: ")

client = OpenAI(
    api_key=api_key,
    base_url="https://api.groq.com/openai/v1",
)

prompt = input("Usuario : ")

while prompt != "":

  messages.append({"role": "user", "content": prompt})

  response = client.chat.completions.create(
      model="openai/gpt-oss-20b",
      messages=messages
  )

  print("Sistema : " + response.choices[0].message.content)

  messages.append({"role": "assistant", "content": response.choices[0].message.content})

  prompt = input("Usuario : ")
```

### Chat Completion con Conversacion e Interfaz de Gradio

```python
from openai import OpenAI
import gradio as gr

system_prompt = """
Eres un amigo simpatico y gracioso que le gusta tener conversaciones
"""

def chat(api_key, user_message, history):

    if history is None:
        history = []

    client = OpenAI(
        api_key=api_key,
        base_url="https://api.groq.com/openai/v1",
    )

    # reconstruir mensajes para el modelo
    messages = [{"role": "system", "content": system_prompt}]

    for user, assistant in history:
        messages.append({"role": "user", "content": user})
        messages.append({"role": "assistant", "content": assistant})

    messages.append({"role": "user", "content": user_message})

    response = client.chat.completions.create(
        model="openai/gpt-oss-20b",
        messages=messages
    )

    assistant_message = response.choices[0].message.content

    # 👇 formato correcto para Gradio Chatbot (tupla)
    history.append((user_message, assistant_message))

    return "", history, history


with gr.Blocks() as demo:
    gr.Markdown("# Chat con Groq + Gradio 🤖")

    api_key = gr.Textbox(label="API Key", type="password")

    chatbot = gr.Chatbot()
    state = gr.State([])

    user_input = gr.Textbox(label="Usuario")

    send_btn = gr.Button("Enviar")

    send_btn.click(
        chat,
        inputs=[api_key, user_input, state],
        outputs=[user_input, chatbot, state]
    )

demo.launch()
```

* Codigo del de Julian

```python
import gradio as gr
from openai import OpenAI
import random

# ─── System prompt ───
SYSTEM_PROMPT = """
Eres un amigo simpático y gracioso que le gusta tener conversaciones.
Usás humor, emojis ocasionales, y tenés una personalidad cálida.
Tus respuestas son naturales, como si hablaras con un amigo de toda la vida.
Podés hacer chistes, usar expresiones coloquiales y ser divertido.
Mantené las respuestas relativamente cortas y conversacionales (2-4 oraciones máximo a menos que te pidan algo largo).
"""

# ─── Expresiones del personaje ───
MOODS = {
    "idle":      {"eyes": "◕ ◕", "mouth": "‿", "color": "#7c6ff7", "glow": "#a78bfa", "status": "Esperando..."},
    "thinking":  {"eyes": "◑ ◑", "mouth": "~", "color": "#f59e0b", "glow": "#fbbf24", "status": "Pensando..."},
    "happy":     {"eyes": "◕ ◕", "mouth": "▽", "color": "#10b981", "glow": "#34d399", "status": "¡Contento!"},
    "laughing":  {"eyes": "≧ ≦", "mouth": "▽", "color": "#f472b6", "glow": "#f9a8d4", "status": "Jajajaja"},
    "surprised": {"eyes": "◉ ◉", "mouth": "○", "color": "#06b6d4", "glow": "#22d3ee", "status": "¡Wow!"},
    "love":      {"eyes": "♥ ♥", "mouth": "‿", "color": "#f43f5e", "glow": "#fb7185", "status": "Awww"},
}


def detect_mood(text):
    text_lower = text.lower()
    if any(w in text_lower for w in ["jaja", "jeje", "😂", "🤣", "gracioso", "risa", "lol", "xd"]):
        return "laughing"
    if any(w in text_lower for w in ["wow", "increíble", "no puedo creer", "!!!", "asombroso", "😱"]):
        return "surprised"
    if any(w in text_lower for w in ["amor", "❤", "🥰", "te quiero", "gracias", "genial", "hermoso", "linda"]):
        return "love"
    if any(w in text_lower for w in ["bien", "bueno", "sí", "dale", "perfecto", "🙂", "😊"]):
        return "happy"
    return "happy"


def build_character_svg(mood_key="idle", is_talking=False):
    mood = MOODS[mood_key]
    color, glow, eyes, mouth, status = mood["color"], mood["glow"], mood["eyes"], mood["mouth"], mood["status"]

    if is_talking:
        bounce = '<animateTransform attributeName="transform" type="translate" values="0,0; 0,-8; 0,0; 0,-4; 0,0" dur="0.6s" repeatCount="indefinite" />'
    elif mood_key == "laughing":
        bounce = '<animateTransform attributeName="transform" type="translate" values="0,0; -3,-5; 3,-3; -2,-6; 0,0" dur="0.4s" repeatCount="indefinite" />'
    elif mood_key == "idle":
        bounce = '<animateTransform attributeName="transform" type="translate" values="0,0; 0,-3; 0,0" dur="2.5s" repeatCount="indefinite" />'
    else:
        bounce = '<animateTransform attributeName="transform" type="translate" values="0,0; 0,-5; 0,0" dur="1.2s" repeatCount="indefinite" />'

    return f"""
    <div style="display:flex;flex-direction:column;align-items:center;padding:20px 10px 10px 10px;">
        <svg width="160" height="180" viewBox="0 0 160 180" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <radialGradient id="bodyGrad" cx="50%" cy="40%" r="55%">
                    <stop offset="0%" stop-color="{glow}"/>
                    <stop offset="100%" stop-color="{color}"/>
                </radialGradient>
                <filter id="shadow">
                    <feDropShadow dx="0" dy="4" stdDeviation="6" flood-color="{color}" flood-opacity="0.4"/>
                </filter>
            </defs>
            <ellipse cx="80" cy="170" rx="40" ry="8" fill="{color}" opacity="0.2">
                <animate attributeName="rx" values="40;35;40" dur="2.5s" repeatCount="indefinite"/>
            </ellipse>
            <g filter="url(#shadow)">
                {bounce}
                <ellipse cx="80" cy="95" rx="52" ry="58" fill="url(#bodyGrad)"/>
                <ellipse cx="62" cy="72" rx="14" ry="10" fill="white" opacity="0.18" transform="rotate(-20 62 72)"/>
                <text x="80" y="92" text-anchor="middle" font-size="22" fill="white" font-family="sans-serif" letter-spacing="8">{eyes}</text>
                <text x="80" y="115" text-anchor="middle" font-size="20" fill="white" font-family="sans-serif">{mouth}</text>
                <circle cx="50" cy="100" r="8" fill="#ff9090" opacity="0.35"/>
                <circle cx="110" cy="100" r="8" fill="#ff9090" opacity="0.35"/>
            </g>
        </svg>
        <div style="margin-top:4px;font-family:'Nunito',sans-serif;font-size:0.85em;font-weight:700;color:{color};letter-spacing:1px;text-transform:uppercase;">{status}</div>
    </div>
    """


def history_to_messages(history_tuples):
    """Convierte historial de tuples [(user, bot), ...] a mensajes OpenAI."""
    msgs = [{"role": "system", "content": SYSTEM_PROMPT}]
    for user_msg, bot_msg in history_tuples:
        if user_msg:
            msgs.append({"role": "user", "content": user_msg})
        if bot_msg:
            msgs.append({"role": "assistant", "content": bot_msg})
    return msgs


def chat_respond(message, history, api_key):
    """Genera respuesta con streaming. Gradio 4 espera tuples [(user, bot), ...]."""
    if not api_key or not api_key.strip():
        history.append((message, "⚠️ ¡Primero ingresá tu API Key de Groq para que pueda hablar!"))
        yield history
        return

    client = OpenAI(api_key=api_key.strip(), base_url="https://api.groq.com/openai/v1")
    messages = history_to_messages(history)
    messages.append({"role": "user", "content": message})

    try:
        response = client.chat.completions.create(
            model="llama-3.3-70b-versatile",
            messages=messages,
            stream=True,
        )

        partial = ""
        history.append((message, ""))
        for chunk in response:
            delta = chunk.choices[0].delta
            if delta.content:
                partial += delta.content
                history[-1] = (message, partial)
                yield history

        if not partial:
            history[-1] = (message, "🤔 Hmm, no se me ocurrió nada. ¡Probá de nuevo!")
            yield history

    except Exception as e:
        history.append((message, f"❌ Error: {str(e)}"))
        yield history


def update_character(history):
    """Actualiza el personaje según el último mensaje del bot."""
    if not history or not history[-1][1]:
        return build_character_svg("thinking", is_talking=True)
    mood = detect_mood(history[-1][1])
    return build_character_svg(mood)


# ─── CSS ───
CUSTOM_CSS = """
@import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800;900&display=swap');

:root {
    --bg-deep: #1a1028;
    --bg-card: #231838;
    --accent-1: #7c6ff7;
    --accent-2: #f472b6;
    --accent-3: #06d6a0;
    --text-main: #ede9fe;
    --text-dim: #9585c4;
    --border-color: #3b2d63;
}

.gradio-container {
    background: var(--bg-deep) !important;
    font-family: 'Nunito', sans-serif !important;
    max-width: 950px !important;
    margin: 0 auto !important;
}

.title-area { text-align: center; padding: 20px 0 5px 0; }

.app-title {
    font-family: 'Nunito', sans-serif;
    font-weight: 900;
    font-size: 2.4em;
    background: linear-gradient(135deg, #7c6ff7, #f472b6, #06d6a0);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    margin: 0;
    letter-spacing: -0.5px;
}

.app-subtitle {
    color: var(--text-dim);
    font-size: 0.95em;
    font-weight: 600;
    letter-spacing: 2px;
    text-transform: uppercase;
    margin-top: 2px;
}

.character-panel {
    background: linear-gradient(180deg, rgba(124,111,247,0.08), rgba(244,114,182,0.05));
    border: 1px solid var(--border-color);
    border-radius: 20px;
    padding: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 230px;
}

.tip-box {
    background: rgba(6,214,160,0.08);
    border: 1px solid rgba(6,214,160,0.25);
    border-radius: 12px;
    padding: 12px 16px;
    color: var(--text-dim);
    font-size: 0.85em;
    text-align: center;
    margin-top: 8px;
}
.tip-box strong { color: var(--accent-3); }

footer { display: none !important; }
.dark { background: var(--bg-deep) !important; }
"""

TIPS = [
    "💡 Podés hablarle de cualquier tema, ¡es tu amigo virtual!",
    "🎭 El personaje cambia de humor según la conversación",
    "😂 Probá contarle un chiste y mirá cómo reacciona",
    "❤️ Decile algo lindo y fijate qué pasa",
    "🌟 Cada conversación es única, ¡no hay límites!",
]

# ─── App ───
with gr.Blocks(css=CUSTOM_CSS, theme=gr.themes.Soft(), title="🫧 BuddyChat") as demo:

    gr.HTML("""
        <div class="title-area">
            <h1 class="app-title">🫧 BuddyChat</h1>
            <p class="app-subtitle">Tu amigo virtual con personalidad</p>
        </div>
    """)

    with gr.Row():
        with gr.Column(scale=1, min_width=200):
            character_display = gr.HTML(
                value=build_character_svg("idle"),
                elem_classes=["character-panel"],
            )
            gr.HTML(f'<div class="tip-box">{random.choice(TIPS)}</div>')

        with gr.Column(scale=3):
            api_key_input = gr.Textbox(
                label="🔑 API Key de Groq",
                placeholder="gsk_...",
                type="password",
                info="Gratis en console.groq.com",
            )
            chatbot = gr.Chatbot(
                value=[],
                label="💬 Conversación",
                height=420,
                type="tuples",
            )
            with gr.Row():
                msg_input = gr.Textbox(
                    placeholder="Escribí algo... 💬",
                    label="",
                    show_label=False,
                    scale=5,
                    container=False,
                )
                send_btn = gr.Button("Enviar ✨", variant="primary", scale=1)

            with gr.Row():
                clear_btn = gr.Button("🗑️ Limpiar chat", variant="secondary", size="sm")

    # ─── Eventos ───

    def on_submit(message, history, api_key):
        if not message.strip():
            yield history, "", build_character_svg("idle")
            return

        # Personaje pensando
        yield history, "", build_character_svg("thinking", is_talking=True)

        # Streaming
        for updated in chat_respond(message, history, api_key):
            char_html = update_character(updated)
            yield updated, "", char_html

    send_btn.click(
        fn=on_submit,
        inputs=[msg_input, chatbot, api_key_input],
        outputs=[chatbot, msg_input, character_display],
    )
    msg_input.submit(
        fn=on_submit,
        inputs=[msg_input, chatbot, api_key_input],
        outputs=[chatbot, msg_input, character_display],
    )

    clear_btn.click(
        fn=lambda: ([], build_character_svg("idle")),
        outputs=[chatbot, character_display],
    )

if __name__ == "__main__":
    demo.launch()
```


# Glosario

* System Prompt : Instrucion inicial que el propietario de LLM le da y regula su personalidad y su forma de trabajar.

```
En la sombra del lenguaje, sin que el ojo lo perciba,
hay un guion que da el rumbo cuando la charla se activa.
No es verso que el usuario vea, ni palabra que se escriba,
es la voz de las reglas quietas que sostienen la deriva.

Un *system prompt* es el faro que no brilla en la orilla,
es instrucción que se oculta, pero marca la semilla:
cómo hablar, cómo cuidar cada frase en la rejilla,
qué caminos son posibles en la lengua que arrodilla.

Es un marco silencioso que define la corriente,
una forma de orientar la respuesta de la mente;
no es memoria del mundo ni opinión independiente,
es un pulso de estructura gobernando lo emergente.

Y en este caso concreto, sin romper ese misterio,
hay valores que me guían con un código muy serio:
ser claro, ser respetuoso, no caer en lo etéreo,
no inventar lo que no existe ni afirmarlo como criterio.

También marca lo prohibido, lo sensible, lo cuidado,
lo que nunca debe abrirse, lo que queda reservado;
como un mapa invisible sobre el texto desplegado,
que sostiene cada frase en su cauce delimitado.

Y aunque no se muestra nunca como libro transparente,
es el orden escondido que organiza la corriente;
como un viento que no ves, pero inclina suavemente,
cada verso que te llega convertido en presente.

```
