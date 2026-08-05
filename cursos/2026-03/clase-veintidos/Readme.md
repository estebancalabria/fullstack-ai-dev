# Clase 22 - 22 de Mayo del 2026

# Repaso

* IA
  * Tipos de IA
    * Propietarias
    * Open Source
      * Groq
  * Trabajar con API KEY
      * Response API
        * Sin Contexto. Respuesta simple
      * Chat Completion
        * Mantenia el contexto de la conversacion

# Colab del dia

https://colab.research.google.com/drive/1qSaSML2M462RCw55ofusdEs3tFDzsJNY?usp=sharing

# Actividad 1 : Clon de ChatGPT

## Enunciado

* Vamos a crear una Interfaz tipo chatGPT con conversaciones persistentes

* Idea de la base de datos
(usuario) (id, Nombre)
(conversaciones/Chats) (id, fecha, nombre)
(mensajes) (id, role (assistant/user/system), fecha, texto)

## Ejericio 1. Definan el ddl en SQL para crear esa estructura

* Para SQLITE

```sql
-- =============================================
--  1. Tabla: usuarios
-- =============================================
CREATE TABLE IF NOT EXISTS usuarios (
    id      INTEGER  NOT NULL,
    nombre  TEXT     NOT NULL CHECK(LENGTH(TRIM(nombre)) > 0),

    CONSTRAINT pk_usuarios PRIMARY KEY (id)
);

-- =============================================
--  2. Tabla: conversaciones
-- =============================================
CREATE TABLE IF NOT EXISTS conversaciones (
    id          INTEGER  NOT NULL,
    usuario_id  INTEGER  NOT NULL,
    nombre      TEXT     NOT NULL DEFAULT 'Nueva conversación',
    fecha       TEXT     NOT NULL DEFAULT (DATETIME('now')),

    CONSTRAINT pk_conversaciones  PRIMARY KEY (id),
    CONSTRAINT fk_conv_usuario    FOREIGN KEY (usuario_id)
                                  REFERENCES usuarios(id)
                                  ON DELETE CASCADE
                                  ON UPDATE CASCADE,
    CONSTRAINT chk_conv_fecha     CHECK(fecha = DATETIME(fecha))
);

-- =============================================
--  3. Tabla: mensajes
-- =============================================
CREATE TABLE IF NOT EXISTS mensajes (
    id               INTEGER  NOT NULL,
    conversacion_id  INTEGER  NOT NULL,
    role             TEXT     NOT NULL,
    fecha            TEXT     NOT NULL DEFAULT (DATETIME('now')),
    texto            TEXT     NOT NULL CHECK(LENGTH(TRIM(texto)) > 0),

    CONSTRAINT pk_mensajes        PRIMARY KEY (id),
    CONSTRAINT fk_mens_conv       FOREIGN KEY (conversacion_id)
                                  REFERENCES conversaciones(id)
                                  ON DELETE CASCADE
                                  ON UPDATE CASCADE,
    CONSTRAINT chk_mens_role      CHECK(role IN ('user', 'assistant', 'system')),
    CONSTRAINT chk_mens_fecha     CHECK(fecha = DATETIME(fecha))
);

-- =============================================
--  Activar foreign keys (obligatorio en SQLite)
-- =============================================
PRAGMA foreign_keys = ON;
```

## Ejecicio 2. Creacion de la base en SQLITE

* Crear un google colab y en la primer celda crea la base de datos chatgpt.db con esa estructura
* Crear luego un usuario de prueba

