# Clase Treina y uno - 24 de junio del 2026

# Repaso

* Usar el LM studio con una IA Local
* Busquedas Semanticas VS Busquedas Textuales
* RAG
    * (Texto) ---->  (Modelo de Embedings)  -----> (Vector : Enbedings)
    * A Dos embedings se le puede calcular una distancia entre si
    * Base de datos de Embedigns
        * PineCone
        * ChromaDB

---

# Colab de la clase

* https://colab.research.google.com/drive/1SmoYN1lYYHs3TLEdCXIHVxDhozWr3ezw?usp=sharing

---

# Tipos De modelos de Embedigas

* Local / Open Source
    * all-MiniLM-L6-v2
    * https://huggingface.co/sentence-transformers/all-MiniLM-L6-v2
* Por Api Key / OS o Propietario
    * https://developers.openai.com/api/docs/models/all
      * Fijarse los modelos de Embedigs

> [!NOTE]
> Un mismo texto codificado como embeding con dos modelos distintos dan dos vectores completamente distinto (en longitud como en valores)

## Conceptos de Embbedings

* Calculo del vector
   * Para que un modelo de embedings calcule el vector primero tuvo que ser entrenado con un conjunto grande de datos
   * A partir del entrenamiento el modelo aprende a calcular el vector
   * Arma un mapa conceptual

### Distancia Coseno
   
* Indica qué tan parecidos son dos vectores comparando el ángulo entre ellos, sin importar demasiado su magnitud.

<img width="409" height="153" alt="image" src="https://github.com/user-attachments/assets/285e07b8-5acd-4b21-919e-b37cb2306f92" />

| Similaridad coseno | Interpretación                     |
| ------------------ | ---------------------------------- |
| 0.95               | Prácticamente el mismo significado |
| 0.85               | Muy relacionado                    |
| 0.75               | Relacionado                        |
| 0.60               | Algo relacionado                   |
| 0.40               | Poco relacionado                   |
| < 0.20             | Casi sin relación                  |

### topk

* Una técnica para quedarse con los K elementos más relevantes según alguna métrica (por ejemplo, similitud coseno).

---

# Programando con Embedings

* Mi lista de documentos
  
```python
documentos = [
    "Python es un lenguaje de programacion de alto nivel",
    "Python se utiliza en una amploa variedad de aplicaciones",
    "Doland Trump ataca Bolivia y se hace con el control de Sudamerica"m
    "Los animales son buenos"
]
```

* Crear el modelo  (Se demora porque tiene que descargar el modelo de HF a local)

```python
from sentence_transformers import SentenceTransformer

model = SentenceTransformer('sentence-transformers/all-MiniLM-L6-v2')
```

* Convertimos los documentos en vectores

```python
embeddings = model.encode(documentos)
```

* Exploramos los vectores generados

```python
# print(embeddings)
# print(embeddings[0])
print(len(embeddings[0]))
```

* Entendiendo la distancia coseno

```
from sentence_transformers import util

# El primero y el segundo los dos hablan de python. Resultado 0.7
distancia = util.cos_sim(embeddings[0], embeddings[1])[0]
print(distancia)

# El primero es de python y el tercero es de politica. Resultado 0.07 (Mas distintos)
distancia = util.cos_sim(embeddings[0], embeddings[2])[0]
print(distancia)

# El primero es de python y el cuarto es de animales. Resultado 0.04 (MAs distintos)
distancia = util.cos_sim(embeddings[0], embeddings[3])[0]
print(distancia)

# Comparamos con el mismo. Es 1
distancia = util.cos_sim(embeddings[0], embeddings[0])
print(distancia)
```


* Distancia coseno con documento mio

```python
import torch

documento_nuevo = "Python es un lenguaje de programacion"
embeding_documento_nuevo = model.encode(documento_nuevo)

#print(embeding_documento_nuevo)

# El primero es de python y el cuarto es de animales. Resultado 0.04 (MAs distintos)
similitudes = util.cos_sim(embeding_documento_nuevo, embeddings)[0]
print(similitudes)

indice_mas_cercano = torch.topk(similitudes, 2).indices
print(indice_mas_cercano)

```

