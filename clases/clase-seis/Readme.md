# Clase Seis - 20 de Marzo del 2026

# Repaso

* Python
  * tuplas
    * Son inmutables, una vez que las creas no se puede sacar ni agregar elementos
    * Desempaquetar v1, v2 = (v1,v2)
    * Slicing tambien en tuplas
  * Funciones built-in
    * enumerate
  * Rangos
  * funciones
    * Declarar funciones con def
    * Esta curioidad que una funcion puede devolver varios valores en python
      * El resultado lo recibo como tupla y lo puedo desempaquetar
  * Tipos de Aplicaciones
    * Aplicaciones Web/API
      * Flask
  * Repasamos lo de los entornos virtuales
      * Listar las librerias necesarias en el archivo requirements.txt

# Colab del dia

> https://colab.research.google.com/drive/1QCHkgWlbb0u2qg_C5hgg0YpDswqOiFsk?usp=sharing

# Tipos de Datos que vamos a ver hoy...

* Diccionarios
* Sets / conjuntos

## Javascript

* El lenguaje de programacion utilizado dentro de los navegador para la parte de front
* Si estoy en el navegador y aprego f12 puedo abrir la consola del navegador de Javascript
* Javascript fue un lenguaje trascendental en mundo DEV. Todos de alguna manera lidian lidian con el.
* Javascript puso de moda un lenguaje/formato que se usa para para representar informacion, almacenar informacion, comunucar inforacion entre sistemas

## JSON (Javascript Object Notation)

 * Por ejemplo en la consola de javascript (F12 en cualquier pagina) puedo declarar un objeto json

```javascript

let persona  = {
   nombre : "Esteban",
   apellido : "Calabria",
   edad : 45
}

//Tambien puedo escribir las claves entre comillas (esto es mas estandar)

let persona = {
    "nombre": "Juan",
    "apellido": "Perez",
    "edad": 30,
}

```

* Luego cuando tengo un objeto en json le puedo consultar en forma separa por cada uno de sus atributos

```javascript

persona.nombre

o

persona["nombre"]

```

* Si hago un paralelismo con la programacion orientada a objetos, un objeto json se centra mas en la parte de datos que la de comportamiento
* En python vimos que las variables son objetos. Y a los objetos le puedo pedir cosas ejecutando metodos sobre ellos. Por ejemplos. "cadena".upper().

## API (Aplication program Interface)

* Esta MUY relacioado con JSON
* Es una forma de comunicar programas (generalmente un frontend con un backend)
   * Generalmetne trabaja sobre el protocolo HTTP (Hipertext transfer protocol o protocolo para tranferir texto para los amigos)
   * Hoy en dia se usa el https que le agrega seguridad
   * La clase que viene vamos a hablr sobre http pero pueden ir viendo esto : https://www.instagram.com/p/DMMcfavuN58/?img_index=1
* Lo puedo pensar como si fuera una aplicacion web pero que en vez de devoler html, devuelve y recibe json
* Ejemplos de API
  * https://rickandmortyapi.com/api/character << Me devuelve un json son los personajes de rick and morty

# Noticias

* Ahora hay un lenguaje que sale como alternativa al json que se llama toon (token object notatatiions) 
  * Bien ahi Julian
  * https://github.com/toon-format/toon

# Python

## Tipos de datos (que venimos viendo)

* Basicos
  * int
  * float
  * str
  * complex
  * bool
* Especiales
  * NoneType   << NUEVO
* Enumerables/Colecciones
   * list
   * tuple
   * dict
   * range
   * enumerate
   * set << Todavia no lo vimos

## Diccionarios

* Los diccionarios en python representan una estructura que almacena una lista de elementos (clave, valor) donde la clave es unica
* Los diccionarios son casi lo mismo que un json en javascript

### Declarar y acceso

```python

persona = {
    "nombre": "Juan",
    "apellido": "Perez",
    "edad": 30,
}

print(type(persona))

# Esto no funciona en python como en javascript
#print(persona.nombre)

# Hay que usar la sintaxis de indice como si fuera el indice de una lista 
# Con los corchetes
# Acceso a valores a partir de su clave
print(persona["nombre"])
print(persona["apellido"])
#El corchete falla si haces referencia a un atributo que no esiste
try:
  print(persona["sarasa"])
except KeyError:
  print("La clave no existe. Como sice Tusam... puede fallar")

#Tambien puedo usar el get
print(persona.get("edad"))

sarasa = persona.get("Sarasa")
print(sarasa)
print(type(sarasa))

# Les presento el tipo de dato "especial" None en python
nada = None  

```

## Modificar diccionarios

```
# a los diccionarios se le pueden agregar elementos dinamicamente y modificar elementos existentes
persona["dni"] = 323232322

persona["edad"] = 25

print(persona)
```

## Diccionarios Anidados y Listas de Diccionarios

```python
alumnos = [
    {"nombre": "Majo", "apellido": "Pisetta"},
    {"nombre": "Lucas", "apellido": "Santiago"},
]

for alumno in alumnos:
    print(alumno["nombre"], alumno["apellido"])

datos_persona = {
    "nombre": "Juan",
    "apellido": "Perez",
    "hijos" : ["Maria","Pedro"],
    "direccion": {
        "calle": "Calle Falsa",
        "numero": 123,
        "ciudad": "Springfield",
    },
}

print(datos_persona["direccion"]["calle"])
print(datos_persona["hijos"][1])
```

## Recorrer un diccionario

```python

automovil = {
    "marca": "Ford",
    "modelo": "Mustang",
    "año": 1964,
    "color": "rojo"
}

#Recorrer las claves
print("Recorro las claves del Diccionario")
for clave in automovil.keys():
    print(clave)

#Recorrer los valores
print("Recorro los valores del Diccionario")
for valor in automovil.values():
    print(valor)

#Recorrer ambos al mismo tiempo
print("Recorro ambos al mismo tiempo")
for clave, valor in automovil.items():
    print(f"{clave} : {valor}")

```
