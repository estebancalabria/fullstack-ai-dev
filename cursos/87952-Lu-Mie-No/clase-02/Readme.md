# Clase Dos - 10 de Agosto del 2026

# Repaso

* Roadmap del Curso
* Requisitos
  * Cuenta en Github
  * Cuenta en Google
  * VsCode
  * Python local
  * Seguir al profe en IG : https://www.instagram.com/mct.esteban.calabria/
* Development
  * Tiobe Index : Ranking de los lenguajes de programacio
  * Python
    * Validar la instalacion local
    * Desarrollo en Google Colab en la nube
  * Coceptos
    * Deuda Congnitiva
    * Vide Codding
* AiDev
  * Utilizamos Claude para programar (pong)
    * Uso de LLM para programar
  * Vimos que Claude Era bueno para programar
  * Generamos diagramas con Mermaid
* Arquitectura Full-Stack
  * JSON
  * API Rest

---

# Miscelaneas

* Invitamos a seguir a Abel
  * https://www.instagram.com/orion.technologies/
  * Experto en AWS
 
 ---

 # Python

## Google Colab de la clase

> https://colab.research.google.com/drive/14YkrjTCeJ7Rm_HoJm2upfa08VT8lRWHu?usp=sharing

* Ustedes creen el suyo

# Conocer Python

* Las caracteristicas del lenguaje
  * Un ecosistema enorme de liberias
  * Es un lenguaje Interpretado
  * Es muy sencillo
* La sintaxis del lenguaje
   * Palabras reservadas
   * Ahora con la IA es muy sencillo
* Las liberias
  * https://www.instagram.com/p/DPmewyVjs88/?img_index=1
  * Lo mas importante ahora que esta la IA
  * DE IA y analisis de datos
      * Sckit-learn (Machine Learning)
      * Pandas
      * MatPlotLib
        * https://matplotlib.org/
      * Gradio
  * Web
      * Framework Django
      * Flask
      * FastAPI (El nodejs/express de Python)
      * requests
      * Automatizaciones con Playwright
  * Desktop
   * Tkinter
  * Gamming
    * Pygame
  * Optimizacion
     * numpy
  * Mobile
    * Kivy
  * Pruebas
     * Pytest
   
> [NOTE]
> Algunas de estas librerias tienen integraon con google colab, otras las utilizamos localmente

## Tirando magia en python en colab

* Un programa sencillo que te saluda
  
```python
print("Bienvenidos al programa saludador")

nombre = input("Dime tu nombre y saludo: ")

print(f"Bienvenido {nombre}")
#Es lo mismo que hacer print("Bienvenido " +  nombre)
```

* Algo mas complejo usando una libreria como MatPlotLib

```
Dame un ejemplo de codigo para copiar y pegar que muestre un grafico hecho con matplotlib para sorprender a mis estudiantes que te estan viendo con el poder de esta liberia
```

* Claude me genero

```python
import matplotlib.pyplot as plt
import numpy as np

plt.style.use('dark_background')
fig = plt.figure(figsize=(14, 6))

# --- Gráfico 1: función seno con relleno y anotación ---
ax1 = fig.add_subplot(1, 2, 1)
x = np.linspace(0, 4 * np.pi, 400)
y = np.sin(x) * np.exp(-x / 10)

ax1.plot(x, y, color='cyan', linewidth=2)
ax1.fill_between(x, y, alpha=0.3, color='cyan')
ax1.set_title('Oscilación amortiguada', fontsize=14)
ax1.annotate('Pico máximo', xy=(x[np.argmax(y)], max(y)),
             xytext=(10, 0.5), arrowprops=dict(arrowstyle='->', color='white'))
ax1.grid(alpha=0.2)

# --- Gráfico 2: superficie 3D ---
ax2 = fig.add_subplot(1, 2, 2, projection='3d')
X = np.linspace(-5, 5, 100)
Y = np.linspace(-5, 5, 100)
X, Y = np.meshgrid(X, Y)
Z = np.sin(np.sqrt(X**2 + Y**2))

ax2.plot_surface(X, Y, Z, cmap='viridis', edgecolor='none')
ax2.set_title('Superficie 3D: sin(√(x²+y²))', fontsize=14)

plt.tight_layout()
plt.show()
```

* Las primeras dos lineas indica las librerias de python a utilizar

```python
import matplotlib.pyplot as plt
import numpy as np
```

* En google Colab ya estan instaladas

## Pyton y los LLM

* Los llm tipo Claude, ChatGPT, Qwen tienen un interprete de python y le podes pedir a la IA que para resolverte un prompt ejecute codigo en python y te muestre el resultado
* Tienen como un google colab Incorporado

* ChatGPT

```
Utiliza matplotlib para mostrarme un grafico de torta que muestre la poblacion de las 10 provincias mas pobaldas de argentina
```

* Hizo este grafico

<img width="810" height="790" alt="image" src="https://github.com/user-attachments/assets/46b719f3-cae2-4b2a-afb8-1b66cbf4cc55" />

* Por detras ejecuto este codigo

```
import matplotlib.pyplot as plt

provincias = [
    "Buenos Aires", "Córdoba", "Santa Fe", "Mendoza", "Tucumán",
    "Salta", "Entre Ríos", "Misiones", "Corrientes", "Chaco"
]
poblacion = [
    17523996, 3840905, 3544908, 2043540, 1757460,
    1441351, 1425578, 1278873, 1212696, 1129606
]

fig, ax = plt.subplots(figsize=(10, 8))
ax.pie(
    poblacion,
    labels=provincias,
    autopct="%1.1f%%",
    startangle=90
)
ax.set_title("Las 10 provincias más pobladas de Argentina\nCenso 2022")
plt.tight_layout()
plt.show()

```

---

 # Github

---

 # AiDev

 ---

 # Aportes

 ## Prompt de Guido para UI

* Ver prompt guido
