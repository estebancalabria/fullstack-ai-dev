# 🔍 Laboratorio: Investigando Python — tipos de datos, objetos e identidad en memoria

## Introducción

En este laboratorio vamos a **explorar cómo Python representa los datos, introducir el concepto de objeto y analizar cómo el lenguaje maneja estos valores utilizando diferentes herramientas.**

En este laboratorio aprenderás a:

* explorar los **tipos de datos básicos** en Python
* identificar el **tipo de un valor** utilizando herramientas del lenguaje
* descubrir **operaciones disponibles** para distintos valores
* introducir el **concepto de objeto** en programación
* analizar cómo Python identifica los **objetos en memoria**
* comprender la diferencia entre **igualdad** e **identidad**

---

# Actividad 1 — Explorando el tipo de los valores

Ejecutar el siguiente código:

```python
numero = 5
decimal = 3.14
texto = "hola"
valor = True

print(type(numero))
print(type(decimal))
print(type(texto))
print(type(valor))
```

### Resultado esperado

```
<class 'int'>
<class 'float'>
<class 'str'>
<class 'bool'>
```

En Python, los tipos de datos básicos que se utilizan habitualmente incluyen:

* `int` → números enteros
* `float` → números con decimales
* `str` → texto (strings)
* `bool` → valores verdadero o falso

Cada valor que utilizamos en Python tiene asociado **un tipo**.

---

# Actividad 2 — Explorando operaciones disponibles en texto

Ejecutar el siguiente código:

```python
texto = "hola"

print(texto.upper())
```

### Resultado esperado

```
HOLA
```

Ahora ejecutar:

```python
dir(texto)
```

### Resultado esperado

Se mostrará una lista extensa de atributos y operaciones disponibles para el valor, por ejemplo:

```
['capitalize', 'casefold', 'center', 'count', 'encode', 'endswith',
 'find', 'index', 'isalnum', 'isalpha', 'isdigit', 'islower',
 'isspace', 'istitle', 'isupper', 'join', 'lower', 'replace',
 'split', 'startswith', 'strip', 'title', 'upper']
```

Probar ejecutar alguna de estas operaciones.

Ejemplo:

```python
texto.replace("h", "H")
```

### Resultado esperado

```
Hola
```

---

# Actividad 3 — Explorando operaciones en números e introduciendo el concepto de objeto

Ejecutar el siguiente código:

```python
x = 5

print(type(x))
print(dir(x))
```

### Resultado esperado

```
<class 'int'>
```

Luego aparecerá una lista de operaciones disponibles para el número, por ejemplo:

```
['as_integer_ratio', 'bit_count', 'bit_length', 'conjugate', 'to_bytes']
```

Ejecutar uno de los métodos encontrados:

```python
x.bit_length()
```

### Resultado esperado

```
3
```

En muchos lenguajes de programación existen **tipos de datos primitivos**, como números o texto, que se manejan de forma diferente a los objetos.

Python adopta un enfoque distinto: incluso los valores más simples como números, texto o valores booleanos se manejan de una manera particular dentro del lenguaje.

A partir de lo observado se puede introducir el siguiente concepto:

> En programación, un **objeto** es un valor que posee:
>
> * un **tipo**
> * posibles **operaciones o métodos**

El valor `5` tiene un tipo (`int`) y posee operaciones como `bit_length()`.

---

# Actividad 4 — Verificando tipos con `isinstance`

Ejecutar el siguiente código:

```python
x = 5

print(isinstance(x, int))
print(isinstance(x, str))
```

### Resultado esperado

```
True
False
```

Probar también con otros valores:

```python
print(isinstance("hola", str))
print(isinstance(True, bool))
print(isinstance(3.14, float))
```

### Resultado esperado

```
True
True
True
```

---

# Actividad 5 — Identidad de los objetos en memoria

Ejecutar el siguiente código:

```python
x = 5

print(id(x))
```

### Resultado esperado

Se mostrará un número entero que representa la **identidad del objeto en memoria**.

Ejemplo:

```
140328829567440
```

Ahora ejecutar:

```python
a = 5
b = 5

print(id(a))
print(id(b))
```

### Resultado esperado

En muchos casos ambos valores serán iguales, por ejemplo:

```
140328829567440
140328829567440
```

---

# Actividad 6 — Variables que referencian el mismo objeto

Ejecutar el siguiente código:

```python
x = 5
y = x

print(id(x))
print(id(y))
```

### Resultado esperado

```
140328829567440
140328829567440
```

Ahora modificar el valor de `x`:

```python
x = 7

print(id(x))
print(id(y))
```

### Resultado esperado

```
140328829568112
140328829567440
```

---

# Actividad 7 — Igualdad vs identidad

Ejecutar el siguiente código:

```python
a = 1000
b = 1000

print(a == b)
print(a is b)
```

### Resultado esperado

```
True
False
```

* `==` compara **si los valores son iguales**
* `is` compara **si ambos nombres hacen referencia al mismo objeto**

---

# Conclusiones

A partir de los experimentos realizados en el laboratorio se puede observar que:

* los valores en Python tienen un **tipo asociado**
* los valores poseen **operaciones disponibles** que pueden ejecutarse
* es posible inspeccionar estas operaciones con herramientas como `dir()`
* Python permite verificar tipos con `type()` e `isinstance()`
* los valores tienen una **identidad en memoria**, observable con `id()`
* dos variables pueden referenciar **el mismo objeto o distintos objetos**

Estas características muestran que incluso valores simples como números, texto o booleanos se comportan dentro del lenguaje de una manera similar a **objetos**.
