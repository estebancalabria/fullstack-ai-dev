# Clase Catorce - 22 de Abril 2026

# Repaso

* Python
  * Decoradores
     * Parametros
        * *args y **kwargs
        * Ejemplo
          * @log
          * @cronometrar
  * Python Disciplinado
    * Type Hints
      * Validacion estatica con mypy
  * Programacion Orientada a Objetos
    * Empezamos a ver tipos de metodos

# Colab de la clase

> https://colab.research.google.com/drive/1T9pkoa1KXarrEQYQAdR2zGS10mhV4Kzw?usp=sharing

# Programacion Orientada a Objetos

## Tipos De Metodos

* Existen en los lenguaje de programacion (en principio)
  * Metodos Sueltos, normales, tadicionales, de la programacion estructurada
  * Metodos que pertecen a un objeto / Metodos de Instancia
  * Metodos de clases / Metodos estaticos 

### Metodos de la programacion estructurada

* Se declaran directamente
* No se declaran dentro de una clase
* Van sueltos

**Python**
```python
def sumar(a,b):
  return a+b
```

### Metodos de instancia

* Se declaran dentro de una clase
* Para usarlos primero tenemos que instanciar la clase, crear un objeto
* En python estos metodos reciben el parametro self para hacer referencia a la variable que usamos para invvocar el metodo

**Python**
```
class Persona:
    def saludar(self):
        print("Hola")

# Para usarlo
# Primero Instanciamos la clase
persona = Persona()
# Luego recien ahi podemos usar el metodo
persona.saludar()
# Dentro del metodo saludar el self seria la variable persona
```

**java**
```
public class Persona {
    void saludar(){
        System.out.println("Hola")
    }
}

# Para usarlo
# Primero Instanciamos la clase
Persona persona = new Persona();
# Luego recien ahi podemos usar el metodo
persona.saludar();
# Dentro del metodo saludar el self seria la variable persona
```

> [!NOTE]
> Diferencias entre java y python.
> Para instanciar un objeto en java se pone new, en python se omite el new
> En python se usa print y en java System.out.println();

## Metodos de Clase

* En python llevan el decorador @staticmethod o @classmethod
* No hace falta instanciar un objeto para invocarlos. Solamente el nombre de la clase

**Python**
```
class Persona:
  @staticmethod
  def describir():
    print("Esta clase permite instanciar objetos que representan a Persona")

# Para invocarlo directamente pongo el nombre de la clase
Persona.describir()
```

**java**
```
public class Persona {

    public static void describir() {
        System.out.println("Esta clase permite instanciar objetos que representan a Persona");
    }

    public static void main(String[] args) {
        // Invocación directa sin crear objeto
        Persona.describir();
    }
}
```

> [!NOTE]
> En java existe la pabra reservasa "static" para declarar los metodos estaticos/de clase
> En python en su lugar debemos utilizar el decorador @staticmethod

### Diferencia entre @staticmethod o @classmethod

* Enunciado
  * Declarar una clase Persona que tenga un nombre y un metodo saludar.
  * A Su vez se debe llevar internamente en la clase un contador de cuantas personas se han instanciado
  * Le debo poder preguntar a la clase Persona el total de instancias que se crearon

* Observaciones
  * En los @classmethod voy a leer variables de clase, en los @staticmethod no
  * En los @classmethod no voy a leer variables de instancia (recibo el cls, no el self)

**Python**
```
class Persona:
    #Una variable que declaro aca arriba es una variable de clase
    #Significa que todas las instancias van a compartir esta variable
    total_instancias = 0

    def __init__(self, nombre):
        #En el constructor se declaran las variabes de instancia
        self.nombre = nombre

        Persona.total_instancias += 1

    def saludar(self):
        print(f"Hola, mi nombre es {self.nombre}")

    @classmethod
    def get_total(cls):
        return cls.total_instancias;

p1 = Persona("Julian")
p2 = Persona("Mateo")
p3 = Persona("Santiago")
p1.saludar()
p2.saludar()

total = Persona.get_total()
print(f"Total de personas creadas: {total}")
```

* Mismo ejemplo en java (me lo pasan uds)

**Java**
```
public class Persona {

    // Variable de clase (compartida por todas las instancias)
    private static int totalInstancias = 0;

    // Variable de instancia
    private String nombre;

    // Constructor
    public Persona(String nombre) {
        this.nombre = nombre;
        totalInstancias++;
    }

    // Método de instancia
    public void saludar() {
        System.out.println("Hola, mi nombre es " + this.nombre);
    }

    // Método de clase (static en Java)
    public static int getTotal() {
        return totalInstancias;
    }

    // Main para probar
    public static void main(String[] args) {
        Persona p1 = new Persona("Julian");
        Persona p2 = new Persona("Mateo");
        Persona p3 = new Persona("Santiago");

        p1.saludar();
        p2.saludar();

        int total = Persona.getTotal();
        System.out.println("Total de personas creadas: " + total);
    }
}
```

* Diferencias
  * Las variables de clase en java se declaran con el modificador static
  * Las variables de instancia en java se declaran directamente y en python dentro del constructor
  * Los @staticmethods y @classmethods de Python en java son metodos static (no se diferencia uno del otro)

## Investigacion

<img width="1920" height="1707" alt="image" src="https://github.com/user-attachments/assets/ec4c5640-28e0-4cce-a613-d72cd37df817" />

---

# System Design
