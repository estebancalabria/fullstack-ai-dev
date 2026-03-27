# 🧪 Laboratorio: Deploy de un proyecto Django en Render

## 🎯 Objetivo

* Crear un proyecto Django básico
* Instalar librerías con `pip`
* Generar `requirements.txt` automáticamente
* Subir a GitHub
* Hacer deploy GRATIS en Render

---

# 1️⃣ Crear proyecto

```bash id="1bqhds"
# Crear carpeta del proyecto
mkdir django-render-lab
cd django-render-lab

# Crear entorno virtual (opcional pero recomendable)
python -m venv venv
# Activar
# Windows
venv\Scripts\activate
# Linux / Mac
source venv/bin/activate
```

---

# 2️⃣ Instalar Django y Gunicorn

```bash id="s3h6qp"
pip install django gunicorn
```

---

# 3️⃣ Crear proyecto Django

```bash id="pwtf3c"
django-admin startproject mysite .
```

Estructura básica después:

```txt
django-render-lab/
├── manage.py
├── mysite/
│   ├── __init__.py
│   ├── settings.py
│   ├── urls.py
│   └── wsgi.py
├── venv/
```

---

# 4️⃣ Crear una app de ejemplo

```bash id="tkgzqf"
python manage.py startapp api
```

Agregar `api` a `INSTALLED_APPS` en `mysite/settings.py`:

```python
INSTALLED_APPS = [
    ...
    'api',
]
```

---

# 5️⃣ Crear vista de ejemplo

Archivo `api/views.py`:

```python id="x9h4bk"
from django.http import JsonResponse

def home(request):
    return JsonResponse({"message": "Hola desde Django en Render 🚀"})

def saludo(request, nombre):
    return JsonResponse({"message": f"Hola {nombre} 👋"})
```

Archivo `mysite/urls.py`:

```python id="9rf1mt"
from django.contrib import admin
from django.urls import path
from api import views

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', views.home),
    path('saludo/<str:nombre>/', views.saludo),
]
```

---

# 6️⃣ Probar localmente

```bash id="e9k8f2"
python manage.py runserver
```

* Abrir navegador: `http://127.0.0.1:8000/`
* `/saludo/Esteban` → prueba personalizada

✅ Funciona sin Gunicorn para pruebas locales

---

# 7️⃣ Generar requirements.txt

```bash id="1t2v9r"
pip freeze > requirements.txt
```

Contenido aproximado:

```txt
Django==6.2.0
gunicorn==21.2.0
```

---

# 8️⃣ Archivos necesarios para Render

## Procfile

```txt
web: gunicorn mysite.wsgi
```

* Indica a Render cómo levantar la app en producción

## runtime.txt

```txt
python-3.11.0
```

---

# 9️⃣ Subir a GitHub

```bash
git init
git add .
git commit -m "Primer deploy Django con Render"
git branch -M main
git remote add origin https://github.com/TU_USUARIO/django-render-lab.git
git push -u origin main
```

---

# 🔟 Deploy en Render

1. Entrar a Render
2. Click **New + → Web Service**
3. Conectar GitHub y elegir el repo `django-render-lab`
4. Configuración:

* **Environment:** Python
* **Build Command:**

```bash
pip install -r requirements.txt
```

* **Start Command:**

```bash
gunicorn mysite.wsgi
```

5. Render te dará la URL de la app lista para probar 🚀

---

# ✅ Tips para alumnos

* Cada vez que agreguen nuevas librerías:

```bash
pip install nueva_lib
pip freeze > requirements.txt
```

* Local: `python manage.py runserver` funciona sin Gunicorn
* Deploy: **siempre usar Gunicorn en Render**
* Pueden agregar más rutas en la app `api` y Render redeploya automáticamente si está conectado a GitHub

