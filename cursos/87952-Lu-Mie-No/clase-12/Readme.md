<img width="862" height="445" alt="image" src="https://github.com/user-attachments/assets/9b0e1061-2453-4546-b629-dc0aacfeb014" /># Clase 12 - 16 de Septiembre de 2026

# Repaso

* IA
  *NotebookLM
* Python
  * Type Hints
  * Programacion Orientada a Objetos
    * Clase
      * Un tipo de datos generado por el usuario que contiene tanto datos (atributos) como metodos
      * La variable que crea una clase se llama instancia / objeto
      * Una clase es una fabrica o plantilla para crear muchos objetos
  * Aplicaciones de Escritorio
    * TKinter
      * Clases
        * Tk (ventana)
        * Label
        * Button
        * Entry
  * Pruebas Automaticas
    * Pruebas Unitarias -> prueba una funcion 
    * Pruebas de Integracion -> Ya cuando incluia aspectos como la interfaz grafica e integracion con otras librerias 


# Noticia del momento

Hay que frenar la IA?

## Algunas noticias

* https://www.instagram.com/p/DXhU-zlDO00/?hl=es
* https://openai.com/es-ES/index/hugging-face-incident-and-the-road-ahead/
* https://www.infobae.com/economia/2026/09/15/los-llamados-a-frenar-el-desarrollo-de-la-ia-estan-obligando-a-replantear-la-estrategia-de-wall-street/

# Python

## Setup

* Colab de la clase
 * https://colab.research.google.com/drive/1bGVPBkyq1tF1M1mgO8yMnSw99RN6Ofvc?usp=sharing

## Programacion Orientada a Objetods

* El boom de la programacion a Objetos

* Cunando programamos solo funciones y procedimientos
 * Esto se llama Programacion Estructurada
 * Todo muy lindo con este paradigma pero cuando los programas crecian se empezaban a hacer mas dificiles de mantener
 * Lenguajes
   * C
   * Pascal
   * Foxpro
   * Python (lo que vimos sin Clases)
* Para solucionar el tema de la "mantenibilidad" cobro protagonismo la POO (Los 90)
  * Pego muy fuerte con el disenio de interfaces : un objeto con representacion visual se llama componente
  * Lenguajes
   * Java
   * C# (.NET)
   * Delphi
   * C++
* Supuestamente la idea es esta:

<img width="862" height="445" alt="image" src="https://github.com/user-attachments/assets/21877df2-5af4-4046-a9cf-d870f0acf372" />

* La programacion Orientada a Objetos
  * Tiene conceptos generales que son independientes de los lenguajes de programacion
    * Encapsulamiento
    * Herencia
    * Abstraccion
    * Acoplamiento
    * Cohesion
    * Construccion de objetos
  * Cada lenguaje de programacion implementa esos conceptos a su manera

> [!NOTE]
> La idea de la POO es capturar el lenguaje del problema en el que estamos trabajando en Clases

> [!NOTE]
> LA Poo se empezo como un lenguaje para la simulacion, donde se queria representar en tipos de datos los conceptos del mundo real que se querian simular y capturar tanto sus atributos como su comportamiento

## Un Codigo en Python

* Quiero un programa en pyton que me pida el numerador de una fraccion y su denominador, luego me pida el numerador y el denominador de otra fraccion y me calcule la suma de ambas y la multiplicacion de ambas. Con variables sueltas.

```python
# Primera fracción
numerador1 = int(input("Ingrese el numerador de la primera fracción: "))
denominador1 = int(input("Ingrese el denominador de la primera fracción: "))

# Segunda fracción
numerador2 = int(input("Ingrese el numerador de la segunda fracción: "))
denominador2 = int(input("Ingrese el denominador de la segunda fracción: "))


# Suma de fracciones
numerador_suma = numerador1 * denominador2 + numerador2 * denominador1
denominador_suma = denominador1 * denominador2

# Multiplicación de fracciones
numerador_multiplicacion = numerador1 * numerador2
denominador_multiplicacion = denominador1 * denominador2


# Mostrar resultados
print(
    f"Suma: {numerador_suma}/{denominador_suma}"
)

print(
    f"Multiplicación: {numerador_multiplicacion}/{denominador_multiplicacion}"
)
```

* Ahora si observo este codigo puedo ver que...
  * Veo que el numerador y el denominador son parte del mismo concepto: La Fracion
  * La clase Fraccion va a ser un tipo de dato nuevo creado por el usuario donde el denominador y el numerador son atributos
  * 1/4 y 1/2 son objetos, instancias de la clase fraccion

* Vamos a generarlo con IA

```
Tengo este codigo en python (codigo anterior) Quiero que me generes la clase Fraccion con sus atributos y operaciones que aparecen en este codigo.
```

* Lo que Genera la IA

