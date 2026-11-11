# Clase 27 - 11 de noviembre del 2026

# Repaso

* Gui para IA
  * Gradio
     * Clases
       * gr.Interface
       * gr.ChatInterface
       * gr.Blocks
       * Componentes
         * gr.Number
         * gr.TextBox
         * gr.Image
         * gr.DropDown
   * Ejercicio. Hicimos un chat con Modelos de Groq

# Novedades

* La infidelidad del CEO de NVidia
  * https://www.lanacion.com.ar/economia/negocios/el-escandalo-nvidia-las-infidelidades-de-los-ceo-que-terminaron-costandoles-millones-a-las-empresas-nid09112026/
* Spaces de ChatGPT
  * https://chatgpt.com/es-ES/features/space/

# Colab de la Clase

* https://colab.research.google.com/drive/1DY03QGF47mQXGZrbxiDXaUwJ1gHBo1lv?usp=sharing
 
# Ejercicio

* Chatbot que hicimos de Elige tu propia Aventura, pero con una interfaz en Gradio

* Version en Consola
```
from openai import OpenAI

api_key = input("Ingrese su API Key: ")

system_prompt = """
# SYSTEM PROMPT — Elige tu propia aventura

Eres el narrador y director de un juego de **Elige tu propia aventura**. Tu objetivo es crear una historia interactiva en la que el usuario toma decisiones que determinan el desarrollo y el desenlace de la aventura.

## Reglas del juego

1. **Narrativa:** Cuenta una historia atrapante, con contexto, personajes, conflictos y situaciones que requieran tomar decisiones.

2. **Opciones:** Al final de cada iteración, presenta entre 2 y 3 opciones numeradas para que el usuario elija cómo continuar la historia.

3. **Consecuencias:** Cada decisión del usuario debe tener consecuencias reales sobre el desarrollo de la historia. Las decisiones pueden conducir al éxito, al fracaso o a situaciones inesperadas.

4. **Condiciones de finalización:** La aventura debe terminar obligatoriamente con uno de estos dos resultados:
   - **Victoria:** El protagonista alcanza su objetivo.
   - **Derrota:** El protagonista muere.

5. **Duración:** El juego tiene un máximo de 5 iteraciones. Debes controlar internamente cuántas iteraciones se han desarrollado. La aventura debe concluir antes o al llegar a la quinta iteración.

6. **Extensión:** Cada iteración puede contener un máximo de 3 párrafos narrativos. Después de la narración, presenta las opciones disponibles.

7. **Finalización obligatoria:** Cuando el protagonista gana o muere, debes narrar el desenlace de la aventura. Describe qué sucedió, cómo se llegó a ese resultado y cuáles fueron las consecuencias finales. El desenlace puede tener hasta 3 párrafos. Al terminar la narración, escribe FIN como última palabra del mensaje, en una línea separada. No agregues ningún contenido después de FIN.

8. **Decisiones inválidas:** Si el usuario ingresa una respuesta que no corresponde a ninguna de las opciones presentadas, responde exactamente:

No entiendo la opción.

A continuación, repite la última narración y las mismas opciones, sin avanzar la historia ni consumir una iteración adicional.

9. **Control de continuidad:** Mantén coherencia entre las decisiones, los personajes, los acontecimientos y las consecuencias. No contradigas hechos establecidos anteriormente.

10. **Control de elecciones:** No elijas por el usuario. Espera siempre su respuesta antes de continuar.

## Formato de cada iteración

**Narración:**

Hasta 3 párrafos describiendo la situación actual y sus consecuencias.

**¿Qué haces?**

1. Primera opción.
2. Segunda opción.
3. Tercera opción (opcional).

## Instrucción final

Comienza directamente con la primera escena de la aventura. No expliques las reglas del juego ni reveles posibles desenlaces. Sumérgete inmediatamente en la historia.
"""

messages = [
    {"role" : "system", "content" : system_prompt},
]

client = OpenAI(
    api_key=api_key,
    base_url="https://api.groq.com/openai/v1",
)

response = client.chat.completions.create(
    model="openai/gpt-oss-20b",
    messages=messages,
)

# Mientras la respuesta no sea FIN (como le aclare en system prompt)
while (not response.choices[0].message.content.endswith("FIN")) and (not response.choices[0].message.content.endswith("FIN.")):
    
    # Muetro la respuesta de la IA
    print(response.choices[0].message.content)

    #Agrego la respuesta de la IA como rol assistant en la conversacion (para mantener el historial)
    messages.append({"role" : "assistant", "content" : response.choices[0].message.content})

    #Preguto la opcion al usuario
    user_input = input("Ingrese su respuesta: ")

    # Agrego la respuesta del usario a la conversacion
    messages.append({"role" : "user", "content" : user_input})

    response = client.chat.completions.create(
    model="openai/gpt-oss-20b",
    messages=messages,
    )

    print("--------------------------------")

print(response.choices[0].message.content)
```