```python
script_ddl_suarios = """
-- =============================================
--  1. Tabla: usuarios
-- =============================================
CREATE TABLE IF NOT EXISTS usuarios (
    id      INTEGER  NOT NULL,
    nombre  TEXT     NOT NULL CHECK(LENGTH(TRIM(nombre)) > 0),

    CONSTRAINT pk_usuarios PRIMARY KEY (id)
);
"""

script_ddl_conversaciones = """
-- =============================================
--  2. Tabla: conversaciones
-- =============================================
CREATE TABLE IF NOT EXISTS conversaciones (
    id          INTEGER  NOT NULL,
    usuario_id  INTEGER  NOT NULL,
    nombre      TEXT     NOT NULL DEFAULT 'Nueva conversación',
    fecha       TEXT     NOT NULL DEFAULT (DATETIME('now')),

    CONSTRAINT pk_conversaciones  PRIMARY KEY (id),
    CONSTRAINT fk_conv_usuario    FOREIGN KEY (usuario_id)
                                  REFERENCES usuarios(id)
                                  ON DELETE CASCADE
                                  ON UPDATE CASCADE,
    CONSTRAINT chk_conv_fecha     CHECK(fecha = DATETIME(fecha))
);
"""

script_ddl_mesanes = """
-- =============================================
--  3. Tabla: mensajes
-- =============================================
CREATE TABLE IF NOT EXISTS mensajes (
    id               INTEGER  NOT NULL,
    conversacion_id  INTEGER  NOT NULL,
    role             TEXT     NOT NULL,
    fecha            TEXT     NOT NULL DEFAULT (DATETIME('now')),
    texto            TEXT     NOT NULL CHECK(LENGTH(TRIM(texto)) > 0),

    CONSTRAINT pk_mensajes        PRIMARY KEY (id),
    CONSTRAINT fk_mens_conv       FOREIGN KEY (conversacion_id)
                                  REFERENCES conversaciones(id)
                                  ON DELETE CASCADE
                                  ON UPDATE CASCADE,
    CONSTRAINT chk_mens_role      CHECK(role IN ('user', 'assistant', 'system')),
    CONSTRAINT chk_mens_fecha     CHECK(fecha = DATETIME(fecha))
);
"""

script_ddl_fks = """
-- =============================================
--  Activar foreign keys (obligatorio en SQLite)
-- =============================================
PRAGMA foreign_keys = ON;
"""

import sqlite3

# Crear/conectar a la base de datos
conexion = sqlite3.connect("chatgpt.db")
cursor = conexion.cursor()
cursor.execute(script_ddl_fks);
cursor.execute(script_ddl_suarios);
cursor.execute(script_ddl_conversaciones);
cursor.execute(script_ddl_mesanes);

# Crear usuario de prueba
cursor.execute("""
INSERT INTO usuarios (id, nombre)
VALUES (1, 'Usuario de prueba');
""")

conexion.commit()
conexion.close()

print("Base de datos chatgpt.db creada correctamente con un usuario de prueba.")

```

# Ejercicio 3 : PRototipo Interfaz de Gradio

* Vamos a armar esta interfaz con gradio
<img width="971" height="558" alt="image" src="https://github.com/user-attachments/assets/3023353d-f977-41fb-83e4-49f6d5d0a3a2" />

* Que no haga nada, solo la interfaz

```
import gradio as gr

with gr.Blocks() as demo:
    
    gr.Markdown("## API KEY")
    api_key = gr.Textbox(
        label="",
        placeholder="Ingresá tu API KEY",
        type="password"
    )

    with gr.Row():
        with gr.Column(scale=1):
            gr.Markdown("### Conversaciones")
            conversaciones = gr.Textbox(
                label="",
                lines=15,
                interactive=False
            )

        with gr.Column(scale=4):
            chat = gr.Chatbot(
                label="",
                height=350
            )

            with gr.Row():
                mensaje = gr.Textbox(
                    label="",
                    placeholder="Escribí tu mensaje...",
                    scale=8
                )

                enviar = gr.Button("➤", scale=1)

demo.launch()
```

# Ejercicio 4. Que arriba se ponga la api key y que responda la IA.

* En ChatGPT integre los dos codigos, el de gradio y el de la clase pasada
```
import gradio as gr
from openai import OpenAI

system_prompt = """
Eres un amigo simpatico y gracioso que le gusta tener conversaciones
"""

messages = [
    {"role": "system", "content": system_prompt}
]

# Función que interactúa con Groq
def responder(api_key, mensaje_usuario, historial):

    if mensaje_usuario.strip() == "":
        return historial, ""

    client = OpenAI(
        api_key=api_key,
        base_url="https://api.groq.com/openai/v1",
    )

    messages.append({
        "role": "user",
        "content": mensaje_usuario
    })

    response = client.chat.completions.create(
        model="openai/gpt-oss-20b",
        messages=messages
    )

    respuesta = response.choices[0].message.content

    messages.append({
        "role": "assistant",
        "content": respuesta
    })

    historial.append((mensaje_usuario, respuesta))

    return historial, ""

# Nueva conversación
def nueva_conversacion():
    global messages

    messages = [
        {"role": "system", "content": system_prompt}
    ]

    return [], ""

with gr.Blocks() as demo:

    gr.Markdown("## API KEY")

    api_key = gr.Textbox(
        label="",
        placeholder="Ingresá tu API KEY",
        type="password"
    )

    with gr.Row():

        with gr.Column(scale=1):

            boton_nueva = gr.Button("➕ Nueva conversación")

            gr.Markdown("### Conversaciones")

            conversaciones = gr.Textbox(
                label="",
                lines=15,
                interactive=False
            )

        with gr.Column(scale=4):

            chat = gr.Chatbot(
                label="",
                height=350
            )

            with gr.Row():

                mensaje = gr.Textbox(
                    label="",
                    placeholder="Escribí tu mensaje...",
                    scale=8
                )

                enviar = gr.Button("➤", scale=1)

    enviar.click(
        fn=responder,
        inputs=[api_key, mensaje, chat],
        outputs=[chat, mensaje]
    )

    mensaje.submit(
        fn=responder,
        inputs=[api_key, mensaje, chat],
        outputs=[chat, mensaje]
    )

    boton_nueva.click(
        fn=nueva_conversacion,
        outputs=[chat, conversaciones]
    )

demo.launch()
```

