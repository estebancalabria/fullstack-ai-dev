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
  * https://pokeapi.co/api/v2/pokemon/   << La api de pokemon
  * https://thesimpsonsapi.com/api/characters  << La api de los simpsons

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

## Trabajar con JSON

* Algo de todos los dias (sobre todo cuando se trabaja con apis) es pasar de un diccionario a un json (str) y de un json a un diccionario

### Convertir un diccionario a un json

```python
import json

persona = {
    "nombre" : "Juan",
    "apellido" : "Perez",
    "edad" : 30,
}

#El dups convierte un diccionario a un string con su representacion json 
json_str = json.dumps(persona)

print(type(json_str))
print(json_str)


json_str = json.dumps(persona, indent=4)
print(json_str)
```

### Convertir un JSON a un diccionario

```python
import json 

cadena_con_json = """
{"count":1350,"next":"https://pokeapi.co/api/v2/pokemon/?offset=20&limit=20","previous":null,"results":[{"name":"bulbasaur","url":"https://pokeapi.co/api/v2/pokemon/1/"},{"name":"ivysaur","url":"https://pokeapi.co/api/v2/pokemon/2/"},{"name":"venusaur","url":"https://pokeapi.co/api/v2/pokemon/3/"},{"name":"charmander","url":"https://pokeapi.co/api/v2/pokemon/4/"},{"name":"charmeleon","url":"https://pokeapi.co/api/v2/pokemon/5/"},{"name":"charizard","url":"https://pokeapi.co/api/v2/pokemon/6/"},{"name":"squirtle","url":"https://pokeapi.co/api/v2/pokemon/7/"},{"name":"wartortle","url":"https://pokeapi.co/api/v2/pokemon/8/"},{"name":"blastoise","url":"https://pokeapi.co/api/v2/pokemon/9/"},{"name":"caterpie","url":"https://pokeapi.co/api/v2/pokemon/10/"},{"name":"metapod","url":"https://pokeapi.co/api/v2/pokemon/11/"},{"name":"butterfree","url":"https://pokeapi.co/api/v2/pokemon/12/"},{"name":"weedle","url":"https://pokeapi.co/api/v2/pokemon/13/"},{"name":"kakuna","url":"https://pokeapi.co/api/v2/pokemon/14/"},{"name":"beedrill","url":"https://pokeapi.co/api/v2/pokemon/15/"},{"name":"pidgey","url":"https://pokeapi.co/api/v2/pokemon/16/"},{"name":"pidgeotto","url":"https://pokeapi.co/api/v2/pokemon/17/"},{"name":"pidgeot","url":"https://pokeapi.co/api/v2/pokemon/18/"},{"name":"rattata","url":"https://pokeapi.co/api/v2/pokemon/19/"},{"name":"raticate","url":"https://pokeapi.co/api/v2/pokemon/20/"}]}
"""

diccionario = json.loads(cadena_con_json)

print(type(diccionario))
print(diccionario)
nombre_segundo_pokemon = diccionario["results"][1]["name"]
print(f"El nombre del segundo pokemon es {nombre_segundo_pokemon}")
```

### Compatibilidad con los tipos de datos javascript-pyton


```python
import json

string_json = """
{
    "cadena" : "Hola Mundo",
    "numero" : 42,
    "booleano" : true,
    "flotante" : 3.14
}
"""

# SI pongo True el mayucula el json.loads me da un error 
#porque javascript es case sensitive
#string_json = """
#{
#    "cadena" : "Hola Mundo",
#    "numero" : 42,
#    "booleano" : True,
#    "flotante" : 3.14
#}
#"""


diccionario = json.loads(string_json)
print(diccionario)

for clave, valor in diccionario.items():
    print(f"{clave} : {valor} ({type(valor)})")
```

## Creando una API con Flask y usando diccionarios

* Creo el archivo requirements.txt

```
flasj
```

* Vamos a crear el enorno virtual e instalar las dependencias

```
> python -m venv venv

> venv\Scripts\activate

> pip install -r requirements.txt

```

* El archivo api.py queda

```python

from flask import Flask, jsonify
 
app = Flask(__name__)

personas = [
    {"id": 1, "nombre": "Juan", "edad": 30},
    {"id": 2, "nombre": "Maria", "edad": 25},
    {"id": 3, "nombre": "Pedro", "edad": 35}
]
 
@app.route("/api/personas")
def obtener_personas():
    #Parecido a json.dumps 
    #pero con un formato más adecuado para APIs
    return jsonify(personas)

 
app.run(debug=True)
```

* Lo ejecuto como

```
> python api.py
```

* Se abre http://127.0.0.1:5000,  por lo que accedo a

```
http://127.0.0.1:5000/api/personas
```


# Glosario

* Hardcodeado o hardcoded :
    * Le pregunto a ChatGPT : "Que seria en el codigo tener un valor hardcodeado y porque es algo que habria que evitar a la hora de programar bien"

```markdown
Tener un valor **hardcodeado** en un programa significa **escribir un valor literal directamente en el código** en lugar de usar una variable, constante, parámetro o configuración externa. Por ejemplo:

# Valor hardcodeado
precio_iva = 21  # % de IVA directamente en el código

# Mejor forma
IVA = 21  # como constante
precio_total = precio * (1 + IVA/100)

### Por qué hay que evitarlo:

1. **Difícil de mantener:** Si el valor cambia (por ejemplo, el IVA sube a 25%), hay que buscar y reemplazarlo en todo el código.
2. **Menos flexible:** No se puede reutilizar fácilmente para distintos escenarios o entornos.
3. **Riesgo de errores:** Si hay varios hardcodeados, uno puede olvidarse y generar inconsistencias.
4. **Complica la configuración:** No permite que otros usuarios o entornos ajusten el valor sin tocar el código.
5. **Mala práctica profesional:** Los programas bien diseñados usan constantes, variables, archivos de configuración o parámetros.

💡 **Regla general:** Si un valor puede cambiar o es relevante para la lógica, **no lo pongas fijo en el código**; usa variables, constantes o configuraciones externas.
```
