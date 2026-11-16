# Clase 28 - 16 de Noviembre del 2026

# Repaso

* Proyecto Integrador
    * Historia Interactiva con IA
    * UI
      * Gradio
    * IA
      * Groq con API key
      * API Chat Completions
      * System Prompt

# Requerimientos

* Extesion Github Copilot Instalada
* Extension Live Server
     
# AiDev

* Trabajar con la IA para generar cosigo de forma mas ordenada
* Vamos a crear un proyecto LOCAL

## Agentes de Codificacion

* Github Copilot
   * Se ejecuta en Visual Studio Code
* Cursor
   * IDE especializada con agentes para Codificar
* Claude Code
   * Requiere licencia Paga
   * Se suele usar con CLI
* Codex
   * Ex el Claude Code de OpenAI
   * Se suele usar con CLI
* Gemini Code
* Aider
* OpenCode

### Github Copilot

* Se instala la extension desde
   * https://marketplace.visualstudio.com/items?itemName=GitHub.copilot-chat
* Tiene varias versiones
* Tiene una version Free con Creditos limitados
* Se conecta con tu cuenta de github
* No hay que estar copiando y pegando codigo desde el LLM
* Modifican directamente los archivo del proyecto
* Shortcut
   * Ctrl+Shift+I -> Are la ventana del chat
 
* Si tenes la version PRO

<img width="278" height="236" alt="image" src="https://github.com/user-attachments/assets/83e87340-1168-44c4-a771-39327cfcb9e3" />

* Si tenes la version Free

<img width="447" height="468" alt="image" src="https://github.com/user-attachments/assets/a9a2e5b9-2c53-422c-b177-5c5b8f318b65" />

* Vamos a usarlo

```
Creame un html todo en una pagina quw sea una interfaz tipo chatbot que me responda todo loq ue le digo (echo) y que este todo en un unico html que se ejecute sin instalar nada.
```

#### Skills

* Vamos a darle instrucciones a github copilot como quiero que programe

* Creo un archivo prueba.py y con ctr+i

```
Creame una funcion para calcular el promedio de una lista de numeros
```

* Me hizo esto

```
def calcular_promedio(numeros):
	if not numeros:
		raise ValueError("La lista no puede estar vacía")
	return sum(numeros) / len(numeros)
```

* Que le mejoraria
   * Le agregaria mas comentarios
   * Le agregaria los type error si non numeros
   * Mejor manejo de errores
   * Type Hints

* Le quiero dar a la IA instrucciones como quiero que programe
* No quiero tener que repetir una y otra vez las mismas intrucciones en el prompt

* Antes
   * (programador) -> (conocimiento como progamar bien y su gusto)   -> (Codigo)
   * (programador) -> (instrucciones para la IA como programar bien)  -> (IA) -> (Codigo)
 
* Es un Embole tener que repetirle una y otra vez como nos gusta que programe la IA
   * Quiero como colocarle el "system prompt" que la IA tiene que seguir cuando programa en python
 
* Esto se llama Skils (Habilidades)
   * https://docs.github.com/en/copilot/concepts/customizations/agent-skills

>  Todos los entornos tienen Skills, pero cada uno las configura en un lugar distinto

* Creamos la carpeta .github/skills/python
   * Adentro creamos el archivo SKILL.md
 
* Creamos esta SKILL

```
---
name: python-dev
description: Usa esta skill cuando tenes que generar codigo en python
---

## Buenas Practicas

1. Usa Type Hints
2. Poner documentacion (docstrings) en funciones y clases
3. Seguir la PEP 8 para el estilo de codigo
4. Hacer chequeo de errores
5. Chequear siempre los tipos de datos, si es una lista los tipos de cada elemento
6. Usar excepciones para manejar errores de manera adecuada
7. Evitar el uso de variables globales

```

* El comienzo entre guiones se llama frontmatter

* Vamos a verificar si las tiene en cuenta

```
Sin modificar el codigo quiero que me digas que skills tenes disponibles y si el codigo respeta lo definido en esas skills
```

* Me contesto

```
Revisé prueba.py sin modificarlo. La skill aplicable para comparar esta función es python-dev.

¿Cumple python-dev?
Parcialmente:

✅ Verifica si la entrada está vacía y lanza una excepción; no usa variables globales.
❌ No tiene anotaciones de tipos ni docstring.
❌ Usa tabulaciones para indentar; PEP 8 recomienda cuatro espacios.
❌ No comprueba explícitamente el tipo de la entrada ni el de cada elemento. Algunos tipos incorrectos provocarán errores de Python, pero no existe la validación requerida por la skill.
Skills disponibles
Además de python-dev, tengo estas skills disponibles; se usan según la tarea:
```

* Si le decimos ahora que genere la funcion

```

def calcular_promedio(numeros: list[int | float]) -> float:
    """Calcula el promedio de una lista de números."""
    if not isinstance(numeros, list):
        raise TypeError("El argumento debe ser una lista")
    if not numeros:
        raise ValueError("La lista no puede estar vacía")
    if any(
        not isinstance(numero, (int, float)) or isinstance(numero, bool)
        for numero in numeros
    ):
        raise TypeError("Todos los elementos deben ser números")

    return sum(numeros) / len(numeros)
```

* Existen en internet un monton de Skills que puedo usar en mi proyecto
   * Las skills oficiales de github
 
```
skills.sh: Skills públicas (Instalables con npm)

https://skillsmp.com/ (Para búsqueda masiva de repos públicos que tienen skills
https://agenticskills.io/ Skills y MCP compatibles con claude, code, etc
```

---
# Break
hasta y 45
---
