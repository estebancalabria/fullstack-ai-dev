# Clase 09 - 7 de Septiembre del 2026

# Mini-Repaso

* Python
  * Funciones
    * Tipos de Funciones
        * Puras
          * Usa solamente lo que reciben como parametro
          * Mismos parametros -> Mismos resultados
          * No tienen efectos colaterales (no tienen externalidades) 
        * Impuras
          * No siempre devuelven lo mismo
          * Pueden depender de variables globales o estados externos (hora del sistema)
          * Tienen efectos colarelares
* AiDev
  * Hoy en dia en la era de IA es importante el codigo que generamos
     * Que sea prolijo
     * Que use patrones probados
     * Que la nomenclatura de las variables sea universalmente entendible

# AIDev

> [!TIP]
> La IA funciona mejor sobre codigo que este bien hecho

> [!TIP]
> La IA muchas veces genera codigo malardo que tenemos que mejorar   

## Libros muuuuy recomendados

* Clean Code - Robert C. Martin
  * https://github.com/Gatjuat-Wicteat-Riek/clean-code-book

* Refactoring - Improving the Design of Existing Code
  * https://martinfowler.com/books/refactoring.html

# Funciones en python

## Funciones Puras y Pruebas Unitarias

* LAs funciones puras son importantes porque se pueden probar automaticamente
* Prueba Unitaria
  * Es un framento de Codigo que Prueba una funcion
  * En la industria del SW siempre se reconocio la importancia de las Pruebas Unitarias
     * Pero nunca se daba tiempo para realizarlas
     * Hoy en dia la IA el dio una nueva vida a las pruebas unitarias. 

* Completar en este formulario una funcion pura
  * https://docs.google.com/forms/d/e/1FAIpQLScgaxKgVrA7PI6g9JaBqAl815l4G3wCTaOposqTx8toat4S0A/viewform?usp=publish-editor
 

* Funciones Puras

```python

def sumar(a, b):
  return a + b

def num_mayor(lista):
  mayor = lista[0]
 
  for num in lista:
    if num > mayor:
       mayor = num
 
  return mayor


def es_par(numero):
 if isinstance(numero, int):
    return numero % 2 == 0
 else:
    return "Debes ingresar un número"


def multiplicar(a, b):
  return a * b

def dividir(a,b):
   return a/b

def saludo(name):
   return (f"Hola, {name}! Esta es una función en Python.")

def duplicar_lista(numeros):
    return [numero * 2 for numero in numeros]

def es_par(numero):
  if numero % 2 == 0:
    return True
  else:
   return False
```



* mmm.. no son del todo puras

```
# El problema es print(): produce un efecto secundario (escribe en la consola).
def saludo(name):
    print(f"Hola, {name}! Esta es una función en Python.")
```


## Pruebas Unitarias

Vamos a generar el archivo test_funcion_sumar.py

```python
from funciones import sumar

def test_sumar_dos_numeros_positivos():
    assert sumar(2, 3) == 5

def test_sumar_numeros_negativos():
    assert sumar(-2, -3) == -5

def test_sumar_positivo_y_negativo():
    assert sumar(5, -2) == 3

def test_sumar_con_cero():
    assert sumar(5, 0) == 5

def test_sumar_cero_y_cero():
    assert sumar(0, 0) == 0
```

* Luego en el cmd

```
>pytest
====================================== test session starts =======================================
platform win32 -- Python 3.11.1, pytest-9.0.2, pluggy-1.6.0
rootdir: C:\Cursos\fullstack-ai-dev\cursos\87952-Lu-Mie-No\clase-09\python
plugins: anyio-4.7.0, asyncio-1.3.0, typeguard-4.5.2
asyncio: mode=Mode.STRICT, debug=False, asyncio_default_fixture_loop_scope=None, asyncio_default_test_loop_scope=function
collected 5 items                                                                                 

test_funcion_sumar.py .....                                                                 [100%]

======================================= 5 passed in 0.10s ========================================

```

> [!WARN]
> Si no reconoce el comando pytest hacer
> >pip install pytest

> [!NOTE]
> Que pasa si hago fallar una funcion?

## Generacion de pruebas con Copilot

* Usamos este prompt en copilot

```
Generame el archivo test_funcion_num_mayor.py con varios casos de prueba para la funcion nu,m_mayor 
```

* Genero esto

