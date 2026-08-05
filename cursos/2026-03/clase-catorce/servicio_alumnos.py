from alumno import Alumno


class ServicioAlumnos:
    def __init__(self) -> None:
        self._db = [Alumno("Esteban", "Calabria", 3)]

    def listar(self) -> list[Alumno]:
        return self._db

    def obtener_por_indice(self, indice: int) -> Alumno:
        return self._db[indice]

    def agregar(self, nombre: str, apellido: str, cursos: int) -> Alumno:
        nuevo = Alumno(nombre, apellido, cursos)
        self._db.append(nuevo)
        return nuevo

    def eliminar_por_indice(self, indice: int) -> Alumno:
        return self._db.pop(indice)

    def modificar_por_indice(self, indice: int, nombre: str, apellido: str, cursos: int) -> Alumno:
        alumno = self._db[indice]
        alumno.actualizar_datos(nombre, apellido, cursos)
        return alumno