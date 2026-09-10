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
  * https://colab.research.google.com/drive/1neYHjWKe5G16yHYom3s_O8g8rYi0etok?usp=sharing
   
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
def contar_palabras(texto: str) -> dict[str, int]:
    """
    Cuenta la cantidad de veces que aparece cada palabra en un texto.

    Args:
        texto: Texto del cual se quieren contar las palabras.

    Returns:
        Un diccionario donde cada clave es una palabra y su valor
        representa la cantidad de apariciones.

    Raises:
        TypeError: Si `texto` no es una cadena de texto.
    """
    if not isinstance(texto, str):
        raise TypeError("El parámetro 'texto' debe ser un string.")

    resultado: dict[str, int] = {}

    for palabra in texto.split():
        resultado[palabra] = resultado.get(palabra, 0) + 1

    return resultado
```

> Ejemplo de prompt : "Analiza el siguiente codigo en puthon y propone una versiona mejrada que: mejore la legibilidad y claridad, aplique buenas practicas de python, aplique tecnicas de clean code para que el codigo sea mas facil de mantener, buscar errores, agregar validaciones que sean sean necesarias, hacer el codigo lo mas claro y facil de mantener posible, agregarle la documentacion necesaria para la funcion, agregar type hints."

* Pruebas unitarias sobre ese codigo

```python
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


### Alternativas propias de python a la hora de trabajar con parametros

#### Parametros por defecto

```python
def input_int(mensaje="Ingrese un número entero: ", minimo=None, maximo=None, mensaje_error=None):
```

* Los parametros por defectos son opcionales a la hora de invocar la funcion
* Si el usuario se los especifica se usan, pero sino se usa el valor por defecto que le indico el programador
* De esa manera por ejemplo a la funcion anterior la podemos invocar de estas dos maneras

```python
valor = input_int()
valor = input_int("Ingrese su edad")
```

##### Ejemplo

* Quiero que desarrollen la funcion Inc que recibe una variable y la incrementa
* Si no se le especifica nada, la incrementa en uno, sino en el valor especificado por parametro
* Esta funcion la usaba el profe en turbo pascal, le trae recuerdos

```python
def Inc(variable, incremento=1):
    try:
        return variable + incremento
    except TypeError:
        raise TypeError("La variable y el incremento deben ser compatibles.")
```

* Se puede

```python
res = inc(2)
res = inc()
```

---

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

## Validacion de Datos de Entrada y Conversion entre tipos de Datos

```python
edad = input("Ingrese su edad: ")
#De que tipo de dato es la variable edad?

print(type(edad))
#Lo que ingresa el usuario por teclado siempre se guarda en una variable str
```

* Este codigo

```
entrada = input("Ingrese su edad: ")
edad = int(entrada)
print(f"Su edad es {edad}")
```

* Si ingresamos un numero anda bien, sino tira un value error

> [!NOTE]
> Las conversiones entre tipos de datos son una fuente de errores muy frecuentes en python (y en cualquier lenguaje)

* Si queremos proteger nuestro codigo vamos a usar un bloque try
```
# Cuando algo "puede fallar" nos vamos a proteger con un bloque try
entrada = input("Ingrese su edad: ")

try:
  edad = int(entrada)
  print(f"Su edad es {edad}")

except ValueError:
  print("Ingresaste una edad invalida")
```

* Un ejemplo de TypeError

```
cadena = "Hola"
res = cadena + 5
```

* Me tira

```
TypeError                                 Traceback (most recent call last)
/tmp/ipykernel_1587/572292592.py in <cell line: 0>()
      1 cadena = "Hola"
----> 2 res = cadena + 5

TypeError: can only concatenate str (not "int") to str
```

## Ejercicio

* Quiero la funcion input_int que le pida ingresar un numero al usuario y si ingresa otra cosa se lo pida de nuevo hasta que lo haga bien
 * Completar https://forms.gle/BJ9oi9icjtqrRoH5A

```
def input_int(mensaje="Ingrese un número entero: ", minimo=None, maximo=None, mensaje_error=None):
  """
  Pide al usuario un número entero y valida la entrada.

  Args:
  mensaje (str): Mensaje que se muestra al usuario.
  minimo (int, optional): Valor mínimo permitido.
  maximo (int, optional): Valor máximo permitido.
  mensaje_error (str, optional): Mensaje de error personalizado.

  Returns:
  int: El número entero ingresado por el usuario.
  """
  if mensaje_error is None:
     mensaje_error = "Error: Debe ingresar un número entero válido."

  while True:
    try:
      numero = int(input(mensaje))

      if minimo is not None and numero < minimo:
        print(f"Error: El número debe ser mayor o igual a {minimo}.")
        continue

      if maximo is not None and numero > maximo:
         print(f"Error: El número debe ser menor o igual a {maximo}.")
         continue

      return numero

    except ValueError:
       print(mensaje_error)
```

---

# AIDev

## Metodologia de uso de la IA

* Generar codigo de a pasos, no mucho codigo de golpe

> [!WARN]
> Si la IA genera codigo muy complejo detenerse
> No hay que seguir avanzando ahsta no entender el codigo y si se entiende restructurarlo hasta que sea claro y lo pueda entender

* Pedirle a la Ia antes que explique lo que va a generar
* Entender el codigo generado y mejorarlo (no quedarse con la primera version)
* (Antes o despues) generar pruebas unitarias sobre el codigo generado


# Proxima Clase

* Reforzar lo que vamos viendo de Python
* Hacer algunas cositas con Interfaces Graficas
