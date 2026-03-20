# Clase Seis - 20 de Marzo del 2026

# Repaso

* Python
  * tuplas
    * Son inmutables, una vez que las creas no se puede sacar ni agregar elementos
    * Desempaquetar v1, v2 = (v1,v2)
    * Slicing tambien en tuplas
  * Funciones built-in
    * enumerate
  * Rangos
  * funciones
    * Declarar funciones con def
    * Esta curioidad que una funcion puede devolver varios valores en python
      * El resultado lo recibo como tupla y lo puedo desempaquetar
  * Tipos de Aplicaciones
    * Aplicaciones Web/API
      * Flask
  * Repasamos lo de los entornos virtuales
      * Listar las librerias necesarias en el archivo requirements.txt

# Colab del dia

> https://colab.research.google.com/drive/1QCHkgWlbb0u2qg_C5hgg0YpDswqOiFsk?usp=sharing

# Tipos de Datos que vamos a ver hoy...

* Diccionarios
* Sets / conjuntos

# Javascript

* El lenguaje de programacion utilizado dentro de los navegador para la parte de front
* Si estoy en el navegador y aprego f12 puedo abrir la consola del navegador de Javascript
* Javascript fue un lenguaje trascendental en mundo DEV. Todos de alguna manera lidian lidian con el.
* Javascript puso de moda un lenguaje/formato que se usa para para representar informacion, almacenar informacion, comunucar inforacion entre sistemas

 # JSON (Javascript Object Notation)

 * Por ejemplo en la consola de javascript (F12 en cualquier pagina) puedo declarar un objeto json

```javascript

let persona  = {
   nombre : "Esteban",
   apellido : "Calabria",
   edad : 45
}

```

* Luego cuando tengo un objeto en json le puedo consultar en forma separa por cada uno de sus atributos

```javascript

persona.nombre

o

persona["nombre"]

```

* Si hago un paralelismo con la programacion orientada a objetos, un objeto json se centra mas en la parte de datos que la de comportamiento
* En python vimos que las variables son objetos. Y a los objetos le puedo pedir cosas ejecutando metodos sobre ellos. Por ejemplos. "cadena".upper().

# Noticias

* Ahora hay un lenguaje que sale como alternativa al json que se llama toon (token object notatatiions) 
  * Bien ahi Julian
  * https://github.com/toon-format/toon
