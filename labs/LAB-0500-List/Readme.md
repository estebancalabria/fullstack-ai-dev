# Laboratorio — Uso de Listas en Python

## 🎯 Objetivo

En este laboratorio exploraremos cómo Python trabaja con **listas**, una de las estructuras de datos más utilizadas.

Las listas permiten almacenar **colecciones ordenadas de elementos**, lo que las hace ideales para manejar conjuntos de datos como números, nombres, resultados de cálculos, objetos y más.

Durante este laboratorio aprenderás:

* Qué es una **lista**
* Cómo **crear listas**
* Cómo **acceder a elementos**
* Cómo **modificar listas**
* Cómo **recorrer listas**
* Cómo usar **métodos de listas**
* Cómo usar **slicing**
* Cómo **insertar, eliminar y agregar elementos**
* Cómo crear listas rápidamente
* Cómo **invertir listas**
* Cómo funcionan expresiones como `lista[::-1]`

---

# Actividad 1 — Crear una lista

Una lista se define utilizando **corchetes `[]`**.

```python
numeros = [10, 20, 30, 40]

print(numeros)
print(type(numeros))
```

Resultado esperado:

```
[10, 20, 30, 40]
<class 'list'>
```

Una lista es una **colección ordenada de elementos**.

---

# Actividad 2 — Listas pueden contener distintos tipos

A diferencia de otros lenguajes, Python permite **mezclar tipos de datos en una lista**.

```python
datos = ["Python", 3.11, True, 100]

print(datos)
```

Resultado esperado:

```
['Python', 3.11, True, 100]
```

Esto significa que una lista puede contener **strings, números, booleanos u otros objetos**.

---

# Actividad 3 — Acceder a elementos por índice

Cada elemento de una lista tiene una **posición llamada índice**.

Los índices comienzan en **0**.

```python
numeros = [10, 20, 30, 40]

print(numeros[0])
print(numeros[2])
```

Resultado esperado:

```
10
30
```

---

# Actividad 4 — Índices negativos

Python permite acceder a los elementos **desde el final** usando índices negativos.

```python
numeros = [10, 20, 30, 40]

print(numeros[-1])
print(numeros[-2])
```

Resultado esperado:

```
40
30
```

---

# Actividad 5 — Modificar elementos

Las listas **sí son mutables**, por lo que podemos modificar sus elementos.

```python
numeros = [10, 20, 30]

numeros[1] = 200

print(numeros)
```

Resultado esperado:

```
[10, 200, 30]
```

---

# Actividad 6 — Agregar elementos al final

Para agregar un elemento al final de una lista usamos el método **`append()`**.

```python
numeros = [1, 2, 3]

numeros.append(4)

print(numeros)
```

Resultado esperado:

```
[1, 2, 3, 4]
```

📌 **Respuesta clave:**
El método utilizado para agregar un elemento al final de una lista es **`append()`**.

---

# Actividad 7 — Insertar elementos en una posición

Si queremos insertar un elemento en una posición específica usamos **`insert()`**.

```python
numeros = [10, 20, 30]

numeros.insert(1, 15)

print(numeros)
```

Resultado esperado:

```
[10, 15, 20, 30]
```

📌 **Respuesta clave:**
El método que inserta un elemento en una posición específica es **`insert()`**.

---

# Actividad 8 — Eliminar elementos

Podemos eliminar elementos con **`remove()`**.

```python
numeros = [10, 20, 30]

numeros.remove(20)

print(numeros)
```

Resultado esperado:

```
[10, 30]
```

Este método elimina **el primer valor que coincide**.

---

# Actividad 9 — Eliminar por posición

También podemos eliminar un elemento usando **`pop()`**.

```python
numeros = [10, 20, 30]

numeros.pop(1)

print(numeros)
```

Resultado esperado:

```
[10, 30]
```

---

# Actividad 10 — Crear listas repetidas

Podemos crear listas repetidas usando el operador `*`.

```python
lista = [0] * 10

print(lista)
```

Resultado esperado:

```
[0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
```

📌 **Respuesta clave:**
`[0] * 10` crea una lista con **10 ceros**.

---

# Actividad 11 — Recorrer una lista

Podemos recorrer una lista con `for`.

```python
numeros = [1, 2, 3, 4]

for numero in numeros:
    print(numero)
```

Resultado esperado:

```
1
2
3
4
```

---

# Actividad 12 — Slicing básico

Podemos extraer partes de una lista usando **slices**.

```python
lista = [1, 2, 3, 4, 5]

print(lista[:3])
```

Resultado esperado:

```
[1, 2, 3]
```

📌 **Pregunta clave:**
Si `lista = [1,2,3,4,5]`, ¿qué muestra `lista[:3]`?

Respuesta:

```
[1, 2, 3]
```

---

# Actividad 13 — Cómo funciona el índice final

```python
lista = [10, 20, 30, 40, 50, 60]

print(lista[2:5])
```

Resultado esperado:

```
[30, 40, 50]
```

📌 **Concepto importante**

En `lista[2:5]`:

* El índice **2 se incluye**
* El índice **5 NO se incluye**

Esto significa que Python toma **hasta la posición anterior**.

---

# Actividad 14 — Slice con salto

Podemos definir un salto entre elementos.

```python
lista = [1,2,3,4,5,6]

print(lista[::2])
```

Resultado esperado:

```
[1, 3, 5]
```

Esto selecciona **elementos de dos en dos**.

---

# Actividad 15 — Invertir una lista

Podemos invertir una lista usando slicing.

```python
lista = [1,2,3,4,5]

print(lista[::-1])
```

Resultado esperado:

```
[5, 4, 3, 2, 1]
```

📌 **Pregunta clave**

¿Qué hace `lista[::-1]`?

Respuesta:

Invierte el orden de la lista.

---

# Actividad 16 — Contar elementos

```python
numeros = [1,2,3,3,3,4]

print(numeros.count(3))
```

Resultado esperado:

```
3
```

---

# Actividad 17 — Buscar elementos

```python
numeros = [10,20,30,40]

print(numeros.index(30))
```

Resultado esperado:

```
2
```

---

# Actividad 18 — Ordenar listas

```python
numeros = [5,3,1,4,2]

numeros.sort()

print(numeros)
```

Resultado esperado:

```
[1,2,3,4,5]
```

---

# Actividad 19 — Obtener tamaño de la lista

```python
numeros = [10,20,30,40]

print(len(numeros))
```

Resultado esperado:

```
4
```

---

# Actividad 20 — Explorar métodos disponibles

Podemos usar `dir()` para ver todos los métodos de una lista.

```python
lista = [1,2,3]

print(dir(lista))
```

Fragmento del resultado:

```
['append', 'clear', 'copy', 'count', 'extend',
'index', 'insert', 'pop', 'remove', 'reverse', 'sort']
```

---

# Conclusiones

Al finalizar este laboratorio el alumno aprendió a trabajar con **listas (`list`)**, una de las estructuras de datos más importantes de Python.

Durante el laboratorio se exploró cómo:

* Crear listas
* Acceder a elementos
* Modificar listas
* Insertar y eliminar elementos
* Recorrer listas
* Utilizar slicing
* Invertir listas
* Ordenar y buscar datos

También se comprendieron conceptos clave como:

* `append()` para agregar elementos
* `insert()` para insertar en posiciones específicas
* `lista[:3]` para obtener los primeros elementos
* `lista[2:5]` donde el índice final **no se incluye**
* `lista[::-1]` para invertir listas
* `[0] * 10` para crear listas repetidas

Con estas herramientas, el alumno ahora posee una **base sólida para trabajar con colecciones de datos en Python**.
