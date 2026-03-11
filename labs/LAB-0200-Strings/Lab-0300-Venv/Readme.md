# Laboratorio — Entornos virtuales y gestión de paquetes con `pip`

## 🎯 Objetivo

En este laboratorio vamos a aprender cómo crear **entornos virtuales en Python** y cómo instalar librerías utilizando **pip**.

Los entornos virtuales permiten aislar las dependencias de un proyecto para evitar conflictos entre versiones de librerías.

En este laboratorio aprenderás:

* Qué es un **entorno virtual**
* Cómo crear un entorno virtual con **`venv`**
* Cómo **activar** un entorno virtual
* Cómo instalar librerías con **`pip install`**
* Cómo ver las librerías instaladas con **`pip list`**
* Cómo generar un archivo **`requirements.txt`**

---

# Actividad 1 — Verificando Python y pip

Antes de comenzar, podemos verificar que Python y pip están instalados.

```bash
python --version
pip --version
```

Resultado esperado (ejemplo):

```
Python 3.12.1
pip 23.3.1 from .../site-packages/pip
```

Python incluye el gestor de paquetes **pip**, que permite instalar librerías externas desde el repositorio oficial **PyPI (Python Package Index)**.

---

# Actividad 2 — Creando un entorno virtual

Python incluye el módulo **venv** para crear entornos virtuales.

```bash
python -m venv mi_entorno
```

Resultado esperado (ejemplo):

```
(se crea una carpeta llamada mi_entorno)
```

Este comando crea un entorno virtual dentro de la carpeta **mi_entorno**.
Dentro de esa carpeta se almacenará una instalación aislada de Python y las librerías del proyecto.

---

# Actividad 3 — Activando el entorno virtual

Para utilizar el entorno virtual debemos **activarlo**.

En Windows:

```bash
mi_entorno\Scripts\activate
```

En Linux o macOS:

```bash
source mi_entorno/bin/activate
```

Resultado esperado (ejemplo):

```
(mi_entorno) C:\proyecto>
```

Cuando el entorno está activo, el nombre del entorno aparece al comienzo del prompt de la terminal.
Esto indica que las librerías que instalemos se instalarán **solo dentro de ese entorno**.

---

# Actividad 4 — Instalando una librería con pip

Ahora instalaremos una librería externa.

```bash
pip install requests
```

Resultado esperado (fragmento):

```
Collecting requests
Installing collected packages: requests
Successfully installed requests
```

El comando **pip install** descarga e instala paquetes desde **PyPI**, el repositorio oficial de librerías de Python.

---

# Actividad 5 — Ver las librerías instaladas

Podemos ver qué paquetes están instalados en el entorno usando `pip list`.

```bash
pip list
```

Resultado esperado (ejemplo):

```
Package    Version
---------- -------
requests   2.31.0
pip        23.3.1
```

Este comando muestra todas las librerías instaladas dentro del entorno virtual activo.

---

# Actividad 6 — Usando la librería instalada

Ahora podemos usar la librería instalada desde Python.

```python
import requests

respuesta = requests.get("https://api.github.com")

print(respuesta.status_code)
```

Resultado esperado (ejemplo):

```
200
```

Esto demuestra que la librería instalada con **pip** puede utilizarse inmediatamente dentro del entorno virtual.

---

# Actividad 7 — Generando un archivo `requirements.txt`

Podemos guardar las dependencias del proyecto en un archivo.

```bash
pip freeze > requirements.txt
```

Resultado esperado (ejemplo):

```
(se crea el archivo requirements.txt)
```

Contenido típico del archivo:

```
requests==2.31.0
```

El archivo **requirements.txt** permite compartir las dependencias del proyecto para que otras personas puedan instalar exactamente las mismas librerías.

---

# Actividad 8 — Instalando dependencias desde `requirements.txt`

Si otro desarrollador recibe el proyecto, puede instalar todas las dependencias con un solo comando.

```bash
pip install -r requirements.txt
```

Resultado esperado (fragmento):

```
Installing collected packages: requests
Successfully installed requests
```

Este comando instala todas las librerías listadas en el archivo **requirements.txt**.

---

# Conclusiones

Al finalizar este laboratorio el alumno pudo comprender qué es un **entorno virtual** y por qué es importante para aislar las dependencias de un proyecto.

También aprendió a crear y activar entornos virtuales utilizando **venv**, a instalar librerías externas con **pip**, y a verificar qué paquetes están instalados en el entorno.

Finalmente, el alumno pudo generar un archivo **requirements.txt**, que permite reproducir fácilmente las dependencias de un proyecto en otras máquinas o entornos de desarrollo.
