# Clase Tres -11 de Marzo del 2026

# Repaso

* Git
  * Creamos el Repo
  * Comandos basicos
    * Bajar un repo : git clone <URL Repo>
    * Marcar los archivos para agregar a stagging (local) : git add *
    * Mostrar los cambios pendientes de confirmar : git status
    * Como confirmo los cambios a stagging (local) : git commit -m "Mensaje explicativo"
    * Subir las cosas al repositorio remoto (internet) : stagging -> Remoto : git push   o   git push origin main
    * Como bajo las cosas que otros subieron al repositorio remoto : git pull
* Python
  * Librerias
      * Pygame : armamos un juego con la ayuda de la IA
      * Django : Para apps web
      * Aprendimos a instalar librerias localmente : pip install <nombre de la libreria>
  * Tipos de datos Basicos en Python
* VScode
  * Extensiones
    * LiveShare
  

# Python

* Colab de la clase

> https://colab.research.google.com/drive/1xxylHwghOsgva9GNl6qwPvIrx51jJtUR?usp=sharing

# Condicionales

* Vimos el IF
* 
```python
#Importo el objeto random que ya existe en python y lo programo otro
import random

#Le pido al objeto random que me un numero entre 1 y 10
random_number = random.randint(1, 10)

if random_number > 5:
  variable  = 10
else: 
  variable = "Hola"

if isinstance(variable, int):
  print("La variable es un entero")
elif isinstance(variable, str):
  print("La variable es un string")
```

## Tipos de Datos y Objetos

* Built-in functions (son funciones que vienen con el lenguaje)
  * print
  * input
  * type
  * dir
  * isinstance
  * id

* Funciones de objetos
  * Los objetos/variables de tipo str
    * upper
    * replace
  *  Los objetos/variables de tipo int
    *  bit_length

## Operadores

* == : Compara el contenido de dos variables
* is : Dice si las dos variables son el mismo objeto

## Identidades de objetos en python

```mermaid
graph TB
    subgraph CACHE["🔒 Cache de Python (integers -5 a 256)"]
        OBJ1["Objeto int\nvalor = 1\nid: 0x1A2B"]
    end

    subgraph HEAP["🧠 Heap (integers fuera del cache)"]
        OBJ2["Objeto int\nvalor = 1000\nid: 0x3C4D"]
        OBJ3["Objeto int\nvalor = 1000\nid: 0x5E6F"]
    end

    uno["uno"] -->|"apunta a"| OBJ1
    otro_uno["otro_uno"] -->|"apunta a"| OBJ1

    mil["mil"] -->|"apunta a"| OBJ2
    otro_mil["otro_mil"] -->|"apunta a"| OBJ3

    style CACHE fill:#d4edda,stroke:#28a745
    style HEAP fill:#f8d7da,stroke:#dc3545
```

```pyton
# Curiosidad de python

uno = 1
otro_uno = 1
print(id(uno))
print(id(otro_uno))
# Da lo mismo!!! 

if uno == otro_uno:
  print("Las dos variables almacenan el mismo valor")

if uno is otro_uno:
  print("Las dos variables son el mismo objeto, son lo mismo")

mil = 1000
otro_mil = 1000
print(id(mil))
print(id(otro_mil))

if mil == otro_mil:
  print("Las dos variables almacenan el mismo valor")

if not(mil is otro_uno):
  print("Las dos variables no son el mismo objeto, son objetos distintos")

# Porque pasa esto???
# 
```

## Entornos Virtuales

## Tipos de Aplicaciones

## Para hacer 

* Pueden hacer los desafios y laboratorios del Modulo 1


