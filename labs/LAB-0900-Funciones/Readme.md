# **Laboratorio: Funciones en Python**

## **Objetivo**

En este laboratorio aprenderás a:

* Entender cómo funcionan las funciones en Python.
* Conocer los valores de retorno de las funciones.
* Usar parámetros posicionales y por nombre.
* Trabajar con `*args` y `**kwargs`.
* Retornar múltiples valores y comprender cómo se almacenan.
* Usar el asterisco `*` al pasar iterables a funciones.
* Diferenciar entre `raise NotImplementedError` y `return NotImplemented`.

---

## **1 Funciones y retorno implícito**

```python id="f1a2b3"
# Definimos una función sin return explícito
def saludo():
    print("Hola!")

resultado = saludo()  # Llamamos a la función

print("El resultado de la función es:", resultado)
```

**Explicación:**

* Cuando una función **no tiene `return` explícito**, Python devuelve `None`.
* `None` es un tipo especial que representa “nada” o “ausencia de valor”.

---

## **2️ Ventaja de usar nombres de parámetros**

```python id="f2c4d5"
def presentar(nombre, edad, ciudad):
    print(f"{nombre} tiene {edad} años y vive en {ciudad}.")

# Invocación con nombres de parámetros
presentar(edad=30, nombre="Ana", ciudad="Buenos Aires")
```

**Explicación:**

* Al usar nombres de parámetros (`nombre=valor`), no importa el orden de los argumentos.
* Hace tu código más **legible** y evita errores por confundir posiciones.

---

## **4 Uso del asterisco `*` al definir parámetros**

```python id="f3e6f7"
def sumar_todos(*numeros):
    return sum(numeros)

print(sumar_todos(1, 2, 3, 4))
```

**Explicación:**

* `*numeros` permite pasar **una cantidad variable de argumentos posicionales**.
* Dentro de la función, `numeros` es una **tupla** con todos los valores recibidos.

---

## **5 `*args` y estructuras recibidas**

```python id="f4g8h9"
def mostrar_args(*args):
    print("Args:", args)
    print("Tipo:", type(args))

mostrar_args(10, 20, 30)
```

**Explicación:**

* Las funciones definidas con `*args` reciben **una tupla** con todos los argumentos posicionales extras.

---

## **6 `**kwargs` y estructuras recibidas**

```python id="f5i10j11"
def mostrar_kwargs(**kwargs):
    print("Kwargs:", kwargs)
    print("Tipo:", type(kwargs))

mostrar_kwargs(nombre="Luis", edad=25)
```

**Explicación:**

* `**kwargs` permite pasar **una cantidad variable de argumentos nombrados**.
* Dentro de la función, `kwargs` es un **diccionario** con clave=valor.

---

## **6️⃣ Diferencia entre `raise NotImplementedError` y `return NotImplemented`**

```python id="f6k12l13"
def metodo_a():
    raise NotImplementedError("Este método debe implementarse en una subclase")

def metodo_b():
    return NotImplemented

# metodo_a()  # Esto lanzará un error
print(metodo_b())  # Devuelve un valor especial
```

**Explicación:**

* `raise NotImplementedError` **lanza un error** para indicar que el método debe implementarse.
* `return NotImplemented` **devuelve un objeto especial**, que Python usa internamente (por ejemplo en comparaciones), **no lanza un error por sí mismo**.

---

## **7️⃣ Retorno de varios valores**

```python id="f7m14n15"
def coordenadas():
    return 10, 20

x, y = coordenadas()
print("x =", x)
print("y =", y)
```

**Explicación:**

* Aunque parece que la función retorna “varios valores”, en realidad Python retorna **una tupla**.
* Puedes desempaquetarla directamente en variables.

---

## **8️⃣ Uso del asterisco `*` al pasar iterables**

```python id="f8o16p17"
def sumar(a, b, c):
    return a + b + c

valores = [1, 2, 3]
print(sumar(*valores))
```

**Explicación:**

* El `*` delante de un iterable **desempaqueta sus elementos** en argumentos posicionales de la función.
* Es útil para listas, tuplas u otros iterables.

---

## **9️⃣ Ejemplo completo combinando todo**

```python id="f9q18r19"
def info_persona(nombre, edad, *hobbies, **atributos_extra):
    print(f"{nombre}, {edad} años")
    print("Hobbies:", hobbies)
    print("Otros atributos:", atributos_extra)

info_persona("Sofia", 28, "leer", "correr", ciudad="Montevideo", activo=True)
```

**Explicación:**

* `nombre` y `edad` → parámetros normales.
* `*hobbies` → recoge los hobbies en una tupla.
* `**atributos_extra` → recoge los demás datos en un diccionario.

---

## **🔚 Conclusiones**

Al finalizar este laboratorio habrás aprendido a:

* Comprender qué devuelve una función sin `return`.
* Usar parámetros nombrados para mejorar claridad y evitar errores.
* Utilizar `*args` y `**kwargs` para manejar cantidad variable de argumentos.
* Diferenciar entre `raise NotImplementedError` y `return NotImplemented`.
* Retornar y desempaquetar múltiples valores (tuplas).
* Usar el asterisco `*` al pasar iterables a funciones.
* Crear funciones flexibles y legibles para distintos escenarios.


¿Querés que haga esa versión también?
