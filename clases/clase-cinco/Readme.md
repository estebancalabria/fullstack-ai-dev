# Clase Cinco - 18 de Marzo del 2026

# Repaso

* Python
  * Listas
    * []
    * Slices
    * Indices
      * Indices negativos
    * Manejo de listas
  * Liberias
    * Kivy
      * App para celu multiplataforma
* Entornos Virtuales

# Colab del dia

> https://colab.research.google.com/drive/1dXbI7yj4QNgE-IBgiUPgm1jvUvbU8Wp5?usp=sharing

# Python

## Tipos de Datos

* Tipos de datos
  * Basicos
     * int
     * float
     * str
     * complex
     * bool
  * Colecciones
     * list - []
     * tuple - ()
     * range
     * enumerate
     * set   >>>>> proximamente
     * dict  >>>>> proximamente

## Tuplas

* Se usan las listas cuando los datos cambian y las tuplas cuando los datos son fijos

```python
tuplin = (1,2,3,4)
tupla_con_objeto = tuple([1,2]) #Esto es valido pero no se usa nunca
listin = [1,2,3,4]

# Se puede acceder por elemento, son iguales que las listas.... por ahora...
print(tuplin[0])
print(tuplin[1])
print(tuplin[-1])

#peeeeeeeeeeeeeerooooo.... las tuplas son inmutables
try:
  tuplin[1] = 3
except:
  print("Las tuplas son inmutables, no se puede cambiar")


lista_unico_elemento = [1]
#En python el parentesis tiene una doble funcion, ojo. Es para separar terminos y para definir tuplas
#tupla_unico_elemento = (1)
tupla_unico_elemento = (1,)  #Esta tupla tiene un solo valor pero la tengo que escribir asi para que la interprete como tupla

print(type(lista_unico_elemento))
print(type(tupla_unico_elemento))
print(len(tupla_unico_elemento))

try:
  tupla_unico_elemento[1]
except:
  print("Me fui de rango")
```

* Funcionan como las listas a excepcion que no se pueden modificar

```python
tuplin = (1,2,3,4)
tupla_con_objeto = tuple([1,2]) #Esto es valido pero no se usa nunca
listin = [1,2,3,4]

# Se puede acceder por elemento, son iguales que las listas.... por ahora...
print(tuplin[0])
print(tuplin[1])
print(tuplin[-1])

#peeeeeeeeeeeeeerooooo.... las tuplas son inmutables
try:
  tuplin[1] = 3
except:
  print("Las tuplas son inmutables, no se puede cambiar")


lista_unico_elemento = [1]
#En python el parentesis tiene una doble funcion, ojo. Es para separar terminos y para definir tuplas
#tupla_unico_elemento = (1)
tupla_unico_elemento = (1,)  #Esta tupla tiene un solo valor pero la tengo que escribir asi para que la interprete como tupla

print(type(lista_unico_elemento))
print(type(tupla_unico_elemento))
print(len(tupla_unico_elemento))

try:
  tupla_unico_elemento[1]
except:
  print("Me fui de rango")
```

* Desempaquetar listas y tuplas

```python
tupla_persona = ("Juan", "Perez", 45)
nombre, apellido, edad = tupla_persona
print(nombre)
print(apellido)
print(edad)

#Las tuplas se usan mucho en python cuando queres tener una funcion que devuelva varios valores
def datos_persona():
  return "Juan", "Perez", 45

persona = datos_persona()
print(persona)
print(type(persona))
nombre, apellido, edad = datos_persona()
print(nombre)
print(apellido)
print(edad)
```

## Rangos

* Representando un conjunto de elementos como un rango 

```python
# variable = tipo_de_dato(....)  #Construyendo un objeto
# variable = new tipo_de_dato(...)
# A veces poner el tipo de datos es opcional

numero = 1
numero_alternativo = int(1)

lista = [1,2,3,4]
lista_alternativa = list([1,2,3,4])

tupla = (1,2,3,4)
tupla_alternativa = tuple([1,2,3,4])

#Con los rangos (como con varios objetos) hay que poner el tipo de datos
#Un rango representa un conjunto de valores consecutivos
# range(inico, fin)          <<< No se incluye el fin
# range(inicio, fin, salto)
rango = range(1,11)
print(rango)

lista = [1,2,3,4,5,6,7,8,9,10]
print(lista)
print(list(rango))

#Los rangos son iterables....
for numero in range(1,11):
  print(numero)

for numero in rango:
  print(numero)  

print("-----")
for numero in range(1,11,2):
  print(numero)

print("-----")
for numero in range(10,0,-1):
  print(numero)
```

* Eficiencia en memoria con rangos

