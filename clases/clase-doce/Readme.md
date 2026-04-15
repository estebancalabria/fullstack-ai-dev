# Clase Doce - 15 de Abril del 2026

# Repaso

* Programacion Orientada a objetos
  * Pensamos en sistemas grandes <<< 
  * Lenguajes de Programacion
      * Hay lenguajes que se construyeton alrededor de POO : Java, C#
      * Hay lenguajes como python que son mas laxos
  * Conceptos
    * Consistencia
        * Ejemplo de consistencia que no de POO : "Un documento de excel donde no se respera los tips de datos, esta incompleto, hay datos que estan mal, a veces la fechas se pone dd/mm/aaaa y a veces aaaa/mm/ddd"
    * Encapsulamiento
        * Ocultar/Proteger los atributos objetos de modo que no de puedan moificar arbitrariamente de afuera
          y que me quede un objeto inconsistente
          *  Niveles de visibilidad (para ocultor los atriburos)
          *  Setters para que controlar los cambios y mantener la consistencia
          *  Getters para mostrar la informacion al mundo de la manera que quiera
  *  UML
    *  Para representar visualmente mis clases
    *  Mermaid


# Novedadess

* Como Educar a Claude Code
  * https://freedium-mirror.cfd/https://medium.com/@ashleyha/i-mastered-the-claude-code-workflow-145d25e502cf
  * Atentos a este DATAZO. Para ver post de Medium sin pagar
    * https://freedium-mirror.cfd/
    * https://medium.com/tag/artificial-intelligence

> [!NOTE]
> GRACIAS JULIAN!

# Poo y lenguajes de programacion

* Como python "pelador" no es lo optimo para aprender POO empezo a aparecer el concepto de
    * "Python Disciplinado"
    * Que es una forma de programar en python mas alineada con la POO

```
El término “Python disciplinado” no es un concepto oficial del lenguaje, sino una forma de referirse al uso de Python siguiendo buenas prácticas de desarrollo, con el objetivo de escribir código más claro, mantenible, escalable y robusto.

📌 ¿Por qué se habla de “disciplinado”?

Python es un lenguaje muy flexible y dinámico, lo que permite programar de manera rápida, pero también puede llevar a código desordenado si no se siguen ciertas reglas. Por eso, se habla de “disciplina” al aplicar estándares y metodologías que mejoran la calidad del software.
```

# Proyecto Itegrador (Continuacion)

* Continuar lo que habiamos hecho en el proyecto integrador pero indorporando lo que aprendemos de la POO

```
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

* Observo que tengo la clase Alumno y la voy a generar con copilo

## Educar la IA en programacion

* Le digo a la IA este prompt con ctrl+i

```
Desarrollame la clase Alumno con id, nombre, apellido, cantidad_cursos)
```

* Me hace esto

```python
class Alumno:
    def __init__(self, id, nombre, apellido, cantidad_cursos):
        self.id = id
        self.nombre = nombre
        self.apellido = apellido
        self.cantidad_cursos = cantidad_cursos
    
    def __repr__(self):
        return f"Alumno(id={self.id}, nombre='{self.nombre}', apellido='{self.apellido}', cantidad_cursos={self.cantidad_cursos})"
```

* Y no es lo que quiero porque no veo reflejado las cosas de la POO que fui aprendiendo (Consistencia, setters)
* Le voy a escribir en el agente lo siguiente

```
El codigo que generas no me gusta. No respera las buenas practicas que yo sigo a la hora de programar.  Me gustaria armar un archivo de instrucciones en donde yo pueda especificar como es el codigo de las nuevas clases que genero
```

* Me pide las reglas (como las Skills de claude)

```
* Cuando generes clases quiero que respetes las buenas practicas de programacion orientada a objetos y "pythn disciplinados"
* Quuiero que mis clases tengan mecanismos de encapsulamiento para proteger los atributos y validar la consistencia de los objetos todo el tiempo
* El constructor de la clase solo debe pemitir crear objetos consistentes y validos
* Cuando no sepas las reglas de negocio concretas podes preguntar o asumir las mas logicas. Las preguntas siempre de tipo si o no, de a una , todas las que quieras
* Debe respetar encapsulamiento, consistencia, buenas practicas de la POO
```

* Me agrego un archivo.github\instructions\python-classes.instructions.md

```
---
applyTo: "**/*.py"
description: "Usar cuando se creen o modifiquen clases Python. Aplicar POO disciplinada, encapsulamiento, validacion de invariantes, constructores que solo creen objetos consistentes y preguntas de negocio cerradas si faltan reglas."
---

# Estilo para clases Python

Cuando generes o refactorices clases Python en este proyecto, segui estas reglas:

