# Clase Nueve - 1 de Abril del 2026

## Repaso

* Python
  * Modulos
      * Distintas formas de importar
  * Type Hints
      * Para los que vienen de lenguajes mas tipados
      * Para quedar como un programador PRO en Python
  * Django
* IA
  * Modelo de lenguaje
      * Debate sobre cuanto impacta la IA en el desarrollo
  * Entornos de Desarrollo
      * Cursor
      * VSCode con la extension de Github Copilo
  * HuggingFace
      * Sacar un usuario (y noo peder la clave)
      * El mundo OS de IA tiene muchisimas oportunidades
      * Para el que sabe un poquito mas
    
# Novedades

* Preocupacion de el el imacto
    * https://www.youtube.com/watch?v=vmMDzNlfQEU
* Se filtro el error de Claude Code en internet
    * https://www.youtube.com/watch?v=mBHRPeg8zPU

# IA y desarrollo

* Agentes para programar
  * Generamlente se utilizan de CLI
  * Ejemplos
    * Codex de OpenAI
    * Gemini Code
    * Claude Code
        * https://code.claude.com/docs/es/overview
        * Es el que mas se usa en las empresas
        * La contra es que el uso gratuito esta basntante limitado

# Proyecto Integrador

* El proyecto integrador es basicamente un CRUD (Create Read Update Delete) / ABM (Alta Baja Modificacion) el alumnos
* El alumno es una entidad de negocio / dominio

* Alumno
    * Id
    * Nombre
    * Apellido
    * Cantidad_Cursos

* Todo el registro de los alumnos lo vamos a guardar en MEMORIA (si cierro la app pierdo todo)

* Primero vamos a hacer una version Consola y despues la version Escritorio como pide el enunciado

* Para cada Alumno individual voy a genera un diccionario y la base de datos en memoria la voy a tener en una lista de diccionarios

* Nuestra primera version

```python

# Esta va aser nuestra base de datos en memoria
# Cada elemento de la lista es un diccionario que representa un alumno
db = [
    {
        "id": 1,
        "nombre": "Esteban",
        "apellido": "Calabria",
        "cantidad_cursos": 3
    }
]

def mostrar_menu():
    print("Bienvenido al sistema de gestión de alumnos")
    print("1. Agregar alumno")
    print("2. Mostrar alumnos")
    print("3. Modificar alumno")
    print("4. Eliminar alumno")
    print("5. Salir")

# Funcion para agregar un nuevo alumno a la base de datos
def agregar_alumno(db: list):
    nombre = input("Ingrese el nombre del alumno: ")
    apellido = input("Ingrese el apellido del alumno: ")
    cantidad_cursos = int(input("Ingrese la cantidad de cursos que ha tomado el alumno: "))
    
    # Generar un nuevo ID para el alumno
    # El siguiente ejemplo usa comprensión de listas para encontrar el ID máximo actual y le suma 1
    nuevo_id = max(alumno["id"] for alumno in db) + 1 if db else 1
    
    nuevo_alumno = {
        "id": nuevo_id,
        "nombre": nombre,
        "apellido": apellido,
        "cantidad_cursos": cantidad_cursos
    }
    
    db.append(nuevo_alumno)
    print(f"Alumno {nombre} {apellido} agregado con éxito.")

# Funcion para mostrar todos los alumnos en la base de datos
def mostrar_alumnos(db: list):
    if not db:
        print("No hay alumnos registrados.")
        return
    
    print("Lista de alumnos:")
    for alumno in db:
        print(f"ID: {alumno['id']}, Nombre: {alumno['nombre']} {alumno['apellido']}, Cursos: {alumno['cantidad_cursos']}")

# Funcion para eliminar un alumno a partir de su ID
def eliminar_alumno(db: list):
    id_alumno = int(input("Ingrese el ID del alumno que desea eliminar: "))
    for alumno in db:
        if alumno["id"] == id_alumno:
            db.remove(alumno)
            print(f"Alumno con ID {id_alumno} eliminado con éxito.")
            return
    print(f"No se encontró un alumno con ID {id_alumno}.")

# Funcion para modificar los datos de un alumno a partir de su ID
def modificar_alumno(db: list):
    id_alumno = int(input("Ingrese el ID del alumno que desea modificar: "))
    for alumno in db:
        if alumno["id"] == id_alumno:
            nombre = input(f"Ingrese el nuevo nombre del alumno (actual: {alumno['nombre']}): ")
            apellido = input(f"Ingrese el nuevo apellido del alumno (actual: {alumno['apellido']}): ")
            cantidad_cursos = int(input(f"Ingrese la nueva cantidad de cursos (actual: {alumno['cantidad_cursos']}): "))
            
            alumno["nombre"] = nombre
            alumno["apellido"] = apellido
            alumno["cantidad_cursos"] = cantidad_cursos
            
            print(f"Alumno con ID {id_alumno} modificado con éxito.")
            return
    print(f"No se encontró un alumno con ID {id_alumno}.")


## Mostrar el menú y ejecutar la opción seleccionada por el usuario
while True:
    mostrar_menu()
    opcion = input("Seleccione una opción: ")
    
    if opcion == "1":
        agregar_alumno(db)
    elif opcion == "2":
        mostrar_alumnos(db)
    elif opcion == "3":
        modificar_alumno(db)
    elif opcion == "4":
        eliminar_alumno(db)
    elif opcion == "5":
        print("Saliendo del sistema. ¡Hasta luego!")
        break
    else:
        print("Opción no válida. Por favor, seleccione una opción del menú.")

```

* Observaciones
    * Manejo de Errores
    * Validar entrada de datos (Las cantidades que sean numeros)
    * No permitir campos vacios al agregar
    * Que al editar si no quiero cambiar un campo directamente presiono enter
    * ...Y asi me tomo el tiempo de ver todas las mejoras posibles antes de continuar

