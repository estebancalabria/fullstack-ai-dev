# **Laboratorio: Diccionarios y JSON en Python**

## **Objetivo**

Aprender a trabajar con la interoperabilidad entre diccionarios y JSON en Python:

* Convertir diccionarios a JSON
* Convertir JSON a diccionarios
* Formatear JSON para mostrarlo de forma legible
* Manejar estructuras complejas
* Comprender cómo se usan en APIs

---

## **1️⃣ Importar el módulo json**

```python id="j1a2b3"
import json
```

---

## **2️⃣ Convertir diccionario a JSON**

```python id="j4c5d6"
persona = {
    "nombre": "Ana",
    "edad": 25,
    "activo": True
}

# Convertir a JSON (string)
json_str = json.dumps(persona)

print(json_str)
print(type(json_str))  # str
```

---

## **3️⃣ Convertir JSON a diccionario**

```python id="j7e8f9"
json_str = '{"nombre": "Luis", "edad": 30, "activo": false}'

# Convertir a diccionario
diccionario = json.loads(json_str)

print(diccionario)
print(type(diccionario))  # dict
```

---

## **4️⃣ Mostrar JSON de forma legible (pretty print)**

```python id="j10g11"
persona = {
    "nombre": "Sofia",
    "edad": 28,
    "habilidades": ["Python", "SQL", "IA"]
}

# JSON formateado
json_lindo = json.dumps(persona, indent=4)

print(json_lindo)
```

---

## **5️⃣ Manejo de tipos de datos**

```python id="j16j17"
datos = {
    "texto": "Hola",
    "numero": 10,
    "decimal": 3.14,
    "booleano": True,
    "nulo": None
}

json_str = json.dumps(datos, indent=4)
print(json_str)
```

> 🔹 Nota:
>
> * `True` → `true`
> * `False` → `false`
> * `None` → `null`

---

## **6️⃣ Convertir estructuras complejas**

```python id="j18k19"
usuarios = [
    {"nombre": "Ana", "edad": 25},
    {"nombre": "Luis", "edad": 30}
]

# Lista de diccionarios → JSON
json_str = json.dumps(usuarios, indent=4)
print(json_str)

# JSON → Python
data = json.loads(json_str)
print(data)
```

---

## **7️⃣ Validación básica de JSON**

```python id="j20l21"
json_invalido = '{"nombre": "Ana", edad: 25}'  # error: falta comillas en clave

try:
    data = json.loads(json_invalido)
except json.JSONDecodeError as e:
    print("Error al parsear JSON:", e)
```

---

## **8️⃣ Uso típico en APIs (simulación)**

```python id="j22m23"
# Simulación de respuesta de una API
respuesta_json = '''
{
    "status": "ok",
    "data": {
        "nombre": "Producto 1",
        "precio": 100
    }
}
'''

# Convertir a diccionario
respuesta = json.loads(respuesta_json)

# Acceder a datos
print(respuesta["data"]["nombre"])
print(respuesta["data"]["precio"])
```

---

## **Cierre**

Al final de este laboratorio habrás aprendido a:

* Convertir diccionarios a JSON y viceversa
* Mostrar JSON de forma legible en consola
* Manejar errores al procesar JSON
* Trabajar con estructuras complejas (listas y diccionarios)
* Entender cómo se usan JSON y diccionarios en APIs reales

