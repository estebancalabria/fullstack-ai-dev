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