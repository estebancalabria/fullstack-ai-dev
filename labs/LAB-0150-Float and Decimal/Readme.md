# Laboratorio — Números decimales en Python: `float` vs `decimal`

## 🎯 Objetivo

En este laboratorio vamos a explorar cómo Python representa los **números decimales**.

Vas a descubrir:

* Qué es el tipo **`float`**
* Por qué a veces los resultados con decimales **no son exactos**
* Qué problema aparece con **`0.1 + 0.2`**
* Cómo solucionarlo usando **`Decimal`**
* Por qué **`Decimal` se usa para dinero**

---

# Actividad 1 — Números decimales con `float`

Los números con parte decimal en Python se representan con el tipo **`float`**.

```python
precio = 10.50
descuento = 2.25

total = precio - descuento

print(total)
print(type(total))
```

Resultado esperado:

```
8.25
<class 'float'>
```

Los valores con punto decimal se almacenan en Python como **float**. Este tipo de dato se utiliza para representar números reales, es decir, números que pueden tener parte fraccionaria.

---

# Actividad 2 — Operaciones con `float`

Podemos realizar operaciones matemáticas con números decimales de la misma manera que con números enteros.

```python
a = 0.1
b = 0.2

resultado = a + b

print(resultado)
```

Resultado esperado:

```
0.30000000000000004
```

Aunque matemáticamente **0.1 + 0.2 debería ser 0.3**, en Python aparece un pequeño error de precisión. Esto ocurre por la forma en que las computadoras representan los números decimales internamente.

---

# Actividad 3 — El famoso caso `0.1 + 0.2`

Probemos directamente la operación más conocida relacionada con la precisión de los números decimales.

```python
print(0.1 + 0.2)
```

Resultado esperado:

```
0.30000000000000004
```

Las computadoras representan los números utilizando **sistema binario (base 2)**. Algunos números decimales, como **0.1 o 0.2**, no pueden representarse exactamente en binario, por lo que se almacenan como **aproximaciones**. Al realizar operaciones con estas aproximaciones aparecen pequeños errores como este.

---

# Actividad 4 — Otro ejemplo de precisión

El mismo problema puede aparecer en otras operaciones con números decimales.

```python
resultado = 0.1 + 0.1 + 0.1

print(resultado)
```

Resultado esperado:

```
0.30000000000000004
```

Aunque el resultado matemático esperado es **0.3**, las pequeñas aproximaciones internas del tipo `float` pueden acumularse durante las operaciones y producir resultados ligeramente distintos.

---

# Actividad 5 — Usando `Decimal`

Python incluye el módulo **`decimal`**, que permite trabajar con números decimales con mayor precisión.

```python
from decimal import Decimal

a = Decimal("0.1")
b = Decimal("0.2")

resultado = a + b

print(resultado)
```

Resultado esperado:

```
0.3
```

El tipo **Decimal** almacena los números decimales de una manera que evita los errores de precisión típicos de `float`. Por eso se utiliza cuando se necesita mayor exactitud en los cálculos.

---

# Actividad 6 — `Decimal` para cálculos de dinero

Una de las aplicaciones más comunes de `Decimal` es en cálculos financieros.

```python
from decimal import Decimal

precio = Decimal("10.50")
descuento = Decimal("2.25")

total = precio - descuento

print(total)
```

Resultado esperado:

```
8.25
```

En sistemas financieros, contables o de facturación es importante evitar errores de redondeo. Por eso en este tipo de aplicaciones se utilizan **tipos de datos decimales precisos** como `Decimal` en lugar de `float`.

---

# Conclusiones

Al finalizar este laboratorio el alumno pudo observar cómo Python maneja los números decimales y comprender algunas de las limitaciones del tipo `float`.

También pudo comprobar que los números decimales no siempre se representan con exactitud en las computadoras debido al uso del sistema binario, lo que puede generar pequeños errores en ciertas operaciones.

Finalmente, el alumno aprendió que Python ofrece alternativas como el tipo `Decimal`, que permite realizar cálculos con mayor precisión y que es especialmente útil en contextos donde la exactitud es importante, como en aplicaciones financieras o de manejo de dinero.
