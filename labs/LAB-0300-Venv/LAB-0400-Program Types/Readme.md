# Laboratorio — Tipos de aplicaciones que se pueden crear con Python

## 🎯 Objetivo

En este laboratorio vamos a explorar los **distintos tipos de aplicaciones** que pueden desarrollarse utilizando Python.

Python es un lenguaje extremadamente versátil que permite crear desde simples programas de consola hasta aplicaciones web, APIs, interfaces gráficas, aplicaciones móviles y videojuegos.

En este laboratorio aprenderás:

* Qué **tipos de aplicaciones** pueden desarrollarse con Python
* Cómo crear un **entorno virtual para cada proyecto**
* Cómo instalar librerías con **pip**
* Cómo utilizar **IA para generar código inicial**
* Qué librerías se utilizan comúnmente para cada tipo de aplicación

---

# Actividad 1 — Aplicación de consola

Las aplicaciones de consola son programas que se ejecutan en la terminal y muestran resultados mediante texto.

### Crear entorno virtual

```bash
python -m venv venv_consola
```

Activar entorno (Windows):

```bash
venv_consola\Scripts\activate
```

Resultado esperado:

```
(venv_consola) C:\proyecto>
```

Las aplicaciones de consola **no requieren librerías externas**. Python incluye todo lo necesario.

---

### Prompt utilizado para generar el código con IA

```
Create a simple Python console application that asks the user for their name and prints a greeting message.
```

### Posible respuesta generada por la IA

```python
nombre = input("Ingrese su nombre: ")

print("Hola", nombre, "bienvenido a Python")
```

Resultado esperado:

```
Ingrese su nombre: Ana
Hola Ana bienvenido a Python
```

Este es el tipo de aplicación más simple que puede crearse en Python.
Se ejecuta directamente en la terminal y es muy utilizada para **scripts, automatización y herramientas internas**.

---

# Actividad 2 — Aplicación de escritorio

Las aplicaciones de escritorio permiten crear **interfaces gráficas** con ventanas, botones y campos de texto.

### Crear entorno virtual

```bash
python -m venv venv_escritorio
```

Activar entorno:

```bash
venv_escritorio\Scripts\activate
```

Resultado esperado:

```
(venv_escritorio) C:\proyecto>
```

La librería **tkinter** generalmente viene incluida con Python.

---

### Prompt utilizado para generar el código con IA

```
Create a simple desktop application in Python using tkinter that shows a window with a button and a message.
```

### Posible respuesta generada por la IA

```python
import tkinter as tk

def saludar():
    print("Hola desde la ventana")

ventana = tk.Tk()
ventana.title("Mi aplicación")

boton = tk.Button(ventana, text="Saludar", command=saludar)
boton.pack()

ventana.mainloop()
```

Resultado esperado:

```
Se abre una ventana con un botón llamado "Saludar"
```

Cuando el usuario hace clic en el botón se ejecuta la función asociada.
Este tipo de aplicaciones se utiliza para **herramientas internas, utilidades y software de escritorio**.

---

# Actividad 3 — API con Flask

Una API permite que distintos sistemas se comuniquen mediante **peticiones HTTP**.

### Crear entorno virtual

```bash
python -m venv venv_api
```

Activar entorno:

```bash
venv_api\Scripts\activate
```

Instalar Flask:

```bash
pip install flask
```

Resultado esperado:

```
Successfully installed flask
```

---

### Prompt utilizado para generar el código con IA

```
Create a simple REST API in Python using Flask with one endpoint that returns a JSON message.
```

### Posible respuesta generada por la IA

```python
from flask import Flask, jsonify

app = Flask(__name__)

@app.route("/mensaje")
def mensaje():
    return jsonify({"mensaje": "Hola desde la API"})

app.run()
```

Resultado esperado:

```
Running on http://127.0.0.1:5000
```

Si abrimos en el navegador:

```
http://127.0.0.1:5000/mensaje
```

Obtendremos:

```
{"mensaje": "Hola desde la API"}
```

Las APIs son muy utilizadas para **backends de aplicaciones web, móviles y sistemas distribuidos**.

---

# Actividad 4 — Aplicación web con Streamlit