* Por ejemplo en el chat en modo agente le pongo las modificaciones que deseo en un prompt y voy mejorando el codigo

```
Observo que mi codigo no valida la entrada cuando es numerica. En ese caso quiero una funcion que lea datos numericos repetidamente hastsa que la entrada sea correcta y actualizar el codigo existente donde correspodna. En el modificar tambien si el usuario ingresa enter sin ingresar nada que le conserve el valor anteior  (acalarar al usuario el comportamiento). Al momento de crear un registro siempre validar que se ingrese algo los alumnos no pueden quedar con informacion vacia
```

* Luego de aplicar el prompt anterior tengo una version mejorada

```python

# Esta va aser nuestra base de datos en memoria
# Cada elemento de la lista es un diccionario que representa un alumno
db = [
    {
        "id": 1,
        "nombre": "Esteban",
        "apellido": "Calabria",
        "cantidad_cursos": 3
    }
]


def leer_numero_entero(mensaje: str) -> int:
    while True:
        valor = input(mensaje).strip()
        if valor.lstrip("-").isdigit():
            return int(valor)
        print("Entrada invalida. Debe ingresar un numero entero.")


def leer_texto_no_vacio(mensaje: str) -> str:
    while True:
        valor = input(mensaje).strip()
        if valor:
            return valor
        print("El campo no puede estar vacio. Intente nuevamente.")


def leer_texto_o_conservar_actual(mensaje: str, valor_actual: str) -> str:
    valor = input(mensaje).strip()
    if valor == "":
        return valor_actual
    return valor


def leer_entero_o_conservar_actual(mensaje: str, valor_actual: int) -> int:
    while True:
        valor = input(mensaje).strip()
        if valor == "":
            return valor_actual
        if valor.lstrip("-").isdigit():
            return int(valor)
        print("Entrada invalida. Debe ingresar un numero entero o presionar Enter para conservar el valor actual.")

def mostrar_menu():
    print("Bienvenido al sistema de gestión de alumnos")
    print("1. Agregar alumno")
    print("2. Mostrar alumnos")
    print("3. Modificar alumno")
    print("4. Eliminar alumno")
    print("5. Salir")

# Funcion para agregar un nuevo alumno a la base de datos
def agregar_alumno(db: list):
    nombre = leer_texto_no_vacio("Ingrese el nombre del alumno: ")
    apellido = leer_texto_no_vacio("Ingrese el apellido del alumno: ")
    cantidad_cursos = leer_numero_entero("Ingrese la cantidad de cursos que ha tomado el alumno: ")
    
    # Generar un nuevo ID para el alumno
    # El siguiente ejemplo usa comprensión de listas para encontrar el ID máximo actual y le suma 1
    nuevo_id = max(alumno["id"] for alumno in db) + 1 if db else 1
    
    nuevo_alumno = {
        "id": nuevo_id,
        "nombre": nombre,
        "apellido": apellido,
        "cantidad_cursos": cantidad_cursos
    }
    
    db.append(nuevo_alumno)
    print(f"Alumno {nombre} {apellido} agregado con éxito.")

# Funcion para mostrar todos los alumnos en la base de datos
def mostrar_alumnos(db: list):
    if not db:
        print("No hay alumnos registrados.")
        return
    
    print("Lista de alumnos:")
    for alumno in db:
        print(f"ID: {alumno['id']}, Nombre: {alumno['nombre']} {alumno['apellido']}, Cursos: {alumno['cantidad_cursos']}")

# Funcion para eliminar un alumno a partir de su ID
def eliminar_alumno(db: list):
    id_alumno = leer_numero_entero("Ingrese el ID del alumno que desea eliminar: ")
    for alumno in db:
        if alumno["id"] == id_alumno:
            db.remove(alumno)
            print(f"Alumno con ID {id_alumno} eliminado con éxito.")
            return
    print(f"No se encontró un alumno con ID {id_alumno}.")

# Funcion para modificar los datos de un alumno a partir de su ID
def modificar_alumno(db: list):
    id_alumno = leer_numero_entero("Ingrese el ID del alumno que desea modificar: ")
    for alumno in db:
        if alumno["id"] == id_alumno:
            print("Si presiona Enter sin escribir nada, se conserva el valor actual.")
            nombre = leer_texto_o_conservar_actual(
                f"Ingrese el nuevo nombre del alumno (actual: {alumno['nombre']}): ",
                alumno["nombre"],
            )
            apellido = leer_texto_o_conservar_actual(
                f"Ingrese el nuevo apellido del alumno (actual: {alumno['apellido']}): ",
                alumno["apellido"],
            )
            cantidad_cursos = leer_entero_o_conservar_actual(
                f"Ingrese la nueva cantidad de cursos (actual: {alumno['cantidad_cursos']}): ",
                alumno["cantidad_cursos"],
            )
            
            alumno["nombre"] = nombre
            alumno["apellido"] = apellido
            alumno["cantidad_cursos"] = cantidad_cursos
            
            print(f"Alumno con ID {id_alumno} modificado con éxito.")
            return
    print(f"No se encontró un alumno con ID {id_alumno}.")


## Mostrar el menú y ejecutar la opción seleccionada por el usuario
while True:
    mostrar_menu()
    opcion = input("Seleccione una opción: ")
    
    if opcion == "1":
        agregar_alumno(db)
    elif opcion == "2":
        mostrar_alumnos(db)
    elif opcion == "3":
        modificar_alumno(db)
    elif opcion == "4":
        eliminar_alumno(db)
    elif opcion == "5":
        print("Saliendo del sistema. ¡Hasta luego!")
        break
    else:
        print("Opción no válida. Por favor, seleccione una opción del menú.")
```