```python
import sys

# Las listas tambien son iterables
lista = [1,4,5,6,7,9,1,"Hola"]
for elemento in lista:
  print(elemento)

#Porque tengo rangos y listas si puedo decir que un rango es como una lista de elementos consecutivos/
lista_mil_elementos = [1] * 1000000
rango_mil_elementos = range(1,1001)

print(f"La lista ocupa en memoria {sys.getsizeof(lista_mil_elementos)} bytes")
print(f"El rango ocupa en memoria {sys.getsizeof(rango_mil_elementos)} bytes")
```

### Funcion Enumerate

```pyton
personas = ["Juan", "Pedro", "Lauraro", "Majo", "Matias"]

enumerado = enumerate(personas)  #Es como si fuera una lista de tuplas

print(enumerado)

for persona in enumerado:
  print(persona)

print("----")

for indice, persona in enumerate(personas):
  print(f"{indice+1} - {persona}")

# El enumerate devuelve un objeto enumerate
# Es como una lista de tuplas, donde cada tupla, tiene el (indice, valor)
# Se usa para cuando quiero recorrer una lista y ademas necesito el indice
```

# Funciones

* Les presento a las funciones en python

```python
# Las funciones son como fragmentos de codigo reutilizables
# def <nombre_funcion>(parametro1, pametro2,..., parametron):


def sumar(a, b):
  return a + b

print(sumar(1,2)) 

resultado = sumar(1,2)
print(resultado)

#Version pro de Carla
def promedio(lista_numeros):
    return sum(lista_numeros) / len(lista_numeros)

# Version mas tradicional
def promedio_tradicional(lista_numeros):
  suma = 0
  for numero in lista_numeros:
    suma += numero
  return suma / len(lista_numeros)
    

promedio_notas = promedio([6,7,8,5,10,9,7])
print(promedio_notas)

promedio_notas = promedio_tradicional([6,7,8,5,10,9,7])
print(promedio_notas)
```

# Git

* Creacion del archivo .gitignore
 * Sirve para que un archivo o una carpeta no se suba a github
 * En general todo el enotorno virtual no lo subo a github
 * Que cada uno lo cree de nuevo en su maquina local

# Entornos Virtuales

* Cuando un programa tiene muchas liberias estaria bueno informarle al que lo usa que librerias tiene que isntalar
* En python la forma tradicional de hacerlo es utilizando un archivo Requirements.txt
* Para instalar todas las librerias declaradas en ese archivo

```cmd
pip install -r requirements.txt
```

# Aplicaciones Web - APIS

* Las apis son aplicaciones web sin frontend, toman y devuelven texto
* Para hacer apis usamos la libreria Flask

## Flask 

> https://flask.palletsprojects.com/en/stable/

* Generamos nuestro proyecto con Claude
 * "Quiero un hola mundo en python que sea utilizando la libreria Flask. Dame el codigo en un artefacto"

```python
from flask import Flask
 
app = Flask(__name__)
 
@app.route("/")
def hola_mundo():
    return "<h1>¡Hola, Mundo!</h1>"
 
if __name__ == "__main__":
    app.run(debug=True)
```

* Para ejecutar primero creamos un entono virtual y lo activamos

```cmd
> python -m venv ventorno
> ventorno/scripts/activate
```

* Despues creamos un archivo requirements.txt donde dijimos que necesitamos flask

```
flask
```

* Instalamos todas las librerias del archivo requirements.txt

```cmd
pip install requirements.txt
```

* Ejecutamos el proyecto en python

```cmd
python web-demo.py
```

* Me mostro en la consola que se habilito el puerto 5000 y con eso voy a una ventana del navegador

```cmd
[notice] A new release of pip available: 22.3.1 -> 26.0.1
[notice] To update, run: python.exe -m pip install --upgrade pip

(ventorno) C:\Cursos\fullstack-ai-dev\clases\clase-cinco>python web-demo.py
 * Serving Flask app 'web-demo'
 * Debug mode: on
WARNING: This is a development server. Do not use it in a production deployment. Use a production WSGI server instead.
 * Running on http://127.0.0.1:5000
Press CTRL+C to quit
 * Restarting with stat
 * Debugger is active!
 * Debugger PIN: 200-920-772
127.0.0.1 - - [18/Mar/2026 21:15:10] "GET / HTTP/1.1" 200 -
127.0.0.1 - - [18/Mar/2026 21:15:11] "GET /favicon.ico HTTP/1.1" 404 -
```

# Recapitulando

* Librerias que vimos hasta ahora
  * flask : para programar apis
  * pygame : para hacer juegos
  * tkinter : para hacer aplicaciones de escritorio
  * kivy : para hacer aplicaciones multiplataforma (para moviles ppalmente)
  * pandas : de oido... todavia no sabemos para que es
  * Ya venian con python
    * random : para crear numeros al azar
    * date, datetime : No me acordaba si las usamos mucho pero es para fechas y horas
    * sys : para ver informacion del sistema (por ejemplo cuanto espacio en memoria ocupa una variable)
    * os : No la vimos pero se usa para interactuar con el sistema operativo, ej : leer archivos
