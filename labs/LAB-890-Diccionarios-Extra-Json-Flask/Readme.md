# **Laboratorio: Crear una API con Flask que devuelva JSON**

## **Objetivo**

Aprender a crear un servidor web básico con Flask y devolver datos en formato JSON:

* Instalar Flask
* Crear rutas que devuelvan diccionarios
* Convertir diccionarios a JSON automáticamente
* Probar la API en el navegador o con `curl`

---

## **1️⃣ Instalar Flask**

```bash
# Instalar Flask
pip install flask
```

---

## **2️⃣ Crear la aplicación Flask**

```python id="f1a2b3"
from flask import Flask, jsonify

# Crear la app
app = Flask(__name__)

# Datos de ejemplo: lista de personas
personas = [
    {"id": 1, "nombre": "Ana", "edad": 25},
    {"id": 2, "nombre": "Luis", "edad": 30},
    {"id": 3, "nombre": "Sofia", "edad": 28}
]

# Ruta principal que devuelve la lista de personas
@app.route("/personas", methods=["GET"])
def obtener_personas():
    return jsonify(personas)

# Ejecutar la app
if __name__ == "__main__":
    app.run(debug=True)
```

---

## **3️⃣ Explicación rápida**

* `Flask(__name__)` → crea la aplicación web
* `@app.route("/personas", methods=["GET"])` → define la ruta `/personas` que acepta solicitudes GET
* `jsonify(personas)` → convierte automáticamente la lista de diccionarios en JSON y la devuelve al cliente
* `app.run(debug=True)` → ejecuta el servidor en modo debug (recomiendo para desarrollo)

---

## **4️⃣ Probar la API**

1. Guardá el archivo como `app.py`
2. Ejecutá:

```bash
python app.py
```

3. Abrí en tu navegador:

```
http://127.0.0.1:5000/personas
```

Deberías ver algo como:

```json
[
    {"id": 1, "nombre": "Ana", "edad": 25},
    {"id": 2, "nombre": "Luis", "edad": 30},
    {"id": 3, "nombre": "Sofia", "edad": 28}
]
```

4. También podés probar con `curl`:

```bash
curl http://127.0.0.1:5000/personas
```

---

## **5️⃣ Variante: devolver un diccionario con status y datos**

```python id="f4d5e6"
@app.route("/personas2", methods=["GET"])
def obtener_personas2():
    respuesta = {
        "status": "ok",
        "cantidad": len(personas),
        "datos": personas
    }
    return jsonify(respuesta)
```

Al acceder a `/personas2` verás:

```json
{
    "status": "ok",
    "cantidad": 3,
    "datos": [
        {"id": 1, "nombre": "Ana", "edad": 25},
        {"id": 2, "nombre": "Luis", "edad": 30},
        {"id": 3, "nombre": "Sofia", "edad": 28}
    ]
}
```

---

## **Cierre**

Al final de este laboratorio habrás aprendido a:

* Instalar y configurar Flask
* Crear rutas que devuelvan diccionarios como JSON
* Formatear la respuesta con `jsonify`
* Entender cómo se devuelve información para APIs desde Python
