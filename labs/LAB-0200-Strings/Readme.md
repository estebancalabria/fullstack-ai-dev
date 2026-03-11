# Laboratorio — Uso de Strings en Python

## 🎯 Objetivo

En este laboratorio vamos a explorar cómo Python trabaja con **strings**, el tipo de dato utilizado para representar **texto**.

Los strings son una parte fundamental de cualquier programa, ya que permiten manipular nombres, mensajes, archivos, datos de usuarios y mucho más.

En este laboratorio aprenderás:

* Qué es un **string**
* Que los **strings son inmutables**
* Cómo explorar los **métodos disponibles** usando `dir()`
* Cómo utilizar **métodos comunes de strings**
* Cómo funcionan los **slices**
* Cómo usar la sintaxis `:`, `inicio:fin` y `::`

---

# Actividad 1 — Creando un string

Un string es una secuencia de caracteres. Se puede definir usando comillas simples o dobles.

```python
mensaje = "Hola Python"

print(mensaje)
print(type(mensaje))
```

Resultado esperado:

```
Hola Python
<class 'str'>
```

En Python el tipo de dato utilizado para representar texto es **`str`**. Un string puede contener letras, números, espacios y símbolos.

---

# Actividad 2 — Strings inmutables

Los strings en Python son **inmutables**, lo que significa que no pueden modificarse directamente después de ser creados.

```python
texto = "Python"

texto[0] = "J"
```

Resultado esperado:

```
TypeError: 'str' object does not support item assignment
```

Esto ocurre porque los strings **no pueden modificarse carácter por carácter**. Cuando se realizan operaciones sobre un string, Python en realidad crea **un nuevo string** en lugar de modificar el original.

---

# Actividad 3 — Explorando los métodos disponibles

Podemos explorar los métodos que tiene un string utilizando la función `dir()`.

```python
texto = "python"

print(dir(texto))
```

Resultado esperado (fragmento):

```
['capitalize', 'casefold', 'center', 'count', 'encode', 'endswith',
'find', 'index', 'isalnum', 'isalpha', 'islower', 'isupper',
'lower', 'replace', 'split', 'strip', 'title', 'upper', ...]
```

Los strings tienen muchos **métodos incorporados** que permiten manipular texto.
La función `dir()` permite ver todos los métodos disponibles para un objeto.

---

# Actividad 4 — Método `upper()`

Podemos transformar un string a mayúsculas usando el método `upper()`.

```python
texto = "python"

resultado = texto.upper()

print(resultado)
```

Resultado esperado:

```
PYTHON
```

El método `upper()` devuelve una **nueva versión del string en mayúsculas**.

---

# Actividad 5 — Método `lower()`

El método `lower()` convierte el texto a minúsculas.

```python
texto = "PYTHON"

resultado = texto.lower()

print(resultado)
```

Resultado esperado:

```
python
```

Este método devuelve un nuevo string con todos los caracteres convertidos a minúsculas.

---

# Actividad 6 — Método `replace()`

Podemos reemplazar partes de un string usando `replace()`.

```python
texto = "Hola Python"

nuevo_texto = texto.replace("Python", "Mundo")

print(nuevo_texto)
```

Resultado esperado:

```
Hola Mundo
```

El método `replace()` crea un nuevo string donde se reemplaza una parte del texto por otra.

---

# Actividad 7 — Usando slices

Podemos extraer partes de un string usando **slices**.

```python
texto = "Python"

print(texto[0:3])
```

Resultado esperado:

```
Pyt
```

La sintaxis `inicio:fin` permite seleccionar una porción del string.
El índice inicial se incluye, pero el índice final **no se incluye**.

---

# Actividad 8 — Slice desde una posición

Si omitimos el índice final, Python toma el resto del string.

```python
texto = "Python"

print(texto[2:])
```

Resultado esperado:

```
thon
```

Cuando se omite el valor final en un slice, Python toma todos los caracteres desde esa posición hasta el final.

---

# Actividad 9 — Slice desde el inicio

También podemos omitir el índice inicial.

```python
texto = "Python"

print(texto[:3])
```

Resultado esperado:

```
Pyt
```

Cuando se omite el índice inicial, Python comienza desde la primera posición del string.

---

# Actividad 10 — Usando `::` para saltos

La sintaxis `::` permite definir el **paso** entre caracteres.

```python
texto = "Python"

print(texto[::2])
```

Resultado esperado:

```
Pto
```

El tercer valor en un slice indica el **salto entre posiciones**. En este caso se toman los caracteres de dos en dos.

---

# Conclusiones

Al finalizar este laboratorio el alumno pudo explorar el tipo de dato **string (`str`)**, utilizado para representar texto en Python.

También aprendió a descubrir los **métodos disponibles** utilizando `dir()`, a aplicar algunos de los métodos más comunes y a extraer partes del texto mediante **slices**.

Finalmente, el alumno pudo comprender que los **strings son inmutables**, lo que significa que no pueden modificarse directamente y que muchas operaciones generan **nuevos strings** en lugar de alterar el original.
