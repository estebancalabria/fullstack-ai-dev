import os
import sys
import django
from django.conf import settings
from django.urls import path
from django.http import HttpResponse
from django.core.management import execute_from_command_line

# -----------------------------------------------------------------------------
# 1. CONFIGURACIÓN DE DJANGO
# -----------------------------------------------------------------------------
# Configuramos los ajustes básicos directamente aquí para no necesitar 
# múltiples archivos de configuración.
settings.configure(
    DEBUG=True,
    SECRET_KEY='una-clave-secreta-muy-segura-para-demo',
    ROOT_URLCONF=__name__,  # Le dice a Django que las URLs están en este mismo archivo
    INSTALLED_APPS=[
        'django.contrib.contenttypes',
        'django.contrib.auth',
    ],
    MIDDLEWARE=[
        'django.middleware.security.SecurityMiddleware',
        'django.middleware.common.CommonMiddleware',
    ],
    TEMPLATES=[{
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
            ],
        },
    }],
    DATABASES={
        'default': {
            'ENGINE': 'django.db.backends.sqlite3',
            'NAME': 'db_demo.sqlite3',
        }
    }
)

# Inicializamos Django con la configuración anterior
django.setup()

# -----------------------------------------------------------------------------
# 2. VISTAS (Lógica de la aplicación)
# -----------------------------------------------------------------------------

def home(request):
    """Vista para la página de inicio"""
    html = """
    <html>
        <head><title>Django Demo</title></head>
        <body style="font-family: sans-serif; text-align: center; padding: 50px;">
            <h1 style="color: #0C4B33;">¡Hola Mundo desde Django!</h1>
            <p>Este proyecto se ejecuta desde un único archivo: <b>django-demo.py</b></p>
            <hr>
            <a href="/about/" style="text-decoration: none; background: #0C4B33; color: white; padding: 10px 20px; border-radius: 5px;">Ir a "Sobre Nosotros"</a>
        </body>
    </html>
    """
    return HttpResponse(html)

def about(request):
    """Vista para la página de información"""
    return HttpResponse("<h1>Página Sobre Nosotros</h1><p>Este es un ejemplo de routing en Django.</p><br><a href='/'>Volver al inicio</a>")

def api_demo(request):
    """Ejemplo de respuesta JSON simple"""
    import json
    data = {"mensaje": "Esto es una respuesta JSON", "status": "ok", "version": "1.0"}
    return HttpResponse(json.dumps(data), content_type="application/json")

# -----------------------------------------------------------------------------
# 3. URLS (Enrutamiento)
# -----------------------------------------------------------------------------

urlpatterns = [
    path('', home, name='home'),
    path('about/', about, name='about'),
    path('api/', api_demo, name='api'),
]

# -----------------------------------------------------------------------------
# 4. PUNTO DE ENTRADA (Ejecución)
# -----------------------------------------------------------------------------

if __name__ == '__main__':
    # Esto permite ejecutar comandos de gestión de Django (como runserver)
    # desde la línea de comandos pasando este script como argumento.
    execute_from_command_line(sys.argv)