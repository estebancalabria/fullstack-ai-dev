# Clase Trece - 17 de Abril del 2026

# Repaso

* Novedades
  * Freedium para ver gratis los post de medium
* IA
  * Aprendemos a educar a la IA (Codding Assistants)
      * Github Copilot
      * .intructions.md
        * Pedirle al asistente que te arme un archivo de instrucciones
  * Python
      * Python Disciplinado
          * Buenas practicas de POO
          * Mantenga los objetos consistentes
          * type hints
      * Metodos Magicos (metodos dunder)
         * _ _ str _ _
         * _ _ repr _ _
      * Excepciones
         * raise
         * TypeError
         * ValueError
* Proyecto Integrador
   

# Google Colab de La Clase

> https://colab.research.google.com/drive/1ZDASQS3zV5m4VBvupgmHW4YuRGgqtLnm?usp=sharing

# Python

## Python Discuplinado y Type Hints

* Podemos validar previamente los type hints con mypy

> https://mypy-lang.org/

* Se instala para toda la pc

```
pip install mypy
```

* Si tengo este archivo demo-type-hints.py

```python
def sumar(a:int, b:int) -> int:
    return a + b

resultado = sumar(3, "5")
print(resultado)
```

* Y hago

```
mypy  demo-type-hints.py
```

* Me devuelve

```
C:\Cursos\fullstack-ai-dev\clases\clase-trece>mypy  demo-type-hints.py
demo-type-hints.py:6: error: Argument 2 to "sumar" has incompatible type "str"; expected "int"  [arg-type]
Found 1 error in 1 file (checked 1 source file)
```

## Metodos 

### Cantidad Variable de Parametros

* En pythons es posible declarar metodos que tegan una cantidad variable de parametros
* PAra ellos vamos a usar la sintaxis de desempaquetar tuplas (*args) y diccionarrios (**kwargs)

```python

#Recibir una cantidad variable de parametros
#Entender
def cualquier_parametro(*args, **kwargs):
  print(type(args), args)
  print(type(kwargs), kwargs)
  print("------")

cualquier_parametro(1,2)
cualquier_parametro(1,2,3,4)
cualquier_parametro(1,2, nombre="Esteban", apellido="Calabria")
cualquier_parametro(nombre="Esteban", apellido="Calabria")

# SyntaxError: positional argument follows keyword argument
#cualquier_parametro(nombre="Esteban", apellido="Calabria",1,2)
```

* Siemrpe primero los parametros posicionales
## Decoradores

* Contexto
  * No son algo de pytho
  * En principio lo podemos pensar como un comentario o metadatos que habla sobre el metodo/clase que aplica
      * En ese caso en vez de escribir el comentario en una sintaxis libre, lo haces con una sintaxis estandar
      * Cierta informacion que le agrego a un metodo/clase
  * Conceptos relacionados con decaroadores
      * AOP (Programacion orientada a aspectos)
      * Proxy
      * Interceptor
      * Funciones de Orden Superior
         * Definicion de Gaston una funcion de orden superior es un envoltorio de funciones
  * Cuando un metodo tiene un decorador, este puede interceptar las llamadas a ese metodo y agregarle comportamiento que normalmente no tiene

* En sisteas aparece codigo que repite micho (incumbecias tranversales / comportamientos tranversales)
  * Logging
  * Seguridad
  * Metricas
  * Validaciones

* Cuando vos tenes varios metodos que tienen codigo repetico el decorador puede intereceptar esa llamada y encargarse 

### Decoradores en Java

```
class A {
  @Deprecated
  @Override
  public String toString() { return "A"; }
}
```

* El decorador @Deprecated es como un comentario estandar que dice que ese metodo esta deprecado (no se usa mas)

### Decoradores en C#

```
class A {
  [Obsolete]
  public override string ToString() => "A";
}
```

* Aca el obsolete  es parecido veo un metodo con ese decorador y me doy cuenta que no se usa mas

### Decoradres en python

```python
def log(func):
  def proxy(*args, **kwargs):
    print(">>>> Antes de invocar ", func.__name__ );
    result = func(*args, **kwargs)
    print(">>> Despues de invocar ", func.__name__ );  
    return result  
  return proxy;

# El @log reemplaza al mostrar_algo por la funcion proxy
#El @log dice reemplazar lo que sigue por lo que devuelve la funcion log(mostrar_algo)
# Reemplazar mostrar_algo por lo que devuelve log(mostrar_algo)
@log 
def mostrar_algo(): 
  print("Hola te muestro algo")

mostrar_algo()
```

Devuelve 

```
>>>> Antes de invocar  mostrar_algo
Hola te muestro algo
>>> Despues de invocar  mostrar_algo
```

* Otro Ejemplo (idea de Julian)

```
import time

def cronometrar(func):
    def wrapper(*args, **kwargs):
        inicio = time.perf_counter()
        resultado = func(*args, **kwargs)
        fin = time.perf_counter()
        
        tiempo = fin - inicio
        print(f"\033[92mLa función {func.__name__} tardó {tiempo:.4f} segundos\033[0m")
        
        return resultado
    return wrapper

@cronometrar
def funcion_lenta():
    time.sleep(10)  # espera 10 segundos
    print("tarea concluida")

funcion_lenta()
```

# POO

## Distintos tipos de metodos en POO
    

# Glosario

* dunder : abreviatura que significa doble guion bajo


