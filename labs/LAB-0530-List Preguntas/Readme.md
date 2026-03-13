# Laboratorio — Evaluación de Listas en Python

## 🎯 Objetivo

En este laboratorio el alumno pondrá a prueba su conocimiento sobre **listas en Python** resolviendo una serie de preguntas y ejercicios.

Se evaluarán conceptos como:

* Índices
* Slicing
* Mutabilidad
* Métodos de listas
* Comprensión de listas
* Copias de listas
* Comportamientos inesperados

---

# Parte 1 — Preguntas conceptuales

## Pregunta 1

```python
lista = [1,2,3,4,5]

print(lista[:3])
```

❓ ¿Qué muestra?

Respuesta esperada:

```
[1,2,3]
```

---

## Pregunta 2

```python
lista = [1,2,3,4,5]

print(lista[2:5])
```

❓ ¿Qué muestra?

Respuesta esperada:

```
[3,4,5]
```

📌 El índice final **no se incluye**.

---

## Pregunta 3

```python
lista = [1,2,3,4,5]

print(lista[::-1])
```

❓ ¿Qué hace este slicing?

Respuesta:

Invierte la lista.

Resultado:

```
[5,4,3,2,1]
```

---

## Pregunta 4

```python
lista = [10,20,30,40]

print(lista[-1])
```

❓ ¿Qué muestra?

Respuesta:

```
40
```

---

## Pregunta 5

```python
lista = [1,2,3]

lista.append(4)

print(lista)
```

❓ ¿Qué método se utilizó?

Respuesta:

`append()` agrega un elemento al final de la lista.

---

# Parte 2 — Preguntas de comportamiento

## Pregunta 6

```python
lista = [0] * 5

print(lista)
```

❓ ¿Qué contiene la lista?

Respuesta:

```
[0,0,0,0,0]
```

---

## Pregunta 7

```python
lista = [1,2,3]

lista.insert(1, 99)

print(lista)
```

Respuesta esperada:

```
[1,99,2,3]
```

---

## Pregunta 8

```python
lista = [1,2,3]

lista.remove(2)

print(lista)
```

Resultado:

```
[1,3]
```

---

## Pregunta 9

```python
lista = [10,20,30]

valor = lista.pop()

print(valor)
print(lista)
```

Respuesta:

```
30
[10,20]
```

---

## Pregunta 10

```python
lista = [5,2,9,1]

lista.sort()

print(lista)
```

Resultado:

```
[1,2,5,9]
```

---

# Parte 3 — Preguntas trampa (muy comunes)

## Pregunta 11

```python
lista1 = [1,2,3]

lista2 = lista1

lista2.append(4)

print(lista1)
```

❓ ¿Qué ocurre?

Resultado:

```
[1,2,3,4]
```

📌 Ambas variables apuntan a **la misma lista**.

---

## Pregunta 12

```python
lista1 = [1,2,3]

lista2 = lista1.copy()

lista2.append(4)

print(lista1)
print(lista2)
```

Resultado:

```
[1,2,3]
[1,2,3,4]
```

---

## Pregunta 13

```python
lista = [[0]*3]*3

lista[0][0] = 1

print(lista)
```

Resultado:

```
[[1,0,0],
 [1,0,0],
 [1,0,0]]
```

📌 Todas las filas comparten la **misma referencia**.

---

# Parte 4 — Comprensión de listas

## Pregunta 14

```python
lista = [x for x in range(5)]

print(lista)
```

Resultado:

```
[0,1,2,3,4]
```

---

## Pregunta 15

```python
lista = [x*2 for x in range(4)]

print(lista)
```

Resultado:

```
[0,2,4,6]
```

---

## Pregunta 16

```python
lista = [x for x in range(10) if x % 2 == 0]

print(lista)
```

Resultado:

```
[0,2,4,6,8]
```

---

# Parte 5 — Preguntas de razonamiento

## Pregunta 17

```python
lista = [1,2,3]

lista.extend([4,5])

print(lista)
```

Resultado:

```
[1,2,3,4,5]
```

---

## Pregunta 18

```python
a = [1,2,3]
b = [4,5]

print(a + b)
```

Resultado:

```
[1,2,3,4,5]
```

---

## Pregunta 19

```python
lista = [3,1,4,2]

print(sorted(lista))
print(lista)
```

Resultado:

```
[1,2,3,4]
[3,1,4,2]
```

📌 `sorted()` **no modifica la lista original**.

---

## Pregunta 20

```python
lista = [10,20,30]

print(len(lista))
```

Resultado:

```
3
```

---

# Parte 6 — Desafíos prácticos

## Desafío 1

Crear una lista con los números del **1 al 10** usando list comprehension.

Resultado esperado:

```
[1,2,3,4,5,6,7,8,9,10]
```

---

## Desafío 2

Invertir una lista sin usar `reverse()`.

Pista:

```
[::-1]
```

---

## Desafío 3

Eliminar duplicados de la lista:

```
[1,2,2,3,3,4]
```

Resultado esperado:

```
[1,2,3,4]
```

