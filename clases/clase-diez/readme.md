# Clase 10 - 8 de Abril del 2026

> Legamos al 25% del curso
> Felicitaciones

# Repaso

* Proyecto Integrador
  * CRUD ABM
* Hasta ahora vimos (segun el alumi)
  * Modulo 1-4 con proyecto Incluido <<< Introduccion a Python
  * Modulo 10 y 12 : Github
  * Modulo 20 y 21 : Python Avanzado
  * Modulo 26 y 27 : IA y Programacion

# Proceso de Desarrollo de Software

* Quiero construir una casa
 * Ver lo que quiero           << Reunion con el arquitecto, 
 * Hacer el plano de la casa   << El arquitecto
 * Construccion
     * Cimientos
     * Contratar gente y compra de material    << PM
     * Construccion en si
     * Instalacion Electica, agua
 * Probar que ande todo bien
 * Me voy a vivir a la casa

## Modelo de Refeencia en Cascada

* Planificacion (Administracion del proyecto PM)
   * Tiempos
   * Costos
   * Comunicacion

* Reuerimientos (Definicion de producto y alcance)
   * Diseño / Arquitectura / System Design
     * Desarrollo / Programacion
        * QA / Testing
          * Deployment

* El que hace el disenio es una persona mas senior que tiene experiencie en varios proyecto
   * Esta como habilitado a reveer el codigo sugerir mejoras sin programarlo el 

## Como es esto en tiempo de IA

* Reuerimientos (Definicion de producto y alcance)
   * Diseño / Arquitectura / System Design
     * Desarrollo / Programacion   <<< ESTO ABSORVE MUCHO LA IA
        * QA / Testing
          * Deployment

* Rol del programador
  * Generar codigo -----------> A ser mas diseniador y orquestador de la ia

* Diseño / Arquitectura / System Design <<<<<< Es mucho mas importante hoy en los tiempos de IA

* Camino tradicional
   * Aprender a programar (if/while./logica) ----------->  Diseniar sistemas
* Camino Actual
   * Aprender como estan construidos los sistemas --------------> Darle instrucciones a la IA para que programe
   * (LA IA permite abarcar el system design de forma mas temprana)

## Buenas practicas a la hora de programar

* Clean Code
  * https://www.instagram.com/p/C745gVWR8MV/?img_index=1
* Hay que mirar todo el tiempo lo que hace la Ia y corregirlo

## Panorama HOY

* (Mucho codigo generado por IA) ---> (Nadie entiende ese codigo) ---> (deuda cognitiva)

* Panorama deseable
 * (Disenio de sistena) --> (Mucho codigo generado por IA dentro de mis parametros) --> (sistemas que puedo mantener)

# Debate Alumnos

<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/18286473-ae40-4783-a981-129c274f0e01" />


# OOP (Object Oriented Programming)

## Evolucion Historica

