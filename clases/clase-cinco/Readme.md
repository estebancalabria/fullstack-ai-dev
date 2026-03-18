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

# Funciones

# Aplicaciones Web
