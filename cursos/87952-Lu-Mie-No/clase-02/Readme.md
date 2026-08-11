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

### Inteprete de codigo en ChatGPT

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

### Inteprete de codigo en Claude

```
Quiero que uses el interprete de codigo para generarme un grafico de lineas  en matplotlib donde se muestre el valor de la accion de nvidia y msft en un mismo grafico
```

* Genero el siguiente grafico:

<img width="1500" height="900" alt="image" src="https://github.com/user-attachments/assets/514cd668-8332-4792-a07a-0bcd89522f2c" />

### En Quen

... Se animan a probarlo ustedes en qwen

---

 # Github

 * Ustedes crearon el REPO

 * Verificar si tienen el comando git instalado

```
git --version
```

* El que no lo tiene instlado lo instala de...

> https://git-scm.com/install/windows
> Luego ejecuta los compandos
> git config --global user.email "you@example.com"
> git config --global user.name "Your Name"


* Crear un carpeta localmente para bajar una copia del repositorio

* Bajar el repositorio demoto localmente

```
>git clone https://github.com/estebancalabria/demo-prueba
```

> [!WARN]
> A mi me dice: warning: You appear to have cloned an empty repository. Me creo la carpeta pero esta vacía
si porque todavia no creaste ningun archivo, es solo la carpeta

* Eso creo la carpeta demo-prueba (Creo una carpeta con el nombre del repositorio)

```
cd demo-prubea
```

> [!NOTE]
> Podes poner cd dem[TAB] el tabulador va auto completando las carpetas

* Van a crear una subcarpeta que se llame clase-01, la idea es que cada clase creen una carpeta y le vayan subiendo contenido de lo que vimos esa clase libremente

```
md clase-02
```

* Nos bajamos el notebook de python del colab y lo copiamos a esa carpeta

* Agregar los archivos an repositorio local (no lo subimos a internet todavia)
* Parados en la carpeta raiz del repositorio

```
>git add *
warning: LF will be replaced by CRLF in clase-02/87952_BOOTCAMP_CLASE_02.ipynb.
The file will have its original line endings in your working directory

>git commit -m "Mi primer commit"
[main (root-commit) f559b47] Mi primer commit
 1 file changed, 126 insertions(+)
 create mode 100644 clase-02/87952_BOOTCAMP_CLASE_02.ipynb
```

* Podemos ver la lista de commit

```
git log
```

* Subir todo a internet (Al repositorio remoto, a github)

```
> git push
```

* Ahora si me fijo la carpeta los cambios estan in internet

 ---

 # Aportes

 ## Prompt de Guido para UI

* Ver prompt guido

--- 

# Proxima Clase

* Hablar de modelos de lenguaje y como compararlos (Arena / lmstats)
* Modelos Open Source
* HTTP
* Lenguajes de programacion
