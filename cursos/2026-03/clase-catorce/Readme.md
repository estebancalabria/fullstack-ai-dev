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

### Aplicacion para el trabajo practico

* Instrucciones para copilot
 * La generacion de ID tiene que ver con el Alumno
 * Podemos usar variables de clase para almacenar el ultimoid
 * Cada vez que instancio un alumno le asino un nuevo id auto incremental
 * No necesito pasarselo por el constuctor
 * Si se puede consultar con un getter
 * Que el usuario de la clase se desentienda de la generación del ID
 * Fijare en todo el programa donde se crean los alumno que no se le tenga que pasar el id

* Python
```
class Alumno:
    _ultimo_id = 0

    def __init__(
        self,
        nombre: str,
        apellido: str,
        cantidad_cursos: int,
    ) -> None:
        self._id = Alumno._generar_nuevo_id()
        self._nombre = self._validar_nombre(nombre)
        self._apellido = self._validar_apellido(apellido)
        self._cantidad_cursos = self._validar_cantidad_cursos(cantidad_cursos)

    @classmethod
    def _generar_nuevo_id(cls) -> int:
        cls._ultimo_id += 1
        return cls._ultimo_id

    @classmethod
    def obtener_ultimo_id(cls) -> int:
        return cls._ultimo_id

    @property
    def id(self) -> int:
        return self._id

```

---

# System Design

* Son ordenados?
* Se trata un poco de estrategias de como ordenar nuestro codigo
* En la vida no guardaos la remera y la ropa interior en el mismo caajon
  * Pero en programacion solemos meter todo tipo de cosas distintas en el mismo archivo

> [!NOTE]
> De la misma manera que separas remeras y ropa interior en cajones distinto. Separa incumbencias istintas en archivos distintos

* Incumbecias
  * Interfaz Grafica ----> Remera
  * Logica ----> Ropa interior
    * Se le suele llamar en algunos casos nuestra capa de servicios...

 

```
En este archivo tengo mexclada cosas que tiene que ver con la logica (quiero una capa de servicios) y la interfaz grafica. Quiero que me la separes en dos archivos.  Uno que sea solo lo de tkinter e interfaz grafica y ottro que sea una capa de servicios que grabe en el array db
```

* Me genero esta clase

```
from alumno import Alumno


class ServicioAlumnos:
    def __init__(self) -> None:
        self._db = [Alumno("Esteban", "Calabria", 3)]

    def listar(self) -> list[Alumno]:
        return self._db

    def obtener_por_indice(self, indice: int) -> Alumno:
        return self._db[indice]

    def agregar(self, nombre: str, apellido: str, cursos: int) -> Alumno:
        nuevo = Alumno(nombre, apellido, cursos)
        self._db.append(nuevo)
        return nuevo

    def eliminar_por_indice(self, indice: int) -> Alumno:
        return self._db.pop(indice)

    def modificar_por_indice(self, indice: int, nombre: str, apellido: str, cursos: int) -> Alumno:
        alumno = self._db[indice]
        alumno.actualizar_datos(nombre, apellido, cursos)
        return alumno
```

* Mejoramos un poco tambien el frontend

```
Veo que el servicio_alumnos lo hicimos como clase, pero proyecto-itegrador.py tiene metodos sueltos. Para unificar me gustaria que se use clase para todo
```

* Ahora mi programa principal me queda

