# Laboratorio — Listas en Python (Nivel Intermedio)

## 🎯 Objetivo

En este laboratorio profundizaremos en el uso de **listas en Python**, explorando herramientas que permiten escribir código **más eficiente, más expresivo y más "pythonico"**.

En particular aprenderemos:

* Qué es **List Comprehension**
* Cómo usar **`enumerate()`**
* Cómo combinar listas con **`zip()`**
* Cómo aplicar funciones con **`map()`**
* Cómo filtrar elementos con **`filter()`**
* Cómo usar **`any()` y `all()`**
* Cómo copiar listas correctamente
* La diferencia entre **copiar y referenciar listas**

Estas herramientas son ampliamente utilizadas en **código profesional de Python**.

---

# Actividad 1 — Crear listas con List Comprehension

Una **list comprehension** permite crear listas de forma compacta.

```python
numeros = []

for i in range(5):
    numeros.append(i)

print(numeros)
```

Resultado esperado:

```
[0, 1, 2, 3, 4]
```

Esto puede escribirse de forma más simple usando **list comprehension**.

```python
numeros = [i for i in range(5)]

print(numeros)
```

Resultado esperado:

```
[0, 1, 2, 3, 4]
```

---

# Actividad 2 — List comprehension con operaciones

Podemos aplicar operaciones dentro de la comprensión.

```python
cuadrados = [x**2 for x in range(6)]

print(cuadrados)
```

Resultado esperado:

```
[0, 1, 4, 9, 16, 25]
```

Esto genera una lista con los **cuadrados de los números**.

---

# Actividad 3 — List comprehension con condición

También podemos filtrar elementos.

```python
pares = [x for x in range(10) if x % 2 == 0]

print(pares)
```

Resultado esperado:

```
[0, 2, 4, 6, 8]
```

Esto crea una lista **solo con números pares**.

---

# Actividad 4 — Usar `enumerate()`

`enumerate()` permite recorrer una lista obteniendo **el índice y el valor** al mismo tiempo.

```python
frutas = ["manzana", "banana", "pera"]

for indice, fruta in enumerate(frutas):
    print(indice, fruta)
```

Resultado esperado:

```
0 manzana
1 banana
2 pera
```

Esto es útil cuando necesitamos **la posición y el elemento**.

---

# Actividad 5 — Usar `zip()`

`zip()` permite combinar varias listas.

```python
nombres = ["Ana", "Luis", "Pedro"]
edades = [25, 30, 35]

for nombre, edad in zip(nombres, edades):
    print(nombre, edad)
```

Resultado esperado:

```
Ana 25
Luis 30
Pedro 35
```

`zip()` empareja elementos **según su posición**.

---

# Actividad 6 — Convertir zip a lista

Podemos convertir el resultado de `zip` en una lista.

```python
nombres = ["Ana", "Luis", "Pedro"]
edades = [25, 30, 35]

pares = list(zip(nombres, edades))

print(pares)
```

Resultado esperado:

```
[('Ana', 25), ('Luis', 30), ('Pedro', 35)]
```

---

# Actividad 7 — Usar `map()`

`map()` aplica una función a cada elemento de una lista.

```python
numeros = [1,2,3,4]

resultado = list(map(lambda x: x*2, numeros))

print(resultado)
```

Resultado esperado:

```
[2, 4, 6, 8]
```

Esto multiplica cada número por **2**.

---

# Actividad 8 — Usar `filter()`

`filter()` permite filtrar elementos según una condición.

```python
numeros = [1,2,3,4,5,6]

pares = list(filter(lambda x: x % 2 == 0, numeros))

print(pares)
```

Resultado esperado:

```
[2, 4, 6]
```

---

# Actividad 9 — Usar `any()`

`any()` devuelve **True si al menos un elemento es verdadero**.

```python
numeros = [0,0,3,0]

print(any(numeros))
```

Resultado esperado:

```
True
```

Esto ocurre porque **3 es distinto de cero**.

---

# Actividad 10 — Usar `all()`

`all()` devuelve **True si todos los elementos son verdaderos**.

```python
numeros = [1,2,3,4]

print(all(numeros))
```

Resultado esperado:

```
True
```

Si un elemento es `0` o `False`, el resultado será **False**.

---

# Actividad 11 — Copiar listas correctamente

Supongamos que tenemos una lista:

```python
lista1 = [1,2,3]

lista2 = lista1

lista2.append(4)

print(lista1)
```

Resultado esperado:

```
[1, 2, 3, 4]
```

Esto ocurre porque **ambas variables apuntan a la misma lista en memoria**.

---

# Actividad 12 — Copiar usando `copy()`

Para copiar correctamente una lista debemos usar `copy()`.

```python
lista1 = [1,2,3]

lista2 = lista1.copy()

lista2.append(4)

print(lista1)
print(lista2)
```

Resultado esperado:

```
[1, 2, 3]
[1, 2, 3, 4]
```

Ahora las listas son **independientes**.

---

# Actividad 13 — Copiar usando slicing

Otra forma de copiar una lista es usando slicing.

```python
lista1 = [10,20,30]

lista2 = lista1[:]

lista2.append(40)

print(lista1)
print(lista2)
```

Resultado esperado:

```
[10, 20, 30]
[10, 20, 30, 40]
```

---

# Actividad 14 — Invertir una lista con método

También podemos invertir una lista usando `reverse()`.

```python
numeros = [1,2,3,4]

numeros.reverse()

print(numeros)
```

Resultado esperado:

```
[4, 3, 2, 1]
```

---

# Actividad 15 — Extender listas

Podemos agregar varios elementos usando `extend()`.

```python
lista1 = [1,2,3]
lista2 = [4,5,6]

lista1.extend(lista2)

print(lista1)
```

Resultado esperado:

```
[1,2,3,4,5,6]
```

---

# Actividad 16 — Aplanar listas con comprensión

Podemos usar list comprehension para **aplanar listas**.

```python
matriz = [[1,2], [3,4], [5,6]]

lista = [x for fila in matriz for x in fila]

print(lista)
```

Resultado esperado:

```
[1,2,3,4,5,6]
```

---

# Actividad 17 — Crear matrices con listas

```python
matriz = [[0]*3 for _ in range(3)]

print(matriz)
```

Resultado esperado:

```
[[0,0,0],
 [0,0,0],
 [0,0,0]]
```

Esto crea una **matriz 3x3**.

---

# Actividad 18 — Error común al crear matrices

Muchos programadores hacen esto:

```python
matriz = [[0]*3]*3

matriz[0][0] = 1

print(matriz)
```

Resultado inesperado:

```
[[1,0,0],
 [1,0,0],
 [1,0,0]]
```

Esto ocurre porque **las sublistas comparten la misma referencia en memoria**.

---

# Conclusiones

En este laboratorio se exploraron herramientas avanzadas para trabajar con **listas en Python**.

El alumno aprendió a:

* Crear listas con **list comprehension**
* Recorrer listas con **enumerate**
* Combinar listas con **zip**
* Aplicar funciones con **map**
* Filtrar elementos con **filter**
* Evaluar condiciones con **any y all**
* Copiar listas correctamente
* Evitar errores comunes al crear matrices

Estas técnicas forman parte del **estilo idiomático de Python** y son ampliamente utilizadas en proyectos profesionales.