* Ejercicio para ver el documento mas parecido a lo que ingresa el usuario (version de Santiago)

```
texto_usuario = input("Por favor, introduce un texto para encontrar el documento más parecido: ")

embedding_texto_usuario = model.encode(texto_usuario)

similitudes_usuario = util.cos_sim(embedding_texto_usuario, embeddings)[0]

indice_mas_cercano_usuario = torch.topk(similitudes_usuario, 1).indices.item()

documento_mas_parecido = documentos[indice_mas_cercano_usuario]

print(f"El texto más parecido en la lista de documentos es: '{documento_mas_parecido}'")
print(f"Con una similitud de: {similitudes_usuario[indice_mas_cercano_usuario].item():.4f}")
```

### Bonus Track.

* Visualizacion de similitud de conceptos (version Julian)

```python
!pip install sentence-transformers scikit-learn matplotlib adjustText networkx gradio

# ============================================================
# 🧠 GRAFO SEMÁNTICO INTERACTIVO — GRADIO
# ============================================================

from sentence_transformers import SentenceTransformer
from sklearn.decomposition import PCA
from sklearn.preprocessing import normalize
from sklearn.metrics.pairwise import cosine_similarity
import matplotlib.pyplot as plt
import matplotlib.patches as mpatches
import matplotlib.cm as cm
import matplotlib.colors as mcolors
import numpy as np
import networkx as nx
from adjustText import adjust_text
import gradio as gr
import pandas as pd

# ------------------------------------------------------------
# 1. MODELO (se carga una sola vez al iniciar)
# ------------------------------------------------------------
print("⏳ Cargando modelo...")
modelo = SentenceTransformer('all-MiniLM-L6-v2')
print("✅ Modelo listo!")

IDEAS_DEFAULT = [
    "Python es fácil de aprender",
    "JavaScript corre en el navegador",
    "Rust es extremadamente rápido y seguro",
    "Las redes neuronales imitan el cerebro",
    "El machine learning aprende de datos",
    "Los embeddings representan texto como vectores",
    "Docker empaqueta aplicaciones en contenedores",
    "Una API REST expone datos por HTTP",
    "SQL se usa para consultar bases de datos",
    "MongoDB guarda documentos en formato JSON",
]

COLOR_INICIAL = "#4A90D9"
COLOR_NUEVA   = "#E05C5C"

# Estado global mutable
estado = {
    "ideas": IDEAS_DEFAULT.copy(),
    "nuevas": set()
}

# ------------------------------------------------------------
# 2. FUNCIÓN: GENERA EL GRAFO + TABLA DE DISTANCIAS
# ------------------------------------------------------------
def generar_visualizacion(umbral):

    ideas    = estado["ideas"]
    nuevas   = estado["nuevas"]

    if len(ideas) < 3:
        fig, ax = plt.subplots(figsize=(8, 5))
        ax.text(0.5, 0.5, "⚠️ Agregá al menos 3 ideas",
                ha='center', va='center', fontsize=14, color='white')
        ax.set_facecolor('#0F1117')
        fig.patch.set_facecolor('#0F1117')
        return fig, pd.DataFrame(), ""

    # ---- Embeddings ----
    vectores  = modelo.encode(ideas)
    vectores  = normalize(vectores)
    sim_matrix = cosine_similarity(vectores)

    # ---- PCA 2D ----
    pca      = PCA(n_components=2, random_state=42)
    coords   = pca.fit_transform(vectores)
    varianza = pca.explained_variance_ratio_
    posiciones = {idea: (coords[i][0], coords[i][1]) for i, idea in enumerate(ideas)}

    # ---- Grafo ----
    G = nx.Graph()
    G.add_nodes_from(ideas)
    for i in range(len(ideas)):
        for j in range(i + 1, len(ideas)):
            score = sim_matrix[i][j]
            if score >= umbral:
                G.add_edge(ideas[i], ideas[j], weight=score)

    # ---- Plot ----
    fig, ax = plt.subplots(figsize=(16, 10))
    fig.patch.set_facecolor('#0F1117')
    ax.set_facecolor('#0F1117')
    ax.grid(color='#2a2a3a', linestyle='--', linewidth=0.5, alpha=0.4)
    ax.set_axisbelow(True)

    # -- Aristas --
    edge_list = [(u, v) for u, v, d in G.edges(data=True)]
    pesos     = [d['weight'] for u, v, d in G.edges(data=True)]

    if edge_list:
        pesos_arr  = np.array(pesos)
        pesos_norm = (pesos_arr - pesos_arr.min()) / (pesos_arr.max() - pesos_arr.min() + 1e-9)
        cmap       = cm.get_cmap('cool')
        colores_e  = [cmap(p) for p in pesos_norm]
        grosores   = [1.5 + 5.0 * p for p in pesos_norm]

        nx.draw_networkx_edges(
            G, posiciones, ax=ax,
            edgelist=edge_list,
            edge_color=colores_e,
            width=grosores,
            alpha=0.75
        )

        # Score sobre cada arista
        edge_labels = {(u, v): f"{d['weight']:.2f}" for u, v, d in G.edges(data=True)}
        nx.draw_networkx_edge_labels(
            G, posiciones, ax=ax,
            edge_labels=edge_labels,
            font_size=6.5,
            font_color='#dddddd',
            bbox=dict(boxstyle='round,pad=0.2', facecolor='#1a1a2e', alpha=0.7, edgecolor='none')
        )

    # -- Nodos --
    colores_nodos = [COLOR_NUEVA if idea in nuevas else COLOR_INICIAL for idea in G.nodes()]
    nx.draw_networkx_nodes(
        G, posiciones, ax=ax,
        node_color=colores_nodos,
        node_size=700,
        alpha=0.95,
        edgecolors='white',
        linewidths=0.9
    )

    # -- Etiquetas de nodos --
    textos = []
    for idea, (x, y) in posiciones.items():
        color = COLOR_NUEVA if idea in nuevas else COLOR_INICIAL
        t = ax.text(
            x, y + 0.025, idea,
            fontsize=7.5, color='white', ha='center',
            fontfamily='monospace',
            bbox=dict(boxstyle='round,pad=0.3', facecolor=color, alpha=0.35, edgecolor='none'),
            zorder=5
        )
        textos.append(t)
    adjust_text(textos, ax=ax, expand_points=(2.0, 2.0))

    # -- Colorbar --
    if edge_list:
        sm = cm.ScalarMappable(
            cmap=cm.get_cmap('cool'),
            norm=plt.Normalize(vmin=min(pesos), vmax=max(pesos))
        )
        sm.set_array([])
        cbar = plt.colorbar(sm, ax=ax, shrink=0.45, pad=0.02)
        cbar.set_label('Similitud coseno', color='white', fontsize=9)
        cbar.ax.yaxis.set_tick_params(color='white')
        plt.setp(cbar.ax.yaxis.get_ticklabels(), color='white', fontsize=8)
        cbar.outline.set_edgecolor('#444')

    # -- Leyenda --
    leyenda = [
        mpatches.Patch(color=COLOR_INICIAL, label="💡 Ideas iniciales"),
        mpatches.Patch(color=COLOR_NUEVA,   label="🆕 Ideas nuevas"),
    ]
    ax.legend(handles=leyenda, loc='lower left', framealpha=0.2,
              labelcolor='white', facecolor='#1a1a2e', edgecolor='#444', fontsize=9)

    ax.set_title(
        f"🧠 Grafo Semántico  ·  {len(ideas)} ideas  ·  {len(edge_list)} conexiones  ·  umbral ≥ {umbral:.2f}",
        color='white', fontsize=13, fontweight='bold', pad=15
    )
    ax.set_xlabel(f"PC1 ({varianza[0]:.1%} varianza)", color='#aaaaaa', fontsize=9)
    ax.set_ylabel(f"PC2 ({varianza[1]:.1%} varianza)", color='#aaaaaa', fontsize=9)
    ax.tick_params(colors='#555555')
    for spine in ax.spines.values():
        spine.set_edgecolor('#2a2a3a')

    plt.tight_layout()

    # ---- Tabla de distancias (TODOS los pares) ----
    # Matriz completa NxN como DataFrame
    etiquetas_cortas = [f"#{i+1}" for i in range(len(ideas))]
    df_matriz = pd.DataFrame(
        np.round(sim_matrix, 3),
        index=[f"#{i+1} {idea[:28]}…" if len(idea) > 28 else f"#{i+1} {idea}" for i, idea in enumerate(ideas)],
        columns=etiquetas_cortas
    )

    # ---- Top 10 pares más similares ----
    pares = []
    for i in range(len(ideas)):
        for j in range(i + 1, len(ideas)):
            pares.append({
                "Score 🎯": round(float(sim_matrix[i][j]), 4),
                "Idea A 💡": ideas[i],
                "Idea B 💡": ideas[j],
                "Conexión": "🟢 Conectadas" if sim_matrix[i][j] >= umbral else "⚪ Sin conexión"
            })
    pares.sort(key=lambda x: x["Score 🎯"], reverse=True)
    df_top = pd.DataFrame(pares[:15])

    # ---- Stats ----
    scores_todos = [sim_matrix[i][j] for i in range(len(ideas)) for j in range(i+1, len(ideas))]
    stats = (
        f"📊 **Stats generales**\n"
        f"- Ideas en el mapa: **{len(ideas)}**\n"
        f"- Pares totales: **{len(scores_todos)}**\n"
        f"- Similitud promedio: **{np.mean(scores_todos):.4f}**\n"
        f"- Similitud máxima: **{max(scores_todos):.4f}**\n"
        f"- Similitud mínima: **{min(scores_todos):.4f}**\n"
        f"- Conexiones activas (≥{umbral:.2f}): **{len(edge_list)}**"
    )

    return fig, df_top, stats, df_matriz

# ------------------------------------------------------------
# 3. FUNCIONES DE CONTROL
# ------------------------------------------------------------
def agregar_idea(nueva_idea, umbral):
    nueva_idea = nueva_idea.strip()
    if not nueva_idea:
        return generar_visualizacion(umbral) + ("⚠️ Escribí algo primero.",)
    if nueva_idea in estado["ideas"]:
        return generar_visualizacion(umbral) + (f"⚠️ '{nueva_idea}' ya existe.",)

    estado["ideas"].append(nueva_idea)
    estado["nuevas"].add(nueva_idea)
    fig, df_top, stats, df_matriz = generar_visualizacion(umbral)
    return fig, df_top, stats, df_matriz, f"✅ '{nueva_idea}' agregada al grafo."

def eliminar_idea(idea_a_borrar, umbral):
    if idea_a_borrar not in estado["ideas"]:
        return generar_visualizacion(umbral) + (f"⚠️ No existe '{idea_a_borrar}'.",)
    if len(estado["ideas"]) <= 3:
        return generar_visualizacion(umbral) + ("⚠️ Necesitás al menos 3 ideas.",)

    estado["ideas"].remove(idea_a_borrar)
    estado["nuevas"].discard(idea_a_borrar)
    fig, df_top, stats, df_matriz = generar_visualizacion(umbral)
    return fig, df_top, stats, df_matriz, f"🗑️ '{idea_a_borrar}' eliminada."

def resetear(umbral):
    estado["ideas"] = IDEAS_DEFAULT.copy()
    estado["nuevas"] = set()
    fig, df_top, stats, df_matriz = generar_visualizacion(umbral)
    return fig, df_top, stats, df_matriz, "🔄 Reseteado al estado inicial."

def actualizar_umbral(umbral):
    fig, df_top, stats, df_matriz = generar_visualizacion(umbral)
    return fig, df_top, stats, df_matriz, ""

def lista_ideas():
    return "\n".join([f"{'🆕' if idea in estado['nuevas'] else '💡'} {idea}" for idea in estado["ideas"]])

# ------------------------------------------------------------
# 4. INTERFAZ GRADIO
# ------------------------------------------------------------
with gr.Blocks(
    theme=gr.themes.Base(
        primary_hue="blue",
        neutral_hue="slate",
    ),
    title="🧠 Grafo Semántico",
    css="""
        .gradio-container { background: #0F1117 !important; }
        .gr-panel { background: #1a1a2e !important; }
        footer { display: none !important; }
    """
) as app:

    gr.Markdown("""
    # 🧠 Grafo Semántico Interactivo
    > Visualizá cómo se relacionan tus ideas según su **similitud semántica** usando embeddings de IA.
    > Las líneas entre nodos muestran la **distancia coseno** entre cada par de ideas.
    """)

    with gr.Row():

        # ---- Panel izquierdo: controles ----
        with gr.Column(scale=1, min_width=280):

            gr.Markdown("### ⚙️ Controles")

            umbral_slider = gr.Slider(
                minimum=0.0, maximum=1.0, value=0.4, step=0.05,
                label="🔗 Umbral de conexión (similitud coseno mínima)",
                info="↑ Subilo para ver solo las conexiones más fuertes"
            )

            gr.Markdown("---")
            gr.Markdown("### ➕ Agregar idea")
            input_nueva = gr.Textbox(
                placeholder="Ej: Kubernetes orquesta contenedores...",
                label="Nueva idea",
                lines=2
            )
            btn_agregar = gr.Button("➕ Agregar al grafo", variant="primary")

            gr.Markdown("---")
            gr.Markdown("### 🗑️ Eliminar idea")
            input_borrar = gr.Textbox(
                placeholder="Escribí exactamente la idea a eliminar...",
                label="Idea a eliminar",
                lines=2
            )
            btn_eliminar = gr.Button("🗑️ Eliminar", variant="stop")

            gr.Markdown("---")
            btn_reset = gr.Button("🔄 Resetear todo", variant="secondary")

            gr.Markdown("---")
            gr.Markdown("### 📋 Ideas actuales")
            lista_output = gr.Textbox(
                value=lista_ideas(),
                label="",
                lines=12,
                interactive=False
            )
            btn_lista = gr.Button("🔃 Actualizar lista", size="sm")

            msg_output = gr.Markdown("")

        # ---- Panel derecho: visualización ----
        with gr.Column(scale=3):

            grafo_output = gr.Plot(label="🕸️ Grafo Semántico")

            with gr.Tabs():

                with gr.Tab("🏆 Top 15 pares más similares"):
                    tabla_top = gr.Dataframe(
                        label="",
                        wrap=True,
                        interactive=False
                    )

                with gr.Tab("📐 Matriz de similitud completa"):
                    gr.Markdown("> Cada celda muestra la **similitud coseno** entre el par de ideas correspondiente. `1.0` = idénticas, `0.0` = sin relación.")
                    tabla_matriz = gr.Dataframe(
                        label="",
                        wrap=False,
                        interactive=False
                    )

                with gr.Tab("📊 Stats"):
                    stats_output = gr.Markdown("")

    # ---- Carga inicial ----
    fig_init, df_top_init, stats_init, df_mat_init = generar_visualizacion(0.4)
    grafo_output.value  = fig_init
    tabla_top.value     = df_top_init
    stats_output.value  = stats_init
    tabla_matriz.value  = df_mat_init

    # ---- Eventos ----
    outputs = [grafo_output, tabla_top, stats_output, tabla_matriz, msg_output]

    btn_agregar.click(
        agregar_idea,
        inputs=[input_nueva, umbral_slider],
        outputs=outputs
    )
    input_nueva.submit(
        agregar_idea,
        inputs=[input_nueva, umbral_slider],
        outputs=outputs
    )
    btn_eliminar.click(
        eliminar_idea,
        inputs=[input_borrar, umbral_slider],
        outputs=outputs
    )
    btn_reset.click(
        resetear,
        inputs=[umbral_slider],
        outputs=outputs
    )
    umbral_slider.release(
        actualizar_umbral,
        inputs=[umbral_slider],
        outputs=outputs
    )
    btn_lista.click(lista_ideas, outputs=[lista_output])

# ------------------------------------------------------------
# 5. LANZAR LA APP
# ------------------------------------------------------------
app.launch(share=True, debug=False)
```