```
import tkinter as tk
from tkinter import messagebox
from servicio_alumnos import ServicioAlumnos

class AppGestionAlumnos:
    def __init__(self) -> None:
        self._servicio = ServicioAlumnos()

        self._ventana = tk.Tk()
        self._ventana.title("Gestión de Alumnos")
        self._ventana.geometry("500x400")

        self._entry_nombre: tk.Entry
        self._entry_apellido: tk.Entry
        self._entry_cursos: tk.Entry
        self._lista: tk.Listbox

        self._crear_ui()
        self._actualizar_lista()

    def ejecutar(self) -> None:
        self._ventana.mainloop()

    def _crear_ui(self) -> None:
        tk.Label(self._ventana, text="Nombre").pack()
        self._entry_nombre = tk.Entry(self._ventana)
        self._entry_nombre.pack()

        tk.Label(self._ventana, text="Apellido").pack()
        self._entry_apellido = tk.Entry(self._ventana)
        self._entry_apellido.pack()

        tk.Label(self._ventana, text="Cursos").pack()
        self._entry_cursos = tk.Entry(self._ventana)
        self._entry_cursos.pack()

        tk.Button(self._ventana, text="Agregar", command=self._agregar_alumno).pack(pady=5)
        tk.Button(self._ventana, text="Modificar", command=self._modificar_alumno).pack(pady=5)
        tk.Button(self._ventana, text="Eliminar", command=self._eliminar_alumno).pack(pady=5)

        self._lista = tk.Listbox(self._ventana)
        self._lista.pack(fill=tk.BOTH, expand=True)
        self._lista.bind("<<ListboxSelect>>", self._cargar_seleccion)

    def _actualizar_lista(self) -> None:
        self._lista.delete(0, tk.END)
        for alumno in self._servicio.listar():
            self._lista.insert(tk.END, str(alumno))

    def _agregar_alumno(self) -> None:
        try:
            nombre = self._entry_nombre.get().strip()
            apellido = self._entry_apellido.get().strip()
            cursos = int(self._entry_cursos.get())

            self._servicio.agregar(nombre, apellido, cursos)
            self._actualizar_lista()
            self._limpiar_campos()
        except Exception as error:
            messagebox.showerror("Error", f"Datos inválidos: {error}")

    def _eliminar_alumno(self) -> None:
        seleccionado = self._lista.curselection()
        if not seleccionado:
            return

        indice = seleccionado[0]
        self._servicio.eliminar_por_indice(indice)
        self._actualizar_lista()
        self._limpiar_campos()

    def _cargar_seleccion(self, _event: tk.Event) -> None:
        seleccionado = self._lista.curselection()
        if not seleccionado:
            return

        alumno = self._servicio.obtener_por_indice(seleccionado[0])

        self._entry_nombre.delete(0, tk.END)
        self._entry_nombre.insert(0, alumno.nombre)

        self._entry_apellido.delete(0, tk.END)
        self._entry_apellido.insert(0, alumno.apellido)

        self._entry_cursos.delete(0, tk.END)
        self._entry_cursos.insert(0, str(alumno.cantidad_cursos))

    def _modificar_alumno(self) -> None:
        seleccionado = self._lista.curselection()
        if not seleccionado:
            return

        try:
            nombre = self._entry_nombre.get().strip()
            apellido = self._entry_apellido.get().strip()
            cursos = int(self._entry_cursos.get())

            self._servicio.modificar_por_indice(seleccionado[0], nombre, apellido, cursos)
            self._actualizar_lista()
            self._limpiar_campos()
        except Exception:
            messagebox.showerror("Error", "Datos inválidos")

    def _limpiar_campos(self) -> None:
        self._entry_nombre.delete(0, tk.END)
        self._entry_apellido.delete(0, tk.END)
        self._entry_cursos.delete(0, tk.END)


if __name__ == "__main__":
    app = AppGestionAlumnos()
    app.ejecutar()
```

## Division en capas

* En general los sistemas esta bastante estandarizado divirlo en estos cajones
  * Frontend
      * Interfaz Grafica / Controladores en el mundo WEB
  * Servicios
     * Creacion de los objetos
     * Validaciones que no estan en el modelo
     * Aspectos de Sistema como logging, telemetria
     * Llamada a servicios externos
     * Aca expreamos nuestro sistema sin intefaz grafica
     * Una descripcion de los "servicios" o funcionalidades que hacen nuestro sistema independiente de la interfaz grafica
  * Persitencia / Repositorio
       * La que graba en la base de datos o en el disco
  * Modelo
       * Nuestras clases de negocio (Ej : Alumno)
         
* Esta division es casi estandarizada

## Evaluacion del proyecto

* Le pregunto a copilot en modo ask

