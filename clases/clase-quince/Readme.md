# Clase Quince - 24 de Abril 2026

# Repaso

* Tipos de Metodos
  * Metodos estaticos/clase
  * Metodos de Instancia
  * Metodos de la programacion estructurada (sin POO)
* System Design
  * Oganizacion de las distitas partes de nuestro programa
  * Buenas Practicas
    * Separar la interfaz Grafica de la logica

# System Design

## Arquitectura en Capas

> [!NOTE]
> Es un marco de referencia

* Interfaz Grafica o Presentacion
* Capa de Servicios
* Capa de Persistencia
* Modelo (Puede ser tranversal a todas)

### En el mundo web

* Frontend (Se ejecuta en el Browser)
  * Capa de Presentacion
* Backend (Se ejecuta en un servidor)
  * Controladores / Endpoints / API
  * Serivcios
  * Persistencia
  * Modelo

* Ejemplos de esta arquitectura se peuden ve en los frameworks (modelo-vista-controlador)
  * Model-View-ViewModel en xamarin y maui
  * En C# tenemos el MVC
  * En java tenemos SpringBoot
  * En python Django implementa esta arquitecura


### Bibliografia recomendada

* Con este tema de la IA y de educarla para que programe bien hay clasicos que reflotaron
  * Design Patterns - Elements of Reusable Object Oriented Software
      * https://github.com/deepakkum21/Books/blob/master/Design%20Patterns%20-%20Elements%20of%20Reusable%20Object%20Oriented%20Software%20-%20GOF.pdf
  * Clean Code
      * https://www.amazon.com/s?k=clean+code&language=es_US&adgrpid=169149343100&hvadid=715675451889&hvdev=c&hvlocphy=9198587&hvnetw=g&hvqmt=e&hvrand=3898497613641323819&hvtargid=kwd-301191331858&hydadcr=6235_13432406&mcid=06417e4e6b653dae84556ed861928240&tag=txscdpesrow-20&ref=pd_sl_8gcdbwqcpd_e
  * Patterns of enterprise Aplication
      * https://raw.githubusercontent.com/ZoranLi/Books1/master/Patterns%20of%20Enterprise%20Application%20Architecture.pdf
      * Libro principal que formaliza la sivisione en capas
      * Autor : Martin Fowler
        * https://martinfowler.com/

> [!NOTE]
> Estos libros hoy son mas relevantes que nunca para entrenar la IA y para crear codigo Escalable

> Se animan a darle una mirada a estos libros y la clase que viene hablamos de ellos?

---

### Arquitectura aplicada al proyecto integrador

<img width="748" height="586" alt="image" src="https://github.com/user-attachments/assets/c1f3070a-0995-4921-9214-bc01dc7102c3" />

### Capa de persistencia

* La clase pasada la ia me dijo esto

```
servicio_alumnos.py usa una lista en memoria como “db”.
Para escalar: interfaz repositorio + implementación en memoria/archivo/SQLite sin tocar la UI.
Manejo de errores más específico:
``


* Donde podemos guardar los datos
  * En memoria (sobre todo para pruebas)
  * En archivos
  * En Base de datos

* En genral cuando uno tiene un objeto del modelo si ese objeto se guarda en una tabla de la base de datos tiene un repositorio de esta forma

```
Repositorio<Moldelo>
    Insertar(Obj)
    Actualizar(id, obj)
    Eliminar(id)
    Listar() -> List[Obj]

```


* Le vamos a pedir a la IA

```
Agregale a nuestro proyecto una repositorio de alumnos para nuestra capa de persistencia que lo grabe en una base de datos SQLite. Modifcar el la capa de servicio para que ahora utilice el repositorio de Alumno
```

* La IA creo esto

```python
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

    def insertar(self, nombre: str, apellido: str, cantidad_cursos: int) -> Alumno:
        with self._conexion() as conn:
            cur = conn.execute(
                """
                INSERT INTO alumnos (nombre, apellido, cantidad_cursos)
                VALUES (?, ?, ?)
                """,
                (nombre, apellido, cantidad_cursos),
            )
            nuevo_id = int(cur.lastrowid)
            row = conn.execute(
                "SELECT id, nombre, apellido, cantidad_cursos FROM alumnos WHERE id = ?",
                (nuevo_id,),
            ).fetchone()
        assert row is not None
        return self._fila_a_alumno(row)

    def actualizar(
        self,
        id_alumno: int,
        nombre: str,
        apellido: str,
        cantidad_cursos: int,
    ) -> None:
        with self._conexion() as conn:
            conn.execute(
                """
                UPDATE alumnos
                SET nombre = ?, apellido = ?, cantidad_cursos = ?
                WHERE id = ?
                """,
                (nombre, apellido, cantidad_cursos, id_alumno),
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

```

> [!NOTA]
> No me parece bien la implentacion de la IA. Tiene algo como esto
>     def insertar(self, nombre: str, apellido: str, cantidad_cursos: int) -> Alumno:
> La verdad que nunca vi un repositorio asi
> Lo mas comun es que reciba directamente una instancia de alumno.
> Asi que voy a usar la Ia para ver porque lo hizo asi
> Imaginense si no chequeamos el codigo de la IA

```
Quiero que la logica del ID autoincremental no este mas en el alumno y que el repositorio reciba el objeto alumno entero. Podes modifica todo el proyecto?
```

* Ahora si tiene mas pinta de repositorio

```python
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

```
---

# Bases de Datos

* Motores de base de datos relacional conocen
 * MySQL
 * Postgres
 * SqlServer
 * Sqlite
    * https://sqlite.org/

## Lenguaje para hablar con ls bases de datos

* SQL : Standard Queyr Language

# Deuda Cognitiva

*  [self._fila_a_alumno(row) for row in cur.fetchall()] <<< Que es esta sintaxis?
