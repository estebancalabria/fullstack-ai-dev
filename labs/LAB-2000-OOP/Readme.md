# 🧪 Laboratorio: Gestión de Alumnos con Objetos en Python

## Objetivo

Aprender a transformar un programa que maneja **diccionarios** en uno que usa **clases y objetos**, mejorando la escalabilidad, legibilidad y mantenimiento del código.

Al final del laboratorio, vas a:

* Definir una clase `Alumno`.
* Crear una lista de objetos `Alumno`.
* Modificar las funciones de la interfaz gráfica (Tkinter) para trabajar con objetos.
* Reflexionar sobre las ventajas de la programación orientada a objetos (OOP).

---

## 🔹 Paso 1: Analizando el código existente

Actualmente tenemos una “base de datos” en memoria como lista de diccionarios:

```python
db = [
    {"id": 1, "nombre": "Esteban", "apellido": "Calabria", "cantidad_cursos": 3}
]
```

Cada función (`agregar_alumno`, `modificar_alumno`, `eliminar_alumno`) manipula estos diccionarios directamente.

**Preguntas de reflexión:**

1. ¿Qué pasa si quiero agregar más información del alumno, como email o promedio?
2. ¿Qué sucede si necesito agregar métodos relacionados con el alumno, como `cumplir_curso()`?
3. ¿Es fácil reutilizar o extender este código?

---

## 🔹 Paso 2: Definiendo la clase `Alumno`

Creamos una clase que encapsula los datos y comportamientos del alumno:

```python
class Alumno:
    def __init__(self, nombre, apellido, cantidad_cursos):
        self.nombre = nombre
        self.apellido = apellido
        self.cantidad_cursos = cantidad_cursos

    def __str__(self):
        return f"{self.nombre} {self.apellido} ({self.cantidad_cursos} cursos)"

    def cumplir_curso(self):
        self.cantidad_cursos += 1
```

**Reflexión:**

* Ahora un `Alumno` sabe cómo representarse y cómo actualizar su estado.
* Encapsulamos los datos y la lógica relacionada en un solo lugar.

---

## 🔹 Paso 3: Actualizando la “base de datos”

En lugar de diccionarios:

```python
db = [
    Alumno("Esteban", "Calabria", 3)
]
```

---

## 🔹 Paso 4: Adaptando funciones de Tkinter

**Actualizar la lista de alumnos:**

```python
def actualizar_lista():
    lista.delete(0, tk.END)
    for alumno in db:
        lista.insert(tk.END, str(alumno))
```

**Agregar un alumno:**

```python
def agregar_alumno():
    nombre = entry_nombre.get().strip()
    apellido = entry_apellido.get().strip()
    try:
        cursos = int(entry_cursos.get())
        if not nombre or not apellido:
            raise ValueError
        nuevo = Alumno(nombre, apellido, cursos)
        db.append(nuevo)
        actualizar_lista()
        limpiar_campos()
    except:
        messagebox.showerror("Error", "Datos inválidos")
```

**Modificar alumno seleccionado:**

```python
def modificar_alumno():
    seleccionado = lista.curselection()
    if not seleccionado:
        return
    try:
        alumno = db[seleccionado[0]]
        alumno.nombre = entry_nombre.get()
        alumno.apellido = entry_apellido.get()
        alumno.cantidad_cursos = int(entry_cursos.get())
        actualizar_lista()
        limpiar_campos()
    except:
        messagebox.showerror("Error", "Datos inválidos")
```

**Eliminar alumno:**

```python
def eliminar_alumno():
    seleccionado = lista.curselection()
    if seleccionado:
        db.pop(seleccionado[0])
        actualizar_lista()
```

**Cargar alumno en los campos:**

```python
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
    entry_cursos.insert(0, alumno.cantidad_cursos)
```

---

## 🔹 Paso 5: Mantener la interfaz gráfica

La UI (Tkinter) **no necesita cambios grandes**, solo interactúa con objetos en lugar de diccionarios:

```python
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

---

## 🔹 Paso 6: Reflexión final

**Beneficios de usar Objetos:**

1. Encapsulamos datos y comportamientos en un solo lugar (`Alumno`).
2. Mejor legibilidad y mantenimiento.
3. Escalabilidad: agregar nuevos métodos o propiedades no rompe el código.
4. Reutilización: podemos usar `Alumno` en otros contextos (archivos, reportes, cálculo de promedio, etc.).

**Actividad extra para los alumnos:**

* Crear un método `cumplir_curso()` que aumente `cantidad_cursos` y reflejarlo en la lista.
* Agregar una nueva propiedad `email` y actualizar la UI y la clase para manejarla.


¿Querés que haga eso?
