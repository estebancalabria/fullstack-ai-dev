# 🧠 Tipos de Datos en Python

En programación, un **tipo de dato** define **qué clase de información almacena una variable** y **qué operaciones se pueden realizar sobre ella**.

Python posee varios tipos de datos integrados que permiten trabajar con números, texto, valores lógicos y estructuras más complejas.

Una variable se crea simplemente asignando un valor:

```python
x = 10
nombre = "Python"
activo = True
```

Python detecta automáticamente el tipo de dato.

Esto se llama **tipado dinámico**.

---

# 🔎 Saber el tipo de una variable

Podemos utilizar la función `type()` para conocer el tipo de dato.

```python
x = 10
print(type(x))
```

Resultado:

```
<class 'int'>
```

También podemos verificar si una variable pertenece a un tipo usando `isinstance()`.

```python
x = 10

print(isinstance(x, int))
```

Resultado:

```
True
```

---

# 🔢 Números en Python

Python posee varios tipos numéricos.

## Enteros (int)

Representan números enteros positivos o negativos.

```python
a = 10
b = -25
c = 1000000

print(a + b + c)
```

Python permite mejorar la legibilidad usando guiones bajos.

```python
numero_grande = 1_000_000
```

Los enteros **no tienen límite fijo**, solo dependen de la memoria disponible.

```python
numero_muy_grande = 10 ** 100
print(numero_muy_grande)
```

Operadores comunes:

| Operador | Descripción |
| -------- | ----------- |

* | suma |

- | resta |

* | multiplicación |
  ** | potencia |
  // | división entera |
  % | resto |

Ejemplo:

```python
a = 5
b = 2

print(a / b)
print(a // b)
print(a % b)
```

---

## Números de punto flotante (float)

Representan números con decimales.

```python
x = 3.14
y = 2.0

print(type(x))
print(type(y))
```

Python usa el estándar **IEEE 754 de doble precisión (64 bits)**.

Debido a esto pueden aparecer pequeñas imprecisiones:

```python
print(0.1 + 0.2)
```

Resultado:

```
0.30000000000000004
```

Por eso **los float no son ideales para cálculos financieros**.

Notación científica:

```python
cientifica = 1.5e3
print(cientifica)
```

Resultado:

```
1500.0
```

---

## Números complejos (complex)

Python soporta números complejos.

```python
z = 2 + 3j

print(type(z))
print(z.real)
print(z.imag)
```

Se utilizan principalmente en **matemática avanzada, física y procesamiento de señales**.

---

# 💰 Decimal

Para cálculos que requieren **precisión exacta** (como dinero), Python posee el tipo `Decimal`.

Forma parte de la **librería estándar**.

```python
from decimal import Decimal

a = Decimal("0.1")
b = Decimal("0.2")

print(a + b)
```

Resultado exacto:

```
0.3
```

---

# 🔘 Booleanos (bool)

Representan valores lógicos:

```
True
False
```

Se utilizan en comparaciones y condiciones.

```python
edad = 30

mayor = edad > 18
print(mayor)
```

Comparaciones comunes:

| Operador | Significado |
| -------- | ----------- |
| ==       | igual       |
| !=       | distinto    |

> | mayor |
> < | menor |
> = | mayor o igual |
> <= | menor o igual |

Ejemplo:

```python
a = 50

print(a == 50)
print(a != 30)
```

Curiosidad: en Python los booleanos internamente son números.

```python
print(True + True)
print(False + True)
```

Resultado:

```
2
1
```

---

# 📝 Strings (str)

Los **strings** representan texto.

```python
nombre = "Esteban"
apellido = 'Calabria'
```

También se pueden crear strings multilínea.

```python
parrafo = """
Este es un texto
que ocupa varias
líneas.
"""
```

---

# 🔒 Inmutabilidad de los Strings

Los strings en Python son **inmutables**.

Esto significa que **no pueden modificarse después de crearse**.

```python
nombre = "Python"

nombre[0] = "J"
```

Esto genera un error.

Para modificar un string realmente se crea uno nuevo.

```python
nombre = "Python"
nombre = nombre + " 3"
```

---

# 🔎 Longitud de un String

Podemos usar `len()`.

```python
texto = "Python"

print(len(texto))
```

---

# 🔢 Indexación

Cada carácter tiene una posición.

```python
nombre = "Python"

print(nombre[0])
print(nombre[1])
```

También podemos acceder desde el final.

```python
print(nombre[-1])
```

---

# ✂️ Slicing

El slicing permite extraer partes de un string.

Sintaxis:

```
[inicio:fin]
```

Ejemplo:

```python
nombre = "Python"

print(nombre[1:4])
```

Resultado:

```
yth
```

---

## Slicing avanzado

```python
nombre = "Python"

print(nombre[:4])
print(nombre[2:])
print(nombre[:])
```

---

## Invertir un string

```python
nombre = "Python"

print(nombre[::-1])
```

Resultado:

```
nohtyP
```

---

# 🔍 Operadores de pertenencia

Podemos verificar si un texto contiene otro.

```python
frase = "Hola que tal"

print("Hola" in frase)
print("Chau" in frase)
```

---

# 🛠 Métodos útiles de Strings

Eliminar espacios:

```python
mensaje = "   hola   "

print(mensaje.strip())
print(mensaje.lstrip())
print(mensaje.rstrip())
```

Cambiar formato:

```python
nombre = "esteban calabria"

print(nombre.upper())
print(nombre.lower())
print(nombre.capitalize())
print(nombre.title())
```

---

# 🎯 Formateo de Strings (f-strings)

La forma moderna de formatear texto es usando **f-strings**.

```python
nombre = "Esteban"
edad = 45

print(f"Me llamo {nombre} y tengo {edad} años")
```

Es **más legible y eficiente** que concatenar strings.

---

# 🧠 Resumen de Tipos de Datos

| Tipo    | Descripción                 |
| ------- | --------------------------- |
| int     | números enteros             |
| float   | números con decimales       |
| complex | números complejos           |
| Decimal | números de precisión exacta |
| bool    | valores lógicos             |
| str     | cadenas de texto            |

