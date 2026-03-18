# **Laboratorio: Tuplas en Python**

## **Objetivo**

Aprender a usar tuplas en Python:

* Crear tuplas de distintas formas
* Acceder a elementos mediante índices y slices
* Operaciones básicas: concatenación, repetición, desempaquetado
* Métodos de tupla (`count` y `index`)
* Diferencias con listas
* Uso de tuplas con objetos mutables

---

## **1️⃣ Creación de tuplas**

```python id="1yxq2p"
# Tupla vacía
t1 = ()

# Tupla con varios elementos
t2 = (1, 2, 3, "Hola", True)

# Tupla con un solo elemento (nota el coma!)
t3 = (5,)

# Tupla a partir de un rango
t4 = tuple(range(5))  # (0,1,2,3,4)

print(t1, t2, t3, t4)
```

---

## **2️⃣ Acceso a elementos e indexación**

```python id="9jfw8q"
t = (10, 20, 30, 40, 50)

# Índices positivos
print(t[0])  # 10
print(t[2])  # 30

# Índices negativos
print(t[-1])  # 50
print(t[-2])  # 40
```

---

## **3️⃣ Slicing en tuplas**

```python id="4dps0x"
t = (1, 2, 3, 4, 5, 6, 7, 8, 9, 10)

# Slicing básico
print(t[0:5])  # (1,2,3,4,5)
print(t[5:])   # (6,7,8,9,10)
print(t[:5])   # (1,2,3,4,5)

# Slicing con paso
print(t[::2])  # (1,3,5,7,9)
print(t[1::2]) # (2,4,6,8,10)

# Reversa
print(t[::-1]) # (10,9,8,7,6,5,4,3,2,1)
```

---

## **4️⃣ Concatenación y repetición**

```python id="7qpm3c"
t1 = (1, 2, 3)
t2 = (4, 5)

# Concatenación
t3 = t1 + t2
print(t3)  # (1,2,3,4,5)

# Repetición
t4 = t1 * 3
print(t4)  # (1,2,3,1,2,3,1,2,3)
```

---

## **5️⃣ Desempaquetado de tuplas**

```python id="vpxg4a"
t = (10, 20, 30)

a, b, c = t
print(a, b, c)  # 10 20 30

# Desempaquetado con asterisco
x, *y = t
print(x, y)  # 10 [20, 30]
```

---

## **6️⃣ Métodos de tuplas**

```python id="s6m9uo"
t = (1, 2, 2, 3, 4, 2)

# Contar cuántas veces aparece un elemento
print(t.count(2))  # 3

# Índice de la primera aparición
print(t.index(3))  # 3
```

---

## **7️⃣ Tuplas con objetos mutables**

```python id="7d8lpq"
t = (1, 2, [3, 4])
print(t)  # (1,2,[3,4])

# Modificar la lista dentro de la tupla
t[2].append(5)
print(t)  # (1,2,[3,4,5])
```

> 🔹 Nota: La tupla sigue siendo inmutable, pero los **objetos mutables dentro sí se pueden modificar**.

---

## **8️⃣ Diferencias con listas**

| Característica      | Lista            | Tupla            |
| ------------------- | ---------------- | ---------------- |
| Mutabilidad         | Mutable          | Inmutable        |
| Métodos disponibles | append, pop...   | count, index     |
| Memoria             | Mayor            | Menor            |
| Usos recomendados   | Datos cambiantes | Datos constantes |

---

## **9️⃣ Ejercicios prácticos**

1. Crear una tupla con los números del 1 al 10 usando `range`.
2. Acceder al primer, tercer y último elemento de la tupla.
3. Imprimir los elementos desde el 3er hasta el 7mo (slice).
4. Crear una tupla con letras de una palabra, luego imprimir en reversa.
5. Concatenar dos tuplas y repetir el resultado 2 veces.
6. Desempaquetar la tupla `(100, 200, 300, 400)` usando asterisco para capturar todos menos el primero.
7. Crear una tupla que contenga una lista `[1,2,3]` y modificar la lista dentro de la tupla agregando un 4.
8. Contar cuántas veces aparece el número 2 en `(1,2,2,3,2,4)`.
9. Crear un rango del 1 al 20 y convertirlo en tupla. Mostrar primer y último elemento.
10. Explicar por qué no se puede hacer `t[0] = 100` si `t` es una tupla.
