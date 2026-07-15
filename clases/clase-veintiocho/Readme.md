# Clase Veintiocho - 12 de Junio del 2026

## Repaso

* Programacion orientada a componentes
  * Historia : Objetos COM
  * Proyecto Vo
    * Migracion a Web Components
        * React -> WebComponents
  * Reflex : Programacion orientada a componentes en Python
* AiDev
  * Ingenierons de Software con IA
      * Claude Code (+Ollama)
      * Github Copilot Workspace
      * Aider
          * https://aider.chat/
      * Open Code

## Novedades

* La argentina numero 10 en tokens consumidos en Open Code
* Novedades Kimi
 * https://x.com/KimiDevs/status/2065400453815574551

## IA Para Programadores

### Herramientas para cada etapa

* Analisis
   * NotebookLM 
* System Design
   * Herramientas para graficar
     * Mermaid
     * https://www.eraser.io/diagramgpt
* Codificacion
  * Scaffolding 
     * Bolt.new
     * Lovable
     * Base44
     * V0
     * Replit
  * Interfaces Graficas
    * Gradio / Streamlit (Para no complicarnos con la Interfaz)
    * Falto Lovart
    * Falto Stich
  * Coddigng Asistants
    * Github Copilot
  * Ides Especializadas
    * Cursor
  * Ingenieros de SW por IA
    * Claude Code
    * Aider
    * Github copilot Worspace
  * Base de Datos
     * dabase.built
     * Metodologia de disenio con IA (para que no se me pase por alto ninguna constraint)
* Pruebas
     * ????
* Despliegue
  * Supabese


#### Interfaz Grafica

* Pendientes
 * https://www.lovart.ai/ <<< No la vimos
 * Google Stick

#### Pruebas


### Probamos Aider

> https://aider.chat/

* Instalacion

```
python -m pip install aider-install
'''

* Verificamos la ubicaicon de las librerias de python

```
python -m site

sys.path = [
    'C:\\Repos\\v0-groq-chatbot-with-local-storage',
    'C:\\Coding\\Python\\python311.zip',
    'C:\\Coding\\Python\\Lib',
    'C:\\Coding\\Python\\DLLs',
    'C:\\Coding\\Python',
    'C:\\Coding\\Python\\Lib\\site-packages',
    'C:\\Coding\\Python\\Lib\\site-packages\\win32',
    'C:\\Coding\\Python\\Lib\\site-packages\\win32\\lib',
    'C:\\Coding\\Python\\Lib\\site-packages\\Pythonwin',
]
USER_BASE: 'C:\\Users\\esteb\\AppData\\Roaming\\Python' (doesn't exist)
USER_SITE: 'C:\\Users\\esteb\\AppData\\Roaming\\Python\\Python311\\site-packages' (doesn't exist)
ENABLE_USER_SITE: True
```

* En C:\\Coding\\Python\\Lib\\site-packages tiene que estar la carpeta de aider

* Luego instalamos

'''
aider-install

o...

python -m aider-install
```

* Verificamos la instalacion

```
>aider --version
aider 0.86.2
```

* Pagina para conectar con Grow
 * https://aider.chat/docs/llms/groq.html

* Saco una api key
  * https://console.groq.com/home

* Ejecutar aide

```
aider --model groq/qwen/qwen3-32b --api-key groq=gsk_xxxxxxxxxxx
```

* Prompt

```
crear una carpeta migracion-aider y migrar todo el proyecto que esta en React a web-components. Solo quiero el index.html y la carpe
> ta /components con los distintos componentes migrados de react a web-components
```
   

---

# Python

## Tipos de Pruebas

* Pruebas Manuales que hace tradicionalmente el QA
* Pruebas de Frontend / Integracion
   * Selenium
   * Playwright
* Pruebas Unitarias
   * Fragmentos de Codigo que prueban el codigo
   * Concepto
     * Cobertura de Codigo : La cobertura de código (o code coverage) es una métrica de software que mide el porcentaje de tu código fuente que se ejecuta cuando lanzas tus pruebas automatizadas.
       * Tiene en cuenta que se prueben todos los casos
   * Para probar APIS es comun hacerlo con un cliente HTTP
     * Las pruebas unitarias son ideal para probar de forma automatica APIs y no depender de un cliente HTTP
 

> [!NOTE]
> Nunca habia tiempo en los equipos para pruebas unitarias a pesar que la industria del software exigia pruebas unitarias como prueba de calidad
> ...hasta que aparecio la IA, que es la que programa las pruebas unitarias por nosotors 

## Pruebas unitarias

> [!NOTE]
> Las pruebas unitarias trantan de resolver el problema de un sofware que funciona bien pero al cambiar una parte de rompe algo que ya funcionaba antes
> La idea que si hacemos un cambio sobre el codigo nos podamos quedar tranquilo que si algo que funcionaba antes se rompio deberia detectarlo la prueba unitaria

* Ejemplo de funcion a probar

```python
def sumar(a, b):
    """Suma dos números y retorna el resultado."""
    return a + b
```

* Pueba manual

```
from funciones_a_probar import sumar

resultado = sumar(1,3)

print(resultado)
```
  
> [!NOTE]
> Tengo que mirar la computadora y el resultado para saber si esta bien


* Prueba Unitaria

```
import unittest

from funciones_a_probar import sumar


class PruebaOperaciones(unittest.TestCase):
    
    def test_suma(self):
        resultado = sumar(2,3)
        self.assertEqual(resultado, 5)


unittest.main()
```

> [!NOTE]
> Cualqueir llm hace muy buenas pruebas unitarias


## TDD (Test Driven Development)

* Es una metodologia de desarrollo segun la cual vos escribis primero las pruebas unitarias y despues todo el codigo para que las pruebas pasen
