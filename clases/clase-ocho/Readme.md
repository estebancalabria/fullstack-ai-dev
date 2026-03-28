# Clase Ocho - 27 de Marzo del 2026

# Repaso

* Python
  * Estructuras de control
    * for
        * break
        * continue
        * else del for   << No sabia que python tenia esto, lo descrubri con uds gracias a la IA
  * Funciones
    * Cantidad Variable de parametros
        * (*args) y (**kwargs)
            * *args  ---> Recibo los parametros como una tupla
            * (**kwargs) ---> Recibo los parametro como un diccionario
            * Operador de Desempaquetemiento ----> Diccionario, tupla ---> Convierte en parametros
        * pass (Para funciones vaciaas)
        * Parametros con nombre
            * saludar(nombre="Esteba", apellido="Calabria"(
        * Parametros por defecto
        * funciones que reciben funcione como parametro
  * Tipos de Aplicaciones
      * Gradio
          * interfaz = gr.Interface(fn = saludar, inputs = "text", outputs = "text")  <<< ACA le paso por parametro la funcion que se ejecuta cuanto apretan "Submit"
  * Hugging Face
      * Crearon el usuario de Hugging Face
   
# Modelo de lenguajes 

* Open Source
  * Qwen
      * https://chat.qwen.ai/
      * Vieron que dicen que "Los chinos copian todo"
          * Es la copia China de ChatGPT
            * Tienen personalizacion, memoria
      * Nunca le encontre el limite la capa free me parece infinita
  * Deepseek (El que invento  el modo razonamiento)
      * https://chat.deepseek.com/

> (CTA) : Van a probar Quen para la semana que viene y me cuentan

# Noticias de IA

* Hay red social para IAS
  * https://cnnespanol.cnn.com/2026/02/03/ciencia/moltbook-red-social-bots-inteligencia-artificial-trax

# IDES especialiazas con IA

* Cursor
  * https://cursor.com/
  * Fork de visual studio code que integra la ia en forma nativa
  * Esta pensado para desarrollar proyectos grandes
  * Mantiene mucho mejor el contexto de toda la estructura de proyecto

> (CTA) : Se iniman a instalarlo asi lo probamos la proxima

# Python

## Modulos de Python

* Alguna vez les todo trabajar en un proyecto grande?
   * Se imaginan que no es factible trabajar en un proyecto donde todo este en un solo archivo
   * (Junior tiene a meter todo el codigo en un solo archivo)  ---->  (Senior sabe organizar su codigo en forma eficiente diviendolo en varios archivos)
   
* Hoy vamos a trabajar local. Abrimos una carpeta con visual studio code 

```cmd
> code .
```

* Los que trabajen con VSCode instalen la extension del visual studio code

* El que se anime puede hacer esto mirmo con cursor

```cmd
> cursor .
```

* Crear un archivo Calculadora.py

* Ya sea en cursor o en vscode con github copilot en el chat con IA pedirle que cree 4 metodos

```
Crearme 4 funciones, sumar, restar, multipllicar y dividir, tambien una constante que se llame PI.  Programar los metodos para que sean seguros realizando todas las validaciones y controles pertinentes de rangos de entrada, tipos de datos. Quiero una version de las funciones que sea profesional
```

* La IA Me genero algo como esto

```python
"""
Operaciones aritméticas básicas con validación estricta de tipos y rangos.
"""

from __future__ import annotations

import math
from typing import Final, Union

# Constante matemática π (pi)
PI: Final[float] = math.pi

Number = Union[int, float]


def _es_numero_valido(valor: object) -> bool:
    """True si es int o float real; excluye bool (subclase de int en Python)."""
    if isinstance(valor, bool):
        return False
    return isinstance(valor, (int, float))


def _validar_operando(nombre: str, valor: object) -> None:
    if not _es_numero_valido(valor):
        tipo = type(valor).__name__
        raise TypeError(
            f"{nombre} debe ser int o float (no bool ni otros tipos); recibido: {tipo!r}."
        )
    if isinstance(valor, float) and not math.isfinite(valor):
        raise ValueError(
            f"{nombre} no puede ser NaN ni infinito; use valores finitos."
        )


def _comprobar_resultado_finito(resultado: float, operacion: str) -> float:
    if not math.isfinite(resultado):
        raise OverflowError(
            f"El resultado de {operacion} no es representable como número finito "
            "(desbordamiento u operación inválida)."
        )
    return resultado


def sumar(a: object, b: object) -> float:
    """
    Devuelve la suma de a y b.

    Valida tipos (int/float, sin bool), rechaza NaN/inf en operandos float
    y comprueba que el resultado sea finito.
    """
    _validar_operando("a", a)
    _validar_operando("b", b)
    r = float(a) + float(b)
    return _comprobar_resultado_finito(r, "sumar")


def restar(a: object, b: object) -> float:
    """
    Devuelve la resta a - b.

    Mismas validaciones que ``sumar``.
    """
    _validar_operando("a", a)
    _validar_operando("b", b)
    r = float(a) - float(b)
    return _comprobar_resultado_finito(r, "restar")


def multiplicar(a: object, b: object) -> float:
    """
    Devuelve el producto de a y b.

    Mismas validaciones que ``sumar``; detecta desbordamiento en el producto.
    """
    _validar_operando("a", a)
    _validar_operando("b", b)
    r = float(a) * float(b)
    return _comprobar_resultado_finito(r, "multiplicar")


def dividir(a: object, b: object) -> float:
    """
    Devuelve el cociente a / b.

    No permite divisor cero ni operandos no finitos; el resultado debe ser finito.
    """
    _validar_operando("a", a)
    _validar_operando("b", b)
    if float(b) == 0.0:
        raise ZeroDivisionError("No se puede dividir por cero (el divisor b es 0).")
    r = float(a) / float(b)
    return _comprobar_resultado_finito(r, "dividir")

``` 

* Observacioness
  * Usa TypeHints : A los parametro de las funciones les documenta los tipos de datos que el programador esperaria usar
     * def dividir(a: object, b: object) -> float
        * Esta funcion acepta cualquier cosa y devuelve un float
        * Los tipe hints en principio no se chequea es mas como una documentacion profesional
          * NO VE VA A TIRAR ERRO SI HAGO sumar("cadena", "cadena") pero el que el codigo como tiene los type hints sabe que esta mal
     * "Es mas profesional definir el tipo de dato que se va a utilizar, asi sea una calculadora" (Matias Dicit)
* (Junior no le pone type hints al codigo, no aclara que tipos son los que espera) -> (Senior genera codigo auto documentado con los tipos de datos como si python fuera fuertemente tipado)

* Me llamo la atencion que la IA utilizara object como tipo de dato de dato de etntrada en las funciones, entonces le pregunte porque hizo eso en modo ASK

> El siguente prompt lo hiceen modo ASK (Preguntar)

```
Si los parametros que recibo le pones object no veo que el type hint aporte nada. En definitia puede ser cualqueir cosa. Porque o hiciste asi?
```

* Me contesto

```
iene sentido lo que comentas: object es el tipo más amplio (casi todo en Python es object), así que mypy/pyright no te avisarán si alguien pasa un str, una lista, etc. El contrato “solo números” no queda reflejado en el analizador estático, solo en la lógica en tiempo de ejecución (_validar_operando).

Por qué se suele usar algo así
En este diseño, la idea implícita es: “acepto cualquier cosa en la firma y rechazo con TypeError en runtime”. Eso encaja con una API muy defensiva, pero sacrifica lo que normalmente quieres de los type hints: errores antes de ejecutar y mejor autocompletado.

El matiz con int | float
Si en lugar de object pones int | float (o Number), sí aporta al checker… con un problema conocido: en el sistema de tipos de Python, bool se considera subtipo de int, así que el analizador podría aceptar sumar(True, 1) aunque en runtime tú quieras rechazar bool. Es decir: o mientes un poco al tipo checker, o aceptas esa inconsistencia.

Por eso a veces se elige object: para no prometer int | float y luego prohibir bool sin poder expresarlo bien en tipos estándar.

Conclusión
object aquí no “documenta” el dominio útil para herramientas estáticas; solo dice “cualquier cosa”.
Lo razonable en código “profesional” suele ser int | float (o un alias Number = int | float) y documentar que bool no está permitido, o usar patrones más avanzados (p. ej. validación + tipos más estrictos, Protocol, etc.) si quieres cerrar el caso bool también en el checker.
En resumen: lo hice así para no chocar con el tema bool/int en el type checker, pero tienes razón en que pierde valor el hint frente a alternativas más informativas; es un compromiso, no la única opción buena.
```

* Nunca me quedo con lo primero que me hace. Nuestro rol como devs es cuestiona a la IA. Aprender de ella y adaptar su solucion
  * Miro lo que hace la IA ---> Lo entiendo ---> Le pregunto lo que no entiendo ---> Lo cuestiono y lo mejoro si aplica
  * Segun mi criterio no tiene mucho sentido poner como parametro un object, no aporta nada....
  * Entnces le pedi que lo rehaga en modo agente

> El sigiente prompt lo ejecute en MODO AGENTE (Modifica el codigo)

```
En base lo ultimo que contestaste podes mejorar el codigo, no me preocupa que pasen un booleano como parametro de ultima si o toma como 1 o 0 no seria tan terrible
```

* Me genero un codigo que me parece mejor

```python
"""
Operaciones aritméticas básicas con validación estricta de tipos y rangos.
"""

from __future__ import annotations

import math
from typing import Final

# Constante matemática π (pi)
PI: Final[float] = math.pi

Number = int | float


def _es_numero_valido(valor: object) -> bool:
    """True si es int o float (incluye bool: se trata como 0 o 1 en las operaciones)."""
    return isinstance(valor, (int, float))


def _validar_operando(nombre: str, valor: object) -> None:
    if not _es_numero_valido(valor):
        tipo = type(valor).__name__
        raise TypeError(
            f"{nombre} debe ser int o float; recibido: {tipo!r}."
        )
    if isinstance(valor, float) and not math.isfinite(valor):
        raise ValueError(
            f"{nombre} no puede ser NaN ni infinito; use valores finitos."
        )


def _comprobar_resultado_finito(resultado: float, operacion: str) -> float:
    if not math.isfinite(resultado):
        raise OverflowError(
            f"El resultado de {operacion} no es representable como número finito "
            "(desbordamiento u operación inválida)."
        )
    return resultado


def sumar(a: Number, b: Number) -> float:
    """
    Devuelve la suma de a y b.

    Valida tipos (``int`` / ``float``; ``bool`` cuenta como 0 o 1), rechaza NaN/inf
    en operandos float y comprueba que el resultado sea finito.
    """
    _validar_operando("a", a)
    _validar_operando("b", b)
    r = float(a) + float(b)
    return _comprobar_resultado_finito(r, "sumar")


def restar(a: Number, b: Number) -> float:
    """
    Devuelve la resta a - b.

    Mismas validaciones que ``sumar``.
    """
    _validar_operando("a", a)
    _validar_operando("b", b)
    r = float(a) - float(b)
    return _comprobar_resultado_finito(r, "restar")


def multiplicar(a: Number, b: Number) -> float:
    """
    Devuelve el producto de a y b.

    Mismas validaciones que ``sumar``; detecta desbordamiento en el producto.
    """
    _validar_operando("a", a)
    _validar_operando("b", b)
    r = float(a) * float(b)
    return _comprobar_resultado_finito(r, "multiplicar")


def dividir(a: Number, b: Number) -> float:
    """
    Devuelve el cociente a / b.

    No permite divisor cero ni operandos no finitos; el resultado debe ser finito.
    """
    _validar_operando("a", a)
    _validar_operando("b", b)
    if float(b) == 0.0:
        raise ZeroDivisionError("No se puede dividir por cero (el divisor b es 0).")
    r = float(a) / float(b)
    return _comprobar_resultado_finito(r, "dividir")

```

Un modulo en numpy es pracicamente un "Archivo"   

* Si queremos usar todos los metodos de un archivo (archivo importar-modulo-completo.py)

```
import calculadora


#Varios ejemplos de como usar el modulo calculadora
print(calculadora.sumar(1, 2))
print(calculadora.restar(1, 2))
print(calculadora.multiplicar(1, 2))
print(calculadora.dividir(1, 2))

#Parece como si el modulo calculador fuera un objeto, 
#tiene un monton de metodos que podemos usar.
```
> Nota el nombre el modulo es calculadora porque el archivo se llama calcula.py

* Lo ejecuto y me da

```
> python .\importar-modulo-completo.py
3.0
-1.0
2.0
0.5
(base) PS C:\Cursos\fullstack-ai-d
```

* Tambien podemos importar con un alias o nombre alternativo (importar-con-alias.py)

```python
import calculadora as calc

#Varios ejemplos de como usar el modulo calculadora
print(calc.sumar(1, 2))
print(calc.restar(1, 2))
print(calc.multiplicar(1, 2))
print(calc.dividir(1, 2))
```

* Lo probamos

```
> python .\importar-con-alias.py
3.0
-1.0
2.0
0.5
(base) PS C:\Cursos\fullstack-ai-dev\clases\clase-ocho>
```

* Tengo una tercra opcion es es importar partes especificas (importar-partes-especificas.py)

```
from calculadora import sumar, restar

#Varios ejemplos de como usar el modulo calculadora
print(sumar(1, 2))
print(restar(1, 2))

```

* o bien

```
from calculadora import sumar as sum, restar as minus

#Varios ejemplos de como usar el modulo calculadora
print(sum(1, 2))
print(minus(1, 2))

```

* Lo probamos

```
> python .\importar-partes-especificas.py
3.0
-1.0
```

> Con estos esjemplos ya tienen conocimiento de las 4 alternativas mas comunes apra trabajar con modulos y hacer imports

* TIP PRO: Asi puedo ver los las carpetas donde python busca las librerias

```
import sys

# Te muestra las rutas de los modulos que python esta usando.
print(sys.path)

````

# Django

* Todas las clases vemos una libreria del ecosistema python...
* Hoy vamos a ver un framework para hacer paginas web
  * Nota mental Django = Flask + html
* Hoy toca usar QWEN (https://chat.qwen.ai/)

```
Haceme un proyecto en python con django (el archivo principal se llama django-demo.py) y los pasos para ejecutarlo  y probarlo usando entornos virtuales
```

* Me hizo esto

```
import os
import sys
import django
from django.conf import settings
from django.urls import path
from django.http import HttpResponse
from django.core.management import execute_from_command_line

# -----------------------------------------------------------------------------
# 1. CONFIGURACIÓN DE DJANGO (SIN BASE DE DATOS)
# -----------------------------------------------------------------------------
settings.configure(
    DEBUG=True,
    SECRET_KEY='una-clave-secreta-para-demo',
    ROOT_URLCONF=__name__,
    INSTALLED_APPS=[],  # Sin apps, sin DB
    MIDDLEWARE=[
        'django.middleware.security.SecurityMiddleware',
        'django.middleware.common.CommonMiddleware',
    ],
)

django.setup()

# -----------------------------------------------------------------------------
# 2. VISTAS
# -----------------------------------------------------------------------------

def home(request):
    html = """
    <html>
        <head><title>Django Demo</title></head>
        <body style="font-family: sans-serif; text-align: center; padding: 50px;">
            <h1 style="color: #0C4B33;">¡Hola Mundo desde Django!</h1>
            <p>Proyecto limpio, sin base de datos innecesaria.</p>
            <hr>
            <a href="/about/" style="text-decoration: none; background: #0C4B33; color: white; padding: 10px 20px; border-radius: 5px;">Ir a "Sobre Nosotros"</a>
        </body>
    </html>
    """
    return HttpResponse(html)

def about(request):
    return HttpResponse("<h1>Página Sobre Nosotros</h1><p>Este es un ejemplo de routing en Django.</p><br><a href='/'>Volver al inicio</a>")

def api_demo(request):
    import json
    data = {"mensaje": "Esto es una respuesta JSON", "status": "ok", "version": "1.0"}
    return HttpResponse(json.dumps(data), content_type="application/json")

# -----------------------------------------------------------------------------
# 3. URLS
# -----------------------------------------------------------------------------

urlpatterns = [
    path('', home, name='home'),
    path('about/', about, name='about'),
    path('api/', api_demo, name='api'),
]

# -----------------------------------------------------------------------------
# 4. EJECUCIÓN
# -----------------------------------------------------------------------------

if __name__ == '__main__':
    execute_from_command_line(sys.argv)
```

> OJO: Esta es la segunda interaccion, a la primera me puso una base de datos que ni siquiera usaba y no se la pedi. En general el codigo que genera la IA hay que chequearlo, adaptarlo, iterarlo

* Esta el fantasma que dicee "La ia va a dejar alos programadores sin trabajo"
  * Por ahora no es asi, al contrario. Solo que pasamos de generar todo el codigo nosotros a interar sobre el codigo que  nos da la ia
  * Es una forma de trabajar nueva
  * Los que ahora van a tener trabajo (Y MUCHO) son los que aprendan a usar la IA para generar codigo
  * 


* Creo un entorno virtual e instalo la libreria

```
pip install django
```

* Lo ejecuto (aca la IA me dice como hacerlo)

```
python django-demo.py runserver
```

* Me muestra lo siguiente

```
> python django-demo.py runserver
Watching for file changes with StatReloader
Performing system checks...

System check identified no issues (0 silenced).

You have 14 unapplied migration(s). Your project may not work properly until you apply the migrations for app(s): auth, contenttypes.
Run 'python manage.py migrate' to apply them.
March 27, 2026 - 21:07:48
Django version 5.2.12, using settings None
Starting development server at http://127.0.0.1:8000/
Quit the server with CTRL-BREAK.

WARNING: This is a development server. Do not use it in a production setting. Use a production WSGI or ASGI server instead.
For more information on production servers see: https://docs.djangoproject.com/en/5.2/howto/deployment/
(venv) (base) PS C:\Cursos\fullstack-ai-dev\clases\clase-ocho> 
```
