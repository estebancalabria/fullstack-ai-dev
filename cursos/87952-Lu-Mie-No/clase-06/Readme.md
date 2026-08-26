# Clase Seis - 26 de Agosto del 2026

# Repaso

* Python
  * Ejecutar un programa en python localmente
      * Ejecutamos localmente el programita de Analisis de Sentimientos
  * Instalar librerias con el comando pip install
      * Instalar librerias globalmente (para toda la  pc)
      * torch -> para redes neuronales
      * transformers -> La libreria de HF para usar modelos
  * DEfinimos la ubicacion donde bajar el modelo
* Modelos de Lenguajes
  * Open Source
    * Ejecutar Localmente
      * LMStudio

---

# Pruebas del LMStudio

* Matias -> Instalo Qwen y no aguanto
* Guido -> Instalo Qwen 14b  -> Asus ROG
* Luis -> qwen 2.5 -> Funciono OK
* Nahuen -> Qwen 3.8 -> No funciono, murio la pc

---

# WebDev

## JSON

* Javascript object notation
* Es el formato estandar que se usa hoy en dia para representar y transferir datos

```json
{
  "info": {
    "count": 826,
    "pages": 42,
    "next": "https://rickandmortyapi.com/api/character?page=2",
    "prev": null
  }
}
```

* Pueden aprender mas de json aqui..
  * https://es.wikipedia.org/wiki/JSON
  * https://www.w3schools.com/js/js_json.asp

# Python

* Caracteristicas
  * Es un lenguaje interpretado
  * Es un lenguaje implicitamente tipado
      * A que ahi los sorprendi
      * Las variables puden ir cambiando de tipo de dato
  * De facil lectura
      * Usa la tabulacion para anidar bloques
      * no usa llaves, ;
  * Muy usado para IA, ML y automatizaciones
  * Es Case Sensitive

## Google Colab de la clase

* URL
    * https://colab.research.google.com/drive/1KWGp7vXQCyPqI33y9gVEzRo7_eNohAAj?usp=sharing

## Comentarios en python

* Los comentarios de una sola linea se escriben con la almohadilla / hashtag (#)

## Tipos de datos

 * Los tipos de datos (primitivos) en python son:
   * int
   * str
   * bool
     * Solo admite los valores True / False
   * float
   * complex
   * None

> [!NOTE]
> En Python el tipo de dato de una variable se infiere/deduce del contexto
> Otros lenguajes como C#, Java (fuertemente tipado) definen el tipo de la variable al momento de declararla (int variabe)

* Codigo para tipos de datos primitivos

```python
# * int
numero = 10
#print(f"La variable numero tiene un {numero}  y es de tipo {type(numero)}")
print(f"La variable numero tiene un {numero} y es de tipo {type(numero).__name__}")

# * str
nombre = "Esteban"
print(f"La variable nombre tiene un {nombre} y es de tipo {type(nombre).__name__}")

# * bool
condicion = True
print(f"La variable condicion tiene un {condicion} y es de tipo {type(condicion).__name__}")

# * float
numero_con_coma = 15.5
print(f"La variable numero_con_coma tiene un {numero_con_coma} y es de tipo {type(numero_con_coma).__name__}")

# * complex
complejo = 1 + 2j
print(f"La variable complejo tiene un {complejo} y es de tipo {type(complejo).__name__}")

# * None
vacia = None
print(f"La variable vacia tiene un {vacia} y es de tipo {type(vacia).__name__}")
```

* Tipos de datos de varios elementos, AKA colecciones, AKA iterables
  * Listas
      * Parecido a un array pero en este caso son dinamicas
      * Se representan con un []
      * Puede esta vacia lista_vacia = []
      * En general las listas suelen tener elemenos del mismo tipo, pero admiten elementos de cualquier
  * Tuplas
      * Se representan con parentesis ()
      * LAs tuplas de un elemento solo llevan coma ejemplo (1,)
  * Diccionarios
      * Tienen la misma sintaxis que el JSON
      * Utilizan las {}
  * set
      * Es una lista pero sin orden ni elementos repetidos que se usan para saber si un elemento esta o no el conjunto
      * Tambien usan los {}
      * No se usan tantos
      * Puedo preguntar con el operador in si un valor es parte del conjunto
  * range
      * Representan una secuencia ordenada (ascente o descendente) de elementos consecutivos
      * Es un tipo de dato especial que se utiliza en las iteraciones
      * Se crean con el nombre del tipo de dato (range) especifcando el primer y ultimo elemento (que no se incluye en el rango)
            * rango = range(1,11) -> es la secuencia de 1 a 10
 

> [!NOTE]
> Todos las variables de tipo coleccion se pueden recorrer con un for..in

```python
#  * Listas (se pueden modificar)
lista = [1,2,3,4,5,6]

# Las listas se pueden modificar por ejemplo...
lista.append(7)
lista = lista + [8] #Crea una lista nueva

print(f"La variable lista tiene un {lista} y es de tipo {type(lista).__name__}")

#  * Tuplas, Son como las listas pero no se pueden modificar
tupla = (1,2,3,4,5)
print(f"La variable tupla tiene un {tupla} y es de tipo {type(tupla).__name__}")

tupla_un_elemento = (6,)
print(f"La variable tupla_un_elemento tiene un {tupla_un_elemento} y es de tipo {type(tupla_un_elemento).__name__}")

#  * Diccionarios (Como un jsson)
persona = {
    "nombre" : "Juan",
    "apellido" : "Perez",
    "edad" : 25
}
print(f"La variable persona tiene un {persona} y es de tipo {type(persona).__name__}")

#  * set
pares_del_1_al_10 = {2,4,6,8,10}
print(f"La variable pares_del_1_al_10 tiene un {pares_del_1_al_10} y es de tipo {type(pares_del_1_al_10).__name__}");

if 2 in pares_del_1_al_10:
    print("El numero 2 esta en el set")


#  * range
# Defino un rango de 1 a 10
rango = range(1,11)
print(f"La variable rango tiene un {rango} y es de tipo {type(rango).__name__}")

for numero in rango:
    print(numero)

#Ejemplo si quiero iterar los numeros de 2 en 2
print("------------------------------------")
for numero in range(1,11,2):
    print(numero)

#Recorrer strings
print("------------------------------------")
cadena = "Hola"
for letra in cadena:
    print(letra)

print("------------------------------------")
lista = [1,2,3,4,5,6]
for numero in lista:
    print(numero)
```

## Tipos de datos Funciones

```
def sumar(a,b):
  return a+b

cuatro = sumar(2,2)
print(f"La suma es {cuatro} ")
print(type(sumar))
```

## Funciones Bult-in

* input
* print
* type
