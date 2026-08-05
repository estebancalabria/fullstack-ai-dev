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