```
from funciones import num_mayor


def test_num_mayor_lista_con_numeros_positivos():
    assert num_mayor([3, 8, 1, 6]) == 8


def test_num_mayor_lista_con_numeros_negativos():
    assert num_mayor([-10, -3, -7, -1]) == -1


def test_num_mayor_lista_con_mixto_positivos_y_negativos():
    assert num_mayor([-5, 0, 12, -2, 7]) == 12


def test_num_mayor_lista_con_un_solo_elemento():
    assert num_mayor([42]) == 42


def test_num_mayor_lista_ordenada_descendente():
    assert num_mayor([9, 7, 5, 3, 1]) == 9


def test_num_mayor_lista_ordenada_ascendente():
    assert num_mayor([1, 3, 5, 7, 9]) == 9

```

## Agregando tests nuevos

* Se me ocurre agregar este test nuevo

```
def test_num_mayor_lista_vacia():
    assert num_mayor([]) == None
```

* Me da un error

```
>pytest
================== test session starts ===================
platform win32 -- Python 3.11.1, pytest-9.0.2, pluggy-1.6.0
rootdir: C:\Cursos\fullstack-ai-dev\cursos\87952-Lu-Mie-No\clase-09\python
plugins: anyio-4.7.0, asyncio-1.3.0, typeguard-4.5.2
asyncio: mode=Mode.STRICT, debug=False, asyncio_default_fixture_loop_scope=None, asyncio_default_test_loop_scope=function
collected 12 items                                        

test_funcion_num_mayor.py ......F                   [ 58%]
test_funcion_sumar.py F....                         [100%]

======================== FAILURES ========================
_______________ test_num_mayor_lista_vacia _______________

    def test_num_mayor_lista_vacia():
>       assert num_mayor([]) == None
               ^^^^^^^^^^^^^

test_funcion_num_mayor.py:29: 
_ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ 

lista = []

    def num_mayor(lista):
>     mayor = lista[0]
              ^^^^^^^^
E     IndexError: list index out of range

funciones.py:11: IndexError
____________ test_sumar_dos_numeros_positivos ____________

    def test_sumar_dos_numeros_positivos():
>       assert sumar(2, 4) == 5
E       assert 6 == 5
E        +  where 6 = sumar(2, 4)

test_funcion_sumar.py:4: AssertionError
================ short test summary info =================
FAILED test_funcion_num_mayor.py::test_num_mayor_lista_vacia - IndexError: list index out of range
FAILED test_funcion_sumar.py::test_sumar_dos_numeros_positivos - assert 6 == 5
============== 2 failed, 10 passed in 0.30s ==============

C:\Cursos\fullstack-ai-dev\cursos\87952-Lu-Mie-No\clase-09\python>
```

* Y ahi copilot me sugirio...

```
def num_mayor(lista):
  if not lista:
    return None
```

## TDD (Test Driven Development)

* Vamos a programar los tests de una funcion que se llama validar_password que revuevle un diccionario de la forma
{
    valida : true/false
    mensaje : [mensaje explicando si esta bien o mal el password]
}

* Ejemplo funcion sin terminar

```
def validar_password(password):
    return {
        "valid": True,
        "message": "Password is valid"
    }
```

* Debemos programar los tests para validar lo siguiente
  * El password debe contener numeros y letras
  * Debe tener una longitud minima de 10 caracteres
  * Debe tener una longitud maxima de 20 caracteres
  * Debe tener al menos un simbolo especial
  * Debe tener mayusculas y minusculas
  * No debe tener espacios
 
* Programamos PRIMERO LOS TESTS de cada caso

```python
from validar_password import validar_password


def test_password_valida():
    resultado = validar_password("Abcdef1234!")

    assert resultado["valid"] is True
    assert resultado["message"] == "Password is valid"


def test_password_sin_numeros():
    resultado = validar_password("Abcdefghij!")

    assert resultado["valid"] is False
    assert resultado["message"] == "Password must contain numbers"


def test_password_sin_letras():
    resultado = validar_password("1234567890!")

    assert resultado["valid"] is False
    assert resultado["message"] == "Password must contain letters"


def test_password_menos_de_10_caracteres():
    resultado = validar_password("Abc123!x")

    assert resultado["valid"] is False
    assert resultado["message"] == "Password must be at least 10 characters"


def test_password_mas_de_20_caracteres():
    resultado = validar_password("Abcdefghijklmnop12345!")

    assert resultado["valid"] is False
    assert resultado["message"] == "Password must be at most 20 characters"


def test_password_sin_simbolo_especial():
    resultado = validar_password("Abcdef12345")

    assert resultado["valid"] is False
    assert resultado["message"] == "Password must contain a special symbol"


def test_password_sin_mayusculas():
    resultado = validar_password("abcdef1234!")

    assert resultado["valid"] is False
    assert resultado["message"] == "Password must contain uppercase letters"


def test_password_sin_minusculas():
    resultado = validar_password("ABCDEF1234!")

    assert resultado["valid"] is False
    assert resultado["message"] == "Password must contain lowercase letters"


def test_password_con_espacios():
    resultado = validar_password("Abc 123456!")

    assert resultado["valid"] is False
    assert resultado["message"] == "Password must not contain spaces"
```