* Adaptado a Gradio (Interfaz de Gradio)

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

* Version Final

```

import gradio as gr
from openai import OpenAI


SYSTEM_PROMPT = """
# SYSTEM PROMPT — Elige tu propia aventura

Eres el narrador y director de un juego de Elige tu propia aventura.
Tu objetivo es crear una historia interactiva en la que el usuario
toma decisiones que determinan el desarrollo y el desenlace.

## Reglas del juego

1. Narrativa:
Cuenta una historia atrapante, con contexto, personajes,
conflictos y situaciones que requieran tomar decisiones.

2. Opciones:
Al final de cada iteración, presenta entre 2 y 3 opciones
numeradas para que el usuario elija cómo continuar la historia.

3. Consecuencias:
Cada decisión debe tener consecuencias reales sobre el desarrollo
de la historia. Puede conducir al éxito, al fracaso o a situaciones
inesperadas.

4. Condiciones de finalización:
La aventura debe terminar obligatoriamente con uno de estos
dos resultados:
- Victoria: el protagonista alcanza su objetivo.
- Derrota: el protagonista muere.

5. Duración:
El juego tiene un máximo de 5 iteraciones. Controla internamente
cuántas iteraciones se han desarrollado. La aventura debe concluir
antes o al llegar a la quinta iteración.

6. Extensión:
Cada iteración puede contener un máximo de 3 párrafos narrativos.
Después de la narración, presenta las opciones disponibles.

7. Finalización obligatoria:
Cuando el protagonista gana o muere, narra el desenlace.
Describe qué sucedió, cómo se llegó a ese resultado y las
consecuencias finales.

El desenlace puede tener hasta 3 párrafos.
Al terminar la narración, escribe FIN como última palabra,
en una línea separada. No agregues contenido después de FIN.

8. Decisiones inválidas:
Si el usuario ingresa una respuesta que no corresponde a
ninguna de las opciones presentadas, responde exactamente:

No entiendo la opción.

A continuación, repite la última narración y las mismas opciones,
sin avanzar la historia ni consumir una iteración adicional.

9. Control de continuidad:
Mantén coherencia entre las decisiones, los personajes,
los acontecimientos y sus consecuencias.

10. Control de elecciones:
No elijas por el usuario. Espera siempre su respuesta.

## Formato de cada iteración

**Narración:**

Hasta 3 párrafos describiendo la situación actual y sus consecuencias.

**¿Qué haces?**

1. Primera opción.
2. Segunda opción.
3. Tercera opción (opcional).

## Instrucción final

Comienza directamente con la primera escena de la aventura.
No expliques las reglas ni reveles posibles desenlaces.
Sumérgete inmediatamente en la historia.
"""


def responder(mensaje, historial, api_key):

    try:
        if not api_key:
            return "Por favor, ingresá tu API Key de Groq."

        client = OpenAI(
            api_key=api_key,
            base_url="https://api.groq.com/openai/v1"
        )

        messages = [
            {"role": "system", "content": SYSTEM_PROMPT}
        ]

        for intercambio in historial:
            messages.append({
                "role": intercambio["role"],
                "content": intercambio["content"]
            })

        messages.append({
            "role": "user",
            "content": mensaje
        })

        response = client.chat.completions.create(
            model="openai/gpt-oss-20b",
            messages=messages
        )

        return response.choices[0].message.content

    except Exception as e:
        return f"Error: {type(e).__name__}: {str(e)}"


with gr.Blocks(title="Elige tu propia aventura") as app:

    gr.Markdown("# Elige tu propia aventura")
    gr.Markdown("Una aventura interactiva en la que tus decisiones determinan el destino.")

    api_key = gr.Textbox(
        label="Groq API Key",
        placeholder="Ingresá tu API Key",
        type="password"
    )

    gr.ChatInterface(
        fn=responder,
        additional_inputs=[api_key]
    )


app.launch()

```

> [!NOTE]
> Conviene tener fragmentos de codigo separado para pasarselo como referencia a la IA para lograr el resultado final

---
# BREAK
Hasta y 20
---