```
Como esta el proyecto en cuanto a su organizacion y system design? Dame en bullets los puntos que tendria que tener en cuenta para mejorar considerando los principios de la proggramacion orientada a objetos y de system design
```

* Me contesto

```
Ya tengo el diagnóstico: el proyecto está bien encaminado para un CRUD educativo, pero hay varios puntos de diseño que conviene ajustar para volverlo más robusto y escalable. Te comparto ahora una lista priorizada con foco en POO y system design.

Estado actual

La separación base está bien: entidad en alumno.py, lógica de negocio básica en servicio_alumnos.py, y UI en proyecto-integrador.py.
La clase de dominio tiene validaciones e invariantes (nombre, apellido, cursos), lo cual es un buen inicio de POO disciplinada.
Para un ejercicio de clase funciona, pero para crecer hay acoplamientos fuertes entre UI, servicio y almacenamiento.
Puntos a mejorar (POO + System Design)

Separar responsabilidades con más claridad:

proyecto-integrador.py hoy mezcla presentación, parsing de datos, manejo de errores y parte de reglas.
Ideal: UI solo captura/muestra; aplicación/servicio orquesta; dominio valida reglas.
Evitar exponer estado interno:

servicio_alumnos.py devuelve la lista interna directamente en listar.
Eso rompe encapsulamiento porque cualquier consumidor podría mutarla sin pasar por reglas.
Dejar de depender de índices como identidad:

CRUD por índice es frágil (si cambia orden de lista, cambia la “identidad”).
Mejor operar por id de alumno (estable), no por posición visual.
Introducir una abstracción de repositorio:

servicio_alumnos.py usa una lista en memoria como “db”.
Para escalar: interfaz repositorio + implementación en memoria/archivo/SQLite sin tocar la UI.
Manejo de errores más específico:

proyecto-integrador.py captura Exception genérico.
Mejor usar excepciones de dominio específicas (ejemplo: AlumnoInvalidoError, AlumnoNoEncontradoError) y mapearlas a mensajes UI.
Inyección de dependencias:

proyecto-integrador.py instancia ServicioAlumnos internamente.
Recibir el servicio por constructor mejora testabilidad y reduce acoplamiento.
Revisión de generación de id:

alumno.py usa contador estático en memoria.
En reinicios se pierde continuidad; en escenarios multi proceso/hilo puede romperse.
Si hay persistencia real, el id debería resolverlo la capa de almacenamiento.
Consistencia en validaciones:

Hoy hay limpieza de strings tanto en UI como en dominio.
Conviene centralizar reglas de negocio en dominio/servicio y dejar UI lo más liviana posible.
Modelo de casos de uso (application layer):

Crear casos como crear_alumno, modificar_alumno, eliminar_alumno, listar_alumnos.
Facilita testeo, logging, y futura exposición por API/web.
Preparar observabilidad básica:

Incorporar logging en servicio para altas, bajas, modificaciones y errores de validación.
Ayuda mucho al diagnóstico cuando crece el sistema.
Mejorar representación del dominio:

alumno.py tiene str/repr simples; repr debería ser más útil para depuración (id y campos clave).

Tests por capas:

Unit tests de entidad Alumno (invariantes y setters).
Unit tests de servicio (casos felices + errores).
Tests de integración mínimos para flujo UI-servicio.
Prioridad sugerida (rápida)

Cambiar operaciones de índice a id.
No devolver la lista mutable directamente.
Reemplazar Exception genérico por errores específicos.
Introducir interfaz de repositorio (aunque sea in-memory al principio).

Agregar tests de dominio y servicio.
Si querés, te puedo proponer una versión objetivo de arquitectura en 4 capas (Presentación, Aplicación, Dominio, Infraestructura) aplicada exactamente a estos 4 archivos y qué mover en cada uno.
```

Proximos Pasos

```
servicio_alumnos.py usa una lista en memoria como “db”.
Para escalar: interfaz repositorio + implementación en memoria/archivo/SQLite sin tocar la UI.
Manejo de errores más específico:
```
