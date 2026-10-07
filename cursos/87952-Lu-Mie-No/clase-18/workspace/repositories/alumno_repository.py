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