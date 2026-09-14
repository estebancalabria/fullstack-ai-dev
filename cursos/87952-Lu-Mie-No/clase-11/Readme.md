# Clase 11 - 14 de Septiembre del 2026

# Repaso

* Python
  * Type Hints
  * Pruebas Unitarias
  * Manejo de Errores
    * Excepciones
      * Try..except
      * raise
      * ValueError, TypeError
  * Conversiones de tipos de datos
      * int -> pasa de str a int si puede
* AiDev
  * Mejorar el codigo con IA -> Refactoring
  * Chequear los datos de Entrada -> Programacion Defensiva

---

# Gemni Notebook (Ex NoteboonLM)

* Url
  * https://notebooklm.google.com/
* Caracteristica
  * Es un RAG sencillo donde cargas una serie de documentos y le haces preguntas que responde basandose en ellos (y no tanto en su conocimiento y suposiciones)
  * Ideal para estudiar
  * TIP: Generar un notebookLM con los apuntes que estamos tomando de la clase
 

---

# Desarrollo

## Extension LiveShare

* Esta extension permite compartir el codigo para que varios miren lo que un desarrollador hace
* Permite pair programming para que varios desarradores trabajen sobre el mismo codigo

# Python

## Funciones

### Parametros con nombre

* En python al invocar una funcion se le puede especificar el nombre del parametro y alterarle el orden

```python
def saludar(nombre, apellido, edad):
    print(f"Hola, {nombre} {apellido}. Tienes {edad} años.")

saludar(edad=30, nombre="Juan", apellido="Pérez")
```

* Esto hace el codigo mucho mas legible y es super util para las funciones que tienen muchos parametros


## Programacion orientada a objetos

* A los tipos de datos que ya vimos, se le suma el mas importante de todos
 * Los tipos de datos clases que permiten crear objetos

### Clase

* Una clase es una forma de agrupar varias variables relacionadas juntas (para que no se escape cada una por su lado)
* Cada vez que declaras una variable de esa clase estas creando un objeto
* Las clases representan entidades del mundo real
* Ademas de agrupar variables relacionadas tambien agrupan metodos que trabajan sobre esas variabes

* En python las clases permiten crear objetos mediante "funciones constructoras" que en python se llaman directamente

```
boton = tk.Button(
    ventana,
    text="Salir",
    font=("Arial", 12),
    width=17,
    command=ventana.destroy                  # Al hacer clic llama a la función salir
)
```

* Si esto lo hiciera en java/C# seria algo asi usando la palabra reservada new

```
Button boton = new Button(ventana, "Salir",... )
```

* Creamos el objeto button mediante la funcion constructora (constructor) de la clase Button


## TKinter

### Hola Mundo

* Mi "hola mundo" con tkinter

```python
import tkinter as tk

ventana = tk.Tk()
ventana.title("Hola Mundo")

etiqueta = tk.Label(ventana, text="¡Hola Mundo!")
etiqueta.pack()

ventana.mainloop()
```

* Clases en TKinter
  * TK (Ventana)
   * title
   * geometry
  * Labels
  * Buttton
  * Button
  * Entry

### Otro Ejemplo

* Quiero una ventana de 640x480 que muestre un Label con un texto y abajo un boton que diga "Salir" (Opcional que el boton haga algo)

```python
import tkinter as tk

# Crear la ventana principal
ventana : tk.Tk = tk.Tk()
ventana.title("Mi ventana")
ventana.geometry("640x480")          # Tamaño 640x480


# Label con texto
etiqueta = tk.Label(
    ventana,
    text="¡Hola! Esta es una ventana de 640x480",
    font=("Arial", 16)
)
etiqueta.pack(pady=50)               # Espacio arriba


boton = tk.Button(
    ventana,
    text="Salir",
    font=("Arial", 12),
    width=17,
    command=ventana.destroy                  # Al hacer clic llama a la función salir
)
boton.pack(pady=20)

# Iniciar el bucle de la aplicación
ventana.mainloop()
```

### Otro Ejemplo. Un Saludito

* Quiero una ventana con un cuadro de texto donde el usuario pone su nombre y un boton. Cuando el usuario presiona el boton se completa un Label donde se muestra un saludo

```python
import tkinter as tk

# Crear ventana
ventana = tk.Tk()
ventana.title("Saludo")
ventana.geometry("640x480")

# Texto de indicación
label_nombre = tk.Label(ventana, text="Ingrese su nombre:")
label_nombre.pack(pady=20)

# Cuadro de texto
entrada_nombre = tk.Entry(ventana)
entrada_nombre.pack()

# Label donde aparecerá el saludo
label_saludo = tk.Label(ventana, text="")
label_saludo.pack(pady=20)


# Función que se ejecuta al presionar el botón
# Este saludar es horrible, es una funcion impura! Usa cosas de afuera
#def saludar():
#    nombre = entrada_nombre.get()
#    label_saludo.config(text="¡Hola " + nombre + "!")

def saludar(campo_nombre, label_resultado):
    nombre = campo_nombre.get()
    label_resultado.config(text="¡Hola " + nombre + "!") 

# Botón
boton = tk.Button(ventana, text="Saludar", command=lambda: saludar(entrada_nombre, label_saludo))
boton.pack()
```

> [!NOTE]
> La primera version que me hizo la IA fue con una funcion saludar impura. Tuvimos que retocar el codigo para que sea con funciones puras