- Aplicar buenas practicas de programacion orientada a objetos y un estilo de Python disciplinado.
- Toda clase debe proteger su estado interno. No expongas atributos mutables de forma publica salvo que haya un motivo explicito.
- Definir niveles de visibilidad de forma explicita: usar atributos internos con guion bajo (`_atributo`) y evitar atributos publicos mutables.
- Los objetos deben nacer validos. El constructor debe aceptar solo datos que permitan crear una instancia consistente.
- Validar entradas en el constructor y en toda operacion publica que pueda romper invariantes.
- Si un dato no es valido para el dominio, fallar temprano con una excepcion clara (`ValueError`, `TypeError` o una excepcion de dominio si ya existe).
- Mantener encapsulamiento obligatorio. Toda clase debe exponer getters para los atributos encapsulados mediante `@property`.
- Si un atributo puede cambiar despues de crear el objeto, debe existir setter (`@atributo.setter`) con validacion obligatoria.
- Si un atributo no debe cambiar, definir solo getter y bloquear su modificacion por API publica.
- No usar setters que permitan estados intermedios invalidos. Toda modificacion publica debe dejar el objeto consistente al terminar.
- Si la clase tiene reglas de consistencia complejas, extraer validaciones a metodos privados con nombres claros.
- Evitar clases anemicas o contenedores triviales de datos cuando el objeto deba proteger invariantes o tener comportamiento propio.
- No usar `dataclass` para entidades con invariantes importantes o encapsulamiento fuerte, salvo pedido explicito.
- Usar nombres claros, type hints y metodos pequenos con una unica responsabilidad.
- Evitar logica duplicada entre constructor, propiedades y metodos mutadores. Centralizar validaciones reutilizables.
- No agregar comentarios redundantes. El codigo debe ser legible por estructura y nombres.

# Criterios de diseno

- Cada metodo publico debe preservar la consistencia del objeto.
- No dejar objetos parcialmente inicializados.
- Si hay colecciones internas mutables, no devolver referencias mutables directas salvo que sea intencional; preferir copias o vistas inmutables.
- Las decisiones de modelado deben priorizar claridad del dominio antes que conveniencia superficial.

# Cuando falten reglas de negocio

- Si faltan reglas de negocio concretas, hacer preguntas cerradas, de si o no, de a una.
- Si no conviene frenar el trabajo, asumir la regla mas logica y conservadora, e indicar la suposicion de forma breve.

# Resultado esperado

Al crear una clase nueva, el resultado debe mostrar:

- Encapsulamiento real.
- Validacion explicita.
- Invariantes protegidas.
- Constructor seguro.
- API publica pequena y coherente.

# Reglas obligatorias (sin excepcion)

- Si una clase nueva no incluye encapsulamiento, getters, validaciones y visibilidad explicita, el resultado es incorrecto.
- No dejar atributos de dominio como publicos mutables.
- No aceptar setters sin validacion.
```

* Ahora si me genero algo mas lindo

```python
class Alumno:
    def __init__(
        self,
        alumno_id: int,
        nombre: str,
        apellido: str,
        cantidad_cursos: int,
    ) -> None:
        self._id = self._validar_id(alumno_id)
        self._nombre = self._validar_nombre(nombre)
        self._apellido = self._validar_apellido(apellido)
        self._cantidad_cursos = self._validar_cantidad_cursos(cantidad_cursos)

    @property
    def id(self) -> int:
        return self._id

    @property
    def nombre(self) -> str:
        return self._nombre

    @nombre.setter
    def nombre(self, nuevo_nombre: str) -> None:
        self._nombre = self._validar_nombre(nuevo_nombre)

    @property
    def apellido(self) -> str:
        return self._apellido

    @apellido.setter
    def apellido(self, nuevo_apellido: str) -> None:
        self._apellido = self._validar_apellido(nuevo_apellido)

    @property
    def cantidad_cursos(self) -> int:
        return self._cantidad_cursos

    @cantidad_cursos.setter
    def cantidad_cursos(self, nueva_cantidad: int) -> None:
        self._cantidad_cursos = self._validar_cantidad_cursos(nueva_cantidad)

    def incrementar_cursos(self, cantidad: int = 1) -> None:
        if not isinstance(cantidad, int):
            raise TypeError("La cantidad a incrementar debe ser un entero.")
        if cantidad <= 0:
            raise ValueError("La cantidad a incrementar debe ser mayor a cero.")
        self._cantidad_cursos += cantidad

    def _validar_id(self, alumno_id: int) -> int:
        if not isinstance(alumno_id, int):
            raise TypeError("El id debe ser un entero.")
        if alumno_id <= 0:
            raise ValueError("El id debe ser mayor a cero.")
        return alumno_id

    def _validar_nombre(self, nombre: str) -> str:
        if not isinstance(nombre, str):
            raise TypeError("El nombre debe ser un texto.")
        nombre_limpio = nombre.strip()
        if not nombre_limpio:
            raise ValueError("El nombre no puede estar vacio.")
        return nombre_limpio

    def _validar_apellido(self, apellido: str) -> str:
        if not isinstance(apellido, str):
            raise TypeError("El apellido debe ser un texto.")
        apellido_limpio = apellido.strip()
        if not apellido_limpio:
            raise ValueError("El apellido no puede estar vacio.")
        return apellido_limpio

    def _validar_cantidad_cursos(self, cantidad_cursos: int) -> int:
        if not isinstance(cantidad_cursos, int):
            raise TypeError("La cantidad de cursos debe ser un entero.")
        if cantidad_cursos < 0:
            raise ValueError("La cantidad de cursos no puede ser negativa.")
        return cantidad_cursos

```
## Incoporar a Proyecto Integrador

