from datetime import date
from models.alumno import Alumno
import sqlite3

DB_NAME = 'universidad.db'

SQL_CREAR_TABLA_ALUMNOS = """
CREATE TABLE IF NOT EXISTS alumnos (
    legajo INTEGER PRIMARY KEY AUTOINCREMENT,
    nombre TEXT NOT NULL,
    apellido TEXT NOT NULL,
    fecha_nacimiento DATE NOT NULL
);
"""

SQL_INSERTAR_ALUMNO = """
INSERT INTO alumnos (nombre, apellido, fecha_nacimiento)
VALUES (?, ?, ?);
"""

SQL_OBTENER_ALUMNO_POR_LEGAJO = """
SELECT legajo, nombre, apellido, fecha_nacimiento
FROM alumnos
WHERE legajo = ?;
"""

SQL_OBTENER_TODOS_LOS_ALUMNOS = """
SELECT legajo, nombre, apellido, fecha_nacimiento
FROM alumnos;
"""

SQL_ELIMINAR_ALUMNO = """
DELETE FROM alumnos
WHERE legajo = ?;
"""

class RepositorioAlumnos:

    def __init__(self):
        #Abrir una bd o crearla si no existe
        conn = None
        try:
            conn = sqlite3.connect(DB_NAME)

            # Crear un cursor
            cursor = conn.cursor()

            # Crear la tabla de alumnos si todavía no existe
            cursor.execute(SQL_CREAR_TABLA_ALUMNOS)
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
            conn = sqlite3.connect(DB_NAME)
            cursor = conn.cursor()

            cursor.execute(SQL_INSERTAR_ALUMNO, (
                alumno.nombre,
                alumno.apellido,
                alumno.fecha_de_nacimiento.isoformat()
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
            conn = sqlite3.connect(DB_NAME)
            cursor = conn.cursor()

            cursor.execute(SQL_OBTENER_ALUMNO_POR_LEGAJO, (legajo,))
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
            conn = sqlite3.connect(DB_NAME)
            cursor = conn.cursor()
            cursor.execute(SQL_OBTENER_TODOS_LOS_ALUMNOS)
            filas = cursor.fetchall()
            return [
                Alumno(
                    fila[0],
                    fila[1],
                    fila[2],
                    date.fromisoformat(fila[3]),
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
            conn = sqlite3.connect(DB_NAME)
            cursor = conn.cursor()

            cursor.execute(SQL_ELIMINAR_ALUMNO, (legajo,))
            conn.commit()

            return cursor.rowcount > 0

        except sqlite3.Error:
            if conn is not None:
                conn.rollback()
            raise

        finally:
            if conn is not None:
                conn.close()