# Ejericio 5. Integrar el codigo anterior con la base de datos de SQLite

```
"""
ChatGPT Clone — Gradio + SQLite + Groq
=======================================
Visual idéntica a chatgpt.com. Sidebar con Radio nativo para navegación confiable.
Copiar todo en UNA celda de Google Colab y ejecutar.
"""

from __future__ import annotations

import sqlite3
import subprocess
import sys
from dataclasses import dataclass
from enum import Enum
from typing import Optional, Generator

# ── Dependencias ──────────────────────────────────

for pkg in ("gradio", "groq"):
    try:
        __import__(pkg)
    except ImportError:
        subprocess.check_call([sys.executable, "-m", "pip", "install", pkg, "-q"])

import gradio as gr
from groq import Groq

# ── Constantes ────────────────────────────────────

DB_NAME = "chatgpt_clone.db"
DEFAULT_MODEL = "llama-3.1-8b-instant"
MAX_TOKENS = 2048
TEMPERATURE = 0.7

# Logo SVG de ChatGPT (simplificado)
CHATGPT_LOGO = """<svg width="28" height="28" viewBox="0 0 41 41" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M37.532 16.87a9.963 9.963 0 0 0-.856-8.184 10.078 10.078 0 0 0-10.855-4.835A9.964 9.964 0 0 0 18.306.5a10.079 10.079 0 0 0-9.614 6.977 9.967 9.967 0 0 0-6.664 4.834 10.08 10.08 0 0 0 1.24 11.817 9.965 9.965 0 0 0 .856 8.185 10.079 10.079 0 0 0 10.855 4.835 9.965 9.965 0 0 0 7.516 3.35 10.078 10.078 0 0 0 9.617-6.981 9.967 9.967 0 0 0 6.663-4.834 10.079 10.079 0 0 0-1.243-11.813ZM22.498 37.886a7.474 7.474 0 0 1-4.799-1.735c.061-.033.168-.091.237-.134l7.964-4.6a1.294 1.294 0 0 0 .655-1.134V19.054l3.366 1.944a.12.12 0 0 1 .066.092v9.299a7.505 7.505 0 0 1-7.49 7.496ZM6.392 31.006a7.471 7.471 0 0 1-.894-5.023c.06.036.162.099.237.141l7.964 4.6a1.297 1.297 0 0 0 1.308 0l9.724-5.614v3.888a.12.12 0 0 1-.048.103l-8.051 4.649a7.504 7.504 0 0 1-10.24-2.744ZM4.297 13.62A7.469 7.469 0 0 1 8.2 10.333c0 .068-.004.19-.004.274v9.201a1.294 1.294 0 0 0 .654 1.132l9.723 5.614-3.366 1.944a.12.12 0 0 1-.114.012L7.044 23.856a7.504 7.504 0 0 1-2.747-10.237Zm27.658 6.437-9.724-5.615 3.367-1.943a.121.121 0 0 1 .113-.012l8.051 4.649a7.498 7.498 0 0 1-1.158 13.528v-9.476a1.293 1.293 0 0 0-.649-1.131Zm3.35-5.043c-.059-.037-.162-.099-.236-.141l-7.965-4.6a1.298 1.298 0 0 0-1.308 0l-9.723 5.614v-3.888a.12.12 0 0 1 .048-.103l8.05-4.645a7.497 7.497 0 0 1 11.135 7.763Zm-21.063 6.929-3.367-1.944a.12.12 0 0 1-.065-.092v-9.299a7.497 7.497 0 0 1 12.293-5.756 6.94 6.94 0 0 0-.236.134l-7.965 4.6a1.294 1.294 0 0 0-.654 1.132l-.006 11.225Zm1.829-3.943 4.33-2.501 4.332 2.5v5l-4.331 2.5-4.331-2.5V18Z" fill="currentColor"/></svg>"""

# ── Enums / Dataclasses ──────────────────────────

class Role(Enum):
    USER = "user"
    ASSISTANT = "assistant"
    SYSTEM = "system"

@dataclass(frozen=True)
class Message:
    role: Role
    texto: str
    id: Optional[int] = None

@dataclass(frozen=True)
class Conversation:
    id: int
    nombre: str
    updated_at: str
    total_mensajes: int

# ── Base de Datos ─────────────────────────────────

class Database:
    SCHEMA = """
        CREATE TABLE IF NOT EXISTS usuarios (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nombre TEXT NOT NULL UNIQUE CHECK(length(trim(nombre)) > 0),
            created_at TEXT NOT NULL DEFAULT (datetime('now'))
        );
        CREATE TABLE IF NOT EXISTS conversaciones (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            usuario_id INTEGER NOT NULL,
            nombre TEXT NOT NULL DEFAULT 'Nueva conversación',
            created_at TEXT NOT NULL DEFAULT (datetime('now')),
            updated_at TEXT NOT NULL DEFAULT (datetime('now')),
            FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
                ON DELETE CASCADE ON UPDATE CASCADE
        );
        CREATE TABLE IF NOT EXISTS mensajes (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            conversacion_id INTEGER NOT NULL,
            role TEXT NOT NULL CHECK(role IN ('user', 'assistant', 'system')),
            texto TEXT NOT NULL CHECK(length(trim(texto)) > 0),
            created_at TEXT NOT NULL DEFAULT (datetime('now')),
            FOREIGN KEY (conversacion_id) REFERENCES conversaciones(id)
                ON DELETE CASCADE ON UPDATE CASCADE
        );
        CREATE INDEX IF NOT EXISTS idx_conv_usuario ON conversaciones(usuario_id);
        CREATE INDEX IF NOT EXISTS idx_msg_conv ON mensajes(conversacion_id);
        CREATE INDEX IF NOT EXISTS idx_conv_updated ON conversaciones(updated_at DESC);
    """

    def __init__(self, db_path: str = DB_NAME) -> None:
        self._conn = sqlite3.connect(db_path, check_same_thread=False)
        self._conn.execute("PRAGMA foreign_keys = ON")
        self._conn.executescript(self.SCHEMA)
        self._conn.execute("""
            CREATE TRIGGER IF NOT EXISTS trg_update_conv_ts
            AFTER INSERT ON mensajes
            BEGIN
                UPDATE conversaciones SET updated_at = datetime('now')
                WHERE id = NEW.conversacion_id;
            END;
        """)
        self._conn.commit()

    def get_or_create_user(self, nombre: str = "Usuario") -> int:
        row = self._conn.execute("SELECT id FROM usuarios WHERE nombre = ?", (nombre,)).fetchone()
        if row:
            return row[0]
        cur = self._conn.execute("INSERT INTO usuarios (nombre) VALUES (?)", (nombre,))
        self._conn.commit()
        return cur.lastrowid

    def create_conversation(self, user_id: int, nombre: str = "Nueva conversación") -> int:
        cur = self._conn.execute(
            "INSERT INTO conversaciones (usuario_id, nombre) VALUES (?, ?)", (user_id, nombre)
        )
        self._conn.commit()
        return cur.lastrowid

    def list_conversations(self, user_id: int) -> list[Conversation]:
        rows = self._conn.execute("""
            SELECT c.id, c.nombre, c.updated_at,
                   (SELECT COUNT(*) FROM mensajes m WHERE m.conversacion_id = c.id)
            FROM conversaciones c WHERE c.usuario_id = ?
            ORDER BY c.updated_at DESC
        """, (user_id,)).fetchall()
        return [Conversation(r[0], r[1], r[2], r[3]) for r in rows]

    def rename_conversation(self, conv_id: int, nombre: str) -> None:
        self._conn.execute("UPDATE conversaciones SET nombre = ? WHERE id = ?", (nombre, conv_id))
        self._conn.commit()

    def delete_conversation(self, conv_id: int) -> None:
        self._conn.execute("DELETE FROM conversaciones WHERE id = ?", (conv_id,))
        self._conn.commit()

    def save_message(self, conv_id: int, role: Role, texto: str) -> int:
        cur = self._conn.execute(
            "INSERT INTO mensajes (conversacion_id, role, texto) VALUES (?, ?, ?)",
            (conv_id, role.value, texto),
        )
        self._conn.commit()
        return cur.lastrowid

    def get_messages(self, conv_id: int) -> list[Message]:
        rows = self._conn.execute(
            "SELECT id, role, texto FROM mensajes WHERE conversacion_id = ? ORDER BY created_at ASC",
            (conv_id,),
        ).fetchall()
        return [Message(id=r[0], role=Role(r[1]), texto=r[2]) for r in rows]

# ── LLM Client ────────────────────────────────────

class LLMClient:
    def __init__(self, api_key: str, model: str = DEFAULT_MODEL) -> None:
        self._client = Groq(api_key=api_key)
        self.model = model

    def stream_chat(self, messages: list[dict[str, str]]) -> Generator[str, None, None]:
        try:
            stream = self._client.chat.completions.create(
                model=self.model, messages=messages,
                temperature=TEMPERATURE, max_tokens=MAX_TOKENS, stream=True,
            )
            for chunk in stream:
                delta = chunk.choices[0].delta.content
                if delta:
                    yield delta
        except Exception as e:
            yield f"[Error: {e}]"

    def generate_title(self, first_message: str) -> Optional[str]:
        try:
            resp = self._client.chat.completions.create(
                model=self.model,
                messages=[{"role": "user", "content": f'Generá un título corto (máx 5 palabras) para esta conversación: "{first_message}". Respondé SOLO el título, sin comillas.'}],
                temperature=0.5, max_tokens=30,
            )
            return resp.choices[0].message.content.strip()[:50]
        except Exception:
            return None

# ── Estado global ─────────────────────────────────

@dataclass
class AppState:
    db: Optional[Database] = None
    llm: Optional[LLMClient] = None
    user_id: Optional[int] = None
    current_conv_id: Optional[int] = None
    is_connected: bool = False

state = AppState()

# ── Helpers ───────────────────────────────────────

def _get_conv_choices() -> list[tuple[str, int]]:
    """Devuelve lista de (label, id) para el Radio."""
    if not state.db or not state.user_id:
        return []
    convs = state.db.list_conversations(state.user_id)
    return [(f"💬  {c.nombre}", c.id) for c in convs]

# ── Callbacks ─────────────────────────────────────

def connect_api(api_key: str):
    if not api_key.strip():
        return (
            gr.update(value="<span style='color:#ef4444;font-size:13px'>❌ Ingresá una API Key</span>"),
            gr.update(), gr.update(), gr.update(interactive=False),
        )
    try:
        state.llm = LLMClient(api_key=api_key.strip())
        state.db = Database(DB_NAME)
        state.user_id = state.db.get_or_create_user("Usuario")
        state.is_connected = True
        return (
            gr.update(value="<span style='color:#22c55e;font-size:13px'>✓ Conectado</span>"),
            gr.update(choices=_get_conv_choices(), value=None),
            gr.update(value=[]),
            gr.update(interactive=True, placeholder="Preguntá lo que quieras..."),
        )
    except Exception as e:
        return (
            gr.update(value=f"<span style='color:#ef4444;font-size:13px'>❌ {e}</span>"),
            gr.update(), gr.update(), gr.update(interactive=False),
        )


def new_conversation():
    if not state.is_connected:
        return gr.update(), gr.update(), gr.update()
    conv_id = state.db.create_conversation(state.user_id)
    state.current_conv_id = conv_id
    choices = _get_conv_choices()
    return (
        gr.update(choices=choices, value=conv_id),
        gr.update(value=[]),
        gr.update(value=""),
    )


def select_conversation(conv_id):
    """Cuando el usuario clickea un chat en el Radio del sidebar."""
    if conv_id is None or not state.is_connected:
        return gr.update(), gr.update()
    state.current_conv_id = conv_id
    messages = state.db.get_messages(conv_id)
    history = [
        {"role": m.role.value, "content": m.texto}
        for m in messages if m.role in (Role.USER, Role.ASSISTANT)
    ]
    return gr.update(value=history), gr.update(value="")


def delete_current():
    if not state.is_connected or not state.current_conv_id:
        return gr.update(), gr.update(), gr.update()
    state.db.delete_conversation(state.current_conv_id)
    state.current_conv_id = None
    choices = _get_conv_choices()
    return (
        gr.update(choices=choices, value=None),
        gr.update(value=[]),
        gr.update(value=""),
    )


def user_message(message: str, history: list[dict]):
    if not message.strip():
        return gr.update(), history, gr.update()
    if not state.current_conv_id:
        state.current_conv_id = state.db.create_conversation(state.user_id)
    history = history + [{"role": "user", "content": message}]
    return gr.update(value=""), history, gr.update(choices=_get_conv_choices(), value=state.current_conv_id)


def bot_response(history: list[dict]) -> Generator:
    if not history or not state.is_connected:
        yield history, gr.update(choices=_get_conv_choices(), value=state.current_conv_id)
        return

    user_text = history[-1]["content"]
    state.db.save_message(state.current_conv_id, Role.USER, user_text)

    db_messages = state.db.get_messages(state.current_conv_id)
    user_msgs = [m for m in db_messages if m.role == Role.USER]
    if len(user_msgs) == 1:
        title = state.llm.generate_title(user_text)
        if title:
            state.db.rename_conversation(state.current_conv_id, title)

    api_messages = [{"role": m.role.value, "content": m.texto} for m in db_messages]

    history.append({"role": "assistant", "content": ""})
    full = ""
    for token in state.llm.stream_chat(api_messages):
        full += token
        history[-1]["content"] = full
        yield history, gr.update(choices=_get_conv_choices(), value=state.current_conv_id)

    if full:
        state.db.save_message(state.current_conv_id, Role.ASSISTANT, full)
    yield history, gr.update(choices=_get_conv_choices(), value=state.current_conv_id)


# ── CSS ───────────────────────────────────────────

CSS = """
/* ══════════ FORZAR MODO CLARO ══════════ */
:root, .dark, .gradio-container, .gradio-container.dark {
    --body-background-fill: #ffffff !important;
    --background-fill-primary: #ffffff !important;
    --background-fill-secondary: #f9f9f9 !important;
    --block-background-fill: #ffffff !important;
    --block-border-color: transparent !important;
    --block-label-text-color: #1a1a1a !important;
    --body-text-color: #1a1a1a !important;
    --body-text-color-subdued: #6b6b6b !important;
    --input-background-fill: #ffffff !important;
    --input-border-color: #d9d9d9 !important;
    --border-color-primary: #e5e5e5 !important;
    --checkbox-background-color: #ffffff !important;
    --checkbox-label-background-fill: transparent !important;
    --button-secondary-background-fill: transparent !important;
    --button-secondary-text-color: #1a1a1a !important;
    --button-secondary-border-color: transparent !important;
    --shadow-drop: none !important;
    --block-shadow: none !important;
    color-scheme: light !important;
}
body, .gradio-container { background: #ffffff !important; color: #1a1a1a !important; }
.gradio-container { max-width: 100% !important; padding: 0 !important; }
footer { display: none !important; }
.block { border: none !important; box-shadow: none !important; }

/* ══════════ SIDEBAR ══════════ */
[class*="sidebar"] {
    background: #f9f9f9 !important;
    border-right: 1px solid #ebebeb !important;
}

.sidebar-header {
    padding: 12px 14px 4px; display: flex;
    align-items: center; gap: 8px;
}
.sidebar-logo { display: flex; align-items: center; gap: 8px; color: #1a1a1a; }
.sidebar-logo svg { width: 24px; height: 24px; }

/* New chat button */
#new-chat-btn {
    margin: 6px 10px 2px !important; padding: 9px 12px !important;
    border-radius: 10px !important; border: none !important;
    background: transparent !important; color: #1a1a1a !important;
    font-size: 14px !important; font-weight: 500 !important;
    text-align: left !important; justify-content: flex-start !important;
    box-shadow: none !important; display: flex !important; gap: 8px !important;
}
#new-chat-btn:hover { background: #ececec !important; }

.section-label {
    font-size: 11px; font-weight: 600; color: #8e8e8e;
    padding: 14px 16px 6px; text-transform: uppercase;
    letter-spacing: 0.05em;
}

/* Radio como lista de chats */
#conv-radio { border: none !important; box-shadow: none !important; background: transparent !important; padding: 0 4px !important; }
#conv-radio .wrap { gap: 1px !important; }
#conv-radio label {
    border: none !important; border-radius: 10px !important;
    padding: 9px 14px !important; margin: 0 6px !important;
    background: transparent !important; cursor: pointer !important;
    font-size: 14px !important; color: #1a1a1a !important;
    transition: background 0.12s !important;
}
#conv-radio label:hover { background: #ececec !important; }
#conv-radio label.selected, #conv-radio input:checked + label {
    background: #e3e3e3 !important; font-weight: 500 !important;
}
/* Ocultar los radio circles */
#conv-radio input[type="radio"] { display: none !important; }
#conv-radio .icon { display: none !important; }

/* Sidebar footer */
.sidebar-footer {
    border-top: 1px solid #ebebeb; padding: 12px 14px;
    display: flex; align-items: center; gap: 10px;
    margin-top: auto;
}
.user-avatar {
    width: 30px; height: 30px; border-radius: 50%;
    background: linear-gradient(135deg, #ab68ff, #7c5cfc);
    color: #fff; display: flex; align-items: center;
    justify-content: center; font-size: 12px; font-weight: 700;
}
.user-name { font-size: 13px; font-weight: 600; color: #1a1a1a; }
.user-plan { font-size: 11px; color: #8e8e8e; }

/* Delete button */
#del-btn {
    margin: 0 10px !important; padding: 7px 12px !important;
    border-radius: 8px !important; border: none !important;
    background: transparent !important; box-shadow: none !important;
    color: #999 !important; font-size: 12.5px !important;
    text-align: left !important; justify-content: flex-start !important;
}
#del-btn:hover { background: #fee2e2 !important; color: #dc2626 !important; }

/* ══════════ HEADER ══════════ */
.app-header {
    display: flex; align-items: center; justify-content: space-between;
    padding: 8px 16px; background: #fff;
}
.header-model {
    display: flex; align-items: center; gap: 6px;
    font-size: 16px; font-weight: 600; color: #1a1a1a;
}
.header-model svg { color: #1a1a1a; }
.header-chevron { color: #b0b0b0; font-size: 13px; margin-left: 2px; }

#header-row { border-bottom: 1px solid #efefef !important; padding: 0 !important; }
#header-row .block { padding: 0 !important; }

/* API key area */
#api-key-input { border-radius: 10px !important; border: 1px solid #e0e0e0 !important; }
#api-key-input textarea { font-size: 13px !important; padding: 8px 12px !important; }
#connect-btn { border-radius: 10px !important; font-size: 13px !important; }

/* ══════════ CHATBOT ══════════ */
#chatbot {
    border: none !important; box-shadow: none !important;
    background: #ffffff !important;
}
#chatbot .message { color: #1a1a1a !important; }
#chatbot .message p, #chatbot .message li, #chatbot .message code,
#chatbot .message span, #chatbot .message pre { color: #1a1a1a !important; }
#chatbot .bot, #chatbot .bot .message-content { background: transparent !important; }
#chatbot .user .message-content { background: #f4f4f4 !important; border-radius: 20px !important; }
#chatbot .placeholder { background: #ffffff !important; }

/* ══════════ INPUT ══════════ */
.input-area { max-width: 740px; margin: 0 auto; width: 100%; padding: 0 20px; box-sizing: border-box; }
#msg-input {
    border-radius: 24px !important;
    border: 1px solid #d9d9d9 !important;
    background: #ffffff !important;
    box-shadow: 0 1px 6px rgba(0,0,0,0.04) !important;
}
#msg-input textarea {
    font-size: 15px !important; padding: 14px 20px !important;
    background: #ffffff !important; color: #1a1a1a !important;
}
#msg-input textarea::placeholder { color: #9ca3af !important; }
#msg-input:focus-within {
    border-color: #b0b0b0 !important;
    box-shadow: 0 2px 12px rgba(0,0,0,0.07) !important;
}

.input-footer {
    text-align: center; font-size: 11.5px; color: #b0b0b0;
    padding: 8px 0 14px; max-width: 740px; margin: 0 auto;
}

.welcome-text {
    font-size: 28px; font-weight: 600; color: #1a1a1a !important;
    text-align: center; padding-top: 20vh;
}
"""

# ── Build ─────────────────────────────────────────

def build_app() -> gr.Blocks:

    JS = """() => {
        document.documentElement.classList.remove('dark');
        document.documentElement.style.colorScheme = 'light';
        document.body.style.background = '#ffffff';
        const o = new MutationObserver(() => document.documentElement.classList.remove('dark'));
        o.observe(document.documentElement, {attributes: true, attributeFilter: ['class']});
    }"""

    with gr.Blocks(css=CSS, js=JS, fill_height=True, title="ChatGPT Clone", theme=gr.themes.Default()) as app:

        # ── SIDEBAR ──
        with gr.Sidebar(position="left", open=True, width=260):

            gr.HTML(f"""
                <div class="sidebar-header">
                    <div class="sidebar-logo">
                        {CHATGPT_LOGO}
                        <span style="font-size:15px;font-weight:600;">ChatGPT Clone</span>
                    </div>
                </div>
            """)

            new_chat_btn = gr.Button("✏️  New chat", elem_id="new-chat-btn", variant="secondary", size="sm")

            gr.HTML('<div class="section-label">Recientes</div>')

            conv_radio = gr.Radio(
                choices=[],
                value=None,
                label="",
                interactive=True,
                elem_id="conv-radio",
                container=False,
            )

            gr.HTML("""
                <div class="sidebar-footer">
                    <div class="user-avatar">U</div>
                    <div>
                        <div class="user-name">Usuario</div>
                        <div class="user-plan">Free</div>
                    </div>
                </div>
            """)

            delete_btn = gr.Button("🗑️ Eliminar chat actual", elem_id="del-btn", variant="secondary", size="sm")

        # ── HEADER ──
        with gr.Row(elem_id="header-row"):
            with gr.Column(scale=3, min_width=200):
                gr.HTML(f"""
                    <div class="app-header">
                        <div class="header-model">
                            {CHATGPT_LOGO}
                            ChatGPT Clone
                            <span class="header-chevron">▾</span>
                        </div>
                    </div>
                """)
            with gr.Column(scale=3, min_width=200):
                with gr.Row():
                    api_key_input = gr.Textbox(
                        type="password",
                        placeholder="🔑 Pegá tu Groq API Key...",
                        container=False, scale=3, elem_id="api-key-input",
                    )
                    connect_btn = gr.Button("Conectar", variant="primary", scale=1, size="sm", elem_id="connect-btn")
            with gr.Column(scale=1, min_width=100):
                status_html = gr.HTML(value="<span style='color:#b0b0b0;font-size:13px'>⚪ Sin conectar</span>")

        # ── CHATBOT ──
        chatbot = gr.Chatbot(
            value=[], height="65vh", type="messages",
            show_copy_button=True, elem_id="chatbot",
            placeholder=f"<div class='welcome-text'>What's on your mind today?</div>",
            show_label=False,
        )

        # ── INPUT ──
        with gr.Row(elem_classes="input-area"):
            msg_input = gr.Textbox(
                placeholder="Conectá tu API Key para empezar...",
                show_label=False, container=False, scale=7,
                interactive=False, elem_id="msg-input", autofocus=True,
            )

        gr.HTML("<div class='input-footer'>ChatGPT Clone puede cometer errores. Verificá la información importante.</div>")

        # ── EVENTS ──

        connect_btn.click(
            fn=connect_api, inputs=[api_key_input],
            outputs=[status_html, conv_radio, chatbot, msg_input],
        )
        api_key_input.submit(
            fn=connect_api, inputs=[api_key_input],
            outputs=[status_html, conv_radio, chatbot, msg_input],
        )

        new_chat_btn.click(
            fn=new_conversation,
            outputs=[conv_radio, chatbot, msg_input],
        )

        # NAVEGACIÓN ENTRE CHATS: usa el .change() nativo del Radio
        conv_radio.change(
            fn=select_conversation,
            inputs=[conv_radio],
            outputs=[chatbot, msg_input],
        )

        delete_btn.click(
            fn=delete_current,
            outputs=[conv_radio, chatbot, msg_input],
        )

        msg_input.submit(
            fn=user_message, inputs=[msg_input, chatbot],
            outputs=[msg_input, chatbot, conv_radio],
        ).then(
            fn=bot_response, inputs=[chatbot],
            outputs=[chatbot, conv_radio],
        )

    return app

# ── Launch ────────────────────────────────────────

app = build_app()
app.launch(debug=True, share=True)
```

