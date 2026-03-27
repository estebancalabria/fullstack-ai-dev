# 🧪 Laboratorio: Deploy de una API Flask en Render (versión práctica)

## 🎯 Objetivo

* Crear una API con Flask
* Instalar librerías con pip
* Generar `requirements.txt` automáticamente
* Subir a GitHub
* Hacer deploy GRATIS en Render

---

# 1️⃣ Crear proyecto

```bash
mkdir flask-render-lab
cd flask-render-lab
```

Estructura final:

```
flask-render-lab/
├── app.py
├── Procfile
└── runtime.txt
```

---

# 2️⃣ Crear la app Flask

Archivo `app.py`:

```python
from flask import Flask, jsonify

app = Flask(__name__)

@app.route("/")
def home():
    return jsonify({"message": "Hola desde Flask en Render 🚀"})

@app.route("/saludo/<nombre>")
def saludo(nombre):
    return jsonify({"message": f"Hola {nombre} 👋"})

if __name__ == "__main__":
    app.run(debug=True)
```

> Nota: `debug=True` solo para pruebas locales.

---

# 3️⃣ Instalar librerías con pip

```bash
# Crear un entorno virtual (opcional pero recomendable)
python -m venv venv
# Activar
# Windows
venv\Scripts\activate
# Linux / Mac
source venv/bin/activate

# Instalar Flask y Gunicorn
pip install Flask gunicorn
```

---

# 4️⃣ Generar `requirements.txt` automáticamente

```bash
pip freeze > requirements.txt
```

Contenido aproximado de `requirements.txt`:

```
Flask==3.0.0
gunicorn==21.2.0
```

> Esto asegura que Render instale exactamente las mismas librerías.

---

# 5️⃣ Archivos necesarios para Render

## Procfile

```
web: gunicorn app:app
```

* Indica a Render cómo levantar la app en producción

## runtime.txt

```
python-3.11.0
```

* Especifica la versión de Python

---

# 6️⃣ Probar localmente

```bash
python app.py
```

* Abrir en navegador: `http://localhost:5000/`
* `/saludo/Esteban` → prueba personalizada

---

# 7️⃣ Subir a GitHub

```bash
git init
git add .
git commit -m "Primer deploy Flask con Render"
git branch -M main
git remote add origin https://github.com/TU_USUARIO/flask-render-lab.git
git push -u origin main
```

---

# 8️⃣ Deploy en Render

1. Entrar a Render
2. Click **New + → Web Service**
3. Conectar tu cuenta de GitHub
4. Elegir el repositorio `flask-render-lab`
5. Configuración:

* **Environment:** Python
* **Build Command:**

```bash
pip install -r requirements.txt
```

* **Start Command:**

```bash
gunicorn app:app
```

6. Render te dará la URL de la app lista para probar 🚀

---

# ✅ Tips para los alumnos

* Pueden modificar `app.py` y Render redeploya automáticamente si está conectado a GitHub
* Siempre que agreguen nuevas librerías:

```bash
pip install nueva_lib
pip freeze > requirements.txt
```

* Probar primero con `python app.py` antes de subir a Render