* Si lo ejecuto todo los test fallan

```
C:\Cursos\fullstack-ai-dev\cursos\87952-Lu-Mie-No\clase-09\python>pytest test_validar_password.py
================================================ test session starts ================================================
platform win32 -- Python 3.11.1, pytest-9.0.2, pluggy-1.6.0
rootdir: C:\Cursos\fullstack-ai-dev\cursos\87952-Lu-Mie-No\clase-09\python
plugins: anyio-4.7.0, asyncio-1.3.0, typeguard-4.5.2
asyncio: mode=Mode.STRICT, debug=False, asyncio_default_fixture_loop_scope=None, asyncio_default_test_loop_scope=function
collected 9 items                                                                                                    

test_validar_password.py .FFFFFFFF                                                                             [100%]

===================================================== FAILURES ======================================================
_____________________________________________ test_password_sin_numeros _____________________________________________

    def test_password_sin_numeros():
        resultado = validar_password("Abcdefghij!")
    
>       assert resultado["valid"] is False
E       assert True is False

test_validar_password.py:15: AssertionError
_____________________________________________ test_password_sin_letras ______________________________________________

    def test_password_sin_letras():
        resultado = validar_password("1234567890!")
    
>       assert resultado["valid"] is False
E       assert True is False

test_validar_password.py:22: AssertionError
_______________________________________ test_password_menos_de_10_caracteres ________________________________________

    def test_password_menos_de_10_caracteres():
        resultado = validar_password("Abc123!x")
    
>       assert resultado["valid"] is False
E       assert True is False

test_validar_password.py:29: AssertionError
________________________________________ test_password_mas_de_20_caracteres _________________________________________

    def test_password_mas_de_20_caracteres():
        resultado = validar_password("Abcdefghijklmnop12345!")
    
>       assert resultado["valid"] is False
E       assert True is False

test_validar_password.py:36: AssertionError
________________________________________ test_password_sin_simbolo_especial _________________________________________

    def test_password_sin_simbolo_especial():
        resultado = validar_password("Abcdef12345")
    
>       assert resultado["valid"] is False
E       assert True is False

test_validar_password.py:43: AssertionError
___________________________________________ test_password_sin_mayusculas ____________________________________________

    def test_password_sin_mayusculas():
        resultado = validar_password("abcdef1234!")
    
>       assert resultado["valid"] is False
E       assert True is False

test_validar_password.py:50: AssertionError
___________________________________________ test_password_sin_minusculas ____________________________________________

    def test_password_sin_minusculas():
        resultado = validar_password("ABCDEF1234!")
    
>       assert resultado["valid"] is False
E       assert True is False

test_validar_password.py:57: AssertionError
____________________________________________ test_password_con_espacios _____________________________________________

    def test_password_con_espacios():
        resultado = validar_password("Abc 123456!")
    
>       assert resultado["valid"] is False
E       assert True is False

test_validar_password.py:64: AssertionError
============================================== short test summary info ==============================================
FAILED test_validar_password.py::test_password_sin_numeros - assert True is False
FAILED test_validar_password.py::test_password_sin_letras - assert True is False
FAILED test_validar_password.py::test_password_menos_de_10_caracteres - assert True is False
FAILED test_validar_password.py::test_password_mas_de_20_caracteres - assert True is False
FAILED test_validar_password.py::test_password_sin_simbolo_especial - assert True is False
FAILED test_validar_password.py::test_password_sin_mayusculas - assert True is False
FAILED test_validar_password.py::test_password_sin_minusculas - assert True is False
FAILED test_validar_password.py::test_password_con_espacios - assert True is False
============================================ 8 failed, 1 passed in 0.27s ============================================

```

* Vamos a pedirle a copilot que haga la funcion para que pasen todos los tests

```
mira @terminalLastCommand y hace que los tests funcionen. Corregime la funcion validar_password
```

* Me Genera