----

# Actividad 2 : La IA que se programa a si misma (sin colab)

* (System Prompt) Quiero una IA que se encargue en generar codigos en python que se ejecuten en colab.
* LA IA va a gennerar codigo en python de acuerdo a la solicitud del usuario que se la da con la funcion input junto con la API key
* La IA genera un codigo en python
* Ejecutamos ese codigo en python con exec y mostramos el resultado

```python
from openai import OpenAI

system_prompt = """
Sos una IA que genera código Python para ejecutar en consola.

Reglas:
- Respondé solamente con código Python.
- No uses markdown.
- No expliques nada.
- El código debe poder ejecutarse con exec().
- Si el usuario pide mostrar algo, usá print().
"""

api_key = input("Ingresá tu API KEY de Groq: ")

solicitud = input("¿Qué código querés que genere la IA?: ")

client = OpenAI(
    api_key=api_key,
    base_url="https://api.groq.com/openai/v1"
)

messages = [
    {"role": "system", "content": system_prompt},
    {"role": "user", "content": solicitud}
]

response = client.chat.completions.create(
    model="llama-3.3-70b-versatile",
    messages=messages
)

codigo_generado = response.choices[0].message.content

print("\n===== CÓDIGO GENERADO =====\n")
print(codigo_generado)

print("\n===== RESULTADO DE LA EJECUCIÓN =====\n")

exec(codigo_generado)
```

# Actividad 3 : Aventura Interactiva (sin Gradio)

* Quiero que la IA me genere una historia.
* Luego que al final de la seccion me de opciones a) b) c)
* El usuario informa una de las alternativas. Si dice una que no habia dado la IA que la ia diga que esa una alternativa valida y vuelva a dar las opciones
* Algunas opciones me conducen a la muerte y me hace un relato de como termina la historia
* La historia dura 5 interacciones y si no llega a la muerte el usuario se encuentra con un final feliz
* Una aventura interactiva genera por la IA

# Actividad 3 : Laberinto interactivo (sin Gradio)

* Pedir a la IA que genere un laberinto en ASCII  de 20 x 20 
* El Jugador se representa con una &
* La Salida con una S
* El jugador le dice a la IA para donde se mueve (arriba, abajo , derecha, izquierda)
* La IA genera nuevamente el dibujo del laberinto
* Si el jugador no se puede mover para donde indica la IA se vuelve a redibujar el laberinto como estaba
