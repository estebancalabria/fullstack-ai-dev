# Clase Cuatro - 13 de Marzo 2026

# Repaso

* Python
  * En python las variables son objetos
  * Built-Function
    * isinstance : te permite preguntar si una variable/objeto pertenece a un determinado tipo de datos
    * dir : listaba los metodos de un objeto
    * id : ver la identidad (posicion de memoria) de un objeto
    * type
    * input
    * print
  * Funciones asociadas al tipo de la variable
    * str
      * replace
      * upper
    * Operadores
      * ==
      * is
  * liberias
    * tkinter
    * pygame
    * mencionado pandas
* Entornos Virtuales
  * Crear un entorno virtual
    * python -m venv (nombre del entorno)
    * Crea una carpeta con el (nombre del entorno)
  * Activamos el entorno
    * (nombre del entorno)\Scripts\activate 
    
# Colab del dia

> https://colab.research.google.com/drive/17opYvjJLX9Ue20LdEk9ZeIP7JwNivULy?usp=sharing

# Listas

## Operaciones Basicas con Listas
  
```python
lista = [1,5,3,4,5,6]

# Pueden tener varios tipos de datos mezclados
#lista = [1,5,3,4,5,6, "Hola"] 

print(lista)
print(type(lista))
print(dir(lista))

#Recorro la lista
for elemento in lista:
    print(elemento)

#Agrego elemento a una lista
lista.append(7)
print(lista)

#Agrego elemento a una lista concatenando listas
lista = lista + [8]
print(lista)
```

## Acceder a elementos puntuales en una lista

```python
lista = [1,2,3,4,5,6,7]

print(f"La lista es {lista}")

#El primer elemento de una lista es el que tiene el indice 0, igual que c, java
primer_elemento = lista[0]
print(f"Primer Elemento (indice 0) {primer_elemento}")

#Tercer elemento
tercer_elemento = lista[2]
print(tercer_elemento)

#Longitud Lista
longitud_lista = len(lista)
print(f" Longutud Lista {longitud_lista}")

#Uttimo Elemento de la lista
ultimo_elemento = lista[longitud_lista - 1]
print(f"Ultimo Elemento {ultimo_elemento}")

#Alternativamente, esto es algo exclusivo de python
ultimo_elemento = lista[-1]
print(f"Ultimo Elemento {ultimo_elemento}")

#try: --- PuedeFallar:
try:
   #Si me voy de rango me tira un error/excepcion llamada IndexError
   print(f"Me voy de rango {lista[100000]}")
except IndexError as e:
#except IndexError as e
  print("Quise acceder a la lista con un indice muy trande y me voy de rango")
```

## Modificar la lista con sus metodos

* Metodos de la lista
 * append
 * remove
 * pop
 * insert


```python
lista = [100,2,3,4,5,6,7]

print(f"La lista es {lista}")

#Modifico
lista[0] = 1
print(f"La lista modificada es {lista} su id {id(lista)}")

# Agrego un elemento
lista.append(8)
print(f"La lista modificada es {lista} su id {id(lista)}")

# Inserto un elemento en la lista
lista.insert(0, -500)
print(f"La lista modificada es {lista} su id {id(lista)}")  

# Remover el primer valor que coincida (Solo uno)
# lista.append(-500) <<< Probar con esto para ver que es solo uno
lista.remove(-500)
print(f"La lista modificada es {lista} su id {id(lista)}")  

# Eliminar por posicion
lista.pop(0)  # Elimino el primero indicando el indice
print(f"La lista modificada es {lista} su id {id(lista)}")
```

# Manejo de listas e identidad

* Mira el siguiente ejemplo
```python
lista = [1,2,3]
print (f"La lista es {lista} su id {id(lista)}")

lista.append(4)
print (f"La lista es {lista} su id {id(lista)}")

# De esta manera estoy creadno una lista nueva
# En memoria tengo la lista vieja [1,2,3,4]
# En memoria tengo la lista nueva [1,2,3,4,5]
# Creamos una copia de la lista
# Para listas grandes hay que tener cuidado porque estamos duplicando el uso de memoria
lista = lista + [5]
print (f"La lista es {lista} su id {id(lista)}")
```

* Otro ejemplo donde se ve mas claro

```python
# Esto pasa porque las listas son Mutables

#Carla : en java a=new Persona() en python a = Persona()

lista1 = [1,2,3]  #Es como si hiciera un new en otro lenguaje
lista2 = lista1   #Es el mismo obejeto que puedo llamar como lista1 o lista2

print(id(lista1))
print(id(lista2))

# Es indistinto hacerle un append a cualquiera de las dos
lista2.append(4)
print(lista1)

#Si nececesito una copia
lista3 = lista2.copy()  #Ahora lista3 es u nuevo objeto con la copia
print(id(lista2))
print(id(lista3))

```

## Creacion listas con elementos repetidos

```python
#Forma 1, crear una lista con 20 elementos con un for
lista = []
#Ojo con el range que no incluye e ultimo elemento
# Un rango es una secuencia consecutiva de numeros range(1,6) -> (1,2,3,4,5)
for _ in range(1,6): 
    #Esta instruccion se ejecuta 5 veces
    lista.append(10) 
print(lista)

# En vez de hacer todo el choclo anterior python me permite hacer lo siguiente
lista_facil = [10] * 5
print(lista_facil)
```

## Operador Slicing

* Sintaxis
  * [inicio:fin]
    * [1:3]

```python
lista = [1,2,3,4,5]
# Como en los rangos el indice final no se incluye
copia = lista[0:2]

#[inicio..fin] donde incluye inicio y excluye el fin

print(copia)

#Del segundo al cuarto (indice 3) 
copia = lista[1:4]
print(copia)

#Puedo omitir el primero
copia = lista[:4]
print(copia)

#Puedo omitir el ultimo
copia = lista[1:]
print(copia)
```

# Tipos de Aplicacione en Python
