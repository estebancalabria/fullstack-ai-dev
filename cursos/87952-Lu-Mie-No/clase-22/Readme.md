# Clase 22 - 26 de Octubre del 2026

# Repaso

* Base de Datos
  * SQLite
    * Pyton
      * Insert
      * Update
      * Delete
      * Select
  * Conexion con Supabase desde Python
  * Juegos para aprender sql
    * https://mystery.knightlab.com/
    * https://www.sqlnoir.com/
* Aidev
  * database.build
    

# Novedades

* Probar modelos de NVIDIa
  * https://build.nvidia.com/models?filters=nimType%3Anim_type_preview
* Link de discord del Juego de Guido
  * https://discord.gg/3K8DmpwJs
* REA (Reverse Engineering Everithing)
  * https://github.com/morluto/rea

# Aplicacion Full Stack

* Capas
  * Cliente
  * Servidor
    * Presentacion / controlador / API
    * Servicios
    * Modelo
    * Persistencia

* Miremos un poquito el proyecto del CRUD de alumno
* Vamos a actualizar el repo

* Version Actual
```
from datetime import date

from models.alumno import Alumno


class RepositorioAlumnos:

    def __init__(self):
        self.__alumnos: list[Alumno] = []
        self.__cargar_datos_prueba()

    def __cargar_datos_prueba(self):
        self.__alumnos.append(
            Alumno(1, "Juan", "Perez", date(2000, 5, 15))
        )
        self.__alumnos.append(
            Alumno(2, "Maria", "Gomez", date(1999, 8, 22))
        )
        self.__alumnos.append(
            Alumno(3, "Carlos", "Lopez", date(2001, 3, 10))
        )
        self.__alumnos.append(
            Alumno(4, "Ana", "Martinez", date(1998, 11, 5))
        )
        self.__alumnos.append(
            Alumno(5, "Pedro", "Rodriguez", date(2002, 1, 30))
        )

    def guardar(self, alumno: Alumno) -> None:
        self.__alumnos.append(alumno)

    def obtener_por_legajo(self, legajo: int) -> Alumno | None:
        for alumno in self.__alumnos:
            if alumno.legajo == legajo:
                return alumno

        return None

    def obtener_todos(self) -> list[Alumno]:
        return self.__alumnos.copy()

    def eliminar(self, legajo: int) -> bool:
        alumno = self.obtener_por_legajo(legajo)

        if alumno is None:
            return False

        self.__alumnos.remove(alumno)
        return True
```

* Version con SQLIte
```
from datetime import date
from models.alumno import Alumno
import sqlite3

class RepositorioAlumnos:

    def __init__(self):
        #Abrir una bd o crearla si no existe
        conn = None
        try:
            conn = sqlite3.connect('universidad.db')

            # Crear un cursor
            cursor = conn.cursor()

            # Crear la tabla de alumnos si todavía no existe
            ddl_tabla_personas = """
            CREATE TABLE IF NOT EXISTS alumnos (
                legajo INTEGER PRIMARY KEY AUTOINCREMENT,
                nombre TEXT NOT NULL,
                apellido TEXT NOT NULL,
                fecha_nacimiento DATE NOT NULL
            );
            """

            cursor.execute(ddl_tabla_personas)
            conn.commit()
        except sqlite3.Error:
            if conn is not None:
                conn.rollback()
            raise
        finally:
            if conn is not None:
                conn.close()


def guardar(self, alumno: Alumno) -> None:
    conn = None
    try:
        conn = sqlite3.connect('universidad.db')
        cursor = conn.cursor()

        sql_insert_alumno = """
        INSERT INTO alumnos (nombre, apellido, fecha_nacimiento)
        VALUES (?, ?, ?);
        """

        cursor.execute(sql_insert_alumno, (
            alumno.nombre,
            alumno.apellido,
            alumno.fecha_nacimiento
        ))

        conn.commit()

    except sqlite3.Error:
        if conn is not None:
            conn.rollback()
        raise

    finally:
        if conn is not None:
            conn.close()

    
def obtener_por_legajo(self, legajo: int) -> Alumno | None:
    conn = None
    try:
        conn = sqlite3.connect('universidad.db')
        cursor = conn.cursor()

        sql_select_alumno = """
        SELECT legajo, nombre, apellido, fecha_nacimiento
        FROM alumnos
        WHERE legajo = ?;
        """

        cursor.execute(sql_select_alumno, (legajo,))
        fila = cursor.fetchone()

        if fila is None:
            return None

        alumno = Alumno(
            fila[0],
            fila[1],
            fila[2],
            date.fromisoformat(fila[3])
        )

        return alumno

    finally:
        if conn is not None:
            conn.close()

def obtener_todos(self) -> list[Alumno]:
    conn = None
    try:
        conn = sqlite3.connect('universidad.db')
        cursor = conn.cursor()
        sql_obtener_todos = """
        SELECT legajo, nombre, apellido, fecha_nacimiento
        FROM alumnos;
        """
        cursor.execute(sql_obtener_todos)
        filas = cursor.fetchall()
        return [
            Alumno(
                legajo=fila[0],
                nombre=fila[1],
                apellido=fila[2],
                fecha_de_nacimiento=date.fromisoformat(fila[3]),
            )
            for fila in filas
        ]
    except sqlite3.Error:
        if conn is not None:
            conn.rollback()
        raise
    finally:
        if conn is not None:
            conn.close()
               
def eliminar(self, legajo: int) -> bool:
        alumno = self.obtener_por_legajo(legajo)

        if alumno is None:
            return False

        conn = None
        try:
            conn = sqlite3.connect('universidad.db')
            cursor = conn.cursor()

            sql_delete_alumno = """
            DELETE FROM alumnos
            WHERE legajo = ?;
            """

            cursor.execute(sql_delete_alumno, (legajo,))
            conn.commit()

            return cursor.rowcount > 0

        except sqlite3.Error:
            if conn is not None:
                conn.rollback()
            raise

        finally:
            if conn is not None:
                conn.close()
```

---
# Este codigo lo vamos a probar y lo vamos a mejorar....
#...despues del break hasta y 40
---