* (Programba como podia (codigo espaggueti)
     * (sistema fueron creciendo) ---> (sistemas inmantenibles)
        * Programacion estructurada
           * (sistema siguieron creciendo) ---> (sistemas costos de mantener) ---> (se empezo a hablar de system design)
              * Programacion orientada a objetos
                 * ----> (sistemas mas mantenibles)

## Fundamentos de la OOP

* LA OOP nacio en el area de la SIMULACION
* Permite tomar conceptos de la vida real y represertarlos como tipos de datos (clases) de nuesto sistemas
  * Atributos
  * Comportamiento
* La programacion orientada a objetos tiene buenas practicas (mucha teoria)
   * El problema es que no siempre los lenguajes de programacion te obligan a aplicarlas
   * Esta en uno reconocerlas y aplicarlas
* Buenas Practicas
   * Las cuestiones logicas que tiene que ver con el tipo de dato deberian estar programadas dentro del tipo de dato para que nuestro codigo quede mas cohesivo (agrupar todo lo que tiene que ver con lo mismo) y evitar eventualmente codigo duplicado
               
# Vamos a analizar el proyecto de la clase pasada

```python
import tkinter as tk
from tkinter import messagebox

# Base de datos en memoria
db = [
    {
        "id": 1,
        "nombre": "Esteban",
        "apellido": "Calabria",
        "cantidad_cursos": 3
    }
]

# ---------- FUNCIONES ----------
def generar_id():
    return max(alumno["id"] for alumno in db) + 1 if db else 1

def actualizar_lista():
    lista.delete(0, tk.END)
    for alumno in db:
        texto = f"{alumno['id']} - {alumno['nombre']} {alumno['apellido']} ({alumno['cantidad_cursos']} cursos)"
        lista.insert(tk.END, texto)

def agregar_alumno():
    try:
        nombre = entry_nombre.get().strip()
        apellido = entry_apellido.get().strip()
        cursos = int(entry_cursos.get())

        if not nombre or not apellido:
            raise ValueError

        nuevo = {
            "id": generar_id(),
            "nombre": nombre,
            "apellido": apellido,
            "cantidad_cursos": cursos
        }

        db.append(nuevo)
        actualizar_lista()
        limpiar_campos()

    except:
        messagebox.showerror("Error", "Datos inválidos")

def eliminar_alumno():
    seleccionado = lista.curselection()
    if not seleccionado:
        return

    index = seleccionado[0]
    db.pop(index)
    actualizar_lista()

def cargar_seleccion():
    seleccionado = lista.curselection()
    if not seleccionado:
        return

    alumno = db[seleccionado[0]]

    entry_nombre.delete(0, tk.END)
    entry_nombre.insert(0, alumno["nombre"])

    entry_apellido.delete(0, tk.END)
    entry_apellido.insert(0, alumno["apellido"])

    entry_cursos.delete(0, tk.END)
    entry_cursos.insert(0, alumno["cantidad_cursos"])

def modificar_alumno():
    seleccionado = lista.curselection()
    if not seleccionado:
        return

    try:
        alumno = db[seleccionado[0]]

        alumno["nombre"] = entry_nombre.get()
        alumno["apellido"] = entry_apellido.get()
        alumno["cantidad_cursos"] = int(entry_cursos.get())

        actualizar_lista()
        limpiar_campos()

    except:
        messagebox.showerror("Error", "Datos inválidos")

def limpiar_campos():
    entry_nombre.delete(0, tk.END)
    entry_apellido.delete(0, tk.END)
    entry_cursos.delete(0, tk.END)

# ---------- UI ----------
ventana = tk.Tk()
ventana.title("Gestión de Alumnos")
ventana.geometry("500x400")

# Inputs
tk.Label(ventana, text="Nombre").pack()
entry_nombre = tk.Entry(ventana)
entry_nombre.pack()

tk.Label(ventana, text="Apellido").pack()
entry_apellido = tk.Entry(ventana)
entry_apellido.pack()

tk.Label(ventana, text="Cursos").pack()
entry_cursos = tk.Entry(ventana)
entry_cursos.pack()

# Botones
tk.Button(ventana, text="Agregar", command=agregar_alumno).pack(pady=5)
tk.Button(ventana, text="Modificar", command=modificar_alumno).pack(pady=5)
tk.Button(ventana, text="Eliminar", command=eliminar_alumno).pack(pady=5)

# Lista
lista = tk.Listbox(ventana)
lista.pack(fill=tk.BOTH, expand=True)

lista.bind("<<ListboxSelect>>", lambda e: cargar_seleccion())

# Inicializar
actualizar_lista()

ventana.mainloop()
```

## Observaciones

* Los nombres de los campos estan "hardcodeados" : alumno['nombre']
* Que pasa si tengo esto (suponiendo que la ia se pone creativa y me cambia el nombre de los campos): 
```
db = [
    {
        "id": 1,
        "nombre": "Esteban",
        "apellido": "Calabria",
        "cantidad_cursos": 3
    },
    {
        "id": 1,
        "name": "Esteban",
        "surname": "Calabria",
        "cantidad_cursos": 3
    }
]

```

> [!NOTE]
> Me pasa mucho que la IA itera sobre codigo que existe, se pone creativa y cambia el nombre de los campos

 * Estaria bueno representar el concepto de negocios (Alumno) como un tipo de datos.

## Mejora

* Vamos a representar cada diccionario como un objeto alumno.
* Para ello vamos a crear la clase/tipo de dato Alumno
* Cada elemento de la lista va a llamarse instancia de la clase y objeto
* El tipo de datos va a validar que tenga solamente los atributos que quiero
* Le pedi a la IA esto:

```
Tengo este diccionario en python "    {
        "id": 1,
        "nombre": "Esteban",
        "apellido": "Calabria",
        "cantidad_cursos": 3
    }" quiero represetnarlo con una clase Alumno. 


```

* Me genero

```

# Definición de la clase Alumno
class Alumno:
    def __init__(self, id, nombre, apellido, cantidad_cursos):
        self.id = id
        self.nombre = nombre
        self.apellido = apellido
        self.cantidad_cursos = cantidad_cursos

    def __str__(self):
        return f"Alumno({self.id}): {self.nombre} {self.apellido}, Cursos: {self.cantidad_cursos}"

```

> [!NOTE]
> En python existen metodos que empiezan y terminan con __ como __init__
> Estos metodos se conocen como metodos especiales y tienen un significado especial en python

* El metodo __init__ es el constructor donde en python defino los atributos del objeto
* Si yo le digo a la IA que utilice la clase alumno no me va inventar valores nuevos
* No voy a tener valores harcodeados
   * Antes alumno["nombre"] ahora alumno.nombre

* Ahora le pido al Github Copilot o cursor esto
```
Quiero usar la clase @file:alumno.py y reemplazar el diccionario por el uso de sa clase. 
```
* Quedo asi :

```python
import tkinter as tk
from tkinter import messagebox
from alumno import Alumno

# Base de datos en memoria
db = [
    Alumno(1, "Esteban", "Calabria", 3)
]

# ---------- FUNCIONES ----------
def generar_id():
    return max(alumno.id for alumno in db) + 1 if db else 1

def actualizar_lista():
    lista.delete(0, tk.END)
    for alumno in db:
        texto = f"{alumno.id} - {alumno.nombre} {alumno.apellido} ({alumno.cantidad_cursos} cursos)"
        lista.insert(tk.END, texto)

def agregar_alumno():
    try:
        nombre = entry_nombre.get().strip()
        apellido = entry_apellido.get().strip()
        cursos = int(entry_cursos.get())

        if not nombre or not apellido:
            raise ValueError

        nuevo = Alumno(generar_id(), nombre, apellido, cursos)

        db.append(nuevo)
        actualizar_lista()
        limpiar_campos()

    except:
        messagebox.showerror("Error", "Datos inválidos")

def eliminar_alumno():
    seleccionado = lista.curselection()
    if not seleccionado:
        return

    index = seleccionado[0]
    db.pop(index)
    actualizar_lista()

def cargar_seleccion():
    seleccionado = lista.curselection()
    if not seleccionado:
        return

    alumno = db[seleccionado[0]]

    entry_nombre.delete(0, tk.END)
    entry_nombre.insert(0, alumno.nombre)

    entry_apellido.delete(0, tk.END)
    entry_apellido.insert(0, alumno.apellido)

    entry_cursos.delete(0, tk.END)
    entry_cursos.insert(0, str(alumno.cantidad_cursos))

def modificar_alumno():
    seleccionado = lista.curselection()
    if not seleccionado:
        return

    try:
        alumno = db[seleccionado[0]]

        alumno.nombre = entry_nombre.get().strip()
        alumno.apellido = entry_apellido.get().strip()
        alumno.cantidad_cursos = int(entry_cursos.get())

        actualizar_lista()
        limpiar_campos()

    except:
        messagebox.showerror("Error", "Datos inválidos")

def limpiar_campos():
    entry_nombre.delete(0, tk.END)
    entry_apellido.delete(0, tk.END)
    entry_cursos.delete(0, tk.END)

# ---------- UI ----------
ventana = tk.Tk()
ventana.title("Gestión de Alumnos")
ventana.geometry("500x400")

# Inputs
tk.Label(ventana, text="Nombre").pack()
entry_nombre = tk.Entry(ventana)
entry_nombre.pack()

tk.Label(ventana, text="Apellido").pack()
entry_apellido = tk.Entry(ventana)
entry_apellido.pack()

tk.Label(ventana, text="Cursos").pack()
entry_cursos = tk.Entry(ventana)
entry_cursos.pack()

# Botones
tk.Button(ventana, text="Agregar", command=agregar_alumno).pack(pady=5)
tk.Button(ventana, text="Modificar", command=modificar_alumno).pack(pady=5)
tk.Button(ventana, text="Eliminar", command=eliminar_alumno).pack(pady=5)

# Lista
lista = tk.Listbox(ventana)
lista.pack(fill=tk.BOTH, expand=True)

lista.bind("<<ListboxSelect>>", lambda e: cargar_seleccion())

# Inicializar
actualizar_lista()

ventana.mainloop()
```

## Segunda Tanda de observaciones

* Me ayude con la IA para ver que buenas practicas me sugiere aplicar
   * https://chatgpt.com/share/69d6ec67-22f4-83e9-8bfc-662b9a68bbc5
* Observaciones
   * Las validaciones tienen que ver con el alumno y estan afuera
   * La generacio de ids incrementales tienen que ver con el alumno y estan afuera
   * El metodo actualiar lista no usa el __str__ que generamos
       * texto = f"{alumno.id} - {alumno.nombre} {alumno.apellido} ({alumno.cantidad_cursos} cursos)"

* Le puse a la IA este prompt

```
Modificar tambien la clase @sym:Alumno para que: * Observaciones

Las validaciones tienen que ver con el alumno y estan afuera
La generacio de ids incrementales tienen que ver con el alumno y estan afuera
El metodo actualiar lista no usa el str que generamos
texto = f"{alumno.id} - {alumno.nombre} {alumno.apellido} ({alumno.cantidad_cursos} cursos)"
```

* Y Luego

```
```

* Y me quedo este codigo

```python

# Definición de la clase Alumno
class Alumno:
    _ultimo_id = 0

    def __init__(self, id, nombre, apellido, cantidad_cursos):
        self.validar_datos(nombre, apellido, cantidad_cursos)

        self.id = id
        self.nombre = nombre.strip()
        self.apellido = apellido.strip()
        self.cantidad_cursos = cantidad_cursos

        if id > Alumno._ultimo_id:
            Alumno._ultimo_id = id

    @classmethod
    def generar_id(cls):
        cls._ultimo_id += 1
        return cls._ultimo_id

    @staticmethod
    def validar_datos(nombre, apellido, cantidad_cursos):
        if not nombre or not nombre.strip():
            raise ValueError("El nombre no puede estar vacío")

        if not apellido or not apellido.strip():
            raise ValueError("El apellido no puede estar vacío")

        if not isinstance(cantidad_cursos, int):
            raise ValueError("La cantidad de cursos debe ser un número entero")

        if cantidad_cursos < 0:
            raise ValueError("La cantidad de cursos no puede ser negativa")

    def actualizar_datos(self, nombre, apellido, cantidad_cursos):
        self.validar_datos(nombre, apellido, cantidad_cursos)
        self.nombre = nombre.strip()
        self.apellido = apellido.strip()
        self.cantidad_cursos = cantidad_cursos

    def __str__(self):
        return f"Alumno({self.id}): {self.nombre} {self.apellido}, Cursos: {self.cantidad_cursos}"
```

* Programa principal

```python
import tkinter as tk
from tkinter import messagebox
from alumno import Alumno

# Base de datos en memoria
db = [
    Alumno(1, "Esteban", "Calabria", 3)
]

# ---------- FUNCIONES ----------
def actualizar_lista():
    lista.delete(0, tk.END)
    for alumno in db:
        lista.insert(tk.END, str(alumno))

def agregar_alumno():
    try:
        nombre = entry_nombre.get().strip()
        apellido = entry_apellido.get().strip()
        cursos = int(entry_cursos.get())

        nuevo = Alumno(Alumno.generar_id(), nombre, apellido, cursos)

        db.append(nuevo)
        actualizar_lista()
        limpiar_campos()

    except:
        messagebox.showerror("Error", "Datos inválidos")

def eliminar_alumno():
    seleccionado = lista.curselection()
    if not seleccionado:
        return

    index = seleccionado[0]
    db.pop(index)
    actualizar_lista()

def cargar_seleccion():
    seleccionado = lista.curselection()
    if not seleccionado:
        return

    alumno = db[seleccionado[0]]

    entry_nombre.delete(0, tk.END)
    entry_nombre.insert(0, alumno.nombre)

    entry_apellido.delete(0, tk.END)
    entry_apellido.insert(0, alumno.apellido)

    entry_cursos.delete(0, tk.END)
    entry_cursos.insert(0, str(alumno.cantidad_cursos))

def modificar_alumno():
    seleccionado = lista.curselection()
    if not seleccionado:
        return

    try:
        alumno = db[seleccionado[0]]

        nombre = entry_nombre.get().strip()
        apellido = entry_apellido.get().strip()
        cursos = int(entry_cursos.get())

        alumno.actualizar_datos(nombre, apellido, cursos)

        actualizar_lista()
        limpiar_campos()

    except:
        messagebox.showerror("Error", "Datos inválidos")

def limpiar_campos():
    entry_nombre.delete(0, tk.END)
    entry_apellido.delete(0, tk.END)
    entry_cursos.delete(0, tk.END)

# ---------- UI ----------
ventana = tk.Tk()
ventana.title("Gestión de Alumnos")
ventana.geometry("500x400")

# Inputs
tk.Label(ventana, text="Nombre").pack()
entry_nombre = tk.Entry(ventana)
entry_nombre.pack()

tk.Label(ventana, text="Apellido").pack()
entry_apellido = tk.Entry(ventana)
entry_apellido.pack()

tk.Label(ventana, text="Cursos").pack()
entry_cursos = tk.Entry(ventana)
entry_cursos.pack()

# Botones
tk.Button(ventana, text="Agregar", command=agregar_alumno).pack(pady=5)
tk.Button(ventana, text="Modificar", command=modificar_alumno).pack(pady=5)
tk.Button(ventana, text="Eliminar", command=eliminar_alumno).pack(pady=5)

# Lista
lista = tk.Listbox(ventana)
lista.pack(fill=tk.BOTH, expand=True)

lista.bind("<<ListboxSelect>>", lambda e: cargar_seleccion())

# Inicializar
actualizar_lista()

ventana.mainloop()
```

* Este proyecto tiene muchas cuestiones para mejorar
* Que le mejorarian ustedes
   * Julian : Le podriamos comentar que hace cada funcion
* Que cosas todavia no entiendo y no me queda tan claro
   * Que es  @classmethod? ???
   * Que es  @staticmethod ???
   * Porque todos los metodos reciben self? Que es self?

> [!NOTE]
> Para la proxima clase van a tomar estos temas que no se entienden todavia y con la ayuda de la IA van a tratar de entenderlos. Si me quedo en cosas que hace la ia que no entiendo termino con ... deuda cognitiva

# IDEs con IA

 * Con @ le puedo decir a cursor que se fije en una clase particular


# Temas para seguir avanzando....

* Setters y Getters
* Metodos de clase vs metodos de Instancia
