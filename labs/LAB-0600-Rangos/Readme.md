# **Laboratorio: Rangos en Python**

## **Objetivo**

Aprender a usar el objeto `range` en Python de forma completa:

* Crear rangos con distintos parámetros (`inicio`, `fin`, `paso`)
* Guardar rangos en variables y usar en bucles `for`
* Conversiones a lista, tupla y set
* Indexación y slicing completo de rangos
* Rangos descendentes y negativos
* Uso de rangos en expresiones y operaciones aritméticas
* Comparación de eficiencia de memoria entre `range` y `list`

---

## **1️⃣ Introducción al objeto `range`**

`range` genera secuencias de enteros. No es mutable ni una lista, pero se puede convertir con `list()`.

**Sintaxis:**

```python
range(fin)                 # 0 hasta fin-1
range(inicio, fin)         # inicio hasta fin-1
range(inicio, fin, paso)   # inicio hasta fin-1, con paso
```

**Ejemplos:**

```python
# Del 0 al 4
rango1 = range(5)
print(list(rango1))  # [0, 1, 2, 3, 4]

# Del 3 al 7
rango2 = range(3, 8)
print(list(rango2))  # [3, 4, 5, 6, 7]

# De 10 a 0 descendiendo de 2 en 2
rango3 = range(10, -1, -2)
print(list(rango3))  # [10, 8, 6, 4, 2, 0]
```

---

## **2️⃣ Rangos y pasos**

* Paso positivo → secuencia ascendente
* Paso negativo → secuencia descendente
* Paso mayor a 1 → saltos en la secuencia

```python
# Saltando de 2 en 2
rango_salto = range(0, 11, 2)
print(list(rango_salto))  # [0, 2, 4, 6, 8, 10]

# Paso negativo (descendente)
rango_desc = range(5, -6, -1)
print(list(rango_desc))  # [5, 4, 3, 2, 1, 0, -1, -2, -3, -4, -5]
```

---

## **3️⃣ Conversiones de `range`**

```python
r = range(1, 6)
print(list(r))   # [1,2,3,4,5]
print(tuple(r))  # (1,2,3,4,5)
print(set(r))    # {1,2,3,4,5}
```

---

## **4️⃣ Indexación y slicing básico**

`range` permite **indexación** y **slicing**:

```python
r = range(10)  # 0..9

print(r[0])   # 0
print(r[-1])  # 9

# Slicing básico
print(list(r[2:5]))  # [2,3,4]
print(list(r[:5]))   # [0,1,2,3,4]
print(list(r[5:]))   # [5,6,7,8,9]
print(list(r[::2]))  # [0,2,4,6,8]
```

---

## **5️⃣ Slicing avanzado con 3 parámetros `[inicio:fin:paso]`**

Podemos usar **slice completo** con inicio, fin y paso, incluyendo reversa:

```python
r = range(1, 11)  # 1..10

# Desde el inicio hasta el final con paso 2
print(list(r[0:10:2]))  # [1,3,5,7,9]

# Omitiendo el fin
print(list(r[0::2]))    # [1,3,5,7,9]

# Omitiendo inicio y fin
print(list(r[::2]))      # [1,3,5,7,9]

# Cada segundo elemento desde el índice 1
print(list(r[1::2]))     # [2,4,6,8,10]

# Reversa completa
print(list(r[::-1]))     # [10,9,8,7,6,5,4,3,2,1]

# Reversa saltando de 2 en 2 desde el índice 8
print(list(r[8::-2]))    # [9,7,5,3,1]

# Otra variante: desde el penúltimo hacia atrás saltando 2
print(list(r[-2::-2]))   # [9,7,5,3,1]
```

> 🔹 Este bloque cubre **todas las formas de slicing con rango**, incluyendo pasos negativos y saltos.

---

## **6️⃣ Rangos descendentes y negativos**

```python
# Correcto descendente
print(list(range(5, -6, -1)))  # [5,4,3,2,1,0,-1,-2,-3,-4,-5]

# Paso positivo y dirección inversa -> rango vacío
print(list(range(5, -6, 1)))   # []
```

---

## **7️⃣ Rangos dinámicos con expresiones**

```python
inicio = 2
fin = 10
salto = 2
r = range(inicio, fin, salto)
print(list(r))  # [2,4,6,8]
```

---

## **8️⃣ Uso de `range` en bucles `for`**

```python
rango1 = range(1, 11)  # 1..10

for numero in rango1:
    print(numero)
```

> 🔹 Puedes asignar el rango a una variable y usarlo varias veces.

---

## **9️⃣ Eficiencia de memoria: `range` vs `list`**

```python
import sys

rango_grande = range(1, 1000000)
print("Tamaño en memoria del rango:", sys.getsizeof(rango_grande), "bytes")

lista_grande = list(rango_grande)
print("Tamaño en memoria de la lista:", sys.getsizeof(lista_grande), "bytes")
```

---

## **🔟 Ejercicios completos**

1. Genera un `range` que vaya de 1 a 50, solo múltiplos de 5.
2. Crea un rango descendente del 100 al 50 de 5 en 5.
3. Convierte un rango de 10 a 20 a tupla y set.
4. Dado `r = range(20)`, imprime:

   * Primeros 10 números
   * Últimos 5 números
   * Cada tercer número
   * Números en orden inverso
5. Crear un rango descendente del 50 al 0, solo múltiplos de 5.
6. Pide al usuario `inicio`, `fin` y `paso`, genera un rango y muestra la lista.
7. Guarda un rango de 1 a 5000, recórrelo con `for` mostrando múltiplos de 250, mide su tamaño en memoria antes y después de convertirlo en lista.
8. Crear los primeros 20 números impares con `range`.
9. Generar un rango de múltiplos de 3 entre 3 y 99.
10. Crear un rango que contenga los cuadrados de los primeros 10 números `[1,4,9,...]`.

---

💡 **Nota:** Este laboratorio cubre **todo sobre `range`**: creación, pasos, slicing avanzado, bucles, conversiones y eficiencia de memoria.
