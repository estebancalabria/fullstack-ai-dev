# **Laboratorio: Módulos y Paquetes en Python (Importaciones completas)**

## **Objetivo**

Entender cómo organizar código en Python usando módulos y paquetes:

* Crear módulos propios
* Importar funciones, clases y variables
* Usar alias (`as`)
* Diferentes formas de import (`import`, `from ... import`)
* Entender `__name__`
* Crear paquetes (`__init__.py`)
* Imports relativos vs absolutos
* Cómo funciona `sys.path`

---

## **1️⃣ ¿Qué es un módulo?**

Un **módulo** es simplemente un archivo `.py`.

Ejemplo:

```
calculadora.py
```

---

## **2️⃣ Crear tu primer módulo**

```python id="mod1"
# calculadora.py

def sumar(a, b):
    return a + b

def restar(a, b):
    return a - b

PI = 3.1416
```

---

## **3️⃣ Importar un módulo completo**

```python id="mod2"
# main.py

import calculadora

print(calculadora.sumar(2, 3))
print(calculadora.PI)
```

---

## **4️⃣ Importar partes específicas**

```python id="mod3"
from calculadora import sumar, PI

print(sumar(5, 5))
print(PI)
```

---

## **5️⃣ Importar con alias**

```python id="mod4"
import calculadora as calc

print(calc.sumar(10, 2))
```

También:

```python id="mod5"
from calculadora import sumar as s

print(s(3, 3))
```

---

## **6️⃣ Importar TODO (no recomendado)**

```python id="mod6"
from calculadora import *

print(sumar(1, 1))
```

⚠️ Problema: puede sobrescribir nombres sin darte cuenta.

---

## **7️⃣ Ejecutar código solo si es el archivo principal**

```python id="mod7"
# calculadora.py

def sumar(a, b):
    return a + b

if __name__ == "__main__":
    print("Ejecutando pruebas...")
    print(sumar(2, 2))
```

### 🔍 Clave

* Si ejecutás `python calculadora.py` → entra al bloque
* Si lo importás → NO se ejecuta

---

## **8️⃣ Crear un paquete**

Estructura:

```
mi_app/
│
├── main.py
└── utilidades/
    ├── __init__.py
    ├── calculos.py
    └── textos.py
```

---

### **calculos.py**

```python id="mod8"
def multiplicar(a, b):
    return a * b
```

---

### **textos.py**

```python id="mod9"
def saludar(nombre):
    return f"Hola {nombre}"
```

---

## **9️⃣ Import desde paquetes**

```python id="mod10"
from utilidades.calculos import multiplicar
from utilidades.textos import saludar

print(multiplicar(3, 4))
print(saludar("Esteban"))
```

---

## **🔟 **init**.py (controlar imports del paquete)**

```python id="mod11"
# utilidades/__init__.py

from .calculos import multiplicar
from .textos import saludar
```

Ahora podés hacer:

```python id="mod12"
from utilidades import multiplicar, saludar
```

---

## **1️⃣1️⃣ Imports relativos**

Dentro de paquetes:

```python id="mod13"
# textos.py

from .calculos import multiplicar
```

Tipos:

* `.` → mismo paquete
* `..` → nivel superior

---

## **1️⃣2️⃣ Imports absolutos (recomendado)**

```python id="mod14"
from utilidades.calculos import multiplicar
```

✔ Más claro
✔ Evita errores en proyectos grandes

---

## **1️⃣3️⃣ ¿Cómo encuentra Python los módulos? (`sys.path`)**

```python id="mod15"
import sys

print(sys.path)
```

Python busca módulos en:

1. Carpeta actual
2. Variables de entorno (`PYTHONPATH`)
3. Librerías instaladas

---

## **1️⃣4️⃣ Agregar rutas manualmente**

```python id="mod16"
import sys
sys.path.append("/ruta/a/mi/modulo")

import calculadora
```

---

## **1️⃣5️⃣ Módulos estándar vs externos**

### ✔ Estándar (ya vienen con Python)

```python id="mod17"
import math
print(math.sqrt(16))
```

---

### ✔ Externos (instalados con pip)

```bash
pip install requests
```

```python id="mod18"
import requests
```

---

## **1️⃣6️⃣ Buenas prácticas**

✔ Usar imports absolutos
✔ Evitar `import *`
✔ Agrupar imports:

```python
# estándar
import os
import sys

# terceros
import requests

# propios
from utilidades.calculos import multiplicar
```

✔ Un módulo = una responsabilidad clara

---

## **1️⃣7️⃣ Ejercicio práctico**

👉 Crear esta estructura:

```
proyecto/
│
├── main.py
└── operaciones/
    ├── __init__.py
    ├── suma.py
    └── resta.py
```

---

### **suma.py**

```python
def sumar(a, b):
    return a + b
```

---

### **resta.py**

```python
def restar(a, b):
    return a - b
```

---

### ****init**.py**

```python
from .suma import sumar
from .resta import restar
```

---

### **main.py**

```python
from operaciones import sumar, restar

print(sumar(10, 5))
print(restar(10, 5))
```

---

## **Cierre**

Al final de este laboratorio aprendiste:

* Qué es un módulo y cómo crearlo
* Todas las formas de `import`
* Uso de alias
* Diferencia entre import absoluto y relativo
* Cómo funcionan los paquetes
* Uso de `__init__.py`
* Qué hace `__name__`
* Cómo Python encuentra módulos (`sys.path`)
* Buenas prácticas reales de proyectos