```python
class Fraccion:

    def __init__(self, numerador, denominador):
        self.numerador = numerador
        self.denominador = denominador

    def sumar(self, otra):
        numerador = (
            self.numerador * otra.denominador
            + otra.numerador * self.denominador
        )

        denominador = self.denominador * otra.denominador

        return Fraccion(numerador, denominador)

    def multiplicar(self, otra):
        numerador = self.numerador * otra.numerador
        denominador = self.denominador * otra.denominador

        return Fraccion(numerador, denominador)
```

* Su uso

```
# Primera fracción
numerador1 = int(input("Ingrese el numerador de la primera fracción: "))
denominador1 = int(input("Ingrese el denominador de la primera fracción: "))

# Segunda fracción
numerador2 = int(input("Ingrese el numerador de la segunda fracción: "))
denominador2 = int(input("Ingrese el denominador de la segunda fracción: "))


# Crear objetos Fraccion
fraccion1 = Fraccion(numerador1, denominador1)
fraccion2 = Fraccion(numerador2, denominador2)


# Realizar operaciones
suma = fraccion1.sumar(fraccion2)
multiplicacion = fraccion1.multiplicar(fraccion2)


# Mostrar resultados
print(f"Suma: {suma.numerador}/{suma.denominador}")
print(f"Multiplicación: {multiplicacion.numerador}/{multiplicacion.denominador}")
```

### Por curiosidad: como es en otros lenguajes

* En JAVA

```java
public class Fraccion {

    private int numerador;
    private int denominador;

    public Fraccion(int numerador, int denominador) {
        this.numerador = numerador;
        this.denominador = denominador;
    }

    public Fraccion sumar(Fraccion otra) {
        int numerador = this.numerador * otra.denominador
                      + otra.numerador * this.denominador;

        int denominador = this.denominador * otra.denominador;

        return new Fraccion(numerador, denominador);
    }

    public Fraccion multiplicar(Fraccion otra) {
        int numerador = this.numerador * otra.numerador;
        int denominador = this.denominador * otra.denominador;

        return new Fraccion(numerador, denominador);
    }
}
```

* El uso

```java
import java.util.Scanner;

public class Main {

    public static void main(String[] args) {

        Scanner scanner = new Scanner(System.in);

        // Primera fracción
        System.out.print("Ingrese el numerador de la primera fracción: ");
        int numerador1 = scanner.nextInt();

        System.out.print("Ingrese el denominador de la primera fracción: ");
        int denominador1 = scanner.nextInt();

        // Segunda fracción
        System.out.print("Ingrese el numerador de la segunda fracción: ");
        int numerador2 = scanner.nextInt();

        System.out.print("Ingrese el denominador de la segunda fracción: ");
        int denominador2 = scanner.nextInt();

        // Crear objetos Fraccion
        Fraccion fraccion1 = new Fraccion(numerador1, denominador1);
        Fraccion fraccion2 = new Fraccion(numerador2, denominador2);

        // Realizar operaciones
        Fraccion suma = fraccion1.sumar(fraccion2);
        Fraccion multiplicacion = fraccion1.multiplicar(fraccion2);

        // Mostrar resultados
        System.out.println(
            "Suma: " + suma.numerador + "/" + suma.denominador
        );

        System.out.println(
            "Multiplicación: " + multiplicacion.numerador + "/" + multiplicacion.denominador
        );

        scanner.close();
    }
}
```


* En C#

```c#
public class Fraccion
{
    private int numerador;
    private int denominador;

    public Fraccion(int numerador, int denominador)
    {
        this.numerador = numerador;
        this.denominador = denominador;
    }

    public Fraccion Sumar(Fraccion otra)
    {
        int numerador = this.numerador * otra.denominador
                      + otra.numerador * this.denominador;

        int denominador = this.denominador * otra.denominador;

        return new Fraccion(numerador, denominador);
    }

    public Fraccion Multiplicar(Fraccion otra)
    {
        int numerador = this.numerador * otra.numerador;
        int denominador = this.denominador * otra.denominador;

        return new Fraccion(numerador, denominador);
    }

    public override string ToString()
    {
        return $"{numerador}/{denominador}";
    }
}
```

* En c++

```c++
#include <iostream>
using namespace std;

class Fraccion
{
private:
    int numerador;
    int denominador;

public:
    Fraccion(int numerador, int denominador)
    {
        this->numerador = numerador;
        this->denominador = denominador;
    }

    Fraccion sumar(const Fraccion& otra)
    {
        int numerador = this->numerador * otra.denominador
                      + otra.numerador * this->denominador;

        int denominador = this->denominador * otra.denominador;

        return Fraccion(numerador, denominador);
    }

    Fraccion multiplicar(const Fraccion& otra)
    {
        int numerador = this->numerador * otra.numerador;
        int denominador = this->denominador * otra.denominador;

        return Fraccion(numerador, denominador);
    }
};
```