Streamlit permite crear aplicaciones web de forma rápida utilizando solo Python.

### Crear entorno virtual

```bash
python -m venv venv_streamlit
```

Activar entorno:

```bash
venv_streamlit\Scripts\activate
```

Instalar Streamlit:

```bash
pip install streamlit
```

Resultado esperado:

```
Successfully installed streamlit
```

---

### Prompt utilizado para generar el código con IA

```
Create a simple Streamlit app in Python that displays a title and a button.
```

### Posible respuesta generada por la IA

```python
import streamlit as st

st.title("Mi primera app")

if st.button("Saludar"):
    st.write("Hola desde Streamlit")
```

Ejecutar la aplicación:

```bash
streamlit run app.py
```

Resultado esperado:

```
Se abre una aplicación web en el navegador
```

Streamlit se utiliza mucho para **dashboards, aplicaciones de datos y prototipos rápidos**.

---

# Actividad 5 — Interfaz para modelos de IA con Gradio

Gradio permite crear interfaces web simples para interactuar con modelos de IA.

### Crear entorno virtual

```bash
python -m venv venv_gradio
```

Activar entorno:

```bash
venv_gradio\Scripts\activate
```

Instalar Gradio:

```bash
pip install gradio
```

Resultado esperado:

```
Successfully installed gradio
```

---

### Prompt utilizado para generar el código con IA

```
Create a simple Gradio interface in Python that takes a name as input and returns a greeting.
```

### Posible respuesta generada por la IA

```python
import gradio as gr

def saludar(nombre):
    return "Hola " + nombre

app = gr.Interface(fn=saludar, inputs="text", outputs="text")

app.launch()
```

Resultado esperado:

```
Se abre una interfaz web en el navegador
```

Gradio se utiliza ampliamente para **interfaces de modelos de inteligencia artificial**.

---

# Actividad 6 — Aplicación móvil con Kivy

Kivy es un framework que permite desarrollar **aplicaciones móviles y multitouch** utilizando Python.

### Crear entorno virtual

```bash
python -m venv venv_mobile
```

Activar entorno:

```bash
venv_mobile\Scripts\activate
```

Instalar Kivy:

```bash
pip install kivy
```

Resultado esperado:

```
Successfully installed kivy
```

---

### Prompt utilizado para generar el código con IA

```
Create a simple mobile style application using Python and Kivy with a button.
```

### Posible respuesta generada por la IA

```python
from kivy.app import App
from kivy.uix.button import Button

class MiApp(App):
    def build(self):
        return Button(text="Hola desde Kivy")

MiApp().run()
```

Resultado esperado:

```
Se abre una ventana con un botón
```

Kivy permite crear aplicaciones que pueden ejecutarse en **Android, iOS, Windows, Linux y macOS**.

---

# Actividad 7 — Videojuego con Pygame

Python también puede utilizarse para crear videojuegos.

### Crear entorno virtual

```bash
python -m venv venv_juego
```

Activar entorno:

```bash
venv_juego\Scripts\activate
```

Instalar Pygame:

```bash
pip install pygame
```

Resultado esperado:

```
Successfully installed pygame
```

---

### Prompt utilizado para generar el código con IA

```
Create a very simple game window using pygame that opens a window with a title.
```

### Posible respuesta generada por la IA

```python
import pygame

pygame.init()

pantalla = pygame.display.set_mode((600, 400))
pygame.display.set_caption("Mi juego")

running = True

while running:
    for evento in pygame.event.get():
        if evento.type == pygame.QUIT:
            running = False

pygame.quit()
```

Resultado esperado:

```
Se abre una ventana llamada "Mi juego"
```

Pygame es una librería muy utilizada para **aprender desarrollo de videojuegos** con Python.

---

# Conclusiones

Al finalizar este laboratorio el alumno pudo observar que Python permite desarrollar **muchos tipos diferentes de aplicaciones**.

También aprendió a crear **entornos virtuales** para aislar dependencias y a instalar librerías utilizando **pip**.

Finalmente, el alumno pudo comprobar cómo herramientas de **inteligencia artificial pueden ayudar a generar código inicial** para distintos tipos de proyectos, acelerando el proceso de desarrollo.
