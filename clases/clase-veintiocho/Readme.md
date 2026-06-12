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
 
 

## Pruebas unitarias
