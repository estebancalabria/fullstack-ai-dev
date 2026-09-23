# Clase 14 - 23 de Septiembre del 2026

# Repaso

* POO
  * Consistencia de un objeto
  * Diagramas / UML
    * Diagramas de clase
    * Generacion de diagramas con Mermaid
    * Jugamos con crear modelos de objetos con varias clases
  * Python
    * Clases
      * Creacion de objetos / constructor
        * metodo dunder __init__
        * Asegurar la consistencia desde el momento de la creacion
    * El dunder method str
* AiDev
  * Al usar la IA pedir chequeo de consistencia al generar Clases
  * Suele generar constructores que no aseguran la consistencia del objeto creado

---

# Setup de la clase

* Colab de la clase
  * https://colab.research.google.com/drive/1knT84zyYisCrXPgFqnzzLhWTlqQ4N-uM?usp=sharing

# Programacion Orientada a Objetos

## Consistencia de Objetos

* Momentos en que un objeto se puede volver inconsistente
  * Al momento de la creacion
  * Al momento de uso

 * Ejemplo donde el objeto se vuelve incosistente mientras lo usamos

```python
class Fraccion:
    def __init__(self, numerador : int, denominador : int):
        if denominador == 0:
            raise ValueError("El denominador no puede ser cero")

        self.numerador = numerador
        self.denominador = denominador

    def __str__(self) -> str:
        return f"{self.numerador}/{self.denominador}"


fraccion = Fraccion(1, 2)
print(fraccion)

fraccion.denominador = 0
print(fraccion)
```

* La idea es proteger el objeto duranto todo su ciclo de vida para para poder controlar los cambios  que se hacen sobre sus atriburos para mantener al objeto consistene
* Esto se llama encapsulamiento y y se hace distinto segun el lenguaje

* Nuestra implementacion de Fraccion con encapsulamiento
```python
class Fraccion:
    def __init__(self, numerador : int, denominador : int):
        #if denominador == 0:
        #    raise ValueError("El denominador no puede ser cero")

        self.numerador = numerador
        self.denominador = denominador

    @property
    def numerador(self):
        return self.__numerador

    @numerador.setter
    def numerador(self, numerador):
        self.__numerador = numerador

    @property
    def denominador(self):
        return self.__denominador

    @denominador.setter
    def denominador(self, denominador):
        if denominador == 0:
            raise ValueError("El denominador no puede ser cero")

        self.__denominador = denominador

    def __str__(self) -> str:
        return f"{self.numerador}/{self.denominador}"
```

* Como seria en java
```java
public class Fraccion {
    private int numerador;
    private int denominador;
 
    public Fraccion(int numerador, int denominador) {
        this.setNumerador(numerador);
        this.setDenominador(denominador);
    }
 
    public int getNumerador() {
        return numerador;
    }
 
    public void setNumerador(int numerador) {
        this.numerador = numerador;
    }
 
    public int getDenominador() {
        return denominador;
    }
 
    public void setDenominador(int denominador) {
        if (denominador == 0) {
            throw new IllegalArgumentException("El denominador no puede ser cero");
        }
        this.denominador = denominador;
    }
 
    @Override
    public String toString() {
        return numerador + "/" + denominador;
    }
 
    public static void main(String[] args) {
        Fraccion fraccion = new Fraccion(1, 2);
        System.out.println(fraccion);
 
        try {
            fraccion.setDenominador(0);
        } catch (IllegalArgumentException e) {
            System.out.println("Error capturado: " + e.getMessage());
        }
    }
}
```

* Como seria en c#

```c#
public class Fraccion
{
    private int _numerador;
    private int _denominador;

    public Fraccion(int numerador, int denominador)
    {
        Numerador = numerador;
        Denominador = denominador;
    }

    public int Numerador
    {
        get { return _numerador; }
        set { _numerador = value; }
    }

    public int Denominador
    {
        get { return _denominador; }
        set
        {
            if (value == 0)
            {
                throw new ArgumentException("El denominador no puede ser cero");
            }

            _denominador = value;
        }
    }

    public override string ToString()
    {
        return $"{Numerador}/{Denominador}";
    }
}
```

* El encapsulamiento busca proteger los atriburos para asegurar que no se modifiquen los mismos de forma de que nuestro objeto ya creado se vuelva inconsistente
* Para ocular los atributos y que no se puedan modificar desde afuera
    * Java y C# tienen niveles de visibilidad, se definen los atributos como private
    * Python prefiere en lugar de usar niveles de visibilidad nombrar los atributos __ (dunder), indicando que a ellos no se accede desde afuera
* Para permitir consultar los atributos
    * Java define un getter que se llama get<NombreAtributo>
    * C# agrega el concepto de propiedad y envuelve un atributo entre llaves y agrega un metodo especial llamado get
    * En python los getter reciben el decorador @property
* Para controlar el cambio sobre los atributos
    * Java define un setter que empieza con el prefijo set y se llama igual que el atributo
    * C# agrega el concepto de propiedad y envuelve un atributo entre llaves y agrega un metodo especial llamado set
    * En python los setter reciben el decorador @nombrepropiedad.setter
 
## Mini Ejercicio

* Definir en python una clase persona con Nombre, Edad, Altura
  * El nombre no puede quedar vacio, ni tener espacios, ni tener mas de 20 caracteres, solo caracteres alfanumericos y la primer letra en mayuscula, resto en minuscula
  * La edad tiene que ser mayor a 0, menor a 120 y ser aceptamos solo valores enteros
  * La altura esta entre 0.1 y 3.0 y admite solamente numeros con coma, esta en metros.
  * Asegurar la consistencia al momento de crear el objeto y durante todo el ciclo de vida del mismo

```
class Persona:
    def __init__(self, nombre, edad, altura):
        # Estas asignaciones pasan por los setters de abajo,
        # así que se validan al crear el objeto
        self.nombre = nombre
        self.edad = edad
        self.altura = altura

    # ---------- NOMBRE ----------
    @property
    def nombre(self):
        return self._nombre

    @nombre.setter
    def nombre(self, valor):
        if type(valor) is not str:
            raise TypeError("El nombre tiene que ser texto")
        if valor == "":
            raise ValueError("El nombre no puede estar vacío")
        if len(valor) > 20:
            raise ValueError("El nombre no puede tener más de 20 caracteres")
        if not valor.isalnum():  # esto también rechaza espacios
            raise ValueError("El nombre solo puede tener letras y números, sin espacios")
        if not valor[0].isupper():
            raise ValueError("La primera letra tiene que ser mayúscula")
        if valor[1:] != valor[1:].lower():
            raise ValueError("Después de la primera letra, todo en minúscula")
        self._nombre = valor

    # ---------- EDAD ----------
    @property
    def edad(self):
        return self._edad

    @edad.setter
    def edad(self, valor):
        if type(valor) is not int:
            raise TypeError("La edad tiene que ser un número entero")
        if valor <= 0 or valor >= 120:
            raise ValueError("La edad tiene que ser mayor a 0 y menor a 120")
        self._edad = valor

    # ---------- ALTURA ----------
    @property
    def altura(self):
        return self._altura

    @altura.setter
    def altura(self, valor):
        if type(valor) is not float:
            raise TypeError("La altura tiene que ser un número con coma (ej: 1.75)")
        if valor < 0.1 or valor > 3.0:
            raise ValueError("La altura tiene que estar entre 0.1 y 3.0 metros")
        self._altura = valor

    def __str__(self):
        return f"{self.nombre}, {self.edad} años, {self.altura} m"
```
