# Clase 10 - 9 de Septiembre deo 2026

# Repaso

* Pruebas Unitarias
  * TDD
    * Primera creabamos las pruebas (con ayuda de la ia)
    * Generabamos el codigo para que pasen esas pruebas (tambien con ayuda de la IA)
* Python
  * Funcniones
    * Puras
    * Impuras
      * Tienen efectos secundarios
  * Pytest
    * Archivos llamados test_*
    * Funciones llamdas test_*
      * assert -> Verifica/Asegura que se cumpla un resultado
  * Ejemplos
    * validar el passord
    * es_primo
* AiDev
  * Estilo de programacion
      * Priorizamos funciones puras que se puedan probar por separado
      * Codigo claro y estructurado
          * Usamos la ia todas las veces que sea necesesario hasta que el codigo sea impecable
  * Uso de Copilot
    * Usar el # para referenciar archivos en el chat
    * Usar comandos como el @terminal para que el resultado de la terminal lo tenga como contexto el chat de copilot

---

# Setup

* Google colab de la clase:
  * 
   
# Python

## Funciones 

### Como mejorar la legibilidad de las funciones

* Python en si no es un lenguaje donde se declaren en el codigo el tipo de datos como en C, Java, etc
* Esto a veces atenta contra la legibilidad
* Por eso se han incorporado los type hints
* Es como una documentacion

```python

def numero_mayor(lista)
  mayor = lista[0]
  for num in lista:
    if num > mayor:
      mayor = num
  return mayor

```

* Con Type Hints

```python
def numero_mayor(lista : list[int]) -> int:
  mayor = lista[0]
  for num in lista:
    if num > mayor:
      mayor = num
  return mayor
```

* Version Mejorada

```
def numero_mayor(lista : list[int]) -> int:
    if not lista:
        raise ValueError("La lista no puede estar vacía")

    return max(lista)
```

> [!NOTE]
> Cada vez que escribimos una funcion vamos a usar la IA para mejorar la calidad del codigo hasta obtener la versiona mas clara del codigo a usar

# Ejercicio

* Vamos a generar con IA un algoritmo que reciba un String y me devuelva un diccionario que diga cuantas veces aparece en el string cada palabra
* Vamos a modificar ese codigo para que tenta Type hints
* Vamos a mejorar el codigo con IA hasta que nos guste
* Pruebas unitarias sobre ese codigo


* Primera version generada con IA

```
def contar_palabras(texto):
palabras = texto.split()
resultado = {}

for palabra in palabras:
if palabra in resultado:
resultado[palabra] += 1
else:
resultado[palabra] = 1

return resultado
```

* Codigo con Type Hints

```python
def contar_palabras(texto: str) -> dict[str, int]:

    palabras = texto.split()
    resultado: dict[str, int] = {}

    for palabra in palabras:
        if palabra in resultado:
            resultado[palabra] += 1
        else:
            resultado[palabra] = 1

    return resultado
```

* Codigo Mejorado con IA

```
```

> Ejemplo de prompt : "Analiza el siguiente codigo en puthon y propone una versiona mejrada que: mejore la legibilidad y claridad, aplique buenas practicas de python, aplique tecnicas de clean code para que el codigo sea mas facil de mantener, buscar errores, agregar validaciones que sean sean necesarias, hacer el codigo lo mas claro y facil de mantener posible, agregarle la documentacion necesaria para la funcion, agregar type hints."

* Pruebas unitarias sobre ese codigo

```
# Prueba 1: texto con palabras repetidas
assert contar_palabras("hola mundo hola") == {
    "hola": 2,
    "mundo": 1
}

# Prueba 2: todas las palabras diferentes
assert contar_palabras("uno dos tres") == {
    "uno": 1,
    "dos": 1,
    "tres": 1
}

# Prueba 3: texto vacío
assert contar_palabras("") == {}

# Prueba 4: espacios múltiples
assert contar_palabras("hola   mundo   hola") == {
    "hola": 2,
    "mundo": 1
}

# Prueba 5: una sola palabra
assert contar_palabras("python") == {
    "python": 1
}

try:
    contar_palabras(123)
    assert False, "Debería haber generado TypeError"
except TypeError:
    pass

print("Todas las pruebas pasaron correctamente.")
```

* Completar este link
    * https://forms.gle/rpD39z4nG4j6rs116

### Como convertir funciones impuras en funciones puras

### Alternativas propias de python a la hora de trabajar con parametros


## Excepciones

* Cuando estamos en nuestro codigo detectamos una situacion anomala y deseamos detener la ejecucion del codigo lanzamos una excepcion

```
    if not lista:
        raise ValueError("La lista no puede estar vacía")
```

* O bien hicimos

```
    if not isinstance(texto, str):
        raise TypeError("El parámetro 'texto' debe ser un string.")
```

* El raise genera una excepcion y detiene el codigo (salvo que el programador este preparado para la excepcion y diga que hacer en caso que ocurra)
* Los primeros tipos de Errores/Excepciones que vamos a aprender en python son el
* ValueError
  * Cuando una variable tiene un valor que no se espera y no es valido, ejemplo, una lista vacia
* TypeError
  * Cuando se espera trabajar con determinado tipo de dato pero eso no ocurre

> [!NOTE]
> En Python es muy comun validar la entrada de las funciones y tirar un TypeError o un ValueError
> Esto se le suele llamar programacion defensiva

---

# AIDev

## Metodologia de uso de la IA

* Generar codigo de a pasos, no mucho codigo de golpe

> [!WARN]
> Si la IA genera codigo muy complejo detenerse
> No hay que seguir avanzando ahsta no entender el codigo y si se entiende restructurarlo hasta que sea claro y lo pueda entender
  * E
* Pedirle a la Ia antes que explique lo que va a generar
* Entender el codigo generado y mejorarlo (no quedarse con la primera version)
* (Antes o despues) generar pruebas unitarias sobre el codigo generad
