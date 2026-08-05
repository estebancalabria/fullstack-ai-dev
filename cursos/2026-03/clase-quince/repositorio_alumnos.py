import sqlite3
from pathlib import Path

from alumno import Alumno


class RepositorioAlumnos:
    """Capa de persistencia: almacena alumnos en SQLite."""

    def __init__(self, ruta_bd: str | Path | None = None) -> None:
        base = Path(__file__).resolve().parent
        self._ruta_bd = Path(ruta_bd) if ruta_bd is not None else base / "alumnos.db"
        self._inicializar_esquema()

    def _conexion(self) -> sqlite3.Connection:
        conn = sqlite3.connect(self._ruta_bd)
        conn.row_factory = sqlite3.Row
        return conn

    def _inicializar_esquema(self) -> None:
        with self._conexion() as conn:
            conn.execute(
                """
                CREATE TABLE IF NOT EXISTS alumnos (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    nombre TEXT NOT NULL,
                    apellido TEXT NOT NULL,
                    cantidad_cursos INTEGER NOT NULL
                )
                """
            )
            cur = conn.execute("SELECT COUNT(*) FROM alumnos")
            if cur.fetchone()[0] == 0:
                conn.execute(
                    """
                    INSERT INTO alumnos (nombre, apellido, cantidad_cursos)
                    VALUES (?, ?, ?)
                    """,
                    ("Esteban", "Calabria", 3),
                )

    def listar(self) -> list[Alumno]:
        with self._conexion() as conn:
            cur = conn.execute(
                """
                SELECT id, nombre, apellido, cantidad_cursos
                FROM alumnos
                ORDER BY id
                """
            )
            return [self._fila_a_alumno(row) for row in cur.fetchall()]

    def insertar(self, alumno: Alumno) -> Alumno:
        if alumno.id is not None:
            raise ValueError("El alumno ya tiene id asignado; use actualizar en lugar de insertar.")
        with self._conexion() as conn:
            cur = conn.execute(
                """
                INSERT INTO alumnos (nombre, apellido, cantidad_cursos)
                VALUES (?, ?, ?)
                """,
                (alumno.nombre, alumno.apellido, alumno.cantidad_cursos),
            )
            nuevo_id = int(cur.lastrowid)
            row = conn.execute(
                "SELECT id, nombre, apellido, cantidad_cursos FROM alumnos WHERE id = ?",
                (nuevo_id,),
            ).fetchone()
        assert row is not None
        return self._fila_a_alumno(row)

    def actualizar(self, alumno: Alumno) -> None:
        if alumno.id is None:
            raise ValueError("No se puede actualizar un alumno sin id de base de datos.")
        with self._conexion() as conn:
            conn.execute(
                """
                UPDATE alumnos
                SET nombre = ?, apellido = ?, cantidad_cursos = ?
                WHERE id = ?
                """,
                (
                    alumno.nombre,
                    alumno.apellido,
                    alumno.cantidad_cursos,
                    alumno.id,
                ),
            )

    def eliminar_por_id(self, id_alumno: int) -> None:
        with self._conexion() as conn:
            conn.execute("DELETE FROM alumnos WHERE id = ?", (id_alumno,))

    @staticmethod
    def _fila_a_alumno(row: sqlite3.Row) -> Alumno:
        return Alumno.desde_persistencia(
            int(row["id"]),
            str(row["nombre"]),
            str(row["apellido"]),
            int(row["cantidad_cursos"]),
        )
