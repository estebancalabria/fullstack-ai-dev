# Clase 08 - 2 de Septiembre del 2026

# Repaso

* Python
  * Numpy
    * Para calculos con Array
    * Muchos mas eficiente que las listas de python
      * Comparacion de performance entre Numpy y listas de pythhon
    * Se usa especiamente en IA
  * tipo de dato module
  * tipo de dato class
  * Inpeccion
    * help
    * type
    * dir
      * Para listar todas las funciones que exporta un modulo
    * _file__
      * Para ver donde esta el modulo en la pc fisicamente ubicado
  * Paginas para aprender Pyton

# AIDev

## Buenas practicas para trabajar con IA

* Antes:
  * Lo importante es que lo que programamos funcione
  * Se priorizaba que funcione por sobre la documentacion, el alcance, que este prolijo
  * Se hablaba de como programar bien
     * Clean Code
     * Coo organizar el codigo
     * Que se entienda
     * Que lo pueda mantener cualquiera
  * Pero en la practica a veces es tan dificil hacer funcionar un programa que lo otro pasaba a un segundo plano
* Hoy:
  * Si la IA trabaja sobre codigo, deprolijo, que no entiende, medio mamarrahco, despues va a hacer cualqueir cosa
  * Pero por otro lado la IA fue entrenada con condigo maso maso, entonces a veces genera codigo maso maso
  * Entonces hoy en dia mas que nunca es importante saber escribir codigo bien para corregir a la IA e indicarle como programar
    * TEmas como:
      * Clean Code
      * Refactoring
      * TEst driven Development
      * Arquitectura de Software
      * Patrones de Disenio
    * ESTAN MAS VIVO QUE NUNCA
    * Antes estos temas se estudiaban pero en la practica no se le daba mucha bola
    * Hoy en dia son fundamentales para lograr que la Ia programe bien

> Hoy en dia no vende ser el programador que te hace un super algoritmo que nadie entiende sino ser un programador con criteri oque sabe enseniarlo o darle instrucciones a la para que haga las cosas bien (Lo del agents.MD, Readme.MD que dice guido)

# Python

## Funciones puras vs impuras

* Definicion
 * Efecto secundario

```
#Existen dos tipos de funciones

# Funciones puras (pure functions)
# Una función pura no tiene efectos secundarios y siempre produce el mismo resultado para los mismos argumentos.
# Devuelve siempre lo mismo con los mismo parametros
# No depende de otra cosa que no sean los parametros que reciben
# Estas son las funciones que nos encantan porque son predecibles y fáciles de razonar
# Se pueden probar fácilmente con diferentes entradas para verificar su comportamiento
def suma(a, b):
    return a + b


# Funciones que tienen efectos secundarios (side effects)
# Una función con efectos secundarios puede modificar el estado fuera de su alcance o interactuar con el mundo exterior.
def imprimir_mensaje(mensaje):
    print(mensaje)          


global_variable = 0
def incrementar_global():
    global global_variable
    global_variable += 1
    return global_variable
```

> [!TIP]
> Decirle a la ia que genere siempre funciones puras
