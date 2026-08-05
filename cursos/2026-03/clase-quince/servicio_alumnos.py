from alumno import Alumno
from repositorio_alumnos import RepositorioAlumnos


class ServicioAlumnos:
    def __init__(self, repositorio: RepositorioAlumnos | None = None) -> None:
        self._repo = repositorio or RepositorioAlumnos()

    def listar(self) -> list[Alumno]:
        return self._repo.listar()

    def obtener_por_indice(self, indice: int) -> Alumno:
        return self._repo.listar()[indice]

    def agregar(self, nombre: str, apellido: str, cursos: int) -> Alumno:
        n, a, c = Alumno.validar_campos(nombre, apellido, cursos)
        return self._repo.insertar(Alumno(n, a, c))

    def eliminar_por_indice(self, indice: int) -> Alumno:
        alumnos = self._repo.listar()
        alumno = alumnos[indice]
        assert alumno.id is not None
        self._repo.eliminar_por_id(alumno.id)
        return alumno

    def modificar_por_indice(
        self, indice: int, nombre: str, apellido: str, cursos: int
    ) -> Alumno:
        alumnos = self._repo.listar()
        alumno = alumnos[indice]
        n, a, c = Alumno.validar_campos(nombre, apellido, cursos)
        assert alumno.id is not None
        actualizado = Alumno.desde_persistencia(alumno.id, n, a, c)
        self._repo.actualizar(actualizado)
        return actualizado
