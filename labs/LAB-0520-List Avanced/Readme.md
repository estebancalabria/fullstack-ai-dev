# Laboratorio — Listas en Python (Nivel Avanzado)

## 🎯 Objetivo

En este laboratorio exploraremos técnicas avanzadas para trabajar con **listas en Python**, utilizadas en proyectos profesionales y entrevistas técnicas.

Aprenderás:

* Diferencia entre **`sort()` y `sorted()`**
* Cómo ordenar usando **`key`**
* Uso de **funciones lambda**
* Ordenar estructuras complejas
* Encontrar **máximos y mínimos**
* Trabajar con **listas grandes**
* Uso de **`heapq`** para top-k elementos
* Uso de **`bisect`** para insertar en listas ordenadas
* Patrones comunes de programación

---

# Actividad 1 — Ordenar una lista con `sort()`

El método `sort()` ordena la lista **modificando la lista original**.

```python
numeros = [5,2,9,1,3]

numeros.sort()

print(numeros)
```

Resultado esperado:

```
[1,2,3,5,9]
```

📌 `sort()` **modifica la lista existente**.

---

# Actividad 2 — Ordenar con `sorted()`

La función `sorted()` devuelve **una nueva lista ordenada**.

```python
numeros = [5,2,9,1,3]

ordenados = sorted(numeros)

print(numeros)
print(ordenados)
```

Resultado esperado:

```
[5,2,9,1,3]
[1,2,3,5,9]
```

📌 `sorted()` **no modifica la lista original**.

---

# Actividad 3 — Ordenar en orden descendente

Podemos ordenar usando `reverse=True`.

```python
numeros = [5,2,9,1]

numeros.sort(reverse=True)

print(numeros)
```

Resultado esperado:

```
[9,5,2,1]
```

---

# Actividad 4 — Ordenar usando `key`

Podemos definir **cómo ordenar los elementos**.

```python
palabras = ["python", "java", "c", "javascript"]

palabras.sort(key=len)

print(palabras)
```

Resultado esperado:

```
['c', 'java', 'python', 'javascript']
```

Aquí las palabras se ordenan **según su longitud**.

---

# Actividad 5 — Usar `lambda`

Una **lambda** es una función anónima.

```python
numeros = [1,2,3,4]

resultado = list(map(lambda x: x*3, numeros))

print(resultado)
```

Resultado esperado:

```
[3,6,9,12]
```

---

# Actividad 6 — Ordenar listas de diccionarios

Supongamos que tenemos datos de personas.

```python
personas = [
    {"nombre":"Ana", "edad":25},
    {"nombre":"Luis", "edad":30},
    {"nombre":"Pedro", "edad":20}
]

personas.sort(key=lambda p: p["edad"])

print(personas)
```

Resultado esperado:

```
[
 {'nombre':'Pedro','edad':20},
 {'nombre':'Ana','edad':25},
 {'nombre':'Luis','edad':30}
]
```

Esto ordena la lista **por edad**.

---

# Actividad 7 — Encontrar máximo y mínimo

Python tiene funciones incorporadas.

```python
numeros = [10,40,5,99,23]

print(max(numeros))
print(min(numeros))
```

Resultado esperado:

```
99
5
```

---

# Actividad 8 — Obtener los 3 números más grandes

Podemos usar `sorted`.

```python
numeros = [10,40,5,99,23,50]

top3 = sorted(numeros, reverse=True)[:3]

print(top3)
```

Resultado esperado:

```
[99,50,40]
```

---

# Actividad 9 — Usar `heapq` para Top-K

Para listas grandes es mejor usar **heapq**.

```python
import heapq

numeros = [10,40,5,99,23,50]

top3 = heapq.nlargest(3, numeros)

print(top3)
```

Resultado esperado:

```
[99,50,40]
```

Esto es **más eficiente para grandes datasets**.

---

# Actividad 10 — Usar `heapq` para los menores

```python
import heapq

numeros = [10,40,5,99,23,50]

menores = heapq.nsmallest(2, numeros)

print(menores)
```

Resultado esperado:

```
[5,10]
```

---

# Actividad 11 — Buscar posición con `bisect`

El módulo `bisect` permite trabajar con **listas ordenadas**.

```python
import bisect

numeros = [10,20,30,40]

pos = bisect.bisect(numeros, 25)

print(pos)
```

Resultado esperado:

```
2
```

Esto indica **dónde insertar el número para mantener el orden**.

---

# Actividad 12 — Insertar manteniendo orden

```python
import bisect

numeros = [10,20,30,40]

bisect.insort(numeros, 25)

print(numeros)
```

Resultado esperado:

```
[10,20,25,30,40]
```

---

# Actividad 13 — Eliminar duplicados

Podemos eliminar duplicados usando `set`.

```python
numeros = [1,2,2,3,3,3,4]

sin_duplicados = list(set(numeros))

print(sin_duplicados)
```

Resultado posible:

```
[1,2,3,4]
```

⚠ El orden puede cambiar.

---

# Actividad 14 — Eliminar duplicados manteniendo orden

```python
numeros = [1,2,2,3,3,3,4]

resultado = list(dict.fromkeys(numeros))

print(resultado)
```

Resultado esperado:

```
[1,2,3,4]
```

---

# Actividad 15 — Concatenar listas

```python
a = [1,2,3]
b = [4,5,6]

resultado = a + b

print(resultado)
```

Resultado esperado:

```
[1,2,3,4,5,6]
```

---

# Actividad 16 — Desempaquetar listas

Python permite **desempaquetar listas**.

```python
numeros = [10,20,30]

a, b, c = numeros

print(a,b,c)
```

Resultado esperado:

```
10 20 30
```

---

# Actividad 17 — Desempaquetar con resto

```python
numeros = [1,2,3,4,5]

a, *resto = numeros

print(a)
print(resto)
```

Resultado esperado:

```
1
[2,3,4,5]
```

---

# Actividad 18 — Patrón común: contar frecuencias

```python
numeros = [1,2,2,3,3,3]

frecuencia = {}

for n in numeros:
    frecuencia[n] = frecuencia.get(n, 0) + 1

print(frecuencia)
```

Resultado esperado:

```
{1:1, 2:2, 3:3}
```

---

# Conclusiones

En este laboratorio se exploraron técnicas avanzadas para trabajar con **listas en Python**, incluyendo herramientas utilizadas en código profesional.

El alumno aprendió:

* Diferencia entre **`sort()` y `sorted()`**
* Ordenar usando **key y lambda**
* Ordenar estructuras complejas
* Encontrar **máximos y mínimos**
* Obtener **top-k elementos**
* Usar **heapq**
* Insertar en listas ordenadas con **bisect**
* Eliminar duplicados
* Desempaquetar listas
* Implementar patrones comunes

Con estos conocimientos el alumno alcanza un **nivel avanzado en el manejo de listas en Python**.

