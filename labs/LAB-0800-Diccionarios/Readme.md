# **Laboratorio: Diccionarios en Python**

## **Objetivo**

Aprender a usar diccionarios en Python:

* Crear diccionarios de distintas formas
* Acceder a valores mediante claves
* Agregar, modificar y eliminar elementos
* Recorrer diccionarios (`keys`, `values`, `items`)
* Métodos principales (`get`, `pop`, `update`)
* Diccionarios con estructuras anidadas

---

## **1️⃣ Creación de diccionarios**

```python id="d1a2b3"
# Diccionario vacío
d1 = {}

# Diccionario con datos
d2 = {
    "nombre": "Juan",
    "edad": 30,
    "activo": True
}

# Usando dict()
d3 = dict(ciudad="Buenos Aires", pais="Argentina")

print(d1)
print(d2)
print(d3)
```

---

## **2️⃣ Acceso a valores**

```python id="d4e5f6"
persona = {
    "nombre": "Ana",
    "edad": 25
}

# Acceso directo (puede fallar si no existe la clave)
print(persona["nombre"])  # Ana

# Acceso seguro con get()
print(persona.get("edad"))     # 25
print(persona.get("altura"))   # None
```

---

## **3️⃣ Agregar y modificar elementos**

```python id="d7g8h9"
persona = {
    "nombre": "Carlos",
    "edad": 40
}

# Agregar nueva clave
persona["email"] = "carlos@mail.com"

# Modificar valor existente
persona["edad"] = 41

print(persona)
```

---

## **4️⃣ Eliminar elementos**

```python id="d10i11"
persona = {
    "nombre": "Laura",
    "edad": 35,
    "pais": "Chile"
}

# Eliminar con pop()
persona.pop("edad")

# Eliminar con del
del persona["pais"]

print(persona)
```

---

## **5️⃣ Recorrer diccionarios**

```python id="d12j13"
persona = {
    "nombre": "Sofia",
    "edad": 28,
    "pais": "Uruguay"
}

# Recorrer claves
for clave in persona.keys():
    print(clave)

# Recorrer valores
for valor in persona.values():
    print(valor)

# Recorrer clave y valor
for clave, valor in persona.items():
    print(clave, "->", valor)
```

---

## **6️⃣ Métodos útiles**

```python id="d14k15"
datos = {
    "a": 1,
    "b": 2
}

# get()
print(datos.get("a"))  # 1

# update()
datos.update({"c": 3, "d": 4})

# pop()
datos.pop("b")

print(datos)
```

---

## **7️⃣ Diccionarios anidados**

```python id="d16l17"
usuario = {
    "nombre": "Pedro",
    "direccion": {
        "calle": "Av Siempre Viva",
        "numero": 742
    }
}

# Acceso a datos anidados
print(usuario["direccion"]["calle"])  # Av Siempre Viva
```

---

## **8️⃣ Diccionarios con listas**

```python id="d18m19"
curso = {
    "nombre": "Python",
    "alumnos": ["Ana", "Luis", "Carlos"]
}

# Acceder a la lista
print(curso["alumnos"])

# Modificar la lista dentro del diccionario
curso["alumnos"].append("Sofia")

print(curso)
```

---

## **Cierre**

Al final de este laboratorio habrás aprendido a:

* Crear diccionarios de distintas formas
* Acceder a valores de forma segura
* Agregar, modificar y eliminar datos
* Recorrer estructuras clave-valor
* Usar métodos fundamentales de diccionarios
* Trabajar con estructuras anidadas 