```

def validar_password(password):
    if len(password) < 10:
        return {"valid": False, "message": "Password must be at least 10 characters"}

    if len(password) > 20:
        return {"valid": False, "message": "Password must be at most 20 characters"}

    if " " in password:
        return {"valid": False, "message": "Password must not contain spaces"}

    if not any(c.isalpha() for c in password):
        return {"valid": False, "message": "Password must contain letters"}

    if not any(c.isdigit() for c in password):
        return {"valid": False, "message": "Password must contain numbers"}

    if not any(c.isupper() for c in password):
        return {"valid": False, "message": "Password must contain uppercase letters"}

    if not any(c.islower() for c in password):
        return {"valid": False, "message": "Password must contain lowercase letters"}

    if not any(not c.isalnum() for c in password):
        return {"valid": False, "message": "Password must contain a special symbol"}

    return {"valid": True, "message": "Password is valid"}
```

* Ahora pytest da todo bien

```
> pytest .\test_validar_password.py                                      
========================== test session starts ==========================
platform win32 -- Python 3.11.7, pytest-7.4.0, pluggy-1.0.0
rootdir: C:\Cursos\fullstack-ai-dev\cursos\87952-Lu-Mie-No\clase-09\python
plugins: anyio-4.11.0
collected 9 items                                                        

test_validar_password.py .........                                 [100%]

=========================== 9 passed in 0.08s ===========================
(base) PS C:\Cursos\fullstack-ai-dev\cursos\87952-Lu-Mie-No\clase-09\python> 
```

* Flujo TDD

* (Firma Funcion) -> (Programo los tests) -> FALLAN -> (Corrijo la funcion hasta que pase los tests)
* TODO Esto con IA


---
# BREAK HASTA MENOS 10
---

# Vamos a hacer un ejercicio de lo visto hasta ahora

* https://docs.google.com/forms/d/e/1FAIpQLSdSpKii9wlpk5CXXKTRYXOceTiMXyeSWGxUySsif6ANI4my3A/viewform?usp=publish-editor

# Lo hacemos juntos...

* Genere la funcion (que esta mal, es solo la firma)

```python

def es_primo(numero):
    return True
```

* Genere los tests

```
import es_primo

# Separar en casoss
# Generar Tests PAra
# Numero que no es primo devuelve false
# Un par de numeros primos devuelven true
# Si le pasas un string como parametro devuelve false

def test_es_primo_numeros_primos():
    assert es_primo.es_primo(2) is True
    assert es_primo.es_primo(3) is True
    assert es_primo.es_primo(5) is True


def test_es_primo_numeros_no_primos():
    assert es_primo.es_primo(4) is False
    assert es_primo.es_primo(1) is False


def test_es_primo_string():
    assert es_primo.es_primo("string") is False
```

* Ejecutar los tests

```
>pytest test_es_primo.py      
==================================== test session starts =====================================
platform win32 -- Python 3.11.1, pytest-9.0.2, pluggy-1.6.0
rootdir: C:\Cursos\fullstack-ai-dev\cursos\87952-Lu-Mie-No\clase-09\python
plugins: anyio-4.7.0, asyncio-1.3.0, typeguard-4.5.2
asyncio: mode=Mode.STRICT, debug=False, asyncio_default_fixture_loop_scope=None, asyncio_default_test_loop_scope=function
collected 3 items                                                                             

test_es_primo.py .FF                                                                    [100%]

========================================== FAILURES ==========================================
______________________________ test_es_primo_numeros_no_primos _______________________________

    def test_es_primo_numeros_no_primos():
>       assert es_primo.es_primo(4) is False
E       assert True is False
E        +  where True = <function es_primo at 0x0000029E51557BA0>(4)
E        +    where <function es_primo at 0x0000029E51557BA0> = es_primo.es_primo

test_es_primo.py:16: AssertionError
____________________________________ test_es_primo_string ____________________________________

    def test_es_primo_string():
>       assert es_primo.es_primo("string") is False
E       AssertionError: assert True is False
E        +  where True = <function es_primo at 0x0000029E51557BA0>('string')
E        +    where <function es_primo at 0x0000029E51557BA0> = es_primo.es_primo

test_es_primo.py:21: AssertionError
================================== short test summary info ===================================
FAILED test_es_primo.py::test_es_primo_numeros_no_primos - assert True is False
FAILED test_es_primo.py::test_es_primo_string - AssertionError: assert True is False
================================ 2 failed, 1 passed in 0.19s =================================
```

* Uso copilot para que corrija la funcion

```
mirar @terminalLastCommand  y corregir el archivo #sym:es_primo para que pasen los tests
```

* Me lo va a cooregir

```
def es_primo(numero):
    if not isinstance(numero, int) or numero < 2:
        return False

    for divisor in range(2, int(numero ** 0.5) + 1):
        if numero % divisor == 0:
            return False

    return True
``
